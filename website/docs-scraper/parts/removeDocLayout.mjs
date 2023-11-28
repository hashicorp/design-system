/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export const removeDocLayout = (markdownContent) =>
  markdownContent
    .replace(/<Doc::Layout .*?>/gim, '')
    .replace(/<\/Doc::Layout>/gim, '');
