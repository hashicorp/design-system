---
title: Interactive
category: utilities
component: interactive
section: how-to-use
---

#### Basic use (<button>)

Invocation of the component would look something like this:

```handlebars
<Hds::Interactive>
    your content here (will be yielded)
</Hds::Interactive>
```

In this case, since no `@href` or `@route` argument is provided it will generate in output an HTML `<button>` element.

_Notice: a `type="button"` HTML attribute is applied by default to the element, but this can be overwritten using the "splattributes"._

#### With "@href" parameter (<a>)

**🚨 ATTENTION**: we can't support the direct use of the `href` HTML attribute because we need to rely on the `@href` Ember argument to differentiate between different types of generated output.

If an `@href` argument is provided:

```handlebars
<Hds::Interactive @href="https://google.com">
    your content here
</Hds::Interactive>
```

it will generate in output an HTML `<a>` link element with `target="_blank"` and `rel="noopener noreferrer"` attributes.

_We add these attributes by default because this is the most common case (internal links are generally handled using a `@route` argument). This behavior can be overridden (see below)._

If an `@isHrefExternal` argument is provided with `false` value:

```handlebars
<Hds::Interactive @href="#your-local-anchor-id" @isHrefExternal={{false}}>
    your content here
</Hds::Interactive>
```

it will generate in output an HTML `<a>` link element **without** the HTML `target` and `rel` attributes.

#### With "@route" parameter (<LinkTo>/<LinkToExternal>)

If a `@route` argument is provided:

```handlebars
<Hds::Interactive @route="list" @model="...">
    your content here
</Hds::Interactive>
```

it will generate in output a `<LinkTo>` component.

If the `@route` is external to the current engine ([more details here](https://ember-engines.com/docs/link-to-external)), you need to provide an extra `@isRouteExternal` parameter:

```handlebars
<Hds::Interactive @route="list" @isRouteExternal={{true}} @model="..." >
    your content here
</Hds::Interactive>
```

and it will generate in output a `<LinkToExternal>` component.

_Notice: all the standard arguments for the `<LinkTo/LinkToExternal>` components are supported (eg. `models`, `model`, `query`, `current-when`, `replace`). For more details about these parameters see the [Ember documentation](https://guides.emberjs.com/release/routing/linking-between-routes/#toc_the-linkto--component) or the [LinkTo component API specs](https://api.emberjs.com/ember/release/classes/Ember.Templates.components/methods/input?anchor=LinkTo)._