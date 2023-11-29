/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { visit } from 'unist-util-visit';

export const remarkProcessDocWcagList = () => (tree) => {
  visit(tree, 'text', (node) => {
    // eg. <Doc::WcagList @criteriaList={{array "1.1.1" "1.2.1" ... }} />
    const match = node.value.match(
      /<Doc::WcagList @criteriaList={{array (.*)}} \/>/i
    );
    if (match) {
      node.type = 'doc-wcag-list';
      node.criteria = match[1].replaceAll('"', '').split(' ');
      node.position = { ...node.position };
      delete node.value;
    }
  });
};
