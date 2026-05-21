/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

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
