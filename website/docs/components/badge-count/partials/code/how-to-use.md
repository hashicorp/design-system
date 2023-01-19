## How to use this component

The default invocation requires a text argument and renders a medium neutral filled Badge Count.

```handlebars
<Hds::BadgeCount @text="3" />
```

### Type

A different type of Badge Count can be invoked using the `@type` argument.

```handlebars
<Hds::BadgeCount @text="3" @type="inverted" />
```

```handlebars
<Hds::BadgeCount @text="3" @type="outlined" />
```

### Size

A different size of Badge Count can be invoked using the `@size` argument.

```handlebars
<Hds::BadgeCount @text="3" @size="small" />
```

```handlebars
<Hds::BadgeCount @text="3" @size="large" />
```

### Color

A different color of Badge Count can be invoked using the `@color` argument.

```handlebars
<Hds::BadgeCount @text="3" @color="neutral-dark-mode" />
```
