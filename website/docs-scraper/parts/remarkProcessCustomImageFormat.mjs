/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { visit } from 'unist-util-visit';

export const remarkProcessCustomImageFormat = () => (tree) => {
  visit(tree, 'text', (node) => {
    // this is a custom syntax coming from `shadowjs`
    // see: https://github.com/showdownjs/showdown/blob/95255984ad80acf745ed74605bd3ad8357dc9b33/src/subParsers/makehtml/images.js#L9
    const match = node.value.match(
      /!\[([^\]]*?)][ \t]*()\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/
    );
    if (match) {
      node.type = 'image';
      node.url = match[3] ?? '';
      node.alt = match[1] ?? '';
      node.title = null;
      node.position = { ...node.position };
      delete node.value;
    }
  });
};
