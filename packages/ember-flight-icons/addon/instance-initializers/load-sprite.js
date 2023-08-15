/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import * as svgSprite from '@hashicorp/flight-icons/svg-sprite/svg-sprite-module';
import config from 'ember-get-config';

export function initialize() {
  if (config.emberFlightIcons?.lazyEmbed) {
    // in test environments we can inject the sprite directly into the ember testing container
    // to avoid issues with tools like Percy that only consider content inside that element
    if (config.environment === 'test') {
      window.document
        .getElementById('ember-testing')
        .insertAdjacentHTML('afterbegin', svgSprite);
    } else {
      window.document.body.insertAdjacentHTML('beforeend', svgSprite);
    }
  }
}

export default {
  initialize,
};
