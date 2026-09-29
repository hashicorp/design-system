# PART 1 — Taxonomy reorganisation of the generation-1 token map

> **Status:** ✅ **DONE** — executed and committed as `5e3803a907` (report `e39ddfc266`).
> All 8 gates passed; pair multiset verified identical by checksum before and after.
> Kept as the record of what was done and why. Independent of `tokens-qa/token-changes.md`.
> **Read [`PLAN.md`](./PLAN.md) §1 first** — especially §1.1 (the ①②③ naming) and §1.2 (the split).
> **Part 2:** [`PLAN-PART-2.md`](./PLAN-PART-2.md) — do not start it until this part is reviewed.

**Goal:** improve the category structure of
[`token-map.generated.json`](../full-tokens-replacement/tooling/reports/hds/token-map.generated.json)
**without changing a single `(before, after)` pair.**

**Why it can ship alone:** the changeset renders flat tables (`| --token-X | --hds-Y |`) and carries
no category information. If no pair changes, the changeset — and every other downstream artifact —
stays correct untouched. That is gate **T1**, and it is the whole contract of this part.

This work is *not* caused by the final-QA renaming. It could have been done at any point since
[#4036](https://github.com/hashicorp/design-system/pull/4036). It is done first so that Part 2's diff
contains only genuine generation-2 changes.

---

## 1. Why the categories matter at all

The category is the only machine-readable record of **what kind of rename** each token underwent. It
is also the structure the changeset's intro bullets already follow — *"the 'core' color token
namespace"*, *"the `form-radiocard` token namespace"* — so it is what any future per-family
sub-section of the changeset would be built from.

It cannot be recovered once discarded. Re-running Phase A (`diff-tokens.mjs`) after Part 2 would
re-derive categories from the *post*-generation-2 names and produce different, wrong answers —
verified: entries that are legitimately `prefix-only` today fall through to `__other` once their
final name differs.

One category is **machine-actionable** and must stay exact:

> `prefix-only` means *"swap `--token-` for `--hds-` and you are done."*

228 entries rely on that guarantee today. Nothing in this part weakens it.

---

## 2. The changes

Exactly **9 entries** move. No pair is edited.

| Category | Before | After | Change |
| --- | ---: | ---: | --- |
| `prefix-plus-renaming__form-elements` | — | **9** | **new** |
| `prefix-plus-renaming__form-control-checked` | 5 | **0** | dissolved → `__form-elements` |
| `prefix-plus-renaming__other` | 8 | **4** | its 4 `form-*` entries → `__form-elements` |
| *all others* | | *unchanged* | |
| **Total** | **1068** | **1068** | **invariant** |

### 2.1 Dissolve `prefix-plus-renaming__form-control-checked` (5 entries)

```
--token-form-control-checked-border-color-default   → --hds-form-control-border-color-checked-default
--token-form-control-checked-border-color-hover     → --hds-form-control-border-color-checked-hover
--token-form-control-checked-foreground-color       → --hds-form-control-foreground-color-checked
--token-form-control-checked-surface-color-default  → --hds-form-control-surface-color-checked-default
--token-form-control-checked-surface-color-hover    → --hds-form-control-surface-color-checked-hover
```

**Rationale — taxonomy only.** Its rule is still *correct* today; it is simply too narrow to earn a
top-level category: 5 entries, and — unlike every other `prefix-plus-renaming__*` category — it has
**no dedicated bullet** in the changeset intro. (Verified: 9 rename categories, 7 bullets;
`form-control-checked` and `transition-function` are the two without one.) Folding it into the broader
form bucket loses no narrative.

> Part 2 will independently invalidate this category — all 5 entries are retargeted by generation 2,
> each gaining a `boolean` segment. But that is **not** the justification used here, because it would
> not be true yet at the time this part runs.

### 2.2 Move the 4 `form-*` entries out of `prefix-plus-renaming__other`

```
--token-form-control-base-foreground-placeholder-color    → --hds-form-control-base-foreground-color
--token-form-control-base-foreground-value-color          → --hds-form-control-base-foreground-color
--token-form-control-padding                              → --hds-form-control-padding-vertical
--token-form-text-input-background-image-data-url-search  → --hds-form-text-input-…-search-cancel
```

All four are form renames with no systematic rule — exactly what `__form-elements` is for. Moving them
leaves `__other` as a clean **non-form** remainder:

```
--token-app-header-home-link-size
--token-app-side-nav-body-list-item-content-spacing-horizontal
--token-app-side-nav-body-list-item-spacing-vertical
--token-app-side-nav-color-surface-primary
```

The category is defined by **namespace** (`form-*`), not by whether generation 2 touches it — two of
these four are untouched by generation 2 and still belong here.

> The first two rows are a **merge**: both collapse onto `--hds-form-control-base-foreground-color`.
> Duplicate `after` values are legitimate and must be preserved.

---

## 3. What deliberately does NOT move

| | Count | Why |
| --- | ---: | --- |
| `prefix-plus-renaming__form-radio-card` | 5 | Single mechanically-verifiable rule — `form-radiocard-{rest}` → `form-radio-card-{rest}`, confirmed by reconstruction for **every** member — **and its own changeset bullet**. A coherent named family, not "form stuff". |
| `form-*` entries in `prefix-only` | 13 | **Genuinely prefix-only today.** `--token-form-control-disabled-border-color` → `--hds-form-control-disabled-border-color` is a pure prefix swap. Only generation 2 makes that false, so they move in Part 2. Moving them now would make the map *wrong*. |
| colors, focus-ring, transition-function, removed, added | | Out of scope. This part touches form categories only. |

---

## 4. Tooling

`tooling/recategorise-token-map.mjs` — dependency-free ESM.

| Flag | Default |
| --- | --- |
| `--map <path>` | `../../full-tokens-replacement/tooling/reports/hds/token-map.generated.json` |
| `--report <path>` | `./reports/recategorisation.md` |
| `--dry-run` | off — **always run this first** |

Behaviour:

- Reads the map, moves the 9 entries **by identity** (`before`+`after`), writes it back.
- Emits the categories in a fixed order so re-runs are byte-stable.
- **Idempotent**: running it twice produces a byte-identical file. It detects entries already in
  `__form-elements` and does not move them again.
- Refuses to write if any gate fails, unless `--force`.

The rule for what belongs in `__form-elements` must be expressed as an **explicit list of the 9
entries**, not a `/form/` regex. A regex would silently capture `form-radio-card` too. The script
asserts it moved exactly 9 and exactly the expected ones.

---

## 5. Gates

| # | Gate | Rule | On failure |
| --- | --- | --- | --- |
| **T1** | **Pair conservation** | the multiset of `(before, after)` pairs is **identical** before and after | abort — the contract of this part |
| **T2** | Entry conservation | total entry count unchanged: 1068 → 1068 | abort |
| **T3** | Exactly one category each | no entry duplicated or orphaned | abort |
| **T4** | `prefix-only` untouched | still 228 members, all still true prefix swaps | abort |
| **T5** | Expected membership | `__form-elements` = 9; `__form-control-checked` = 0; `__other` = 4 and contains **no** `form-*` entry | abort |
| **T6** | `form-radio-card` intact | still 5, and its documented rule still reconstructs every member | abort |
| **T7** | Changeset untouched | `git status` shows no change under `.changeset/**` | abort |
| **T8** | Idempotence | a second run produces a byte-identical file and reports 0 moves | abort |
| **T9** | No stray edits | `git status` shows changes only to `token-map.generated.json` and `final-qa-tokens-renaming/tooling/reports/**` | revert |

T1 is the one that makes this part safe to land alone: **if no pair changed, nothing downstream can
be stale.**

---

## 6. Documentation to update in this part

| File | Change |
| --- | --- |
| `full-tokens-replacement/tooling/README.md` | Category bullet list: remove `__form-control-checked`, add `__form-elements`, amend the `__other` line to say *non-form* leftovers |
| `full-tokens-replacement/tooling/diff-tokens.mjs` | `CATEGORY_ORDER` + `classify()` — see the caveat below |
| `HANDOVER-full-tokens-replacement.md` §2 | Map-schema table: same category edit, re-check the arithmetic line |

### 6.1 Caveat on `diff-tokens.mjs`

Phase A is a **spent one-off**. It inferred the generation-1 mapping from a git diff and cannot be
meaningfully re-run — it reads the post token set from `packages/tokens/dist`, which is stale.

So: update `CATEGORY_ORDER` and the `classify()` predicates for consistency and to keep the README
honest, but add a note stating the map has since been recategorised by hand and that **re-running
Phase A will not reproduce it**. Do not attempt to write a `classify()` predicate that reproduces
`__form-elements` — Part 2 §3 establishes that its members follow 7 different signatures, so no single
predicate exists.

---

## 7. Changeset — deliberately NOT touched

No `.changeset/*.md` file is modified in this part. Gate **T7** enforces it.

The intro bullets remain accurate: `form-control-checked` never had one, and the catch-all bullet
*"Changed 'component-level' tokens' names…"* still covers `__other`, which still exists.

Whether `__form-elements` deserves its own bullet is a **Part 2** decision, because its final
membership (22) and its description both depend on generation 2.

---

## 8. Execution

```bash
cd ai-plans/project-solar-carbonization/final-qa-tokens-renaming/tooling

node recategorise-token-map.mjs --dry-run     # read reports/recategorisation.md
node recategorise-token-map.mjs               # apply
node recategorise-token-map.mjs --dry-run     # T8: must report 0 moves
```

Then review `git diff` on the map: it must show **only** entries relocating between category keys —
no line where a `before` or `after` string changes.

**Preconditions:** rebase onto the parent branch first (see `PLAN.md` §11.1). Part 1 does **not**
require `token-changes.md` to be final.

**No commit by the tooling.** Changes are left in the working tree.

---

## 9. What the agent reports when done

- The 9 moved entries, grouped by origin category.
- The before → after category table, with the 1068 invariant.
- All gate results, T1 first.
- Confirmation that `.changeset/**` is untouched and that no `(before, after)` pair changed.
- The documentation files updated (§6).
- An explicit statement that **Part 2 has not been started**.
