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

> **Implementation Note:** Component Analyzer and Component Implementer roles are implemented by the `helios-to-carbon-evaluator-swapper` subskill. See `.ai/skills/helios-to-carbon-evaluator-swapper.md` for detailed execution phases, output schemas, and integration contracts.

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

## Artifact Locations

The orchestrator uses the following artifacts:

- **Mapping table:** `.ai/migration/helios-to-carbon-component-map.json`
- **Candidate schema:** `.ai/migration/schemas/migration-candidate.schema.json`
- **Migration plan:** `migration-plan.json` (generated in workspace root)
- **Migration report:** `migration-report.md` (generated in workspace root)
- **Report template:** `.ai/templates/migration-report-template.md`

## Execution Flow

### Phase 0: Scope and Mode

1. Resolve target scope from arguments.
2. Resolve mode (`dry-run`, `safe-only`, `full`).
3. Initialize report artifacts:
   - `migration-plan.json`
   - `migration-report.md`

### Phase 1: Analyze Components

**Delegate to:** `helios-to-carbon-evaluator-swapper` subskill, Phase 1 (Candidate Evaluation)

**Inputs to subskill:**
- `scopePaths`: Resolved target scope (array of file paths or globs)
- `mappingTablePath`: `.ai/migration/helios-to-carbon-component-map.json`
- `allowedOperations`: All transformation types from mapping
- `prohibitedOperations`: `["createWrapper", "createShim", "modifyTests"]`
- `outputSchemaPath`: `.ai/migration/schemas/migration-candidate.schema.json`
- `stopConditions`: Missing mapping, malformed data, schema validation failure

**Expected output:**
- JSON array of candidate records validated against schema
- Each candidate includes: `id`, `filePath`, `line`, `heliosComponent`, `proposedCwcComponent`, `transformOperations`, `confidence`, `riskFlags`, `status`, `rationale`, `manualNotes`

**Orchestrator actions:**
1. Receive candidate array from subskill.
2. Validate JSON schema shape against `.ai/migration/schemas/migration-candidate.schema.json`.
3. Partition by confidence:
   - High: `>= 0.90` (status: `planned`)
   - Medium: `0.60-0.89` (status: `manual`)
   - Low: `< 0.60` (status: `skipped`)
4. Write `migration-plan.json` with all candidates.
5. Generate initial `migration-report.md` from template.

**If mode is `dry-run`:** Stop after generating reports. Do not proceed to Phase 2.

### Phase 2: Apply Component Migrations

**Delegate to:** `helios-to-carbon-evaluator-swapper` subskill, Phase 2 (Approved Swap Application)

**Inputs to subskill:**
- `approvedCandidateIds`: Array of candidate IDs to migrate
  - `safe-only` mode: IDs where `confidence >= 0.90` and `status === "planned"`
  - `full` mode: High-confidence IDs + explicitly approved medium-confidence IDs
- `mappingTablePath`: `.ai/migration/helios-to-carbon-component-map.json`
- `candidates`: Full candidate array from Phase 1 (for context)

**Expected output:**
- Execution summary with:
  - `changedFiles`: Array of modified file paths
  - `appliedCandidates`: Array of successfully migrated candidate IDs
  - `skippedCandidates`: Array of objects with `id` and `reason`
  - `blockers`: Array of blocker records (type, component, filePath, line)

**Orchestrator actions:**
1. Build allowed candidate ID set based on mode.
2. Send approved IDs to subskill Phase 2.
3. Receive execution summary.
4. Capture changed file list for verification.
5. Update `migration-report.md` with applied/skipped counts.

### Phase 3: Verify

Run project verification commands appropriate to the repo:
- `pnpm lint` (if files in `packages/` changed)
- `pnpm build` (if component source changed)

**Verification scope:**
- If `changedFiles` includes `packages/components/`, run component package lint
- If `changedFiles` includes `showcase/`, run showcase lint
- Always run build to ensure no breaking changes

