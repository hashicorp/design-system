The Standalone Link handles the generation of:

- an HTML anchor element `<a>` that points to an external URL (when using a `@href` argument)
- an [Ember component `<LinkTo>`](https://guides.emberjs.com/release/routing/linking-between-routes/#toc_the-linkto--component) that points to an internal application link or resource (when using a `@route` argument)

!!! Info

**Differences between Figma and code**

Due to differences in text rendering between Figma and web browsers, the `Link::Standalone` Ember component uses `font-weight` 400 vs. the Figma component which uses `font-weight` 500.
!!!

## How to use this component

The most basic invocation requires both `@icon` and `@text`, and either an `@href` or `@route` argument.

```handlebars
<Hds::Link::Standalone @icon="film" @text="Watch tutorial video" @href="..." />
```

### Icon position

By default the icon is placed before the text. If you would like to position it after the text, set `@iconPosition` to `trailing`.

```handlebars
<Hds::Link::Standalone @icon="film" @iconPosition="trailing" @text="Watch tutorial video" @href="..." />
```

### Color

There are two available colors for a Standalone Link: `primary` and `secondary`. The default is `primary`. To use the other option, set `@color` to `secondary`.

```handlebars
<Hds::Link::Standalone @color="secondary" @icon="collections" @text="Read tutorial" @href="..." />
```  

### Size

There are three sizes available: `small`, `medium`, and `large`. The default is `medium`. To use a different size, set a value for `@size`:

```handlebars
<Hds::Link::Standalone @icon="collections" @text="Read tutorial" @size="small" @href="..." />
```

```handlebars
<Hds::Link::Standalone @icon="collections" @text="Read tutorial" @size="large" @href="..." />
```

### URL and route handling

To generate an Inline Link, pass an `@href` or `@route` argument to the component. If neither are provided, the component will throw an error.

Standalone Links use the generic `Hds::Interactive` component. Learn more about [how the Interactive utility component works](/utilities/interactive).

#### With `@href`

To generate an `<a>` link, pass an `@href` argument with a URL as the value. 

`target=“_blank”` and `rel=“noopener noreferrer”` attributes are applied by default. This is the most common case, as internal links are generally handled using a `@route` argument. 

```handlebars
<Hds::Link::Standalone @icon="terraform" @text="Request a demo" @href="https://www.hashicorp.com/request-demo/terraform" />
```

#### With `@route`

All the standard arguments for the `<LinkTo/LinkToExternal>` components are supported (eg. `models/model/query/current-when/replace`).

##### For `<LinkTo>`

To generate an `<a>` link using a `<LinkTo>` Ember component, pass a `@route` argument. 

```handlebars
<Hds::Link::Standalone @icon="collections" @text="Go to the index page" @route="my.page.route" @model="my.page.model" />
```

##### For `<LinkToExternal>`

If the route is external to your current engine, pass `@isRouteExternal={{true}}` to the component so that it will use `<LinkToExternal>` instead of `<LinkTo>`.