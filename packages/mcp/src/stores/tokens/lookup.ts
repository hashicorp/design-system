/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { TOKEN_TYPES } from "./schema.js";
import { normalizeLookupValue } from "../../catalog/normalize.js";

import type {
  TokenAttributes,
  TokenCatalogRow,
  TokenOriginal,
  TokenType,
} from "./schema.js";
import type { JsonValue } from "../../types.js";

export type TokenSummary = {
  key: string;
  name: string;
  attributes: TokenAttributes;
  type: TokenType;
  value: JsonValue;
  cssVar: string;
  category: string;
  path: string[];
  comment?: string;
  alias?: string;
};

export type TokenRecord = TokenSummary & {
  original?: TokenOriginal;
};

const KNOWN_TOKEN_TYPE_LOOKUP = new Set<string>(TOKEN_TYPES);

const trimTokenBraces = (value: string): string => {
  return value.replace(/^\{/u, "").replace(/\}$/u, "");
};

const trimCssVarPrefix = (value: string): string => {
  return value.replace(/^--/u, "");
};

export const normalizeTokenLookupKey = (value: string): string => {
  return trimCssVarPrefix(trimTokenBraces(normalizeLookupValue(value)));
};

export const toTokenType = (value: string | undefined): TokenType => {
  if (value === undefined) {
    return "other";
  }

  const normalized = value.trim();

  if (KNOWN_TOKEN_TYPE_LOOKUP.has(normalized)) {
    return normalized as TokenType;
  }

  return "other";
};

export const toCssVarName = (tokenName: string): string => {
  return `--${tokenName}`;
};

const TOKEN_ALIAS_PATTERN = /^\{[^{}]+\}$/u;

export const toTokenAlias = (
  original: TokenOriginal | undefined,
): string | undefined => {
  const value = original?.$value;

  return typeof value === "string" && TOKEN_ALIAS_PATTERN.test(value)
    ? value
    : undefined;
};

export const toTokenSummary = (row: TokenCatalogRow): TokenSummary => {
  const alias = toTokenAlias(row.original);

  return {
    key: row.key,
    name: row.name,
    attributes: row.attributes,
    type: toTokenType(row.$type),
    value: row.$value,
    cssVar: toCssVarName(row.name),
    category: row.attributes.category,
    path: row.path,
    ...(row.comment === undefined ? {} : { comment: row.comment }),
    ...(alias === undefined ? {} : { alias }),
  };
};

export const toTokenRecord = (row: TokenCatalogRow): TokenRecord => {
  return {
    ...toTokenSummary(row),
    ...(row.original === undefined ? {} : { original: row.original }),
  };
};

export const getTokenLookupKeys = (row: TokenCatalogRow): string[] => {
  const dotPath = row.path.join(".");

  return [
    normalizeTokenLookupKey(row.key),
    normalizeTokenLookupKey(dotPath),
    normalizeTokenLookupKey(row.name),
  ];
};
