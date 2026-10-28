/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // ... other app configurations
    sassOptions: {
      precision: 4,
      includePaths: [
        // these are the packages for HDS tokens and components
        './node_modules/@hashicorp/design-system-tokens/dist/products/css',
        './node_modules/@hashicorp/design-system-components/dist/styles',
        // this is needed for the IBM Plex fonts
        './node_modules/@ibm',
      ],
    },
  })
};
