import assert from 'node:assert/strict';
import test from 'node:test';
import { prepareSmokeTest } from './prepare.mjs';

const consumer = {
  id: 'consumer-a',
  publicName: 'Example Product A',
  repository: 'example/consumer-a',
  packageRoot: 'frontend/app',
  hdsDependencies: ['@hashicorp/design-system-components'],
  expectedChecks: ['example-tests / example-tests-summary'],
  preview: { workflow: 'example-preview.yml', selector: 'example-preview' },
};
const config = { consumers: [consumer] };

function fakeGitHub({ candidateVersion = '7.1.0-rc-20261028211913' } = {}) {
  return {
    async getPullRequest() {
      return {
        state: 'open',
        merged_at: null,
        title: 'Release candidate test',
        base: {
          repo: { full_name: 'hashicorp/design-system' },
          ref: 'main',
          sha: 'a'.repeat(40),
        },
        head: {
          repo: { full_name: 'hashicorp/design-system' },
          ref: 'test',
          sha: 'b'.repeat(40),
        },
      };
    },
    async getPublishedCandidatePackages() {
      return [{
        name: '@hashicorp/design-system-components',
        version: '7.1.0',
        candidateVersion,
      }];
    },
    async getConsumerSnapshot(repository, packageRoot, dependencyNames) {
      return {
        repository,
        ref: 'main',
        commitSha: 'c'.repeat(40),
        manifestPath: `${packageRoot}/package.json`,
        lockfile: 'pnpm-lock.yaml',
        packageManager: 'pnpm@11.1.3',
        dependencies: Object.fromEntries(
          dependencyNames.map((name) => [
            name,
            {
              declaredVersion: '7.0.0',
              lockfile: {
                specifier: '7.0.0',
                resolvedVersion: '7.0.0',
              },
            },
          ])
        ),
      };
    },
  };
}

test('prepares exact candidate dependency changes in a local workspace only', async () => {
  let workspaceInput;
  const result = await prepareSmokeTest({
    pullRequestNumber: 4251,
    config,
    projectIds: ['consumer-a'],
    outputDir: '/tmp/consumer-a-smoke-test',
    github: fakeGitHub(),
    async prepareWorkspace(input) {
      workspaceInput = input;
      return {
        workspacePath: input.outputDir,
        changedFiles: [
          'frontend/app/package.json',
          'pnpm-lock.yaml',
        ],
      };
    },
  });

  assert.equal(workspaceInput.baseSha, 'c'.repeat(40));
  assert.equal(workspaceInput.packageManager, 'pnpm@11.1.3');
  assert.equal(workspaceInput.branch, 'hds-smoke-test/pr-4251/consumer-a');
  assert.deepEqual(workspaceInput.dependencies, [{
    name: '@hashicorp/design-system-components',
    candidateVersion: '7.1.0-rc-20261028211913',
  }]);
  assert.equal(result.mode, 'prepared-not-submitted');
  assert.equal(result.remoteMutationCount, 0);
  assert.equal(result.draftPullRequest.draft, true);
  assert.match(result.draftPullRequest.bodyMarker, /#4251:consumer-a/);
  assert.deepEqual(result.changedFiles, [
    'frontend/app/package.json',
    'pnpm-lock.yaml',
  ]);
  assert.ok(result.pending.some((item) => item.includes('Open the consumer pull request')));
});

test('requires a single project, output directory, and published candidate', async () => {
  for (const [options, error] of [
    [{ projectIds: [], outputDir: '/tmp/x' }, /exactly one --project/],
    [{ projectIds: ['consumer-a'], outputDir: undefined }, /--output-dir/],
    [{ projectIds: ['consumer-a'], outputDir: '/tmp/x', github: fakeGitHub({ candidateVersion: null }) }, /no published candidate/],
  ]) {
    await assert.rejects(
      prepareSmokeTest({
        pullRequestNumber: 4251,
        config,
        projectIds: ['consumer-a'],
        outputDir: '/tmp/x',
        github: fakeGitHub(),
        prepareWorkspace: async () => assert.fail('Must not prepare'),
        ...options,
      }),
      error
    );
  }
});
