/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { visit, SKIP } from 'unist-util-visit';

export const rehypeRemoveEmptyParagraphs = () => (tree) => {
  visit(tree, 'element', (node, index, parent) => {
    if (
      node.tagName === 'p' &&
      (!node.children ||
        node.children.length === 0 ||
        node.children.every(
          (child) => child.type === 'text' && child.value.trim() === ''
        ))
    ) {
      // see: https://unifiedjs.com/learn/recipe/remove-node/
      parent.children.splice(index, 1);
      return [SKIP, index];
    }
  });
};
