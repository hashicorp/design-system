/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { remove } from 'unist-util-remove';

export const remarkRemoveComments = () => (tree) => {
  // inspired by: https://github.com/modernweb-dev/rocket/blob/754705423fc6c3f062f5818f9c979bf5988ad102/packages/mdjs-core/src/mdjsParse.js#L46
  remove(
    tree,
    (node) => node.type === 'html' && node.value.match(/<!--([\s\S]*?)-->/g),
  );
};
