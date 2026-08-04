# Plan — Audit `--hds-*` Custom-Property Usage Against the Official Token Set

> **Status:** verification step of the HDS token naming-convention effort. After the
> earlier steps rename/emit tokens (`--hds-*` from `packages/tokens`) and swap
> consumption sites (`--token-*` → `--hds-*`, `--hds-*` → `--hds-var-*`), this step
> provides a **deterministic auditor** that flags any `--hds-*` usage that is no
> longer a real token — i.e. names orphaned by a rename, a typo, or a bad merge.
>
> **Scope of this step:** a read-only scan-and-report tool. It never edits source
> and never fails the process — it surfaces inconsistencies for humans to fix.
>
> Related effort artifacts: [`../hds-tokens-replacement/generated-plan.md`](../hds-tokens-replacement/generated-plan.md)
> and [`../hds-var-renaming/generated-plan.md`](../hds-var-renaming/generated-plan.md).

---

## How to read and re-use this plan (delimiter convention)

This plan is written to be **portable across Ember/CSS consumer codebases**. The
reusable core (the auditor, its validity model, the workflow) is codebase-agnostic.
Everything specific to the **HDS monorepo pilot** is fenced so you can strip and
re-populate it for the next repo.

- **Repo-specific blocks** are wrapped in paired HTML comments:

  ```md
  <!-- BEGIN REPO-SPECIFIC (hds-pilot) -->
  … concrete HDS paths, counts, file names …
  <!-- END REPO-SPECIFIC (hds-pilot) -->
  ```

  To retarget: `grep -n "REPO-SPECIFIC" generated-plan.md`, then replace the content
  inside each block with the new repo's facts (or delete it if not applicable).

