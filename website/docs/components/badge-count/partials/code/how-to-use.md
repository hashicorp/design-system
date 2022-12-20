## How to use this component

Use `BadgeCount` as a numeric label to display version numbers, collection counts in tabs, and similar information. For non-numeric information, use [Badge](/components/badge/).

### Basic
The most basic invocation requires the text argument to be passed. By default, a filled, medium size, neutral color badgeCount is generated.

```handlebars
<Hds::BadgeCount @text="3" />
```

### Type

A different type of badgeCount can be invoked using the type argument.

```handlebars
<Hds::BadgeCount @text="3" @type="inverted" />
```

### Size

A different size of badgeCount can be invoked using the size argument.

```handlebars
<Hds::BadgeCount @text="3" @size="large" />
```

### Color

A different color of badgeCount can be invoked using the color argument.

```handlebars
<Hds::BadgeCount @text="3" @color="neutral-dark-mode" />
```