/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export const globalAxeOptions = {
  include: [['#ember-testing-container']],
  exclude: [
    // see: https://github.com/algolia/autocomplete/issues/963#issuecomment-1127507049
    ['.aa-Autocomplete'],
  ],
};
