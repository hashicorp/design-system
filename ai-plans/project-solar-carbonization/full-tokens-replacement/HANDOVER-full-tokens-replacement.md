# HANDOVER — HDS Token "Carbonization" Full Replacement

> Purpose: give a **fresh session** everything needed to continue this work without re-discovering context.
> Last updated: 2026-09-15

---

## 0. TL;DR

- Two-phase, dependency-free, config-driven Node tooling migrates CSS design-token **names** from the
  **pre-carbonization** set (`--token-*`, 442 tokens on `main`) to the **post-carbonization** set
  (`--hds-*`, 1046 tokens on the feature branch).
- **Phase A** (`diff-tokens.mjs`) generates the old→new **token map** (`token-map.generated.json`).
  Runs **once**, only in this monorepo. Already built, run, and accepted. **Re-run on 2026-09-15 to pick up
  tokens added after the tooling was first implemented** (see §3).
- **Phase B** (`migrate-tokens.mjs`) applies that map to consumer code + verifies. Reusable core +
  per-repo JSON config. Already built and **validated end-to-end**.
- **Status:**
  - ✅ HDS `main` test-harness: applied, GUI-reviewed, approved, artifacts cleaned up.
  - ✅ Atlas (first real downstream consumer): **dry-run only** — clean, no gaps. No changes written.
  - ⏳ Remaining: real apply on Atlas (and any other downstream repos), `pnpm lint`, maintainer runs tests.
- **The generated map is the source of truth** — there is **no** separate human-confirmation file/step.

---

## 1. Where things live

```
ai-plans/project-solar-carbonization/full-tokens-replacement/
├── generated-plan.md                       # THE durable plan — read this first for full detail
├── HANDOVER-full-tokens-replacement.md     # this file
└── tooling/
    ├── diff-tokens.mjs                      # Phase A — map generator (fixed HDS paths, NO config/args)
    ├── migrate-tokens.mjs                   # Phase B — applier + verification (reusable core, --config only)
    ├── README.md                            # usage/config/workflow
    ├── config/
    │   ├── migrate.hds.config.json          # Phase B — HDS test harness (scans a `main` worktree)
    │   └── migrate.atlas.config.json        # Phase B — Atlas downstream consumer (dryRun:true)
    └── reports/
        ├── hds/                             # Phase A + HDS Phase B outputs
        │   ├── token-map.generated.json     # Phase A output → Phase B input (regenerated each run)
        │   ├── token-diff.md                # Phase A detailed human report
        │   ├── token-migration.md / .json   # HDS Phase B reports
        └── atlas/
            └── token-migration.md / .json   # Atlas Phase B dry-run reports
```

- **Related sibling efforts** (separate, do not conflate): `ai-plans/project-solar-carbonization/hds-tokens-replacement/`
  (`--token-`→`--hds-` prefix swap), `ai-plans/project-solar-carbonization/hds-var-renaming/` (`--hds-`→`--hds-var-`),
  `ai-plans/project-solar-carbonization/hds-tokens-verify/` (auditor `verify-tokens.mjs`, the architectural template reused here).

---

## 2. The big picture (verified facts)

- **Pre = `main`**: 442 custom properties, ALL `--token-*`, zero `--hds-*`.
- **Post = working tree** (branch `project-solar/phase-1-stacked-cherry-picking/XX-Delta`, which contains
  100% of the carbonization work): **1046 props**, ALL `--hds-*`.
- The `--token-` → `--hds-` prefix swap is **universal** = "step 0" of carbonization; so **no token is
  literally unchanged**. The map therefore groups pre tokens by **how** they changed, not by identity.
- Token names read directly from committed CSS — no build needed:
  `git show main:packages/tokens/dist/products/css/tokens.css` vs the working-tree file.
- Only **names** matter; values are ignored throughout.

### Map schema (`token-map.generated.json`)

Flat object; mutually-exclusive **transformation categories** as top-level keys; every child is a uniform
`{ before, after }` pair. Counts from the accepted run:

