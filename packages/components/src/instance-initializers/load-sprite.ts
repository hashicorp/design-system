/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { macroCondition, isTesting, getOwnConfig } from '@embroider/macros';

interface Config {
  flightIconsSpriteLazyEmbed: boolean;
}

export async function initialize() {
  if (macroCondition(getOwnConfig<Config>().flightIconsSpriteLazyEmbed)) {
    const { default: svgSprite } = await import(
      '@hashicorp/flight-icons/svg-sprite/svg-sprite-module'
    );

    // in test environments we can inject the sprite directly into the ember testing container
    // to avoid issues with tools like Percy that only consider content inside that element
    if (macroCondition(isTesting())) {
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
