---
applyTo: "packages/tokens/scripts/**"
description: "How the HDS tokens build, transforms, themed outputs, and Carbon extraction work"
---

## Overview

In the tokens package, there are two key build scripts: `build.ts` and `extract-carbon-tokens.ts`. The former orchestrates Style Dictionary for themed and standard token outputs, while the latter regenerates Carbon source JSON inputs.

## Build pipeline

1. Register custom preprocessors, transforms, transform groups, formats, and actions.
2. Clean `dist/`.
3. Build themed product tokens for `default`, `cds-g0`, `cds-g10`, `cds-g90`, and `cds-g100`. Collect resolved mode values for the documentation output.
4. Build the standard `products` and `cloud-email` targets.
5. The package lifecycle runs `postbuild`, copying generated selector-based themed CSS into the showcase assets directory.

[getStyleDictionaryConfig.ts](../../../../packages/tokens/scripts/build-parts/getStyleDictionaryConfig.ts) defines targets, sources, modes, transforms, filters, and destinations:

- Product builds combine Carbon inputs, global tokens, and shared product tokens. Generated names use the `hds` prefix.
- Cloud-email builds select global tokens plus shared product color and typography inputs, rather than all component tokens.

## Generated output

Important destinations:

```text
dist/
  products/css/
    tokens.css
    helpers/
    themed-tokens/
      with-root-selector/<mode>/{common-tokens,themed-tokens}.css
      with-css-selectors/tokens.css
      with-css-selectors--migration/tokens.css
      with-css-selectors--advanced/tokens.css
      with-scss-mixins/tokens.scss
  cloud-email/
    tokens.scss
    helpers/
  docs/products/tokens.json
```

### Product CSS

Product CSS builds generate `tokens.css`, helper files, and themed token stylesheets under `dist/products/css/`. The themed outputs include mode-specific variations with root selectors, CSS selectors, migration, and advanced formats, as well as SCSS mixins.

#### Themed CSS Outputs

Three selector-based bundles support different stages of Carbon migration. Paths below are relative to `dist/products/css/themed-tokens/`.

| File | Themes supported | Carbon modes supported |
| --- | --- | --- |
| `with-css-selectors/tokens.css` | `system`, `light`, `dark` | `cds-g0`, `cds-g100` |
| `with-css-selectors--migration/tokens.css` | `default`, `system`, `light`, `dark` | `cds-g0`, `cds-g100` |
| `with-css-selectors--advanced/tokens.css` | `default`, `system`, `light`, `dark` | `cds-g0`, `cds-g10`, `cds-g90`, `cds-g100` |

- `with-css-selectors/tokens.css`: Recommended for fully Carbon-migrated applications.
- `with-css-selectors--migration/tokens.css`: Adds the classic `default` theme so classic and Carbon styles can coexist during an incremental migration.
- `with-css-selectors--advanced/tokens.css`: Exposes all [four Carbon modes](https://carbondesignsystem.com/elements/themes/overview/) for applications that need custom mode choices for their light or dark theme.

Additional themed outputs:

- `with-root-selector/<mode>/{common-tokens,themed-tokens}.css`: Mode-specific styles with root selectors.
- `with-scss-mixins/tokens.scss`: SCSS mixins for themed tokens.

### Documentation JSON

The documentation JSON is generated under `dist/docs/products/tokens.json`. It includes resolved mode values collected during themed builds and removes mode-specific `comments` metadata. This file serves as a reference for all product tokens and their variants. It is used by the `website` to display token documentation.

### Cloud email

Cloud email builds generate `tokens.scss` and helper files under `dist/cloud-email/`. They include selected global tokens and shared product color and typography inputs, rather than all component tokens.

## Carbon extraction

[extract-carbon-tokens.ts](../../../../packages/tokens/scripts/extract-carbon-tokens.ts) empties `src/carbon-extracted/` and regenerates Carbon color, motion, layout, typography, and theme inputs.

Run extraction only when intentionally refreshing those inputs. Never manually edit the generated JSON, normalize its names to Helios conventions, or treat its structure as the format for hand-authored tokens. Extraction is distinct from the normal token build.

## Validation

Run `pnpm build`, `pnpm lint`, and `pnpm typecheck` after changing token processing. Check both product and cloud-email outputs, all affected modes, documentation JSON, and copied showcase styles. Ensure public names, units, references, private-token filtering, and themed declarations remain correct.

See [source format](tokens/format.instructions.md) before changing metadata handling and [package context](context.instructions.md) for related guidance.
