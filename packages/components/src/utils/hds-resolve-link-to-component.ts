import { LinkTo } from '@ember/routing';
import { assert } from '@ember/debug';
import {
  dependencySatisfies,
  importSync,
  macroCondition,
} from '@embroider/macros';

/**
 * Resolves the correct component to use for the `LinkTo`.
 *
 * @param isRouteExternal - If true, will return the `LinkToExternal` component. If `ember-engines` is not installed, an assertion will be thrown.
 * @returns The correct component to use for the `LinkTo`.
 */
export function hdsResolveLinkToComponent(
  isRouteExternal?: boolean
): typeof LinkTo {
  if (isRouteExternal) {
    if (macroCondition(dependencySatisfies('ember-engines', '*'))) {
      // @ts-expect-error: shape is unknown
      return importSync(
        'ember-engines/components/link-to-external-component.js'
      ).default as LinkTo;
    } else {
      assert(
        `@isRouteExternal is only available when using the "ember-engines" addon. Please install it to use this feature.`,
        false
      );
    }
  }

  return LinkTo;
}
