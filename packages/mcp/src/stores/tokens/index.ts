/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { normalizeLookupValue } from "../../shared/normalize.js";
import {
  DEFAULT_CATALOG_SOURCE,
  createCatalogLoader,
} from "../../shared/catalog.js";
import {
  getTokenLookupKeys,
  normalizeTokenLookupKey,
  toTokenRecord,
} from "./lookup.js";
import { tokenCatalogSchema } from "./schema.js";

import type { CatalogSource } from "../../shared/catalog.js";
import type { CatalogSearchOutcome } from "../../stores/types.js";
import type { TokenRecord, TokenSummary } from "./lookup.js";
import type { TokenCatalogRow, TokenType } from "./schema.js";

type SearchTokensInput = {
  query: string;
  limit: number;
  type?: TokenType;
  category?: string;
};

export type TokenCatalogStore = {
  getMeta: () => {
    totalTokenCount: number;
    categories: string[];
    source: CatalogSource;
  };
  listTokens: () => TokenSummary[];
  getTokenByKey: (key: string) => TokenRecord | null;
  searchTokens: (
    input: SearchTokensInput,
  ) => CatalogSearchOutcome<TokenSummary>;
};

const toSearchBlob = (token: TokenSummary): string => {
  const path = token.path.join(" ");
  const category = token.category ?? "";
  const value = typeof token.value === "string" ? token.value : "";

  return [token.key, token.name, token.cssVar ?? "", path, category, value]
    .join(" ")
    .toLowerCase();
};

export const parseTokenCatalog = (value: unknown): TokenCatalogRow[] => {
  return tokenCatalogSchema.parse(value);
};

export const createTokenCatalogStore = (
  rows: TokenCatalogRow[],
  source: CatalogSource = DEFAULT_CATALOG_SOURCE,
): TokenCatalogStore => {
  const tokenRecords = rows.map((row) => toTokenRecord(row));
  const tokenLookup = new Map<string, TokenRecord>();

  for (const [index, row] of rows.entries()) {
    const token = tokenRecords[index];

    if (token === undefined) {
      continue;
    }

    for (const key of getTokenLookupKeys(row)) {
      tokenLookup.set(key, token);
    }
  }

  const categories = [
    ...new Set(tokenRecords.map((token) => token.category)),
  ].sort((left, right) => left.localeCompare(right));

  return {
    getMeta: () => ({
      totalTokenCount: tokenRecords.length,
      categories,
      source,
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

      const matches = tokenRecords.filter((token) => {
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
      });

      return {
        totalMatches: matches.length,
        hits: matches
          .slice(0, limit)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .map(({ original: _original, ...summary }) => summary),
      };
    },
  };
};

const tokenCatalogLoader = createCatalogLoader<TokenCatalogStore>({
  specifier: "@hashicorp/design-system-tokens/dist/docs/products/tokens.json",
  anchors: ["project-root", "components", "default"],
  create: (value, source) =>
    createTokenCatalogStore(parseTokenCatalog(value), source),
});

export const loadTokenCatalog = (): TokenCatalogStore => {
  return tokenCatalogLoader.load();
};

export const getOrLoadTokenStore = (): TokenCatalogStore => {
  return tokenCatalogLoader.getOrLoad();
};
