/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// shared relevance ordering for the substring catalogs: components, tokens and icons

import { normalizeLookupValue } from "../../shared/normalize.js";

import type { CatalogSearchOutcome } from "../types.js";

/**
 * A match is scored by where the query lands in the entry's identity fields — the names a
 * caller would actually type. Without this an entry that merely contains the query can push
 * the entry that *is* the query out of a truncated window: `form` matched 55 components and
 * returned the 20 alphabetically-first, none of which was `Hds::Form`.
 */
export const RANK_EXACT = 500;
export const RANK_PREFIX = 400;
export const RANK_SEGMENT = 300;
export const RANK_IDENTITY = 200;
export const RANK_BLOB = 100;
export const RANK_NONE = 0;

// `hds::form::text-input`, `token-color-foreground-action` and `arrow-right-24` all delimit
// their parts with one of these
const SEGMENT_DELIMITER = /[\s:./_-]+/u;

/**
 * The same name is delimited differently depending on where it is written: `hds::button` in a
 * template, `hds/button` in an import, `border.radius.small` as a token key and `border-radius`
 * as the CSS variable a caller actually types. Comparing on a delimiter-free form lets a query
 * written in any of those styles reach the others, so `border-radius` still prefix-matches
 * `border.radius.small` rather than losing to a token that merely contains the words.
 */
const canonicalize = (value: string): string => {
  return value.split(SEGMENT_DELIMITER).filter(Boolean).join(" ");
};

export interface RankableEntry {
  // the names a caller would type, already normalized
  identities: string[];
  // everything else that is searchable: description, category, value, docs route
  blob: string;
}

interface ScoredEntry<TRecord> {
  record: TRecord;
  score: number;
  // length of the shortest identity that earned `score`, so the most specific name wins a tie
  identityLength: number;
  // catalog position, so an otherwise-even tie resolves the same way on every call
  index: number;
}

export interface RankedSearchInput<TRecord> {
  records: TRecord[];
  query: string;
  limit: number;
  toRankable: (record: TRecord) => RankableEntry;
  // domain filters (category, type) applied before scoring
  matches?: (record: TRecord) => boolean;
}

export const scoreIdentity = (identity: string, query: string): number => {
  if (identity === query) {
    return RANK_EXACT;
  }

  const canonicalIdentity = canonicalize(identity);
  const canonicalQuery = canonicalize(query);

  if (canonicalIdentity === canonicalQuery) {
    return RANK_EXACT;
  }

  if (
    identity.startsWith(query) ||
    canonicalIdentity.startsWith(`${canonicalQuery} `)
  ) {
    return RANK_PREFIX;
  }

  // a whole run of segments, so `foreground` matches `color.foreground.action` but `oregon`
  // does not, and a two-word query stays a phrase rather than two loose terms
  if (` ${canonicalIdentity} `.includes(` ${canonicalQuery} `)) {
    return RANK_SEGMENT;
  }

  if (identity.includes(query) || canonicalIdentity.includes(canonicalQuery)) {
    return RANK_IDENTITY;
  }

  return RANK_NONE;
};

export const scoreEntry = (
  entry: RankableEntry,
  query: string
): { score: number; identityLength: number } => {
  let score = RANK_NONE;
  let identityLength = Number.MAX_SAFE_INTEGER;

  for (const identity of entry.identities) {
    const identityScore = scoreIdentity(identity, query);

    if (identityScore === RANK_NONE) {
      continue;
    }

    if (identityScore > score) {
      score = identityScore;
      identityLength = identity.length;
    } else if (identityScore === score && identity.length < identityLength) {
      identityLength = identity.length;
    }
  }

  if (score !== RANK_NONE) {
    return { score, identityLength };
  }

  // a keyword-only hit still counts: `warning` reaches `alert-triangle` through its description
  return entry.blob.includes(query)
    ? { score: RANK_BLOB, identityLength }
    : { score: RANK_NONE, identityLength };
};

// how far two keys agree from the left, which is what survives a typo in the tail
export const getCommonPrefixLength = (left: string, right: string): number => {
  const limit = Math.min(left.length, right.length);
  let index = 0;

  while (index < limit && left[index] === right[index]) {
    index += 1;
  }

  return index;
};

export const searchRanked = <TRecord>({
  records,
  query,
  limit,
  toRankable,
  matches,
}: RankedSearchInput<TRecord>): CatalogSearchOutcome<TRecord> => {
  const normalizedQuery = normalizeLookupValue(query);
  const filtered = records.filter(
    (record) => matches === undefined || matches(record)
  );

  // an all-whitespace query is a browse, not a search, so the catalog keeps its own order
  if (normalizedQuery.length === 0) {
    return {
      totalMatches: filtered.length,
      hits: filtered.slice(0, limit),
    };
  }

  const scored: ScoredEntry<TRecord>[] = [];

  for (const [index, record] of filtered.entries()) {
    const { score, identityLength } = scoreEntry(
      toRankable(record),
      normalizedQuery
    );

    if (score === RANK_NONE) {
      continue;
    }

    scored.push({ record, score, identityLength, index });
  }

  scored.sort((left, right) => {
    if (right.score !== left.score) {
      return right.score - left.score;
    }

    if (left.identityLength !== right.identityLength) {
      return left.identityLength - right.identityLength;
    }

    return left.index - right.index;
  });

  return {
    totalMatches: scored.length,
    hits: scored.slice(0, limit).map((entry) => entry.record),
  };
};
