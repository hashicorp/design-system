/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // ... other app configurations
    sassOptions: {
      precision: 4,
      includePaths: [
        './node_modules/@hashicorp/design-system-tokens/dist/products/css',
        './node_modules/@hashicorp/design-system-components/dist/styles',
      ],
    },
  })
};
