/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // ... other app configurations
    sassOptions: {
      includePaths: [
        // ... the HDS paths from the configuration above
        // these are needed for the `SuperSelect` styles
        './node_modules/ember-basic-dropdown',
        './node_modules/ember-power-select',
      ],
    },
  })
};
