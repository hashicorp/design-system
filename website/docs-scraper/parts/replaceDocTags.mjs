/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

// import { kebabCase } from 'lodash'; // not sure why this doesn't work in a `.mjs` module
import _ from 'lodash';

// replace `<DOC::(*)>` tags with HTML-compatible `<doc->` custom tags

export const replaceDocTags = (markdownContent) =>
  markdownContent
    .replace(/(<\/?)C\.Property/gim, (_match, p1) => {
      const tag = p1 + 'Doc::ComponentApi::Property';
      return tag;
    })
    .replace(/(<\/?)(Doc::[^>\s]+)([^>]*)/gim, (_match, p1, p2, p3) => {
      const tag = p1 + _.kebabCase(p2).replaceAll('::', '-');
      // const attrs = p3.replaceAll('@', 'at-arg-').replace(/( as \|\w+\|)/, '');
      const attrs = p3.replace(/( as \|\w+\|)/, '');
      return `${tag}${attrs}`;
    });
