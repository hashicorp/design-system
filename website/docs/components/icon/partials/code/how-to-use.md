## How to use this component

The most basic invocation of the Icon component requires only the `@name` property to be passed with a value matching an existing name in [the Icon library](/icons/library):

[[code-snippets/icon-basic]]

It renders to this (where the `id` will be unique each time):

[[code-snippets/icon-rendered execute=false]]

Because the icons are hidden to assistive technology, they cannot be used on their own and must be used inside of an element with an accessible name. See the [Accessibility](/components/icon?tab=accessibility) section for more details on how to best use this component in different contexts.

### Size

The default size is 16px. To use the alternative 24px icon size, set the `@size` value:

[[code-snippets/icon-size]]

### Color

!!! Warning

**Consumer responsibility**

We don’t validate the CSS color string to ensure that the value used is correct.
!!!

The default value is `currentColor` which uses the inherited text color as the icon color. When setting a custom value, we recommend using one of the pre-defined **foreground** color variables to ensure consistency with our design language:

[[code-snippets/icon-color]]

For the list of possible foreground colors supported, refer to the [Component API](#component-api) section for details.

It’s also possible to provide a CSS color as a string (in this case the color will be applied as SVG `fill` property). The string can be a CSS `var()` that uses one of the [predefined color tokens](/foundations/colors?tab=palette):

[[code-snippets/icon-color-token]]

Or it can be one of the standard CSS color formats (hex, rgb, rgba, hsl, named color, etc.):

[[code-snippets/icon-color-custom]]

### Stretched

To have the icon fill the parent container (width: 100%, height: 100%), set the `@stretched` attribute to true:

[[code-snippets/icon-stretched]]

### Block vs. inline display

To change the default display from `block` to `inline-block`, set `@isInline` to true:

[[code-snippets/icon-display]]

### Aligning icons

Because the `Hds::Icon` component has a `block` display value by default (changeable using the `@isInline` argument), the icon behaves like a block element. So, if you want to horizontally align it in relation to other sibling elements, you will have to use CSS to achieve the expected result.

!!! Warning

**Avoid using `vertical-align: middle`**

Just setting `vertical-align: middle` in the parent container doesn’t necessarily achieve a vertical alignment.

This is because the [`middle` alignment](https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align#middle) is not calculated in relation to the whole text “block” but to its “x-height”. To learn more, read about [how `vertical-align` works in CSS](https://www.impressivewebs.com/css-vertical-align/).
!!!

For example, to visually center an icon with a generic text node, you will need to use a parent `flex` container with `align-items: center`.

### Animated icons

The loading and running icons are animated by default, meaning no additional properties are needed:

[[code-snippets/icon-loading]]

A prefers-reduced-motion media query will automatically disable the animation if users set this preference in their environment.

If you need the non-animated version of these icons, use the corresponding [loading-static](/icons/library?searchQuery=icon%3Aloading-static) and [running-static](/icons/library?searchQuery=icon%3Arunning-static):

[[code-snippets/icon-loading-static]]
