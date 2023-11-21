/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { defaultSchema } from 'hast-util-sanitize';

import _ from 'lodash';

export const remarkHtmlSanitise = _.cloneDeep(defaultSchema, {
  // unfortunately tag names in the format `Doc::***` are not accepted so we have to convert all the `Doc::` tags to `doc-***` (custom HTML tags)
  tagNames: [
    'doc-a-11-y-support',
    'doc-badge',
    'doc-component-api',
    'doc-content-hds-principles',
    'doc-tokens-list',
    'doc-wcag-list',
  ],
});
