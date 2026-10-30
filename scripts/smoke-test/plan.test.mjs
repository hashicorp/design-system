import assert from 'node:assert/strict';
import test from 'node:test';
import { buildPlan } from './plan.mjs';

const consumer = {
  id: 'consumer-a',
  repository: 'example/consumer-a',
  packageRoot: 'frontend/app',
  hdsDependencies: ['@hashicorp/design-system-components'],
  expectedChecks: ['ember-tests'],
  preview: {
    workflow: 'preview',
    selector: 'production-deployment',
  },
};

function fakeGitHub(overrides = {}) {
  const calls = [];

  return {
    calls,
    async getPullRequest(number) {
      calls.push(['getPullRequest', number]);
      return {
        state: 'open',
        merged_at: null,
        title: 'Version Packages',
        base: {
          repo: { full_name: 'hashicorp/design-system' },
          ref: 'main',
          sha: 'a'.repeat(40),
        },
        head: {
          repo: { full_name: 'hashicorp/design-system' },
          ref: 'release-candidate-test',
          sha: 'b'.repeat(40),
        },
      };
    },
    async getPublishedCandidatePackages(number, headSha) {
      calls.push(['getPublishedCandidatePackages', number, headSha]);
      return [
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
      ];
    },
    async getConsumerSnapshot(repository, packageRoot, dependencyNames) {
      calls.push([
        'getConsumerSnapshot',
        repository,
        packageRoot,
        dependencyNames,
      ]);
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
    ...overrides,
  };
}

test('builds a dry-run plan from the exact published candidate PR SHA and configured consumers', async () => {
  const github = fakeGitHub();
  const plan = await buildPlan({
    pullRequestNumber: 4193,
    config: { consumers: [consumer] },
    github,
  });

  assert.equal(plan.mode, 'dry-run');
  assert.equal(plan.candidateSource.sourceSha, 'b'.repeat(40));
  assert.equal(plan.candidate.state, 'published');
  assert.equal(plan.candidate.verified, true);
  assert.equal(plan.candidate.packages[0].stagedVersion, '7.1.0');
  assert.equal(plan.candidate.packages[0].candidateVersion, '7.1.0-rc-20261028211913');
  assert.equal(plan.candidate.packages[0].consumerValidationConfigured, true);
  assert.deepEqual(plan.candidate.packages[1], {
    name: '@hashicorp/design-system-mcp',
    stagedVersion: '0.2.3',
    candidateVersion: '0.2.3-rc-20261028211913',
    consumerValidationConfigured: false,
  });
  assert.equal(plan.consumers[0].dependencies[0].declaredVersion, '7.0.0');
  assert.equal(plan.consumers[0].dependencies[0].resolvedVersion, '7.0.0');
  assert.equal(plan.consumers[0].dependencies[0].releaseVersion, '7.1.0');
  assert.equal(
    plan.consumers[0].dependencies[0].candidateVersion,
    '7.1.0-rc-20261028211913'
  );
  assert.equal(plan.consumers[0].targetRef, 'main');
  assert.equal(plan.consumers[0].baseSha, 'c'.repeat(40));
  assert.equal(plan.consumers[0].preview.verified, false);
  assert.equal(plan.mutationCount, 0);
  assert.ok(plan.blockers.length > 0);
  assert.deepEqual(
    github.calls.map(([name]) => name),
    [
      'getPullRequest',
      'getPublishedCandidatePackages',
      'getConsumerSnapshot',
    ]
  );
});

test('rejects closed, merged, and unexpected candidate pull requests', async () => {
  for (const change of [
    { state: 'closed' },
    { merged_at: '2026-01-01T00:00:00Z' },
    { head: { repo: { full_name: 'somewhere/else' } } },
  ]) {
    const github = fakeGitHub({
      async getPullRequest() {
        return {
          state: 'open',
          merged_at: null,
          base: {
            repo: { full_name: 'hashicorp/design-system' },
            ref: 'main',
            sha: 'a'.repeat(40),
          },
          head: {
            repo: { full_name: 'hashicorp/design-system' },
            ref: 'release-candidate-test',
            sha: 'b'.repeat(40),
          },
          ...change,
        };
      },
    });

    await assert.rejects(
      buildPlan({ pullRequestNumber: 4193, config: { consumers: [] }, github })
    );
  }
});

test('rejects candidate publication comments for a different PR head SHA', async () => {
  const github = fakeGitHub({
    async getPublishedCandidatePackages() {
      throw new Error(
        'The release-candidate publication does not match the current PR head SHA.'
      );
    },
  });

  await assert.rejects(
    buildPlan({ pullRequestNumber: 4251, config: { consumers: [] }, github }),
    /does not match the current PR head SHA/
  );
});

test('preview configuration only needs workflow and selector metadata', async () => {
  for (const preview of [{}, { workflow: 'preview' }, consumer.preview]) {
    const plan = await buildPlan({
      pullRequestNumber: 4251,
      config: { consumers: [{ ...consumer, preview }] },
      github: fakeGitHub(),
    });

    assert.deepEqual(plan.consumers[0].preview, {
      workflow: preview.workflow ?? null,
      selector: preview.selector ?? null,
      verified: false,
    });
    assert.ok(plan.blockers.some((blocker) =>
      blocker.includes(preview.selector ? 'readiness' : 'not configured')
    ));
  }
});

test('plans against a configured non-main target ref and rejects invalid refs before reads', async () => {
  const seen = [];
  const github = fakeGitHub({
    async getConsumerSnapshot(repository, packageRoot, dependencyNames, targetRef) {
      seen.push(targetRef);
      return {
        repository,
        ref: targetRef,
        commitSha: 'c'.repeat(40),
        manifestPath: `${packageRoot}/package.json`,
        lockfile: 'pnpm-lock.yaml',
        packageManager: 'pnpm@11.1.3',
        dependencies: Object.fromEntries(dependencyNames.map((name) => [name, {
          declaredVersion: '7.0.0',
          lockfile: { specifier: '7.0.0', resolvedVersion: '7.0.0' },
        }])),
      };
    },
  });
  const plan = await buildPlan({
    pullRequestNumber: 4251,
    config: { consumers: [{ ...consumer, targetRef: 'master' }, { ...consumer, id: 'consumer-b' }] },
    github,
  });

  assert.deepEqual(seen, ['master', 'main']);
  assert.deepEqual(plan.consumers.map(({ targetRef }) => targetRef), ['master', 'main']);
  assert.equal(plan.candidateSource.baseRef, 'main');

  for (const targetRef of ['', '-x', 'a..b', 'a b', 5, null]) {
    const rejecting = fakeGitHub();
    await assert.rejects(
      buildPlan({
        pullRequestNumber: 4251,
        config: { consumers: [{ ...consumer, targetRef }] },
        github: rejecting,
      }),
      /Invalid targetRef/
    );
    assert.deepEqual(rejecting.calls, []);
  }
});

test('rejects invalid preview metadata before GitHub reads', async () => {
  for (const preview of [
    { workflow: 123 },
    { selector: '' },
    { workflow: '   ' },
  ]) {
    const github = fakeGitHub();

    await assert.rejects(
      buildPlan({
        pullRequestNumber: 4251,
        config: { consumers: [{ ...consumer, preview }] },
        github,
      }),
      /Invalid preview/
    );
    assert.deepEqual(github.calls, []);
  }
});

test('rejects unsafe consumer paths and package names before remote reads', async () => {
  const github = fakeGitHub();
  const unsafeConsumer = {
    ...consumer,
    packageRoot: '../outside',
    hdsDependencies: ['@hashicorp/design-system-components'],
  };

  await assert.rejects(
    buildPlan({
      pullRequestNumber: 4193,
      config: { consumers: [unsafeConsumer] },
      github,
    }),
    /packageRoot/
  );
  assert.deepEqual(github.calls, []);
});

test('public summary includes only explicitly configured product names and generic states', async () => {
  const privateConsumer = {
    ...consumer,
    id: 'private-internal-id',
    publicName: 'Example Product',
    repository: 'private-org/internal-repository',
    packageRoot: 'private/application',
    expectedChecks: ['private-check'],
    preview: {
      ...consumer.preview,
      workflow: 'private-workflow',
      selector: 'private-deployment',
    },
  };
  const plan = await buildPlan({
    pullRequestNumber: 4193,
    config: { consumers: [privateConsumer] },
    github: fakeGitHub(),
  });

  assert.deepEqual(plan.publicSummary, {
    candidate: 'published',
    consumers: 1,
    productionPreviewsVerified: 0,
    state: 'planning',
    products: [{ name: 'Example Product', state: 'not-validated' }],
  });
  assert.equal(JSON.stringify(plan.publicSummary).includes('private-'), false);

  const withoutPublicName = await buildPlan({
    pullRequestNumber: 4193,
    config: { consumers: [consumer] },
    github: fakeGitHub(),
  });

  assert.deepEqual(withoutPublicName.publicSummary.products, []);
});
