/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const mapElementsToClassNames = {
  h1: 'doc-markdown-h1',
  h2: 'doc-markdown-h2',
  h3: 'doc-markdown-h3',
  h4: 'doc-markdown-h4',
  h5: 'doc-markdown-h5',
  h6: 'doc-markdown-h6',
  p: 'doc-markdown-p',
  blockquote: 'doc-markdown-blockquote',
  ul: 'doc-markdown-ul',
  ol: 'doc-markdown-ol',
  li: 'doc-markdown-li',
  img: 'doc-markdown-img',
  a: 'doc-markdown-a',
  table: 'doc-markdown-table',
  thead: 'doc-markdown-thead',
  tbody: 'doc-markdown-tbody',
  tr: 'doc-markdown-tr',
  td: 'doc-markdown-td',
  th: 'doc-markdown-th',
  pre: 'doc-markdown-pre',
  code: 'doc-markdown-code',
  hr: 'doc-markdown-hr',
};

export const elementsToClassNames = Object.keys(mapElementsToClassNames).map(
  (element) => ({
    type: 'output',
    // this is a custom regex, modified from the one found in the original tutolrial, to make it more solid and encompass more use cases
    // for testing see: https://regex101.com/r/jLk7wN/2 + https://regex101.com/r/jLk7wN/5
    // IMPORTANT: we NEED to set the "g" global option here!
    regex: new RegExp(`<${element}>|<${element} ([^>]*)>`, 'g'),
    replace: function (text) {
      // IMPORTANT: we DO NOT NEED to set the "g" global option here!
      const regexBasic = new RegExp(`<${element}>`);
      const matchBasic = text.match(regexBasic);
      const regexWithAttrs = new RegExp(`<${element} ([^>]*)>`);
      const matchWithAttrs = text.match(regexWithAttrs);

      let attrs;

      // eg. <h1> <p> <td>
      if (matchBasic) {
        attrs = `class="${mapElementsToClassNames[element]}"`;
      }
      // eg. <hr /> <th style="text-align:center;"> <pre class="language-shell"><code class="shell language-shell">
      if (matchWithAttrs) {
        const rest = matchWithAttrs[1];
        if (rest.includes('class="')) {
          attrs = rest.replace(
            'class="',
            `class="${mapElementsToClassNames[element]} `
          );
        } else {
          attrs = `class="${mapElementsToClassNames[element]}" ${rest}`;
        }
      }

      return `<${element} ${attrs}>`;
    },
  })
);
