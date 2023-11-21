/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { visit } from 'unist-util-visit';

export const debugLogNodes = () => (tree) => {
  visit(tree, (node, _index, parent) => {
    // if (node.type === 'text') {
    if (node.type !== 'root') {
      // if (node.type === 'text' && parent.type === 'paragraph') {
      console.log('TYPE', node.type);
      console.log('LOG', JSON.stringify(node, null, 2));
      // if (node.value) {
      //   console.log('VALUE', node.value);
      // }
      console.log('-----------------');
    }
  });
};
