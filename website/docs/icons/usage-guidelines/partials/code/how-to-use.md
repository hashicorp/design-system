## Installation

Icons can be used in many ways. The package can be installed as an [Ember addon](#adding-icons-to-ember-apps) for the convenience of using a component with strong defaults. It can also be [consumed in React applications](#adding-icons-to-react-apps) via direct import of the SVG file or as a standalone React/SVG icon component.

### Adding icons to Ember apps

Install the `ember-flight-icons` addon.

```bash
yarn add @hashicorp/ember-flight-icons
```

!!! Information

Because this addon exposes a `data-test-icon` helper, we recommend installing [`ember-test-selectors`](https://github.com/simplabs/ember-test-selectors) which strips out all `data-test-*` attributes for production builds.
!!!

#### Deferred loading

By default, the SVG sprite will be injected into your application's `index.html` file. If you would like this to happen later as part of your app bundle you can set the `lazyEmbed` flag to `true` in the `emberFlightIcons` object in your app's `config/environment.js` file:

```js
module.exports = function(environment) {
  const ENV = {
    // your other config
    ...
    emberFlightIcons: {
      lazyEmbed: true,
    },
  };
}
```

For more information on why this may be helpful in certain scenarios, see [DS-049 - Improve Ember Flight Icons Loading Performance](https://go.hashi.co/rfc/ds-049).

### Adding icons to React apps

To add icons to a React application, install the `@hashicorp/flight-icons` package and import the icons as either inline SVGs or as a standalone React/SVG component.

!!! Info

For more details about the decision to add this functionality, visit this [pull-request](https://github.com/hashicorp/flight/pull/325).
!!!

#### Installing the `flight-icons` package

To install, run:

```bash
yarn install @hashicorp/flight-icons
```

#### Importing icons as inline SVGs

Single icons can be imported and used directly as SVG files using [&lt;InlineSvg&gt;](https://react-components.vercel.app/components/inlinesvg) provided by [@hashicorp/react-components](https://github.com/hashicorp/react-components).

Since this is just an SVG asset, no _props_ can be passed. You should refer to the [&lt;InlineSvg&gt;](https://react-components.vercel.app/components/inlinesvg) documentation to know how to apply color and size to the SVG icon.

```javascript
// import the SVG file (using 'require')
const iconArrowRight = require('@hashicorp/flight-icons/svg/arrow-right-24.svg?include');
// or import the SVG file (using 'import')
import iconArrowRight from '@hashicorp/flight-icons/svg/arrow-right-24.svg?include';

// elsewhere in the file
<InlineSvg src={iconArrowRight} />

// alternatively you can also use a similar approach
<InlineSvg src={require('@hashicorp/flight-icons/svg/arrow-right-24.svg?include')} />
```

#### Importing icons as React/SVG components

Single icons can be imported and used directly as standalone React/SVG components:

```javascript
// import the React/TypeScript file (using 'require')
const { IconArrowRight24 } = require('@hashicorp/flight-icons/svg-react/arrow-right-24');
// or import the React/TypeScript file (using 'import')
import { IconArrowRight24 } from '@hashicorp/flight-icons/svg-react/arrow-right-24';

// elsewhere in the file
<IconArrowRight24 />
```

## How to use icons

The most basic invocation requires only the `@name` property to be passed with a value matching an existing name in [the Icon library](/icons/library).

```markup
<FlightIcon @name="alert-circle" />
```

It renders to this (where the `id` will be unique each time):

```markup
<svg
    id="icon-ember115"
    class="flight-icon icon-alert-circle display-inline"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    aria-hidden="true"
    data-test-icon="alert-circle"
>
    <use href="/@hashicorp/ember-flight-icons/icons/sprite.svg#alert-circle-16"></use>
</svg>
```

Because the icons are hidden to assistive technology, they cannot be used on their own and must be used inside of an element with an accessible name.

The [Hds::Button](/components/button?tab=code#icon-only-button) component automatically provides this support, but if you make a custom element, or want to use a `FlightIcon` inside of a native HTML element like your own button element, ensure that an `aria-label` attribute is added, like this:

```handlebars
<button type="button" aria-label="add a new thing">
  <FlightIcon @name="plus" />
</button>
```

### Color

The default value is `currentColor` which uses the inherited text color as the icon color. When setting a custom value, we recommend using one of the pre-defined variables to ensure consistency with our design language:

```handlebars
<FlightIcon @name="zap" @color="var(--brand)" />
```

Other accepted values include named colors and color values themselves (e.g., hex, rgb, etc).

```handlebars
<FlightIcon @name="zap" @color="rebeccapurple" />
```

```handlebars
<FlightIcon @name="zap" @color="rgb(46, 113, 229)" />
```

### Size

The default size is 16px. To use the alternative 24px icon size, set the `@size` value:

```handlebars
<FlightIcon @name="zap" @size="24" />
```

### Stretched

To have the icon fill the parent container (width: 100%, height: 100%, display: block), set the `@stretched` attribute to true:

```handlebars
<div class="doc-icon-demo--constrain-max-width">
    <FlightIcon @name="zap" @size="24" @stretched={{true}} />
</div>
```

<!-- ##### CSS classes

To append additional classes to the component, add `class` with value(s):

```markup
<FlightIcon @name="triangle-fill" class="ds-rotate-90" />
``` -->

### isInlineBlock

To change the default display from `inline-block` to `block`, set `@isInlineBlock` to false:

```handlebars
<FlightIcon @name="triangle" @isInlineBlock={{false}} />
<FlightIcon @name="triangle-fill" @isInlineBlock={{false}} />
```

### Aligning icons

Since the `FlightIcon` component has an `inline-block` display value by default (changeable using the `@isInlineBlock` argument), this means that the icon behaves like an inline element. So, if you want to vertically align it in relation to other sibling elements, you will have to use CSS to achieve the expected result.

For example, to visually center an icon with a generic text node, you will need to use a parent `flex` container with `align-items: center`.

!!! Warning

**Avoid using `vertical-align: middle`**

Just setting `vertical-align: middle` in the parent container doesn’t necessarily achieve a vertical alignment.

This is because the [`middle` alignment](https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align#middle) is not calculated in relation to the whole text “block” but to its “x-height”. To learn more, read about [how `vertical-align` works in CSS](https://www.impressivewebs.com/css-vertical-align/).
!!!

### Animated icons

!!! Information

**Note on accessibility**

A `prefers-reduced-motion` media query will automatically disable the animation if users set this preference in their environment.

!!!

#### In Ember apps

Animated icons (e.g., "loading" and "running") are animated by default, meaning no additional properties are needed. 

```handlebars
<FlightIcon @name="loading" @size="24" />
```

#### In React apps

To use the icons which are meant to be animated (e.g., “loading” and “running”), import the CSS that controls the icons’ animation:

```scss
// the path here depends if you’re using 'svg-react' or 'svg' icons 
@import ~@hashicorp/flight-icons/svg-react/animation.css';
```

Then declare them the same way you would with any other icon.

```javascript
// if you’re using the 'svg-react' icons
import { IconLoading16 } from '@hashicorp/flight-icons/svg-react/loading-16'
<IconLoading16 />

// if you’re using the 'svg' icons
import svgLoading16 from '@hashicorp/flight-icons/svg/loading-16.svg?include'
<InlineSvg src={svgLoading16} />
```
