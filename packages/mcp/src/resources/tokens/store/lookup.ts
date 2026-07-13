/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { TOKEN_TYPES } from "./schema.js";

import type { TokenCatalogRow, TokenType } from "./schema.js";
import type { JsonValue } from "../../../types.js";

export type TokenSummary = {
  key: string;
  name: string;
  type: TokenType;
  value: JsonValue;
  cssVar: string;
  category: string | null;
  path: string[];
};

export type TokenRecord = TokenSummary & {
  original?: TokenCatalogRow["original"];
};

const KNOWN_TOKEN_TYPE_LOOKUP = new Set<string>(TOKEN_TYPES);

export const normalizeLookupValue = (value: string): string => {
  return value.trim().toLowerCase();
};

const trimTokenBraces = (value: string): string => {
  return value.replace(/^\{/u, "").replace(/\}$/u, "");
};

export const normalizeTokenLookupKey = (value: string): string => {
  const normalized = normalizeLookupValue(value);
  const withoutBraces = trimTokenBraces(normalized);

  if (withoutBraces.startsWith("token-")) {
    return withoutBraces;
  }

  return withoutBraces;
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

export const toTokenSummary = (row: TokenCatalogRow): TokenSummary => {
  return {
    key: row.key,
    name: row.name,
    type: toTokenType(row.$type),
    value: row.$value,
    cssVar: toCssVarName(row.name),
    category: row.attributes?.category ?? null,
    path: row.path,
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
