/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { visit, SKIP } from 'unist-util-visit';

export const rehypeRemoveChangelogMetadata = () => (tree) => {
  visit(
    tree,
    (node) => {
      return (
        node.type === 'element' &&
        node.tagName === 'small' &&
        node.properties.className &&
        node.properties.className[0] &&
        node.properties.className[0] === 'doc-whats-new-changelog-metadata'
      );
    },
    (node, index, parent) => {
      // see: https://unifiedjs.com/learn/recipe/remove-node/
      parent.children.splice(index, 1);
      return [SKIP, index];
    }
  );
};
