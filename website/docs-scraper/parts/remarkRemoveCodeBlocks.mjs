/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { remove } from 'unist-util-remove';

export const remarkRemoveCodeBlocks = () => (tree) => {
  remove(tree, (node) => node.type === 'code');
};
