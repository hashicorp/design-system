design-system-components
==============================================================================

A package containing the components for the HashiCorp Design System.

[![npm version](https://badge.fury.io/js/%40hashicorp%2Fdesign-system-components.svg)](https://badge.fury.io/js/%40hashicorp%2Fdesign-system-components)


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.20 or above
* Ember CLI v3.20 or above
* Node.js v12 or above


Installation
------------------------------------------------------------------------------

```
yarn add @hashicorp/design-system-components
```

You will need to do three things before importing the styles into your app:

1. Install `ember-cli-sass`

```bash
ember install ember-cli-sass
```

2. Change `app/styles/app.css` to `app/styles/app.scss`
3. Add the following to the `app` definition (starts on/around line 6 in new Ember apps) in `ember-cli-build.js`

```js
sassOptions: {
  precision: 4,
  includePaths: [
    './node_modules/@hashicorp/design-system-tokens/dist/products/css',
  ],
},
```

Finally, add this line to the top of your app's style file (`app.scss` or similar):

```
@import '@hashicorp/design-system-components';
```

⚠️ **Notice**: our component library assumes that a `*, *::before, *::after { box-sizing: border-box; }` reset is applied globally in the CSS of the application. If in your use case this is not true, please speak with the design system team (we can try to find a workaround).

Usage
------------------------------------------------------------------------------

See the dedicated components website: https://design-system-components-hashicorp.vercel.app/


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [Mozilla Public License 2.0](LICENSE.md).
