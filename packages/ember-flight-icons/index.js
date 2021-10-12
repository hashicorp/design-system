'use strict';

const flightIconSprite = require('@hashicorp/flight-icons/svg-sprite/svg-sprite-module');

module.exports = {
  name: require('./package').name,

  contentFor(type) {
    if (type === 'body-footer' || type === 'test-embed-sprite') {
      return flightIconSprite;
    }
  },
};
