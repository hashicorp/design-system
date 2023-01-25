## How to use this component

The most basic invocation requires some content to be passed as children and either an `@href` or `@route` argument.

```handlebars
<Hds::Link::Inline @href="...">Watch tutorial video</Hds::Link::Inline>
```

### Color

There are two available colors for a Inline Link: `primary` and `secondary`. The default is `primary`. To use a different color, set `@color` to `secondary`.

```handlebars
<Hds::Link::Inline @color="primary" @href="...">Read tutorial</Hds::Link::Inline>
```

```handlebars
<Hds::Link::Inline @color="secondary" @href="...">Read tutorial</Hds::Link::Inline>
```

### Icon

To add an icon to your inline link, give the `@icon` argument any Helios [icon](/icons/library/library) name.

`Hds::Link::Inline` does not have an intrinsic size. Instead, the size of the icon is calculated proportionally (via `em`) in relation to the font-size of the text.

```handlebars
<Hds::Link::Inline @href="..." @icon="external-link">Watch tutorial video</Hds::Link::Inline>
```

### Icon position

By default, if you define an icon, it‘s placed in the trailing (right) position. If you would like to position the icon in the leading (left) position, define `@iconPosition`.

```handlebars
<Hds::Link::Inline @href="..." @icon="film" @iconPosition="leading">Watch tutorial video</Hds::Link::Inline>
```

### URL and route handling

To generate an Inline Link, pass an `@href` or `@route` argument to the component. If neither are provided, the component will throw an error.

Inline Links use the generic `Hds::Interactive` component. Learn more about [how the Interactive utility component works](/utilities/interactive/).

#### With `@href`

To generate an `<a>` link, pass an `@href` argument with a URL as the value. 

`target=“_blank”` and `rel=“noopener noreferrer”` attributes are applied by default. This is the most common case, as internal links are generally handled using a `@route` argument. 

```handlebars
<Hds::Link::Inline @href="https://www.hashicorp.com/request-demo/terraform">Request a demo</Hds::Link::Inline>
```

If the `@href` argument points to an internal link, or uses a different protocol (e.g., "mailto" of "ftp"), pass `@isHrefExternal={{true}}` to the component and it will omit the `target` and `rel` attributes.

#### With `@route` 

All the standard arguments for the `<LinkTo/LinkToExternal>` components are supported (e.g., `models/model/query/current-when/replace`).

##### For `<LinkTo>`

To generate an `<a>` link using a `<LinkTo>` Ember component, pass a `@route` argument. 

```handlebars
<Hds::Link::Inline @route="my.page.route" @model="my.page.model">Go to the index page</Hds::Link::Inline>
```

##### For `<LinkToExternal>`

If the route is external to your current engine, passing `@isRouteExternal={{true}}` to the component will use `<LinkToExternal>` instead of `<LinkTo>`.
