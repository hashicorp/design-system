import { execFileSync } from 'node:child_process';

const REPOSITORY = 'hashicorp/design-system';
const CONSUMER_REPOSITORY_PATTERN =
  /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;

function api(path, { method = 'GET', fields = [] } = {}) {
  let response;

  try {
    response = execFileSync('gh', ['api', '--method', method, path, ...fields], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
      maxBuffer: 15 * 1024 * 1024,
    });
  } catch (error) {
    const detail = error.stderr
      ?.toString()
      .replace(/[\u0000-\u001f\u007f]/g, ' ')
      .trim()
      .slice(0, 300);
    throw new Error(
      detail
        ? `GitHub ${method} failed: ${detail}`
        : `GitHub ${method} failed. Confirm that gh is installed and authenticated.`
    );
  }

  try {
    return JSON.parse(response);
  } catch {
    throw new Error(`GitHub returned invalid JSON for ${path}.`);
  }
}

function validateSha(value, label) {
  if (!/^[0-9a-f]{40,64}$/i.test(value)) {
    throw new Error(`Invalid ${label}.`);
  }

  return value;
}

function parsePublishedCandidateComment(comments, expectedHeadSha) {
  const comment = comments.find(
    ({ body }) =>
      typeof body === 'string' &&
      body.includes('<!-- Sticky Pull Request Commentrc-release -->')
  );

  if (!comment) {
    throw new Error(
      'No successful release-candidate publication comment was found on the PR.'
    );
  }

  const commitMatch = comment.body.match(/^Latest commit:\s*([0-9a-f]{40,64})$/m);

  if (!commitMatch || commitMatch[1] !== expectedHeadSha) {
    throw new Error(
      'The release-candidate publication does not match the current PR head SHA.'
    );
  }

  const candidates = [
    ...comment.body.matchAll(
      /^#### (@hashicorp\/[A-Za-z0-9_.-]+)@(\d+\.\d+\.\d+-rc-[0-9A-Za-z.-]+)$/gm
    ),
  ].map(([, name, candidateVersion]) => ({
    name,
    version: candidateVersion.slice(0, candidateVersion.indexOf('-rc-')),
    candidateVersion,
  }));
  const publishedCount = comment.body.match(
    /<summary>Published (\d+) packages<\/summary>/
  );

  if (
    candidates.length === 0 ||
    !publishedCount ||
    Number(publishedCount[1]) !== candidates.length ||
    new Set(candidates.map(({ name }) => name)).size !== candidates.length
  ) {
    throw new Error(
      'The release-candidate publication comment contains an invalid package list.'
    );
  }

  return candidates.sort((a, b) => a.name.localeCompare(b.name));
}

function readTree(request, sha) {
  const tree = request(`repos/${REPOSITORY}/git/trees/${sha}?recursive=1`);

  if (tree.truncated || !Array.isArray(tree.tree)) {
    throw new Error(
      `The ${sha} repository tree was truncated; refusing incomplete release discovery.`
    );
  }

  const packageEntries = tree.tree.filter(
    (entry) =>
      entry &&
      typeof entry.path === 'string' &&
      /^packages\/.+\/package\.json$/.test(entry.path)
  );

  for (const entry of packageEntries) {
    validateSha(entry.sha, 'package manifest blob SHA');
  }

  return new Map(packageEntries.map((entry) => [entry.path, entry.sha]));
}

function readBlob(request, sha) {
  validateSha(sha, 'package manifest blob SHA');
  const blob = request(`repos/${REPOSITORY}/git/blobs/${sha}`);

  if (blob.encoding !== 'base64' || typeof blob.content !== 'string') {
    throw new Error(`Cannot decode package manifest blob ${sha}.`);
  }

  try {
    return JSON.parse(Buffer.from(blob.content, 'base64').toString('utf8'));
  } catch {
    throw new Error(`Package manifest blob ${sha} contains invalid JSON.`);
  }
}