| Category | Count | Rule |
| --- | ---: | --- |
| `prefix-only` | 228 | only prefix changed: `--token-X` → `--hds-X` |
| `prefix-plus-renaming__palette-colors` | 42 | `color-palette-{hue}-{step}` → `core-color-{hue}-{step}` |
| `prefix-plus-renaming__product-colors` | 86 | `color-{product}-…` → `product-{product}-…-color` |
| `prefix-plus-renaming__semantic-colors` | 46 | `color-{semantic}-{rest}` → `{semantic}-color-{rest}` |
| `prefix-plus-renaming__focus-ring` | 2 | `focus-ring-{variant}-box-shadow` → `focus-ring-box-shadow-{variant}` |
| `prefix-plus-renaming__transition-function` | 2 | `{rest}-transition-function` → `{rest}-transition-timing-function` |
| `prefix-plus-renaming__form-radio-card` | 5 | `form-radiocard-{rest}` → `form-radio-card-{rest}` (hyphen inserted) |
| `prefix-plus-renaming__form-control-checked` | 5 | `form-control-checked-{type}-color-{rest?}` → `form-control-{type}-color-checked-{rest?}` |
| `prefix-plus-renaming__other` | 8 | structural renames with no systematic rule (review each) |
| `removed` | 18 | pre token with no successor → `after: null` |
| `added` | 626 | brand-new post tokens (`before: null`) — reference only, Phase B ignores |

Check: 228+42+86+46+2+2+5+5+8+18 = 442 pre tokens ✓.

Phase B consumes **every** category uniformly: non-null `after` → rename; `after: null` → insert TODO marker;
`before: null` → ignored. So category names are for human legibility only and never affect behavior — adding
or renaming sub-categories never requires editing Phase B.

### Classification is DESCRIPTIVE
A resolved `before`→`after` pair is placed in a family only if it actually fits that family's rule; otherwise
it falls to `__other`. Key predicates in `diff-tokens.mjs`:
- palette: pre `color-palette-` → post `core-color-`
- product: `postBare.startsWith('product-')`
- semantic (`colorReorderExpected`): strip `color-`, tail = `` `${tail[0]}-color-${rest}` ``
- focus-ring (`focusRingReorderExpected`): `/^focus-ring-(.+)-box-shadow$/` → `focus-ring-box-shadow-$1`
- transition-function (`transitionFunctionExpected`): `{rest}-transition-function` → `{rest}-transition-timing-function`
- form-radio-card (`formRadioCardExpected`): `form-radiocard-{rest}` → `form-radio-card-{rest}`
- form-control-checked (`formControlCheckedExpected`): `form-control-checked-{type}-color-{rest?}` → `form-control-{type}-color-checked-{rest?}`

### Signal sources (Phase A inference, priority order)
- **S0** mechanical prefix swap (`--token-`→`--hds-`) — applies to every pre token; 228 land verbatim in post.
- **S1** changeset rename tables/arrows (`.changeset/*.md`) — supports **both** `--hds-*`→`--hds-*` chains
  (old format) and `--token-*`→`--hds-*` direct pairs (e.g. `carbonization-design-tokens.md`). The resolver
  tries the S0 endpoint first, then falls back to the raw pre-name as the chain start.
- **S2** source-JSON provenance/structure (`packages/tokens/src/**/*.json`, excluding `carbon-extracted/**`).
- **S3** fuzzy name similarity — fallback only, always flagged.
- Deliberately **NOT** used: generated-CSS value matching (too weak).
- 2026-09-15 Phase A run by signal: 424 high (228 S0, 196 S1, 0 S2), 0 S3 fuzzy, 18 unresolved, 0 conflicts.
  (The 2026-08-25 run resolved the same pairs as 416 high / 5 S2 / 8 S3 — the shift to S1 is purely better
  provenance, because `carbonization-design-tokens.md` now documents the `form-radiocard` and
  `form-control-checked` renames that previously had to be inferred structurally/fuzzily.)

---

## 3. What has been done & validated

### Phase A map regenerated at 100% (✅ 2026-08-25)
- Working tree on `project-solar/phase-1-stacked-cherry-picking/XX-Delta` confirmed at 1041 `--hds-*` tokens
  (100% carbonization complete). `main` confirmed still at 442 `--token-*` tokens (pre unchanged).
- `diff-tokens.mjs` re-run; map and diff report overwritten.
- Script improved during this session:
  - S1 resolver extended to also try `--token-*` as chain start (catches `carbonization-design-tokens.md`
    which documents renames as `--token-*`→`--hds-*` directly, not `--hds-*`→`--hds-*`).
  - Two new systematic categories added: `prefix-plus-renaming__form-radio-card` and
    `prefix-plus-renaming__form-control-checked`.
- `carbonization-design-tokens.md` changeset updated to reflect 100% state (424 renamed, 621 added, 18 removed).

### Phase A map refreshed for late-added tokens (✅ 2026-09-15)
- Commit `a044bbb` ("added design tokens for `neutral-on-dark` core colors") landed on a **parent branch
  after** the tooling was first implemented, so the committed map had gone stale. It adds:
  - 7 `core.color.neutral-on-dark-*` colors that are **`private: true`** and therefore **NOT** emitted to
    `dist/products/css/tokens.css` (they only appear under `dist/docs/**`) — invisible to this tooling;
  - 5 genuinely new canonical tokens: `--hds-app-footer-border-color`,
    `--hds-app-footer-foreground-color-default`, `--hds-app-footer-foreground-color-action-{default,hover,active}`.
