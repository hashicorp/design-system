/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

export const DOCS_SEARCH_SCOPES = [
  'all',
  'components',
  'foundations',
  'patterns',
  'about',
  'componentApi',
  'content',
] as const;

export type DocsSearchScope = (typeof DOCS_SEARCH_SCOPES)[number];

export const isRecordInScope = (
  scopes: ReadonlySet<Exclude<DocsSearchScope, 'all'>>,
  scope: DocsSearchScope
): boolean => {
  if (scope === 'all') {
    return true;
  }

  return scopes.has(scope);
};
