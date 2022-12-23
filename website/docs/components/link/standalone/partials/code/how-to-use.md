## How to use this component

The most basic invocation requires both `icon` and `text` to be passed and one of the two `@href` or `@route` arguments.

```handlebars
<Hds::Link::Standalone @icon="film" @text="Watch tutorial video" @href="..." />
```

### Icon position

By default the icon is placed before the text. If you would like to position it after the text, define `@iconPosition`:

```handlebars
<Hds::Link::Standalone @icon="film" @iconPosition="trailing" @text="Watch tutorial video" @href="..." />
```

### Color

There are two available colors for a Link (Standalone): `primary` and `secondary`. The default is `primary`. To use a different color, declare another value for `@color`:

```handlebars
<Hds::Link::Standalone @color="primary" @icon="collections" @text="Read tutorial" @href="..." />
```  

### Size

There are three sizes available: `small`, `medium` and `large`. The default is `medium`. To use a different size, declare a value for `@size`:

```handlebars
<Hds::Link::Standalone @icon="collections" @text="Read tutorial" @size="small" @href="..." />
```

### URLs and routes handling

You can generate a standalone link passing a `@href` or a `@route` to the component. If none of the two is provided, the component will throw an error.

!!! Info

The `Link::Standalone` component internally uses the generic `Hds::Interactive` component. For more details about how this low-level component works please refer to [its documentation page](/utilities/interactive/).
!!!

#### With @href

If you pass a `@href` argument a `<a>` link will be generated:

```handlebars
<Hds::Link::Standalone @icon="terraform" @text="Request a demo" @href="https://www.hashicorp.com/request-demo/terraform" />
```

!!! Info

When using the `@href` argument the component adds by default the attributes `target="_blank"` and `rel="noopener noreferrer"` to the `<a>` element (because this is the most common use case: internal links are generally handled using a `@route` argument). If the `href` points to an internal link, or uses a different protocol (eg. "mailto" of "ftp") you can pass `@isHrefExternal={{true}}` to the component and it will not add the `target` and `rel` attributes (but you can pass yours if needed, using the `...attributes` spreading. For more details see the [Hds::Interactive component](/utilities/interactive/).
!!!

#### With @route

If you pass a `@route` argument a `<a>` link will be generated using a `<LinkTo>` Ember component:

```handlebars
<Hds::Link::Standalone @icon="collections" @text="Go to the index page" @route="my.page.route" @model="my.page.model" />
```

!!! Info 

If the route is external to your current engine you have to pass also `@isRouteExternal={{true}}` to the component so that it will use `<LinkToExternal>` instead of a simple `<LinkTo>` for the `@route`. For more details see the [Hds::Interactive component](/utilities/interactive/)
!!!

!!! Info

All the standard arguments for the `<LinkTo/LinkToExternal>` components are supported (eg. `models/model/query/current-when/replace`).
!!!