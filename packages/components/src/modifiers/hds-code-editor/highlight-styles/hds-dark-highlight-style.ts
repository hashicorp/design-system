import { tags } from '@lezer/highlight';
import { HighlightStyle } from '@codemirror/language';
import {
  HDS_CODE_BLOCK_BLUE,
  HDS_CODE_BLOCK_GREEN,
  HDS_CODE_BLOCK_ORANGE,
  HDS_CODE_BLOCK_PURPLE,
  HDS_CODE_BLOCK_RED,
  HDS_CODE_BLOCK_CYAN,
  HDS_CODE_EDITOR_COLOR_FOREGROUND_PRIMARY,
} from '../palettes/hds-dark-palette.ts';

const hdsDarkHighlightStyle = HighlightStyle.define([
  { tag: tags.comment, color: HDS_CODE_EDITOR_COLOR_FOREGROUND_PRIMARY },
  { tag: tags.name, color: HDS_CODE_EDITOR_COLOR_FOREGROUND_PRIMARY },
  { tag: tags.className, color: HDS_CODE_BLOCK_BLUE },
  { tag: tags.string, color: HDS_CODE_BLOCK_ORANGE },
  { tag: tags.attributeName, color: HDS_CODE_BLOCK_BLUE },
  { tag: tags.attributeValue, color: HDS_CODE_BLOCK_ORANGE },
  { tag: tags.number, color: HDS_CODE_BLOCK_PURPLE },
  { tag: tags.bool, color: HDS_CODE_BLOCK_PURPLE },
  { tag: tags.regexp, color: HDS_CODE_BLOCK_ORANGE },
  { tag: tags.url, color: HDS_CODE_BLOCK_CYAN },
  { tag: tags.keyword, color: HDS_CODE_BLOCK_GREEN },
  { tag: tags.operator, color: HDS_CODE_BLOCK_CYAN },
  { tag: tags.punctuation, color: HDS_CODE_EDITOR_COLOR_FOREGROUND_PRIMARY },
  { tag: tags.propertyName, color: HDS_CODE_BLOCK_BLUE },
  { tag: tags.deleted, color: HDS_CODE_BLOCK_RED },
  { tag: tags.function(tags.variableName), color: HDS_CODE_BLOCK_BLUE },
  { tag: tags.function(tags.propertyName), color: HDS_CODE_BLOCK_BLUE },
]);

export default hdsDarkHighlightStyle;
