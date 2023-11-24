/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

// remark
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { remark } from 'remark';
import { visit } from 'unist-util-visit';
import { selectAll } from 'unist-util-select';
import { fromHtml } from 'hast-util-from-html';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { toString } from 'mdast-util-to-string';

import handlebars from 'handlebars';

import _ from 'lodash';

// plugins
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';

// local/custom
import { WCAG_CRITERIA } from './parts/getWcagCriteria.mjs';
import { replaceDocTags } from './parts/replaceDocTags.mjs';
import { remarkRemoveComments } from './parts/remarkRemoveComments.mjs';
import { remarkRemoveCodeBlocks } from './parts/remarkRemoveCodeBlocks.mjs';
import { remarkRemoveEmptyParagraphs } from './parts/remarkRemoveEmptyParagraphs.mjs';
import { remarkProcessCustomImageFormat } from './parts/remarkProcessCustomImageFormat.mjs';
import { remarkStripHeliosContentBlocksDelimiters } from './parts/remarkStripHeliosContentBlocksDelimiters.mjs';
import { remarkStripHeliosHandlebarsExpressions } from './parts/remarkStripHeliosHandlebarsExpressions.mjs';
// import { remarkStripHeliosReleaseNotesMetadata } from './remarkStripHeliosReleaseNotesMetadata.mjs';
import { remarkHtmlSanitise } from './parts/remarkHtmlSanitise.mjs';
import { setNodesHierarchy } from './parts/setNodesHierarchy.mjs';
import { stringifyChildNodes } from './parts/stringifyChildNodes.mjs';

// debugging
import { debugLogNodes } from './parts/debugLogNodes.mjs';

// ========================================================================

