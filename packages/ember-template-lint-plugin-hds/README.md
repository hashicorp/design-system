# `@hashicorp/ember-template-lint-plugin-hds`

Catalog-backed `ember-template-lint` rules for direct Helios Design System
component invocations in `.hbs`, `.gts`, and `.gjs` files.

## Install and configure

```sh
pnpm add -D @hashicorp/ember-template-lint-plugin-hds
```

`@hashicorp/design-system-components` and `ember-template-lint` are peer
dependencies. Add the recommended config to `.template-lintrc.mjs`:

```js
export default {
  plugins: ["@hashicorp/ember-template-lint-plugin-hds"],
  extends: ["hds:recommended"],
};
```

The plugin resolves
`@hashicorp/design-system-components/component-catalog.json` from the
consumer. A deterministic or custom catalog can be configured per rule:

```js
export default {
  plugins: ["@hashicorp/ember-template-lint-plugin-hds"],
  rules: {
    "no-unknown-arguments": { catalogPath: "./component-catalog.json" },
  },
};
```

Missing or malformed configured catalogs fail linting explicitly.

## Rules

- `no-unknown-arguments` checks named arguments and safely fixes an
  unambiguous close typo such as `@colro` to `@color`.
- `valid-static-argument-values` checks text and string literals against
  catalog `values` and `valuesRef` metadata. It reports allowed values and
  safely fixes a single close match.
- `valid-argument-combinations` applies a small extensible policy list. The
  MVP enforces the component runtime constraint that
  `<Hds::Button @color="tertiary">` requires `@icon`.

## MVP scope

Only direct angle-bracket `Hds::*` invocations are analyzed. Dynamic component
names, yielded/contextual components, curly invocations, dynamic argument
values, required arguments in general, and type checking remain out of scope.
Glint remains the source of truth for TypeScript-level checking.
