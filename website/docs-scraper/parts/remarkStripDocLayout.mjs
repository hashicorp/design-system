/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { visit } from 'unist-util-visit';

export const remarkStripDocLayout = () => (tree) => {
  visit(tree, 'text', (node) => {
    node.value = node.value
      .replace(/<Doc::Layout .*?>/gim, '')
      .replace(/<\/Doc::Layout>/gim, '');
  });
};
