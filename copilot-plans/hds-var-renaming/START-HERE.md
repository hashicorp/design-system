# Start Here - One-Off Migration Session

Use this folder as the single source of truth for the migration.

Execution order:
1. Read generated-plan.md
2. Open session-kit/fresh-session-prompt.md
3. Paste that prompt into a new AI chat session
4. Let the AI execute steps in session-kit/sequential-checklist.md
5. Confirm reports are updated in tooling/reports/
6. Open one PR with the summary from tooling/reports/pr-notes-one-off.md

Core files:
- generated-plan.md
- session-kit/fresh-session-prompt.md
- session-kit/sequential-checklist.md
- tooling/deterministic/audit-spec.md
- tooling/deterministic/stylesheets-transform-spec.md
- tooling/deterministic/scripts-templates-transform-spec.md
- tooling/deterministic/runner-spec.md
- tooling/ai/verification-instructions.md

Expected outputs from the execution session:
- tooling/reports/audit-one-off.md
- tooling/reports/verification-one-off.md
- tooling/reports/pr-notes-one-off.md
