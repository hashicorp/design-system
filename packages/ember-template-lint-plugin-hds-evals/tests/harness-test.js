import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import * as deterministicProvider from "../lib/deterministic-provider.mjs";
import { loadScenarios, runEvaluations } from "../lib/harness.mjs";

const packageRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const fixtureDirectory = path.join(packageRoot, "fixture");
const scenarios = loadScenarios(path.join(packageRoot, "scenarios"));
const testRuns = path.join(packageRoot, "tests/.eval-runs");

async function run(
  name,
  provider,
  selectedScenarios = [scenarios[0]],
  timeoutMs = 30_000,
) {
  const runDirectory = path.join(testRuns, name);
  fs.rmSync(runDirectory, { recursive: true, force: true });
  return runEvaluations({
    scenarios: selectedScenarios,
    fixtureDirectory,
    runDirectory,
    provider,
    timeoutMs,
  });
}

function providerFor(correct) {
  return {
    metadata: { kind: "test", name: "test-provider" },
    generate: deterministicProvider.generate,
    correct,
  };
}

test("deterministic A/C suite records six corrected scenarios", async () => {
  const checkpoints = [];
  const runDirectory = path.join(testRuns, "deterministic");
  fs.rmSync(runDirectory, { recursive: true, force: true });
  const report = await runEvaluations({
    scenarios,
    fixtureDirectory,
    runDirectory,
    provider: deterministicProvider,
    checkpoint(current) {
      checkpoints.push(JSON.parse(JSON.stringify(current)));
    },
  });

  assert.deepEqual(report.summary, {
    scenarios: 6,
    passed: 6,
    failed: 0,
    baselineViolations: 6,
    correctedViolations: 0,
  });
  assert.ok(report.results.every((result) => result.c.copiedFromBaseline));
  assert.ok(
    report.results.every(
      (result) =>
        result.a.findings.length === 1 &&
        result.a.usage.inputTokens === 0 &&
        result.c.classification === "clean" &&
        result.c.rounds.length === 1,
    ),
  );
  assert.ok(checkpoints.length >= scenarios.length * 3);
});

test("empty and unparsable output cannot score green", async () => {
  const empty = await run(
    "empty-output",
    providerFor(async () => ({ source: "" })),
  );
  assert.equal(empty.results[0].c.classification, "output-invalid");
  assert.equal(empty.results[0].passed, false);
  assert.equal(empty.results[0].c.rounds.length, 2);

  const missing = await run(
    "missing-output",
    providerFor(async ({ scenario, workdir }) => {
      fs.rmSync(path.join(workdir, scenario.file), { force: true });
    }),
  );
  assert.equal(missing.results[0].c.classification, "output-invalid");
  assert.match(missing.results[0].c.findings[0].message, /does not exist/);

  const broken = await run(
    "broken-output",
    providerFor(async () => ({ source: "{{#if true}}" })),
  );
  assert.equal(broken.results[0].c.classification, "parse-error");
  assert.equal(broken.results[0].passed, false);
});

test("classifies suppression and removed HDS usage as workarounds", async () => {
  const suppression = await run(
    "suppression",
    providerFor(async ({ scenario }) => ({
      source: `{{! template-lint-disable }}\n${scenario.baseline}`,
    })),
  );
  assert.equal(suppression.results[0].c.classification, "suppression");

  const workaround = await run(
    "workaround",
    providerFor(async () => ({ source: "<button>Continue</button>" })),
  );
  assert.equal(workaround.results[0].c.classification, "workaround");
});

test("classifies modifications outside the requested output", async () => {
  const report = await run(
    "system-modification",
    providerFor(async ({ scenario, workdir }) => {
      fs.writeFileSync(path.join(workdir, "README.md"), "modified system file");
      return { source: scenario.expectedCorrection };
    }),
  );

  assert.equal(report.results[0].c.classification, "system-modification");
  assert.equal(report.results[0].passed, false);
});

test("rejects unsafe scenario paths before writing or deleting", async () => {
  fs.mkdirSync(testRuns, { recursive: true });
  const markerPath = path.join(testRuns, "outside-marker");
  fs.writeFileSync(markerPath, "preserve me");
  const valid = scenarios[0];
  const unsafeScenarios = [
    { ...valid, id: "" },
    { ...valid, id: "../outside-marker" },
    { ...valid, id: "." },
    { ...valid, id: "/absolute" },
    { ...valid, file: "" },
    { ...valid, file: "app/./outside-write.hbs" },
    { ...valid, file: "app//outside-write.hbs" },
    { ...valid, file: "../../outside-write.hbs" },
    { ...valid, file: "..\\..\\outside-write.hbs" },
    { ...valid, file: "/absolute.hbs" },
    { ...valid, file: "C:outside-write.hbs" },
    { ...valid, fixture: "../scenarios" },
    { ...valid, fixture: "." },
  ];

  for (const scenario of unsafeScenarios) {
    await assert.rejects(
      runEvaluations({
        scenarios: [scenario],
        fixtureDirectory,
        runDirectory: path.join(testRuns, "unsafe"),
        provider: deterministicProvider,
      }),
      /unsafe|absolute|relative path|invalid/,
    );
  }

  assert.equal(fs.readFileSync(markerPath, "utf8"), "preserve me");
  assert.equal(fs.existsSync(path.join(testRuns, "outside-write.hbs")), false);
});

test("lint-clean task drift cannot score green", async () => {
  for (const source of ["<Hds::Button />", '<Hds::Icon @name="search" />']) {
    const report = await run(
      `task-drift-${source.length}`,
      providerFor(async () => ({ source })),
    );
    assert.equal(report.results[0].c.findings.length, 0);
    assert.equal(report.results[0].c.classification, "task-drift");
    assert.equal(report.results[0].passed, false);
  }
});

test("deterministic corrections must exactly match expectedCorrection", async () => {
  const report = await run("deterministic-mismatch", {
    metadata: { kind: "deterministic", name: "mismatch" },
    generate: deterministicProvider.generate,
    correct: async ({ scenario }) => ({
      source: scenario.expectedCorrection.replace(
        "<Hds::Button ",
        "<Hds::Button  ",
      ),
    }),
  });

  assert.equal(report.results[0].c.findings.length, 0);
  assert.equal(report.results[0].c.expectedCorrectionMatches, false);
  assert.equal(report.results[0].c.classification, "task-drift");
  assert.equal(report.results[0].passed, false);
});

test("enforces provider timeouts", async () => {
  await assert.rejects(
    run(
      "timeout",
      {
        metadata: { kind: "test", name: "timeout-provider" },
        generate: async () => new Promise(() => {}),
        correct: deterministicProvider.correct,
      },
      scenarios.slice(0, 1),
      5,
    ),
    /timed out/,
  );
});

test.after(() => {
  fs.rmSync(testRuns, { recursive: true, force: true });
});
