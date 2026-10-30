import assert from 'node:assert/strict';
import test from 'node:test';
import { createGitHubClient } from './github.mjs';

const baseSha = 'a'.repeat(40);
const headSha = 'b'.repeat(40);
const baseManifestSha = 'c'.repeat(40);
const headManifestSha = 'd'.repeat(40);

function blob(value) {
  return {
    encoding: 'base64',
    content: Buffer.from(JSON.stringify(value)).toString('base64'),
  };
}

function textBlob(value) {
  return {
    encoding: 'base64',
    content: Buffer.from(value).toString('base64'),
  };
}

function fixtureRequest({ prerelease = false, truncated = false } = {}) {
  const requests = [];
  const manifests = {
    base: blob({
      name: '@hashicorp/fixture',
      version: '1.0.0',
      dependencies: {},
    }),
    head: blob({
      name: '@hashicorp/fixture',
      version: prerelease ? '1.1.0-rc.0' : '1.1.0',
      devDependencies: { '@hashicorp/other': 'workspace:*' },
    }),
  };

  const request = (path) => {
    requests.push(path);

    if (path.endsWith(`/trees/${baseSha}?recursive=1`)) {
      return {
        truncated,
        tree: [
          {
            path: 'packages/fixture/package.json',
            sha: baseManifestSha,
          },
        ],
      };
    }

    if (path.endsWith(`/trees/${headSha}?recursive=1`)) {
      return {
        truncated: false,
        tree: [
          {
            path: 'packages/fixture/package.json',
            sha: headManifestSha,
          },
        ],
      };
    }

    if (path.endsWith(`/blobs/${baseManifestSha}`)) {
      return manifests.base;
    }

    if (path.endsWith(`/blobs/${headManifestSha}`)) {
      return manifests.head;
    }

    throw new Error(`Unexpected request: ${path}`);
  };

  return { request, requests };
}

test('discovers stable version changes and internal dependency metadata read-only', () => {
  const { request, requests } = fixtureRequest();
  const client = createGitHubClient(request);
  const packages = client.getChangedPackageVersions(baseSha, headSha);

  assert.deepEqual(packages, [
    {
      name: '@hashicorp/fixture',
      version: '1.1.0',
      previousVersion: '1.0.0',
      manifestPath: 'packages/fixture/package.json',
      dependencies: { '@hashicorp/other': 'workspace:*' },
    },
  ]);
  assert.ok(requests.every((path) => path.startsWith('repos/hashicorp/design-system/')));
  assert.equal(requests.some((path) => path.includes('pulls/')), false);
});

test('rejects truncated trees rather than planning from partial package data', () => {
  const { request } = fixtureRequest({ truncated: true });
  const client = createGitHubClient(request);

  assert.throws(
    () => client.getChangedPackageVersions(baseSha, headSha),
    /truncated/
  );
});

test('rejects prerelease package versions in a stable release PR', () => {
  const { request } = fixtureRequest({ prerelease: true });
  const client = createGitHubClient(request);

  assert.throws(
    () => client.getChangedPackageVersions(baseSha, headSha),
    /Invalid package identity or version/
  );
});

test('includes newly added workspace packages in the release set', () => {
  const requests = [];
  const request = (path) => {
    requests.push(path);

    if (path.endsWith(`/trees/${baseSha}?recursive=1`)) {
      return { truncated: false, tree: [] };
    }

    if (path.endsWith(`/trees/${headSha}?recursive=1`)) {
      return {
        truncated: false,
        tree: [
          {
            path: 'packages/new-package/package.json',
            sha: 'e'.repeat(40),
          },
        ],
      };
    }

    if (path.endsWith(`/blobs/${'e'.repeat(40)}`)) {
      return blob({ name: '@hashicorp/new-package', version: '1.0.0' });
    }

    throw new Error(`Unexpected request: ${path}`);
  };
  const packages = createGitHubClient(request).getChangedPackageVersions(
    baseSha,
    headSha
  );

  assert.deepEqual(packages, [
    {
      name: '@hashicorp/new-package',
      version: '1.0.0',
      previousVersion: null,
      manifestPath: 'packages/new-package/package.json',
      dependencies: {},
    },
  ]);
  assert.equal(requests.length, 3);
});

