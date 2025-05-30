/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const { addonV1Shim } = require('@embroider/addon-shim');
const flightIconSprite = require('@hashicorp/flight-icons/svg-sprite/svg-sprite-module');

module.exports = {
  ...addonV1Shim(__dirname),
  contentFor(type, config) {
    const legacyLazyEmbed = config?.emberFlightIcons?.lazyEmbed;

    if (
      !config.flightIconsSpriteLazyEmbed &&
      !legacyLazyEmbed &&
      !config.__flightIconsSpriteLoaded &&
      type === 'body-footer'
    ) {
      config.__flightIconsSpriteLoaded = true;

      return flightIconSprite;
    }
  },
};
