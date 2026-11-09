/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import postcss from 'postcss';

function isHeaderBlock(block) {
  return (
    /Copyright\b/.test(block) ||
    /SPDX-License-Identifier:/.test(block) ||
    /Do not edit directly, this file was auto-generated\./.test(block)
  );
}

function normalizeNodeSpacing(root) {
  if (!root.nodes?.length) {
    return;
  }

  root.nodes[0].raws.before = '';

  for (let index = 1; index < root.nodes.length; index++) {
    const node = root.nodes[index];
    const before = node.raws.before ?? '';

    node.raws.before = /\n\s*\n/.test(before) ? '\n\n' : '\n';
  }
}

function mergeSpacingIntoNextNode(node) {
  const nextNode = node.next();

  if (!nextNode) {
    return;
  }

  const removedBefore = node.raws.before ?? '';

  if (/\n\s*\n/.test(removedBefore)) {
    nextNode.raws.before = '\n\n';
  }
}

function sanitizeRoot(root) {
  const nodes = root.nodes ?? [];
  let firstContentIndex = 0;

  while (
    firstContentIndex < nodes.length &&
    nodes[firstContentIndex].type === 'atrule' &&
    nodes[firstContentIndex].name?.toLowerCase() === 'charset'
  ) {
    firstContentIndex++;
  }

  const firstContentNode = nodes[firstContentIndex];
  const canonicalHeaderNode =
    firstContentNode?.type === 'comment' && isHeaderBlock(firstContentNode.text)
      ? firstContentNode
      : null;

  root.walkComments((node) => {
    if (isHeaderBlock(node.text) && node !== canonicalHeaderNode) {
      mergeSpacingIntoNextNode(node);
      node.remove();
    }
  });

  normalizeNodeSpacing(root);
}

export function sanitizeGeneratedCssHeadersWithSourceMap(
  css,
  sourceMap,
  options = {}
) {
  const fromPath = options.from ?? sourceMap?.file ?? undefined;
  const toPath = options.to ?? fromPath;
  const processor = postcss([
    {
      postcssPlugin: 'sanitize-generated-css-headers',
      Once(root) {
        sanitizeRoot(root);
      },
    },
  ]);

  const result = processor.process(css, {
    from: fromPath,
    to: toPath,
    map: sourceMap
      ? {
          inline: false,
          annotation: false,
          prev: sourceMap,
        }
      : false,
  });

  return {
    css: result.css,
    sourceMap: result.map?.toJSON(),
  };
}

export function sanitizeGeneratedCssHeaders(css) {
  return sanitizeGeneratedCssHeadersWithSourceMap(css).css;
}
