/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { visit } from 'unist-util-visit';

export const remarkStripHeliosHandlebarsExpressions = () => (tree) => {
  const handler = (node) => {
    node.value = node.value.replace(/\{\{[\s]*.*?[\s]*\}\}/g, '');
  };
  visit(tree, 'text', handler);
  visit(tree, 'html', handler);
};
