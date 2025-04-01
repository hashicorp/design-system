/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import config from 'ember-get-config';

export async function initialize() {
  if (config?.emberFlightIcons?.lazyEmbed) {
    const { default: svgSprite } = await import(
      '@hashicorp/flight-icons/svg-sprite/svg-sprite-module'
    );

    // in test environments we can inject the sprite directly into the ember testing container
    // to avoid issues with tools like Percy that only consider content inside that element
    if (config.environment === 'test') {
      const container = window.document?.getElementById('ember-testing');

      if (container && !container.querySelector('.flight-sprite-container')) {
        container.insertAdjacentHTML('afterbegin', svgSprite);
      }
    } else {
      const container = window.document?.body;

      if (container && !container.querySelector('.flight-sprite-container')) {
        container.insertAdjacentHTML('beforeend', svgSprite);
      }
    }
  }
}

export default {
  initialize,
};
