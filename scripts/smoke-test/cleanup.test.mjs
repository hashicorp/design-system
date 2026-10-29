import assert from 'node:assert/strict';
import test from 'node:test';
import { cleanupSmokeTests, smokeTestIdentity } from './cleanup.mjs';

const consumer = {
  id: 'example',
  repository: 'example/consumer',
  packageRoot: '.',
  hdsDependencies: ['@hashicorp/design-system-components'],
  expectedChecks: [],
  preview: {},
};
const config = { consumers: [consumer] };
const identity = smokeTestIdentity(4251, consumer.id);

function pullRequest(overrides = {}) {
  return {
    number: 12,
    state: 'open',
    draft: true,
    merged_at: null,
    body: `Smoke test\n${identity.marker}`,
    base: { ref: 'main', repo: { full_name: consumer.repository } },
    head: { ref: identity.branch, repo: { full_name: consumer.repository } },
    ...overrides,
  };
}

function fakeGitHub({ prs = [pullRequest()], live = pullRequest() } = {}) {
  const calls = [];

  return {
    calls,
    getSmokeTestPullRequests(repository, branch) {
      calls.push(['list', repository, branch]);
      return prs;
    },
    getConsumerPullRequest(repository, number) {
      calls.push(['read', repository, number]);
      return live;
    },
    closeConsumerPullRequest(repository, number) {
      calls.push(['close', repository, number]);
    },
  };
}

test('cleanup previews candidate-scoped draft PRs without mutations by default', async () => {
  const github = fakeGitHub();
  const result = await cleanupSmokeTests({
    pullRequestNumber: 4251, config, github,
  });

  assert.equal(result.mode, 'dry-run');
  assert.equal(result.mutationCount, 0);
  assert.deepEqual(result.pullRequests, [{
    project: 'example',
    repository: consumer.repository,
    pullRequest: 12,
    action: 'would-close',
  }]);
  assert.deepEqual(github.calls, [['list', consumer.repository, identity.branch]]);
});

test('executing cleanup rechecks each PR before closing it', async () => {
  const github = fakeGitHub();
  const result = await cleanupSmokeTests({
    pullRequestNumber: 4251, config, github, dryRun: false,
  });

  assert.equal(result.mutationCount, 1);
  assert.equal(result.pullRequests[0].action, 'closed');
  assert.deepEqual(github.calls, [
    ['list', consumer.repository, identity.branch],
    ['read', consumer.repository, 12],
    ['close', consumer.repository, 12],
  ]);
});

test('cleanup rejects unmarked, non-draft, merged, fork, and other candidate PRs', async () => {
  for (const overrides of [
    { body: 'A similar title is not proof of ownership' },
    { body: smokeTestIdentity(4252, consumer.id).marker },
    { draft: false },
    { merged_at: '2026-10-28T00:00:00Z' },
    { head: { ref: identity.branch, repo: { full_name: 'example/fork' } } },
    { base: { ref: 'other', repo: { full_name: consumer.repository } } },
  ]) {
    const github = fakeGitHub({ prs: [pullRequest(overrides)] });

    await assert.rejects(
      cleanupSmokeTests({ pullRequestNumber: 4251, config, github, dryRun: false }),
      /refusing cleanup/
    );
    assert.equal(github.calls.some(([operation]) => operation === 'close'), false);
  }
});

test('cleanup refuses a PR whose identity changed after discovery', async () => {
  const github = fakeGitHub({ live: pullRequest({ body: 'Changed' }) });

  await assert.rejects(
    cleanupSmokeTests({ pullRequestNumber: 4251, config, github, dryRun: false }),
    /changed before cleanup/
  );
  assert.equal(github.calls.some(([operation]) => operation === 'close'), false);
});

test('cleanup only reads selected projects and is repeatable when none remain', async () => {
  const github = fakeGitHub({ prs: [] });
  const result = await cleanupSmokeTests({
    pullRequestNumber: 4251,
    config: { consumers: [consumer, { ...consumer, id: 'unselected' }] },
    github,
    projectIds: ['example'],
    dryRun: false,
  });

  assert.deepEqual(result.projects, ['example']);
  assert.deepEqual(result.pullRequests, []);
  assert.equal(result.mutationCount, 0);
  assert.deepEqual(github.calls, [['list', consumer.repository, identity.branch]]);
});

test('bulk cleanup closes smoke-test PRs across all configured projects', async () => {
  const second = { ...consumer, id: 'second', repository: 'example/second' };
  const secondIdentity = smokeTestIdentity(4251, second.id);
  const secondPr = pullRequest({
    number: 13,
    body: secondIdentity.marker,
    base: { ref: 'main', repo: { full_name: second.repository } },
    head: { ref: secondIdentity.branch, repo: { full_name: second.repository } },
  });
  const closed = [];
  const result = await cleanupSmokeTests({
    pullRequestNumber: 4251,
    config: { consumers: [consumer, second] },
    dryRun: false,
    github: {
      getSmokeTestPullRequests(repository) {
        return repository === consumer.repository ? [pullRequest()] : [secondPr];
      },
      getConsumerPullRequest(repository) {
        return repository === consumer.repository ? pullRequest() : secondPr;
      },
      closeConsumerPullRequest(repository, number) {
        closed.push([repository, number]);
      },
    },
  });

  assert.equal(result.mutationCount, 2);
  assert.deepEqual(closed, [[consumer.repository, 12], [second.repository, 13]]);
});

test('cleanup propagates closure failures and stops before further mutations', async () => {
  const github = fakeGitHub({ prs: [pullRequest(), pullRequest({ number: 13 })] });
  let closeCount = 0;
  github.closeConsumerPullRequest = () => {
    closeCount += 1;
    throw new Error('GitHub PATCH failed: permission denied');
  };

  await assert.rejects(
    cleanupSmokeTests({ pullRequestNumber: 4251, config, github, dryRun: false }),
    /permission denied/
  );
  assert.equal(closeCount, 1);
});
