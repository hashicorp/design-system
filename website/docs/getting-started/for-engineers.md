---
title: Getting started for engineers
order: 102
---

The Design Systems Team maintains design tokens, icons, and components in a [monorepo](https://github.com/hashicorp/design-system) and publishes them regularly to npm.

## Components

We provide components as an [Ember](https://emberjs.com/) addon with associated styles written in [Sass](https://sass-lang.com/). By installing the components, you also have access to the design tokens and CSS helper classes.

### Install components package

```bash
yarn add @hashicorp/design-system-components
```

### Import component styles

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
  ],
},
```

4. Add the following line to the main Sass file in your application (for example, in `app.scss`):

```scss
@import "@hashicorp/design-system-components";
```

!!! Warning

**Ensure a box-sizing reset is present**

Our component library assumes that a box-sizing reset is applied globally in your application. To ensure components render properly, include the following reset:

`*, *::before, *::after { box-sizing: border-box; }`

!!!


## Icons

There are multiple ways to use icons in your codebase. We provide icons as an Ember addon and as a generic package that can also be consumed in React applications.

### Install icons package

#### Ember application

```bash
yarn add @hashicorp/ember-flight-icons
```

#### React application

```bash
yarn add @hashicorp/flight-icons
```

This package can be consumed in React applications via direct import of the SVG file or as a standalone React/SVG icon component.

For more details, examples, and guidelines read [the complete icons documentation](/foundations/icons/).


## Tokens

If the Ember components are not an option for your project, you can still use the design tokens to keep in sync with the styles we provide.

### Install tokens package

```bash
yarn add @hashicorp/design-system-tokens
```

### Import styles as CSS variables

Import design tokens as CSS variables by adding one of the following lines to the main Sass file in your application (for example, in `app.scss`):

```scss
// for product applications
@import "~@hashicorp/design-system-tokens/dist/products/css/tokens.css";

// for hashicorp developer platform
@import "~@hashicorp/design-system-tokens/dist/devdot/css/tokens.css";
```

### Import styles as CSS helper classes

Import CSS helper classes by adding any of the following lines to the main Sass file in your application (for example, in `app.scss`).

```scss
// for product applications
@import "~@hashicorp/design-system-tokens/dist/products/css/helpers/colors.css";
@import "~@hashicorp/design-system-tokens/dist/products/css/helpers/elevation.css";
@import "~@hashicorp/design-system-tokens/dist/products/css/helpers/typography.css";
@import "~@hashicorp/design-system-tokens/dist/products/css/helpers/focus-ring.css";

// for hashicorp developer platform
@import "~@hashicorp/design-system-tokens/dist/devdot/css/helpers/colors.css";
@import "~@hashicorp/design-system-tokens/dist/devdot/css/helpers/elevation.css";
@import "~@hashicorp/design-system-tokens/dist/devdot/css/helpers/typography.css";
@import "~@hashicorp/design-system-tokens/dist/devdot/css/helpers/focus-ring.css";
```

For more examples and guidelines read [the tokens documentation](/foundations/tokens/).
