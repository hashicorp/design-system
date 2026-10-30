import assert from 'node:assert/strict';
import test from 'node:test';
import { runCli } from './index.mjs';

const config = {
  consumers: [
    {
      id: 'consumer-a',
      publicName: 'Example Product',
      repository: 'example/consumer',
      packageRoot: 'frontend/app',
      hdsDependencies: ['@hashicorp/design-system-components'],
      expectedChecks: ['ember-tests'],
      preview: {
        workflow: 'preview',
        selector: 'production-deployment',
      },
    },
  ],
};

function fakeGitHub() {
  const calls = [];

  return {
    calls,
    async getPullRequest(number) {
      calls.push({ operation: 'read-pull-request', number });
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
          ref: 'release-candidate-test',
          sha: 'b'.repeat(40),
        },
      };
    },
    async getPublishedCandidatePackages() {
      calls.push({ operation: 'read-candidate-publication' });
      return [
        {
          name: '@hashicorp/design-system-components',
          version: '7.1.0',
          candidateVersion: '7.1.0-rc-20261028211913',
        },
      ];
    },
    async getConsumerSnapshot(repository, packageRoot, dependencyNames) {
      calls.push({ operation: 'read-consumer-snapshot', repository });
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

test('plan and run --dry-run produce the same plan without mutation operations', async () => {
  const plans = [];

  for (const args of [
    ['plan', '--pr', '4251', '--config', '/private/config.json'],
    ['run', '--pr', '4251', '--config', '/private/config.json', '--dry-run'],
  ]) {
    const stdout = { value: '', write(value) { this.value += value; } };
    const stderr = { value: '', write(value) { this.value += value; } };
    const github = fakeGitHub();
    const exitCode = await runCli(args, {
      stdout,
      stderr,
      github,
      async readConfig() {
        return config;
      },
    });

    assert.equal(exitCode, 2);
    assert.match(stderr.value, /blocker/);
    plans.push(JSON.parse(stdout.value));
    assert.ok(
      github.calls.every(({ operation }) => operation.startsWith('read-')),
      'dry-run must use read-only GitHub operations'
    );
    assert.equal(plans.at(-1).mutationCount, 0);
    assert.deepEqual(plans.at(-1).publicSummary, {
      candidate: 'published',
      consumers: 1,
      productionPreviewsVerified: 0,
      state: 'planning',
      products: [{ name: 'Example Product', state: 'not-validated' }],
    });
  }

  assert.deepEqual(plans[0], plans[1]);
});

test('uses the root local config by default and allows overriding it', async () => {
  for (const [args, expectedPath] of [
    [['plan', '--pr', '4251'], `${process.cwd()}/smoke-test.local.json`],
    [['plan', '--pr', '4251', '--config', '/private/config.json'], '/private/config.json'],
  ]) {
    let receivedPath;
    await runCli(args, {
      stdout: { write() {} },
      stderr: { write() {} },
      github: fakeGitHub(),
      async readConfig(configPath) {
        receivedPath = configPath;
        return config;
      },
    });

    assert.equal(receivedPath, expectedPath);
  }
});

test('run without --dry-run fails before reading config or contacting GitHub', async () => {
  let readCount = 0;
  const stdout = { write() {} };
  const stderr = { value: '', write(value) { this.value += value; } };

  const exitCode = await runCli(
    ['run', '--pr', '4251', '--config', '/private/config.json'],
    {
      stdout,
      stderr,
      github: {
        async getPullRequest() {
          assert.fail('GitHub must not be called for a rejected live run');
        },
      },
      async readConfig() {
        readCount += 1;
      },
    }
  );

  assert.equal(exitCode, 1);
  assert.equal(readCount, 0);
  assert.match(stderr.value, /no mutations were performed/);
});

test('repeatable project flags scope the plan and reject unknown IDs before GitHub reads', async () => {
  const allConsumers = [
    ...config.consumers,
    { ...config.consumers[0], id: 'second', repository: 'example/second' },
    { ...config.consumers[0], id: 'third', repository: 'example/third' },
  ];

  for (const projects of [['second', 'consumer-a'], ['missing']]) {
    const github = fakeGitHub();
    const stdout = { value: '', write(value) { this.value += value; } };
    const stderr = { value: '', write(value) { this.value += value; } };
    const exitCode = await runCli([
      'plan', '--pr', '4251', '--config', '/private/config.json',
      ...projects.flatMap((id) => ['--project', id]),
    ], {
      github, stdout, stderr,
      readConfig: async () => ({ consumers: allConsumers }),
    });

    if (projects.includes('missing')) {
      assert.equal(exitCode, 1);
      assert.match(stderr.value, /Unknown project id: missing/);
      assert.deepEqual(github.calls, []);
    } else {
      assert.equal(exitCode, 2);
      const plan = JSON.parse(stdout.value);
      assert.deepEqual(plan.consumers.map(({ id }) => id), ['consumer-a', 'second']);
      assert.equal(plan.publicSummary.consumers, 2);
      assert.deepEqual(
        github.calls.filter(({ operation }) => operation === 'read-consumer-snapshot')
          .map(({ repository }) => repository),
        ['example/consumer', 'example/second']
      );
    }
  }
});

test('cleanup defaults to dry-run and requires --execute for mutations', async () => {
  for (const execute of [false, true]) {
    let reads = 0;
    let closes = 0;
    const stdout = { value: '', write(value) { this.value += value; } };
    const pr = {
      number: 42, state: 'open', draft: true, merged_at: null,
      body: '<!-- hds-smoke-test:hashicorp/design-system#4251:consumer-a -->',
      base: { ref: 'main', repo: { full_name: 'example/consumer' } },
      head: {
        ref: 'hds-smoke-test/pr-4251/consumer-a',
        repo: { full_name: 'example/consumer' },
      },
    };
    const exitCode = await runCli([
      'cleanup', '--pr', '4251', '--config', '/private/config.json',
      ...(execute ? ['--execute'] : []),
    ], {
      stdout,
      stderr: { write(value) { assert.fail(value); } },
      readConfig: async () => config,
      github: {
        getSmokeTestPullRequests: async () => [pr],
        getConsumerPullRequest: async () => { reads += 1; return pr; },
        closeConsumerPullRequest: async () => { closes += 1; },
      },
    });

    assert.equal(exitCode, 0);
    assert.equal(reads, execute ? 1 : 0);
    assert.equal(closes, execute ? 1 : 0);
    assert.equal(JSON.parse(stdout.value).mutationCount, closes);
  }
});

test('cleanup rejects conflicting execution flags before config or GitHub reads', async () => {
  const stderr = { value: '', write(value) { this.value += value; } };
  const exitCode = await runCli([
    'cleanup', '--pr', '4251', '--config', '/private/config.json',
    '--execute', '--dry-run',
  ], {
    stderr,
    readConfig() { assert.fail('Config must not be read'); },
  });

  assert.equal(exitCode, 1);
  assert.match(stderr.value, /Do not combine/);
});

test('prepare requires one selected project and an output directory', async () => {
  for (const [args, message] of [
    [['prepare', '--pr', '4251', '--output-dir', '/tmp/out'], /exactly one --project/],
    [['prepare', '--pr', '4251', '--project', 'consumer-a'], /--output-dir/],
    [['prepare', '--pr', '4251', '--project', 'consumer-a', '--output-dir', '/tmp/out', '--dry-run'], /omit --dry-run/],
  ]) {
    const stderr = { value: '', write(value) { this.value += value; } };
    const exitCode = await runCli(args, {
      stderr,
      readConfig() { assert.fail('Config must not be read for invalid arguments'); },
    });

    assert.equal(exitCode, 1);
    assert.match(stderr.value, message);
  }
});

test('smoke-test is not a CLI subcommand', async () => {
  const stderr = { value: '', write(value) { this.value += value; } };
  const exitCode = await runCli(['smoke-test', '--pr', '4251'], {
    stderr,
    readConfig() { assert.fail('Config must not be read for an unsupported command'); },
  });

  assert.equal(exitCode, 1);
  assert.match(stderr.value, /Supported commands.*prepare/);
});
