'use strict';

module.exports = {
  name: require('./package').name,

  isDevelopingAddon() {
    return true;
  },

  included: function (/* app */) {
    this._super.included.apply(this, arguments);
  },
};
