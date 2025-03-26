/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import config from 'ember-get-config';
import ApplicationInstance from '@ember/application/instance';
import EngineInstance from '@ember/engine/instance';

type AppInstanceWithSpriteFlag = ApplicationInstance & {
  __flightIconsSpriteLoaded?: boolean;
};

type EngineInstanceWithSpriteFlag = EngineInstance & {
  __flightIconsSpriteLoaded?: boolean;
};

export async function initialize(
  instance: AppInstanceWithSpriteFlag | EngineInstanceWithSpriteFlag
) {
  const parentApp = getRootAppInstance(instance);

  if (
    config?.emberFlightIcons?.lazyEmbed &&
    // we use this flag to avoid loading the sprite multiple times
    parentApp.__flightIconsSpriteLoaded !== true &&
    instance.__flightIconsSpriteLoaded !== true
  ) {
    const { default: svgSprite } = await import(
      // @ts-expect-error: missing types
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

    // set the flag to avoid loading the sprite multiple times
    parentApp.__flightIconsSpriteLoaded = true;
  }
}

/**
 * Searches up the hierarchy to get the parent app instance from an engine
 * @param instance The instance passed to initialize, either an app or engine
 * @returns The parent app instance
 */
function getRootAppInstance(
  instance: AppInstanceWithSpriteFlag | EngineInstanceWithSpriteFlag
): AppInstanceWithSpriteFlag | EngineInstanceWithSpriteFlag {
  if (instance instanceof ApplicationInstance) {
    return instance as AppInstanceWithSpriteFlag;
  }

  let current = instance;

  const symbols = Object.getOwnPropertySymbols(current);
  const ENGINE_PARENT = symbols.find(
    (s) => s.toString() === 'Symbol(ENGINE_PARENT)'
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  while (ENGINE_PARENT && (current as any)[ENGINE_PARENT]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    current = (current as any)[ENGINE_PARENT];
  }

  return current;
}

export default {
  initialize,
};
