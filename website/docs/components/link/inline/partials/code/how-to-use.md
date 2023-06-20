## How to use this component

The most basic invocation requires some content to be passed as children and either an `@href` or `@route` argument.

```handlebars
<div class="hds-typography-body-300">
  Lorem <Hds::Link::Inline @href="...">ipsum dolor</Hds::Link::Inline> sit amet consectetur adipiscing elit.
</div>
```

### Color

There are two available colors for an Inline Link: `primary` and `secondary`. The default is `primary`. To use a different color, set `@color` to `secondary`.

```handlebars
<div class="hds-typography-body-300">
  Lorem <Hds::Link::Inline @color="primary" @href="...">ipsum dolor</Hds::Link::Inline> sit amet consectetur adipiscing elit.
</div>
```

```handlebars
<div class="hds-typography-body-300">
  Lorem <Hds::Link::Inline @color="secondary" @href="...">ipsum dolor</Hds::Link::Inline> sit amet consectetur adipiscing elit.
</div>
```

### Icon

To add an icon to the Inline Link, give the `@icon` argument any [icon](/icons/library) name.

`Hds::Link::Inline` does not have an intrinsic size. Instead, the size of the icon is calculated proportionally (via `em`) in relation to the font-size of the text.

```handlebars
<div class="hds-typography-body-300">
  Lorem <Hds::Link::Inline @color="primary" @icon="external-link" @href="...">ipsum dolor</Hds::Link::Inline> sit amet consectetur adipiscing elit.
</div>
```

### Icon position

By default, if you define an icon, it‘s placed in the trailing (end) position. If you would like to position the icon in the leading (start) position, define `@iconPosition`.

```handlebars
<div class="hds-typography-body-300">
  Lorem <Hds::Link::Inline @color="primary" @icon="external-link" @iconPosition="leading" @href="...">ipsum dolor</Hds::Link::Inline> sit amet consectetur adipiscing elit.
</div>
```

### URL and route handling

To generate an Inline Link, pass an `@href` or `@route` argument to the component. If neither are provided, the component will throw an error.

Inline Links use the generic `Hds::Interactive` component. Learn more about [how the Interactive utility component works](/utilities/interactive/).

#### With `@href`

To generate an `<a>` link, pass an `@href` argument with a URL as the value. 

`target=“_blank”` and `rel=“noopener noreferrer”` attributes are applied by default. This is the most common case, as internal links are generally handled using a `@route` argument. 

```handlebars
<div class="hds-typography-body-300">
  Lorem <Hds::Link::Inline @color="primary" @icon="external-link" @href="https://www.hashicorp.com">ipsum dolor</Hds::Link::Inline> sit amet consectetur adipiscing elit.
</div>
```

If the `@href` argument points to an internal link, or uses a different protocol (e.g., "mailto" of "ftp"), pass `@isHrefExternal={{true}}` to the component and it will omit the `target` and `rel` attributes.

#### With `@route` 

All the standard arguments for the `<LinkTo/LinkToExternal>` components are supported (e.g., `models/model/query/current-when/replace`).

##### For `<LinkTo>`

To generate an `<a>` link using a `<LinkTo>` Ember component, pass a `@route` argument. 

```handlebars
<div class="hds-typography-body-300">
  Lorem <Hds::Link::Inline @route="my.page.route" @model="my.page.model">ipsum dolor</Hds::Link::Inline> sit amet consectetur adipiscing elit.
</div>
```

##### For `<LinkToExternal>`

If the route is external to your current engine, passing `@isRouteExternal={{true}}` to the component will use `<LinkToExternal>` instead of `<LinkTo>`.