- Post token count therefore moved **1041 → 1046**; `diff-tokens.mjs` re-run and artifacts overwritten.
- **No script change was needed** — the 5 tokens are brand-new post names, so they simply land in `added`
  (**621 → 626**). Every rename category is unchanged (228/42/86/46/2/2/5/5/8, `removed` 18) and the
  `before`→`after` pairs are byte-identical, so **Phase B is unaffected** and its `token-migration.{md,json}`
  reports remain valid (entries with `before: null` are ignored by Phase B).
- Only other delta: the signal attribution in `token-diff.md` (see §2) — same pairs, stronger provenance.
- `carbonization-design-tokens.md` already lists the 5 new tokens (updated in `a650cf6f`), so the changeset
  needed no edit; only its implied counts are now **424 renamed, 626 added, 18 removed**.

**Lesson:** whenever `packages/tokens` changes upstream, re-run Phase A before using the map, and remember
that `private` tokens never reach `dist/products/css/tokens.css`.

### HDS `main` test harness (✅ complete)
- Phase B run against a throwaway worktree of `main` (`git worktree add /tmp/hds-main main`).
- Result: **2970 scanned, 99 changed, 1176 replacements, 34 TODOs, 33 interpolated skipped, 0 stale remaining.**
- Idempotent (2nd apply: changed=0). `.gts`/`.hbs`/`.scss` all rewritten correctly.
- Applied diff committed to a preview branch `phase-b-token-migration-preview`, **reviewed in a GUI client,
  all changes approved**.
- All preview artifacts **cleaned up** (worktree, branch, patch file, temp apply-config removed).

### Atlas — first real downstream consumer (✅ dry-run only)
- Repo lives **OUTSIDE** this monorepo: `/Users/cristianorastelli/src/hashicorp/atlas/frontend`.
  Pass it via `--root`; roots are `atlas/app`, `atlas/tests`, `atlas/lib` (relative to `--root`).
- Atlas still uses `--token-*` (213 files). (The `--hds-*` prefix in the user's example audit config was for a
  SEPARATE token→hds effort and is NOT relevant to Phase B here — Phase B `prefix` stays `--token-`.)
- Config: `tooling/config/migrate.atlas.config.json` — reuses the SAME map
  (`../reports/hds/token-map.generated.json`), `reportDir: ../reports/atlas`, `dryRun: true`.
- Dry-run result: **6253 scanned, 211 changed, 1316 replacements, 0 TODOs, 0 interpolated, 0 stale remaining.**
  Everything mapped cleanly, no gaps.
- **No changes written to the Atlas repo.** User chose to stay dry-run. (User also mentioned stashing files on
  their side; nothing was applied by the tooling.)

---

## 4. How to run

### Phase A (regenerate the map — only inside this monorepo)
```bash
node ai-plans/project-solar-carbonization/full-tokens-replacement/tooling/diff-tokens.mjs
```
No args/config. Reads pre from `main` (via `git show`) and post from the working tree. Overwrites
`reports/hds/token-map.generated.json` + `token-diff.md`. Safe to re-run.

### Phase B (apply/verify — reusable, per-repo config)
```bash
# HDS test harness (needs a `main` worktree because the working tree is already post-carbonization):
git worktree add /tmp/hds-main main
node ai-plans/project-solar-carbonization/full-tokens-replacement/tooling/migrate-tokens.mjs \
  --config ai-plans/project-solar-carbonization/full-tokens-replacement/tooling/config/migrate.hds.config.json \
  --root /tmp/hds-main
git worktree remove /tmp/hds-main --force

# Atlas (real downstream consumer):
node ai-plans/project-solar-carbonization/full-tokens-replacement/tooling/migrate-tokens.mjs \
  --config ai-plans/project-solar-carbonization/full-tokens-replacement/tooling/config/migrate.atlas.config.json \
  --root /Users/cristianorastelli/src/hashicorp/atlas/frontend
```
- CLI flags: `--config <path>` (required), `--root <dir>` (defaults to cwd).
- `dryRun` is read from the **config only** (no CLI flag).

