/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

// replace <!-- algolia-ignore-start -->...<!-- algolia-ignore-end -->

export const removeIgnoredContent = (markdownContent) =>
  markdownContent.replace(
    /(<!-- algolia-ignore-start -->[\s\S]*?<!-- algolia-ignore-end -->)/gim,
    '',
  );
