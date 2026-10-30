import { execFileSync } from 'node:child_process';
import { lstat, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createGitHubClient, parsePnpmImporter } from './github.mjs';
import { buildPlan } from './plan.mjs';
import { smokeTestIdentity } from './cleanup.mjs';
import { consumerTargetRef } from './target-ref.mjs';

function run(command, args, options = {}) {
  try {
    return execFileSync(command, args, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
      ...options,
    }).trim();
  } catch (error) {
    const detail = error.stderr
      ?.toString()
      .replace(/[\u0000-\u001f\u007f]/g, ' ')
      .trim()
      .slice(0, 400);
    throw new Error(
      detail
        ? `${command} failed: ${detail}`
        : `${command} failed with exit code ${error.status ?? 'unknown'}.`
    );
  }
}

function packageManagerVersion(value) {
  const match = value?.match(/^pnpm@(\d+\.\d+\.\d+)(?:\+.*)?$/);

  if (!match) {
    throw new Error('Smoke-test preparation requires a pinned pnpm packageManager.');
  }

  return match[1];
}

function updateDependency(manifestText, manifestPath, dependencies) {
  let manifest;

  try {
    manifest = JSON.parse(manifestText);
  } catch {
    throw new Error(`Invalid package JSON at ${manifestPath}.`);
  }

  const fields = [
    'dependencies',
    'devDependencies',
    'optionalDependencies',
    'peerDependencies',
  ];

  for (const { name, candidateVersion } of dependencies) {
    const locations = fields.filter(
      (field) =>
        manifest[field] &&
        Object.hasOwn(manifest[field], name)
    );

    if (locations.length !== 1) {
      throw new Error(
        `${name} must appear in exactly one dependency field in ${manifestPath}.`
      );
    }

    manifest[locations[0]][name] = candidateVersion;
  }

  return `${JSON.stringify(manifest, null, 2)}\n`;
}

async function pathExists(destination) {
  try {
    await lstat(destination);
    return true;
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }

    return false;
  }
}

export async function prepareLocalWorkspace({
  consumer,
  dependencies,
  packageManager,
  baseSha,
  branch,
  outputDir,
  runCommand = run,
}) {
  const destination = path.resolve(outputDir);
  const targetRef = consumerTargetRef(consumer);
  const manifestRelativePath = path.posix.join(
    consumer.packageRoot,
    'package.json'
  );
  const expectedFiles = [manifestRelativePath, 'pnpm-lock.yaml'].sort();
  const manifestPath = path.join(destination, manifestRelativePath);
  const existing = await pathExists(destination);

  if (!existing) {
    await mkdir(path.dirname(destination), { recursive: true });

    runCommand(
      'gh',
      [
        'repo',
        'clone',
        consumer.repository,
        destination,
        '--',
        '--depth',
        '1',
        '--branch',
        targetRef,
        '--single-branch',
        '--filter=blob:none',
      ]
    );
  }

  const managerVersion = packageManagerVersion(packageManager);
  const clonedSha = runCommand('git', ['rev-parse', 'HEAD'], { cwd: destination });

  if (clonedSha !== baseSha) {
    throw new Error(
      `The ${consumer.repository} ${targetRef} branch changed during preparation; expected ${baseSha}, got ${clonedSha}. Retry the plan.`
    );
  }

  const remoteUrl = runCommand('git', ['remote', 'get-url', 'origin'], {
    cwd: destination,
  });
  const acceptedRemoteUrls = [
    `https://github.com/${consumer.repository}.git`,
    `https://github.com/${consumer.repository}`,
    `git@github.com:${consumer.repository}.git`,
  ];

  if (!acceptedRemoteUrls.includes(remoteUrl)) {
    throw new Error(
      `Output directory is not a clone of ${consumer.repository}.`
    );
  }

  const currentBranch = runCommand('git', ['branch', '--show-current'], {
    cwd: destination,
  });
  const baseManifest = runCommand(
    'git',
    ['show', `HEAD:${manifestRelativePath}`],
    { cwd: destination }
  );
  const expectedManifest = updateDependency(
    `${baseManifest}\n`,
    manifestRelativePath,
    dependencies
  );

  if (existing) {
    if (currentBranch !== branch) {
      throw new Error(
        `Output directory is on branch ${currentBranch}, not expected ${branch}.`
      );
    }

    const changedFiles = runCommand('git', ['diff', 'HEAD', '--name-only'], {
      cwd: destination,
    })
      .split(/\r?\n/)
      .filter(Boolean);
    const untrackedFiles = runCommand(
      'git',
      ['ls-files', '--others', '--exclude-standard'],
      { cwd: destination }
    )
      .split(/\r?\n/)
      .filter(Boolean);

    if (
      [...changedFiles, ...untrackedFiles].some(
        (file) => !expectedFiles.includes(file)
      )
    ) {
      throw new Error(
        'Output directory contains unrelated local changes; refusing to overwrite it.'
      );
    }

    const currentManifest = await readFile(manifestPath, 'utf8');

    if (
      currentManifest !== baseManifest &&
      currentManifest !== `${baseManifest}\n` &&
      currentManifest !== expectedManifest
    ) {
      throw new Error(
        'Output directory contains an unexpected package manifest edit; refusing to overwrite it.'
      );
    }
  } else {
    runCommand('git', ['switch', '--create', branch], { cwd: destination });
  }

  const currentManifest = await readFile(manifestPath, 'utf8');
  if (currentManifest !== expectedManifest) {
    await writeFile(manifestPath, expectedManifest);
  }

  runCommand(
    'corepack',
    [
      `pnpm@${managerVersion}`,
      'install',
      '--lockfile-only',
      '--ignore-scripts',
      '--no-frozen-lockfile',
    ],
    {
      cwd: destination,
      env: {
        ...process.env,
        npm_config_minimum_release_age: '0',
      },
    }
  );

  const lockfilePath = path.join(destination, 'pnpm-lock.yaml');
  const lockfile = await readFile(lockfilePath, 'utf8');
  const lockfileDependencies = parsePnpmImporter(
    lockfile,
    consumer.packageRoot,
    dependencies.map(({ name }) => name)
  );

  for (const { name, candidateVersion } of dependencies) {
    const locked = lockfileDependencies[name];

    if (
      locked?.specifier !== candidateVersion ||
      locked?.resolvedVersion !== candidateVersion
    ) {
      throw new Error(
        `${name} was not locked to exact candidate ${candidateVersion}.`
      );
    }
  }

  const changedFiles = runCommand('git', ['diff', 'HEAD', '--name-only'], {
    cwd: destination,
  })
    .split(/\r?\n/)
    .filter(Boolean)
    .sort();
  const untrackedFiles = runCommand(
    'git',
    ['ls-files', '--others', '--exclude-standard'],
    { cwd: destination }
  )
    .split(/\r?\n/)
    .filter(Boolean);
  if (
    untrackedFiles.length > 0 ||
    changedFiles.length !== expectedFiles.length ||
    changedFiles.some((file, index) => file !== expectedFiles[index])
  ) {
    throw new Error(
      `Preparation changed unexpected files: ${[...changedFiles, ...untrackedFiles].join(', ') || '(none)'}.`
    );
  }

  runCommand('git', ['diff', '--check'], { cwd: destination });

  return { workspacePath: destination, changedFiles };
}

