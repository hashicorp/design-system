/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

export const removeLinkToLinks = (markdownContent) =>
  markdownContent.replace(/<LinkTo [^>]+>(.*?)<\/LinkTo>/gim, '$1');
