# Final QA — HDS design-token renaming (generation 2)

> **Status:** Part 1 ✅ **done and committed** (`5e3803a907`). Part 2 ✅ **ready to execute** —
> all preconditions met, rehearsed green end to end. See [`PLAN-PART-2.md`](./PLAN-PART-2.md).
> **Branch:** `project-solar/phase-1-follow-up/address-final-qa-findings__TOOLING`

---

## 1. Why this exists

The carbonization effort renames the design-token set **twice**, but only the *result* may ship:

- **Generation 1** (done, unshipped) — `--token-*` → `--hds-*`, with structural renames on top of the
  prefix swap. Captured in
  [`token-map.generated.json`](../full-tokens-replacement/tooling/reports/hds/token-map.generated.json)
  and described in [`carbonization-design-tokens.md`](../../../.changeset/carbonization-design-tokens.md).
  Tooling shipped in [#4036](https://github.com/hashicorp/design-system/pull/4036).
- **Generation 2** (this folder) — a final-QA wave that renames, adds and deletes tokens *again*,
  entirely within the `--hds-*` namespace.

Because generation 1 has not shipped, generation 2 must be **folded into it**, so the repository looks
as if a single renaming happened at a single point in time. Nothing is appended; artifacts are
*rewritten*.

### 1.1 The two maps — read this before anything else

One token has **three** names. This is the single most confusing thing about the project, and every
script below exists because of it:

```
--token-form-control-base-border-color-default     ① released on main — what consumers use TODAY
   ↓  generation 1  (done, never shipped)
--hds-form-control-base-border-color-default       ② intermediate — exists only on this branch
   ↓  generation 2  (../tokens-qa/token-changes.md)
--hds-form-control-border-color-default            ③ FINAL
```

Two maps describe two different arrows, and they are **not** interchangeable:

| | **generation-2 map** | **shipping map** |
| --- | --- | --- |
| Arrow | ② → ③ | ① → ③ |
| File | `tooling/reports/token-changes.generated.json` | `full-tokens-replacement/…/token-map.generated.json` |
| Built by | `build-token-changes.mjs` (Part 2 §2) | `update-token-map.mjs` (Part 2 §3) |
| `before` namespace | `--hds-*` | `--token-*` |
| Answers | *"what did we rename this week?"* | *"what must a consumer app upgrade to?"* |
| Used for | in-repo fixes — consumer SCSS (Part 2 §5), changeset table cells (Part 2 §4) | **what ships** — downstream teams and codemods |

`update-token-map.mjs` discovers nothing new. It takes the existing generation-1 map and **rewrites
its right-hand column**, replacing ② with ③ — collapsing a two-step chain into the one-step shortcut
① → ③.

**That collapse is the entire point of the project.** A consumer upgrading from the released version
must never learn that ② existed. They see one rename, not two.

### 1.2 Two parts

The work splits into two independent changes, reviewed and landed separately. They are different
*kinds* of change and mixing them makes both harder to check.

| | **Part 1 — taxonomy** | **Part 2 — generation 2** |
| --- | --- | --- |
| Changes | which category each entry sits in | the `after` names themselves |
| Touches `(before, after)` pairs | **no — none** | yes |
| Depends on `token-changes.md` | no | yes |
| Changeset impact | **none** (see below) | tables + bullets rewritten |
| Entry count | 1068 → 1068 | 1068 → 1073 |

**Part 1 is changeset-neutral by construction.** The changeset's tables are flat — `| --token-X |
--hds-Y |` — and carry no category information. Moving entries between JSON keys alters no pair, so
the changeset stays correct without being touched. That is Part 1's acceptance gate: *the multiset of
`(before, after)` pairs must be identical before and after.*

### 1.3 Derivation chain — what depends on what

```
token-map.generated.json                          generation-1 map ① → ②
        │  PART 1 — recategorise only              PLAN-PART-1.md
        ▼
token-map.generated.json                          same pairs, better categories

../tokens-qa/token-changes.md                     human-authored
        │  build-token-changes.mjs                 PART-2 §2
        ▼
token-changes.generated.json                      generation-2 map  ② → ③
        │  PART 2 — update-token-map.mjs           PART-2 §3
        ▼
token-map.generated.json                          SHIPPING MAP ① → ③   ← source of truth
        │  update-changeset.mjs                    PART-2 §4
        ▼
.changeset/carbonization-design-tokens.md         human rendering of the shipping map
```

The order is **not** a convention — it is a data dependency, and each step enforces it:

| Step | Refuses to run when |
| --- | --- |
| Part 2 §3 | the shipping map has already been updated (would duplicate entries) |
| Part 2 §4 | the shipping map has *not* been updated yet, or disagrees with it (gate **C0**) |

Consumer migration (Part 2 §5) hangs off the generation-2 map, not the shipping map, so it can run
any time after the map is built.

---

## 2. The idea the whole thing rests on

**A CSS custom-property name is a pure function of its JSON path in `packages/tokens/src`.**

```
leaf     = any JSON object containing a "$value" key   (never recurse into one)
skip if  = leaf.private === true || leaf.private === "true"
css name = "--hds-" + leaf.jsonPath.join("-")
```

Verified 1:1 against `packages/tokens/dist/products/css/tokens.css`. Consequences:

- **No build is required** to know the token inventory. `dist/` is never read.
- This derivation is the **validator** for everything below. It is not an inference engine — we do
  not guess the mapping, we are given it (§3).

Throughout, **`canonical`** means this derived set. It currently holds **1045** tokens.

---

## 3. Source of truth

[`../tokens-qa/token-changes.md`](../tokens-qa/token-changes.md) — human-authored, owned by the
colleagues doing the renaming. Three sections: changed / new / removed. Names are written **bare**
(no `--hds-` prefix).

`tooling/build-token-changes.mjs` parses it into `tooling/reports/token-changes.generated.json`, which is the
**only** input every downstream script reads:

```jsonc
{
  "meta": {
    "source": "ai-plans/project-solar-carbonization/tokens-qa/token-changes.md",
    "sourceSha256": "…",        // staleness detection
    "canonicalCount": 1045,
    "validated": true,          // Part 2 §2.1
    "counts": { "renamed": 34, "removed": 5, "added": 6 }
  },
  "renamed": [{ "before": "--hds-form-control-base-border-color-default",
                "after":  "--hds-form-control-border-color-default" }],
  "removed": [{ "before": "--hds-form-toggle-border-radius", "after": null }],
  "added":   [{ "before": null, "after": "--hds-form-label-inline-typography-line-height" }]
}
```

**Three groups, nothing else: `renamed` / `removed` / `added`.**

Each *entry* is a plain `{ before, after }` pair — the same entry shape generation 1 already uses.
That is what lets [`migrate-tokens.mjs`](../full-tokens-replacement/tooling/migrate-tokens.mjs)
consume this map with **no code change**: it flattens every array it finds and reads only
`before`/`after`, ignoring key names entirely.

```js
// migrate-tokens.mjs — loadMap()
for (const entries of Object.values(map)) {
  if (!Array.isArray(entries)) continue;   // ← also why a `meta` key is harmless
  for (const entry of entries) { … entry.before … entry.after … }
}
```

> **Careful — "shape" means two different things here.** The *entry* shape (`{ before, after }`) is
> unchanged everywhere. The *grouping* — the top-level keys — differs between the two maps: the
> generation-2 map uses these three groups, while the shipping map keeps descriptive **categories**
> (Part 1). The snippet above is why neither choice affects `migrate-tokens.mjs`.

> **When the markdown changes, re-run `build-token-changes.mjs` and nothing else changes.** That is the whole
> point of this design. Every other script reads the JSON.

Every script refuses to run against a map whose `meta.sourceSha256` no longer matches the live
markdown. Pass `--force` to override.

---

## 4. The two parts

Detailed, executable plans live in their own files. This file is the shared context they both assume.

| | [`PLAN-PART-1.md`](./PLAN-PART-1.md) | [`PLAN-PART-2.md`](./PLAN-PART-2.md) |
| --- | --- | --- |
| Does | recategorises the generation-1 map | applies the generation-2 renaming |
| Changes `(before, after)` pairs | **no — none** | yes |
| Needs `token-changes.md` final | no | **yes** |
| Changeset impact | **none** | tables + bullets rewritten |
| Entries | 1068 → 1068 | 1068 → 1073 |
| Status | ✅ **done** (`5e3803a907`) | ✅ **ready to execute** — no blockers |

**Part 1 is changeset-neutral by construction**, so it can land and be reviewed on its own. Part 2
must not begin until Part 1 is reviewed.

---

## 5. Hard rules (both parts)

1. **Do not run linters, formatters or test suites.** Out of scope; the maintainer's responsibility.
2. **Do not regenerate build output.** `packages/tokens/dist/**`,
   `showcase/public/assets/styles/@hashicorp/**` and `packages/mcp/docs-catalog.json` are *verified*
   and a mismatch is *reported*, never fixed here.
3. **Do not commit.** Leave changes in the working tree for human review.
4. **Do not edit `packages/tokens/src/**`** — owned by the colleagues; the tooling only *reads* it.
5. **Do not edit historical records:** `packages/*/CHANGELOG.md`, `website/docs/**/version-history/**`.
6. All reports go under `tooling/reports/`.

---

---

## 6. Layout

```
final-qa-tokens-renaming/
├── PLAN.md                                    # this file — shared context
├── PLAN-PART-1.md                             # taxonomy — ✅ done
├── PLAN-PART-2.md                             # generation 2 — ready to execute
└── tooling/
    ├── recategorise-token-map.mjs             # PART 1 — categories only, no pair changes
    ├── build-token-changes.mjs                # markdown → token-changes.generated.json
    ├── update-token-map.mjs                   # PART 2 — → …/token-map.generated.json
    ├── update-changeset.mjs                   # → .changeset/carbonization-design-tokens.md
    ├── lib/shared.mjs                         # canonical derivation, map loading, helpers
    ├── config/
    │   ├── migrate.hds-gen2.dry.config.json
    │   └── migrate.hds-gen2.apply.config.json
    └── reports/                               # all generated output
        ├── token-changes.generated.json       # ★ the generation-2 map
        ├── recategorisation.md                # PART 1 report
        ├── build-token-changes.md
        ├── token-map-update.md
        ├── changeset-update.md
        └── token-migration.{md,json}          # written by migrate-tokens.mjs
```

**Naming convention:** each script is named `<verb>-<the artifact it writes>`. Two *different* JSON
maps are in play and they are easy to confuse, so the names disambiguate them:

| Script | Writes | Which map |
| --- | --- | --- |
| `recategorise-token-map.mjs` | `token-map.generated.json` | shipping — categories only |
| `build-token-changes.mjs` | `token-changes.generated.json` | generation 2 — `--hds-old` → `--hds-new` |
| `update-token-map.mjs` | `token-map.generated.json` | shipping — `--token-*` → final `--hds-*` |
| `update-changeset.mjs` | `carbonization-design-tokens.md` | — |
