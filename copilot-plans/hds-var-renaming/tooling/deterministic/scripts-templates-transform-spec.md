# Scripts and Templates Transform Spec (One-Off Monorepo Session)

## Scope

Run on source script/template files only:
- `packages/components/src/**/*.gts`
- `showcase/app/**/*.{gts,hbs,ts,js}`
- `showcase/tests/**/*.{gts,hbs,ts,js}`
- `website/**/*.{gts,hbs,ts,js}` source snippets/templates

Exclude generated outputs.

## Rule

- Match prefix: `--hds-`
- Replace prefix: `--hds-var-`

## Replace in these contexts

1. Style object keys
- `styles['--hds-...']`
- object literals like `{ '--hds-...': value }`

2. Type keys
- `'--hds-...'?: string`

3. Template style helper args
- `{{style --hds-...=...}}`

4. Test and snippet strings
- `hasStyle`/`doesNotHaveStyle` expectations
- style snippets in docs/examples

## Guardrails

- Do not modify `--token-*`
- Do not change logic, expressions, or control flow
- Keep changes strictly mechanical to custom property names
