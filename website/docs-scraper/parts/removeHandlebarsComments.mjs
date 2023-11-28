/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

// replace {{! ... }} handlebars comments

export const removeHandlebarsComments = (markdownContent) =>
  markdownContent.replace(/\{\{![^\}]+?\}\}/gim, '');
