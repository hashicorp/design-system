/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { visit } from 'unist-util-visit';

// TODO! not sure how to target only the `<small>` tag in the release notes pages
export const remarkStripHeliosReleaseNotesMetadata = () => (tree) => {
  visit(tree, 'html', (node, index, parent) => {
    // console.log(JSON.stringify(node, null, 2));
    console.log(node.value);
  });
};
