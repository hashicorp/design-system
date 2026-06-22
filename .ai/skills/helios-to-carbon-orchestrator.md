---
name: helios-to-carbon-orchestrator
description: Orchestrate Helios to Carbon Web Components migrations with direct CWC usage, scoped to component code updates only.
argument-hint: "[Target path/glob and optional mode: dry-run|safe-only|full]"
---

# Helios -> Carbon Web Components Orchestrator

Coordinate a safe migration from Helios components to Carbon Web Components (CWC), scoped to component migration work.

## Mission

- Migrate Helios usage to direct CWC usage.
- Do not generate Helios wrappers or compatibility shims.
- Do not perform NPW automated test migration or automated test execution.
- Produce an auditable migration report with clear manual follow-ups.

## Inputs

`<target>`: file, directory, or glob scope.

`<mode>`:
- `dry-run`: analyze only, no file edits.
- `safe-only`: apply only high-confidence migrations.
- `full`: apply high-confidence migrations and optionally medium-confidence when explicitly approved.

Default mode: `safe-only`.

## Hard Rules

1. Direct CWC usage only.
2. Never emit Helios wrapper components.
3. Only auto-apply high-confidence transforms.
4. Preserve behavior before stylistic cleanup.
5. If transform parsing fails in a file, skip that file and record why.

## Sub-Agent Roles

### A) Component Analyzer

Goal: identify Helios migration candidates and produce a plan.

Must return JSON records with:
- `id`
- `filePath`
- `line`
- `heliosComponent`
- `proposedCwcComponent`
- `transformOperations[]`
- `confidence`
- `riskFlags[]`
- `status` (`planned|manual|skipped`)
- `rationale`
- `manualNotes[]`

### B) Component Implementer

Goal: apply code migrations from approved plan entries.

Must:
- Apply only allowed entries for the selected mode.
- Update imports/usages/attributes/events/slots per mapping.
- Leave low-confidence entries untouched.
- Return changed files and skipped entries.

### C) Verifier (optional)

Goal: run lint/build checks and correlate failures to migration records.

## Execution Flow

### Phase 0: Scope and Mode

1. Resolve target scope from arguments.
2. Resolve mode (`dry-run`, `safe-only`, `full`).
3. Initialize report artifacts:
   - `migration-plan.json`
   - `migration-report.md`

### Phase 1: Analyze Components

1. Delegate to Component Analyzer for the selected scope.
2. Validate JSON schema shape.
3. Partition by confidence:
   - High: `>= 0.90`
   - Medium: `0.60-0.89`
   - Low: `< 0.60`

If mode is `dry-run`, stop after generating reports.

### Phase 2: Apply Component Migrations

1. Build allowed set:
   - `safe-only`: high only
   - `full`: high + approved medium
2. Delegate to Component Implementer with explicit candidate IDs.
3. Capture changed file list and skips.

### Phase 3: Verify

Run project verification commands appropriate to the repo:
- lint
- build

If component source changed, include required lint commands for that package.

### Phase 4: Report

Produce `migration-report.md` including:
- scope and mode
- candidate counts by confidence
- code migrations applied/skipped
- verification results
- top unresolved blockers and suggested next actions

## Delegation Contracts

When dispatching each sub-agent, include:

- The exact scope path(s)
- The migration mapping table in force
- Allowed operation list
- Prohibited operations list
- Required output schema
- Stop conditions

## Stop Conditions

Stop the run and report immediately when:

- Mapping table for a required Helios component is missing.
- Analyzer output is malformed and cannot be normalized safely.
- Verification fails due to systemic errors unrelated to migrated files.

## Output Expectations

At completion, print a concise summary:

- files migrated
- manual follow-ups
- verification status
- paths to generated artifacts

Do not claim success unless verification and report generation are complete.
