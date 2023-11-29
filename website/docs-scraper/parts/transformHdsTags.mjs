/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import _ from 'lodash';

export const transformHdsTags = (markdownContent) =>
  markdownContent
    .replace(
      /<Hds::([^\s>]+)/gim,
      (_match, p1) => `<div hds-${p1.replace(/::/g, '_')}`
    )
    .replace(/<\/Hds::[^\s>]+>/gim, '</div>');
