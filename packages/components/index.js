'use strict';

module.exports = {
  name: require('./package').name,

  isDevelopingAddon() {
    return true;
  },

  included: function (/* app */) {
    this._super.included.apply(this, arguments);
  },

  options: {
    babel: {
      plugins: [require.resolve('ember-auto-import/babel-plugin')],
    },
    autoImport: {
      alias: {
        'dialog-polyfill-css': 'dialog-polyfill/dist/dialog-polyfill.css',
      },
    },
  },
};
