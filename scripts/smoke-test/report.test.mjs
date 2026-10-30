import assert from 'node:assert/strict';
import test from 'node:test';
import { buildReport } from './report.mjs';
import { runCli } from './index.mjs';
import { smokeTestIdentity } from './cleanup.mjs';

const head = 'a'.repeat(40);
const candidateHead = 'b'.repeat(40);
const changedHead = 'c'.repeat(40);
const name = '@hashicorp/design-system-components';
const version = '7.1.0-rc-20261030172200';
const consumer = {
  id: 'consumer-a', repository: 'example/consumer-a', publicName: 'Example Product',
  packageRoot: 'frontend/app', hdsDependencies: [name],
  expectedChecks: ['tests', 'build', 'missing'],
  preview: { workflow: 'preview.yml', selector: 'preview' },
};
const config = { consumers: [consumer] };
const blob = (text) => ({ encoding: 'base64', content: Buffer.from(text).toString('base64') });

function fixture(overrides = {}) {
  const calls = [];
  let candidateReads = 0;
  const pr = {
    number: 12, html_url: 'https://github.com/example/consumer-a/pull/12', draft: true,
    body: smokeTestIdentity(42, consumer.id).marker,
    base: { ref: 'main', repo: { full_name: consumer.repository } },
    head: { sha: head, ref: smokeTestIdentity(42, consumer.id).branch, repo: { full_name: consumer.repository } },
  };
  const request = async (endpoint) => {
    calls.push(endpoint);
    if (overrides.read) {
      const result = await overrides.read(endpoint);
      if (result !== undefined) return result;
    }
    if (endpoint === 'repos/hashicorp/design-system/pulls/42') {
      candidateReads += 1;
      return { html_url: 'https://github.com/hashicorp/design-system/pull/42', state: 'open',
        head: { sha: overrides.candidateChanged && candidateReads > 1 ? changedHead : candidateHead } };
    }
    if (endpoint.includes('/issues/42/comments?')) return [{
      body: `Latest commit: ${candidateHead}\n<summary>Published 1 packages</summary>\n#### ${name}@${version}\n<!-- Sticky Pull Request Commentrc-release -->`,
    }];
    if (endpoint.includes('/pulls?')) return overrides.noPr ? [] : [{ ...pr, ...overrides.pr }];
    if (endpoint.endsWith('/pulls/12')) return { ...pr, head: { ...pr.head, sha: overrides.headChanged ? changedHead : head } };
    if (endpoint.includes('/check-runs?')) return { check_runs: [
      { id: 1, name: 'tests', status: 'completed', conclusion: 'failure' },
      { id: 2, name: 'tests', status: 'completed', conclusion: 'success' },
      { id: 3, name: 'build', status: 'in_progress', conclusion: null },
    ] };
    if (endpoint.includes(`/commits/${head}/statuses?`)) return [
      { id: 4, context: 'legacy-check', state: 'failure' },
    ];
    if (endpoint.includes('/contents/frontend/app/package.json?')) return blob(JSON.stringify({
      devDependencies: { [name]: overrides.version ?? version },
    }));
    if (endpoint.includes('/contents/pnpm-lock.yaml?')) return blob(`lockfileVersion: '9.0'
importers:
  frontend/app:
    devDependencies:
      '${name}':
        specifier: ${version}
        version: ${version}(ember-source@5.12.0)
packages:
`);
    if (endpoint.includes('/deployments?')) return [
      { id: 9, sha: head, environment: 'preview' },
      { id: 10, sha: changedHead, environment: 'preview' },
    ];
    if (endpoint.includes('/deployments/9/statuses?')) return [{
      state: 'success', environment_url: 'https://preview.example.com',
    }];
    assert.fail(`Unexpected read: ${endpoint}`);
  };
  return { calls, request };
}

test('report collects current checks, exact locked versions, and head-specific preview without planning', async () => {
  const f = fixture();
  const report = await buildReport({ pullRequestNumber: 42, config, request: f.request });
  assert.equal(report.state, 'complete');
  assert.equal(report.remoteMutationCount, 0);
  const row = report.projects[0].pullRequests[0];
  assert.equal(row.state, 'current');
  assert.equal(row.versions.value[0].matchesCandidate, true);
  assert.equal(row.preview.value.deployments[0].url, 'https://preview.example.com');
  assert.equal(row.preview.value.deployments[0].humanApproved, false);
  assert.equal(row.preview.value.deployments[0].productionBuildVerified, false);
  assert.deepEqual(row.ci.value.required.map((c) => c.results[0].state), ['success', 'pending', 'missing']);
  assert.equal(row.ci.value.observed.find((c) => c.name === 'legacy-check').state, 'failure');
  assert.equal(f.calls.some((p) => p.includes('commits/main') || p.includes('/git/trees')), false);
  assert.equal(f.calls.filter((p) => p.includes('/check-runs?')).length, 1);
});

test('new consumer heads and candidate changes invalidate evidence', async () => {
  for (const [options, state] of [
    [{ headChanged: true }, 'partial'],
    [{ candidateChanged: true }, 'unverified-candidate'],
  ]) {
    const report = await buildReport({ pullRequestNumber: 42, config, request: fixture(options).request });
    assert.equal(report.state, state);
    if (options.headChanged) assert.equal(report.projects[0].pullRequests[0].state, 'stale');
  }
});

