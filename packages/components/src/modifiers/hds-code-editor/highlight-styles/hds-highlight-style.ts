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
    color: `var(--token-code-block-color-palette-cyan)`,
  },
  { tag: tags.url, color: `var(--token-code-block-color-palette-cyan)` },
  { tag: tags.operator, color: `var(--token-code-block-color-palette-cyan)` },
  {
    tag: tags.attributeValue,
    color: `var(--token-code-block-color-palette-cyan)`,
  },

  // Blue | Function, builtins
  {
    tag: tags.attributeName,
    color: `var(--token-code-block-color-palette-blue)`,
  },
  {
    tag: tags.function(tags.variableName),
    color: `var(--token-code-block-color-palette-blue)`,
  },
  {
    tag: tags.function(tags.propertyName),
    color: `var(--token-code-block-color-palette-blue)`,
  },

  // Orange | Strings, characters
  { tag: tags.string, color: `var(--token-code-block-color-palette-orange)` },
  { tag: tags.regexp, color: `var(--token-code-block-color-palette-orange)` },

  // Purple | Booleans, numbers
  { tag: tags.bool, color: `var(--token-code-block-color-palette-purple)` },
  { tag: tags.number, color: `var(--token-code-block-color-palette-purple)` },

  // Green | Keywords, class names, saving the world
  { tag: tags.keyword, color: `var(--token-code-block-color-palette-green)` },
  { tag: tags.className, color: `var(--token-code-block-color-palette-green)` },

  // Red | Important items
  { tag: tags.deleted, color: `var(--token-code-block-color-palette-red)` },

  // White | Default color within the code block, also used for punctuation
  { tag: tags.name, color: `var(--token-code-block-color-palette-white)` },
  {
    tag: tags.punctuation,
    color: `var(--token-code-block-color-palette-white)`,
  },
  // Gray | Used for comments across languages
  {
    tag: tags.comment,
    color: `var(--token-code-block-color-foreground-primary)`,
  },

  // Markdown specific
  {
    tag: tags.heading,
    color: `var(--token-code-block-color-palette-blue)`,
    fontWeight: 'bold',
  },
  {
    tag: tags.strong,
    color: `var(--token-code-block-color-palette-orange)`,
    fontWeight: 'bold',
  },
  {
    tag: tags.emphasis,
    color: `var(--token-code-block-color-palette-orange)`,
    fontStyle: 'italic',
  },
  {
    tag: tags.link,
    color: `var(--token-code-block-color-palette-cyan)`,
    textDecoration: 'underline',
  },
  {
    tag: tags.quote,
    color: `var(--token-code-block-color-foreground-primary)`,
    fontStyle: 'italic',
  },
  { tag: tags.list, color: `var(--token-code-block-color-palette-white)` },
  { tag: tags.monospace, color: `var(--token-code-block-color-palette-green)` },
]);

export default hdsHighlightStyle;
