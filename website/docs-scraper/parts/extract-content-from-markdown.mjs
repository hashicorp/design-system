//
// inspired by: https://github.com/hashicorp/mktg-content-workflows/blob/main/shared/search/collect-headings.ts
//

// remark
import { remark } from 'remark';
import { visit } from 'unist-util-visit';
import { selectAll } from 'unist-util-select';
import { defaultSchema } from 'hast-util-sanitize';
import { fromHtml } from 'hast-util-from-html';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { toString } from 'mdast-util-to-string';

import _ from 'lodash';

// plugins
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import remarkSqueezeParagraphs from 'remark-squeeze-paragraphs';
import remarkStripBadges from 'remark-strip-badges';
import removeComments from 'remark-remove-comments';

// customisations
const remarkHtmlSanitise = _.cloneDeep(defaultSchema, {
  // unfortunately tag names in the forma `Doc::***` are not accepted so we have to convert all the `Doc::` tags to `doc-***` (custom HTML tags)
  tagNames: [
    'doc-a-11-y-support',
    'doc-badge',
    'doc-component-api',
    'doc-content-hds-principles',
    'doc-tokens-list',
    'doc-wcag-list',
  ],
});

// const remarkHtmlHandlers = {
//   image(h, node, ...rest) {
//     // console.log('NODE', JSON.stringify(node, null, 2));
//     // console.log('REST', JSON.stringify(rest, null, 2));
//     // const props = { hello: 'world!' };
//     // return h(node, node, props);
//   },
// };

// replace `<DOC::(*)>` tags with HTML-compatible `<doc->` custom tags
const replaceDocTags = (markdownContent) =>
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

// ========================================================================

export async function parseMarkdown(markdownContent) {
  const headings = [];
  const paragraphs = [];
  const tables = [];
  const componentApis = [];

  // DEBUG - use for debugging purposes
  // const logNodes = () => (tree) => {
  //   visit(tree, (node) => {
  //     // console.log('LOG', JSON.stringify(node, null, 2));
  //     console.log('TYPE', node.type);
  //   });
  // };

  const setNodesHierarchy = () => (tree) => {
    visit(tree, (node, index, parent) => {
      let hierarchy = [];
      if (parent && index > 0) {
        const previousNode = parent.children[index - 1];
        if (previousNode.hierarchy) {
          hierarchy = previousNode.hierarchy;
        }
      }
      if (node.type === 'heading') {
        const depth = node.depth;
        const content = stringifyChildNodes(node);
        // set a new hierarchy
        // 1) keep only the levels preceding the current depth
        // notice: depth is 1-based, array is 0-based, but we want to leave the position/depth "0" for the main page title, which it added later
        hierarchy = hierarchy.slice(0, depth);
        // 2) add the content to the hierarchy
        // notice: we use index-based notation instead of `push()` to make sure the lenght of the array coincides with the correct "depth"
        hierarchy[depth] = content;
        // 3) assign the hierarchy to the "heading" node
        node.hierarchy = hierarchy;
      } else {
        // simply assign the previous node's hierarchy to the current node (they're sibling)
        node.hierarchy = hierarchy;
      }
      // TODO! use this one to log the nodes and see the content that is added incorrectly and should be skipped
      // if (node.type === 'paragraph') {
      //   console.log('NODE', node.type, stringifyChildNodes(node));
      // }
    });
  };

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
      const content = cells.map((cell) => stringifyChildNodes(cell)).join('');
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
              hierarchy: [null, 'Component API'],
            });
          }
        }
      });
    });
  };

  // we need to convert the `<Doc::***>` components to web-components-like code (HTML compatible)
  const standardizedContent = replaceDocTags(markdownContent);

  // processing pipeline
  await remark()
    .use(removeComments)
    .use(remarkHtml, {
      sanitize: remarkHtmlSanitise,
      // handlers: remarkHtmlHandlers,
    })
    .use(remarkGfm)
    // .use(logNodes)
    .use(setNodesHierarchy)
    .use(remarkStripBadges)
    .use(remarkSqueezeParagraphs)
    .use(headingMapper)
    .use(paragraphMapper)
    .use(tableMapper)
    .use(componentApiMapper)
    // we use the "sanitized" content here
    .process(standardizedContent);

  return { headings, paragraphs, tables, componentApis };
}

// ====================================

// collect text from children nodes of a parent node.
// notice: this will visit nodes recursively via "depth-first" strategy.

function stringifyChildNodes(node) {
  const text = node.children.reduce((acc, child) => {
    if ('children' in child) {
      acc += stringifyChildNodes(child);
    } else if ('value' in child) {
      acc += ` ${child.value}`;
    }
    return acc;
  }, '');

  return text;
}
