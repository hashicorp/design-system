# HDS design tokens usage audit — `verify-tokens.mjs`

> **START HERE.** This folder contains a dependency-free auditor that checks a consumer codebase for
> **CSS custom-property names that don't exist** in the installed `@hashicorp/design-system-tokens`.
> Use it as the **verification step after** migrating `--token-*` → `--hds-*` with
> [`../full-tokens-replacement/`](../full-tokens-replacement/README.md).
>
> | | |
> |---|---|
> | Audit script | [`tooling/verify-tokens.mjs`](./tooling/verify-tokens.mjs) — Node built-ins only (uses PostCSS if resolvable, regex otherwise) |
> | Config template | [`tooling/verify.TEMPLATE.config.json`](./tooling/verify.TEMPLATE.config.json) |
> | Reference run | [hashicorp/atlas#32035](https://github.com/hashicorp/atlas/pull/32035) — audit run after the Atlas migration (see [below](#reference-run)) |
> | History (do not use to audit) | [`OLD/`](./OLD/README.md) — original plan, handover, HDS-monorepo pilot config and reports |

## What it reports

It scans the configured roots (`.scss`, `.css`, `.gts`, `.hbs`, `.ts`, `.js` by default) and reports:

1. **Invalid tokens**: every `--hds-*` usage (`prefix`) that is **not** in the union of:
   - the official token list, read from the target repo's installed
     `@hashicorp/design-system-tokens/dist/products/css/tokens.css`;
   - the `allowlist` in the config. The template pre-fills it with the `--hds-var-*` runtime variables
     set by `@hashicorp/design-system-components`.
2. **Legacy tokens**: every leftover `--token-*` usage (`legacyPrefix`), i.e. pre-6.0.0 names that
   still need migrating with
   [`../full-tokens-replacement/tooling/migrate-tokens.mjs`](../full-tokens-replacement/tooling/migrate-tokens.mjs).
   Set `legacyPrefix: null` to disable.

Dynamic names (`--hds-foo-#{$x}`, `` `--hds-foo-${x}` ``) can't be checked statically. They're counted as
"interpolated" and skipped. With `ignoreComments: true` (the template default), usages inside comments
are skipped too.

The audit is a **report, not a gate**. It exits `0` whatever it finds, and `3` only on usage, config,
resolution or IO errors.

## How to run an audit

1. **Copy the config template** next to it, e.g. `tooling/verify.<repo>.config.json`, and edit:
   - `roots`: the target repo's source folders (relative to `--root`);
   - `extensions` / `excludeGlobs`: as needed;
   - `tokensResolveFrom`: monorepos only, the sub-package where `@hashicorp/design-system-tokens` is
     installed (e.g. `["packages/app"]`);
   - `allowlist`: add any consumer-specific exceptions. Refresh the `--hds-var-*` list if the
     components version is newer than 2026-10.
2. **Run it** (the target repo's dependencies must be installed, or pass `--tokens-css <path>`):

   ```bash
   node ai-plans/project-solar-carbonization/hds-tokens-verify/tooling/verify-tokens.mjs \
     --config ai-plans/project-solar-carbonization/hds-tokens-verify/tooling/verify.<repo>.config.json \
     --root /path/to/target-repo
   ```

   Reports go to `tooling/audit-reports/token-usage-audit.{md,json}` (plus `/<reportSubdir>` if set),
   unless `--out <dir>` is passed. `--out` is resolved relative to `--root`.
3. **Read `token-usage-audit.md`:**
   - **Legacy** section not empty → run the migration script first, then re-audit.
   - **Invalid** section → each token with all its `file:line` locations. Typical causes:
     - a token removed in 6.0.0 that needs a manual replacement;
     - a typo or malformed name;
     - an old `--hds-*` component variable that is now `--hds-var-*`;
     - a consumer-defined custom property that happens to use the `--hds-` prefix. Rename it, or add it
       to the `allowlist`.

Options:

| Option | Description |
|---|---|
| `--config <path>` | Config file (**required**) |
| `--root <path>` | Repo root to scan (default: current working directory) |
| `--tokens-css <path>` | Explicit `tokens.css` (overrides `tokensCssOverride` and dependency resolution) |
| `--out <dir>` | Output directory for the reports, relative to `--root` |
| `--json` | Also print the machine-readable report to stdout |

Config keys (see the template's `$comment` for details): `tokensPackage`, `tokensCssPath`,
`tokensCssOverride`, `tokensResolveFrom`, `prefix`, `legacyPrefix`, `roots`, `extensions`,
`excludeGlobs`, `ignoreComments`, `reportSubdir`, `reportGroups` (split the "Invalid" section by path
prefix), `allowlist`.

## Reference run

In [hashicorp/atlas#32035](https://github.com/hashicorp/atlas/pull/32035) the auditor was:

- ported to `frontend/atlas/carbonization/copilot-plans/tokens-verify/tooling/`;
- run after the token migration.

It left only 8 known usages of non-existent tokens, which were followed up with their owners. Atlas
uses an earlier fork of this script; the legacy `--token-*` check in it is what was merged into the
version here.

## Rules for AI agents (and humans in a hurry)

- Use **only** `tooling/verify-tokens.mjs` and a copy of `tooling/verify.TEMPLATE.config.json`. Never
  use the script or config under `OLD/`. The old script has no legacy `--token-*` check, and the old
  config targets the HDS monorepo itself.
- Don't edit `verify-tokens.mjs` per target repo. Put repo-specific settings in the config.
- A clean audit means 0 legacy tokens **and** only explained invalid tokens. Don't silence findings
  by growing the `allowlist` without a reason.

## Folder map

```
hds-tokens-verify/
├── README.md                          ← this file
├── tooling/
│   ├── verify-tokens.mjs              ← audit script (reusable core)
│   ├── verify.TEMPLATE.config.json    ← copy per target repo
│   └── audit-reports/                 ← created by runs (default output)
└── OLD/                               ← archive: original plan, handover, pilot config/reports, old script
```
