/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { unified } from 'unified';
import { visit } from 'unist-util-visit';

import { stringifyChildNodes } from './stringifyChildNodes.mjs';
import { cleanupContent } from './cleanupContent.mjs';

// ========================================================================

export async function extractHeadings(tree) {
  const headings = [];

  // inspired by: https://github.com/hashicorp/mktg-content-workflows/blob/main/shared/search/collect-headings.ts
  const headingMapper = () => (tree) => {
    visit(
      tree,
      (node) => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName),
      (node) => {
        const content = stringifyChildNodes(node);
        headings.push({
          content: cleanupContent(content),
          level: node.depth,
          hierarchy: node.hierarchy,
        });
      }
    );
  };

  await unified().use(headingMapper).run(tree);

  // DEBUG - leave for debugging
  // console.log('HEADINGS', headings);

  return headings;
}
