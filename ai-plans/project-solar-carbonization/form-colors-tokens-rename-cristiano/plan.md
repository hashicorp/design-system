# Form control color tokens — rename & restructure

> On approval, this file is copied to
> `ai-plans/project-solar-carbonization/form-colors-tokens-rename-cristiano/plan.md`
> (plan mode cannot write outside the session folder).

## Problem

The form control color tokens in `packages/tokens/src/products/shared/form/generic-control/colors.json` use an
inconsistent nesting order, producing CSS variable names where the semantic color chunk
(`foreground` / `surface` / `border`) sits in different positions
(e.g. `form-control-base-foreground-color` vs `form-control-foreground-color-checked`).

## Approach

Adopt a single naming convention:

```
--hds-form-[control|placeholder]-[foreground|surface|border]-color-<state>[-<interaction>][-<variant>]
```

- **Semantic color:** `foreground`, `surface`, `border` (in this order)
- **Primary state:** `base`, `disabled`, `invalid`, `readonly`
- **Interaction modifier:** `hover`
- **Selection variant:** `checked`, `unchecked`

The authoritative before/after mapping is `token-rename-table.md` (28 tokens, `--hds-` prefix omitted).

### Target JSON structure

```
form
  [control|placeholder]
    [foreground|surface|border]
      color
        <flat-key>        e.g. "base-hover-checked"
```

The final key is **flat** (hyphenated), not nested further.

### Internal token aliases

Renaming the JSON node tree also invalidates any alias of the form `{foo.bar.baz}` in **other** token
source files, because an alias is the dotted path of the node it points at. These must be remapped in the
same step as the restructure, otherwise the Style Dictionary build fails to resolve them.

## Validation already performed

- The rename table covers **exactly** the 28 tokens currently defined in `colors.json` — no extras, none missing.
- No "before" token name is a prefix of another, so textual replacement is unambiguous.
- Old token names appear in source only under `packages/components/src/styles/` (9 SCSS files).
  `website/` and `showcase/` source contain **zero** references.
- Files under `showcase/public/assets/styles/@hashicorp/` are build artifacts regenerated from the
  `packages/components` + `packages/tokens` builds; they are not hand-edited.
- Resolving **every** alias in the build's full source set
  (`src/carbon-extracted/**`, `src/global/**`, `src/products/shared/**` — 99 files) against the restructured
  tree isolates exactly **4** broken aliases, in 2 files:
  - `src/products/shared/form/select.json` (lines 40, 42) → `{form.control.base.surface.color.default}`
  - `src/products/shared/form/super-select.json` (lines 210, 212) → `{form.control.base.foreground.color}`
  All other aliases resolve, so no further remapping is required.

## Decisions

- `form.placeholder.*` tokens stay in the existing `generic-control/colors.json` file.
  Style Dictionary globs `src/products/shared/**/*.json`, so no config change is needed.
- `.changeset/carbonization-design-tokens.md` is **left untouched**; its stale mappings are handled separately.

## Todos

### Step 1 — Restructure the source JSON (then pause for review)

1. **rewrite-json** — Rewrite `packages/tokens/src/products/shared/form/generic-control/colors.json` into the
   target structure: `form.control` sub-keys ordered `foreground`, `surface`, `border`, followed by
   `form.placeholder`. Within each `color` object, order flat keys by primary state
   (`base`, `disabled`, `invalid`, `readonly`), then interaction, then selection variant.
   Each token's `$type`, `$value`, `group`, `$modes`, and `comments` payload is carried over verbatim.
2. **verify-json** — Programmatically verify against the pre-change file that:
   - generated dotted paths match the table's "after" names exactly (all 28),
   - each token payload is identical to its "before" counterpart,
   - the file is valid JSON and Prettier-formatted.
3. **remap-aliases** — Update every `{foo.bar.baz}` alias in `packages/tokens/src` that points at a renamed
   node, using the old→new dotted-path mapping derived from the restructured file:
   - `{form.control.base.surface.color.default}` → `{form.control.surface.color.base}`
     (`form/select.json`, in both `$value` and the `default` entry of `$modes`)
   - `{form.control.base.foreground.color}` → `{form.control.foreground.color.base}`
     (`form/super-select.json`, in both `$value` and the `default` entry of `$modes`)
4. **verify-aliases** — Re-resolve every alias across the build's full source set and confirm **0** unresolved
   aliases remain; confirm no old dotted path survives anywhere in `packages/tokens/src`.
5. **pause-for-review-1** — Stop and report. User reviews, commits, runs `pnpm build`, and commits the
   updated `dist`.

### Step 2 — Replace token usages in the codebase (then pause for review)

6. **replace-usages** — Replace every "before" token name with its "after" name across
   `packages/components`, `showcase`, and `website` (`.scss`, `.css`, `.gts`, `.hbs`, `.js`, `.ts`),
   excluding `node_modules`, `dist`, and generated `showcase/public/assets` artifacts.
   Per the scan, edits land in these 9 files:
   - `packages/components/src/styles/mixins/_form-control.scss`
   - `packages/components/src/styles/@hashicorp/design-system-power-select-overrides.scss`
   - `packages/components/src/styles/components/form/{select,toggle,checkbox,radio,text-input,textarea,super-select}.scss`
7. **verify-usages** — Confirm zero "before" names remain in source, and that the post-change occurrence
   count per "after" name matches the pre-change count of its "before" name.
8. **lint-styles** — Run the existing targeted style lint for the changed package.
9. **pause-for-review-2** — Stop and report for user review/commit.

## Notes & considerations

- `form-control-foreground-color-checked` has **0** source usages today; it is still renamed in the JSON
  (to `form-control-foreground-color-base-checked`) so the token set stays complete.
- Aliases must be remapped in the **same commit** as the restructure, since a stale alias breaks the
  Style Dictionary build rather than degrading silently.
- Only the `$value` and the `default` entry of `$modes` carry internal aliases for the affected tokens; the
  `cds-*` mode entries point at Carbon tokens and are untouched.
- Step 2 intentionally runs **after** the rebuild/commit of `dist`, so SCSS references resolve against
  regenerated CSS variables.
- Replacement is applied longest-name-first as a safety measure, even though no prefix collisions exist.
- This is a breaking change for consumers of the `--hds-form-control-*` variables; the covering changeset
  is handled outside this plan.
