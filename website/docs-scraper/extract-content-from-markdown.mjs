/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import fs from 'fs-extra';

import _ from 'lodash';

// remark
import { unified } from 'unified';
// import { remark } from 'remark';
import { visit } from 'unist-util-visit';
import { selectAll } from 'unist-util-select';
import { fromHtml } from 'hast-util-from-html';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { toString } from 'mdast-util-to-string';

import handlebars from 'handlebars';

// plugins
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import remarkFrontmatter from 'remark-frontmatter';

// local/custom
import { WCAG_CRITERIA } from './parts/getWcagCriteria.mjs';
import { replaceDocComponentApiTags } from './parts/replaceDocComponentApiTags.mjs';
import { removeIgnoredContent } from './parts/removeIgnoredContent.mjs';
import { remarkRemoveComments } from './parts/remarkRemoveComments.mjs';
import { remarkRemoveCodeBlocks } from './parts/remarkRemoveCodeBlocks.mjs';
import { remarkProcessCustomImageFormat } from './parts/remarkProcessCustomImageFormat.mjs';
import { remarkStripContentBlocksDelimiters } from './parts/remarkStripContentBlocksDelimiters.mjs';
import { remarkProcessDocWcagList } from './parts/remarkProcessDocWcagList.mjs';
import { remarkStripDocA11ySupport } from './parts/remarkStripDocA11ySupport.mjs';
import { remarkStripDocBadge } from './parts/remarkStripDocBadge.mjs';
import { remarkStripDocLayout } from './parts/remarkStripDocLayout.mjs';
import { remarkStripHeliosHandlebarsExpressions } from './parts/remarkStripHeliosHandlebarsExpressions.mjs';
// import { remarkStripHeliosReleaseNotesMetadata } from './remarkStripHeliosReleaseNotesMetadata.mjs';
import { rehypeRemoveDocListContainer } from './parts/rehypeRemoveDocListContainer.mjs';
import { rehypeRemoveEmptyParagraphs } from './parts/rehypeRemoveEmptyParagraphs.mjs';
import { setNodesHierarchy } from './parts/setNodesHierarchy.mjs';
import { stringifyChildNodes } from './parts/stringifyChildNodes.mjs';

// debugging
// import { debugLogNodes } from './parts/debugLogNodes.mjs';

// ========================================================================

export async function parseMarkdown(markdownContent) {
  const headings = [];
  const paragraphs = [];
  const tables = [];
  const componentApis = [];
  const wcagLists = [];

  // inspired by: https://github.com/hashicorp/mktg-content-workflows/blob/main/shared/search/collect-headings.ts
  const headingMapper = () => (tree) => {
    visit(tree, 'element', (node) => {
      if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName)) {
        const content = stringifyChildNodes(node);
        headings.push({
          content: content,
          level: node.depth,
          hierarchy: node.hierarchy,
        });
      }
    });
  };

  const paragraphMapper = () => (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'p') {
        const content = stringifyChildNodes(node);
        paragraphs.push({ content: content, hierarchy: node.hierarchy });
      }
    });
  };

  const tableMapper = () => (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'table') {
        const cells = selectAll(
          'element[tagName=th], element[tagName=td]',
          node
        );
        const content = cells
          .map((cell) => stringifyChildNodes(cell))
          .join(' ')
          .replace(/[\s\n]+/g, ' ');
        tables.push({ content: content, hierarchy: node.hierarchy });
      }
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

  const testFile =
    '/Users/cristianorastelli/src/hashicorp/design-system/website/docs/testing/markdown/scraping-playground.md';

  // TODO! remove! override
  const fileContent = await fs.readFile(testFile);
  markdownContent = fileContent.toString();

  // remove content included in `<!-- algolia-ignore-[start/end] -->` delimiters
  markdownContent = removeIgnoredContent(markdownContent);

  // replace `<Doc::ComponentApi(::*)>` tags with web-components-like `<doc-component-api>` custom tags (HTML compatible)
  markdownContent = replaceDocComponentApiTags(markdownContent);

  // MARKDOWN AST PROCESSING
  // -----------------------

  // build an AST from the (sanitized) markdown
  let tree = await unified()
    // convert the markdown to AST
    .use(remarkParse)
    // interpret special GFM markdown format
    .use(remarkGfm)
    // interpret the frontmatter block
    .use(remarkFrontmatter, { type: 'yaml', marker: '-' })
    // parse the markdown
    .parse(markdownContent);

  // ✅ process custom images (showdown.js format)
  tree = await unified().use(remarkProcessCustomImageFormat).run(tree);

  // ✅ pre-emptively remove any comment, just in case
  tree = await unified().use(remarkRemoveComments).run(tree);

  // ✅ remove any code block
  tree = await unified().use(remarkRemoveCodeBlocks).run(tree);

  // ✅ remove content blocks delimiters
  tree = await unified().use(remarkStripContentBlocksDelimiters).run(tree);

  // ✅ process <Doc::WcagList/> elements and convert the to custom AST node
  tree = await unified().use(remarkProcessDocWcagList).run(tree);

  // ✅ remove some <Doc::***/> elements
  tree = await unified().use(remarkStripDocA11ySupport).run(tree);
  tree = await unified().use(remarkStripDocBadge).run(tree);
  tree = await unified().use(remarkStripDocLayout).run(tree);

  // 🤔 remove handlebars expressions (`{{...}}`) so they don't pollute the paragraphs
  // tree = await unified().use(remarkStripHeliosHandlebarsExpressions).run(tree);

  // DEBUG - leave for debugging
  // console.log('MARKDOWN TREE', JSON.stringify(tree, null, 2));

  // HTML AST PROCESSING
  // -------------------

  // now convert the tree to an HTML AST tree
  tree = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify, { closeSelfClosing: true })
    .run(tree);

  // ✅ remove Doc::ListContainer (doc::listcontainer) wrappers
  tree = await unified().use(rehypeRemoveDocListContainer).run(tree);

  // ✅ remove empty paragraphs
  tree = await unified().use(rehypeRemoveEmptyParagraphs).run(tree);

  // ✅ associate to each node the hierarchy in terms of headings level
  tree = await unified().use(setNodesHierarchy).run(tree);

  // DEBUG - leave for debugging
  console.log('HTML TREE', JSON.stringify(tree, null, 2));

  // EXTRACT CONTENT FROM RELEVANT NODES
  // -----------------------------------

  // // parse and index "doc" (ember) nodes for special components
  // .use(wcagListMapper)
  // .use(componentApiMapper)

  // parse and index relevant nodes
  await unified()
    .use(headingMapper)
    .use(paragraphMapper)
    .use(tableMapper)
    .run(tree);

  // console.log('HEADINGS', headings);
  // console.log('PARAGRAPHS', paragraphs);
  console.log('TABLES', tables);

  return { headings, paragraphs, tables, componentApis, wcagLists };
}
