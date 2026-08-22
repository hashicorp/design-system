# Handover — HDS Token-Usage Auditor Tooling

> Context handover for the deterministic token-usage auditor built under
> `copilot-plans/hds-tokens-verify/`. Read this top-to-bottom before continuing
> the work in a fresh session.

Last updated: 2026-07-14

---

## 1. What this is

A **reusable, dependency-free CLI auditor** that scans a target codebase for CSS
custom-property token usages matching a prefix (default `--hds-`) and reports any
usage that is **not** part of the official Helios Design System token set.

It exists to support the **HDS token naming-convention / renaming effort**
(Project Solar — Phase 2, Tokens renaming). The primary use case: after a
rename/refactor/rebase, detect "orphaned" tokens — names that no longer match an
official token because they were renamed, typo'd, or mangled by a merge conflict.

- **Repo:** `hashicorp/design-system`
- **Working branch:** `project-solar/phase-2/10/HDS-6504/hds-tokens-verify`
- **PR:** [#3985 — [WIP] Tooling for HDS tokens usage audit / linting](https://github.com/hashicorp/design-system/pull/3985)
- **Default branch:** `main`

The audit is a **report, not a gate** — it never fails the process (exit 0 for
audit outcomes; exit 3 only for tool/IO/config/resolution errors).

---

## 2. Where everything lives

```
copilot-plans/hds-tokens-verify/tooling/
├── verify-tokens.mjs                 # THE REUSABLE CORE (~677 lines). Never edit per-repo.
├── README.md                         # User-facing docs (options, config, rebase workflow)
├── .gitignore                        # Ignores *.tokens-cache.json
├── config/
│   └── hds-pilot.config.json         # Repo-specific config for THIS monorepo (the pilot)
└── reports/
    ├── README.md
    └── hds/                          # Output for the pilot (reportSubdir: "hds")
        ├── token-usage-audit.md      # Human-readable report
        └── token-usage-audit.json    # Machine-readable report (full location lists)
```

Note: an earlier `config/atlas.config.json` (a second worked example targeting the
downstream `atlas` app) was **deleted** during cleanup. Its report dir
(`reports/atlas/`) is also gone. Only the HDS pilot remains.

---

## 3. How it works (architecture)

`verify-tokens.mjs` is plain ESM run via `node` — zero runtime deps, uses only
Node built-ins (`node:fs`, `node:url`, `node:module`, `node:path`).

Pipeline (see `main()` at the bottom of the file):

1. **`parseArgs`** — CLI flags (see §4).
2. **`loadConfig`** — reads the JSON config, applies defaults.
3. **`loadTokens`** — resolves + parses the official token set, with optional
   on-disk caching (see §5). Internally calls:
   - **`resolveTokensCss`** — finds `tokens.css` in priority order:
     1. `--tokens-css` flag → 2. `config.tokensCssOverride` →
     3. the installed dependency `<tokensPackage>/<tokensCssPath>`.
   - **`resolutionBases` / `resolveFromBases`** — pnpm-monorepo-aware module
     resolution. The tokens package is symlinked under a consuming package's
     `node_modules`, so we try `[root, ...tokensResolveFrom, ...roots]` as base
     dirs when resolving `<tokensPackage>/package.json`.
   - **`loadOfficialTokens`** — extracts `--hds-*` custom-property names from
     `tokens.css`. Uses **PostCSS** if resolvable (`walkDecls`), else a **regex
     fallback**. Both modes were verified to produce identical token sets.
4. **`scanTargets`** — walks the configured `roots`, extracts token usages, and
   buckets invalid ones. Key sub-behaviors:
   - **`collectFiles` / `walk`** — recursive walk; always prunes
     `node_modules`, `.git`, `dist`; applies `excludeGlobs`; filters by
     `extensions`; deterministic sort by relative path.
   - **`stripComments`** — when `ignoreComments` is true, blanks comment spans
     (`/* */`, `//` except after `:` so URLs survive, `{{! }}` / `{{!-- --}}`)
     by replacing chars with spaces so line/column positions stay accurate.
   - **`extractUsages`** — regex `--hds-[a-zA-Z0-9-]+` per line. Detects
     **interpolation**: if the 2 chars after a match are `#{` (Sass) or `${`
     (JS template literal), the token name is dynamic and is flagged
     `interpolated` → **skipped** (can't be statically validated).
   - Validity check: a token is valid iff it's in `officialTokens ∪ allowlist`.
5. **`buildReportData`** — assembles the report object (summary + grouped invalid
   tokens).
6. **`renderMarkdown` / `renderTokenTable`** — produces the `.md`. If
   `reportGroups` is set, invalid tokens are split into a table per path group;
   empty groups are omitted; anything not matching a group falls into an
   "Ungrouped" table.
7. **`writeReports`** — writes `.md` + `.json` (unless skipped; see §5) and prints
   a one-line stdout summary.

---

## 4. CLI options

| Option | Description |
| --- | --- |
| `--config <path>` | Config file (default `./config/hds-pilot.config.json` next to the script). |
| `--root <path>` | Repo root to scan (default: cwd). |
| `--tokens-css <path>` | Explicit `tokens.css` (overrides dependency resolution + `tokensCssOverride`). |
| `--tokens-cache <path>` | Cache resolved official tokens to this file; reuse on later runs (skips resolution + parse). |
| `--refresh-cache` | Ignore an existing `--tokens-cache` file and rebuild it. |
| `--out <dir>` | Output dir (default `../reports/<reportSubdir>` next to the script). |
| `--json` | Also print the machine-readable summary to stdout. |
| `--skip-clean-report` | Do **not** write report files when 0 invalid tokens are found. |

Exit codes: `0` = audit completed (clean or not); `3` = usage/config/resolution/IO error.

---

## 5. Two "minimal footprint" features (added for the rebase workflow)

Both are **opt-in**; defaults preserve original behavior.

- **`--tokens-cache <path>` (+ `--refresh-cache`)** — On first run, resolves and
  parses the tokens package once and writes `{prefix, tokensCssPath,
  tokenSourceKind, parseMode, tokens[]}` to the cache. Subsequent runs load from
  it and skip resolution/parse entirely; the summary then reads
  `source: postcss, cached`. Cache is invalidated (rebuilt) if it's
  missing/unreadable, if `prefix` differs, or if `--refresh-cache` is passed.
- **`--skip-clean-report`** — When the audit is clean (0 invalid), report files
  are left untouched and stdout shows
  `reports: not written (clean result; --skip-clean-report)`. Steps that find
  invalid tokens still write the report.
  - **Caveat:** a clean run leaves any *previous* report on disk (neither updated
    nor deleted), so a stale report may reflect an earlier step. Delete manually
    for a truly clean tree.

Recommended combo during a rebase (run at each step):

```bash
node copilot-plans/hds-tokens-verify/tooling/verify-tokens.mjs \
  --tokens-cache copilot-plans/hds-tokens-verify/tooling/.tokens-cache.json \
  --skip-clean-report
```

`*.tokens-cache.json` is gitignored (see `tooling/.gitignore`).

---

## 6. Config reference (`config/hds-pilot.config.json`)

| Key | Purpose | Pilot value |
| --- | --- | --- |
| `tokensPackage` | Package to resolve official tokens from | `@hashicorp/design-system-tokens` |
| `tokensCssPath` | Subpath to `tokens.css` in that package | `dist/products/css/tokens.css` |
| `tokensCssOverride` | Explicit path (bypasses resolution) | `null` |
| `tokensResolveFrom` | Extra base dirs for module resolution | `["packages/components"]` |
| `prefix` | Prefix to audit | `--hds-` |
| `roots` | Dirs to scan | `packages/components/src`, `showcase/app`, `showcase/tests`, `website/app`, `website/docs` |
| `extensions` | File extensions | `scss, css, gts, hbs, ts, js` |
| `excludeGlobs` | Globs to skip | incl. `showcase/public/assets/**` |
| `reportSubdir` | Subfolder under `reports/` | `hds` |
| `reportGroups` | Per-path tables in the MD report | `packages/tokens`, `packages/components`, `packages/flight-icons`, `showcase`, `website` |
| `allowlist` | Extra valid tokens not in the package | **97 entries** (all `--hds-var-*`) |
| `ignoreComments` | Skip tokens that appear only in comments | (default is `false`) |

**Important semantics of `allowlist`:** `--hds-var-*` names also start with
`--hds-`, so the scan matches them, but they are **component-internal runtime
variables** not defined in `tokens.css`. They must be enumerated in `allowlist`
to be considered valid. The pilot list was collected from `--hds-var-*`
declarations/usages in `packages/components/src`.

---

## 7. Behavioral decisions & evolution (why things are the way they are)

Ordered roughly by when they were decided. These encode the user's preferences —
respect them.

1. **Agnostic core, config-driven.** `verify-tokens.mjs` is the "reusable core"
   and must **never** be edited per-repo. All repo-specific inputs live in the
   JSON config. Retargeting = copy the script unchanged + write a new config.
2. **Deterministic, not AI.** The tool is a plain deterministic scanner (chosen
   over an AI prompt/skill) for repeatability.
3. **Interpolation skipping.** Sass `#{...}` / JS `${...}` immediately after a
   token produce dynamic names → skipped and counted as `interpolatedUsages`.
   This cut false positives substantially. There are ~63 such usages in HDS
   (loops building token names in accordion/alert/badge/button/grid/icon-tile/
   link SCSS, plus a few JS template literals in `website/docs`).
4. **Comment handling flipped.** Originally comment tokens were skipped
   (`ignoreComments` default `true`). The user then decided **tokens in comments
   should be flagged** too (they need fixing), so the default was flipped to
   **`false`**. `stripComments` still exists for opt-in use.
5. **Per-path grouped tables.** The MD "Invalid tokens" section is broken into one
   table per `reportGroups` path; empty groups are omitted.
6. **All locations, no sampling.** The report lists every occurrence location (the
   earlier "sample 3 + N more" behavior was removed).
7. **`allowlistPatterns` feature was ADDED then fully REMOVED.** It let you
   allowlist a whole family via regex (e.g. `^--hds-var-`). Once the `--hds-var-*`
   list became clean/authoritative, the user removed the feature entirely because
   a blanket pattern would **hide** future typos (e.g. a stray
   `--hds-var-...-punctuatione`). **Core principle: surface inconsistencies,
   don't hide them.** Do not reintroduce pattern-based allowlisting without a
   very good reason — enumerate instead.
8. **Stale-allowlist lesson.** The auditor treats a `--hds-var-*` name as valid
   **only** if it's official or in `allowlist` — NOT just because it's declared in
   the scanned SCSS. When source is cleaned up (e.g. a correctly-named var added),
   the allowlist can drift and must be updated (this happened with
   `--hds-var-code-block-color-attr-name`).

---

## 8. Current state

- Latest run on branch `project-solar/phase-1/shleewhite/table-carbonization`
  was **clean: 0 invalid tokens / 0 occurrences** across 3104 files
  (809 official + 97 allowlist, source: postcss).
- `reports/hds/token-usage-audit.{md,json}` currently reflect that clean state.
- Note: official token count varies by branch (seen 800 / 809 / 818) because
  different branches build different `tokens.css`. `filesScanned` also varies
  (~3102–3116).

---

## 9. How to run (quick reference)

```bash
# Standard pilot run (writes reports/hds/*)
node copilot-plans/hds-tokens-verify/tooling/verify-tokens.mjs \
  --config copilot-plans/hds-tokens-verify/tooling/config/hds-pilot.config.json \
  --root /Users/<you>/src/hashicorp/design-system

# From inside the tooling dir, --config defaults to config/hds-pilot.config.json:
cd copilot-plans/hds-tokens-verify/tooling
node verify-tokens.mjs --root /abs/path/to/design-system
```

Retarget to another repo: copy `verify-tokens.mjs` unchanged, create
`config/<repo>.config.json` (edit `roots`, `extensions`, `excludeGlobs`, `prefix`,
`allowlist`, `tokensResolveFrom`), run with `--config` and `--root`.

---

## 10. Environment gotchas (macOS / this workspace)

- **Node auto-switches via `.nvmrc`** (repo uses v24). You'll see nvm noise on
  each `cd` — harmless.
- **Stale shell cwd (`ENOENT: uv_cwd`)** — During rebases/branch switches the
  terminal's cwd inode can get invalidated and `node` fails before running.
  **Fix:** `cd "$HOME"` first, then `cd` back to the tooling dir. This happened
  repeatedly.
- **zsh:** avoid `set -u`/nounset in scripted commands (the VS Code integration
  reads `RPROMPT` and can fail); avoid bare `==`/`===` separators; don't use
  `status` as a var name. `cat -A` is not available on macOS (BSD cat) — use
  `cat -e` / `cat -v` or hexdump.

---

## 11. Suggested next steps / open items

- The PR (#3985) is **WIP**. Likely remaining work: finalize README, decide
  whether the tool should also ship a thin CI wrapper (the audit itself is
  report-only by design — wrap the JSON output if a gate is ever wanted).
- Consider whether `reports/hds/*` should be committed or gitignored (currently
  committed; they change per branch, which can create noise — mirror of why
  `--skip-clean-report` exists).
- If a second target repo is reintroduced, add `config/<repo>.config.json`
  (do NOT re-add `allowlistPatterns`; enumerate the `--hds-var-*` list instead).
- Keep `allowlist` in sync with `packages/components/src` `--hds-var-*`
  declarations as they evolve (watch for drift, per §7.8).

---

## 12. TL;DR for the next session

The auditor works and is clean on the current tokens branches. It's config-driven
and must stay agnostic (never edit the core per-repo). Two opt-in flags
(`--tokens-cache`, `--skip-clean-report`) make repeated rebase-time runs cheap and
low-noise. The guiding philosophy throughout: **surface every real inconsistency,
never hide token problems behind broad patterns or comment/interpolation
loopholes** (with the deliberate exception that truly dynamic interpolated names
can't be statically checked and are reported separately).
