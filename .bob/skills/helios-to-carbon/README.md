# helios-to-carbon skill

Standalone migration skill package for converting Helios component usage to Carbon Web Components.

## Contents

- `SKILL.md`: canonical single-skill workflow (analyze, apply, verify, report)
- `migration/helios-to-carbon-component-map.json`: default component mapping table
- `migration/schemas/migration-candidate.schema.json`: default candidate schema
- `templates/migration-report-template.md`: default report template

## Use in any repository

1. Copy this folder into your preferred skills location.
2. Keep internal structure unchanged (`migration/`, `templates/`, `SKILL.md`).
3. Invoke the skill with target scope and mode.

The skill resolves defaults relative to the directory containing `SKILL.md` (`skillRoot`), so it does not depend on a specific monorepo layout.

## Runtime configuration

- `target`: file, directory, or glob scope.
- `mode`: `dry-run` | `safe-only` | `full`.
- `outputDir` (optional): where migration artifacts are written.
- `mappingPath` (optional): override default mapping table path.
- `candidateSchemaPath` (optional): override default schema path.
- `reportTemplatePath` (optional): override default report template path.
- `verifyCommands` (optional): ordered commands for post-apply verification.

If `verifyCommands` is not provided, verification is recorded as `not_run` rather than inferring repository-specific commands.

## Portability notes

- No hard dependency on HDS repository paths.
- No requirement for `.bob/` at repository root.
- All output artifacts include explicit full paths in final reporting.
