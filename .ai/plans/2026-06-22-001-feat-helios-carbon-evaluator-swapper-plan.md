---
title: "feat: Add Helios-to-Carbon evaluator/swapper subskill"
type: feat
status: active
date: 2026-06-22
origin: .ai/skills/helios-to-carbon-orchestrator.md
---

# feat: Add Helios-to-Carbon evaluator/swapper subskill

## Summary

Define a focused subskill that evaluates Helios component usage and performs approved direct CWC swaps under strict confidence and safety rules. Keep orchestration in the existing skill and move candidate analysis + swap execution logic into a reusable subskill contract.

---

## Problem Frame

The current migration skill defines analyzer and implementer responsibilities but does not yet provide a concrete, reusable subskill spec for evaluating and swapping component usage. That gap makes behavior drift likely across future runs and limits auditability.

---

## Requirements

- R1. Introduce a dedicated subskill specification for component evaluation and swap execution.
- R2. Preserve hard constraints: direct CWC only, high-confidence auto-apply only, no wrappers/shims.
- R3. Standardize schema for candidate output so orchestrator and subskill interoperate deterministically.
- R4. Define explicit stop/skip behavior for parse failures, missing mappings, and low-confidence cases.
- R5. Keep plan and report artifacts auditable with clear manual follow-ups.

---

## Scope Boundaries

- No implementation of automated test migration.
- No automatic test execution beyond existing lint/build verification posture.
- No expansion into design-token migration or non-component refactors.
- No conversion to opencode-specific skill formats.

### Deferred to Follow-Up Work

- Build codemod automation for medium-confidence transforms after pilot data validates safe patterns.
- Add optional verifier correlation against changed-file-level diagnostics with richer machine-readable output.

---

## Context & Research

### Relevant Code and Patterns

- Existing orchestration contract lives in `.ai/skills/helios-to-carbon-orchestrator.md`.
- Current flow already distinguishes analyze/apply/verify/report phases with confidence partitioning.

### Institutional Learnings

- No `.ai/solutions/` entries currently exist in this repo to constrain this plan.

### External References

- None required for this planning pass; behavior is driven by repo-local migration policy.

---

## Key Technical Decisions

- Subskill remains markdown-based under `.ai/skills/` to stay tool-agnostic.
- Candidate exchange format is JSON-first with required keys and deterministic status values.
- Mapping definitions are externalized into a dedicated data file so rules can evolve without rewriting skill prose.
- Orchestrator remains responsible for mode gating (`dry-run`, `safe-only`, `full`) and approval boundaries.

---

## Open Questions

### Resolved During Planning

- Should evaluator and swapper be separate subskills? Keep as one subskill with two explicit sections and contracts to reduce coordination overhead in early rollout.
- Should schema live inline or separately? Use a separate schema file to enforce validation consistency.

### Deferred to Implementation

- Should mapping data be JSON or YAML? Decide based on existing tooling comfort at implementation time.
- Should medium-confidence approvals use an ID allowlist file or inline argument list? Choose based on expected review workflow.

---

## Output Structure

    .ai/
      skills/
        helios-to-carbon-orchestrator.md
        helios-to-carbon-evaluator-swapper.md
      migration/
        helios-to-carbon-component-map.json
        schemas/
          migration-candidate.schema.json
      templates/
        migration-report-template.md

---

## Implementation Units

- U1. **Define subskill contract**

**Goal:** Create the evaluator/swapper subskill document with clear mission, inputs, hard rules, and stop conditions.

**Requirements:** R1, R2, R4

**Dependencies:** None

**Files:**
- Create: `.ai/skills/helios-to-carbon-evaluator-swapper.md`
- Modify: `.ai/skills/helios-to-carbon-orchestrator.md`
- Test: `Test expectation: none -- documentation-only skill contract changes`

**Approach:**
- Define two internal phases in subskill: candidate evaluation and approved swap application.
- Encode prohibited operations explicitly (wrappers/shims, low-confidence auto-apply).
- Define required output blocks for each phase (candidates list, changed files, skipped items, blockers).

**Patterns to follow:**
- Heading structure and constraints style used in `.ai/skills/helios-to-carbon-orchestrator.md`.

