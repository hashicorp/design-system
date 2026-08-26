/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

export const SITE_BASE_URL = "https://helios.hashicorp.design/";

export const DOCS_CATALOG_FILE_NAME = "docs-catalog.json";

export const NOT_FOUND_SUGGESTION_LIMIT = 5;

export const SNIPPET_MAX_LENGTH = 300;

// BM25 ranking tunables
// https://lucene.apache.org/core/9_12_3/core/org/apache/lucene/search/similarities/BM25Similarity.html
export const BM25_K1 = 1.6;
export const BM25_B = 0.6;

// a page match says "this page is about your query", a chunk match says "this passage is"
export const PAGE_SCORE_WEIGHT = 1.5;
export const CHUNK_SCORE_WEIGHT = 1;

export const PAGE_NAME_MATCH_WEIGHT = 1;

// how many passages any one page may contribute to a result window
export const MAX_HITS_PER_ROUTE = 3;

export const PAGE_FIELD_WEIGHTS = {
  name: 3,
  title: 3,
  keywords: 5,
  description: 1,
} as const;

export const CHUNK_FIELD_WEIGHTS = {
  heading: 6,
  ancestorHeadings: 2,
  tab: 1,
  body: 1,
} as const;

export const VERSION_HISTORY_TAB = "Version history";

export const VERSION_HISTORY_SCORE_MULTIPLIER = 0.6;

// reduce results for partial matches
export const PAGE_ONLY_CHUNK_LIMIT = 3;

export const STOPWORDS = new Set([
  "about",
  "above",
  "after",
  "again",
  "against",
  "all",
  "also",
  "am",
  "an",
  "and",
  "any",
  "are",
  "as",
  "at",
  "be",
  "because",
  "been",
  "before",
  "being",
  "below",
  "between",
  "both",
  "but",
  "by",
  "can",
  "cannot",
  "could",
  "did",
  "do",
  "does",
  "doing",
  "down",
  "during",
  "each",
  "few",
  "for",
  "from",
  "further",
  "had",
  "has",
  "have",
  "having",
  "he",
  "her",
  "here",
  "hers",
  "herself",
  "him",
  "himself",
  "his",
  "how",
  "if",
  "in",
  "into",
  "is",
  "it",
  "its",
  "itself",
  "just",
  "me",
  "more",
  "most",
  "my",
  "myself",
  "no",
  "nor",
  "not",
  "now",
  "of",
  "off",
  "on",
  "once",
  "only",
  "or",
  "other",
  "ought",
  "our",
  "ours",
  "ourselves",
  "out",
  "over",
  "own",
  "same",
  "she",
  "should",
  "so",
  "some",
  "such",
  "than",
  "that",
  "the",
  "their",
  "theirs",
  "them",
  "themselves",
  "then",
  "there",
  "these",
  "they",
  "this",
  "those",
  "through",
  "to",
  "too",
  "under",
  "until",
  "up",
  "very",
  "was",
  "we",
  "were",
  "what",
  "when",
  "where",
  "which",
  "while",
  "who",
  "whom",
  "why",
  "will",
  "with",
  "would",
  "you",
  "your",
  "yours",
  "yourself",
  "yourselves",
]);
