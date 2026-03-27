/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // ... other app configurations
    minifyCSS: {
      options: {
        advanced: false,
      },
    },
  })
};
