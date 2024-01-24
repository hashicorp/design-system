---
"@hashicorp/ember-flight-icons": major
"@hashicorp/design-system-components": major
---

Converted Ember packages to v2 addon format.

To migrate update Sass cofiguration in `ember-cli-build.js` to include the paths for `ember-flight-icons` and `design-system-components`:

```js
sassOptions: {
  precision: 4,
  includePaths: [
    './node_modules/@hashicorp/design-system-tokens/dist/products/css',
    './node_modules/@hashicorp/ember-flight-icons/dist/styles'
    './node_modules/@hashicorp/design-system-components/dist/styles',
  ],
},
```

Alternatively, you can import the CSS by adding this configuration in `ember-cli-build.js`.

```js
app.import('node_modules/@hashicorp/design-system-components/dist/styles/@hashicorp/design-system-components.css');
```