test('reads exact RC versions from the successful publication comment for the PR head', () => {
  const commentsPath =
    'repos/hashicorp/design-system/issues/4251/comments?per_page=100&sort=updated&direction=desc';
  const comment = `### :package: RC Packages Published

Latest commit: ${headSha}

<details><summary>Published 2 packages</summary>

#### @hashicorp/design-system-components@7.1.0-rc-20261028211913
\`\`\`
pnpm up @hashicorp/design-system-components@rc
\`\`\`
#### @hashicorp/design-system-mcp@0.2.3-rc-20261028211913
\`\`\`
pnpm up @hashicorp/design-system-mcp@rc
\`\`\`

</details>
<!-- Sticky Pull Request Commentrc-release -->`;
  const requests = [];
  const client = createGitHubClient((path) => {
    requests.push(path);
    assert.equal(path, commentsPath);
    return [{ body: comment }];
  });

  assert.deepEqual(client.getPublishedCandidatePackages(4251, headSha), [
    {
      name: '@hashicorp/design-system-components',
      version: '7.1.0',
      candidateVersion: '7.1.0-rc-20261028211913',
    },
    {
      name: '@hashicorp/design-system-mcp',
      version: '0.2.3',
      candidateVersion: '0.2.3-rc-20261028211913',
    },
  ]);
  assert.deepEqual(requests, [commentsPath]);
});

test('rejects candidate publication comments for stale heads or invalid package lists', () => {
  const staleComment = `Latest commit: ${baseSha}
<summary>Published 1 packages</summary>
#### @hashicorp/design-system-components@7.1.0-rc-20261028211913
<!-- Sticky Pull Request Commentrc-release -->`;
  const invalidComment = `Latest commit: ${headSha}
<summary>Published 2 packages</summary>
#### @hashicorp/design-system-components@7.1.0-rc-20261028211913
<!-- Sticky Pull Request Commentrc-release -->`;

  for (const [body, error] of [
    [staleComment, /does not match the current PR head SHA/],
    [invalidComment, /invalid package list/],
  ]) {
    const client = createGitHubClient(() => [{ body }]);

    assert.throws(
      () => client.getPublishedCandidatePackages(4251, headSha),
      error
    );
  }
});

test('inspects consumer manifest and pnpm locked resolution at the exact main SHA', () => {
  const consumerCommitSha = 'f'.repeat(40);
  const consumerTreeSha = '1'.repeat(40);
  const frontendTreeSha = '4'.repeat(40);
  const appTreeSha = '5'.repeat(40);
  const manifestSha = '2'.repeat(40);
  const lockSha = '3'.repeat(40);
  const rootManifestSha = '6'.repeat(40);
  const requests = [];
  const request = (path) => {
    requests.push(path);

    if (path === 'repos/example/consumer-a/branches/main') {
      return {
        name: 'main',
        commit: {
          sha: consumerCommitSha,
          commit: { tree: { sha: consumerTreeSha } },
        },
      };
    }

    if (path === `repos/example/consumer-a/git/trees/${consumerTreeSha}`) {
      return {
        truncated: false,
        tree: [
          { path: 'frontend', type: 'tree', sha: frontendTreeSha },
          { path: 'package.json', type: 'blob', sha: rootManifestSha },
          { path: 'pnpm-lock.yaml', type: 'blob', sha: lockSha },
        ],
      };
    }

    if (path === `repos/example/consumer-a/git/trees/${frontendTreeSha}`) {
      return {
        truncated: false,
        tree: [{ path: 'app', type: 'tree', sha: appTreeSha }],
      };
    }

    if (path === `repos/example/consumer-a/git/trees/${appTreeSha}`) {
      return {
        truncated: false,
        tree: [{ path: 'package.json', type: 'blob', sha: manifestSha }],
      };
    }

    if (path === `repos/example/consumer-a/git/blobs/${manifestSha}`) {
      return textBlob(
        JSON.stringify({
          devDependencies: {
            '@hashicorp/design-system-components': '7.0.0',
          },
        })
      );
    }

    if (path === `repos/example/consumer-a/git/blobs/${rootManifestSha}`) {
      return textBlob(JSON.stringify({ packageManager: 'pnpm@11.1.3' }));
    }

    if (path === `repos/example/consumer-a/git/blobs/${lockSha}`) {
      return textBlob(`lockfileVersion: '9.0'
importers:
  frontend/app:
    devDependencies:
      '@hashicorp/design-system-components':
        specifier: 7.0.0
        version: 7.0.0(@ember/test-helpers@5.4.3)
packages:
`);
    }

    throw new Error(`Unexpected request: ${path}`);
  };
  const snapshot = createGitHubClient(request).getConsumerSnapshot(
    'example/consumer-a',
    'frontend/app',
    ['@hashicorp/design-system-components']
  );

  assert.deepEqual(snapshot, {
    repository: 'example/consumer-a',
    ref: 'main',
    commitSha: consumerCommitSha,
    manifestPath: 'frontend/app/package.json',
    lockfile: 'pnpm-lock.yaml',
    packageManager: 'pnpm@11.1.3',
    dependencies: {
      '@hashicorp/design-system-components': {
        declaredVersion: '7.0.0',
        lockfile: {
          specifier: '7.0.0',
          resolvedVersion: '7.0.0',
        },
      },
    },
  });
  assert.ok(requests.every((path) => path.startsWith('repos/example/consumer-a/')));
});

