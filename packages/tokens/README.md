# design-system-tokens

A package containing the design tokens of the HashiCorp Design System.

[![npm version](https://badge.fury.io/js/%40hashicorp%2Fdesign-system-tokens.svg)](https://badge.fury.io/js/%40hashicorp%2Fdesign-system-tokens)

## Compatibility

Any platform/framework that can process CSS files and can use CSS custom properties ("variables") or use CSS helper classes.

## Installation

```
yarn add @hashicorp/design-system-tokens
```

Then import one of those files in your app's style file (`app.scss` or similar):

```js
// to use design tokens as CSS variables
//
~/dist/products/css/tokens.css // for products applications
~/dist/devdot/css/tokens.css   // for devdot platform

// to use the CSS helper classes
//
~/dist/[products|devdot]/css/helpers/colors.css     // for color styles
~/dist/[products|devdot]/css/helpers/elevation.css  // for elevation styles
~/dist/[products|devdot]/css/helpers/typography.css // for typographic styles
~/dist/[products|devdot]/css/helpers/focus-ring.css // for focus-ring style
```

## Usage

See the dedicated page on the components website: https://design-system-components-hashicorp.vercel.app/foundations/tokens

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [Mozilla Public License 2.0](LICENSE.md).

## Versioning

We use [SemVer](http://semver.org/) for versioning.
