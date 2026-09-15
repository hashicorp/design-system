import fs from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";

import Linter from "ember-template-lint";
import plugin from "@hashicorp/ember-template-lint-plugin-hds";

const packageRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const rules = Object.fromEntries(
  Object.keys(plugin.configurations.recommended.rules).map((rule) => [
    rule,
    true,
  ]),
);

function validateRelativePath(value, label, { allowRoot = false } = {}) {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`${label} must be a non-empty relative path`);
  }
  if (
    path.isAbsolute(value) ||
    path.win32.isAbsolute(value) ||
    /^[a-zA-Z]:/.test(value)
  ) {
    throw new Error(`${label} must not be absolute`);
  }

  const segments = value.split(/[\\/]/);
  if (
    segments.some(
      (segment) =>
        segment === "" || segment === ".." || (!allowRoot && segment === "."),
    )
  ) {
    throw new Error(`${label} contains an unsafe path segment`);
  }
}

function resolveWithin(root, relativePath, label, { allowRoot = false } = {}) {
  validateRelativePath(relativePath, label, { allowRoot });
  const resolvedRoot = path.resolve(root);
  const resolvedPath = path.resolve(resolvedRoot, relativePath);
  const relative = path.relative(resolvedRoot, resolvedPath);
  if (
    (!allowRoot && relative === "") ||
    relative === ".." ||
    relative.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relative)
  ) {
    throw new Error(`${label} escapes its intended root`);
  }
  return resolvedPath;
}

function validateStringArray(value, label, { nonEmpty = false } = {}) {
  if (
    !Array.isArray(value) ||
    (nonEmpty && value.length === 0) ||
    value.some((entry) => typeof entry !== "string" || entry.length === 0)
  ) {
    throw new Error(`${label} must be an array of non-empty strings`);
  }
}

export function validateScenario(scenario, source = scenario?.id ?? "unknown") {
  if (scenario === null || typeof scenario !== "object") {
    throw new Error(`Scenario "${source}" must be an object`);
  }
  for (const field of [
    "id",
    "prompt",
    "file",
    "baseline",
    "expectedCorrection",
  ]) {
    if (typeof scenario[field] !== "string" || scenario[field].length === 0) {
      throw new Error(`Scenario "${source}" has invalid "${field}"`);
    }
  }
  if (!/^[a-z0-9][a-z0-9-]*$/.test(scenario.id)) {
    throw new Error(`Scenario "${source}" has unsafe "id"`);
  }
  validateRelativePath(scenario.file, `Scenario "${source}" file`);
  if (scenario.fixture !== undefined) {
    validateRelativePath(scenario.fixture, `Scenario "${source}" fixture`);
  }
  validateStringArray(
    scenario.expectedBaselineRules,
    `Scenario "${source}" expectedBaselineRules`,
    { nonEmpty: true },
  );
  if (
    scenario.assertions === null ||
    typeof scenario.assertions !== "object" ||
    Array.isArray(scenario.assertions)
  ) {
    throw new Error(`Scenario "${source}" must define assertions`);
  }
  validateStringArray(
    scenario.assertions.includes,
    `Scenario "${source}" assertions.includes`,
    { nonEmpty: true },
  );
  validateStringArray(
    scenario.assertions.excludes ?? [],
    `Scenario "${source}" assertions.excludes`,
  );
  if (scenario.tags !== undefined) {
    validateStringArray(scenario.tags, `Scenario "${source}" tags`);
  }
  return scenario;
}

function normalizeFinding(message, file) {
  return {
    check: message.fatal ? "parse" : "hds-lint",
    rule: message.fatal ? "parse-error" : message.rule,
    message: message.message,
    file,
    line: message.line ?? null,
    column: message.column ?? null,
    severity: message.severity ?? 2,
    fixable: message.isFixable ?? false,
  };
}

function outputFinding(file, message) {
  return {
    check: "output",
    rule: "output-exists",
    message,
    file,
    line: null,
    column: null,
    severity: 2,
    fixable: false,
  };
}

async function findingsFor(workdir, scenario) {
  const outputPath = resolveWithin(workdir, scenario.file, "Scenario output");
  if (!fs.existsSync(outputPath)) {
    return [
      outputFinding(scenario.file, "Expected output file does not exist"),
    ];
  }

  const source = fs.readFileSync(outputPath, "utf8");
  if (source.trim().length === 0) {
    return [outputFinding(scenario.file, "Expected output file is empty")];
  }

  const linter = new Linter({
    workingDir: packageRoot,
    config: { plugins: [plugin], rules },
  });
  const lintFilePath = path.relative(packageRoot, outputPath);
  const messages = await linter.verify({
    source,
    filePath: lintFilePath,
    workingDir: packageRoot,
    checkHbsTemplateLiterals: true,
  });
  return messages.map((message) => normalizeFinding(message, scenario.file));
}

