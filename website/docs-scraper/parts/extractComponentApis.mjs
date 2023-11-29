/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { toString } from 'mdast-util-to-string';

import { cleanupContent } from './cleanupContent.mjs';

// ========================================================================

export async function extractComponentApis(tree) {
  const componentApis = [];

  const componentApiMapper = () => (tree) => {
    visit(
      tree,
      (node) => node.tagName === 'doc-component-api-property',
      (node) => {
        let propertyName;
        let propertyDescription = '';
        if (node.properties['@name']) {
          propertyName = node.properties['@name'];
        }
        node.children
          .filter((child) => child.type === 'text')
          .forEach((textNode) => {
            // important: we need to trim the text, to remove leading/trailing newlines that cause the `fromMarkdown` to generate multiple children
            const text = toString(fromMarkdown(textNode.value.trim()));
            // we prepend a space to avoid words being joined together
            propertyDescription += ` ${text}`;
          });
        componentApis.push({
          name: propertyName,
          value: cleanupContent(propertyDescription),
          hierarchy: {
            lvl1: undefined,
            lvl2: 'Component API',
            lvl3: null,
            lvl4: null,
            lvl5: null,
            lvl6: null,
          },
        });
      }
    );
  };

  await unified().use(componentApiMapper).run(tree);

  // DEBUG - leave for debugging
  // console.log('COMPONENT APIS', JSON.stringify(componentApis, null, 2));

  return componentApis;
}
