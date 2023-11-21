/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { visit } from 'unist-util-visit';

export const remarkStripHeliosContentBlocksDelimiters = () => (tree) => {
  visit(tree, 'text', (node, index, parent) => {
    if (parent.type === 'paragraph') {
      node.value = node.value.replace(/^!!!.*$/g, '');
    }
  });
};