test('manifest mismatch never claims the candidate was verified', async () => {
  const report = await buildReport({
    pullRequestNumber: 42, config, request: fixture({ version: '7.0.0' }).request,
  });
  assert.equal(report.projects[0].pullRequests[0].versions.value[0].matchesCandidate, false);
});

test('unavailable checks do not discard preview and version evidence', async () => {
  const report = await buildReport({
    pullRequestNumber: 42, config,
    request: fixture({ read(endpoint) {
      if (endpoint.includes('/check-runs?')) throw new Error('Read timed out');
    } }).request,
  });
  assert.equal(report.state, 'partial');
  const row = report.projects[0].pullRequests[0];
  assert.equal(row.ci.state, 'unavailable');
  assert.match(row.ci.error, /timed out/);
  assert.equal(row.preview.state, 'available');
  assert.equal(row.versions.state, 'available');
});

test('discovery access failure is distinct from no PR', async () => {
  for (const failed of [false, true]) {
    const report = await buildReport({
      pullRequestNumber: 42, config,
      request: fixture({ noPr: true, read(endpoint) {
        if (failed && endpoint.includes('/pulls?')) throw new Error('Access denied');
      } }).request,
    });
    assert.equal(report.projects[0].discovery.state, failed ? 'unavailable' : 'available');
    assert.equal(report.state, failed ? 'partial' : 'complete');
    assert.deepEqual(report.projects[0].pullRequests, []);
  }
});

test('identity mismatch is reported without fetching evidence for the wrong PR', async () => {
  const f = fixture({ pr: { body: 'manual PR' } });
  const report = await buildReport({ pullRequestNumber: 42, config, request: f.request });
  assert.equal(report.state, 'partial');
  assert.equal(report.projects[0].pullRequests[0].state, 'identity-mismatch');
  assert.equal(f.calls.some((p) => p.includes('/check-runs')), false);
});

test('all configured repositories are discovered with at most four concurrent requests', async () => {
  let active = 0;
  let peak = 0;
  const f = fixture({ noPr: true });
  const report = await buildReport({
    pullRequestNumber: 42,
    config: { consumers: Array.from({ length: 8 }, (_, i) => ({
      ...consumer, id: `consumer-${i}`, repository: `example/consumer-${i}`,
    })) },
    async request(endpoint) {
      active += 1;
      peak = Math.max(peak, active);
      try {
        await new Promise((resolve) => setTimeout(resolve, 2));
        return await f.request(endpoint);
      } finally {
        active -= 1;
      }
    },
  });
  assert.equal(report.projects.length, 8);
  assert.equal(f.calls.filter((p) => p.includes('/pulls?')).length, 8);
  assert.equal(peak, 4);
});

test('check pagination includes later pages and partial pages are not treated as complete', async () => {
  for (const failSecond of [false, true]) {
    const f = fixture({ read(endpoint) {
      if (!endpoint.includes('/check-runs?')) return;
      if (endpoint.endsWith('page=1')) return { check_runs: Array.from({ length: 100 }, (_, id) => ({
        id, name: `check-${id}`, status: 'completed', conclusion: 'success',
      })) };
      if (failSecond) throw new Error('Second page unavailable');
      return { check_runs: [{ id: 101, name: 'tests', status: 'completed', conclusion: 'failure' }] };
    } });
    const report = await buildReport({ pullRequestNumber: 42, config, request: f.request });
    const ci = report.projects[0].pullRequests[0].ci;
    assert.equal(ci.state, failSecond ? 'unavailable' : 'available');
    if (!failSecond) assert.equal(ci.value.required[0].results[0].state, 'failure');
  }
});

test('report CLI defaults to the local config, scopes projects, and emits partial report with exit 2', async () => {
  const stdout = { value: '', write(value) { this.value += value; } };
  const stderr = { value: '', write(value) { this.value += value; } };
  const code = await runCli(['report', '--pr', '42', '--project', consumer.id], {
    stdout, stderr,
    readConfig: async () => config,
    reportRequest: fixture({ headChanged: true }).request,
  });
  assert.equal(code, 2);
  assert.equal(JSON.parse(stdout.value).mode, 'report');
  assert.match(stderr.value, /stale evidence/);
});

test('missing publication evidence returns an unverified candidate, not an empty success report', async () => {
  const report = await buildReport({
    pullRequestNumber: 42, config,
    request: fixture({ read(endpoint) {
      if (endpoint.includes('/issues/42/comments?')) return [];
    } }).request,
  });
  assert.equal(report.state, 'unverified-candidate');
  assert.equal(report.candidate.state, 'unavailable');
  assert.equal(report.projects[0].pullRequests[0].versions.value[0].matchesCandidate, false);
});

test('project selectors prevent unrelated reads and unconfigured preview is explicit', async () => {
  const f = fixture();
  const report = await buildReport({
    pullRequestNumber: 42,
    projectIds: [consumer.id],
    config: { consumers: [
      { ...consumer, expectedChecks: [], preview: {} },
      { ...consumer, id: 'excluded', repository: 'example/excluded' },
    ] },
    request: f.request,
  });
  const row = report.projects[0].pullRequests[0];
  assert.equal(report.projects.length, 1);
  assert.equal(row.ci.value.requiredConfigured, false);
  assert.equal(row.preview.value.configured, false);
  assert.equal(f.calls.some((p) => p.includes('/deployments') || p.includes('/excluded/')), false);
});
