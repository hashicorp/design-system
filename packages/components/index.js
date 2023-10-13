/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

'use strict';

module.exports = {
  name: require('./package').name,

  isDevelopingAddon() {
    return true;
  },

  included: function (app) {
    this._super.included.apply(this, arguments);
    if (app.options && app.options['hds-code-block']) {
      const options = app.options['hds-code-block'];
      options.languages.forEach((language) => {
        this.options['@embroider/macros'].setOwnConfig.languages.push(language);
      });
    }
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
    '@embroider/macros': {
      setOwnConfig: {
        languages: [],
      },
    },
    'hds-code-block': {
      languages: [],
    },
  },
};
