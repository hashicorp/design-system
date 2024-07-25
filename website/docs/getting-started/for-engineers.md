---
title: Getting started for engineers
navigation:
  order: 102
  label: For engineers
---

The Design Systems Team maintains design tokens, icons, and components in a [monorepo](https://github.com/hashicorp/design-system) and publishes them regularly to npm.

## Components

We provide components as an [Ember](https://emberjs.com/) addon with associated styles written in [Sass](https://sass-lang.com/). By installing the components, you also have access to the design tokens and CSS helper classes.

### Install components package

```bash
yarn add @hashicorp/design-system-components
```

### Import component styles

You can chose between importing styles as Sass or CSS.

#### Sass

1. Install and configure Sass to preprocess styles, handle source maps, and include paths in your application.

```bash
ember install ember-cli-sass
```

2. Use the `scss` extension to ensure the styles are being preprocessed. For example, you may need to change `app/styles/app.css` to `app/styles/app.scss`.

3. Add the following configuration in `ember-cli-build.js` to set the number of decimal places and enable access to the design system tokens:

```js
sassOptions: {
  precision: 4,
  includePaths: [
    './node_modules/@hashicorp/design-system-tokens/dist/products/css',
    './node_modules/@hashicorp/ember-flight-icons/dist/styles',
    './node_modules/@hashicorp/design-system-components/dist/styles',
  ],
},
```

4. We also suggest adding this configuration in `ember-cli-build.js` to prevent `ember-cli` from trying to over-optimize the generated CSS by changing the order of the CSS declarations ([reference](https://github.com/hashicorp/cloud-ui/pull/3112)):

```js
minifyCSS: {
  options: {
    advanced: false,
  },
},
```

5. Add the following line to the main Sass file in your application (for example, in `app.scss`):

```scss
@import "@hashicorp/design-system-components";
```

#### CSS

Import the CSS by adding this configuration in `ember-cli-build.js`.

```js
app.import('node_modules/@hashicorp/design-system-components/dist/styles/@hashicorp/design-system-components.css');
```

!!! Warning

##### Ensure a box-sizing reset is present

Our component library assumes that a box-sizing reset is applied globally in your application. To ensure components render properly, include the following reset:

`*, *::before, *::after { box-sizing: border-box; }`

!!!

## Icons

There are multiple ways to use icons in your codebase. We provide icons:

- as an [`Hds::Icon` Ember component](/components/icon)
- as an Ember addon (now deprecated)
- as a generic package that can also be consumed directly in React applications (and in web applications in general)

### Ember applications

#### Using the `Hds::Icon` component

Because the `Hds::Icon` component is part of the HDS components, you have to install the corresponding package:

```bash
yarn add @hashicorp/design-system-components
```

and then use the component in your code like this:

```handlebars{data-execute=false}
<Hds::Icon @name="info" />
```

For details about how this component should be used and its API see [the component documentation page](/components/icon).

#### Using the `@hashicorp/ember-flight-icons` addon <Doc::Badge @type="warning" @size="large">Deprecated</Doc::Badge>

!!! Warning

This approach is now deprecated. Use the `Hds::Icon` instead.

!!!

The `ember-flight-icons` package is an Ember addon that provides a standalone `FlightIcon` component that can be used to render an icon as an `<svg>` HTML element.

Since it's an independent package, you have to install it first:

```bash
yarn add @hashicorp/ember-flight-icons
```

and then use the component in your code like this:

```handlebars{data-execute=false}
<FlightIcon @name="info" />
```

The [API of the component](/components/icon?tab=code#component-api) is the same as the `Hds::Icon` one.

#### Deferred loading

In both approaches, the SVG sprite will be injected by default into your application's `index.html` file. If you would like this to happen later as part of your app bundle you can set the `lazyEmbed` flag to `true` in the `emberFlightIcons` object in your app's `config/environment.js` file:

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

#### Ember test selectors

Both the `Hds::Icon` and the `FlightIcon` components expose a `data-test-icon` helper. For this reason, we recommend installing [`ember-test-selectors`](https://github.com/simplabs/ember-test-selectors) which strips out all `data-test-*` attributes for production builds.

#### Using the icons without importing the whole components package

If you want to use the Flight icons without installing the whole `@hashicorp/design-system-components` package, you have to use the `@hashicorp/flight-icons` to import the SVG sprite, and then you will have to build your own Ember component that renders the icons as an `<svg>` HTML element.

You can copy the code for the `Hds::Icon` in your codebase, or you can [take inspiration from this PR](https://github.com/hashicorp/design-system-metrics/pull/23) to build your own component.

### React applications

To add icons to a React application, you need to install the `@hashicorp/flight-icons` package:

```bash
yarn add @hashicorp/flight-icons
```

This package can be consumed in React applications via direct import of the SVG file or as a standalone React/SVG icon component.

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

#### Animated icons

To use the icons which are meant to be animated ([loading](/icons/library?searchQuery=icon%3Aloading) and [running](/icons/library?searchQuery=icon%3Arunning)), import the CSS that controls the icons’ animation:

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

If you need the non-animated version of these icons use the corresponding [loading-static](/icons/library?searchQuery=icon%3Aloading-static) and [running-static](/icons/library?searchQuery=icon%3Arunning-static):

## Tokens

If the Ember components are not an option for your project, you can still use the design tokens to keep in sync with the styles we provide.

### Install tokens package

```bash
yarn add @hashicorp/design-system-tokens
```

### Import styles as CSS variables

Import design tokens as CSS variables by adding one of the following lines to the main Sass file in your application (for example, in `app.scss`):

```scss
// for product applications (Ember apps)
@import "@hashicorp/design-system-tokens/dist/products/css/tokens.css";

// for HashiCorp developer platform
@import "~@hashicorp/design-system-tokens/dist/devdot/css/tokens.css";
```

### Import styles as CSS helper classes

Import CSS helper classes by adding any of the following lines to the main Sass file in your application (for example, in `app.scss`).

```scss
// for product applications (Ember apps)
@import "@hashicorp/design-system-tokens/dist/products/css/helpers/colors.css";
@import "@hashicorp/design-system-tokens/dist/products/css/helpers/elevation.css";
@import "@hashicorp/design-system-tokens/dist/products/css/helpers/typography.css";
@import "@hashicorp/design-system-tokens/dist/products/css/helpers/focus-ring.css";

// for HashiCorp developer platform
@import "~@hashicorp/design-system-tokens/dist/devdot/css/helpers/colors.css";
@import "~@hashicorp/design-system-tokens/dist/devdot/css/helpers/elevation.css";
@import "~@hashicorp/design-system-tokens/dist/devdot/css/helpers/typography.css";
@import "~@hashicorp/design-system-tokens/dist/devdot/css/helpers/focus-ring.css";
```

For more examples and guidelines read [the tokens documentation](/foundations/tokens).

## Browser support

Our styles, components and icons are supported by the following browsers:

| Browser        | Version         |
|----------------|-----------------|
| Chrome         | last 2 versions |
| Safari         | last 2 versions |
| Firefox        | last 2 versions |
| Microsoft Edge | last 2 versions |

## Code editor setup

### VSCode

We recommend installing the [Ember Language Server extension](https://marketplace.visualstudio.com/items?itemName=lifeart.vscode-ember-unstable) that provides autocomplete, goto definition, and diagnostics for Ember applications and addons, including Helios components.

If you use TypeScript in your Ember application, we also recommend installing the [Glint extension](https://marketplace.visualstudio.com/items?itemName=typed-ember.glint-vscode) that provides improved autocomplete and quick info for components (including arguments), as well as symbol renaming and finding references. We are in the process of converting our components to TypeScript so currently only some of them benefit from these features.
