/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { tags } from '@lezer/highlight';
import { HighlightStyle } from '@codemirror/language';
import {
  HDS_CODE_BLOCK_BLUE,
  HDS_CODE_BLOCK_GREEN,
  HDS_CODE_BLOCK_ORANGE,
  HDS_CODE_BLOCK_PURPLE,
  HDS_CODE_BLOCK_RED,
  HDS_CODE_BLOCK_CYAN,
  HDS_CODE_BLOCK_WHITE,
  HDS_CODE_EDITOR_COLOR_FOREGROUND_PRIMARY,
} from '../palettes/hds-dark-palette.ts';

const hdsDarkHighlightStyle = HighlightStyle.define([
  // Cyan | Property, url, or operator
  { tag: tags.propertyName, color: HDS_CODE_BLOCK_CYAN },
  { tag: tags.url, color: HDS_CODE_BLOCK_CYAN },
  { tag: tags.operator, color: HDS_CODE_BLOCK_CYAN },
  { tag: tags.attributeValue, color: HDS_CODE_BLOCK_CYAN },

  // Blue | Function, builtins
  { tag: tags.attributeName, color: HDS_CODE_BLOCK_BLUE },
  { tag: tags.function(tags.variableName), color: HDS_CODE_BLOCK_BLUE },
  { tag: tags.function(tags.propertyName), color: HDS_CODE_BLOCK_BLUE },

  // Orange | Strings, characters
  { tag: tags.string, color: HDS_CODE_BLOCK_ORANGE },
  { tag: tags.regexp, color: HDS_CODE_BLOCK_ORANGE },

  // Purple | Booleans, numbers
  { tag: tags.bool, color: HDS_CODE_BLOCK_PURPLE },
  { tag: tags.number, color: HDS_CODE_BLOCK_PURPLE },

  // Green | Keywords, class names, saving the world
  { tag: tags.keyword, color: HDS_CODE_BLOCK_GREEN },
  { tag: tags.className, color: HDS_CODE_BLOCK_GREEN },

  // Red | Important items
  { tag: tags.deleted, color: HDS_CODE_BLOCK_RED },

  // White | Default color within the code block, also used for punctuation
  { tag: tags.name, color: HDS_CODE_BLOCK_WHITE },
  { tag: tags.punctuation, color: HDS_CODE_BLOCK_WHITE },

  // Gray | Used for comments across languages
  { tag: tags.comment, color: HDS_CODE_EDITOR_COLOR_FOREGROUND_PRIMARY },

  // Markdown specific
  { tag: tags.heading, color: HDS_CODE_BLOCK_BLUE, fontWeight: 'bold' },
  { tag: tags.strong, color: HDS_CODE_BLOCK_ORANGE, fontWeight: 'bold' },
  { tag: tags.emphasis, color: HDS_CODE_BLOCK_ORANGE, fontStyle: 'italic' },
  { tag: tags.link, color: HDS_CODE_BLOCK_CYAN, textDecoration: 'underline' },
  {
    tag: tags.quote,
    color: HDS_CODE_EDITOR_COLOR_FOREGROUND_PRIMARY,
    fontStyle: 'italic',
  },
  { tag: tags.list, color: HDS_CODE_BLOCK_WHITE },
  { tag: tags.monospace, color: HDS_CODE_BLOCK_GREEN },
]);

export default hdsDarkHighlightStyle;
