# Tooling — Token Usage Auditor

Reusable, dependency-free auditor that finds CSS custom-property token usages in a
codebase that do **not** match the official Helios Design System token list.

It compares every `--<prefix>*` usage in your source against the union of:

1. the **official tokens**, resolved from the installed
   `@hashicorp/design-system-tokens` dependency at
   `dist/products/css/tokens.css`, and
2. an inline **allowlist** of extra known tokens (same prefix, not defined in the
   tokens package — e.g. internal `--hds-var-*` runtime variables).

Anything not in that union is reported as an invalid usage.

## Files

- `verify-tokens.mjs` — the **reusable core**. Never edit per repo.
- `config/hds-pilot.config.json` — **repo-specific** inputs (token source, prefix,
  roots, extensions, exclusions, allowlist). Copy + edit this per repo.
- `reports/<reportSubdir>/` — generated on each run (the pilot uses `reports/hds/`):
  - `token-usage-audit.md` (human-readable)
  - `token-usage-audit.json` (machine-readable, with full location lists)

## Requirements

Node.js (any modern version). No `npm install` required — the script uses only
built-in modules. If PostCSS is resolvable (from the target repo or this tool's
context) it is used to parse `tokens.css`; otherwise a regex fallback is used.

## How the token source is resolved

Codebase-agnostic, in priority order:

1. `--tokens-css <path>` flag.
2. `config.tokensCssOverride`.
3. The installed dependency: `<tokensPackage>/<tokensCssPath>` resolved from the
   target repo root via its `package.json`.

## Usage

Run from the repo root. Default config path is `./config/hds-pilot.config.json`
relative to the script; pass `--config` to override.

```bash
# Run the audit (writes reports, exit 0)
node ai-plans/project-solar-carbonization/hds-tokens-verify/tooling/verify-tokens.mjs

# Print machine-readable summary to stdout as well
node ai-plans/project-solar-carbonization/hds-tokens-verify/tooling/verify-tokens.mjs --json

# Point at a different repo root / token file / output dir
node ai-plans/project-solar-carbonization/hds-tokens-verify/tooling/verify-tokens.mjs \
  --root /path/to/other-repo \
  --tokens-css node_modules/@hashicorp/design-system-tokens/dist/products/css/tokens.css \
  --out reports
```

## Options

| Option | Description |
| --- | --- |
| `--config <path>` | Config file (default: `./config/hds-pilot.config.json` next to the script). |
| `--root <path>` | Repo root to scan (default: current working directory). |
| `--tokens-css <path>` | Explicit path to the official `tokens.css` (overrides dependency resolution). |
| `--tokens-cache <path>` | Cache the resolved official tokens to this file and reuse them on later runs. |
| `--refresh-cache` | Ignore an existing `--tokens-cache` file and rebuild it. |
| `--out <dir>` | Output directory for report files (default: `../reports/<reportSubdir>` next to the script). |
| `--json` | Also print the machine-readable summary to stdout. |
| `--skip-clean-report` | Do **not** write report files when 0 invalid tokens are found. |

## Exit codes

| Code | Meaning |
| --- | --- |
| 0 | Audit completed (whether or not invalid tokens were found). |
| 3 | Usage / config / token-source resolution / IO error. |

The audit is a **report, not a gate** — finding invalid tokens does not fail the
process. Wrap the JSON output in your own check if you want a CI gate.

## Config reference

| Key | Purpose |
| --- | --- |
| `tokensPackage` | Package to resolve the official tokens from. |
| `tokensCssPath` | Subpath to `tokens.css` inside that package. |
| `tokensCssOverride` | Optional explicit path (bypasses dependency resolution). |
| `prefix` | Custom-property prefix to audit (e.g. `--hds-`). |
| `roots` | Directories to scan. |
| `extensions` | File extensions to include. |
| `excludeGlobs` | Glob patterns to skip. |
| `reportSubdir` | Optional subfolder under `reports/` for the output files (the pilot uses `hds`). |
| `allowlist` | Extra known tokens (same prefix) that are valid but not in the package. |
| `ignoreComments` | When `true`, tokens that appear only inside comments (`/* */`, `//`, `{{! }}`) are not counted as usages (positions of real usages are preserved). **Default is `false`** — comment content is scanned, because tokens in comments need fixing too. |

## Retargeting to another repo

1. Copy `verify-tokens.mjs` **unchanged**.
2. Create `config/<repo>.config.json` from `hds-pilot.config.json`; edit `roots`,
   `extensions`, `excludeGlobs`, `prefix`, and `allowlist`.
3. Run with `--config config/<repo>.config.json` (and `--root` if needed).

## Notes

- `--hds-var-*` names also begin with `--hds-`, so they are matched by the scan
  and must be present in the `allowlist` to be considered valid.
- The pilot `allowlist` was collected from `--hds-var-*` declarations and usages
  in `packages/components/src`.
- Tokens marked `"private": "true"` in `packages/tokens/src/**` are emitted only to
  `dist/docs/**`, **not** to `dist/products/css/tokens.css` (e.g.
  `core.color.neutral-on-dark-*`). They are therefore **not** part of the official
  set, and any source usage of them is reported as invalid — fix the usage rather
  than allowlisting the family.
- New official tokens require no change here: the official set is resolved at run
  time from the built `tokens.css`, so anything added upstream is picked up
  automatically (pass `--refresh-cache` if you use `--tokens-cache`).
