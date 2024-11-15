import { tags } from '@lezer/highlight';
import { HighlightStyle } from '@codemirror/language';

const HDS_CODE_BLUE = '#2d8eff';
const HDS_CODE_GREEN = '#86ff13';
const HDS_CODE_ORANGE = '#ffa800';
const HDS_CODE_PURPLE = '#c76cff';
const HDS_CODE_RED = '#ff3b20';
const HDS_CODE_CYAN = '#32fff7';

const hdsDarkHighlightStyle = HighlightStyle.define([
  { tag: tags.comment, color: '#b2b6bd' },
  { tag: tags.name, color: '#b2b6bd' },
  { tag: tags.className, color: HDS_CODE_BLUE },
  { tag: tags.string, color: HDS_CODE_ORANGE },
  { tag: tags.attributeName, color: HDS_CODE_BLUE },
  { tag: tags.attributeValue, color: HDS_CODE_ORANGE },
  { tag: tags.number, color: HDS_CODE_PURPLE },
  { tag: tags.bool, color: HDS_CODE_PURPLE },
  { tag: tags.regexp, color: HDS_CODE_ORANGE },
  { tag: tags.url, color: HDS_CODE_CYAN },
  { tag: tags.keyword, color: HDS_CODE_GREEN },
  { tag: tags.operator, color: HDS_CODE_CYAN },
  { tag: tags.punctuation, color: '#d5d7db' },
  { tag: tags.propertyName, color: HDS_CODE_BLUE },
  { tag: tags.deleted, color: HDS_CODE_RED },
  { tag: tags.function(tags.variableName), color: HDS_CODE_BLUE },
  { tag: tags.function(tags.propertyName), color: HDS_CODE_BLUE },
]);

export default hdsDarkHighlightStyle;
