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
node copilot-plans/hds-tokens-verify/tooling/verify-tokens.mjs

# Print machine-readable summary to stdout as well
node copilot-plans/hds-tokens-verify/tooling/verify-tokens.mjs --json

# Point at a different repo root / token file / output dir
node copilot-plans/hds-tokens-verify/tooling/verify-tokens.mjs \
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
| `--out <dir>` | Output directory for report files (default: `../reports/<reportSubdir>` next to the script). |
| `--json` | Also print the machine-readable summary to stdout. |

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
| `ignoreComments` | When `true` (default), tokens that appear only inside comments (`/* */`, `//`, `{{! }}`) are not counted as usages. Positions of real usages are preserved. Set to `false` to include comment content. |

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
