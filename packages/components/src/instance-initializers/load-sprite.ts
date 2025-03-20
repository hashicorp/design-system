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
  if (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    config?.emberFlightIcons?.lazyEmbed &&
    // we use this flag to avoid loading the sprite multiple times
    appInstance.__flightIconsSpriteLoaded !== true
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { default: svgSprite } = await import(
      // @ts-expect-error: missing types
      '@hashicorp/flight-icons/svg-sprite/svg-sprite-module'
    );

    // in test environments we can inject the sprite directly into the ember testing container
    // to avoid issues with tools like Percy that only consider content inside that element
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (config.environment === 'test') {
      window.document
        ?.getElementById('ember-testing')
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        ?.insertAdjacentHTML('afterbegin', svgSprite);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      window.document?.body?.insertAdjacentHTML('beforeend', svgSprite);
    }

    // set the flag to avoid loading the sprite multiple times
    appInstance.__flightIconsSpriteLoaded = true;
  }
}

export default {
  initialize,
};
