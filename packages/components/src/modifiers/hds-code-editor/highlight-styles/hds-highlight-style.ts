/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { tags } from '@lezer/highlight';
import { HighlightStyle } from '@codemirror/language';

const hdsHighlightStyle = HighlightStyle.define([
  // Cyan | Property, url, or operator
  {
    tag: tags.propertyName,
    color: `var(--token-code-block-syntax-highlight-color-cyan)`,
  },
  {
    tag: tags.url,
    color: `var(--token-code-block-syntax-highlight-color-cyan)`,
  },
  {
    tag: tags.operator,
    color: `var(--token-code-block-syntax-highlight-color-cyan)`,
  },
  {
    tag: tags.attributeValue,
    color: `var(--token-code-block-syntax-highlight-color-cyan)`,
  },

  // Blue | Function, builtins
  {
    tag: tags.attributeName,
    color: `var(--token-code-block-syntax-highlight-color-blue)`,
  },
  {
    tag: tags.function(tags.variableName),
    color: `var(--token-code-block-syntax-highlight-color-blue)`,
  },
  {
    tag: tags.function(tags.propertyName),
    color: `var(--token-code-block-syntax-highlight-color-blue)`,
  },

  // Orange | Strings, characters
  {
    tag: tags.string,
    color: `var(--token-code-block-syntax-highlight-color-orange)`,
  },
  {
    tag: tags.regexp,
    color: `var(--token-code-block-syntax-highlight-color-orange)`,
  },

  // Purple | Booleans, numbers
  {
    tag: tags.bool,
    color: `var(--token-code-block-syntax-highlight-color-purple)`,
  },
  {
    tag: tags.number,
    color: `var(--token-code-block-syntax-highlight-color-purple)`,
  },

  // Green | Keywords, class names, saving the world
  {
    tag: tags.keyword,
    color: `var(--token-code-block-syntax-highlight-color-green)`,
  },
  {
    tag: tags.className,
    color: `var(--token-code-block-syntax-highlight-color-green)`,
  },

  // Red | Important items
  {
    tag: tags.deleted,
    color: `var(--token-code-block-syntax-highlight-color-red)`,
  },

  // White | Default color within the code block, also used for punctuation
  {
    tag: tags.name,
    color: `var(--token-code-block-syntax-highlight-color-white)`,
  },
  {
    tag: tags.punctuation,
    color: `var(--token-code-block-syntax-highlight-color-white)`,
  },
  // Gray | Used for comments across languages
  {
    tag: tags.comment,
    color: `var(--token-code-block-foreground-color-primary)`,
  },

  // Markdown specific
  {
    tag: tags.heading,
    color: `var(--token-code-block-syntax-highlight-color-blue)`,
    fontWeight: 'bold',
  },
  {
    tag: tags.strong,
    color: `var(--token-code-block-syntax-highlight-color-orange)`,
    fontWeight: 'bold',
  },
  {
    tag: tags.emphasis,
    color: `var(--token-code-block-syntax-highlight-color-orange)`,
    fontStyle: 'italic',
  },
  {
    tag: tags.link,
    color: `var(--token-code-block-syntax-highlight-color-cyan)`,
    textDecoration: 'underline',
  },
  {
    tag: tags.quote,
    color: `var(--token-code-block-foreground-color-primary)`,
    fontStyle: 'italic',
  },
  {
    tag: tags.list,
    color: `var(--token-code-block-syntax-highlight-color-white)`,
  },
  {
    tag: tags.monospace,
    color: `var(--token-code-block-syntax-highlight-color-green)`,
  },
]);

export default hdsHighlightStyle;
