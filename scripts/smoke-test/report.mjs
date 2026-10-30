import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { selectConsumers } from './plan.mjs';
import { smokeTestIdentity } from './cleanup.mjs';
import { parsePublishedCandidateComment, parsePnpmImporter } from './github.mjs';

const execute = promisify(execFile);
const repository = 'hashicorp/design-system';

async function githubGet(endpoint) {
  let stdout;
  try {
    ({ stdout } = await execute('gh', ['api', '--method', 'GET', endpoint], {
      encoding: 'utf8',
      timeout: 15_000,
      maxBuffer: 15 * 1024 * 1024,
    }));
  } catch (error) {
    // Do not echo gh stderr: it can contain private URLs or authentication details.
    throw new Error(error.killed
      ? 'GitHub read timed out after 15 seconds.'
      : 'GitHub read failed; check repository access and gh authentication.');
  }
  try {
    return JSON.parse(stdout);
  } catch {
    throw new Error('GitHub returned invalid JSON.');
  }
}

function concurrentReads(request) {
  let active = 0;
  const queue = [];
  function drain() {
    while (active < 4 && queue.length > 0) {
      const { endpoint, resolve, reject } = queue.shift();
      active += 1;
      Promise.resolve().then(() => request(endpoint)).then(resolve, reject).finally(() => {
        active -= 1;
        drain();
      });
    }
  }
  return (endpoint) => new Promise((resolve, reject) => {
    queue.push({ endpoint, resolve, reject });
    drain();
  });
}

function sha(value) {
  if (!/^[0-9a-f]{40,64}$/i.test(value ?? '')) {
    throw new Error('GitHub returned an invalid head SHA.');
  }
  return value;
}

async function pages(get, endpoint, key) {
  const result = [];
  for (let page = 1; page <= 100; page += 1) {
    const response = await get(`${endpoint}${endpoint.includes('?') ? '&' : '?'}per_page=100&page=${page}`);
    const items = key ? response[key] : response;
    if (!Array.isArray(items)) {
      throw new Error('GitHub returned an invalid paginated response.');
    }
    result.push(...items);
    if (items.length < 100) {
      return result;
    }
  }
  throw new Error('GitHub pagination limit reached; evidence is incomplete.');
}

async function evidence(read) {
  try {
    return { state: 'available', value: await read(), fetchedAt: new Date().toISOString() };
  } catch (error) {
    return { state: 'unavailable', error: error.message, fetchedAt: new Date().toISOString() };
  }
}

function checkState(check) {
  if (check.status !== 'completed') return 'pending';
  return check.conclusion ?? 'unknown';
}

function ciResult(checks, statuses, expectedChecks) {
  const latest = new Map();
  // Retain the newest attempt for each check; old failures must not override reruns.
  for (const check of [...checks].sort((a, b) => a.id - b.id)) {
    latest.set(`check:${check.name}`, {
      name: check.name, state: checkState(check), url: check.html_url,
    });
  }
  for (const status of [...statuses].sort((a, b) => a.id - b.id)) {
    latest.set(`status:${status.context}`, {
      name: status.context, state: status.state, url: status.target_url,
    });
  }
  const observed = [...latest.values()];
  const required = expectedChecks.map((name) => {
    const matches = observed.filter((check) => check.name === name);
    return { name, results: matches.length ? matches : [{ name, state: 'missing' }] };
  });
  return {
    requiredConfigured: expectedChecks.length > 0,
    required,
    observed,
  };
}

async function versionEvidence(get, consumer, headSha) {
  const prefix = `repos/${consumer.repository}/contents/`;
  const manifestPath = consumer.packageRoot === '.'
    ? 'package.json' : `${consumer.packageRoot}/package.json`;
  const [manifestBlob, lockBlob] = await Promise.all([
    get(`${prefix}${manifestPath}?ref=${headSha}`),
    get(`${prefix}pnpm-lock.yaml?ref=${headSha}`),
  ]);
  const decode = (blob) => {
    if (blob.encoding !== 'base64' || typeof blob.content !== 'string') {
      throw new Error('GitHub did not return a readable dependency file.');
    }
    return Buffer.from(blob.content, 'base64').toString('utf8');
  };
  const manifest = JSON.parse(decode(manifestBlob));
  const locked = parsePnpmImporter(decode(lockBlob), consumer.packageRoot, consumer.hdsDependencies);
  return consumer.hdsDependencies.map((name) => {
    const declarations = ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies']
      .filter((field) => Object.hasOwn(manifest[field] ?? {}, name))
      .map((field) => manifest[field][name]);
    return {
      name, declaredVersions: declarations, lockfile: locked[name],
      candidateVersion: null, matchesCandidate: false,
    };
  });
}

async function previewEvidence(get, consumer, headSha) {
  if (!consumer.preview.selector) {
    return { configured: false, deployments: [] };
  }
  const deployments = await pages(get,
    `repos/${consumer.repository}/deployments?sha=${headSha}&environment=${encodeURIComponent(consumer.preview.selector)}`);
  const matching = deployments.filter((item) =>
    item.sha === headSha && item.environment === consumer.preview.selector
  ).sort((a, b) => b.id - a.id);
  if (!matching.length) {
    return { configured: true, deployments: [] };
  }
  const deployment = matching[0];
  if (!Number.isSafeInteger(deployment.id)) {
    throw new Error('Invalid deployment identity.');
  }
  const statuses = await get(`repos/${consumer.repository}/deployments/${deployment.id}/statuses?per_page=1`);
  if (!Array.isArray(statuses)) throw new Error('Invalid deployment statuses.');
  const status = statuses[0];
  return {
    configured: true,
    deployments: [{
      id: deployment.id, headSha, environment: deployment.environment,
      state: status?.state ?? 'unknown', url: status?.environment_url ?? null,
      productionBuildVerified: false, reachabilityVerified: false, humanApproved: false,
    }],
  };
}

