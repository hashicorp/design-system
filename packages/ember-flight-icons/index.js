/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

'use strict';

const flightIconSprite = require('@hashicorp/flight-icons/svg-sprite/svg-sprite-module');

module.exports = {
  name: require('./package').name,

  contentFor(type, config) {
    if (!config.emberFlightIcons?.lazyEmbed && type === 'body-footer') {
      return flightIconSprite;
    }
  },
};
