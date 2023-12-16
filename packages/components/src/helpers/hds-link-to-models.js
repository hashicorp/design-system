/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { helper } from '@ember/component/helper';
import { assert } from '@ember/debug';

/*
 * This helper can be used to support both @model and @models arguments when wrapping
 * the `<LinkTo>` component without it triggering assertions or having to use the component helper.
 *
 * The result of this helper should be passed into the `@models` argument of the `<LinkTo>` component:
 *
 * ```hbs
 * <LinkTo @models={{hds-link-to-models @model @models}} />
 * ```
 */

export function hdsLinkToModels([model, models]) {
  assert(
    'You cannot provide both the `@model` and `@models` arguments to the component.',
    !model || !models
  );

  if (model) {
    return [model];
  } else if (models) {
    return models;
  } else {
    return [];
  }
}

export default helper(hdsLinkToModels);
