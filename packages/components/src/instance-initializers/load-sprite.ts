/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import config from 'ember-get-config';
import type ApplicationInstance from '@ember/application/instance';

export async function initialize(
  appInstance: ApplicationInstance & {
    __flightIconsSpriteLoaded?: boolean;
  }
) {
  console.log(appInstance, appInstance.__flightIconsSpriteLoaded);

  if (
    config?.emberFlightIcons?.lazyEmbed &&
    appInstance.__flightIconsSpriteLoaded !== true
  ) {
    const { default: svgSprite } = await import(
      '@hashicorp/flight-icons/svg-sprite/svg-sprite-module'
    );

    // in test environments we can inject the sprite directly into the ember testing container
    // to avoid issues with tools like Percy that only consider content inside that element
    if (config.environment === 'test') {
      window.document
        ?.getElementById('ember-testing')
        ?.insertAdjacentHTML('afterbegin', svgSprite);
    } else {
      window.document?.body?.insertAdjacentHTML('beforeend', svgSprite);
    }

    appInstance.__flightIconsSpriteLoaded = true;

    console.log(appInstance.__flightIconsSpriteLoaded);
  }
}

export default {
  initialize,
};
