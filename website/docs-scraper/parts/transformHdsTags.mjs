/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import _ from 'lodash';

export const transformHdsTags = (markdownContent) =>
  markdownContent
    .replace(
      /<Hds::([^\s>]+)/gim,
      (_match, p1) => `<div hds-${_.kebabCase(p1)}`
    )
    .replace(/<\/Hds::[^\s>]+>/gim, '</div>');
