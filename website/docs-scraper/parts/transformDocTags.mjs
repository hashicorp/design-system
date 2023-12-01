/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import _ from 'lodash';

export const transformDocTags = (markdownContent) =>
  markdownContent
    .replace(
      /<Doc::([^\s>]+)/gim,
      (_match, p1) => `<div doc-${_.kebabCase(p1)}`
    )
    .replace(/<\/Doc::[^\s>]+>/gim, '</div>');
