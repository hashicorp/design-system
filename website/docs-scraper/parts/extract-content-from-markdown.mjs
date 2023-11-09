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

import handlebars from 'handlebars';

import _ from 'lodash';

// plugins
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import remarkSqueezeParagraphs from 'remark-squeeze-paragraphs';
import remarkStripBadges from 'remark-strip-badges';
import removeComments from 'remark-remove-comments';

// TODO! understand how to do it with the current setup
// import { CRITERIA } from '../../app/components/doc/wcag-list/index.js';
import { CRITERIA } from './wcag-criteria.mjs';

const WCAG_CRITERIA = CRITERIA.reduce((acc, criteria) => {
  acc[criteria.number] = criteria;
  return acc;
}, {});

// customisations
const remarkHtmlSanitise = _.cloneDeep(defaultSchema, {
  // unfortunately tag names in the format `Doc::***` are not accepted so we have to convert all the `Doc::` tags to `doc-***` (custom HTML tags)
  tagNames: [
    'doc-a-11-y-support',
    'doc-badge',
    'doc-component-api',
    'doc-content-hds-principles',
    'doc-tokens-list',
    'doc-wcag-list',
  ],
});

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
  const wcagLists = [];

  // DEBUG - use for debugging purposes
  // const logNodes = () => (tree) => {
  //   visit(tree, (node) => {
  //     console.log('TYPE', node.type);
  //     console.log('LOG', JSON.stringify(node, null, 2));
  //   });
  // };

  const setNodesHierarchy = () => (tree) => {
    visit(tree, (node, index, parent) => {
      let hierarchy = [];
      if (parent) {
        if (index === 0) {
          // first child, use the parent hierarchy
          hierarchy = parent.hierarchy;
        } else if (index > 0) {
          // other children
          const previousNode = parent.children[index - 1];
          if (previousNode.hierarchy) {
            hierarchy = previousNode.hierarchy;
          }
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

  // we need to convert the `<Doc::***>` components to web-components-like code (HTML compatible)
  const standardizedContent = replaceDocTags(markdownContent);

  // processing pipeline
  await remark()
    .use(removeComments)
    .use(remarkHtml, { sanitize: remarkHtmlSanitise })
    .use(remarkGfm)
    .use(setNodesHierarchy)
    // .use(logNodes)
    .use(remarkStripBadges)
    .use(remarkSqueezeParagraphs)
    // "doc" (ember) nodes
    .use(wcagListMapper)
    .use(componentApiMapper)
    // standard nodes
    .use(headingMapper)
    .use(paragraphMapper)
    .use(tableMapper)
    // we use the "standardized" content here
    .process(standardizedContent);

  return { headings, paragraphs, tables, componentApis, wcagLists };
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

  return text.trim();
}
