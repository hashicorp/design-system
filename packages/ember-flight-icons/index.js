/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

'use strict';

const flightIconSprite = require('@hashicorp/flight-icons/svg-sprite/svg-sprite-module');

module.exports = {
  name: require('./package').name,

  contentFor(type, config) {
    // notice: the "body-footer" is used in the normal app, while the "ember-testing-sprite-embed" is used
    // in the testing environment to inject the sprite in the #ember-testing "app root element" (ENV.APP.rootElement)
    // otherwise the @percy/ember package ignores everything else and the SVG sprite is not added to the DOM
    // see thread: https://hashicorp.slack.com/archives/C11JCBJTW/p1633978558343000
    // see: https://github.com/percy/percy-ember/blob/ab3b8ebb272fb6479e1185b8ef6e11dab3d6d9b0/addon-test-support/%40percy/ember/index.js#L53
    if (
      !config.emberFlightIcons?.lazyEmbed &&
      (type === 'body-footer' || type === 'ember-testing-sprite-embed')
    ) {
      return flightIconSprite;
    }
  },
};
