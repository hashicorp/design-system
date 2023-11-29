/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

// replace <!-- algolia-ignore-start -->...<!-- algolia-ignore-end -->

export const removeIgnoredContent = (markdownContent) =>
  markdownContent.replace(
    /(<!-- algolia-ignore-start -->[\s\S]*?<!-- algolia-ignore-end -->)/gim,
    ''
  );
