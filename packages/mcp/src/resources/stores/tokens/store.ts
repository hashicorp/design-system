/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import {
  getTokenLookupKeys,
  normalizeLookupValue,
  normalizeTokenLookupKey,
  toTokenRecord,
} from "./lookup.js";
import { tokenCatalogSchema } from "./schema.js";

import type { TokenRecord, TokenSummary } from "./lookup.js";
import type { TokenType } from "./schema.js";

type SearchTokensInput = {
  query: string;
  limit: number;
  type?: TokenType;
  category?: string;
};

export type TokenCatalogStore = {
  getMeta: () => {
    totalTokenCount: number;
  };
  listTokens: () => TokenSummary[];
  getTokenByKey: (key: string) => TokenRecord | null;
  searchTokens: (input: SearchTokensInput) => TokenSummary[];
};

const require = createRequire(import.meta.url);

const getTokensPath = (): string => {
  return require.resolve("@hashicorp/design-system-tokens/dist/docs/products/tokens.json");
};

const toSearchBlob = (token: TokenSummary): string => {
  const path = token.path.join(" ");
  const category = token.category ?? "";
  const value = typeof token.value === "string" ? token.value : "";

  return [token.key, token.name, path, category, value].join(" ").toLowerCase();
};

export const loadTokenCatalog = (): TokenCatalogStore => {
  const tokensPath = getTokensPath();
  const rawTokens = readFileSync(tokensPath, "utf8");
  const parsedTokens = JSON.parse(rawTokens) as unknown;
  const rows = tokenCatalogSchema.parse(parsedTokens);
  const tokenRecords = rows.map((row) => toTokenRecord(row));
  const tokenLookup = new Map<string, TokenRecord>();

  for (const row of rows) {
    const token = toTokenRecord(row);

    for (const key of getTokenLookupKeys(row)) {
      tokenLookup.set(key, token);
    }
  }

  return {
    getMeta: () => ({
      totalTokenCount: tokenRecords.length,
    }),
    listTokens: () =>
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      tokenRecords.map(({ original: _original, ...summary }) => summary),
    getTokenByKey: (key: string) => {
      return tokenLookup.get(normalizeTokenLookupKey(key)) ?? null;
    },
    searchTokens: ({ query, limit, type, category }: SearchTokensInput) => {
      const normalizedQuery = normalizeLookupValue(query);
      const normalizedCategory =
        category === undefined ? null : normalizeLookupValue(category);

      return (
        tokenRecords
          .filter((token) => {
            if (type !== undefined && token.type !== type) {
              return false;
            }

            if (
              normalizedCategory !== null &&
              normalizeLookupValue(token.category ?? "") !== normalizedCategory
            ) {
              return false;
            }

            return toSearchBlob(token).includes(normalizedQuery);
          })
          .slice(0, limit)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .map(({ original: _original, ...summary }) => summary)
      );
    },
  };
};