function manifestAt(path, tree, cache, request) {
  const sha = tree.get(path);

  if (!sha) {
    return undefined;
  }

  if (!cache.has(sha)) {
    cache.set(sha, readBlob(request, sha));
  }

  return cache.get(sha);
}

function isStableVersion(value) {
  return (
    typeof value === 'string' &&
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(value)
  );
}

function packageDependencies(manifest, path) {
  const dependencies = {};

  for (const field of [
    'dependencies',
    'devDependencies',
    'optionalDependencies',
    'peerDependencies',
  ]) {
    const value = manifest[field];

    if (
      value !== undefined &&
      (value === null || typeof value !== 'object' || Array.isArray(value))
    ) {
      throw new Error(`Invalid ${field} in ${path}.`);
    }

    Object.assign(dependencies, value ?? {});
  }

  return dependencies;
}

function readRepositoryCommit(request, repository, ref) {
  const commit = request(`repos/${repository}/commits/${encodeURIComponent(ref)}`);
  const commitSha = validateSha(commit.sha, 'consumer commit SHA');
  const treeSha = validateSha(commit.commit?.tree?.sha, 'consumer tree SHA');

  return { commitSha, treeSha };
}

function readTreeEntryAtPath(request, repository, treeSha, path, treeCache) {
  const segments = path.split('/');
  let sha = treeSha;
  let entry;

  for (const [index, segment] of segments.entries()) {
    if (!treeCache.has(sha)) {
      treeCache.set(sha, request(`repos/${repository}/git/trees/${sha}`));
    }

    const tree = treeCache.get(sha);

    if (tree.truncated || !Array.isArray(tree.tree)) {
      throw new Error(
        `Cannot inspect ${repository}/${path}: a repository tree was truncated.`
      );
    }

    entry = tree.tree.find((item) => item.path === segment);

    if (!entry) {
      return undefined;
    }

    if (index < segments.length - 1) {
      if (entry.type !== 'tree') {
        return undefined;
      }

      sha = validateSha(entry.sha, 'consumer tree SHA');
    }
  }

  return entry;
}

