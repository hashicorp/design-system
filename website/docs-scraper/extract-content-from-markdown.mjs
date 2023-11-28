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

// import handlebars from 'handlebars';

// plugins
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import remarkFrontmatter from 'remark-frontmatter';

// local/custom
import { WCAG_CRITERIA } from './parts/getWcagCriteria.mjs';
import { removeIgnoredContent } from './parts/removeIgnoredContent.mjs';
import { removeContentBlocksDelimiters } from './parts/removeContentBlocksDelimiters.mjs';
import { replaceCustomImageFormat } from './parts/replaceCustomImageFormat.mjs';
import { transformDocWcagList } from './parts/transformDocWcagList.mjs';
import { transformDocTags } from './parts/transformDocTags.mjs';
import { transformHdsTags } from './parts/transformHdsTags.mjs';
import { remarkRemoveComments } from './parts/remarkRemoveComments.mjs';
import { remarkRemoveCodeBlocks } from './parts/remarkRemoveCodeBlocks.mjs';
import { remarkProcessDocWcagList } from './parts/remarkProcessDocWcagList.mjs';
import { removeDocA11ySupport } from './parts/removeDocA11ySupport.mjs';
import { removeDocBadge } from './parts/removeDocBadge.mjs';
import { removeDocLayout } from './parts/removeDocLayout.mjs';
// import { remarkStripHeliosHandlebarsExpressions } from './parts/remarkStripHeliosHandlebarsExpressions.mjs';
// import { remarkStripHeliosReleaseNotesMetadata } from './remarkStripHeliosReleaseNotesMetadata.mjs';
import { rehypeRemoveDocListContainer } from './parts/rehypeRemoveDocListContainer.mjs';
import { rehypeRemoveHdsElements } from './parts/rehypeRemoveHdsElements.mjs';
import { rehypeRemoveEmptyTextNodes } from './parts/rehypeRemoveEmptyTextNodes.mjs';
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
    visit(
      tree,
      (node) => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName),
      (node) => {
        const content = stringifyChildNodes(node);
        headings.push({
          content: content,
          level: node.depth,
          hierarchy: node.hierarchy,
        });
      }
    );
  };

  const paragraphMapper = () => (tree) => {
    visit(
      tree,
      (node) => node.tagName === 'p',
      (node) => {
        const content = stringifyChildNodes(node);
        paragraphs.push({ content: content, hierarchy: node.hierarchy });
      }
    );
  };

  const tableMapper = () => (tree) => {
    visit(
      tree,
      (node) => node.tagName === 'table',
      (node) => {
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
    );
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
    // has been transformed to a `<div doc-wcag-list />` HTML node
    visit(
      tree,
      (node) => {
        return (
          node.type === 'element' &&
          node.tagName === 'div' &&
          node.properties['doc-wcag-list'] !== undefined
        );
      },
      (node) => {
        const criteriaAttribute = node.properties['@criterialist'];
        const criteriaList = criteriaAttribute
          ? criteriaAttribute.split(' ')
          : [];
        if (criteriaList.length > 0) {
          const validCriteria = criteriaList.filter((criterion) =>
            Object.keys(WCAG_CRITERIA).includes(criterion)
          );
          if (validCriteria.length > 0) {
            wcagLists.push({
              criteria: validCriteria.map((criterion) =>
                _.pick(WCAG_CRITERIA[criterion], [
                  'number',
                  'title',
                  'description',
                ])
              ),
              hierarchy: node.hierarchy,
            });
          }
        }
      }
    );
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

  // remove content blocks delimiters
  markdownContent = removeContentBlocksDelimiters(markdownContent);

  // remove some <Doc::***/> elements
  markdownContent = removeDocA11ySupport(markdownContent);
  markdownContent = removeDocBadge(markdownContent);
  markdownContent = removeDocLayout(markdownContent);

  // process custom images (showdown.js format)
  markdownContent = replaceCustomImageFormat(markdownContent);

  // transform <Doc::WcagList/> components to HTML-compatible `<div [doc-wcag-list]>` tags
  markdownContent = transformDocWcagList(markdownContent);

  // transform <Doc::ComponentApi/> components to HTML-compatible `<div [doc-component-api]>` tags
  markdownContent = transformDocComponentApi(markdownContent);

  // transform remaining `<Doc::(*)>` and `<Hds::(*)>` components to HTML-compatible `<div [doc-*|hds-*]>` tags
  markdownContent = transformDocTags(markdownContent);
  markdownContent = transformHdsTags(markdownContent);

  // DEBUG - leave for debugging
  console.log('MARKDOWN CONTENT', markdownContent);

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

  // ✅ pre-emptively remove any comment, just in case
  tree = await unified().use(remarkRemoveComments).run(tree);

  // ✅ remove any code block
  tree = await unified().use(remarkRemoveCodeBlocks).run(tree);

  // ✅ process <Doc::WcagList/> elements and convert them to custom AST node
  // tree = await unified().use(remarkProcessDocWcagList).run(tree);

  // ✅ process <Doc::ComponentApi/> elements and convert them to custom AST node
  // tree = await unified().use(remarkProcessDocComponentApi).run(tree);

  // 🤔 remove handlebars expressions (`{{...}}`) so they don't pollute the paragraphs
  // tree = await unified().use(remarkStripHeliosHandlebarsExpressions).run(tree);

  // DEBUG - leave for debugging
  console.log('MARKDOWN TREE', JSON.stringify(tree, null, 2));

  // HTML AST PROCESSING
  // -------------------

  // now convert the tree to an HTML AST tree
  tree = await unified()
    .use(remarkParse)
    .use(remarkRehype, {
      allowDangerousHtml: true,
      // passThrough: ['doc-wcag-list'],
    })
    .use(rehypeRaw, {
      // passThrough: ['doc-wcag-list'],
    })
    .use(rehypeStringify, { closeSelfClosing: true })
    .run(tree);

  // ✅ remove Doc::ListContainer (doc::listcontainer) wrappers
  // tree = await unified().use(rehypeRemoveDocListContainer).run(tree);

  // ✅ remove <Hds::*/> (<div hds-*/>) nodes
  tree = await unified().use(rehypeRemoveHdsElements).run(tree);

  // ✅ remove empty text nodes and empty paragraphs
  tree = await unified().use(rehypeRemoveEmptyTextNodes).run(tree);
  tree = await unified().use(rehypeRemoveEmptyParagraphs).run(tree);

  // ✅ associate to each node the hierarchy in terms of headings level
  tree = await unified().use(setNodesHierarchy).run(tree);

  // DEBUG - leave for debugging
  console.log('HTML TREE', JSON.stringify(tree, null, 2));

  // EXTRACT CONTENT FROM RELEVANT NODES
  // -----------------------------------

  // // parse and index "doc" (ember) nodes for special components
  // .use(componentApiMapper)

  // parse and index relevant HTML nodes
  await unified()
    .use(headingMapper)
    .use(paragraphMapper)
    .use(tableMapper)
    .use(wcagListMapper)
    .run(tree);

  // console.log('HEADINGS', headings);
  // console.log('PARAGRAPHS', paragraphs);
  // console.log('TABLES', tables);
  // console.log('WCAGLISTS', JSON.stringify(wcagLists, null, 2));

  // TODO! remove debugging
  await fs.writeJSON(
    '/Users/cristianorastelli/src/hashicorp/design-system/website/OUTPUT.json',
    { headings, paragraphs, tables, componentApis, wcagLists },
    { spaces: 2, replacer: null }
  );

  return { headings, paragraphs, tables, componentApis, wcagLists };
}
