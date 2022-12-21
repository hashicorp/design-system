## How to use

### Basic

For a neutral text-based Badge, just pass in text.

```handlebars
<Hds::Badge @text="Simple badge" />
```

### Color

The color argument can be used to change the color from the default neutral value.

```handlebars
<Hds::Badge @text="Success badge" @color="success" />
```

### Icon

Use the icon argument to pass in the name of an icon to be displayed to the left of text.

```handlebars
<Hds::Badge @text="With text" @icon="terraform" />
```

### isIconOnly

To display an icon without text set the `isIconOnly` argument to true. Text is still necessary for accessibility but it won’t be displayed visually.

```handlebars
<Hds::Badge @text="With text" @icon="terraform" @isIconOnly={{true}} />
```

### Size

A different size of Badge can be invoked using the `size` argument.

```handlebars
<Hds::Badge @text="Large badge" @size="large" />
```

### Type

Use the `type` argument to invoke different Badge types.

```handlebars
<Hds::Badge @text="Outlined badge" @type="outlined" />
```