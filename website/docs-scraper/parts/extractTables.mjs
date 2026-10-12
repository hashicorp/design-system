/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import { selectAll } from 'unist-util-select';

import { stringifyChildNodes } from './stringifyChildNodes.mjs';
import { cleanupContent } from './cleanupContent.mjs';

// ========================================================================

// Algolia rejects records bigger than 10KB, so we split large tables in multiple chunks (leaving room for the other record attributes)
// see: https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/in-depth/index-and-records-size-and-usage-limitations/#record-size-limits
const MAX_CONTENT_BYTES = 5000;

const stringifyCells = (node) =>
  selectAll('element[tagName=th], element[tagName=td]', node)
    .map((cell) => stringifyChildNodes(cell))
    .join(' ');

export async function extractTables(tree) {
  const tables = [];

  const tableMapper = () => (tree) => {
    visit(
      tree,
      (node) => node.tagName === 'table',
      (node) => {
        const content = cleanupContent(stringifyCells(node));

        if (Buffer.byteLength(content) <= MAX_CONTENT_BYTES) {
          tables.push({ content, hierarchy: node.hierarchy });
          return;
        }

        let chunk = '';
        selectAll('element[tagName=tr]', node).forEach((row) => {
          const rowContent = cleanupContent(stringifyCells(row));
          if (!rowContent) {
            return;
          }
          const candidate = chunk ? `${chunk} ${rowContent}` : rowContent;
          if (chunk && Buffer.byteLength(candidate) > MAX_CONTENT_BYTES) {
            tables.push({ content: chunk, hierarchy: node.hierarchy });
            chunk = rowContent;
          } else {
            chunk = candidate;
          }
        });
        if (chunk) {
          tables.push({ content: chunk, hierarchy: node.hierarchy });
        }
      },
    );
  };

  await unified().use(tableMapper).run(tree);

  // DEBUG - leave for debugging
  // console.log('TABLES', tables);

  return tables;
}