function parseManifest(text, path) {
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Invalid package JSON at ${path}.`);
  }
}

function decodeTextBlob(request, repository, sha, label) {
  validateSha(sha, `${label} blob SHA`);
  const blob = request(`repos/${repository}/git/blobs/${sha}`);

  if (blob.encoding !== 'base64' || typeof blob.content !== 'string') {
    throw new Error(`Cannot decode ${label} blob ${sha}.`);
  }

  return Buffer.from(blob.content, 'base64').toString('utf8');
}

export function parsePnpmImporter(lockfile, packageRoot, dependencyNames) {
  const lines = lockfile.split(/\r?\n/);
  const importerKeys = [
    `  ${packageRoot}:`,
    `  '${packageRoot}':`,
    `  "${packageRoot}":`,
  ];
  const importerStart = lines.findIndex((line) => importerKeys.includes(line));

  if (importerStart === -1) {
    throw new Error(`The pnpm lockfile has no importer for ${packageRoot}.`);
  }

  let importerEnd = lines.length;

  for (let index = importerStart + 1; index < lines.length; index += 1) {
    if (/^[A-Za-z][A-Za-z0-9_-]*:\s*$/.test(lines[index])) {
      importerEnd = index;
      break;
    }

    if (/^  [^\s].*:\s*$/.test(lines[index])) {
      importerEnd = index;
      break;
    }
  }

  const result = {};

  for (const name of dependencyNames) {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    let found;

    for (let index = importerStart + 1; index < importerEnd; index += 1) {
      if (!/^    (?:dependencies|devDependencies|optionalDependencies|peerDependencies):\s*$/.test(lines[index])) {
        continue;
      }

      const sectionEnd = lines.findIndex(
        (line, offset) => offset > index && /^    [^\s].*:\s*$/.test(line)
      );
      const end = sectionEnd === -1 || sectionEnd >= importerEnd
        ? importerEnd
        : sectionEnd;
      const dependencyLine = new RegExp(
        `^      (?:'${escaped}'|"${escaped}"|${escaped}):\\s*$`
      );
      const dependencyStart = lines.findIndex(
        (line, offset) =>
          offset > index && offset < end && dependencyLine.test(line)
      );

      if (dependencyStart === -1) {
        index = end - 1;
        continue;
      }

      let specifier;
      let resolved;

      for (let cursor = dependencyStart + 1; cursor < end; cursor += 1) {
        if (/^      \S/.test(lines[cursor])) {
          break;
        }

        const specifierMatch = lines[cursor].match(/^        specifier: (.+)$/);
        const versionMatch = lines[cursor].match(/^        version: (.+)$/);

        if (specifierMatch) {
          specifier = specifierMatch[1];
        }

        if (versionMatch) {
          resolved = versionMatch[1];
        }
      }

      found = { specifier, resolved };
      break;
    }

    if (!found) {
      result[name] = null;
      continue;
    }

    const versionMatch = found.resolved?.match(
      /^(\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?)/
    );

    result[name] = {
      specifier: found.specifier ?? null,
      resolvedVersion: versionMatch?.[1] ?? null,
    };
  }

  return result;
}

export function createGitHubClient(request = api) {
  function consumerPullRequestPath(repository, number) {
    if (
      !CONSUMER_REPOSITORY_PATTERN.test(repository) ||
      !Number.isSafeInteger(number) ||
      number < 1
    ) {
      throw new Error('Invalid consumer pull request.');
    }

    return `repos/${repository}/pulls/${number}`;
  }

  return {
    getPullRequest(number) {
      return request(`repos/${REPOSITORY}/pulls/${number}`);
    },

    getSmokeTestPullRequests(repository, branch) {
      if (
        !CONSUMER_REPOSITORY_PATTERN.test(repository) ||
        !/^hds-smoke-test\/pr-[1-9]\d*\/[a-z0-9-]+$/.test(branch)
      ) {
        throw new Error('Invalid smoke-test repository or branch.');
      }

      const result = [];

      for (let page = 1; ; page += 1) {
        const head = encodeURIComponent(`${repository.split('/')[0]}:${branch}`);
        const prs = request(
          `repos/${repository}/pulls?state=open&base=main&head=${head}&per_page=100&page=${page}`
        );

        if (!Array.isArray(prs)) {
          throw new Error('GitHub returned an invalid consumer PR list.');
        }

        result.push(...prs);

        if (prs.length < 100) {
          return result;
        }
      }
    },

    getConsumerPullRequest(repository, number) {
      return request(consumerPullRequestPath(repository, number));
    },

    closeConsumerPullRequest(repository, number) {
      const result = request(consumerPullRequestPath(repository, number), {
        method: 'PATCH',
        fields: ['-f', 'state=closed'],
      });

      if (result.state !== 'closed' || result.merged_at) {
        throw new Error(`GitHub did not confirm closing ${repository}#${number}.`);
      }

      return result;
    },

    getPublishedCandidatePackages(number, expectedHeadSha) {
      validateSha(expectedHeadSha, 'candidate PR head SHA');
      const comments = request(
        `repos/${REPOSITORY}/issues/${number}/comments?per_page=100&sort=updated&direction=desc`
      );

      if (!Array.isArray(comments)) {
        throw new Error('GitHub returned an invalid PR comments response.');
      }

      return parsePublishedCandidateComment(comments, expectedHeadSha);
    },

    getChangedPackageVersions(baseSha, headSha) {
      validateSha(baseSha, 'base commit SHA');
      validateSha(headSha, 'head commit SHA');

      const baseTree = readTree(request, baseSha);
      const headTree = readTree(request, headSha);
      const changedPaths = new Set([...baseTree.keys(), ...headTree.keys()]);
      const cache = new Map();
      const packages = [];

      for (const path of changedPaths) {
        if (baseTree.get(path) === headTree.get(path)) {
          continue;
        }

        const previous = manifestAt(path, baseTree, cache, request);
        const current = manifestAt(path, headTree, cache, request);

        if (!current) {
          throw new Error(`Release package manifest was removed: ${path}.`);
        }

        if (
          typeof current.name !== 'string' ||
          !isStableVersion(current.version)
        ) {
          throw new Error(`Invalid package identity or version in ${path}.`);
        }

        if (previous && current.name !== previous.name) {
          throw new Error(`Package identity changed in ${path}.`);
        }

        if (previous && previous.version === current.version) {
          continue;
        }

        if (previous && !isStableVersion(previous.version)) {
          throw new Error(`Invalid previous package version in ${path}.`);
        }

        if (current.private === true) {
          continue;
        }

        packages.push({
          name: current.name,
          version: current.version,
          previousVersion: previous?.version ?? null,
          manifestPath: path,
          dependencies: packageDependencies(current, path),
        });
      }

      return packages.sort((a, b) => a.name.localeCompare(b.name));
    },

    getConsumerSnapshot(repository, packageRoot, dependencyNames) {
      if (!CONSUMER_REPOSITORY_PATTERN.test(repository)) {
        throw new Error('Invalid consumer repository.');
      }

      if (
        typeof packageRoot !== 'string' ||
        packageRoot.startsWith('/') ||
        packageRoot.split('/').includes('..') ||
        packageRoot.includes('\\') ||
        packageRoot.includes('\0')
      ) {
        throw new Error('Invalid consumer package root.');
      }

      const { commitSha, treeSha } = readRepositoryCommit(
        request,
        repository,
        'main'
      );
      const treeCache = new Map();
      const manifestPath =
        packageRoot === '.'
          ? 'package.json'
          : `${packageRoot.replace(/\/$/, '')}/package.json`;
      const manifestEntry = readTreeEntryAtPath(
        request,
        repository,
        treeSha,
        manifestPath,
        treeCache
      );

      if (!manifestEntry || manifestEntry.type !== 'blob') {
        throw new Error(`No package manifest found at ${manifestPath}.`);
      }

      const manifestText = decodeTextBlob(
        request,
        repository,
        manifestEntry.sha,
        'consumer package manifest'
      );
      const manifest = parseManifest(manifestText, manifestPath);

      const declaredDependencies = packageDependencies(manifest, manifestPath);
      const lockfileEntry = readTreeEntryAtPath(
        request,
        repository,
        treeSha,
        'pnpm-lock.yaml',
        treeCache
      );
      const rootManifestEntry = readTreeEntryAtPath(
        request,
        repository,
        treeSha,
        'package.json',
        treeCache
      );
      let lockedDependencies = null;
      let lockfile = null;

      if (lockfileEntry?.type === 'blob') {
        const lockfileText = decodeTextBlob(
          request,
          repository,
          lockfileEntry.sha,
          'pnpm lockfile'
        );
        lockedDependencies = parsePnpmImporter(
          lockfileText,
          packageRoot || '.',
          dependencyNames
        );
        lockfile = 'pnpm-lock.yaml';
      }
      let rootPackageManager = null;

      if (rootManifestEntry?.type === 'blob') {
        const rootManifest = parseManifest(
          decodeTextBlob(
            request,
            repository,
            rootManifestEntry.sha,
            'consumer root package manifest'
          ),
          'package.json'
        );
        rootPackageManager = rootManifest.packageManager ?? null;
      }

      return {
        repository,
        ref: 'main',
        commitSha,
        manifestPath,
        lockfile,
        packageManager: manifest.packageManager ?? rootPackageManager,
        dependencies: Object.fromEntries(
          dependencyNames.map((name) => [
            name,
            {
              declaredVersion: declaredDependencies[name] ?? null,
              lockfile: lockedDependencies?.[name] ?? null,
            },
          ])
        ),
      };
    },
  };
}
