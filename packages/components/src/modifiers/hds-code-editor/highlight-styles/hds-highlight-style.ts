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
    color: `var(--hds-code-block-syntax-highlight-color-cyan)`,
  },
  {
    tag: tags.url,
    color: `var(--hds-code-block-syntax-highlight-color-cyan)`,
  },
  {
    tag: tags.operator,
    color: `var(--hds-code-block-syntax-highlight-color-cyan)`,
  },
  {
    tag: tags.attributeValue,
    color: `var(--hds-code-block-syntax-highlight-color-cyan)`,
  },

  // Blue | Function, builtins
  {
    tag: tags.attributeName,
    color: `var(--hds-code-block-syntax-highlight-color-blue)`,
  },
  {
    tag: tags.function(tags.variableName),
    color: `var(--hds-code-block-syntax-highlight-color-blue)`,
  },
  {
    tag: tags.function(tags.propertyName),
    color: `var(--hds-code-block-syntax-highlight-color-blue)`,
  },

  // Orange | Strings, characters
  {
    tag: tags.string,
    color: `var(--hds-code-block-syntax-highlight-color-orange)`,
  },
  {
    tag: tags.regexp,
    color: `var(--hds-code-block-syntax-highlight-color-orange)`,
  },

  // Purple | Booleans, numbers
  {
    tag: tags.bool,
    color: `var(--hds-code-block-syntax-highlight-color-purple)`,
  },
  {
    tag: tags.number,
    color: `var(--hds-code-block-syntax-highlight-color-purple)`,
  },

  // Green | Keywords, class names, saving the world
  {
    tag: tags.keyword,
    color: `var(--hds-code-block-syntax-highlight-color-green)`,
  },
  {
    tag: tags.className,
    color: `var(--hds-code-block-syntax-highlight-color-green)`,
  },

  // Red | Important items
  {
    tag: tags.deleted,
    color: `var(--hds-code-block-syntax-highlight-color-red)`,
  },

  // White | Default color within the code block, also used for punctuation
  {
    tag: tags.name,
    color: `var(--hds-code-block-syntax-highlight-color-white)`,
  },
  {
    tag: tags.punctuation,
    color: `var(--hds-code-block-syntax-highlight-color-white)`,
  },
  // Gray | Used for comments across languages
  {
    tag: tags.comment,
    color: `var(--hds-code-block-foreground-color-primary)`,
  },

  // Markdown specific
  {
    tag: tags.heading,
    color: `var(--hds-code-block-syntax-highlight-color-blue)`,
    fontWeight: 'bold',
  },
  {
    tag: tags.strong,
    color: `var(--hds-code-block-syntax-highlight-color-orange)`,
    fontWeight: 'bold',
  },
  {
    tag: tags.emphasis,
    color: `var(--hds-code-block-syntax-highlight-color-orange)`,
    fontStyle: 'italic',
  },
  {
    tag: tags.link,
    color: `var(--hds-code-block-syntax-highlight-color-cyan)`,
    textDecoration: 'underline',
  },
  {
    tag: tags.quote,
    color: `var(--hds-code-block-foreground-color-primary)`,
    fontStyle: 'italic',
  },
  {
    tag: tags.list,
    color: `var(--hds-code-block-syntax-highlight-color-white)`,
  },
  {
    tag: tags.monospace,
    color: `var(--hds-code-block-syntax-highlight-color-green)`,
  },
]);

export default hdsHighlightStyle;
