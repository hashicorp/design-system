/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

// replace {{! ... }} handlebars comments

export const removeHandlebarsComments = (markdownContent) =>
  // eslint-disable-next-line no-useless-escape
  markdownContent.replace(/\{\{![^\}]+?\}\}/gim, '');
