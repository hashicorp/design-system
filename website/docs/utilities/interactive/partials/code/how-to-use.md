!!! Warning

This component is intended only for internal Helios use. If you need to use it, contact the Design Systems Team.
!!!

## How to use this component

### Default use for `<button>`

When no `@href` or `@route` arguments are provided, it generates an HTML `<button>` element. 

The `type=“button”` HTML attribute is applied to the element by default, but can be overwritten using the “splattributes”.

```handlebars{data-execute=false}
<Hds::Interactive>
    your content here (will be yielded)
</Hds::Interactive>
```

### With `@href` parameter for `<a>`

!!! Critical

We can’t support direct use of the `href` HTML attribute because we rely on the `@href` Ember argument to differentiate between different types of generated output.
!!!

Provide an `@href` argument to generate an HTML `<a>` link element.

`target=“_blank”` and `rel=“noopener noreferrer”` attributes are applied by default. This is the most common case, as internal links are generally handled using a `@route` argument but can be overridden.

```handlebars{data-execute=false}
<Hds::Interactive @href="https://google.com">
    your content here
</Hds::Interactive>
```

#### Adding `@isHrefExternal={{false}}`

Provide an `@isHrefExternal` argument to generate an HTML `<a>` link element **without** the HTML `target` and `rel` attributes.

```handlebars{data-execute=false}
<Hds::Interactive @href="#your-local-anchor-id" @isHrefExternal={{false}}>
    your content here
</Hds::Interactive>
```

### With `@route` parameter for `<LinkTo>`/`<LinkToExternal>`

All the standard arguments for the `<LinkTo>`/`<LinkToExternal>` components are supported (e.g., `models`, `model`, `query`, `current-when`, `replace`). For more details about these parameters see the [Ember documentation](https://guides.emberjs.com/release/routing/linking-between-routes/#toc_the-linkto--component) or the [LinkTo component API specs](https://api.emberjs.com/ember/release/classes/Ember.Templates.components/methods/input?anchor=LinkTo).

#### For `<LinkTo>`

Provide a `@route` argument to generate a `<LinkTo>` component.

```handlebars{data-execute=false}
<Hds::Interactive @route="components">
    your content here
</Hds::Interactive>
```

#### For `<LinkToExternal>`

When the `@route` is external to the current engine, provide the `@isRouteExternal` parameter to generate a `<LinkToExternal>` component. Learn more about [LinkToExternal](https://ember-engines.com/docs/link-to-external).

```handlebars{data-execute=false}
<Hds::Interactive @route="components" @isRouteExternal={{true}}>
    your content here
</Hds::Interactive>
```
