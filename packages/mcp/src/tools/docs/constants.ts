/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

export const SEARCH_DOCS_TOOL_NAME = "hds_search_docs";
export const READ_DOC_TOOL_NAME = "hds_read_doc";

export const DOCS_SEARCH_SCOPES = [
  "all",
  "about",
  "components",
  "content",
  "foundations",
  "patterns",
] as const;

export const DEFAULT_SEARCH_LIMIT = 10;
export const DEFAULT_MAX_SECTIONS = 3;
export const DEFAULT_MAX_CHARS = 4000;
