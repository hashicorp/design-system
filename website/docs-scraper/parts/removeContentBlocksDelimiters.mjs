/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

export const removeContentBlocksDelimiters = (markdownContent) =>
  markdownContent.replace(/^!!!.*$/gm, '').replace(/\n!!!$/gm, '');
