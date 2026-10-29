#!/usr/bin/env node

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createGitHubClient } from './github.mjs';
import { buildPlan } from './plan.mjs';
import { cleanupSmokeTests } from './cleanup.mjs';
import { prepareSmokeTest } from './prepare.mjs';

function parseArgs(args) {
  const [command, ...options] = args;
  const parsed = {
    command,
    dryRun: command === 'plan' || command === 'cleanup',
    projectIds: [],
    configPath: 'smoke-test.local.json',
  };

  if (!['plan', 'run', 'cleanup', 'prepare'].includes(command)) {
    throw new Error(
      'Supported commands are `plan`, `run --dry-run`, `prepare`, and `cleanup`.'
    );
  }

  for (let index = 0; index < options.length; index += 1) {
    const option = options[index];

    if (option === '--dry-run') {
      parsed.dryRun = true;
      continue;
    }

    if (option === '--execute' && command === 'cleanup') {
      parsed.execute = true;
      continue;
    }

    if (
      ['--pr', '--config', '--project', '--output-dir'].includes(option)
    ) {
      const value = options[index + 1];

      if (!value || value.startsWith('--')) {
        throw new Error(`${option} requires a value.`);
      }

      if (option === '--pr') {
        if (!/^[1-9]\d*$/.test(value)) {
          throw new Error('--pr must be a positive integer.');
        }

        parsed.pullRequestNumber = Number(value);
      } else if (option === '--config') {
        parsed.configPath = value;
      } else if (option === '--project') {
        parsed.projectIds.push(value);
      } else {
        parsed.outputDir = value;
      }

      index += 1;
      continue;
    }

    throw new Error(`Unsupported option: ${option}`);
  }

  if (!parsed.pullRequestNumber) {
    throw new Error('Provide --pr <number>.');
  }

  if (parsed.execute && options.includes('--dry-run')) {
    throw new Error('Do not combine --execute with --dry-run.');
  }

  if (parsed.execute) {
    parsed.dryRun = false;
  }

  if (command === 'prepare') {
    if (parsed.projectIds.length !== 1) {
      throw new Error('Preparation requires exactly one --project <id>.');
    }

    if (!parsed.outputDir) {
      throw new Error('Preparation requires --output-dir <new-directory>.');
    }

    if (options.includes('--dry-run')) {
      throw new Error('Preparation already creates local files; omit --dry-run.');
    }
  }

  if (!parsed.dryRun && command !== 'cleanup') {
    if (command !== 'prepare') {
      throw new Error(
        'Live execution is not available yet. Use `plan` or `run --dry-run`; no mutations were performed.'
      );
    }
  }

  return parsed;
}

export async function runCli(
  args,
  {
    stdout = process.stdout,
    stderr = process.stderr,
    github = createGitHubClient(),
    readConfig = (configPath) =>
      readFile(configPath, 'utf8').then((text) => JSON.parse(text)),
  } = {}
) {
  let parsed;

  try {
    parsed = parseArgs(args);
    const configPath = path.resolve(parsed.configPath);
    const config = await readConfig(configPath);
    const operation =
      parsed.command === 'cleanup'
        ? cleanupSmokeTests
        : parsed.command === 'prepare'
          ? prepareSmokeTest
          : buildPlan;
    const plan = await operation({
      pullRequestNumber: parsed.pullRequestNumber,
      config,
      github,
      projectIds: parsed.projectIds,
      dryRun: parsed.dryRun,
      outputDir: parsed.outputDir,
    });

    stdout.write(`${JSON.stringify(plan, null, 2)}\n`);

    if (plan.blockers?.length > 0) {
      stderr.write(
        `Preflight found ${plan.blockers.length} blocker(s); no mutations were performed.\n`
      );
      return 2;
    }

    return 0;
  } catch (error) {
    stderr.write(`${error.message}\n`);
    return 1;
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  process.exitCode = await runCli(process.argv.slice(2));
}
