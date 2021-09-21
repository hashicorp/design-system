'use strict';

const flightIconSprite = require('./addon/components/flight-icon-sprite');

module.exports = {
  name: require('./package').name,

  contentFor(type) {
    if (type === 'body-footer') {
      return flightIconSprite;
    }
  },
};
