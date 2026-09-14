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

export const DEFAULT_READ_MAX_BYTES = 16_000;
export const MIN_READ_MAX_BYTES = 500;
export const MAX_READ_MAX_BYTES = 60_000;

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
