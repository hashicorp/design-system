---
category: components
component: tag
section: how-to-use
---

# Tag component - How to use

Use tags to indicate an object's categorization, i.e., for filtering. Use a [badge](/components/badge/01_overview/) instead for static metadata, status, or to indicate a new feature.

#### Basic use

Invocation of the component would look something like this:

```handlebars
<Hds::Tag @text="My text tag" @onDismiss={{this.yourOnDismissFunction}} />
```

In this case, since no `@href` or `@route` argument is provided it will render the tag as plain text.

Renders to:

#### Color

There are two available colors for a link: `primary` and `secondary`. The default is `primary`.

```handlebars
<Hds::Tag @color="primary" @text="My link tag" @href="#" @onDismiss={{this.yourOnDismissFunction}} />
```

Renders to:

#### Dismiss

In most cases the tag needs to be dismissable. If you don't provide a callback function to the `onDismiss` argument the "dismiss/remove" button will not be rendered.

```handlebars
<Hds::Tag @color="primary" @text="My link tag" @href="#" />
```

Renders to: