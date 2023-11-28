/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export const removeDocBadge = (markdownContent) =>
  //eg. <Doc::Badge @type='success'>Conformant</Doc::Badge>
  markdownContent.replace(/<Doc::Badge .*?>.*?<\/Doc::Badge>/i, '');