async function consumerReport(get, consumer, candidateNumber) {
  const identity = smokeTestIdentity(candidateNumber, consumer.id);
  const discovery = await evidence(() => pages(get,
    `repos/${consumer.repository}/pulls?state=open&base=main&head=${encodeURIComponent(`${consumer.repository.split('/')[0]}:${identity.branch}`)}`));
  const result = {
    project: consumer.id, publicName: consumer.publicName ?? null,
    repository: consumer.repository, discovery: { ...discovery, value: undefined }, pullRequests: [],
  };
  if (discovery.state !== 'available') return result;
  result.pullRequests = await Promise.all(discovery.value.map(async (pr) => {
    const row = { number: pr.number, url: pr.html_url, headSha: pr.head?.sha, draft: pr.draft };
    if (!Number.isSafeInteger(pr.number) || pr.number < 1 ||
        pr.head?.ref !== identity.branch || pr.head?.repo?.full_name !== consumer.repository ||
        pr.base?.ref !== 'main' || pr.base?.repo?.full_name !== consumer.repository ||
        typeof pr.body !== 'string' || !pr.body.split(/\r?\n/).includes(identity.marker) ||
        pr.draft !== true) {
      return { ...row, state: 'identity-mismatch', error: 'PR does not match the smoke-test identity.' };
    }
    const head = await evidence(async () => sha(pr.head.sha));
    if (head.state !== 'available') return { ...row, state: 'unavailable', error: head.error };
    const [ci, preview, versions] = await Promise.all([
      evidence(async () => {
        const [checks, statuses] = await Promise.all([
          pages(get, `repos/${consumer.repository}/commits/${head.value}/check-runs`, 'check_runs'),
          pages(get, `repos/${consumer.repository}/commits/${head.value}/statuses`),
        ]);
        return ciResult(checks, statuses, consumer.expectedChecks);
      }),
      evidence(() => previewEvidence(get, consumer, head.value)),
      evidence(() => versionEvidence(get, consumer, head.value)),
    ]);
    const finalHead = await evidence(async () => sha((await get(
      `repos/${consumer.repository}/pulls/${pr.number}`
    )).head?.sha));
    return {
      ...row, state: finalHead.state !== 'available' ? 'unverified-head' :
        finalHead.value !== head.value ? 'stale' : 'current',
      ci, preview, versions, finalHead,
    };
  }));
  return result;
}

export async function buildReport({
  pullRequestNumber, config, projectIds = [], request = githubGet,
}) {
  if (!Number.isSafeInteger(pullRequestNumber) || pullRequestNumber < 1) {
    throw new Error('Pull request number must be a positive integer.');
  }
  const consumers = selectConsumers(config, projectIds);
  const get = concurrentReads(request);
  const startedAt = new Date().toISOString();
  const candidatePath = `repos/${repository}/pulls/${pullRequestNumber}`;
  const candidateRead = evidence(async () => {
    const [pr, comments] = await Promise.all([
      get(candidatePath),
      pages(get, `repos/${repository}/issues/${pullRequestNumber}/comments`),
    ]);
    const headSha = sha(pr.head?.sha);
    const packages = parsePublishedCandidateComment(
      comments.sort((a, b) => (b.updated_at ?? '').localeCompare(a.updated_at ?? '')), headSha
    );
    return { url: pr.html_url, headSha, state: pr.state, packages };
  });
  // Start discovery across the entire selected inventory while reading the candidate.
  const discoveries = consumers.map((consumer) =>
    consumerReport(get, consumer, pullRequestNumber)
  );
  const [candidate, projects] = await Promise.all([candidateRead, Promise.all(discoveries)]);
  // Candidate publication evidence is required to interpret the gathered versions.
  if (candidate.state === 'available') {
    for (const project of projects) {
      for (const row of project.pullRequests) {
        if (row.versions?.state !== 'available') continue;
        for (const version of row.versions.value) {
          version.candidateVersion = candidate.value.packages.find((p) => p.name === version.name)?.candidateVersion ?? null;
          version.matchesCandidate = version.candidateVersion !== null &&
            version.declaredVersions.length === 1 && version.declaredVersions[0] === version.candidateVersion &&
            version.lockfile?.specifier === version.candidateVersion &&
            version.lockfile?.resolvedVersion === version.candidateVersion;
        }
      }
    }
  }
  const finalCandidateHead = await evidence(async () => sha((await get(candidatePath)).head?.sha));
  const stale = candidate.state !== 'available' || finalCandidateHead.state !== 'available' ||
    finalCandidateHead.value !== candidate.value.headSha;
  return {
    mode: 'report', startedAt, fetchedAt: new Date().toISOString(),
    candidatePullRequest: pullRequestNumber, candidate, finalCandidateHead,
    state: stale ? 'unverified-candidate' :
      projects.some((p) => p.discovery.state !== 'available' || p.pullRequests.some((r) =>
        r.state !== 'current' || [r.ci, r.preview, r.versions].some((e) => e?.state !== 'available')
      )) ? 'partial' : 'complete',
    projects, remoteMutationCount: 0,
    limitations: ['Configured app roots only; sibling roots are not verified.',
      'Production build, preview reachability, and human approval are not verified.',
      'This private local report is a timestamped snapshot, not release approval.'],
  };
}
