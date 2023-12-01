/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import { selectAll } from 'unist-util-select';

import { stringifyChildNodes } from './stringifyChildNodes.mjs';
import { cleanupContent } from './cleanupContent.mjs';

// ========================================================================

export async function extractTables(tree) {
  const tables = [];

  const tableMapper = () => (tree) => {
    visit(
      tree,
      (node) => node.tagName === 'table',
      (node) => {
        const cells = selectAll(
          'element[tagName=th], element[tagName=td]',
          node
        );
        const content = cells
          .map((cell) => stringifyChildNodes(cell))
          .join(' ');
        tables.push({
          content: cleanupContent(content),
          hierarchy: node.hierarchy,
        });
      }
    );
  };

  await unified().use(tableMapper).run(tree);

  // DEBUG - leave for debugging
  // console.log('TABLES', tables);

  return tables;
}
