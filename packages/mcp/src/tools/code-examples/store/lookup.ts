/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { CodeExample } from "./schema.js";

export interface SearchRecord {
  example: CodeExample;
  searchableText: string;
}

export const normalizeText = (value: string): string =>
  value
    .toLowerCase()
    .replace(/<!--([\s\S]*?)-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[`*_#[\](){}|>~@/]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Rank a search record against a normalized query string.
 *
 * Priority order:
 * 1. Exact component match
 * 2. Exact or prefix title match
 * 3. Imported HDS component match
 * 4. Component/path substring match
 * 5. Source-content term matches
 *
 * Returns 0 when any query term is absent from the searchable text, matching
 * the all-terms-required behaviour of the docs store.
 */
export const getSearchScore = (record: SearchRecord, query: string): number => {
  const terms = query.split(/\s+/).filter(Boolean);
  const component = normalizeText(record.example.component);
  const title = normalizeText(record.example.title);
  const hdsComponents = normalizeText(
    record.example.importedHdsComponents.join(" "),
  );

  let score = 0;

  // 1. Exact component match
  if (component === query) {
    score += 100;
  } else if (component.startsWith(query)) {
    score += 60;
  }

  // 2. Title match
  if (title === query) {
    score += 50;
  } else if (title.startsWith(query)) {
    score += 30;
  } else if (title.includes(query)) {
    score += 15;
  }

  // 3. Imported HDS component match
  if (hdsComponents.includes(query)) {
    score += 25;
  }

  // 4. Component substring match (handles nested paths)
  if (score === 0 && record.searchableText.includes(query)) {
    score += 10;
  }

  // 5. Per-term source content matches
  for (const term of terms) {
    if (record.searchableText.includes(term)) {
      score += 1;
    }
  }

  // Require all terms to be present somewhere
  return terms.every((term) => record.searchableText.includes(term))
    ? score
    : 0;
};
