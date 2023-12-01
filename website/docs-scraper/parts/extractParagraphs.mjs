/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { unified } from 'unified';
import { visit } from 'unist-util-visit';

import { stringifyChildNodes } from './stringifyChildNodes.mjs';
import { cleanupContent } from './cleanupContent.mjs';

// ========================================================================

export async function extractParagraphs(tree) {
  const paragraphs = [];

  const paragraphMapper = () => (tree) => {
    visit(
      tree,
      (node) => node.tagName === 'p' || node.tagName === 'li',
      (node) => {
        const content = stringifyChildNodes(node);
        paragraphs.push({
          content: cleanupContent(content),
          hierarchy: node.hierarchy,
        });
      }
    );
  };

  await unified().use(paragraphMapper).run(tree);

  // DEBUG - leave for debugging
  // console.log('PARAGRAPHS', paragraphs);

  return paragraphs;
}
