/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { remove } from 'unist-util-remove';

export const remarkRemoveCodeBlocks = () => (tree) => {
  remove(tree, (node) => node.type === 'code');
};
