/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { visit } from 'unist-util-visit';

export const remarkStripDocBadge = () => (tree) => {
  visit(tree, 'text', (node) => {
    //eg. <Doc::Badge @type='success'>Conformant</Doc::Badge>
    node.value = node.value.replace(/<Doc::Badge .*?>.*?<\/Doc::Badge>/i, '');
  });
};
