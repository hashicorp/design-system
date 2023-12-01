/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { visit } from 'unist-util-visit';

export const remarkSanitizeDocComponentApi = () => (tree) => {
  visit(tree, 'html', (node) => {
    const match = node.value.match(
      /^<doc-component-api>([\s\S]*)<\/doc-component-api>$/gim
    );
    if (match) {
      // convert the content and tags enclosed in backticks to plain strings so they're not interpreted as HTML nodes down the line
      node.value = node.value
        .replace(
          /`(.*?)`/gim,
          (_match, p1) => `${p1.replace('<', '&#60;').replace('>', '&#62;')}`
        )
        .replace(
          /@name="(.*?)"/gim,
          (_match, p1) =>
            `@name="${p1.replace('<', '&#60;').replace('>', '&#62;')}"`
        );
    }
  });
};
