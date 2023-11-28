/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import _ from 'lodash';

export const replaceDocTags = (markdownContent) =>
  markdownContent
    .replace(
      /<Doc::([^\s>]+)/gim,
      (_match, p1) => `<div hds-${_.kebabCase(p1)}`
    )
    .replace(/<\/Doc::[^\s>]+>/gim, '</div>');
