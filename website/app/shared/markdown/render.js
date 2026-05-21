/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

const elementClassMap = {
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

const sectionRegex =
  /^<section data-tab="([^"]+)">((?:.|\n)*?)<\/section>$/gm;

const contentBlockRegex = /^!!! (\w+)[\n\s]((?:.|\n)*?)!!!$/gm;

const demoBlockRegex =
  /<\?php start="demo-block" filename="(.*?)" hbs="(.*?)" js="(.*?)" gts="(.*?)" compactGts="(.*?)" custom="(.*?)" customLang="(.*?)" hidePreview="(.*?)" expanded="(.*?)" \?>\s*<\?php end="demo-block"\s*\?>/g;

const blockCustomElementRegex =
  /<p class="doc-markdown-p">\s*(<((Doc::|Hds::)[^>\s]+)[^>]*?(?:\/>|>[\s\S]*?<\/\2>))\s*<\/p>/g;

const inlineImageSizeRegex =
  /!\[([^\]]*?)\]\(\s*<?([^\s)>]+(?:\([^\s)]*\)[^\s)]*)?)>?\s+=([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4})(?:\s+(["'])(.*?)\5)?\s*\)/gim;

const referenceDefinitionWithSizeRegex =
  /^\[([^\]]+)\]:\s*(\S+)\s+=([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4})(?:\s+(?:"([^"]*)"|'([^']*)'))?\s*$/gim;

const referenceImageRegex = /!\[([^\]]*?)\]\[([^\]]+)\]/g;

const escapeHtml = (value = '') =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

const escapeAttribute = (value = '') => escapeHtml(String(value));

const rawHtmlOpenTagRegex = new RegExp(
  `<(${Object.keys(elementClassMap).join('|')})(\\s[^>]*?)?(\\s*\\/?)>`,
  'g',
);

