# HDS `--hds-*` to `--hds-var-*` One-Off Migration Plan (Monorepo Only)

## 0. Fresh-Session Handoff

For a new zero-context AI session, use this exact order:
1. Open `copilot-plans/hds-var-renaming/START-HERE.md`
2. Copy/paste `copilot-plans/hds-var-renaming/session-kit/fresh-session-prompt.md` into the new chat
3. Ensure execution follows `copilot-plans/hds-var-renaming/session-kit/sequential-checklist.md`
4. Require report updates in:
   - `copilot-plans/hds-var-renaming/tooling/reports/audit-one-off.md`
   - `copilot-plans/hds-var-renaming/tooling/reports/verification-one-off.md`
   - `copilot-plans/hds-var-renaming/tooling/reports/pr-notes-one-off.md`

If the AI session deviates from sequence, restart from checklist Phase 1.

## 1. Goal

Run a single, one-off migration in this monorepo to rename CSS custom property names from:
- `--hds-*` to `--hds-var-*`

This plan is intentionally not codebase-agnostic. It is designed only for this repository and will end in one migration PR.

## 2. Migration Rule

Apply this mechanical rename everywhere in scoped source files:
- Match: `(--hds-)([a-zA-Z][a-zA-Z0-9_-]*)`
- Replace: `--hds-var-$2`

Hard constraints:
- Never change `--token-*`
- Never change Sass variables (for example `$hds-*`)
- Never edit generated output
- No behavioral or logic changes

## 3. Scope (This Monorepo)

In scope file types:
- `.scss`, `.css`
- `.gts`, `.hbs`, `.ts`, `.js`

Primary directories to touch:
- `packages/components/src/`
- `showcase/app/`
- `showcase/tests/`
- `website/docs/` and other source snippet/template locations under `website/`

Must exclude:
- `packages/components/dist/**`
- `showcase/dist/**`
- `website/dist/**`
- `showcase/public/assets/styles/@hashicorp/design-system-components.css`

## 4. One-Off Execution Strategy

This migration is a scoped find-and-replace session with verification, not a reusable codemod framework.

Execution model:
1. Preflight inventory and collision check
2. SCSS/CSS replacement pass
3. GTS/HBS/TS/JS replacement pass
4. Residual scan and targeted cleanup
5. Build/test/validation
6. Commit and open one PR

## 5. Preflight Checklist

Before editing:
1. Create a dedicated branch.
2. Capture baseline counts for `--hds-` and `--hds-var-` in scoped source paths.
3. Confirm no problematic pre-existing `--hds-var-*` conflicts.
4. Save a pre-migration report under `copilot-plans/hds-var-renaming/tooling/reports/`.

Recommended baseline commands:

```bash
rg -n --glob '**/*.{scss,css,gts,hbs,ts,js}' --glob '!**/dist/**' --glob '!showcase/public/assets/styles/**' -- '--hds-' packages/components showcase website

rg -n --glob '**/*.{scss,css,gts,hbs,ts,js}' --glob '!**/dist/**' --glob '!showcase/public/assets/styles/**' -- '--hds-var-' packages/components showcase website
```

## 6. Replacement Session Plan

## 6.1 Pass A: Stylesheets (`.scss`, `.css`)

Target:
- `packages/components/src/styles/**`
- any additional in-scope source stylesheet locations

What to replace:
- custom property declarations
- `var(--hds-...)` usages, including fallback variants
- interpolated suffix forms (for example `--hds-foo-#{$bar}`) by changing only prefix

Do not change:
- `$hds-*` Sass variables
- `--token-*`

## 6.2 Pass B: Component and app source (`.gts`, `.hbs`, `.ts`, `.js`)

Target:
- `packages/components/src/components/**`
- `showcase/app/**`
- `showcase/tests/**`
- `website/**` source snippets/templates

What to replace:
- style object keys (for example `styles['--hds-...']`)
- TS/GTS type keys (`'--hds-...'?: string`)
- `{{style --hds-...=...}}` named args
- style snippet strings and assertion strings
- `hasStyle` / `doesNotHaveStyle` expectation keys

## 6.3 Pass C: Residual cleanup

Run focused residual scan for any remaining `--hds-` in scoped source files.
Classify each residual match as one of:
- missed migration edit (fix)
- intentional ignore (document)
- out-of-scope/generated artifact (exclude)

## 7. Validation Requirements

Required checks after replacement:
1. No unresolved `--hds-` in scoped source files (except documented intentional exceptions).
2. `--token-*` unchanged.
3. JS-to-CSS bridge alignment preserved:
   - names assigned in GTS/TS still match names consumed in SCSS via `var(...)`.
4. Build/lint/tests pass for affected workspaces.
5. Visual checks for layout/grid/flex and form/super-select and stepper flows.

Suggested commands (adjust as needed):

```bash
# components
cd packages/components && pnpm build && pnpm lint

# showcase
cd showcase && pnpm lint && pnpm test

# website (if snippets/templates touched)
cd website && pnpm lint && pnpm test
```

## 8. PR Preparation

This migration should ship as one dedicated PR.

PR checklist:
1. Title clearly states one-off prefix rename.
2. Description includes scope, exclusions, and mechanical rule.
3. Attach before/after counts for `--hds-` and `--hds-var-`.
4. Include validation results (build/lint/test summary).
5. Note any intentional exclusions or follow-up items.

Suggested PR title:
- `chore(components/showcase/website): one-off rename --hds-* vars to --hds-var-*`

## 9. Risk Controls (One-Off Session)

Risk: accidental edits outside source scope
- Control: strict include/exclude file globs

Risk: changing tokens or Sass variables
- Control: explicit guardrails + residual scans for `$hds-` and `--token-`

Risk: bridge mismatch between GTS assignments and SCSS consumption
- Control: post-migration bridge check and spot checks in layout/grid/item + layout/grid + key-value-inputs + super-select

Risk: docs and tests drift from source behavior
- Control: include `website` snippets and `showcase/tests` in primary scope, not as afterthought

## 10. Definition of Done

Migration is done when all are true:
1. Scoped source rename is complete and mechanical.
2. Residual `--hds-` matches are zero or explicitly documented.
3. No `--token-*` or Sass variable renames occurred.
4. Build/lint/tests for affected packages/apps pass.
5. One clean PR is ready to open.
