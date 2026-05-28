/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

export type DocsSearchResult = {
  title: string | null;
  url: string | null;
  kind: string | null;
  section: string | null;
  snippet: string | null;
  docId?: string | null;
  anchor?: string | null;
  score?: number | null;
  rankBucket?: string | null;
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

  return `${value.slice(0, maxLength - 3).trimEnd()}...`;
};

export const normalizeDocsSearchResult = (input: {
  title?: string;
  url?: string;
  kind?: string;
  section?: string;
  snippet?: string;
  docId?: string;
  anchor?: string;
  score?: number;
  rankBucket?: string;
}): DocsSearchResult => {
  const snippet = normalizeValue(input.snippet);
  const result: DocsSearchResult = {
    title: normalizeValue(input.title),
    url: normalizeValue(input.url),
    kind: normalizeValue(input.kind)?.toLowerCase() ?? null,
    section: normalizeValue(input.section),
    snippet: snippet === null ? null : truncateSnippet(snippet),
  };

  if (input.docId !== undefined) {
    result.docId = normalizeValue(input.docId);
  }

  if (input.anchor !== undefined) {
    result.anchor = normalizeValue(input.anchor);
  }

  if (input.score !== undefined) {
    result.score = Number.isFinite(input.score) ? input.score : null;
  }

  if (input.rankBucket !== undefined) {
    result.rankBucket = normalizeValue(input.rankBucket)?.toLowerCase() ?? null;
  }

  return result;
};
