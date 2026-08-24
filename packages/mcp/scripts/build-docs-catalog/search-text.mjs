/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// reduces a chunk's markdown to the plain prose the server scores against, and harvests the
// component names worth searching for out of the code it discards

import { DEMO_BLOCK } from "./assembly.mjs";
import { FENCED_CODE } from "./markdown.mjs";

export const ALGOLIA_IGNORE =
  /<!--[ \t]*algolia-ignore-start[ \t]*-->[\s\S]*?<!--[ \t]*algolia-ignore-end[ \t]*-->/g;
export const ALGOLIA_IGNORE_MARKER =
  /^[ \t]*<!--[ \t]*algolia-ignore-(?:start|end)[ \t]*-->[ \t]*(?:\r?\n)?/gm;

const HANDLEBARS_COMMENT = /\{\{!--[\s\S]*?--\}\}|\{\{![\s\S]*?\}\}/g;
const HANDLEBARS_EXPRESSION = /\\?\{\{[\s\S]*?\}\}/g;
const CALLOUT_DELIMITER = /^!!![ \t]*(.*)$/gm;
const MARKDOWN_IMAGE = /!\[([^\]]*)\]\([^)]*\)/g;
const MARKDOWN_LINK = /\[((?:[^[\]]|\[[^\]]*\])*)\]\([^)]*\)/g;
const TABLE_SEPARATOR_ROW =
  /^[ \t]*\|?[ \t]*:?-{2,}:?[ \t]*(\|[ \t]*:?-{2,}:?[ \t]*)*\|?[ \t]*$/gm;

const TAG = /<\/?([A-Za-z][\w.:-]*)(?:"[^"]*"|'[^']*'|[^>"'])*>/g;
const TAG_ATTRIBUTE_VALUE = /"([^"]*)"/g;
const HDS_INVOCATION = /^Hds::/;

// harvested out of fenced demo code, where the invocation syntax lives
const SYMBOL_PATTERNS = [
  /@[A-Za-z][A-Za-z0-9]*/g,
  /\bHds::[A-Za-z][A-Za-z0-9:]*/g,
  /<([A-Z][A-Za-z0-9:.]*)/g,
];

const HTML_ENTITIES = new Map([
  ["&amp;", "&"],
  ["&lt;", "<"],
  ["&gt;", ">"],
  ["&quot;", '"'],
]);

function harvestSymbols(code, into) {
  for (const pattern of SYMBOL_PATTERNS) {
    for (const match of code.matchAll(pattern)) into.add(match[1] ?? match[0]);
  }
}

function attributeText(tagSource) {
  return [...tagSource.matchAll(TAG_ATTRIBUTE_VALUE)]
    .map((match) => match[1])
    .join(" ");
}

function stripTags(source, symbols) {
  return source.replace(TAG, (tag, name) => {
    if (HDS_INVOCATION.test(name)) {
      symbols.add(name);
    }

    return name.endsWith(".Property") ? ` ${attributeText(tag)} ` : " ";
  });
}

function normalizeText(value) {
  return value
    .replace(/&[a-z]+;/g, (entity) => HTML_ENTITIES.get(entity) ?? " ")
    .normalize("NFKC")
    .replace(/[‘’‛]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[\u00a0\u200b-\u200d\ufeff]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function toSearchText(markdown, symbols) {
  let text = markdown.replace(ALGOLIA_IGNORE, " ");

  text = text.replace(FENCED_CODE, (match, code) => {
    harvestSymbols(code, symbols);

    return " ";
  });
  text = text.replace(HANDLEBARS_COMMENT, " ");
  text = text.replace(DEMO_BLOCK, " ");
  text = text.replace(CALLOUT_DELIMITER, (match, label) => label);
  text = stripTags(text, symbols);
  text = text.replace(HANDLEBARS_EXPRESSION, " ");
  text = text.replace(MARKDOWN_IMAGE, (match, alt) => alt);
  text = text.replace(MARKDOWN_LINK, (match, label) => label);
  text = text.replace(/`+/g, "");
  text = text.replace(TABLE_SEPARATOR_ROW, " ");
  text = text.replace(/^[ \t]*#{1,6}[ \t]*/gm, " ");
  text = text.replace(/^[ \t]*[-*+][ \t]+/gm, " ");
  text = text.replace(/^[ \t]*>[ \t]?/gm, " ");
  text = text.replace(/\*\*|__|\*|_{2,}/g, "");
  text = text.replace(/\|/g, " ");

  return normalizeText(text);
}
