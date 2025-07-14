/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

// Borrowed from: https://github.com/hashicorp/cloud-ui/blob/e9447532aa361eb2868c341a363de06c9c1ecf8b/addons/common/package/src/utils/ember.ts
import type Route from '@ember/routing/route';

/**
    Get the resolved type of an item.

    - If the item is a promise, the result will be the resolved value type
    - If the item is not a promise, the result will just be the type of the item
   */
export type Resolved<P> = P extends Promise<infer T> ? T : P;

/** Get the resolved model value from a route. */
export type ModelFrom<R extends Route> = Resolved<ReturnType<R['model']>>;
