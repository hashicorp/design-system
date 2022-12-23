## How to use this component

The most basic invocation requires some content to be passed as children and one of the two `@href` or `@route` arguments (for details on how URLs and routing are handled see below).

```handlebars
<Hds::Link::Inline @href="...">Watch tutorial video</Hds::Link::Inline>
```

### Icon

To add an icon to your inline link, give the `@icon` an [icon](/foundations/icons/) name.

```handlebars
<Hds::Link::Inline @href="..." @icon="external-link">Watch tutorial video</Hds::Link::Inline>
```

Since the `Hds::Link::Inline` doesn’t have an intrinsic size, the size of the icon is calculated proportionally (via `em`) in relation to the font-size of the text.

### Icon position

By default, if you define an icon, it is placed after the text. If you would like to position the icon before the text, define `@iconPosition`.

```handlebars
<Hds::Link::Inline @href="..." @icon="film" @iconPosition="leading">Watch tutorial video</Hds::Link::Inline>
```

### Color

There are two available colors for a Link (Inline): `primary` and `secondary`. The default is `primary`. To use a different color, declare another value for `@color`.

```handlebars
<Hds::Link::Inline @color="primary" @href="...">Read tutorial</Hds::Link::Inline>
```

### URLs and routes handling

You can generate an inline link passing a `@href` or a `@route` to the component. If none of the two is provided, the component will throw an error.

The `Link::Inline` component internally uses the generic `Hds::Interactive` component. For more details about how this low-level component works please refer to [its documentation page](/utilities/interactive/).

#### With `@href`

If you pass a `@href` argument a `<a>` link will be generated:

```handlebars
<Hds::Link::Inline @href="https://www.hashicorp.com/request-demo/terraform">Request a demo</Hds::Link::Inline>
```

**Important**: when using the `@href` argument the component adds by default the attributes `target="_blank"` and `rel="noopener noreferrer"` to the `<a>` element (because this is the most common use case: internal links are generally handled using a `@route` argument). If the `href` points to an internal link, or uses a different protocol (eg. "mailto" of "ftp") you can pass `@isHrefExternal={{true}}` to the component and it will not add the `target` and `rel` attributes (but you can pass yours if needed, using the `...attributes` spreading. For more details see the [Hds::Interactive component](/utilities/interactive/).

#### With `@route`

If you pass a `@route` argument a `<a>` link will be generated using a `<LinkTo>` Ember component:

```handlebars
<Hds::Link::Inline @route="my.page.route" @model="my.page.model">Go to the index page</Hds::Link::Inline>
```

!!! Info

If the route is external to your current engine you have to pass also `@isRouteExternal={{true}}` to the component so that it will use `<LinkToExternal>` instead of a simple `<LinkTo>` for the `@route`. For more details see the [Hds::Interactive component](/utilities/interactive/).
!!!

All the standard arguments for the `<LinkTo/LinkToExternal>` components are supported (eg. `models/model/query/current-when/replace`).
