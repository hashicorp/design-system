import config from 'ember-get-config';

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

async function initialize(appInstance) {
  if (config?.emberFlightIcons?.lazyEmbed &&
  // we use this flag to avoid loading the sprite multiple times
  appInstance.__flightIconsSpriteLoaded !== true) {
    const {
      default: svgSprite
    } = await import('@hashicorp/flight-icons/svg-sprite/svg-sprite-module');

    // in test environments we can inject the sprite directly into the ember testing container
    // to avoid issues with tools like Percy that only consider content inside that element
    if (config.environment === 'test') {
      window.document?.getElementById('ember-testing')?.insertAdjacentHTML('afterbegin', svgSprite);
    } else {
      window.document?.body?.insertAdjacentHTML('beforeend', svgSprite);
    }

    // set the flag to avoid loading the sprite multiple times
    appInstance.__flightIconsSpriteLoaded = true;
  }
}
var loadSprite = {
  initialize
};

export { loadSprite as default, initialize };
//# sourceMappingURL=load-sprite.js.map
