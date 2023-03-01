## How to use this component

The most basic invocation requires the `@text` argument to be passed, resulting in a medium neutral Badge.

```handlebars
<Hds::Badge @text="Default badge" />
```

### Color

The `@color` argument can be used to change the color.

```handlebars
<Hds::Badge @text="Highlight badge" @color="highlight" />
<Hds::Badge @text="Success badge" @color="success" />
<Hds::Badge @text="Warning badge" @color="warning" />
<Hds::Badge @text="Critical badge" @color="critical" />
```

### Type

Use the `@type` argument to invoke different Badge types. The options are `filled`, `inverted`, `outlined`.

```handlebars
<Hds::Badge @text="Inverted badge" @type="inverted" />
<Hds::Badge @text="Outlined badge" @type="outlined" />
```

### Size

A different size of Badge can be invoked using the `@size` argument.

```handlebars
<Hds::Badge @text="Small badge" @size="small" />
<Hds::Badge @text="Large badge" @size="large" />
```

### Icon

Use the `@icon` argument to pass in the any icon name. Icons always display in the leading (left) position.

```handlebars
<Hds::Badge @text="Terraform" @icon="terraform" />
```

#### isIconOnly

To display an icon without text set the `@isIconOnly` argument to `true`. Defining `@text` is still necessary to conform with accessibility standards but won’t be displayed visually.

```handlebars
<Hds::Badge @text="Terraform" @icon="terraform" @isIconOnly={{true}} />
```
