/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { LinkTo } from '@ember/routing';
import { assert } from '@ember/debug';
import {
  dependencySatisfies,
  macroCondition,
  importSync,
} from '@embroider/macros';

/**
 * Resolves the correct component to use for the `LinkTo`.
 *
 * @param isRouteExternal - If true, will return the `LinkToExternal` component. If `ember-engines` is not installed, an assertion will be thrown.
 * @returns The correct component to use for the `LinkTo`.
 */
export function hdsResolveLinkToExternal(
  isRouteExternal?: boolean
): typeof LinkTo {
  if (isRouteExternal) {
    if (macroCondition(dependencySatisfies('ember-engines', '*'))) {
      // Use importSync for compile-time conditional import
      const { default: module } = importSync(
        'ember-engines/components/link-to-external-component'
      ) as { default: typeof LinkTo };
      return module;
    } else {
      assert(
        `@isRouteExternal is only available when using the "ember-engines" addon. Please install it to use this feature.`,
        false
      );
    }
  }

  return LinkTo;
}
