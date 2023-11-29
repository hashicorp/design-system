/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { visit } from 'unist-util-visit';

export const remarkStripContentBlocksDelimiters = () => (tree) => {
  visit(tree, 'text', (node) => {
    node.value = node.value.replace(/^!!!.*$/gm, '').replace(/\n!!!$/gm, '');
  });
};
