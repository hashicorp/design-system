/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { visit } from 'unist-util-visit';

import { stringifyChildNodes } from './stringifyChildNodes.mjs';

export const setNodesHierarchy = () => (tree) => {
  visit(tree, (node, index, parent) => {
    let hierarchy = {
      // this will be populated later, at page level
      lvl1: undefined,
      // we set this to `null` so they're explicitly not set
      lvl2: null,
      lvl3: null,
      lvl4: null,
      lvl5: null,
      lvl6: null,
    };

    if (parent) {
      if (index === 0) {
        // first child, use the parent hierarchy
        hierarchy = { ...parent.hierarchy };
      } else if (index > 0) {
        // other children
        const previousNode = parent.children[index - 1];
        if (previousNode.hierarchy) {
          hierarchy = { ...previousNode.hierarchy };
        }
      }
    }

    if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName)) {
      const depth = parseInt(node.tagName.replace('h', ''));
      const content = stringifyChildNodes(node);
      // set a new hierarchy
      // 1) keep only the levels preceding the current depth
      for (let index = depth; index <= 6; index++) {
        hierarchy[`lvl${index}`] = null;
      }
      // 2) add the current heading's content to the hierarchy
      hierarchy[`lvl${depth}`] = content;
      // 3) assign the hierarchy to the "heading" node
      node.hierarchy = { ...hierarchy };
      // 4) assign the "depth" to the heading
      node.depth = depth;
    } else {
      // simply assign the previous node's hierarchy to the current node (they're sibling)
      node.hierarchy = { ...hierarchy };
    }
  });
};
