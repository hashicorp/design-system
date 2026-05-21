/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { algoliasearch } from 'algoliasearch';

import { getFilterForScope } from './scopes.js';
import { normalizeDocsSearchResult } from './normalize-result.js';

import type { DocsSearchConfig } from './config.js';
import type { DocsSearchResult, RawHit } from './normalize-result.js';
import type { DocsSearchScope } from './scopes.js';

export type DocsSearchInput = {
  query: string;
  scope: DocsSearchScope;
  limit: number;
};

export type DocsSearchOutput = {
  resultCount: number;
  results: DocsSearchResult[];
};

export type DocsSearchClient = {
  available: boolean;
  missingEnvVars?: string[];
  search: (input: DocsSearchInput) => Promise<DocsSearchOutput>;
};

type SearchResponse = {
  results?: Array<{
    hits?: RawHit[];
  }>;
};

export const createUnavailableDocsSearchClient = (
  missingEnvVars: string[]
): DocsSearchClient => {
  return {
    available: false,
    missingEnvVars,
    search: async () => {
      throw new Error('Docs search client unavailable.');
    },
  };
};

export const createAlgoliaDocsSearchClient = (
  config: DocsSearchConfig
): DocsSearchClient => {
  const client = algoliasearch(config.applicationId, config.apiKeySearch);

  return {
    available: true,
    search: async ({ query, scope, limit }) => {
      const filters = getFilterForScope(scope);
      const searchRequest = {
        indexName: config.indexId,
        query,
        hitsPerPage: limit,
        attributesToRetrieve: [
          'pageTitle',
          'title',
          'searchResultURL',
          'type',
          'pageSection',
          'section',
          'category',
          'content',
          'pageCaption',
          'token-name',
          'icon-name',
        ],
      };

      const response = (await client.search({
        requests:
          filters === undefined
            ? [searchRequest]
            : [
                {
                  ...searchRequest,
                  filters,
                },
              ],
      })) as unknown as SearchResponse;

      const hits = response.results?.[0]?.hits ?? [];

      return {
        resultCount: hits.length,
        results: hits.map((hit) => normalizeDocsSearchResult(hit)),
      };
    },
  };
};

export const createDocsSearchClient = (
  configState:
    | { available: false; missingEnvVars: string[] }
    | { available: true; config: DocsSearchConfig }
): DocsSearchClient => {
  if (configState.available === false) {
    return createUnavailableDocsSearchClient(configState.missingEnvVars);
  }

  return createAlgoliaDocsSearchClient(configState.config);
};