**On verification failure:**
- Correlate failures to changed files
- Add failures to `migration-report.md` blockers section
- Do not claim success

### Phase 4: Report

Generate final `migration-report.md` using `.ai/templates/migration-report-template.md`:

**Required sections:**
- **Summary:** Scope, mode, total candidates
- **Candidate Breakdown:** Counts by confidence level (high/medium/low)
- **Migrations Applied:** Count and list of applied candidate IDs
- **Migrations Skipped:** Count and reasons
- **Verification Results:** Lint/build status
- **Blockers:** Top unresolved issues with file paths and lines
- **Manual Follow-ups:** List of manual-status candidates with rationale
- **Next Actions:** Suggested next steps

**Artifact paths:**
- Migration plan: `migration-plan.json`
- Migration report: `migration-report.md`

## Delegation Contracts

### Subskill Invocation Contract

When invoking `helios-to-carbon-evaluator-swapper`:

**Phase 1 (Evaluation):**
```
Input:
  scopePaths: [array of paths]
  mappingTablePath: ".ai/migration/helios-to-carbon-component-map.json"
  allowedOperations: [all transform types]
  prohibitedOperations: ["createWrapper", "createShim", "modifyTests"]
  outputSchemaPath: ".ai/migration/schemas/migration-candidate.schema.json"
  stopConditions: [missing-mapping, malformed-data, schema-failure]

Output:
  [array of candidate records matching schema]
```

**Phase 2 (Application):**
```
Input:
  approvedCandidateIds: [array of IDs to migrate]
  mappingTablePath: ".ai/migration/helios-to-carbon-component-map.json"
  candidates: [full candidate array from Phase 1]

Output:
  {
    changedFiles: [array of paths],
    appliedCandidates: [array of IDs],
    skippedCandidates: [{id, reason}],
    blockers: [{type, component, filePath, line}]
  }
```

### Handoff Format

**Orchestrator → Subskill Phase 1:**
- Provides scope and artifact paths
- Expects validated candidate array

**Subskill Phase 1 → Orchestrator:**
- Returns candidate array (JSON)
- Orchestrator partitions by confidence
- Orchestrator writes `migration-plan.json`

**Orchestrator → Subskill Phase 2:**
- Provides approved candidate IDs (filtered by mode)
- Provides full candidate context

**Subskill Phase 2 → Orchestrator:**
- Returns execution summary
- Orchestrator runs verification
- Orchestrator updates report

## Operator Checklist

### Dry-Run Mode
- [ ] Resolve target scope
- [ ] Invoke subskill Phase 1 (evaluation)
- [ ] Validate candidate output against schema
- [ ] Partition candidates by confidence
- [ ] Write `migration-plan.json`
- [ ] Generate `migration-report.md` from template
- [ ] Review report for blockers and manual cases
- [ ] **Stop here - no file modifications**

### Safe-Only Mode
- [ ] Complete dry-run steps
- [ ] Filter candidates: `confidence >= 0.90` and `status === "planned"`
- [ ] Invoke subskill Phase 2 with approved IDs
- [ ] Capture changed files from execution summary
- [ ] Run verification (lint + build)
- [ ] Update `migration-report.md` with results
- [ ] Review verification output
- [ ] Confirm no systemic failures
- [ ] Report paths to artifacts

### Full Mode
- [ ] Complete dry-run steps
- [ ] Filter high-confidence candidates (`>= 0.90`)
- [ ] Review medium-confidence candidates (`0.60-0.89`)
- [ ] Get explicit approval for medium-confidence IDs
- [ ] Combine high + approved medium IDs
- [ ] Invoke subskill Phase 2 with approved IDs
- [ ] Capture changed files from execution summary
- [ ] Run verification (lint + build)
- [ ] Update `migration-report.md` with results
- [ ] Review verification output
- [ ] Confirm no systemic failures
- [ ] Report paths to artifacts

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
