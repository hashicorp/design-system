//
// inspired by: https://github.com/hashicorp/mktg-content-workflows/blob/main/shared/search/collect-headings.ts
//

import { remark } from 'remark';
import { visit } from 'unist-util-visit';

export async function collectHeadings(markdownContent) {
  const headings = [];

  const headingMapper = () => (tree) => {
    visit(tree, 'heading', (node) => {
      const content = stringifyChildNodes(node);
      headings.push({ content: content, level: node.depth });
    });
  };

  await remark().use(headingMapper).process(markdownContent);

  return headings;
}

// ====================================

// collect text from children nodes of a parent node.
// notice: this will visit nodes recursively via "depth-first" strategy.

function stringifyChildNodes(node) {
  const text = node.children.reduce((acc, child) => {
    if ('children' in child) {
      acc += stringifyChildNodes(child);
    } else if ('value' in child) {
      acc += child.value;
    }
    return acc;
  }, '');

  return text;
}
