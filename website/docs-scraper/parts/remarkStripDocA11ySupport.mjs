/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { visit } from 'unist-util-visit';

export const remarkStripDocA11ySupport = () => (tree) => {
  visit(tree, 'text', (node) => {
    //eg. <Doc::A11ySupport />
    node.value = node.value.replace(/<Doc::A11ySupport \/>/gi, '');
  });
};
