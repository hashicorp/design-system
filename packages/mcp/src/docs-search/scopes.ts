/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

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

export const getFilterForScope = (
  scope: DocsSearchScope
): string | undefined => {
  if (scope === 'all') {
    return undefined;
  }

  return DOCS_SEARCH_SCOPE_FILTERS[scope];
};