export async function parseMarkdown(markdownContent) {
  const headings = [];
  const paragraphs = [];
  const tables = [];
  const componentApis = [];
  const wcagLists = [];

  // inspired by: https://github.com/hashicorp/mktg-content-workflows/blob/main/shared/search/collect-headings.ts
  const headingMapper = () => (tree) => {
    visit(tree, 'heading', (node) => {
      const content = stringifyChildNodes(node);
      headings.push({
        content: content,
        level: node.depth,
        hierarchy: node.hierarchy,
      });
    });
  };

  const paragraphMapper = () => (tree) => {
    visit(tree, 'paragraph', (node) => {
      // TODO!
      // How do we avoid HTML tags (eg. `<code>`) be indexed as words, but return only their "innerText"?
      const content = stringifyChildNodes(node);
      paragraphs.push({ content: content, hierarchy: node.hierarchy });
    });
  };

  const tableMapper = () => (tree) => {
    visit(tree, 'table', (node) => {
      const cells = selectAll('tableCell', node);
      const content = cells.map((cell) => stringifyChildNodes(cell)).join(' ');
      tables.push({ content: content, hierarchy: node.hierarchy });
    });
  };

  const componentApiMapper = () => (tree) => {
    visit(tree, 'html', (node) => {
      // https://github.com/syntax-tree/hast-util-from-html
      const root = fromHtml(node.value, { fragment: true });
      // console.log('HTML-TREE', JSON.stringify(root, null, 2));
      root.children.forEach((element) => {
        if (
          element.type === 'element' &&
          element.tagName === 'doc-component-api' &&
          element.children
        ) {
          const properties = [];
          element.children.forEach((subelement) => {
            if (
              subelement.type === 'element' &&
              subelement.tagName === 'doc-component-api-property' &&
              subelement.children
            ) {
              let propertyName;
              let propertyDescription = '';
              if (subelement.properties['@name']) {
                propertyName = subelement.properties['@name'];
              }
              subelement.children
                .filter((child) => child.type === 'text')
                .forEach((textNode) => {
                  // important: we need to trim the text, to remove leading/trailing newlines that cause the `fromMarkdown` to generate multiple children
                  const text = toString(fromMarkdown(textNode.value.trim()));
                  // we prepend a space to avoid words being joined together
                  propertyDescription += ` ${text}`;
                });
              properties.push({
                name: propertyName,
                value: propertyDescription.trim(),
              });
            }
          });
          if (properties.length > 0) {
            componentApis.push({
              properties,
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
        }
      });
    });
  };

  const wcagListMapper = () => (tree) => {
    // the `<Doc::WcagList @criteriaList={{array "1.1.1" "2.2.2" />`
    // becomes a `text` node within a `paragraph` node
    // so we have to do some magic here... ¯\_(ツ)_/¯
    visit(tree, 'text', (node) => {
      const match = node.value.match(
        /<doc-wcag-list @criteriaList={{array .*}} \/>/i
      );
      if (match) {
        const hbsAST = handlebars.parse(node.value);
        const criteriaList = hbsAST.body.filter(
          (node) =>
            node?.type === 'MustacheStatement' &&
            node?.path?.original === 'array'
        );
        let criteriaIdentifiers;
        if (
          criteriaList &&
          criteriaList.length > 0 &&
          criteriaList[0].params &&
          criteriaList[0].params.length > 0
        ) {
          criteriaIdentifiers = criteriaList[0].params.reduce((acc, param) => {
            if (
              param.type === 'StringLiteral' &&
              Object.keys(WCAG_CRITERIA).includes(param.value)
            ) {
              acc.push(param.value);
            }
            return acc;
          }, []);
        }
        if (criteriaIdentifiers.length > 0) {
          wcagLists.push({
            criteria: criteriaIdentifiers.map((criterion) => {
              return _.pick(WCAG_CRITERIA[criterion], [
                'number',
                'title',
                'description',
              ]);
            }),
            hierarchy: node.hierarchy,
          });
        }
      }
    });
  };

  // --------------------
  // PROCESSING PIPELINE
  // --------------------

  // we need to convert the `<Doc::***>` components to web-components-like code (HTML compatible)
  const standardizedContent = replaceDocTags(markdownContent);

  // MARKDOWN AST PROCESSING

  let tree = await unified()
    // convert the markdown to AST
    .use(remarkParse)
    // interpret special GFM markdown format
    .use(remarkGfm)
    // convert markdown to HTML (TODO do we need it? what happens if we remove this?)
    // .use(remarkHtml, { sanitize: remarkHtmlSanitise })
    .parse(standardizedContent);

  // ✅ process custom images (showdown.js format)
  tree = await unified().use(remarkProcessCustomImageFormat).run(tree);

  // ✅ pre-emptively remove any comment, just in case
  tree = await unified().use(remarkRemoveComments).run(tree);

  // ✅ remove any code block
  tree = await unified().use(remarkRemoveCodeBlocks).run(tree);

  // ✅ remove content blocks delimiters
  tree = await unified()
    .use(remarkStripHeliosContentBlocksDelimiters)
    .run(tree);

  // 🤔 remove handlebars expressions (`{{...}}`) so they don't pollute the paragraphs
  tree = await unified().use(remarkStripHeliosHandlebarsExpressions).run(tree);

  // ✅ remove empty paragraphs
  tree = await unified().use(remarkRemoveEmptyParagraphs).run(tree);

  // ✅ associate to each node the hierarchy in terms of headings level
  tree = await unified().use(setNodesHierarchy).run(tree);

  // console.log('TREE BEFORE', JSON.stringify(tree, null, 2));
  // console.log('TREE AFTER', JSON.stringify(tree, null, 2));

  // HTML AST PROCESSING

  const html = await unified()
    .use(remarkParse)
    // .use(remarkHtml, { sanitize: remarkHtmlSanitise })
    // .use(remarkRehype)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .run(tree);

  console.log('HTML', JSON.stringify(html, null, 2));

  // process the relevant nodes

  // // parse and index "doc" (ember) nodes for special components
  // .use(wcagListMapper)
  // .use(componentApiMapper)

  // parse and index standard nodes
  // await unified()
  //   .use(headingMapper)
  //   .use(paragraphMapper)
  //   .use(tableMapper)
  //   .parse(tree);

  return { headings, paragraphs, tables, componentApis, wcagLists };
}
