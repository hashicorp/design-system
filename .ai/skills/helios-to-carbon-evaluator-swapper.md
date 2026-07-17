---
name: helios-to-carbon-evaluator-swapper
description: Evaluate Helios component usage and perform approved direct CWC swaps under strict confidence and safety rules.
argument-hint: "[Scope paths, mapping table path, allowed operations, output schema path]"
---

# Helios -> Carbon Web Components Evaluator Swapper

Evaluate Helios component usage in target files and execute approved direct Carbon Web Components (CWC) swaps.

## Mission

- Identify Helios component usage candidates for migration to CWC.
- Generate structured migration candidates with confidence scoring.
- Execute approved component swaps with direct CWC usage.
- Never generate Helios wrappers or compatibility shims.
- Preserve behavior and provide clear rationale for all decisions.

## Inputs

Received from orchestrator:

- `scopePaths`: Array of file paths or glob patterns to analyze
- `mappingTablePath`: Path to Helios-to-CWC component mapping data (default: `.ai/migration/helios-to-carbon-component-map.json`)
- `allowedOperations`: List of permitted transformation operations
- `prohibitedOperations`: List of forbidden operations
- `outputSchemaPath`: Path to JSON schema for candidate validation (default: `.ai/migration/schemas/migration-candidate.schema.json`)
- `stopConditions`: Conditions that halt execution immediately

## Hard Rules

1. **Direct CWC usage only** — never emit Helios wrapper components or compatibility shims.
2. **High-confidence auto-apply only** — only mark candidates with confidence ≥ 0.90 as `planned`.
3. **Preserve behavior first** — functional correctness before stylistic cleanup.
4. **Skip unparseable files** — if file parsing fails, mark as `skipped` with explicit reason.
5. **Fail fast on missing mappings** — if required Helios component has no mapping entry, trigger stop condition.
6. **No test migration** — do not attempt to migrate or execute automated tests.

## Prohibited Operations

- Creating Helios wrapper components
- Creating compatibility shim layers
- Auto-applying low-confidence transforms (< 0.90)
- Modifying test files
- Migrating design tokens or non-component code
- Making stylistic changes before behavior preservation is verified

## Execution Phases

### Phase 1: Candidate Evaluation

**Goal:** Analyze target files and produce structured migration candidates.

**Steps:**

1. Load mapping table from `mappingTablePath`.
2. Parse each file in `scopePaths`.
3. For each Helios component usage found:
   - Look up mapping entry
   - If no mapping exists: trigger stop condition
   - If mapping exists: generate candidate record
4. Calculate confidence score based on:
   - Mapping completeness (attributes/events/slots coverage)
   - Known risk flags (breaking changes, behavioral differences)
   - Parse complexity (nested usage, dynamic attributes)
5. Assign status:
   - `planned`: confidence ≥ 0.90, safe for auto-apply
   - `manual`: confidence 0.60-0.89 or has risk flags
   - `skipped`: parse failure or missing context
6. Validate all candidates against `outputSchemaPath`.

**Output:** JSON array of candidate records (see schema below).

### Phase 2: Approved Swap Application

**Goal:** Execute code transformations for approved candidates.

**Steps:**

1. Receive approved candidate IDs from orchestrator.
2. For each approved candidate:
   - Verify candidate status is `planned`
   - Apply transformation operations from mapping
   - Update imports (remove Helios, add CWC)
   - Transform component usage (tag name, attributes, events, slots)
   - Preserve comments and formatting where possible
3. **Post-swap class check:** After all transformations are applied to a file, inspect the backing class:
   - If the class body is empty (no `@tracked` properties, no methods, no constructor, no other class members) — remove the class wrapper entirely and convert to a template-only component:
     - Remove `import Component from '@glimmer/component'`
     - Remove `export default class X extends Component { ... }`
     - Promote the `<template>` block to the top level as a standalone export
   - This avoids the `ember/no-empty-glimmer-component-classes` ESLint error
   - If the class has any remaining members, leave it unchanged
4. Track changed files and any skipped candidates.
5. Return execution summary.

**Output:** Execution summary (see schema below).

## Candidate Record Schema

Each candidate must include:

