---
title: Getting started for engineers
navigation:
  order: 102
  label: For engineers
---

The Design Systems Team maintains design tokens, icons, and components in a [monorepo](https://github.com/hashicorp/design-system) and publishes them regularly to npm.

## Components

We provide components as an [Ember](https://emberjs.com/) addon with associated styles in [Sass](https://sass-lang.com/) and CSS. By installing the components, you also have access to the design tokens and CSS helper classes.

### Install components package

[[code-snippets/install]]

### Import component styles

You can chose between importing styles as Sass or CSS.

#### Sass

1. Install and configure Sass to preprocess styles, handle source maps, and include paths in your application.

[[code-snippets/install-ember-cli-sass]]

2. Use the `scss` extension to ensure the styles are being preprocessed. For example, you may need to change `app/styles/app.css` to `app/styles/app.scss`.

3. Add the following configuration in `ember-cli-build.js` to set the number of decimal places and enable access to the design system tokens:

```js
sassOptions: {
  precision: 4,
  includePaths: [
    './node_modules/@hashicorp/design-system-tokens/dist/products/css',
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

[[code-snippets/use-helios-styles]]

#### CSS

Import the CSS by adding this configuration in `ember-cli-build.js`.

```js
app.import('node_modules/@hashicorp/design-system-components/dist/styles/@hashicorp/design-system-components.css');
```

!!! Warning

**Consumer responsibility**

Our component library assumes that a box-sizing reset is applied globally in your application. To ensure components render properly, include the following reset:

`*, *::before, *::after { box-sizing: border-box; }`
!!!

### Single file components

If you are are using single file components (i.e., `.gts` or `.gjs` files), the components need to be individually imported into the file for them to render. All components can be imported from the `@hashicorp/design-system-components/components` path. To use a component's signature, you must import it from the definition file.

[[code-snippets/sample-component expanded=true]]

In the rare cases where you need to use an HDS modifier, they are only exported from their definition file

[[code-snippets/sample-imports expanded=true]]

For more information on single file components, see the Ember docs:
* [Intro to components](https://guides.emberjs.com/release/components/introducing-components/)
* [Glimmer components](https://guides.emberjs.com/release/typescript/core-concepts/invokables/#toc_glimmer-components)

## Icons

There are two ways to use icons in your codebase. We provide icons:

- as an [`Hds::Icon` Ember component](/components/icon)
- as a generic package, `@hashicorp/flight-icons`, that can also be consumed directly in React applications (and in web applications in general)

### Ember applications

#### Using the `Hds::Icon` component

Because the `Hds::Icon` component is part of the HDS components, you have to install the corresponding package:

[[code-snippets/install]]

and then use the component in your code like this:

[[code-snippets/sample-icon execute=false]]

For details about how this component should be used and its API, see [the component documentation page](/components/icon).

#### Deferred loading

The SVG sprite will be injected by default into your application's `index.html` file. If you would like this to happen later as part of your app bundle, you can set the `flightIconsSpriteLazyEmbed` flag to `true` in your app's `config/environment.js` file:

```js
module.exports = function(environment) {
  const ENV = {
    // your other config
    ...
    flightIconsSpriteLazyEmbed: true
  };
}
```

#### Ember test selectors

The `Hds::Icon` component exposes a `data-test-icon` helper. For this reason, we recommend installing [`ember-test-selectors`](https://github.com/simplabs/ember-test-selectors) which strips out all `data-test-*` attributes for production builds.

#### Using the icons without importing the whole components package

If you want to use the Flight icons without installing the whole `@hashicorp/design-system-components` package, you have to use the `@hashicorp/flight-icons` to import the SVG sprite, and then you will have to build your own Ember component that renders the icons as an `<svg>` HTML element.

You can copy the code for the `Hds::Icon` into your codebase, or you can [take inspiration from this PR](https://github.com/hashicorp/design-system-metrics/pull/23) to build your own component.

### React applications

To add icons to a React application, you need to install the `@hashicorp/flight-icons` package:

[[code-snippets/install-flight-icons]]

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

[[code-snippets/use-animated-icons]]

Then declare them the same way you would with any other icon.

```javascript
// if you’re using the 'svg-react' icons
import { IconLoading16 } from '@hashicorp/flight-icons/svg-react/loading-16'
<IconLoading16 />

// if you’re using the 'svg' icons
import svgLoading16 from '@hashicorp/flight-icons/svg/loading-16.svg?include'
<InlineSvg src={svgLoading16} />
```

If you need the non-animated version of these icons, use the corresponding [loading-static](/icons/library?searchQuery=icon%3Aloading-static) and [running-static](/icons/library?searchQuery=icon%3Arunning-static):

## Tokens

If the Ember components are not an option for your project, you can still use the design tokens to keep in sync with the styles we provide.

### Install tokens package

[[code-snippets/install-tokens]]

### Import styles as CSS variables

Import design tokens as CSS variables by adding one of the following lines to the main Sass file in your application (for example, in `app.scss`):

[[code-snippets/use-helios-product-tokens]]

### Import styles as CSS helper classes

Import CSS helper classes by adding any of the following lines to the main Sass file in your application (for example, in `app.scss`).

[[code-snippets/use-helios-helpers]]

For more examples and guidelines read [the tokens documentation](/foundations/tokens).

## Browser support

Our styles, components and icons are supported by the following browsers:

| Browser        | Version         |
|----------------|-----------------|
| Chrome         | last 2 versions |
| Safari         | last 2 versions |
| Firefox        | last 2 versions |
| Microsoft Edge | last 2 versions |

## Internationalization

We use [`ember-intl`](https://github.com/ember-intl/ember-intl) to handle internationalization in HDS components.

### Default behavior

By default, HDS components display text in English when `ember-intl` is not installed in your application. This ensures components work out of the box without additional configuration.

### Set up

To enable internationalization in your application:
1. Install `ember-intl` as a dependency in your application:

[[code-snippets/install-ember-intl]]

2. Configure your application to use one of the supported HDS translation locales.
For detailed setup instructions, refer to the [ember-intl quickstart guide](https://ember-intl.github.io/ember-intl/docs/quickstart).

### Translation support

#### Using HDS-provided translations

You can use translations provided by HDS by setting your application's locale to a supported value. Components will automatically display the appropriate translation for that locale.

Currently supported locales in HDS:

- `en-us` (English - United States)

Support for additional locales is planned as future work.

#### Customizing translations

You can provide custom translations or override existing HDS translations by creating translation files that match the [translation key paths used in our components](https://github.com/hashicorp/design-system/tree/main/packages/components/translations).

For example, to translate the "Error" text used in components:

1. Create a translation key that matches the HDS path: `hds.components.common.error`
2. Provide your translation value in the desired locale file

[[code-snippets/custom-translations]]

When your application uses the `fr-fr` locale, components will display "Erreur" instead of the default English "Error".

## Ember engines

If your application uses Ember engines, you have to add a small extra configuration in your `app.js` file:

```js
import { HdsInteractive } from '@hashicorp/design-system-components/components';
import LinkToExternal from 'ember-engines/components/link-to-external';

HdsInteractive.linkToExternal = LinkToExternal;
```

```js
import { setLinkToExternal } from '@hashicorp/design-system-components/utils/hds-link-to-external';
setLinkToExternal(LinkToExternalComponent);`
```

This allows the [`Hds::Interactive`](/utilities/interactive) utility component, used in multiple HDS components, to access the `<LinkToExternal>` component to generate cross-engines links. For more details about this component API, please refer to [its documentation page](/utilities/interactive?tab=code#component-api).

## Code editor setup

### VSCode

We recommend installing the [Ember Language Server extension](https://marketplace.visualstudio.com/items?itemName=lifeart.vscode-ember-unstable) that provides autocomplete, goto definition, and diagnostics for Ember applications and addons, including Helios components.

If you use TypeScript in your Ember application, we also recommend installing the [Glint extension](https://marketplace.visualstudio.com/items?itemName=typed-ember.glint-vscode) that provides improved autocomplete and quick info for components (including arguments), as well as symbol renaming and finding references.
