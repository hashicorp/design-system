'use strict';

const flightIconSprite = require('@hashicorp/flight-icons/svg-sprite/svg-sprite-module');

module.exports = {
  name: require('./package').name,

  isDevelopingAddon() {
    return true;
  },

  included: function (/* app */) {
    this._super.included.apply(this, arguments);
  },

  contentFor(type) {
    // notice: the "body-footer" is used in the normal app, while the "ember-testing-sprite-embed" is used
    // in the testing environment to inject the sprite in the #ember-testing "app root element" (ENV.APP.rootElement)
    // otherwise the @percy/ember package ignores everything else and the SVG sprite is not added to the DOM
    // see thread: https://hashicorp.slack.com/archives/C11JCBJTW/p1633978558343000
    // see: https://github.com/percy/percy-ember/blob/master/addon-test-support/%40percy/ember/index.js#L33
    if (type === 'body-footer' || type === 'ember-testing-sprite-embed') {
      return flightIconSprite;
    }
  },
};