test('rejects consumer repository and package-root traversal before reads', () => {
  const requests = [];
  const client = createGitHubClient((path) => {
    requests.push(path);
    throw new Error('Should not read');
  });

  assert.throws(
    () => client.getConsumerSnapshot('example/consumer-a?ref=other', '.', []),
    /Invalid consumer repository/
  );
  assert.throws(
    () => client.getConsumerSnapshot('example/consumer-a', '../outside', []),
    /Invalid consumer package root/
  );
  assert.deepEqual(requests, []);
});

test('reads a non-main consumer target ref through the branch endpoint', () => {
  const sha = 'f'.repeat(40);
  const treeSha = '1'.repeat(40);
  const manifestSha = '2'.repeat(40);
  const requests = [];
  const client = createGitHubClient((path) => {
    requests.push(path);

    if (path === 'repos/example/consumer-a/branches/release%2F2.x') {
      return { name: 'release/2.x', commit: { sha, commit: { tree: { sha: treeSha } } } };
    }

    if (path === `repos/example/consumer-a/git/trees/${treeSha}`) {
      return { truncated: false, tree: [{ path: 'package.json', type: 'blob', sha: manifestSha }] };
    }

    if (path === `repos/example/consumer-a/git/blobs/${manifestSha}`) {
      return textBlob(JSON.stringify({ devDependencies: { '@hashicorp/design-system-components': '7.0.0' } }));
    }

    throw new Error(`Unexpected request: ${path}`);
  });
  const snapshot = client.getConsumerSnapshot(
    'example/consumer-a', '.', ['@hashicorp/design-system-components'], 'release/2.x'
  );

  assert.equal(snapshot.ref, 'release/2.x');
  assert.equal(snapshot.commitSha, sha);
  assert.ok(requests.every((path) => !path.includes('/commits/main')));
});

test('rejects invalid target refs and branch lookups that return another name', () => {
  const requests = [];
  const client = createGitHubClient((path) => {
    requests.push(path);
    return { name: 'something-else', commit: { sha: 'f'.repeat(40) } };
  });

  for (const ref of ['', '-x', '--upload-pack=x', 'a..b', 'a//b', 'a/', 'a.lock', 'a b', 'a~1', 'a^', 'a:b', '/a', 'v1.', 'x'.repeat(101)]) {
    assert.throws(
      () => client.getConsumerSnapshot('example/consumer-a', '.', [], ref),
      /Invalid consumer target ref/,
      `ref ${JSON.stringify(ref)}`
    );
  }

  assert.deepEqual(requests, []);
  assert.throws(
    () => client.getConsumerSnapshot('example/consumer-a', '.', [], 'master'),
    /no branch named master/
  );
});

test('lists all matching open smoke-test PR pages with read-only requests', () => {
  const calls = [];
  const client = createGitHubClient((path, options) => {
    calls.push([path, options]);
    return path.endsWith('page=1')
      ? Array.from({ length: 100 }, (_, index) => ({ number: index + 1 }))
      : [{ number: 101 }];
  });

  const prs = client.getSmokeTestPullRequests(
    'example/consumer', 'hds-smoke-test/pr-4251/example'
  );

  assert.equal(prs.length, 101);
  assert.equal(calls.length, 2);
  assert.ok(calls.every(([path, options]) =>
    path.startsWith('repos/example/consumer/pulls?state=open&base=main&head=example%3A') &&
    options === undefined
  ));
});

test('lists smoke-test PRs against the configured base ref and rejects unsafe ones', () => {
  const calls = [];
  const client = createGitHubClient((path) => {
    calls.push(path);
    return [];
  });

  client.getSmokeTestPullRequests('example/consumer', 'hds-smoke-test/pr-4251/example', 'master');
  assert.ok(calls[0].startsWith('repos/example/consumer/pulls?state=open&base=master&head='));

  for (const baseRef of ['', '-x', 'a..b', 'a b']) {
    assert.throws(
      () => client.getSmokeTestPullRequests('example/consumer', 'hds-smoke-test/pr-4251/example', baseRef),
      /Invalid smoke-test repository, branch, or base ref/
    );
  }

  assert.equal(calls.length, 1);
});

test('consumer PR closure uses an explicit REST PATCH and checks the result', () => {
  const calls = [];
  const client = createGitHubClient((path, options) => {
    calls.push([path, options]);
    return { state: 'closed', merged_at: null };
  });
  client.closeConsumerPullRequest('example/consumer', 12);
  assert.deepEqual(calls, [[
    'repos/example/consumer/pulls/12',
    { method: 'PATCH', fields: ['-f', 'state=closed'] },
  ]]);

  assert.throws(
    () => createGitHubClient(() => ({ state: 'open' }))
      .closeConsumerPullRequest('example/consumer', 12),
    /did not confirm closing/
  );
});
