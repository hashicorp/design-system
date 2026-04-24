# Helios Design System

## Packages (pnpm workspaces)

| Package | Type | Entry point |
|---|---|---|
| `packages/components` | Ember.js addon | `@hashicorp/design-system-components` |
| `packages/tokens` | Design tokens (Style Dictionary) | `@hashicorp/design-system-tokens` |
| `packages/flight-icons` | Icon library (syncs from Figma) | `@hashicorp/flight-icons` |
| `showcase` | Test app for components | — |
| `website` | Docs site | — |

## Commands

```bash
# Root
pnpm install
pnpm lint           # lint all packages
pnpm format         # format all packages
pnpm changeset      # create changeset entry
```

```bash
# Components package
cd packages/components && pnpm build          # build addon output
cd packages/components && pnpm start           # watch mode
cd packages/components && pnpm lint             # JS/HBS/CSS/Glint
cd packages/components && pnpm lint:fix
```

```bash
# Testing — ALWAYS in showcase (components must be built first)
cd showcase && pnpm test:ember               # run tests
cd showcase && pnpm test:ember:percy          # with Percy visual regression
cd showcase && pnpm test:ember --server       # watch mode
cd showcase && pnpm ember try:each            # test across Ember versions
```

```bash
# Website
cd website && pnpm start
```

```bash
# Tokens
cd packages/tokens && pnpm build             # run Style Dictionary
```

```bash
# Flight icons
cd packages/flight-icons && pnpm sync        # fetch from Figma (requires FIGMA_TOKEN in .env)
cd packages/flight-icons && pnpm build       # process and bundle SVGs
```

## Key ordering constraints

- **Build before test**: `pnpm build` in `packages/components` must run before `pnpm test:ember` in `showcase` (or use `pnpm test`, which chains them).
- Showcase and website both run `build:packages` which builds `packages/components` first.
- Changesets ignore `showcase` and `website` — only publish the 3 packages.

## Versioning & releases

```bash
pnpm changeset              # interactive prompt to create changeset
pnpm version-packages       # bump versions + update pnpm-lock + generate changelogs
pnpm release-packages       # publish to npm
pnpm version-candidate-packages && pnpm release-candidate-packages  # RC flow
```

## Component registration

New HDS components require updates in two files:
- `packages/components/src/components.ts` — export the component class and types. it does not export any of the component constants.
- `packages/components/src/template-registry.ts` — register in `HdsComponentsRegistry` interface

## Component file structure (`packages/components/src/components/hds/`)

**Required:**
- `index.gts` — main component class and template
- `types.ts` — TypeScript `Args` and `Blocks` interfaces

**Subcomponents:**
- `{name}.gts` and optionally `{name}.ts`

## CSS / SCSS conventions

- Class names: `hds-<component>__<element>--<modifier>` (BEM). E.g. `hds-accordion__item--color-primary`
- Never hardcode colors, spacing, typography — use HDS tokens from `packages/tokens/dist/products/css/tokens.css`
- SCSS file structure: `{component-name}.scss` or `{component-name}/index.scss` for subcomponents

## Showcase file structure (`showcase/`)

**Required for each component:**
- `app/components/page-components/<component-name>/index.gts` — showcase index component
- `app/components/page-components/<component-name>/sub-sections/*.gts` — sectioned examples
- `app/components/page-components/<component-name>/code-fragments/*.gts` — reusable examples
- `app/templates/page-components/<component-name>.gts` — page template
- Routes must be added to `showcase/app/router.ts`

Showcase must demonstrate all argument values (including booleans as both `true` and `false`), all blocks, and all interactive states. Use arrow functions instead of `@action` for event handlers.

The showcase pages must not have glint no check, there can be glint expect errors with comments explaining why it is necessary.

## Test file structure (`showcase/tests/`)

- `acceptance/components/hds/<component-name>.js` — acceptance test (call `allyAudit` for a11y)
- `integration/components/hds/<component-name>/index-test.js` — integration test (QUnit)

Integration tests must cover: CSS class renders, all argument values (booleans both `true`/`false`, enums all values), all blocks, keyboard/function interactions.

Add components with acceptance tests to `tests/acceptance/percy-test.js` using `percySnapshot('ComponentName')`.

## Changeset entry format (`.changesets/`)

```markdown
<!-- START {components/path} -->
`ComponentName` - Past tense description of the change.
<!-- END -->
```

Terminology: Fixed (bugfix), Added (new), Changed/Refactored (update), Removed (delete).
Start with a paragraph, use a list for multiple changes per component, end with a period.


## Development process
any time there are any changes to `packages/components/src/`, must run `pnpm lint` to ensure nothing breaks across the components, showcase, or website. Code changes are not complete until all the lint checks pass.