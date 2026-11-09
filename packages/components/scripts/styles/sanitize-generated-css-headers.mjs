/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

const HEADER_BLOCK_REGEX = /\/\*[\s\S]*?\*\//g;

function isHeaderBlock(block) {
  return (
    /Copyright\b/.test(block) ||
    /SPDX-License-Identifier:/.test(block) ||
    /Do not edit directly, this file was auto-generated\./.test(block)
  );
}

export function sanitizeGeneratedCssHeaders(css) {
  let charsetPrefix = '';
  let remainder = css;
  const charsetMatch = css.match(/^(@charset[^;]+;\s*)/);

  if (charsetMatch) {
    charsetPrefix = charsetMatch[1];
    remainder = css.slice(charsetPrefix.length);
  }

  let canonicalHeader = '';
  const topCommentMatch = remainder.match(/^\s*(\/\*[\s\S]*?\*\/)/);
  if (topCommentMatch && isHeaderBlock(topCommentMatch[1])) {
    canonicalHeader = topCommentMatch[1].trim();
  }

  remainder = remainder.replace(HEADER_BLOCK_REGEX, (block) =>
    isHeaderBlock(block) ? '' : block
  );
  remainder = remainder.replace(/\n{3,}/g, '\n\n');
  remainder = remainder.trimStart();

  if (!canonicalHeader) {
    return `${charsetPrefix}${remainder}`;
  }

  return `${charsetPrefix}${canonicalHeader}\n${remainder}`;
}
