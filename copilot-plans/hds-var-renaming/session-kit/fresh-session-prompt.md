# Fresh Session Prompt (Copy/Paste)

You are executing a one-off migration in this monorepo only.

Primary objective:
Rename CSS custom property prefix from --hds- to --hds-var- in scoped source files, then complete validation and produce PR-ready notes.

Mandatory constraints:
- Mechanical rename only.
- Never rename --token-*.
- Never rename Sass variables like $hds-*.
- Never edit generated output paths.
- Keep all work sequential and autonomous; ask only if genuinely blocked.

Read these files first and follow them exactly:
1. copilot-plans/hds-var-renaming/generated-plan.md
2. copilot-plans/hds-var-renaming/session-kit/sequential-checklist.md
3. copilot-plans/hds-var-renaming/tooling/deterministic/audit-spec.md
4. copilot-plans/hds-var-renaming/tooling/deterministic/stylesheets-transform-spec.md
5. copilot-plans/hds-var-renaming/tooling/deterministic/scripts-templates-transform-spec.md
6. copilot-plans/hds-var-renaming/tooling/deterministic/runner-spec.md
7. copilot-plans/hds-var-renaming/tooling/ai/verification-instructions.md

Required outputs to update during execution:
- copilot-plans/hds-var-renaming/tooling/reports/audit-one-off.md
- copilot-plans/hds-var-renaming/tooling/reports/verification-one-off.md
- copilot-plans/hds-var-renaming/tooling/reports/pr-notes-one-off.md

Execution rules:
- Run preflight counts and write them to audit-one-off.md before making edits.
- Apply replacements in strict order: stylesheets first, scripts/templates second.
- Run residual scans and fix missed rename sites.
- Run validation commands from generated-plan.md and record pass/fail in reports.
- If any validation fails, attempt fixes and rerun.
- End only when Definition of Done in generated-plan.md is met.

Final deliverable from this session:
A clean branch state ready for one PR, with report files fully populated.
