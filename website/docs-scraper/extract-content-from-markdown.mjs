/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import fs from 'fs-extra';

// unist/remark/mdast
import { unified } from 'unified';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import remarkFrontmatter from 'remark-frontmatter';

// local/custom
import { removeIgnoredContent } from './parts/removeIgnoredContent.mjs';
import { removeHandlebarsComments } from './parts/removeHandlebarsComments.mjs';
import { removeContentBlocksDelimiters } from './parts/removeContentBlocksDelimiters.mjs';
import { removeLinkToLinks } from './parts/removeLinkToLinks.mjs';
import { replaceCustomImageFormat } from './parts/replaceCustomImageFormat.mjs';
import { transformDocWcagList } from './parts/transformDocWcagList.mjs';
import { transformDocComponentApi } from './parts/transformDocComponentApi.mjs';
import { transformDocTags } from './parts/transformDocTags.mjs';
import { transformHdsTags } from './parts/transformHdsTags.mjs';
import { remarkRemoveComments } from './parts/remarkRemoveComments.mjs';
import { remarkRemoveCodeBlocks } from './parts/remarkRemoveCodeBlocks.mjs';
import { remarkSanitizeDocComponentApi } from './parts/remarkSanitizeDocComponentApi.mjs';
import { rehypeRemoveAllHdsElements } from './parts/rehypeRemoveAllHdsElements.mjs';
import { rehypeRemoveChangelogMetadata } from './parts/rehypeRemoveChangelogMetadata.mjs';
import { rehypeRemoveNonRelevantDocElements } from './parts/rehypeRemoveNonRelevantDocElements.mjs';
import { rehypeRemoveEmptyTextNodes } from './parts/rehypeRemoveEmptyTextNodes.mjs';
import { rehypeRemoveEmptyParagraphs } from './parts/rehypeRemoveEmptyParagraphs.mjs';
import { rehypeSanitizeTextNodes } from './parts/rehypeSanitizeTextNodes.mjs';
import { setNodesHierarchy } from './parts/setNodesHierarchy.mjs';
import { extractHeadings } from './parts/extractHeadings.mjs';
import { extractParagraphs } from './parts/extractParagraphs.mjs';
import { extractTables } from './parts/extractTables.mjs';
import { extractComponentApis } from './parts/extractComponentApis.mjs';
import { extractWcagLists } from './parts/extractWcagLists.mjs';

// debugging
// import { debugLogNodes } from './parts/debugLogNodes.mjs';

// ========================================================================

export async function parseMarkdown(markdownContent) {
  // --------------------
  // PROCESSING PIPELINE
  // --------------------

  // DEBUG - leave for debugging
  // const fileContent = await fs.readFile(
  //   './docs/testing/markdown/scraping-playground.md'
  // );
  // markdownContent = fileContent.toString();

  // remove content included in `<!-- algolia-ignore-[start/end] -->` delimiters
  markdownContent = removeIgnoredContent(markdownContent);

  // remove handlebars comments
  markdownContent = removeHandlebarsComments(markdownContent);

  // remove content blocks delimiters
  markdownContent = removeContentBlocksDelimiters(markdownContent);

  // remove <LinkTo @...> links
  markdownContent = removeLinkToLinks(markdownContent);

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
  // console.log('MARKDOWN CONTENT', markdownContent);

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

  // pre-emptively remove any comment, just in case
  tree = await unified().use(remarkRemoveComments).run(tree);

  // remove any code block
  tree = await unified().use(remarkRemoveCodeBlocks).run(tree);

  // sanitize Doc::ComponentApi (<doc-component-api>) nodes
  tree = await unified().use(remarkSanitizeDocComponentApi).run(tree);

  // DEBUG - leave for debugging
  // console.log('MARKDOWN TREE', JSON.stringify(tree, null, 2));

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

  // remove non-relevant <Doc::*/> (<div doc-*/>) nodes
  tree = await unified().use(rehypeRemoveNonRelevantDocElements).run(tree);

  // remove every <Hds::*/> (<div hds-*/>)  nodes
  tree = await unified().use(rehypeRemoveAllHdsElements).run(tree);

  // remove "What's new" changelog metadata (<small>#1234 - Thanks…</small>)
  tree = await unified().use(rehypeRemoveChangelogMetadata).run(tree);

  // remove empty text nodes and empty paragraphs
  tree = await unified().use(rehypeRemoveEmptyTextNodes).run(tree);
  tree = await unified().use(rehypeRemoveEmptyParagraphs).run(tree);

  // sanitize the "text" content
  tree = await unified().use(rehypeSanitizeTextNodes).run(tree);

  // associate to each node the hierarchy in terms of headings level
  tree = await unified().use(setNodesHierarchy).run(tree);

  // DEBUG - leave for debugging
  // console.log('HTML TREE', JSON.stringify(tree, null, 2));

  // EXTRACT CONTENT FROM RELEVANT NODES
  // -----------------------------------

  const headings = await extractHeadings(tree);
  const paragraphs = await extractParagraphs(tree);
  const componentApis = await extractComponentApis(tree);
  const tables = await extractTables(tree);
  const wcagLists = await extractWcagLists(tree);

  // DEBUG - leave for debugging
  // console.log('PARAGRAPHS', paragraphs);

  return { headings, paragraphs, tables, componentApis, wcagLists };
}
