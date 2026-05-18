/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { algoliasearch } from 'algoliasearch';

import type { DocsSearchConfig } from './docs-search-config.js';

export const DOCS_SEARCH_SCOPES = [
  'all',
  'components',
  'foundations',
  'patterns',
  'about',
  'icons',
  'tokens',
  'componentApi',
  'content',
] as const;

export type DocsSearchScope = (typeof DOCS_SEARCH_SCOPES)[number];

type DocsSearchFilterMap = Record<Exclude<DocsSearchScope, 'all'>, string>;

const DOCS_SEARCH_SCOPE_FILTERS: DocsSearchFilterMap = {
  components: 'pageMainCategory:components',
  foundations: 'pageMainCategory:foundations',
  patterns: 'pageMainCategory:patterns',
  about: 'pageMainCategory:about',
  icons: 'pageSection:icons AND type:icon AND source:icon',
  tokens: 'pageSection:foundations AND type:token AND source:token',
  componentApi:
    'pageMainCategory:components AND (type:component-api-property OR source:component-api)',
  content:
    '(source:heading OR source:paragraph OR source:table OR source:wcag-list)',
};

export type RawHit = {
  pageTitle?: string;
  title?: string;
  searchResultURL?: string;
  type?: string;
  pageSection?: string;
  section?: string;
  category?: string;
  content?: string;
  pageCaption?: string;
  ['token-name']?: string;
  ['icon-name']?: string;
};

export type DocsSearchResult = {
  title: string | null;
  url: string | null;
  kind: string | null;
  section: string | null;
  snippet: string | null;
};

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

const normalizeValue = (value: unknown): string | null => {
  if (typeof value !== 'string') {
    return null;
  }

  const normalized = value.replace(/\s+/gu, ' ').trim();

  if (normalized === '') {
    return null;
  }

  return normalized;
};

export const truncateSnippet = (value: string, maxLength = 200): string => {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1).trimEnd()}…`;
};

const normalizeSnippet = (hit: RawHit): string | null => {
  const content = normalizeValue(hit.content);

  if (content !== null) {
    return truncateSnippet(content);
  }

  const caption = normalizeValue(hit.pageCaption);

  if (caption !== null) {
    return truncateSnippet(caption);
  }

  return null;
};

const normalizeUrl = (path: string | null): string | null => {
  if (path === null) {
    return null;
  }

  if (path.startsWith('https://') || path.startsWith('http://')) {
    return path;
  }

  return `https://helios.hashicorp.design${path}`;
};

export const normalizeDocsSearchResult = (hit: RawHit): DocsSearchResult => {
  const path = normalizeValue(hit.searchResultURL);
  const title =
    normalizeValue(hit.pageTitle) ??
    normalizeValue(hit['token-name']) ??
    normalizeValue(hit['icon-name']) ??
    normalizeValue(hit.title);
  const kind = normalizeValue(hit.type)?.toLowerCase() ?? null;
  const section =
    normalizeValue(hit.section) ??
    normalizeValue(hit.pageSection) ??
    normalizeValue(hit.category);

  return {
    title,
    url: normalizeUrl(path),
    kind,
    section,
    snippet: normalizeSnippet(hit),
  };
};

export const getFilterForScope = (
  scope: DocsSearchScope
): string | undefined => {
  if (scope === 'all') {
    return undefined;
  }

  return DOCS_SEARCH_SCOPE_FILTERS[scope];
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
