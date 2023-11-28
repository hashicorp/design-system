/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { visit, SKIP } from 'unist-util-visit';

export const rehypeRemoveEmptyTextNodes = () => (tree) => {
  visit(tree, 'text', (node, index, parent) => {
    if (node.value.trim() === '') {
      // see: https://unifiedjs.com/learn/recipe/remove-node/
      parent.children.splice(index, 1);
      return [SKIP, index];
    }
  });
};
