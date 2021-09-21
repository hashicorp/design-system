'use strict';

const flightIconSprite = require('./public/icons/flight-icon-sprite');

module.exports = {
  name: require('./package').name,

  contentFor(type) {
    if (type === 'body-footer') {
      return flightIconSprite;
    }
  },
};