const rawHtmlClassAttributeRegex = /\bclass=(['"])(.*?)\1/i;

const addClassName = (node, className) => {
  if (!className) {
    return;
  }

  const existing = node.properties?.className ?? [];
  const classNames = Array.isArray(existing)
    ? existing
    : String(existing)
        .split(' ')
        .filter(Boolean);

  if (!classNames.includes(className)) {
    classNames.unshift(className);
  }

  node.properties = {
    ...node.properties,
    className: classNames,
  };
};

const decorateRawHtml = (value = '') =>
  value.replace(
    rawHtmlOpenTagRegex,
    (_match, tagName, attributes = '', selfClosing = '') => {
      const className = elementClassMap[tagName];

      if (!className) {
        return _match;
      }

      if (rawHtmlClassAttributeRegex.test(attributes)) {
        return `<${tagName}${attributes.replace(
          rawHtmlClassAttributeRegex,
          (_classMatch, quote, classValue) => {
            const classNames = classValue.split(/\s+/).filter(Boolean);

            if (!classNames.includes(className)) {
              classNames.unshift(className);
            }

            return `class=${quote}${classNames.join(' ')}${quote}`;
          },
        )}${selfClosing}>`;
      }

      return `<${tagName} class="${className}"${attributes}${selfClosing}>`;
    },
  );

const getNodeText = (node) => {
  if (!node) {
    return '';
  }

  if (node.type === 'text') {
    return node.value;
  }

  if (!node.children) {
    return '';
  }

  return node.children.map((child) => getNodeText(child)).join('');
};

const slugify = (text) =>
  text
    .trim()
    .toLowerCase()
    .replace(/<[^>]*>/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');

const getUniqueSlug = (text, slugCounts) => {
  const baseSlug = slugify(text) || 'section';
  const count = slugCounts.get(baseSlug) ?? 0;

  slugCounts.set(baseSlug, count + 1);

  if (count === 0) {
    return baseSlug;
  }

  return `${baseSlug}-${count}`;
};

const markdownRenderer = (slugCounts) =>
  unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, {
      allowDangerousHtml: true,
    })
    .use(function rehypeDecorateElements() {
      return function (tree) {
        visit(tree, (node) => node.type === 'element' || node.type === 'raw', (node) => {
          if (node.type === 'raw') {
            node.value = decorateRawHtml(node.value);

            return;
          }

          addClassName(node, elementClassMap[node.tagName]);

          if (/^h[1-6]$/.test(node.tagName) && !node.properties?.id) {
            node.properties = {
              ...node.properties,
              id: getUniqueSlug(getNodeText(node), slugCounts),
            };
          }
        });
      };
    })
    .use(rehypeStringify, {
      allowDangerousHtml: true,
      closeSelfClosing: true,
    });

const renderImageTag = ({ src, alt, title, width, height }) => {
  const attributes = [`class="doc-markdown-img"`, `src="${escapeAttribute(src)}"`];

  if (alt !== undefined) {
    attributes.push(`alt="${escapeAttribute(alt)}"`);
  }

  if (title) {
    attributes.push(`title="${escapeAttribute(title)}"`);
  }

  if (width && width !== '*') {
    attributes.push(`width="${escapeAttribute(width)}"`);
  }

  if (height && height !== '*') {
    attributes.push(`height="${escapeAttribute(height)}"`);
  }

  return `<img ${attributes.join(' ')} />`;
};

const preprocessCustomImages = (markdown) => {
  const imageReferences = new Map();

  let output = markdown.replace(
    referenceDefinitionWithSizeRegex,
    (_match, label, src, width, height, titleDouble, titleSingle) => {
      imageReferences.set(label.toLowerCase(), {
        src,
        width,
        height,
        title: titleDouble ?? titleSingle ?? '',
      });

      return '';
    },
  );

  output = output.replace(referenceImageRegex, (match, alt, label) => {
    const reference = imageReferences.get(label.toLowerCase());

    if (!reference) {
      return match;
    }

    return renderImageTag({
      ...reference,
      alt,
    });
  });

  return output.replace(
    inlineImageSizeRegex,
    (_match, alt, src, width, height, _quote, title = '') =>
      renderImageTag({
        src,
        alt,
        title,
        width,
        height,
      }),
  );
};

const replaceDemoBlocks = (markdown) =>
  markdown.replace(
    demoBlockRegex,
    (
      _match,
      filename,
      hbs,
      js,
      gts,
      compactGts,
      custom,
      customLang,
      hidePreview,
      expanded,
    ) =>
      `<Doc::CodeGroup @filename="${filename}" @hbsSnippet="${hbs}" @jsSnippet="${js}" @gtsSnippet="${gts}" @compactGtsSnippet="${compactGts}" @customSnippet="${custom}" @customLang="${customLang}" @hidePreview="${hidePreview}" @isExpanded="${expanded}"></Doc::CodeGroup>`,
  );

const removeWrappedCustomElements = (html) =>
  html.replace(blockCustomElementRegex, (_match, element) => element);

const expandCustomBlocks = (markdown, slugCounts) => {
  let output = replaceDemoBlocks(markdown);

  output = output.replace(sectionRegex, (_match, tab, content) => {
    const id = slugify(tab) || 'section';

    return `<section id="${escapeAttribute(id)}" data-tab="${escapeAttribute(tab)}">\n${renderMarkdown(content, slugCounts)}\n</section>`;
  });

  output = output.replace(contentBlockRegex, (_match, type, content) => {
    const normalizedType = type.toLowerCase();

    if (normalizedType === 'do' || normalizedType === 'dont') {
      return `<Doc::DoDont @type="${normalizedType}">\n${renderMarkdown(content, slugCounts)}\n</Doc::DoDont>`;
    }

    return `<Doc::Banner @type="${normalizedType}">\n${renderMarkdown(content, slugCounts)}\n</Doc::Banner>`;
  });

  return output;
};

export const renderMarkdown = (markdown = '', slugCounts = new Map()) => {
  const expandedMarkdown = expandCustomBlocks(markdown, slugCounts);
  const normalizedMarkdown = preprocessCustomImages(expandedMarkdown);
  const renderedHtml = markdownRenderer(slugCounts)
    .processSync(normalizedMarkdown)
    .toString();

  return removeWrappedCustomElements(renderedHtml);
};