**Test scenarios:**
- Happy path: Evaluator receives scoped target and emits valid candidate records with required fields.
- Edge case: File parse failure is marked skipped with explicit reason and file path.
- Error path: Missing mapping entry causes immediate stop condition output.
- Integration: Orchestrator can consume subskill output without additional schema normalization.

**Verification:**
- Subskill doc includes all required sections and output contracts referenced by orchestrator.

---

- U2. **Externalize migration mapping and schema**

**Goal:** Add machine-readable mapping and schema artifacts used by evaluator/swapper decisions.

**Requirements:** R2, R3, R4

**Dependencies:** U1

**Files:**
- Create: `.ai/migration/helios-to-carbon-component-map.json`
- Create: `.ai/migration/schemas/migration-candidate.schema.json`
- Modify: `.ai/skills/helios-to-carbon-evaluator-swapper.md`
- Test: `Test expectation: none -- static data/schema artifacts`

**Approach:**
- Represent per-component mappings with attributes/events/slots transformation metadata.
- Represent confidence hints and risk flags in mapping records where known.
- Define strict schema constraints for `status`, numeric confidence bounds, and required properties.

**Patterns to follow:**
- JSON record conventions already required in `.ai/skills/helios-to-carbon-orchestrator.md`.

**Test scenarios:**
- Happy path: Known Helios component resolves to mapped CWC component and operation list.
- Edge case: Component with partial mapping is emitted as manual with rationale and notes.
- Error path: Unknown Helios component triggers stop condition classification.
- Integration: Candidate output validates against schema with no missing required keys.

**Verification:**
- Mapping + schema files can support deterministic candidate generation rules documented in subskill.

---

- U3. **Wire orchestrator delegation to subskill contracts**

**Goal:** Update orchestrator skill to call the new evaluator/swapper subskill with explicit contracts and artifact paths.

**Requirements:** R1, R3, R5

**Dependencies:** U1, U2

**Files:**
- Modify: `.ai/skills/helios-to-carbon-orchestrator.md`
- Create: `.ai/templates/migration-report-template.md`
- Test: `Test expectation: none -- orchestration documentation wiring`

**Approach:**
- Replace generic analyzer/implementer references with concrete subskill invocation guidance.
- Specify artifact locations and handoff format (plan/report + candidate IDs for allowed set).
- Add a concise operator checklist for dry-run and safe-only execution consistency.

**Patterns to follow:**
- Phase-oriented execution flow and reporting layout in existing orchestrator skill.

**Test scenarios:**
- Happy path: `safe-only` run delegates only high-confidence IDs and generates both artifacts.
- Edge case: `dry-run` mode exits after analysis and report generation.
- Error path: Verification systemic failure is surfaced as halted run, not false success.
- Integration: Report template fields map to subskill outputs (counts, applied/skipped, blockers).

**Verification:**
- Orchestrator text unambiguously references subskill artifacts, schema, and delegation handoff.

---

## System-Wide Impact

- **Interaction graph:** Orchestrator -> evaluator/swapper subskill -> mapping/schema artifacts -> migration report.
- **Error propagation:** Mapping/schema issues fail early in analysis; skip reasons are preserved at file-level granularity.
- **State lifecycle risks:** Main risk is contract drift between orchestrator and subskill; mitigated with explicit schema and templates.
- **API surface parity:** No runtime package API changes; only migration process contract is introduced.
- **Integration coverage:** Future execution validation should include at least one dry-run and one safe-only run on a representative component set.
- **Unchanged invariants:** Direct CWC-only rule and no-wrapper policy remain unchanged.

---

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| Mapping table is incomplete for common Helios components | Seed with highest-usage components first and mark unknowns as manual with blockers |
| Confidence scoring criteria are too subjective | Define deterministic confidence rubric in subskill and annotate rationale per candidate |
| Orchestrator and subskill output contracts diverge | Enforce schema reference in both documents and keep report template keyed to schema fields |

---

## Documentation / Operational Notes

- Keep migration policy language in one place (subskill + mapping/schema) and keep orchestrator focused on control flow.
- During rollout, require manual review of first few safe-only reports to calibrate confidence thresholds.

---

## Sources & References

- **Origin document:** `.ai/skills/helios-to-carbon-orchestrator.md`
- Related code: `.ai/skills/helios-to-carbon-orchestrator.md`