### Phase B config schema (per target repo)
| Key | Meaning | Notes |
| --- | --- | --- |
| `mapPath` | generated map to consume | resolved **relative to the config file** → use `../reports/hds/...` |
| `reportDir` | where `token-migration.{md,json}` are written | resolved relative to the config file |
| `prefix` | pre prefix to scan for | `--token-` (what every `before` carries) — NOT `--hds-` |
| `sassPrefixes` | optional secondary prefixes (e.g. `$token-`) | `[]` (off) by default |
| `roots` | dirs to scan/rewrite | relative to `--root` |
| `extensions` | file extensions | `scss, css, gts, hbs, ts, js` |
| `excludeGlobs` | globs to skip | dist/node_modules/vendor/tmp/*.map/*.md/... |
| `todoMarker` | marker for `after: null` tokens | `🚧 TODO [HDS-TOKEN-CARBONIZATION]` |
| `dryRun` | report only, write no files | keep `true` until report reviewed |

Fields from the user's example **audit** config that DO NOT transfer to Phase B:
`tokensPackage`, `tokensCssPath`, `tokensResolveFrom`, `allowlist`, `allowlistPatterns`, `ignoreComments`,
`reportSubdir` (→ use `reportDir`), and `prefix: --hds-` (audit-only).

---

## 5. Recommended next steps

1. **Apply Phase B on Atlas for real** (when the user gives the go-ahead — it's a separate repo, so requires
   explicit confirmation). Use the **preview-branch pattern**:
   - In the Atlas repo, ensure a clean working tree (user may have stashed — coordinate first).
   - Flip `dryRun: false` in `migrate.atlas.config.json` (or a temp copy), run Phase B with
     `--root /Users/.../atlas/frontend`.
   - Commit to a throwaway branch `phase-b-token-migration-preview`, review the diff in the GUI, then
     `pnpm lint` / `pnpm lint:fix` in Atlas. **Do not run the test suite from the agent** — ask the maintainer.
   - Clean up the throwaway branch/config afterwards.
2. **Onboard additional downstream consumer repos**: copy `migrate-tokens.mjs` unchanged, author a new
   `config/migrate.<repo>.config.json`, dry-run first, then preview-branch apply.
3. **Re-run Phase A whenever `packages/tokens` changes upstream** (and before any Phase B apply), so the map
   reflects the current post set — this is exactly what went stale in §3's 2026-09-15 refresh.
4. Fold any new learnings back into `generated-plan.md` and `tooling/README.md`.

---

## 6. Gotchas & environment constraints

- **Config paths resolve relative to the CONFIG FILE**, not the scanned `--root`. Config lives in
  `tooling/config/`, reports in `tooling/reports/`, so configs use `../reports/<repo>/...`.
  (An initial `reports/hds/...` value wrongly resolved to `tooling/config/reports/...` and failed.)
- **`private: true` tokens never reach `dist/products/css/tokens.css`** — they are emitted only to
  `dist/docs/**`. So a tokens commit can add source tokens that this tooling legitimately never sees
  (e.g. the 7 `core.color.neutral-on-dark-*` colors from `a044bbb`). Only the canonical products CSS counts.
- **The map goes stale when `packages/tokens` changes** — Phase A must be re-run after any upstream token
  commit; a stale map silently omits new post tokens from `added` (see §3, 2026-09-15).
- **TODO-marker insertion is idempotent** — it skips if the previous line already has the marker; otherwise
  re-runs stack duplicate comments.
- **HDS working tree is already post-carbonization**, so Phase B here MUST target a `main` worktree to see real
  `--token-*` usages (only excluded `.md` docs still reference `--token-*` in the working tree).
- **Node version**: repo uses Node 24 (`.nvmrc`). Atlas uses Node 22 — Phase B is dependency-free and runs on
  both; run it from the design-system repo dir so the design-system Node is active.
- **Interpolated dynamic names** (`--token-…#{…}` / `${…}`) are skipped and flagged — cannot be statically
  rewritten. **Indirect JS/TS token-name string coupling** is not caught by CSS scanning — relies on TODO
  markers / manual review.
- **Do NOT run the test suite from the agent** — ask the maintainer to run tests and report back.
- Worktree branches share the main repo's ref store → committing inside `/tmp/<worktree>` makes the branch
  visible in the main repo's GUI (that's how the HDS preview review was done).
- zsh/VS Code shell: avoid `set -u`/nounset and bare `==`/`status` as identifiers in scripted commands;
  terminal cwd can go stale — prefer absolute `cd` to the repo root.

---

## 7. Key references

- Full plan & rationale: `ai-plans/project-solar-carbonization/full-tokens-replacement/generated-plan.md`
- Tooling usage: `ai-plans/project-solar-carbonization/full-tokens-replacement/tooling/README.md`
- Accepted map: `ai-plans/project-solar-carbonization/full-tokens-replacement/tooling/reports/hds/token-map.generated.json`
- Phase A report: `.../reports/hds/token-diff.md`
- HDS Phase B report: `.../reports/hds/token-migration.md`
- Atlas Phase B dry-run report: `.../reports/atlas/token-migration.md`
