/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { visit, SKIP } from 'unist-util-visit';

export const remarkStripHeliosContentBlocksDelimiters = () => (tree) => {
  visit(tree, 'text', (node, index, parent) => {
    if (parent.type === 'paragraph') {
      if (node.value.match(/^!!!.*$/)) {
        // see: https://unifiedjs.com/learn/recipe/remove-node/
        parent.children.splice(index, 1);
        return [SKIP, index];
      } else if (node.value.match(/\n!!!$/gm)) {
        console.log('FOUND!');
        node.value = node.value.replace(/\n!!!$/gm, '');
      }
    }
  });
};
