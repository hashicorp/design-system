/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { visit } from 'unist-util-visit';

export const rehypeSanitizeTextNodes = () => (tree) => {
  visit(tree, 'text', (node) => {
    node.value = node.value
      // eg. \{{on "change" this.onChange}}
      .replace(/\\{{/g, '{{')
      // revert the <Hds::*> tags inlined in the text to their original format (see: transformHdsTags)
      .replace(
        /<div hds-([^>]+?)>/gim,
        (_match, p1) => `<Hds::${p1.replace('_', '::')}>`
      );
  });
};
