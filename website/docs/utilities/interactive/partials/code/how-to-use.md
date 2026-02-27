!!! Callout

This component is intended only for internal Helios use. If you need to use it, [contact the Design Systems Team](/about/support).
!!!

## How to use this component

### Default use for `<button>`

When no `@href` or `@route` arguments are provided, it generates an HTML `<button>` element.

The `type=“button”` HTML attribute is applied to the element by default, but can be overwritten using the “splattributes”.

[[code-snippets/interactive-button execute=false]]

### With `@href` parameter for `<a>`

!!! Critical

We can’t support direct use of the `href` HTML attribute because we rely on the `@href` Ember argument to differentiate between different types of generated output.
!!!

Provide an `@href` argument to generate an HTML `<a>` link element.

By default, the link is considered "external", which means that the `target=“_blank”` and `rel=“noopener noreferrer”` attributes are applied to the `<a>` element. This is the most common case, as internal links are generally handled using a `@route` argument.

[[code-snippets/interactive-href execute=false]]

#### Adding `@isHrefExternal={{false}}`

If the `@href` points to an internal link, or uses a different protocol (e.g., "mailto" or "ftp"), pass `@isHrefExternal={{false}}` to the component and it will omit the `target` and `rel` attributes.

[[code-snippets/interactive-external-false execute=false]]

### With `@route` parameter for `<LinkTo>`/`<LinkToExternal>`

All the standard arguments for the `<LinkTo>`/`<LinkToExternal>` components are supported (e.g., `models`, `model`, `query`, `current-when`, `replace`). For more details about these parameters see the [Ember documentation](https://guides.emberjs.com/release/routing/linking-between-routes/#toc_the-linkto--component) or the [LinkTo component API specs](https://api.emberjs.com/ember/release/classes/Ember.Templates.components/methods/input?anchor=LinkTo).

#### For `<LinkTo>`

Provide a `@route` argument to generate a `<LinkTo>` component.

[[code-snippets/interactive-route execute=false]]

#### For `<LinkToExternal>`

When the `@route` is external to the current engine, provide the `@isRouteExternal` parameter to generate a `<LinkToExternal>` component. Learn more about [LinkToExternal](https://ember-engines.com/docs/link-to-external).

[[code-snippets/interactive-link-external execute=false]]
