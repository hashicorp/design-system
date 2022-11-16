---
category: components
group: link
component: inline
section: how-to-use
---

# Link::Inline component - How to use

#### Basic use

The most basic invocation requires some content to be passed as children and one of the two `@href` or `@route` arguments (for details on how URLs and routing are handled see below).

```handlebars
<Hds::Link::Inline @href="...">Watch tutorial video</Hds::Link::Inline>
```

Renders to:

Watch tutorial video

#### Add an icon

To add an icon to your inline link, give the `@icon` a [Flight icon](https://flight-hashicorp.vercel.app/) name:

```handlebars
<Hds::Link::Inline @href="..." @icon="external-link">Watch tutorial video</Hds::Link::Inline>
```

Renders to:

Watch tutorial video

_Notice: since the `Hds::Link::Inline` doesn't have an intrinsic size, the size of the icon is calculated proportionally (via `em`) in relation to the font-size of the text_ .

#### Icon position

By default, if you define an icon, it is placed after the text. If you would like to position the icon before the text, define `@iconPosition`:

```handlebars
<Hds::Link::Inline @href="..." @icon="film" @iconPosition="leading">Watch tutorial video</Hds::Link::Inline>
```

Renders to:

Watch tutorial video

#### Color

There are two available colors for a Link (Inline): `primary` and `secondary`. The default is `primary`. To use a different color, declare another value for `@color`:

```handlebars
<Hds::Link::Inline @color="primary" @href="...">Read tutorial</Hds::Link::Inline>
```

Renders to:

Read tutorial  
Read tutorial

#### URLs and routes handling

You can generate an inline link passing a `@href` or a `@route` to the component. If none of the two is provided, the component will throw an error.

_Notice: the `Link::Inline` component internally uses the generic `Hds::Interactive` component. For more details about how this low-level component works please refer to [its documentation page](/utilities/interactive/01_overview/)._

##### With @href

If you pass a `@href` argument a `<a>` link will be generated:

```handlebars
<Hds::Link::Inline @href="https://www.hashicorp.com/request-demo/terraform">Request a demo</Hds::Link::Inline>
```

Renders to:

Request a demo

⚠️ **Important**: when using the `@href` argument the component adds by default the attributes `target="_blank"` and `rel="noopener noreferrer"` to the `<a>` element (because this is the most common use case: internal links are generally handled using a `@route` argument). If the `href` points to an internal link, or uses a different protocol (eg. "mailto" of "ftp") you can pass `@isHrefExternal={{true}}` to the component and it will not add the `target` and `rel` attributes (but you can pass yours if needed, using the `...attributes` spreading. For more details see the [Hds::Interactive component](/utilities/interactive/01_overview/).

##### With @route

If you pass a `@route` argument a `<a>` link will be generated using a `<LinkTo>` Ember component:

```handlebars
<Hds::Link::Inline @route="my.page.route" @model="my.page.model">Go to the index page</Hds::Link::Inline>
```

Renders to:

Go to the index page

⚠️ **Important**: if the route is external to your current engine you have to pass also `@isRouteExternal={{true}}` to the component so that it will use `<LinkToExternal>` instead of a simple `<LinkTo>` for the `@route`. For more details see the [Hds::Interactive component](/utilities/interactive/01_overview/)

_Notice: all the standard arguments for the `<LinkTo/LinkToExternal>` components are supported (eg. `models/model/query/current-when/replace`)._