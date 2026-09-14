#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

import * as deterministicProvider from "./lib/deterministic-provider.mjs";
import { loadScenarios, runEvaluations } from "./lib/harness.mjs";

const packageRoot = path.dirname(fileURLToPath(import.meta.url));

function option(args, name) {
  const index = args.indexOf(`--${name}`);
  return index === -1 ? undefined : args[index + 1];
}

async function loadProvider(modulePath) {
  if (!modulePath) {
    return deterministicProvider;
  }

  const provider = await import(pathToFileURL(path.resolve(modulePath)));
  if (
    typeof provider.generate !== "function" ||
    typeof provider.correct !== "function"
  ) {
    throw new Error(
      `Provider "${modulePath}" must export generate and correct functions`,
    );
  }
  return provider;
}

function writeCheckpoint(outputPath, report) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
}

async function main() {
  const args = process.argv.slice(2);
  const scenariosDirectory = path.resolve(
    option(args, "scenarios") ?? path.join(packageRoot, "scenarios"),
  );
  let scenarios = loadScenarios(scenariosDirectory);
  const only = option(args, "only");
  if (only) {
    scenarios = scenarios.filter((scenario) => scenario.id === only);
  }
  if (scenarios.length === 0) {
    throw new Error("No eval scenarios selected");
  }

  const runId = `run-${new Date().toISOString().replaceAll(/[:.]/g, "-")}`;
  const runDirectory = path.resolve(
    option(args, "run-directory") ?? path.join(packageRoot, "results", runId),
  );
  const outputPath = path.join(runDirectory, "results.json");
  const provider = await loadProvider(option(args, "provider"));
  const timeoutMs = Number(option(args, "timeout-ms") ?? 30_000);
  const report = await runEvaluations({
    scenarios,
    fixtureDirectory: path.join(packageRoot, "fixture"),
    runDirectory,
    provider,
    timeoutMs,
    checkpoint(currentReport) {
      writeCheckpoint(outputPath, currentReport);
    },
  });

  writeCheckpoint(outputPath, report);
  console.log(`Eval results: ${outputPath}`);
  console.log(JSON.stringify(report.summary));
  if (report.summary.failed > 0) {
    process.exitCode = 1;
  }
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  await main();
}
