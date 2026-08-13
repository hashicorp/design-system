---
name: helios-to-carbon
description: Analyze and migrate Helios component usage to Carbon Web Components with strict confidence gating and auditable reporting.
argument-hint: "[Target path/glob and optional mode: dry-run|safe-only|full]"
---

# Helios -> Carbon Web Components

Single-skill migration workflow that consolidates candidate evaluation, approved swaps, verification, and reporting.

## Mission

- Migrate Helios component usage to direct Carbon Web Components (CWC).
- Never generate Helios wrappers or compatibility shims.
- Preserve behavior first; style cleanup is secondary.
- Produce auditable migration artifacts for each run.

## Inputs

- `target`: file, directory, or glob scope.
- `mode`:
  - `dry-run`: analyze and report only; no file edits.
  - `safe-only` (default): apply only high-confidence candidates (`confidence >= 0.90`).
  - `full`: apply high-confidence plus explicitly approved medium-confidence candidates (`0.60-0.89`).

## Canonical Artifacts

Treat the directory containing `SKILL.md` as `skillRoot`.

- Mapping table (default): `{skillRoot}/migration/helios-to-carbon-component-map.json`
- Candidate schema (default): `{skillRoot}/migration/schemas/migration-candidate.schema.json`
- Report template (default): `{skillRoot}/templates/migration-report-template.md`

Allow callers to override artifact paths when needed:

- `mappingPath`
- `candidateSchemaPath`
- `reportTemplatePath`

All override paths may be absolute or workspace-relative.

## Runtime Configuration

- `target`: file, directory, or glob scope.
- `mode`: `dry-run` | `safe-only` | `full`.
- `outputDir` (optional): directory for run artifacts. Default: workspace root.
- `verifyCommands` (optional): ordered list of verification commands to run after apply.
  - If omitted, do not infer repo-specific commands. Mark verification as `not_run` with reason.

## Hard Rules

1. Direct CWC usage only.
2. Never emit Helios wrappers or compatibility shims.
3. Auto-apply only high-confidence candidates (`>= 0.90`).
4. In `full` mode, pause after analysis and require explicit user approval for medium-confidence IDs before any apply step.
5. Skip unparseable files and record exact failure context.
6. Do not modify test files.
7. Do not perform NPW automated test migration.
8. Do not execute automated test suites as part of migration; run only explicitly provided `verifyCommands`.
9. Scope is component migration only; do not migrate design tokens or unrelated non-component code.
10. Do not claim success unless verification and report generation complete.

## Prohibited Operations (explicit)

- `createWrapper`
- `createShim`
- `modifyTests`
- migration of design tokens or unrelated non-component code

## Candidate Contract

Every candidate record must validate against `migration-candidate.schema.json` and include:

- `id`, `filePath`, `line`
- `heliosComponent`, `proposedCwcComponent`
- `transformOperations[]`
- `confidence`, `riskFlags[]`, `status`
- `rationale`, `manualNotes[]`

Status policy:

- `planned`: high confidence (`>= 0.90`) and safe to auto-apply
- `manual`: medium/low confidence or risk flags requiring review
- `skipped`: parse failure, missing context, or prohibited operation

## Execution Flow

### Phase 0: Resolve scope, mode, artifacts

1. Resolve `target` into scope paths.
2. Resolve `mode` (default `safe-only`).
3. Set `generatedAt` once using current UTC ISO 8601 timestamp (`YYYY-MM-DDTHH:MM:SSZ`).
4. Resolve `outputDir` (default workspace root).
5. Initialize run artifacts in `outputDir`:
   - `migration-plan-{generatedAt}.json`
   - `migration-report-{generatedAt}.md`

### Phase 1: Evaluate candidates

1. Load mapping table and schema from canonical artifact paths.
2. Parse each scoped file and find Helios component usage.
3. Build candidate records with transform operations, confidence, risk flags, rationale, manual notes.
4. Validate all candidate records against the candidate schema.
5. Partition into high/medium/low confidence.
6. Write complete plan to `migration-plan-{generatedAt}.json`.
7. Render initial report from template.

If mode is `dry-run`, stop here.

### Phase 2: Apply approved swaps

1. Build `approvedCandidateIds` by mode:
   - `safe-only`: high-confidence `planned` IDs.
   - `full`: high-confidence IDs + user-approved medium IDs.
2. Apply only approved candidates.
3. Update imports/usages/attributes/events/slots per mapping.
4. Track `changedFiles`, `appliedCandidates`, `skippedCandidates`, and `blockers`.
5. After file updates, remove empty Glimmer class wrappers if present and safely convertible to template-only.

### Phase 3: Verify

Run verification using explicit configuration only:

- If `verifyCommands` is provided, run each command in order and capture status/output.
- If any command fails, record failure and add blocker context.
- If `verifyCommands` is not provided, set verification status to `not_run` and record reason.

### Phase 4: Finalize report

Fill report template sections with:

- summary counts and confidence breakdown
- applied/skipped candidate details
- verification results
- blockers and manual follow-ups
- component-level and risk-flag summaries
- immediate/follow-up actions

## Stop Conditions

Stop immediately and return partial results with blockers when:

1. required component mapping is missing
2. mapping table is malformed
3. candidate schema validation fails
4. file read/write operations fail
5. prohibited operation is required
6. systemic verification failures invalidate result confidence

Each blocker must include actionable context (`type`, `component` when relevant, `filePath`, `line` when known, and reason).

## Output Expectations

At completion, return:

- files migrated
- manual follow-up count
- verification status
- exact artifact paths with full timestamps

Artifacts produced per run:

- `{outputDir}/migration-plan-{generatedAt}.json`
- `{outputDir}/migration-report-{generatedAt}.md`

## Portability Requirements

- Do not assume a specific monorepo layout.
- Do not require `.bob/` to exist at workspace root.
- Resolve defaults from `skillRoot` and write outputs to `outputDir`.
- Keep all artifact and command paths explicit in logs and report.
