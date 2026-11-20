import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const workflow = await readFile(
  new URL('../../.github/workflows/ci-smoke-test.yml', import.meta.url),
  'utf8'
);
const filterCommand = workflow.split('\n').find((line) =>
  line.includes('run: ./.github/scripts/filter_changed_files.sh ')
);
assert.ok(filterCommand, 'workflow must use the shared changed-file filter');
const triggerPaths = [...filterCommand.matchAll(/"([^"]+)"/g)].map((match) => match[1]);
assert.ok(triggerPaths.length > 0);
const filterScript = new URL('../../.github/scripts/filter_changed_files.sh', import.meta.url);

for (const [label, changedPath, expected, ref = 'feature', deleted = false] of [
  ['helper implementation', 'scripts/smoke-test/prepare.mjs', true],
  ['helper tests', 'scripts/smoke-test/prepare.test.mjs', true],
  ['skill instructions', '.bob/skills/smoke-test/SKILL.md', true],
  ['skill discovery adapter', '.github/skills/smoke-test/SKILL.md', true],
  ['workflow', '.github/workflows/ci-smoke-test.yml', true],
  ['shared filter', '.github/scripts/filter_changed_files.sh', true],
  ['root package configuration', 'package.json', true],
  ['lockfile', 'pnpm-lock.yaml', true],
  ['Node version', '.nvmrc', true],
  ['unrelated component', 'packages/components/unrelated.gts', false],
  ['similar directory prefix', 'scripts/smoke-test-other/index.mjs', false],
  ['unrelated documentation', 'README.md', false],
  ['main always runs', 'README.md', true, 'main'],
  ['deleted helper', 'scripts/smoke-test/removed.mjs', true, 'feature', true],
]) {
  test(`CI filter: ${label}`, async (t) => {
    const root = await mkdtemp(path.join(tmpdir(), 'hds-smoke-ci-'));
    t.after(() => rm(root, { recursive: true, force: true }));
    const env = {
      ...process.env,
      GIT_CONFIG_NOSYSTEM: '1',
      GIT_CONFIG_GLOBAL: '/dev/null',
      GIT_AUTHOR_NAME: 'Test',
      GIT_AUTHOR_EMAIL: 'test@example.com',
      GIT_COMMITTER_NAME: 'Test',
      GIT_COMMITTER_EMAIL: 'test@example.com',
    };
    const git = (...args) => execFileSync('git', args, {
      cwd: root, env, stdio: ['ignore', 'pipe', 'pipe'],
    });
    const changedFile = path.join(root, changedPath);
    await mkdir(path.dirname(changedFile), { recursive: true });
    await writeFile(path.join(root, 'baseline.txt'), 'Baseline\n');
    if (deleted) {
      await writeFile(changedFile, 'Original\n');
    }
    git('init', '--initial-branch=feature');
    git('add', '.');
    git('commit', '-m', 'baseline');
    git('update-ref', 'refs/remotes/origin/main', 'HEAD');
    if (deleted) {
      await rm(changedFile);
    } else {
      await writeFile(changedFile, 'Changed\n');
    }
    git('add', '-A');
    git('commit', '-m', 'change');
    const output = path.join(root, 'output.txt');
    execFileSync('bash', [fileURLToPath(filterScript), ...triggerPaths], {
      cwd: root,
      env: { ...env, GITHUB_REF_NAME: ref, GITHUB_OUTPUT: output },
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    assert.equal(await readFile(output, 'utf8'), `trigger-ci=${expected}\n`);
  });
}
