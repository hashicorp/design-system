/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { LinkTo } from '@ember/routing';
import { assert } from '@ember/debug';

/**
 * Resolves the correct component to use for the `LinkTo`.
 *
 * @param isRouteExternal - If true, will return the `LinkToExternal` component. If `ember-engines` is not installed, an assertion will be thrown.
 * @returns A promise resolving to the correct component to use for the `LinkTo`.
 */
export async function hdsResolveLinkToExternal(
  isRouteExternal?: boolean
): Promise<typeof LinkTo> {
  if (isRouteExternal) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const mod = await import(
        // @ts-expect-error: we list this as optional peer dependency
        'ember-engines/components/link-to-external-component'
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return mod.default as typeof LinkTo;
    } catch {
      assert(
        `@isRouteExternal is only available when using the "ember-engines" addon. Please install it to use this feature.`,
        false
      );
    }
  }

  return LinkTo;
}
