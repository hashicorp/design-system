# Stylesheets Transform Spec (One-Off Monorepo Session)

## Scope

Run on source stylesheet files only:
- `packages/components/src/**/*.scss`
- any additional in-scope source `.css/.scss` paths

Exclude generated outputs.

## Rule

- Match prefix: `--hds-`
- Replace prefix: `--hds-var-`

Apply to:
1. Declaration names (`--hds-foo: ...`)
2. `var(--hds-foo)` usages
3. `var(--hds-foo, fallback)` usages
4. Interpolated suffix variants (for example `--hds-foo-#{$view}`) by prefix only

## Guardrails

- Do not rename `--token-*`
- Do not rename Sass variables (for example `$hds-*`)
- Do not alter values/units/layout logic

## Validation focus

After stylesheet pass, run residual scan in stylesheet scope and verify no missed `--hds-` in source style files.
