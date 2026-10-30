import assert from 'node:assert/strict';
import test from 'node:test';
import { execFileSync } from 'node:child_process';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { prepareLocalWorkspace, prepareSmokeTest } from './prepare.mjs';

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

const candidateVersion = '7.1.0-rc-20261028211913';
const dependencyName = '@hashicorp/design-system-components';

function lockfile(version) {
  return `lockfileVersion: '9.0'
importers:
  frontend/app:
    devDependencies:
      '${dependencyName}':
        specifier: ${version}
        version: ${version}(ember-source@5.12.0)
packages:
`;
}

function git(cwd, args) {
  return execFileSync('git', args, {
    cwd,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    env: {
      ...process.env,
      GIT_CONFIG_NOSYSTEM: '1',
      GIT_CONFIG_GLOBAL: '/dev/null',
      GIT_AUTHOR_NAME: 'Test',
      GIT_AUTHOR_EMAIL: 'test@example.com',
      GIT_COMMITTER_NAME: 'Test',
      GIT_COMMITTER_EMAIL: 'test@example.com',
    },
  }).trim();
}

async function localFixture(t) {
  const root = await mkdtemp(path.join(tmpdir(), 'hds-smoke-test-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const source = path.join(root, 'source');
  const destination = path.join(root, 'checkout');
  await mkdir(path.join(source, consumer.packageRoot), { recursive: true });
  const manifestPath = path.join(consumer.packageRoot, 'package.json');
  const originalManifest = `${JSON.stringify({
    name: 'example-app',
    devDependencies: { [dependencyName]: '7.0.0', 'example-other': '1.0.0' },
  }, null, 2)}\n`;
  await writeFile(path.join(source, manifestPath), originalManifest);
  await writeFile(path.join(source, 'pnpm-lock.yaml'), lockfile('7.0.0'));
  await writeFile(path.join(source, 'pnpm-workspace.yaml'), 'packages:\n  - frontend/app\n');
  git(source, ['init', '--initial-branch=main']);
  git(source, ['add', '.']);
  git(source, ['commit', '-m', 'fixture']);
  const baseSha = git(source, ['rev-parse', 'HEAD']);
  const calls = [];
  let lockedVersion = candidateVersion;
  let installChange;
  let failInstall = false;
  const options = {
    consumer,
    dependencies: [{ name: dependencyName, candidateVersion }],
    packageManager: 'pnpm@11.1.3',
    baseSha,
    branch: 'hds-smoke-test/pr-4251/consumer-a',
    outputDir: destination,
    runCommand(command, args, settings) {
      calls.push({ command, args, settings });
      if (command === 'gh') {
        assert.deepEqual(args, [
          'repo', 'clone', consumer.repository, destination, '--',
          '--depth', '1', '--branch', 'main', '--single-branch', '--filter=blob:none',
        ]);
        git(root, ['clone', source, destination]);
        git(destination, ['remote', 'set-url', 'origin', `https://github.com/${consumer.repository}.git`]);
        return '';
      }
      if (command === 'corepack') {
        assert.equal(settings.cwd, destination);
        assert.deepEqual(args, [
          'pnpm@11.1.3', 'install', '--lockfile-only', '--ignore-scripts', '--no-frozen-lockfile',
        ]);
        assert.equal(settings.env.npm_config_minimum_release_age, '0');
        if (failInstall) {
          throw new Error('Fixture pnpm failure');
        }
        writeFileSync(path.join(destination, 'pnpm-lock.yaml'), lockfile(lockedVersion));
        installChange?.(destination);
        return '';
      }
      assert.equal(command, 'git', 'preparation must not execute other tools');
      assert.ok(!['push', 'commit'].includes(args[0]), 'preparation must remain local and uncommitted');
      return git(settings.cwd, args);
    },
  };
  return {
    options, calls, destination, originalManifest, manifestPath,
    setLockedVersion(value) { lockedVersion = value; },
    setInstallChange(callback) { installChange = callback; },
    setFailInstall() { failInstall = true; },
  };
}

test('local preparation writes exact versions, uses pinned pnpm safely, and resumes without recloning', async (t) => {
  const fixture = await localFixture(t);
  const result = await prepareLocalWorkspace(fixture.options);
  assert.deepEqual(result.changedFiles, ['frontend/app/package.json', 'pnpm-lock.yaml']);
  const manifest = JSON.parse(await readFile(path.join(fixture.destination, fixture.manifestPath), 'utf8'));
  assert.equal(manifest.devDependencies[dependencyName], candidateVersion);
  assert.equal(manifest.devDependencies['example-other'], '1.0.0');
  assert.equal(git(fixture.destination, ['rev-parse', 'HEAD']), fixture.options.baseSha);
  assert.equal(git(fixture.destination, ['branch', '--show-current']), fixture.options.branch);
  assert.equal(git(fixture.destination, ['diff', '--cached', '--name-only']), '');
  assert.deepEqual(await prepareLocalWorkspace(fixture.options), result);
  assert.equal(fixture.calls.filter(({ command }) => command === 'gh').length, 1);
});

test('local preparation rejects a stale base before changing the manifest or running pnpm', async (t) => {
  const fixture = await localFixture(t);
  await assert.rejects(prepareLocalWorkspace({
    ...fixture.options, baseSha: '0'.repeat(40),
  }), /main branch changed/);
  assert.equal(await readFile(path.join(fixture.destination, fixture.manifestPath), 'utf8'), fixture.originalManifest);
  assert.equal(fixture.calls.some(({ command }) => command === 'corepack'), false);
});

for (const [label, change, error] of [
  ['different repository', async (f) => git(f.destination, ['remote', 'set-url', 'origin', 'https://github.com/example/other.git']), /not a clone/],
  ['different branch', async (f) => git(f.destination, ['switch', '-c', 'other']), /not expected/],
  ['untracked file', async (f) => writeFile(path.join(f.destination, 'notes.txt'), 'Keep me\n'), /unrelated local changes/],
  ['modified tracked file', async (f) => writeFile(path.join(f.destination, 'pnpm-workspace.yaml'), 'Keep me\n'), /unrelated local changes/],
  ['staged unrelated file', async (f) => {
    await writeFile(path.join(f.destination, 'notes.txt'), 'Keep me\n');
    git(f.destination, ['add', 'notes.txt']);
  }, /unrelated local changes/],
  ['modified manifest', async (f) => writeFile(path.join(f.destination, f.manifestPath), '{}\n'), /unexpected package manifest edit/],
]) {
  test(`resume refuses ${label} without running pnpm`, async (t) => {
    const fixture = await localFixture(t);
    await prepareLocalWorkspace(fixture.options);
    await change(fixture);
    fixture.calls.length = 0;
    await assert.rejects(prepareLocalWorkspace(fixture.options), error);
    assert.equal(fixture.calls.some(({ command }) => command === 'corepack'), false);
  });
}

test('resume accepts the unchanged base manifest after an interrupted preparation', async (t) => {
  const fixture = await localFixture(t);
  await prepareLocalWorkspace(fixture.options);
  await writeFile(path.join(fixture.destination, fixture.manifestPath), fixture.originalManifest);
  await prepareLocalWorkspace(fixture.options);
  assert.equal(
    JSON.parse(await readFile(path.join(fixture.destination, fixture.manifestPath), 'utf8'))
      .devDependencies[dependencyName],
    candidateVersion
  );
});

for (const file of ['pnpm-workspace.yaml', 'unexpected.txt']) {
  test(`preparation refuses pnpm changing ${file}`, async (t) => {
    const fixture = await localFixture(t);
    fixture.setInstallChange((destination) => writeFileSync(path.join(destination, file), 'Unexpected change\n'));
    await assert.rejects(prepareLocalWorkspace(fixture.options), /Preparation changed unexpected files/);
  });
}

test('preparation rejects a lockfile that does not resolve the exact candidate', async (t) => {
  const fixture = await localFixture(t);
  fixture.setLockedVersion('7.0.0');
  await assert.rejects(prepareLocalWorkspace(fixture.options), /not locked to exact candidate/);
});

test('preparation propagates pnpm failure rather than reporting success', async (t) => {
  const fixture = await localFixture(t);
  fixture.setFailInstall();
  await assert.rejects(prepareLocalWorkspace(fixture.options), /Fixture pnpm failure/);
});
