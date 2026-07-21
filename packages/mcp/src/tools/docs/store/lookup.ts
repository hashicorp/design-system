/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { DocsPage, DocsSection } from "./schema.js";

export interface CursorValue {
  docId: string;
  sectionIndex: number;
  charOffset: number;
}

export interface SearchRecord {
  page: DocsPage;
  section: DocsSection;
  searchableText: string;
}

export const normalizeDocsText = (value: string): string =>
  value
    .toLowerCase()
    .replace(/<!--([\s\S]*?)-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[`*_#[\](){}|>~]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export const getSectionUrl = (page: DocsPage, section: DocsSection): string => {
  const tab = section.tab
    ? `?tab=${encodeURIComponent(section.tab.toLowerCase())}`
    : "";
  const anchor = section.anchor === "" ? "" : `#${section.anchor}`;

  return `${page.url}${tab}${anchor}`;
};

export const getSearchScore = (record: SearchRecord, query: string): number => {
  const title = normalizeDocsText(record.page.title);
  const heading = normalizeDocsText(record.section.heading);
  const keywords = normalizeDocsText(record.page.keywords.join(" "));
  const terms = query.split(/\s+/);
  let score = 0;

  if (title === query) score += 100;
  else if (title.startsWith(query)) score += 60;
  else if (title.includes(query)) score += 40;

  if (heading === query) score += 50;
  else if (heading.includes(query)) score += 25;

  if (keywords.includes(query)) score += 20;

  for (const term of terms) {
    if (record.searchableText.includes(term)) score += 1;
  }

  return terms.every((term) => record.searchableText.includes(term))
    ? score
    : 0;
};

export const encodeDocsCursor = (cursor: CursorValue): string =>
  Buffer.from(JSON.stringify(cursor)).toString("base64url");

export const decodeDocsCursor = (cursor: string): CursorValue | null => {
  try {
    const value = JSON.parse(
      Buffer.from(cursor, "base64url").toString("utf8"),
    ) as Partial<CursorValue>;

    if (
      typeof value.docId !== "string" ||
      !Number.isInteger(value.sectionIndex) ||
      (value.sectionIndex ?? -1) < 0 ||
      !Number.isInteger(value.charOffset) ||
      (value.charOffset ?? -1) < 0
    ) {
      return null;
    }

    return {
      docId: value.docId,
      sectionIndex: value.sectionIndex as number,
      charOffset: value.charOffset as number,
    };
  } catch {
    return null;
  }
};
