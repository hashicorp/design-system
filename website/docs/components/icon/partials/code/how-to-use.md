## How to use this component

The most basic invocation of the Icon component requires only the `@name` property to be passed with a value matching an existing name in [the Icon library](/icons/library):

```handlebars
<Hds::Icon @name="alert-circle" />
```

It renders to this (where the `id` will be unique each time):

```markup
<svg
    id="icon-ember115"
    class="hds-icon icon-alert-circle"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    aria-hidden="true"
    data-test-icon="alert-circle"
>
    <use href="/@hashicorp/flight-icons/icons/sprite.svg#alert-circle-16"></use>
</svg>
```

Because the icons are hidden to assistive technology, they cannot be used on their own and must be used inside of an element with an accessible name. See the [Accessibility](/components/icon?tab=accessibility) section for more details on how to best use this component in different contexts.

### Size

The default size is 16px. To use the alternative 24px icon size, set the `@size` value:

```handlebars
<Hds::Icon @name="zap" @size="24" />
```

### Color

The default value is `currentColor` which uses the inherited text color as the icon color. When setting a custom value, we recommend using one of the pre-defined variables to ensure consistency with our design language:

```handlebars
<Hds::Icon @name="zap" @color="var(--token-color-foreground-success)" />
```

Other accepted values include named colors and color values themselves (e.g., hex, rgb, etc).

```handlebars
<Hds::Icon @name="zap" @color="rebeccapurple" />
```

```handlebars
<Hds::Icon @name="zap" @color="rgb(46, 113, 229)" />
```

### Stretched

To have the icon fill the parent container (width: 100%, height: 100%), set the `@stretched` attribute to true:

```handlebars
<div class="doc-icon-demo--constrain-max-width">
    <Hds::Icon @name="zap" @size="24" @stretched={{true}} />
</div>
```

### isInline

To change the default display from `block` to `inline-block`, set `@isInline` to true:

```handlebars
<Hds::Icon @name="triangle" @isInline={{true}} />
<Hds::Icon @name="triangle-fill" @isInline={{true}} />
```

### Aligning icons

Since the `Hds::Icon` component has a `block` display value by default (changeable using the `@isInline` argument), this means that the icon behaves like a block element. So, if you want to horizontally align it in relation to other sibling elements, you will have to use CSS to achieve the expected result.

For example, to visually center an icon with a generic text node, you will need to use a parent `flex` container with `align-items: center`.

!!! Warning

**Avoid using `vertical-align: middle`**

Just setting `vertical-align: middle` in the parent container doesn’t necessarily achieve a vertical alignment.

This is because the [`middle` alignment](https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align#middle) is not calculated in relation to the whole text “block” but to its “x-height”. To learn more, read about [how `vertical-align` works in CSS](https://www.impressivewebs.com/css-vertical-align/).
!!!

### Animated icons

The [loading](/icons/library?searchQuery=icon%3Aloading) and [running](/icons/library?searchQuery=icon%3Arunning) icons are animated by default, meaning no additional properties are needed:

```handlebars
<Hds::Icon @name="loading" @size="24" />
```

If you need the non-animated version of these icons use the corresponding [loading-static](/icons/library?searchQuery=icon%3Aloading-static) and [running-static](/icons/library?searchQuery=icon%3Arunning-static):

```handlebars
<Hds::Icon @name="loading-static" @size="24" />
```

!!! Information

**Note on accessibility**

A `prefers-reduced-motion` media query will automatically disable the animation if users set this preference in their environment.

!!!