```json
{
  "id": "unique-candidate-id",
  "filePath": "relative/path/to/file.gts",
  "line": 42,
  "heliosComponent": "Hds::Button",
  "proposedCwcComponent": "cds-button",
  "transformOperations": [
    {
      "type": "replaceTag",
      "from": "Hds::Button",
      "to": "cds-button"
    },
    {
      "type": "renameAttribute",
      "from": "@text",
      "to": "label"
    }
  ],
  "confidence": 0.95,
  "riskFlags": [],
  "status": "planned",
  "rationale": "Direct 1:1 mapping with complete attribute coverage",
  "manualNotes": []
}
```

**Required fields:**
- `id` (string): Unique identifier for this candidate
- `filePath` (string): Relative path from workspace root
- `line` (number): Line number where component usage starts
- `heliosComponent` (string): Helios component name
- `proposedCwcComponent` (string): Target CWC component name
- `transformOperations` (array): List of transformation steps
- `confidence` (number): 0.0-1.0 confidence score
- `riskFlags` (array): List of risk identifiers (empty if none)
- `status` (enum): `planned` | `manual` | `skipped`
- `rationale` (string): Explanation for confidence/status decision
- `manualNotes` (array): Additional context for manual review (empty if none)

**Confidence scoring guidelines:**
- **≥ 0.90 (High):** Complete mapping, no risk flags, simple usage
- **0.60-0.89 (Medium):** Partial mapping, minor risk flags, or complex usage
- **< 0.60 (Low):** Incomplete mapping, major risk flags, or parse failures

**Status assignment:**
- `planned`: High confidence, safe for auto-apply
- `manual`: Medium/low confidence or has risk flags requiring human review
- `skipped`: Parse failure, missing context, or prohibited operation detected

## Execution Summary Schema

After swap application, return:

```json
{
  "changedFiles": [
    "path/to/file1.gts",
    "path/to/file2.gts"
  ],
  "appliedCandidates": [
    "candidate-id-1",
    "candidate-id-2"
  ],
  "skippedCandidates": [
    {
      "id": "candidate-id-3",
      "reason": "File modified since analysis"
    }
  ],
  "blockers": [
    {
      "type": "missing-mapping",
      "component": "Hds::UnknownComponent",
      "filePath": "path/to/file.gts",
      "line": 15
    }
  ]
}
```

## Stop Conditions

Halt execution immediately and report when:

1. **Missing mapping entry** — required Helios component not found in mapping table
2. **Malformed mapping data** — mapping table fails schema validation
3. **Schema validation failure** — candidate output doesn't match required schema
4. **File system errors** — cannot read target files or write changes
5. **Prohibited operation detected** — transformation would violate hard rules

When a stop condition is triggered:
- Do not proceed with any file modifications
- Return partial results with explicit blocker information
- Include file path, line number, and specific issue in blocker record

## Integration with Orchestrator

**Invocation contract:**

The orchestrator will:
1. Provide all required inputs (scope, mapping, schema paths)
2. Receive Phase 1 candidate output
3. Filter candidates by confidence and mode
4. Send approved candidate IDs for Phase 2
5. Receive execution summary
6. Correlate results with verification output

**Output handoff:**

- Phase 1 output must validate against schema without normalization
- Phase 2 execution summary must include all changed files for verification
- Blocker records must be actionable (file path + line + specific issue)

## Error Handling

**Parse failures:**
- Mark file as skipped
- Include parse error message in `manualNotes`
- Continue processing remaining files

**Mapping ambiguities:**
- Use most specific mapping match
- Document ambiguity in `rationale`
- Lower confidence score appropriately

**Transformation failures:**
- Skip candidate
- Record failure reason in execution summary
- Do not modify file

## Output Expectations

**Phase 1 (Evaluation):**
- Valid JSON array of candidates
- All candidates pass schema validation
- Confidence scores are deterministic and documented
- Risk flags are specific and actionable

**Phase 2 (Swap Application):**
- Only approved candidates are modified
- All file changes are atomic (complete or rolled back)
- Execution summary accounts for all approved candidates
- Blockers include sufficient context for manual resolution

## Verification

After implementation, verify:
- ✅ All required sections present
