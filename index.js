'use strict';

// let Funnel = require('broccoli-funnel');
// let mergeTrees = require('broccoli-merge-trees');
// let path = require('path');

module.exports = {
  name: require('./package').name,

  isDevelopingAddon() {
    return true;
  },

  included: function (/* app */) {
    this._super.included.apply(this, arguments);
  },
};