- **Placeholder tokens** appear in portable prose as `{{UPPER_SNAKE}}` and are the
  values you configure per repo. Canonical set:
  - `{{PREFIX}}` — the custom-property prefix to audit (e.g. `--hds-`).
  - `{{TARGET_ROOTS}}` — top-level source folders to scan.
  - `{{IN_SCOPE_EXTENSIONS}}` — file extensions to scan.
  - `{{EXCLUDE_GLOBS}}` — paths never scanned.
  - `{{TOKENS_PKG}}` — the package that emits the official token CSS.
  - `{{TOKENS_CSS_PATH}}` — subpath to `tokens.css` inside that package.
  - `{{ALLOWLIST}}` — extra valid names sharing the prefix but not in the package.

  The single source of truth for these at runtime is the tool's external config
  file (see [§3.2](#32-external-config-repo-specific-inputs)); the placeholders here
  are documentation, not runtime inputs.

Keep this plan as the durable knowledge artifact: fold every new edge case, gotcha,
or learning discovered while running it back into this file and the tooling docs —
not just into chat. A companion, session-agnostic handover lives at the repo root:
[`../../HANDOVER-hds-tokens-verify.md`](../../HANDOVER-hds-tokens-verify.md).

---

## 1. Approach analysis and recommendation

### 1.1 The problem, precisely

Renaming tokens across a large codebase inevitably leaves **orphans**: a
`{{PREFIX}}foo` usage whose token was renamed, mistyped, or mangled by a merge.
These do not error at build time (CSS custom properties silently resolve to their
fallback or `unset`), so they must be found by **comparison against the authoritative
token list**, not by the compiler.

The audit reduces to: for every `{{PREFIX}}*` usage in scoped source, is the name in
the **official token set** (from `{{TOKENS_PKG}}`) **or** an explicit `{{ALLOWLIST}}`?
If not → report it. This needs no AST or semantic model — a line scan with careful
handling of a few edge cases (interpolation, comments) is sufficient and repeatable.

### 1.2 Options considered

| Option | Fit for "flag usages not in the official set" | Portability | Verdict |
|---|---|---|---|
| **A. Dependency-free Node auditor** (scan globs, resolve official tokens from the installed package, compare against official ∪ allowlist, emit MD+JSON reports) | Ideal — the check *is* a set-membership test per usage | High — copy one file + a config; core never changes | **Recommended** |
| B. Stylelint plugin / custom rule | Couples to a specific lint stack and config; harder to run against arbitrary repos and non-CSS file types (`.gts`, `.hbs`, `.ts`) | Medium | Rejected as primary; viable later for CI |
| C. AI-driven review | Non-deterministic, slow, can't guarantee identical results on re-run | Low | Rejected |
| D. `rg` one-liner diffed against a token list | Works as a cross-check but no interpolation/comment awareness, no grouped report | Medium | Kept as ad-hoc cross-check only |

### 1.3 Recommendation

Use **Option A**: one small, dependency-free Node script that reads a repo-specific
external config, resolves the official token CSS from the installed package, and
reports every out-of-set usage to human- and machine-readable files. The tool is a
**report, not a gate** (exit 0 for audit outcomes; non-zero only for tool errors) —
wrap the JSON output if a CI gate is ever wanted.

**Guiding principle (drove several design decisions): surface every real
inconsistency; never hide token problems behind broad patterns or comment /
interpolation loopholes.**

---

## 2. Pre-conditions / audit step

Run from a **clean checkout** on the branch you want to audit.

### 2.1 Confirm the official token source is present and built

The auditor's validity set is only correct if `{{TOKENS_PKG}}`'s `tokens.css` is
built and resolvable from the target repo. Build it first if needed — the official
token count legitimately varies per branch.

<!-- BEGIN REPO-SPECIFIC (hds-pilot) -->
Pilot facts:
- `{{TOKENS_PKG}}` = `@hashicorp/design-system-tokens`
- `{{TOKENS_CSS_PATH}}` = `dist/products/css/tokens.css`
- Resolved from `packages/components` (the tokens package is symlinked there under
  pnpm); `config.tokensResolveFrom = ["packages/components"]` makes resolution work.
- Official token count seen across branches: ~800 / 809 / 818 (varies by branch).
  Rebuild `packages/tokens` if the count looks stale.
<!-- END REPO-SPECIFIC (hds-pilot) -->

### 2.2 Understand the validity model (important)

A `{{PREFIX}}*` name is valid **iff** it is in `official ∪ allowlist`. It is **NOT**
valid merely because it is *declared* somewhere in the scanned source. This matters
for internal runtime variables:

<!-- BEGIN REPO-SPECIFIC (hds-pilot) -->
`--hds-var-*` names also start with `--hds-`, so the scan matches them, but they are
component-internal runtime variables **not** defined in `tokens.css`. They must be
enumerated in the `allowlist` to count as valid. The pilot `allowlist` currently has
**97 entries**, collected from `--hds-var-*` declarations/usages in
`packages/components/src`. When source adds/renames such a variable, the allowlist
must be kept in sync or the auditor will (correctly) flag it.
<!-- END REPO-SPECIFIC (hds-pilot) -->

> **Deliberate non-feature:** an `allowlistPatterns` (regex-family) capability was
> built and then **removed**. A blanket `^--hds-var-` pattern would *hide* future
> typos (e.g. `--hds-var-…-punctuatione`). Enumerate names explicitly instead.

---

## 3. Implementation — the reusable auditor

### 3.1 Artifact locations

```
copilot-plans/hds-tokens-verify/
  generated-plan.md                    ← this file (portable plan + fenced pilot facts)
  tooling/
    verify-tokens.mjs                  ← reusable, dependency-free auditor (core; never edit per repo)
    README.md                          ← how to run + how to retarget
    .gitignore                         ← ignores *.tokens-cache.json
    config/
      hds-pilot.config.json            ← REPO-SPECIFIC inputs
    reports/
      README.md
      hds/                             ← pilot output (reportSubdir: "hds")
        token-usage-audit.md           ← human-readable report
        token-usage-audit.json         ← machine-readable report (full location lists)
```

> When retargeting, copy `tooling/verify-tokens.mjs` **unchanged**, add a new
> `tooling/config/<repo>.config.json`, and re-populate the `REPO-SPECIFIC` blocks +
> reports. **The core logic file is never edited per repo.**

### 3.2 External config (repo-specific inputs)

All per-repo variability lives in one JSON file so the core stays constant.

| Field | Meaning | Placeholder |
|---|---|---|
| `tokensPackage` | package to resolve official tokens from | `{{TOKENS_PKG}}` |
| `tokensCssPath` | subpath to `tokens.css` in that package | `{{TOKENS_CSS_PATH}}` |
| `tokensCssOverride` | explicit path (bypasses resolution) | usually `null` |
| `tokensResolveFrom` | extra base dirs for module resolution (pnpm symlinks) | repo-specific |
| `prefix` | prefix to audit | `{{PREFIX}}` |
| `roots` | source folders to scan | `{{TARGET_ROOTS}}` |
| `extensions` | file extensions to include (no leading dot) | `{{IN_SCOPE_EXTENSIONS}}` |
| `excludeGlobs` | glob patterns never scanned | `{{EXCLUDE_GLOBS}}` |
| `reportSubdir` | subfolder under `reports/` for output | repo-specific |
| `reportGroups` | path groups → one MD table per group (empty groups omitted) | optional |
| `allowlist` | extra valid names sharing the prefix but not in the package | `{{ALLOWLIST}}` |
| `ignoreComments` | when `false` (current default), tokens in comments **are** flagged | optional |

See [`tooling/config/hds-pilot.config.json`](tooling/config/hds-pilot.config.json)
for the concrete pilot values.

<!-- BEGIN REPO-SPECIFIC (hds-pilot) -->
Pilot config highlights:
- `prefix` = `--hds-`, `reportSubdir` = `hds`
- `roots` = `packages/components/src`, `showcase/app`, `showcase/tests`,
  `website/app`, `website/docs`
- `extensions` = `scss, css, gts, hbs, ts, js`
- `excludeGlobs` include `showcase/public/assets/**`
- `reportGroups` = `packages/tokens`, `packages/components`, `packages/flight-icons`,
  `showcase`, `website`
- `allowlist` = 97 `--hds-var-*` names
- `ignoreComments` not set → uses the default (`false` = comment tokens are flagged)
<!-- END REPO-SPECIFIC (hds-pilot) -->

### 3.3 Input/output contract

- **Input:** repo root (`--root`, default cwd), a config file (`--config`), the
  resolved official `tokens.css`.
- **Behavior:** scan all `roots` for all `extensions`; for each `{{PREFIX}}*` usage,
  test membership in `official ∪ allowlist`; bucket invalid ones by token name.
- **Output:** `token-usage-audit.md` (grouped, all locations listed) and
  `token-usage-audit.json` (summary + full location lists). Deterministic across runs
  from the same source. A one-line stdout summary prints the counts + token source.
- **Exit codes:** `0` = audit completed (clean or not); `3` = usage/config/token
  resolution/IO error.

Full CLI options:

| Option | Description |
| --- | --- |
| `--config <path>` | Config file (default `./config/hds-pilot.config.json` next to the script). |
| `--root <path>` | Repo root to scan (default cwd). |
| `--tokens-css <path>` | Explicit `tokens.css` (overrides `tokensCssOverride` + dependency resolution). |
| `--tokens-cache <path>` | Cache resolved official tokens; reuse on later runs (skips resolve+parse). |
| `--refresh-cache` | Ignore/rebuild an existing `--tokens-cache` file. |
| `--out <dir>` | Output dir (default `../reports/<reportSubdir>` next to the script). |
| `--json` | Also print the machine-readable summary to stdout. |
| `--skip-clean-report` | Do **not** write report files when 0 invalid tokens are found. |

### 3.4 Edge cases the auditor must preserve

1. **Interpolation is skipped, not flagged.** If the two chars after a match are
   `#{` (Sass) or `${` (JS template literal), the token name is dynamic and cannot
   be statically validated → counted as `interpolatedUsages` and excluded from
   invalid results. (Pilot has ~63 such usages — token-name loops in accordion,
   alert, badge, button, grid, icon-tile, link SCSS, plus a few JS template
   literals under `website/docs`.)
2. **Comment handling flips behavior.** `ignoreComments` default is **`false`** →
   tokens appearing only in comments (`/* */`, `//` except after `:` so URLs
   survive, `{{! }}` / `{{!-- --}}`) **are** flagged (they need fixing too). Set to
   `true` to blank comment spans first (positions preserved via space-fill).
3. **Grouped report.** With `reportGroups`, invalid tokens split into one table per
   path; empty groups omitted; unmatched locations fall into an "Ungrouped" table.
4. **All locations shown.** Every occurrence is listed (no "sample N + more").
5. **PostCSS-or-regex parity.** `tokens.css` is parsed with PostCSS when resolvable,
   else a regex fallback; both were verified to produce identical token sets. The
   summary reports `source: postcss` or `source: regex` (+ `, cached` when served
   from `--tokens-cache`).

---

## 4. Exclusions (never scan)

`{{EXCLUDE_GLOBS}}` — the portable exclusion set:

- `**/dist/**`, `**/node_modules/**`, `**/.git/**` — always skipped by the tool.
- Compiled/vendored CSS assets (generated, not source).
- `**/*.map` — source maps.

<!-- BEGIN REPO-SPECIFIC (hds-pilot) -->
Pilot-specific: `showcase/public/assets/**` (compiled/vendored stylesheets). Large
raw `--hds-` counts in unfiltered scans are entirely these generated assets and must
not be audited as source.
<!-- END REPO-SPECIFIC (hds-pilot) -->

---

## 5. Execution order

Portable ordering (build tokens → audit → review → fix upstream → re-audit):

1. **Ensure official tokens are built/resolvable** (see [§2.1](#21-confirm-the-official-token-source-is-present-and-built)).
2. **Run the audit** over all `{{TARGET_ROOTS}}` for all `{{IN_SCOPE_EXTENSIONS}}`.
3. **Review** `token-usage-audit.md` (grouped tables) + the stdout summary.
4. **Fix upstream** — each invalid token is either a real orphan to fix in source,
   or a legitimate internal name to add to `allowlist` (with judgement — do not
   allowlist away a typo).
5. **Re-audit** until clean (0 invalid / 0 occurrences) or every remaining item is
   explicitly justified.

<!-- BEGIN REPO-SPECIFIC (hds-pilot) -->
Standard pilot invocation (from repo root):

```bash
node copilot-plans/hds-tokens-verify/tooling/verify-tokens.mjs \
  --config copilot-plans/hds-tokens-verify/tooling/config/hds-pilot.config.json \
  --root /path/to/design-system
```

Latest clean baseline: **0 invalid / 0 occurrences** across ~3.1k files
(809 official + 97 allowlist, source: postcss).
<!-- END REPO-SPECIFIC (hds-pilot) -->

### 5.1 Repeated runs during a rebase (minimal footprint)

For a rename branch being repeatedly rebased/validated, use the two opt-in flags so
runs are cheap and low-noise:

```bash
node copilot-plans/hds-tokens-verify/tooling/verify-tokens.mjs \
  --tokens-cache copilot-plans/hds-tokens-verify/tooling/.tokens-cache.json \
  --skip-clean-report
```

- `--tokens-cache` resolves + parses the official tokens once, then reuses the cache
  (`source: postcss, cached`); rebuild with `--refresh-cache`.
- `--skip-clean-report` leaves report files untouched on a clean run.
  **Caveat:** a clean run does not update/delete a previous report, so a stale report
  can reflect an earlier step — delete manually for a truly clean tree.
- `*.tokens-cache.json` is gitignored (`tooling/.gitignore`).

---

## 6. Idempotency & repeatability guarantees

- The auditor is **read-only** — it never mutates source; re-running is always safe.
- Output is deterministic (files sorted by relative path; stable rendering) so the
  same source yields byte-identical reports.
- Depends on no prior-run state; the only optional persisted artifact is the
  (gitignored) tokens cache, which only affects *speed*, not results.

---

## 7. Testing / validation strategy

> **The agent must NOT run the app test suites** — they are slow and may hang. Ask
> the user to run tests and report back.

### 7.1 Deterministic gates (agent may run)

1. Audit runs cleanly and reports **0 invalid / 0 occurrences** (or every remaining
   item is explicitly justified in review).
2. Summary line shows a sane official-token count and file count for the branch.
3. PostCSS vs. regex parity holds (the `source:` field is expected; token set is
   the same either way).

### 7.2 Cross-check (optional, independent of the tool)

```bash
rg -n --glob '**/*.{scss,css,gts,hbs,ts,js}' \
  --glob '!**/dist/**' --glob '!**/*.map' \
  --glob '!showcase/public/assets/**' \
  -- '--hds-' {{TARGET_ROOTS}}
```

Diff the distinct names against `tokens.css` + the `allowlist` to sanity-check the
tool's findings.

---

## 8. Environment gotchas (macOS / this workspace)

- **Node auto-switches via `.nvmrc`** (repo uses v24); nvm noise on each `cd` is
  harmless.
- **Stale shell cwd (`ENOENT: uv_cwd`)** during rebases/branch switches: prefix
  commands with `cd "$HOME" &&` then `cd <target>` to recover.
- **zsh:** avoid `set -u`/nounset in scripted commands; avoid bare `==`/`===`
  separators; don't use `status` as a var name.
- **`verify-tokens.mjs` is `// @ts-check` plain JS:** the TS server shows harmless
  implicit-`any` warnings — they are **not** errors and the script runs fine via Node.

---

## 9. Definition of Done

The audit step is done when all are true:

1. The auditor runs against the target branch and produces `token-usage-audit.{md,json}`.
2. Every invalid token is resolved — fixed in source (orphan) or justified/allowlisted
   (legitimate internal name), with **no typos hidden** by broad allowlisting.
3. Re-audit reports **0 invalid / 0 occurrences** (or a documented, justified residual).
4. The `allowlist` is in sync with the repo's internal `{{PREFIX}}var-*` declarations.
5. This plan + [`tooling/README.md`](tooling/README.md) reflect any new edge cases
   or decisions discovered during the run.
