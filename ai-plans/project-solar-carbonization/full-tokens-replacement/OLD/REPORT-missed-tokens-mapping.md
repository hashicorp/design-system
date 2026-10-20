# Investigation report — missed / wrong tokens mappings in the carbonization token map

> [!NOTE]
> **ARCHIVED investigation record.** The fixes proposed in §6 were applied on 2026-10-19. See
> [§7 Resolution](#7-resolution-applied-2026-10-19) for the final corrected rows, the validation of the corrected map,
> and where the fixes were applied. The canonical map is [`../tooling/token-map.json`](../tooling/token-map.json).
> Links to `token-map.generated.json` below point to the map **as shipped** (pre-correction).

> Investigation date: 2026-10-15. Nothing has been changed in the repo as part of this
> investigation. This document is the record of the findings.

## Starting question

In [`token-map.generated.json`](./tooling/reports/hds/token-map.generated.json)
(line 1602) we have:

```json
{
  "before": "--token-form-control-base-foreground-placeholder-color",
  "after": "--hds-form-control-foreground-color-default"
},
```

while the token that clearly should be the `after` is listed as a brand-new token with no predecessor:

```json
{
  "before": null,
  "after": "--hds-form-control-placeholder-foreground-color-default"
},
```

Questions:

1. Where did this mapping come from?
2. Is it a one-off, or are there similar cases?

## TL;DR

- **This wasn't a one-off.** There are **5 confirmed mis-mappings and 1 confirmed missed mapping**,
  plus 1 likely missed mapping.
- All of them come from the **same flaw in the Phase A tooling**:
  - an **S3 fuzzy-match** guess was written to the map;
  - the map was copied into the `.changeset` table;
  - the next Phase A run read the changeset back as **S1 "high confidence"**.

  Once a fuzzy guess had gone round that loop it was indistinguishable from a curated rename.
- Separately, nothing ever flagged **many-to-one targets** (two `before` mapping to the same
  `after`). When the final-QA work noticed them, it described them as intentional "merges".
- All the wrong rows **shipped in the tokens `6.0.0` release notes**:
  - [`packages/tokens/CHANGELOG.md`](../../../../packages/tokens/CHANGELOG.md)
  - [`website/docs/whats-new/release-notes/partials/design-tokens.md`](../../../../website/docs/whats-new/release-notes/partials/design-tokens.md)

---

## 1. Background: how the map is produced

Tooling lives in [`../full-tokens-replacement/tooling`](./tooling).
[`diff-tokens.mjs`](./tooling/diff-tokens.mjs) (Phase A) compares pre and post token names:

- **Pre:** `--token-*` from `git show main:packages/tokens/dist/products/css/tokens.css`. `main` was
  pre-carbonization at the time.
- **Post:** `--hds-*` from the working tree.

For every pre token it tries these signals, in order:

| Signal | Description | Confidence |
|---|---|---|
| **S0** | Mechanical prefix swap `--token-X` → `--hds-X`, if that name exists in post | high |
| **S1** | Rename chains parsed from `.changeset/*.md` tables (`\| --token-a \| --hds-b \|`) | high |
| **S2** | Source-JSON provenance + structure: same source file, **equal segment multiset** | high |
| **S3** | Fuzzy name similarity: `0.6 × Jaccard(segments) + 0.4 × normalised Levenshtein`, threshold ≥ 0.6 | low ("review-only") |

Relevant implementation details:

- Pre tokens are processed in **alphabetical order**.
- A `usedAfter` set is maintained, **but only S2/S3 consult it**. S0 and S1 never check it, so two
  `before` can be resolved to the same `after`.
- Nothing in the report flags **duplicate `after` targets**.
- A post token not targeted by any `before` goes into `added` (`before: null`). Phase B ignores
  `added`.
- The `.changeset/carbonization-design-tokens.md` table was **populated from the map** itself, and
  S1 reads that changeset. This creates a **feedback loop**: map → changeset → map.

After Phase A, the map was further curated by the final-QA scripts in #4145 (`final-qa-tokens-renaming/`):

- `PLAN-PART-1.md` reorganised the categories (`__form-elements`).
- `PLAN-PART-2.md` folded the final-QA renames into the map and changesets.

---

## 2. Timeline of the placeholder mapping

On `main`, the map has a single squashed commit (`0680c8f39a`, #4036). The real history lives in the
PR branches and cherry-picks. Commits below are the original ones (many duplicates exist across
rebases and cherry-picks, plus "Agent host session" checkpoint commits, which I ignored).

| Date | Commit | Placeholder `after` | Signal | Notes |
|---|---|---|---|---|
| 07-17 | `ed85fb0ec8` (#4006 "Second run of the tooling") | `--hds-form-control-base-placeholder-foreground-color` | **S2** | **Correct.** The post token was a single token at the time. |
| 08-06 | `1218b86e1f` "added changeset for design tokens changes" | same | — | Row copied into `.changeset/carbonization-design-tokens.md` (still correct). |
| 08-25 | `d2c67b100b` "updated tooling … latest/final list of carbonized tokens" | `--hds-form-control-base-foreground-color` | **S3** | **The bug starts here.** The post token had been split into `…-default` / `…-disabled`. |
| 08-25 | `5e898730ae` "updated changeset for tokens with latest changes" | same | — | Wrong row copied into the changeset. |
| 09-15 | `e23459e3d3` "updated tooling … recent changes to source tokens" | same | **S1** | The fuzzy guess comes back as "high confidence" via the changeset. |
| 09-29 | `feeda448f5` "Executed Part 1 of the Plan" (#4145) | same | S1 | Moved into the new `prefix-plus-renaming__form-elements` category. |
| 09-29 / 10-01 | `d38f56519c` "Executed Part 2 of the Plan" / `190bc343f5` / `25a6295260` "updated changeset with changes to `form` tokens names" | `--hds-form-control-foreground-color-default` | S1 | Final-QA rename of the wrong target (`base-foreground-color` → `foreground-color-default`) carried the error forward. |
| 10-01 | `15985023c3` "updated design tokens per final QA specs" (cherry-picked from #4145) | — | — | Source tokens renamed: `form-control-base-placeholder-foreground-color-*` → `form-control-placeholder-foreground-color-*` (deleted `generic-control/colors.json`, new `control/color.json`). |
| 10-06 | `07f024bb21` (#4035), `0680c8f39a` (#4036) | `--hds-form-control-foreground-color-default` | — | Squash-merged to `main`. |
| 10-07 | `97eefa54e0` (#4187) | — | — | Changeset consumed by the release, so the wrong row is now in `CHANGELOG.md` and the website release notes. |

### Diff of the placeholder rows in the changeset across commits

```
1218b86e1f (08-06)
+| `--token-form-control-base-foreground-placeholder-color` | `--hds-form-control-base-placeholder-foreground-color` |
+| `--token-form-control-base-foreground-value-color`       | `--hds-form-control-base-foreground-color` |

5e898730ae (08-25)
-| `--token-form-control-base-foreground-placeholder-color` | `--hds-form-control-base-placeholder-foreground-color` |
+| `--token-form-control-base-foreground-placeholder-color` | `--hds-form-control-base-foreground-color` |

25a6295260 (10-01)
-| `--token-form-control-base-foreground-placeholder-color` | `--hds-form-control-base-foreground-color` |
-| `--token-form-control-base-foreground-value-color`       | `--hds-form-control-base-foreground-color` |
+| `--token-form-control-base-foreground-placeholder-color` | `--hds-form-control-foreground-color-default` |
+| `--token-form-control-base-foreground-value-color`       | `--hds-form-control-foreground-color-default` |
```

---

## 3. Root cause — why each step went wrong

### 3.1 The fuzzy match had no correct option to pick

By 08-25 the post source had `form-control-base-placeholder-foreground-color-default` and
`…-disabled`. That broke every high-confidence signal:

- **S0**: `--hds-form-control-base-foreground-placeholder-color` doesn't exist in post.
- **S1**: the changeset row pointed to `--hds-form-control-base-placeholder-foreground-color`, which
  no longer existed after the split, so the chain endpoint wasn't in post.
- **S2**: requires an *equal* segment multiset. The extra `default` segment breaks it.

So S3 ran. It only scores names, not meaning, and the wrong candidate won. Reproduced scores against
`form-control-base-foreground-placeholder-color`:

| Candidate | Score |
|---|---|
| `form-control-base-foreground-color` | **0.7957** (picked) |
| `form-control-base-placeholder-foreground-color-default` | 0.7291 |
| `form-control-base-placeholder-foreground-color-disabled` | 0.7252 |

### 3.2 Nothing caught the duplicate target

- `…foreground-placeholder-color` sorts before `…foreground-value-color`, so S3 claimed
  `--hds-form-control-base-foreground-color` first.
- `…value-color` then resolved to the *same* target via S1. S1 doesn't check `usedAfter`.
- No check anywhere reports two `before` mapping to one `after`.

### 3.3 The guess was turned into "high confidence"

- After each run, the map was copied into the changeset table.
- On the next run, Phase A read that table as S1.
- The 08-25 S3 guess therefore re-appeared on 09-15 as S1 "high confidence". By the 09-15 run the
  report had **zero S3 rows**. Every earlier fuzzy guess had been turned into a changeset-backed
  mapping, and the "review-only" signal was lost.

S3 rows per run (from each run's `token-diff.md`):

- **07-17 (`ed85fb0ec8`)**:
  - `tabs-indicator-transition-function`, `tooltip-transition-function` (fine)
  - `app-header-home-link-size` (**wrong**)
  - `app-side-nav-body-list-item-content-spacing-horizontal` (**wrong**)
  - `app-side-nav-body-list-item-spacing-vertical` (**wrong**)
  - `app-side-nav-color-surface-primary` (fine)
  - `form-control-base-foreground-value-color` (fine)
- **08-25 (`d2c67b100b`)**:
  - `form-radiocard-*` ×5 (fine)
  - `form-control-base-foreground-placeholder-color` (**wrong**)
  - `form-control-padding` (lossy, see §4.3)
  - `form-text-input-background-image-data-url-search` (**wrong**)
- **09-15 (`e23459e3d3`)**: none. All of the above now report as S1.

### 3.4 The final-QA work explained the duplicate away

In #4145 (branch `project-solar/phase-1-follow-up/address-final-qa-findings__TOOLING`) the many-to-one
entries *were* noticed, but they were described as intentional "merges":

- `final-qa-tokens-renaming/PLAN-PART-1.md`, line 97:
  > The first two rows are a **merge**: both collapse onto `--hds-form-control-base-foreground-color`.
- `final-qa-tokens-renaming/PLAN-PART-2.md`, lines 233–241:
  > `+default −base,placeholder` | 1 | merge … `+default −base,value` | 1 | merge …
  > The last two rows are a **merge** onto one final name; a consumer cannot do a mechanical 1:1 swap.
  > There are 4 such merges in the whole map (2 form, 2 `app-side-nav`) — a cross-cutting footnote …

This is where the current README wording comes from: *"two tokens merged into one"*, in the
`prefix-plus-renaming__form-elements` description. The "merge" label went into the docs and nobody
checked whether it was right.

---

## 4. Other affected entries

### 4.1 Method

I checked the whole current map three ways:

1. **Many-to-one targets.** Any `after` reached by more than one `before`.
2. **Pre vs post values.** For every mapping, resolve the pre token's value (from pre-carbonization
   `tokens.css`, commit `21f84ccadc`, the parent of the #4035 merge) and the post token's value
   (current `packages/tokens/dist/products/css/tokens.css`), and compare them.
3. **Hand-migrated components as ground truth.** The HDS components were migrated by hand, so they
   show what each pre token was actually replaced with. For every file under
   `packages/components/src`, `showcase/app`, `website/app` and `website/docs`, I applied the map to
   the pre-carbonization version, line-diffed the result against `main`, and listed every place where
   the map's token differs from the token actually used.
   - I filtered to cases where the mapped token and the actual token are in the **same component
     namespace**. This removes the many legitimate "semantic token → new component-specific token"
     refactors (e.g. `border-color-primary` → `accordion-item-border-color`).
   - I repeated it for `removed` entries, to see what the hand migration used where the map has no
     successor.

#### Many-to-one targets found

```
--hds-form-control-foreground-color-default            <= form-control-base-foreground-placeholder-color, form-control-base-foreground-value-color
--hds-form-text-input-background-image-data-url-search-cancel <= form-text-input-background-image-data-url-search-cancel, form-text-input-background-image-data-url-search
--hds-app-side-nav-body-list-margin-vertical           <= app-side-nav-body-list-margin-vertical, app-side-nav-body-list-item-spacing-vertical
--hds-app-side-nav-body-list-item-padding-horizontal   <= app-side-nav-body-list-item-padding-horizontal, app-side-nav-body-list-item-content-spacing-horizontal
```

Each of the four has exactly one wrong member. The other member is a correct `prefix-only` entry.

#### Value mismatches found (16)

- 11 × SVG `data-url` tokens (checkbox, radio, select, toggle): cosmetic reformatting, same `fill`
  colour. **Not an error.**
- `form-radio-background-image-size` 12px → 16px: the radio SVG's `viewBox` changed to 16. **Intentional.**
- `app-side-nav-body-list-margin-vertical` 24px → 16px: prefix-only. **Intentional design change.**
- `form-control-base-foreground-placeholder-color` `#656a76` → `#0c0c0e`. **Wrong.**
- `form-text-input-background-image-data-url-search` → `…search-cancel` (different icon). **Wrong.**
- `app-header-home-link-size` 36px → 28px. **Wrong** (see below).
- `app-side-nav-body-list-item-spacing-vertical` 2px → 16px. **Wrong.**

### 4.2 Confirmed mis-mappings

| Map line | `before` | Current category | Map says | Should be (already in `added`) | Origin |
|---|---|---|---|---|---|
| 1602 | `--token-form-control-base-foreground-placeholder-color` | `__form-elements` | `--hds-form-control-foreground-color-default` | `--hds-form-control-placeholder-foreground-color-default` | S3 on 08-25 |
| 1674 | `--token-form-text-input-background-image-data-url-search` | `__form-elements` | `--hds-form-text-input-background-image-data-url-search-cancel` (a different icon) | `--hds-form-text-input-background-image-data-url-search-default` | S3 on 08-25 |
| 1692 | `--token-app-side-nav-body-list-item-spacing-vertical` (2px) | `__other` | `--hds-app-side-nav-body-list-margin-vertical` (16px) | `--hds-app-side-nav-body-list-item-margin-top` (2px) | S3 on 07-17 |
| 1688 | `--token-app-side-nav-body-list-item-content-spacing-horizontal` (8px) | `__other` | `--hds-app-side-nav-body-list-item-padding-horizontal` | `--hds-app-side-nav-body-list-item-content-gap` (8px) | S3 on 07-17. Both are 8px, so a value check misses it. |
| 1684 | `--token-app-header-home-link-size` (36px, not used in components) | `__other` | `--hds-app-header-home-link-logo-size` (28px) | probably `removed` (`after: null`) | S3 on 07-17. It took `logo-size`'s target (see §4.3). |

Evidence from the hand migration of the components (pre-carbonization → `main`):

| File | Pre | Post (actual) |
|---|---|---|
| `form/text-input.scss`, `form/textarea.scss`, `form/super-select.scss` ×2, `design-system-power-select-overrides.scss` | `color: var(--token-form-control-base-foreground-placeholder-color)` | `color: var(--hds-form-control-placeholder-foreground-color-default)` |
| `form/text-input.scss`, `form/super-select.scss` | `background-image: var(--token-form-text-input-background-image-data-url-search)` | `background-image: var(--hds-form-text-input-background-image-data-url-search-default)` |
| `app-side-nav/content.scss` | `margin-top: var(--token-app-side-nav-body-list-item-spacing-vertical)` | `margin-top: var(--hds-app-side-nav-body-list-item-margin-top)` |
| `app-side-nav/content.scss` | `gap: var(--token-app-side-nav-body-list-item-content-spacing-horizontal)` | `gap: var(--hds-app-side-nav-body-list-item-content-gap)` |
| `app-header.scss` (`svg` width/height) | `var(--token-app-header-logo-size)` | `var(--hds-app-header-home-link-logo-size)` |

The two 07-17 app-side-nav errors happened even though the correct targets
(`--hds-app-side-nav-body-list-item-margin-top`, `…-item-content-gap`) **already existed at the 07-17
run** and were sitting in `added`. So this isn't only about tokens appearing later: S3 had the right
answer available and still picked wrong.

Similarly, `--hds-form-text-input-background-image-data-url-search-default` existed in the 08-25 run
and stayed in `added`.

### 4.3 Missed mappings (marked `removed` but have a clear successor)

| Map line | `before` | Value | Hand migration uses | Confidence |
|---|---|---|---|---|
| 1702 | `--token-app-header-logo-size` | 28px | `--hds-app-header-home-link-logo-size` (28px) for the `svg` width/height in `app-header.scss` | **Confirmed.** The other half of the `home-link-size` mix-up. `home-link-size` sorts before `logo-size`, so S3 (greedy, first-come) gave the target away and `logo-size` ended up with nothing. |
| 1742 | `--token-form-control-base-surface-color-hover` | `#f1f2f3` | `--hds-form-control-boolean-surface-color-unchecked-hover` (same value) in `form/checkbox.scss` and `form/radio.scss` | **Likely.** `form/super-select.scss:478` also used the old token, for a non-boolean context. |

The other `removed` entries (`app-side-nav-color-foreground-*`, `app-side-nav-color-surface-interactive-*`,
`tooltip-color-*`, `form-radiocard-border-radius`, …) map to **different successors depending on
usage**. For example, `app-side-nav-color-foreground-primary` became both `--hds-foreground-color-primary`
and `--hds-app-side-nav-body-list-item-foreground-color-default`. Leaving them as `removed` is defensible.

### 4.4 Lossy, but correct in the default theme

A one-to-one map can't express these splits. Values are identical in the default theme, so they're
not wrong, just lossy:

- `--token-form-control-padding` (line 1650) maps to `--hds-form-control-padding-vertical`. The
  components also use `--hds-form-control-padding-horizontal` in 5 places. Both are 7px.
- `--token-form-control-base-border-color-*` / `…-surface-color-*` / `…disabled-*` map to the
  text-input `form-control-*` tokens. Checkbox and radio now use the new
  `--hds-form-control-boolean-*-unchecked-*` tokens instead. Same values by default, but they may
  diverge in the `cds-*` themes.

### 4.5 Not mapping errors

The rest of the ground-truth differences (~160) are components switching from semantic tokens to new
component-specific tokens. Examples: `border-color-primary` → `accordion-item-border-color`,
`core-color-blue-300` → `form-radio-card-border-color-checked-default`. For consumers, the semantic
target in the map is still the correct one-to-one replacement.

---

## 5. Where the wrong rows are published

All rows shipped in the tokens `6.0.0` release notes.

[`packages/tokens/CHANGELOG.md`](../../../../packages/tokens/CHANGELOG.md):

| Line | Row |
|---|---|
| 423 | `--token-form-control-base-foreground-placeholder-color` → `--hds-form-control-foreground-color-default` |
| 424 | `--token-form-control-base-foreground-value-color` → `--hds-form-control-foreground-color-default` (correct, but part of the "merge") |
| 441 | `--token-form-text-input-background-image-data-url-search` → `--hds-form-text-input-background-image-data-url-search-cancel` |
| 443 | `--token-app-header-home-link-size` → `--hds-app-header-home-link-logo-size` |
| 444 | `--token-app-side-nav-body-list-item-content-spacing-horizontal` → `--hds-app-side-nav-body-list-item-padding-horizontal` |
| 445 | `--token-app-side-nav-body-list-item-spacing-vertical` → `--hds-app-side-nav-body-list-margin-vertical` |
| 1091 | `--token-app-header-logo-size` listed as removed |
| 1101 | `--token-form-control-base-surface-color-hover` listed as removed |

[`website/docs/whats-new/release-notes/partials/design-tokens.md`](../../../../website/docs/whats-new/release-notes/partials/design-tokens.md):
the same rows at lines 435, 436, 453, 455, 456, 457, 1103 and 1113.

`packages/mcp/docs-catalog.json` is generated from the website docs, so it carries the same content.
It needs regenerating after any docs fix.

---

## 6. What I'd suggest

### Fixes

- Fix the map rows in
  [`token-map.generated.json`](./tooling/reports/hds/token-map.generated.json):
  - line 1602: `after` → `--hds-form-control-placeholder-foreground-color-default`. Remove that
    token from `added`.
  - line 1674: `after` → `--hds-form-text-input-background-image-data-url-search-default`. Remove it
    from `added`.
  - line 1692: `after` → `--hds-app-side-nav-body-list-item-margin-top`. Remove it from `added`.
  - line 1688: `after` → `--hds-app-side-nav-body-list-item-content-gap`. Remove it from `added`.
  - line 1684: `--token-app-header-home-link-size` → move to `removed` (`after: null`).
  - line 1702: `--token-app-header-logo-size` → `after: --hds-app-header-home-link-logo-size`. Move it
    out of `removed`.
  - (optional, line 1742) `--token-form-control-base-surface-color-hover` →
    `--hds-form-control-boolean-surface-color-unchecked-hover`.
- Re-categorise the fixed rows where needed. For example, the placeholder row is no longer a "merge".
  Update the `__form-elements` description in the README that mentions *"two tokens merged into one"*.
- Fix the matching rows in `packages/tokens/CHANGELOG.md` and the website release notes, then
  regenerate the MCP docs catalog.
- Re-run Phase B (dry-run) against a `main` worktree to confirm the migration output.

### Guard checks for the tooling

- **Fail on duplicate `after` targets** unless they're explicitly allow-listed.
- **Don't read back changeset rows that were generated from the map itself.** At minimum, carry S3
  provenance through as "low confidence" so a fuzzy guess can't become S1 on the next run.
- Make **S1 respect `usedAfter`**, or at least report when an S1 result collides with an earlier
  resolution.
- Add a **value-equality check** (pre value vs post value in the default theme) and a
  **ground-truth check** against the hand-migrated HDS components. Both are cheap and would have
  caught most of these.

---

## 7. Resolution (applied 2026-10-19)

### 7.1 Corrected rows

All the fixes from §6, including the optional row 7, were applied to the canonical map
[`../tooling/token-map.json`](../tooling/token-map.json). The as-shipped map is kept unchanged at
[`./tooling/reports/hds/token-map.generated.json`](./tooling/reports/hds/token-map.generated.json).

| # | `before` | As shipped in 6.0.0 | Corrected | Category change |
|---|---|---|---|---|
| 1 | `--token-form-control-base-foreground-placeholder-color` | `--hds-form-control-foreground-color-default` | `--hds-form-control-placeholder-foreground-color-default` | — (`__form-elements`) |
| 2 | `--token-form-text-input-background-image-data-url-search` | `--hds-form-text-input-background-image-data-url-search-cancel` | `--hds-form-text-input-background-image-data-url-search-default` | — (`__form-elements`) |
| 3 | `--token-app-side-nav-body-list-item-spacing-vertical` | `--hds-app-side-nav-body-list-margin-vertical` | `--hds-app-side-nav-body-list-item-margin-top` | — (`__other`) |
| 4 | `--token-app-side-nav-body-list-item-content-spacing-horizontal` | `--hds-app-side-nav-body-list-item-padding-horizontal` | `--hds-app-side-nav-body-list-item-content-gap` | — (`__other`) |
| 5 | `--token-app-header-home-link-size` | `--hds-app-header-home-link-logo-size` | `null` (no successor) | `__other` → `removed` |
| 6 | `--token-app-header-logo-size` | `null` (listed as removed) | `--hds-app-header-home-link-logo-size` | `removed` → `__other` |
| 7 | `--token-form-control-base-surface-color-hover` | `null` (listed as removed) | `--hds-form-control-boolean-surface-color-unchecked-hover` | `removed` → `__form-elements` |

- The 5 newly targeted tokens (rows 1–4 and 7) were removed from `added`.
- Category counts:
  - `__form-elements` 22 → 23;
  - `removed` 22 → 21;
  - `added` 630 → 625;
  - all others unchanged.
- Row 7 was "likely" in §4.3; it's now confirmed. The `super-select.scss` usage is also an
  unchecked-checkbox hover, and on `main` it uses the same new token as checkbox and radio.

### 7.2 Validation of the corrected map

The guard checks from §6 were **not** implemented as code, because the map generator is retired.
The equivalent checks were run once on the corrected map:

- pre token set = `packages/tokens/dist/products/css/tokens.css` at `21f84ccadc` (tokens 5.x);
- post token set = the same file on `main` (tokens 6.x);
- values compared after resolving `var()` aliases, in the default theme.

| Check | Result |
|---|---|
| Duplicate `before` | 0 |
| Duplicate `after` (many-to-one) | 0 |
| Pre tokens covered exactly once | 442 / 442 |
| Post tokens covered exactly once | 1046 / 1046 |
| `after` not existing in the post set | 0 |
| Value differences (pre vs post) | 12, all intentional (below) |

Intentional value differences:

- 10 × `--token-form-{checkbox,radio,select,toggle}-background-image-data-url*`: SVG markup
  reformatted (same icon, same `fill` colour).
- `--token-form-radio-background-image-size` 12px → 16px (radio SVG `viewBox` changed to 16).
- `--token-app-side-nav-body-list-margin-vertical` 24px → 16px (design change).

The 4 value mismatches flagged in §4.1 for rows 1–4 are gone: each corrected row now has identical
values before and after.

Dry-run of the migration script with the corrected map against a worktree of `21f84ccadc`:

- 1150 replacements, 0 stale names remaining.
- Each of the 6 corrected `before` tokens with usages in that source was rewritten to its corrected
  target (15 usages in total). Row 5's token has no usages there.

### 7.3 Where the fixes were applied

- **Map:** `../tooling/token-map.json` (with a `$meta` header marking it canonical).
- **`packages/tokens/CHANGELOG.md`, `## 6.0.0`:** "Renamed tokens", "Added tokens" and "Removed
  tokens" tables regenerated from the corrected map. The diff was exactly the expected rows, which
  confirms the tables otherwise mirrored the map.
- **`website/docs/whats-new/release-notes/partials/design-tokens.md`:** regenerated from the CHANGELOG
  (`pnpm -F website generate-changelog-markdown-files`).
- **`packages/mcp/docs-catalog.json`:** no change needed. Release-notes partials aren't indexed, and the
  catalog contained none of the wrong rows.
- **Not changeable:** the CHANGELOG inside the already-published `6.0.0` npm tarball still contains
  the original rows.
- **Consumers:** the Atlas migration ([hashicorp/atlas#32035](https://github.com/hashicorp/atlas/pull/32035))
  was run with the corrected map, so it isn't affected.
