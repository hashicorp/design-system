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
  unambiguous close typo such as `@colro` to `@color`. It also applies a
  small allowlist of component-aware migrations from obsolete named
  arguments to current named or native attributes for Button, Link, and
  selected Form fields. Conditional Link aliases only fix when exactly one
  of `@href` and `@route` is present. It also migrates the removed Dropdown
  Interactive `@text` argument to block content for direct invocations and
  contextual invocations yielded from `<Hds::Dropdown>`.
- `valid-static-argument-values` checks text and string literals against
  catalog `values` and `valuesRef` metadata. It reports allowed values and
  safely fixes explicit value aliases, unique case-only matches, and then a
  single close fuzzy match, in that precedence order. The initial explicit
  alias migrates `Hds::Time @display="Friendly"` (or `"friendly"`) to
  `"friendly-only"`.
- `valid-argument-combinations` applies a small extensible policy list. The
  MVP enforces the component runtime constraint that
  `<Hds::Button @color="tertiary">` requires `@icon`.

## MVP scope

Only direct angle-bracket `Hds::*` invocations are generally analyzed. The
removed Dropdown Interactive `@text` API is the sole contextual exception:
the rule tracks the lexical block parameter of an enclosing
`<Hds::Dropdown>` and handles nested scopes and shadowing. Dynamic component
names, other yielded/contextual components, curly invocations, dynamic
argument values outside this migration, required arguments in general, and
type checking remain out of scope. Glint remains the source of truth for
TypeScript-level checking.

Autofixes are deliberately conservative and suppressed when a destination
attribute already exists or a conditional migration is ambiguous. Unlisted
Atlas candidates remain diagnostic-only, including layout dimensions,
pagination and table APIs, loading flags, CodeBlock plaintext, RadioCard
fixed values, and uncertain SuperSelect or TooltipButton migrations.

For a simple `{{this.foo}}` argument, the value and combination rules can
resolve a string-literal public instance field or a getter containing exactly
one string-literal return. Embedded `.gts`/`.gjs` templates use their own
default-export class; `.hbs` files use one unambiguous same-basename `.ts` or
`.js` sibling. These findings identify the backing member and recommended
template value, but are diagnostics only and are never autofixed. Files with
multiple embedded templates, ambiguous sibling files, or a template buffer
that differs from disk are skipped. Resolution is save-based and CLI-oriented:
it cannot inspect unsaved backing-class edits. Imports, inheritance, methods,
expressions, templates, static/private/computed/duplicate members, ambiguous
default exports, and arbitrary module traversal remain out of scope.

Unknown arguments are renamed or converted only by the explicit policies
listed above (or by a uniquely safe typo correction). The Dropdown Interactive
`@text` migration preserves text, paths, helpers and hashes, conditionals,
literal mustaches, and concatenated values as block content. If substantive
block content already exists, the removed no-op argument is deleted without
duplicating content. Ambiguous or unsupported shapes remain unchanged and
direct users to
`@hashicorp/design-system-codemods v4/dropdown-list-item-interactive`.
No other unknown argument is deleted.