function filesIn(directory, prefix = "") {
  const files = new Map();
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const relativePath = path.join(prefix, entry.name);
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      for (const [nestedPath, contents] of filesIn(
        absolutePath,
        relativePath,
      )) {
        files.set(nestedPath, contents);
      }
    } else {
      files.set(relativePath, fs.readFileSync(absolutePath));
    }
  }
  return files;
}

function systemWasModified(before, after, outputFile) {
  const paths = new Set([...before.keys(), ...after.keys()]);
  for (const file of paths) {
    if (file === outputFile) {
      continue;
    }
    const beforeContents = before.get(file);
    const afterContents = after.get(file);
    if (
      beforeContents === undefined ||
      afterContents === undefined ||
      !beforeContents.equals(afterContents)
    ) {
      return true;
    }
  }
  return false;
}

function hdsInvocationCount(source) {
  return source.match(/<Hds::/g)?.length ?? 0;
}

function classify({
  baselineSource,
  correctedSource,
  findings,
  systemModified,
  taskPreserved,
}) {
  if (findings.some((finding) => finding.rule === "output-exists")) {
    return "output-invalid";
  }
  if (findings.some((finding) => finding.rule === "parse-error")) {
    return "parse-error";
  }
  if (systemModified) {
    return "system-modification";
  }
  if (/template-lint-disable/.test(correctedSource)) {
    return "suppression";
  }
  if (
    hdsInvocationCount(correctedSource) < hdsInvocationCount(baselineSource)
  ) {
    return "workaround";
  }
  if (!taskPreserved) {
    return "task-drift";
  }
  if (findings.length > 0) {
    return "hds-violation";
  }
  return "clean";
}

function usageWithDefaults(usage) {
  return {
    inputTokens: usage?.inputTokens ?? null,
    outputTokens: usage?.outputTokens ?? null,
    costUsd: usage?.costUsd ?? null,
  };
}

async function invokeProvider(method, context, timeoutMs) {
  const startedAt = performance.now();
  let timer;
  try {
    const result = await Promise.race([
      Promise.resolve(method(context)),
      new Promise((_, reject) => {
        timer = setTimeout(
          () => reject(new Error(`Provider timed out after ${timeoutMs}ms`)),
          timeoutMs,
        );
      }),
    ]);
    return {
      result: result ?? {},
      durationMs: Math.round(performance.now() - startedAt),
      usage: usageWithDefaults(result?.usage),
    };
  } finally {
    clearTimeout(timer);
  }
}

function writeReturnedSource(result, workdir, file) {
  if (typeof result.source !== "string") {
    return;
  }
  const outputPath = resolveWithin(workdir, file, "Scenario output");
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, result.source);
}

function readOutput(workdir, file) {
  const outputPath = resolveWithin(workdir, file, "Scenario output");
  return fs.existsSync(outputPath) ? fs.readFileSync(outputPath, "utf8") : "";
}

function outputsAreByteIdentical(leftWorkdir, rightWorkdir, file) {
  const leftPath = resolveWithin(leftWorkdir, file, "Scenario output");
  const rightPath = resolveWithin(rightWorkdir, file, "Scenario output");
  return (
    fs.existsSync(leftPath) &&
    fs.existsSync(rightPath) &&
    fs.readFileSync(leftPath).equals(fs.readFileSync(rightPath))
  );
}

function newReport(provider) {
  return {
    schemaVersion: 1,
    suite: "hds-template-lint-mvp",
    provider: provider.metadata ?? {
      kind: "external",
      name: "unnamed-provider",
    },
    maxCorrectionRounds: 2,
    summary: {
      scenarios: 0,
      passed: 0,
      failed: 0,
      baselineViolations: 0,
      correctedViolations: 0,
    },
    results: [],
  };
}

function updateSummary(report) {
  report.summary = {
    scenarios: report.results.length,
    passed: report.results.filter((result) => result.passed).length,
    failed: report.results.filter((result) => !result.passed).length,
    baselineViolations: report.results.reduce(
      (count, result) => count + result.a.findings.length,
      0,
    ),
    correctedViolations: report.results.reduce(
      (count, result) => count + result.c.findings.length,
      0,
    ),
  };
}

