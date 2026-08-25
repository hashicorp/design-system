/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

export const SEARCH_DOCS_TOOL_NAME = "search_hds_docs";
export const READ_DOCS_TOOL_NAME = "read_hds_docs";

export const DEFAULT_SEARCH_LIMIT = 8;
// cap keeps a search from ever approaching limits
export const MAX_SEARCH_LIMIT = 25;
export const MAX_QUERY_LENGTH = 2_000;

export const MAX_FILTER_LENGTH = 256;

export const DEFAULT_READ_MAX_BYTES = 16_000;
export const MIN_READ_MAX_BYTES = 500;
export const MAX_READ_MAX_BYTES = 60_000;

export const SNIPPET_MAX_LENGTH = 300;
export const NOT_FOUND_SUGGESTION_LIMIT = 5;

// a page match says "this page is about your query", a chunk match says "this passage is"
export const PAGE_SCORE_WEIGHT = 1.5;
export const CHUNK_SCORE_WEIGHT = 1;

export const PAGE_NAME_MATCH_WEIGHT = 1;

// how many passages any one page may contribute to a result window
export const MAX_HITS_PER_ROUTE = 3;

export const PAGE_FIELD_WEIGHTS = {
  // the route, which is also the terminal segment, de-hyphenated by the tokenizer
  name: 3,
  title: 3,
  // the cross-vocabulary synonyms ("chip" for Badge, "drawer" for Flyout) live here
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

export const DOCS_TABS = [
  "Accessibility",
  "Code",
  "Components",
  "Content",
  "Core concepts",
  "Design tokens",
  "Figma Libraries",
  "Flight Icons",
  "Guidelines",
  "Interaction concepts",
  "Library",
  "Palette",
  "Research",
  "Resources",
  "Specifications",
  "Validation",
  VERSION_HISTORY_TAB,
] as const;
