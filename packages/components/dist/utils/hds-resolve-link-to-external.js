import { LinkTo } from '@ember/routing';
import { assert } from '@ember/debug';

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */


/**
 * Resolves the correct component to use for the `LinkTo`.
 *
 * @param isRouteExternal - If true, will return the `LinkToExternal` component. If `ember-engines` is not installed, an assertion will be thrown.
 * @returns A promise resolving to the correct component to use for the `LinkTo`.
 */
async function hdsResolveLinkToExternal(isRouteExternal) {
  if (isRouteExternal) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const mod = await import(
      // @ts-expect-error: we list this as optional peer dependency
      'ember-engines/components/link-to-external-component');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return mod.default;
    } catch {
      assert(`@isRouteExternal is only available when using the "ember-engines" addon. Please install it to use this feature.`, false);
    }
  }
  return LinkTo;
}

export { hdsResolveLinkToExternal };
//# sourceMappingURL=hds-resolve-link-to-external.js.map
