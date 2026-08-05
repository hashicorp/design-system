# HANDOVER — HDS Token "Carbonization" Full Replacement

> Purpose: give a **fresh session** everything needed to continue this work without re-discovering context.
> Last updated: 2026-07-21

---

## 0. TL;DR

- Two-phase, dependency-free, config-driven Node tooling migrates CSS design-token **names** from the
  **pre-carbonization** set (`--token-*`, 442 tokens on `main`) to the **post-carbonization** set
  (`--hds-*`, 801 tokens on the feature branch).
- **Phase A** (`diff-tokens.mjs`) generates the old→new **token map** (`token-map.generated.json`).
  Runs **once**, only in this monorepo. Already built, run, and accepted.
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
copilot-plans/full-tokens-replacement/
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

- **Related sibling efforts** (separate, do not conflate): `copilot-plans/hds-tokens-replacement/`
  (`--token-`→`--hds-` prefix swap), `copilot-plans/hds-var-renaming/` (`--hds-`→`--hds-var-`),
  `copilot-plans/hds-tokens-verify/` (auditor `verify-tokens.mjs`, the architectural template reused here).

---

## 2. The big picture (verified facts)

- **Pre = `main`**: 442 custom properties, ALL `--token-*`, zero `--hds-*`.
- **Post = working tree** (feature branch `project-solar/00_phase-1-main-feature-branch`, and branches off it,
  e.g. the dev branch `project-solar/phase-2/10/HDS-6504/full-tokens-replacement`): 801 props, ALL `--hds-*`.
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
| `prefix-only` | 242 | only prefix changed: `--token-X` → `--hds-X` |
| `prefix-plus-renaming__palette-colors` | 42 | `color-palette-{hue}-{step}` → `core-color-{hue}-{step}` |
| `prefix-plus-renaming__product-colors` | 86 | `color-{product}-…` → `product-{product}-…-color` |
| `prefix-plus-renaming__semantic-colors` | 46 | `color-{semantic}-{rest}` → `{semantic}-color-{rest}` |
| `prefix-plus-renaming__focus-ring` | 2 | `focus-ring-{variant}-box-shadow` → `focus-ring-box-shadow-{variant}` |
| `prefix-plus-renaming__transition-function` | 2 | `{rest}-transition-function` → `{rest}-transition-timing-function` |
| `prefix-plus-renaming__other` | 6 | structural renames with no systematic rule (review each) |
| `removed` | 16 | pre token with no successor → `after: null` |
| `added` | 377 | brand-new post tokens (`before: null`) — reference only, Phase B ignores |

Check: 242+42+86+46+2+2+6+16 = 442 pre tokens ✓.

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

### Signal sources (Phase A inference, priority order)
- **S0** mechanical prefix swap (`--token-`→`--hds-`) — applies to every pre token; 242 land verbatim in post.
- **S1** changeset rename tables/arrows (`.changeset/*.md`) — **names are already in `--hds-` namespace**, so
  compose ON TOP of S0 and chain across steps. 5 of 14 changesets carry tables: `cyan-boxes-add`,
  `silent-birds-flash`, `tall-trains-bathe`, `twelve-mirrors-grab`, `twenty-ads-travel`.
- **S2** source-JSON provenance/structure (`packages/tokens/src/**/*.json`, excluding `carbon-extracted/**`).
- **S3** fuzzy name similarity — fallback only, always flagged.
- Deliberately **NOT** used: generated-CSS value matching (too weak).
- Accepted Phase A run by signal: 419 high (242 S0, 176 S1, 1 S2), 7 S3 fuzzy, 16 unresolved, 0 conflicts.

---

## 3. What has been done & validated

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
node copilot-plans/full-tokens-replacement/tooling/diff-tokens.mjs
```
No args/config. Reads pre from `main` (via `git show`) and post from the working tree. Overwrites
`reports/hds/token-map.generated.json` + `token-diff.md`. Safe to re-run.

### Phase B (apply/verify — reusable, per-repo config)
```bash
# HDS test harness (needs a `main` worktree because the working tree is already post-carbonization):
git worktree add /tmp/hds-main main
node copilot-plans/full-tokens-replacement/tooling/migrate-tokens.mjs \
  --config copilot-plans/full-tokens-replacement/tooling/config/migrate.hds.config.json \
  --root /tmp/hds-main
git worktree remove /tmp/hds-main --force

# Atlas (real downstream consumer):
node copilot-plans/full-tokens-replacement/tooling/migrate-tokens.mjs \
  --config copilot-plans/full-tokens-replacement/tooling/config/migrate.atlas.config.json \
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
3. Fold any new learnings back into `generated-plan.md` and `tooling/README.md`.

---

## 6. Gotchas & environment constraints

- **Config paths resolve relative to the CONFIG FILE**, not the scanned `--root`. Config lives in
  `tooling/config/`, reports in `tooling/reports/`, so configs use `../reports/<repo>/...`.
  (An initial `reports/hds/...` value wrongly resolved to `tooling/config/reports/...` and failed.)
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

- Full plan & rationale: `copilot-plans/full-tokens-replacement/generated-plan.md`
- Tooling usage: `copilot-plans/full-tokens-replacement/tooling/README.md`
- Accepted map: `copilot-plans/full-tokens-replacement/tooling/reports/hds/token-map.generated.json`
- Phase A report: `.../reports/hds/token-diff.md`
- HDS Phase B report: `.../reports/hds/token-migration.md`
- Atlas Phase B dry-run report: `.../reports/atlas/token-migration.md`