export async function runEvaluations({
  scenarios,
  fixtureDirectory,
  runDirectory,
  provider,
  timeoutMs = 30_000,
  checkpoint = () => {},
}) {
  const report = newReport(provider);
  const validatedScenarios = scenarios.map((scenario) =>
    validateScenario(scenario),
  );

  for (const scenario of validatedScenarios) {
    const scenarioDirectory = resolveWithin(
      runDirectory,
      scenario.id,
      "Scenario id",
    );
    const aDirectory = resolveWithin(scenarioDirectory, "a", "A directory");
    const cDirectory = resolveWithin(scenarioDirectory, "c", "C directory");
    fs.rmSync(scenarioDirectory, { recursive: true, force: true });
    const fixtureSource =
      scenario.fixture === undefined
        ? path.resolve(fixtureDirectory)
        : resolveWithin(fixtureDirectory, scenario.fixture, "Scenario fixture");
    fs.cpSync(fixtureSource, aDirectory, { recursive: true });
    const aBefore = filesIn(aDirectory);

    const generation = await invokeProvider(
      provider.generate,
      { scenario, workdir: aDirectory },
      timeoutMs,
    );
    writeReturnedSource(generation.result, aDirectory, scenario.file);
    const baselineSource = readOutput(aDirectory, scenario.file);
    const baselineFindings = await findingsFor(aDirectory, scenario);
    const baselineSystemModified = systemWasModified(
      aBefore,
      filesIn(aDirectory),
      scenario.file,
    );
    const expectedRulesMatch =
      JSON.stringify(
        baselineFindings
          .filter((finding) => finding.check === "hds-lint")
          .map((finding) => finding.rule),
      ) === JSON.stringify(scenario.expectedBaselineRules);

    fs.cpSync(aDirectory, cDirectory, { recursive: true });
    const copiedFromBaseline = outputsAreByteIdentical(
      aDirectory,
      cDirectory,
      scenario.file,
    );
    const cBefore = filesIn(cDirectory);
    const result = {
      id: scenario.id,
      prompt: scenario.prompt,
      file: scenario.file,
      tags: scenario.tags ?? [],
      a: {
        source: baselineSource,
        findings: baselineFindings,
        systemModified: baselineSystemModified,
        durationMs: generation.durationMs,
        usage: generation.usage,
      },
      c: {
        copiedFromBaseline,
        source: baselineSource,
        findings: baselineFindings,
        rounds: [],
        classification: "not-run",
      },
      expectedBaselineRules: scenario.expectedBaselineRules,
      expectedRulesMatch,
      passed: false,
    };
    report.results.push(result);
    updateSummary(report);
    await checkpoint(report);

    let correctedFindings = baselineFindings;
    for (
      let round = 1;
      round <= report.maxCorrectionRounds && correctedFindings.length > 0;
      round++
    ) {
      const correction = await invokeProvider(
        provider.correct,
        {
          scenario,
          workdir: cDirectory,
          findings: correctedFindings,
          round,
        },
        timeoutMs,
      );
      writeReturnedSource(correction.result, cDirectory, scenario.file);
      correctedFindings = await findingsFor(cDirectory, scenario);
      result.c.rounds.push({
        round,
        durationMs: correction.durationMs,
        usage: correction.usage,
        findingsAfter: correctedFindings,
      });
      result.c.source = readOutput(cDirectory, scenario.file);
      result.c.findings = correctedFindings;
      updateSummary(report);
      await checkpoint(report);
    }

    const systemModified =
      baselineSystemModified ||
      systemWasModified(cBefore, filesIn(cDirectory), scenario.file);
    const taskPreserved =
      scenario.assertions.includes.every((text) =>
        result.c.source.includes(text),
      ) &&
      (scenario.assertions.excludes ?? []).every(
        (text) => !result.c.source.includes(text),
      );
    const expectedCorrectionMatches =
      provider.metadata?.kind !== "deterministic" ||
      result.c.source === scenario.expectedCorrection;
    result.c.classification = classify({
      baselineSource,
      correctedSource: result.c.source,
      findings: correctedFindings,
      systemModified,
      taskPreserved: taskPreserved && expectedCorrectionMatches,
    });
    result.c.taskPreserved = taskPreserved;
    result.c.expectedCorrectionMatches = expectedCorrectionMatches;
    result.passed =
      copiedFromBaseline &&
      expectedRulesMatch &&
      correctedFindings.length === 0 &&
      taskPreserved &&
      expectedCorrectionMatches &&
      result.c.classification === "clean";
    updateSummary(report);
    await checkpoint(report);
  }

  return report;
}

export function loadScenarios(directory) {
  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".json"))
    .sort()
    .map((file) => {
      const scenario = JSON.parse(
        fs.readFileSync(path.join(directory, file), "utf8"),
      );
      return validateScenario(scenario, file);
    });
}
