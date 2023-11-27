/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { remove } from 'unist-util-remove';

export const rehypeRemoveDocListContainer = () => (tree) => {
  remove(tree, 'element', (node) => node.tagName === 'doc::listcontainer');
};