export async function prepareSmokeTest({
  pullRequestNumber,
  config,
  projectIds,
  outputDir,
  github = createGitHubClient(),
  prepareWorkspace = prepareLocalWorkspace,
}) {
  if (projectIds.length !== 1) {
    throw new Error('Preparation requires exactly one --project <id>.');
  }

  if (!outputDir || typeof outputDir !== 'string') {
    throw new Error('Preparation requires --output-dir <new-directory>.');
  }

  const plan = await buildPlan({
    pullRequestNumber,
    config,
    github,
    projectIds,
  });

  if (plan.consumers.length !== 1) {
    throw new Error('Preparation requires exactly one selected consumer.');
  }

  const consumerPlan = plan.consumers[0];
  const consumer = config.consumers.find(({ id }) => id === consumerPlan.id);
  const dependencies = consumerPlan.dependencies.map((dependency) => {
    if (!dependency.candidateVersion) {
      throw new Error(
        `${dependency.name} has no published candidate in this release.`
      );
    }

    if (!dependency.declaredVersion) {
      throw new Error(
        `${dependency.name} is not declared in ${consumerPlan.manifestPath}.`
      );
    }

    return {
      name: dependency.name,
      candidateVersion: dependency.candidateVersion,
    };
  });

  if (!consumerPlan.lockfile || !consumerPlan.packageManager?.startsWith('pnpm@')) {
    throw new Error(
      `${consumer.id} must use a supported pnpm lockfile to prepare a smoke-test PR.`
    );
  }

  const identity = smokeTestIdentity(pullRequestNumber, consumer.id);
  const prepared = await prepareWorkspace({
    consumer,
    dependencies,
    packageManager: consumerPlan.packageManager,
    baseSha: consumerPlan.baseSha,
    branch: identity.branch,
    outputDir,
  });

  return {
    mode: 'prepared-not-submitted',
    candidatePullRequest: pullRequestNumber,
    candidateHeadSha: plan.candidateSource.sourceSha,
    project: consumer.id,
    repository: consumer.repository,
    baseSha: consumerPlan.baseSha,
    branch: identity.branch,
    workspacePath: prepared.workspacePath,
    updatedDependencies: dependencies,
    changedFiles: prepared.changedFiles,
    draftPullRequest: {
      draft: true,
      title: `[DO NOT MERGE] Validate HDS release #${pullRequestNumber}`,
      bodyMarker: identity.marker,
    },
    remoteMutationCount: 0,
    pending: [
      'Review the local diff and commit/push the smoke-test branch.',
      'Open the consumer pull request as a draft.',
      'Collect the configured CI and preview evidence after the PR opens.',
    ],
  };
}
