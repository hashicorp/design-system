/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { readFileSync } from "node:fs";

import {
  decodeDocsCursor,
  encodeDocsCursor,
  getSearchScore,
  getSectionUrl,
  normalizeDocsText,
} from "./lookup.js";
import { docsCatalogSchema } from "./schema.js";

import type { SearchRecord } from "./lookup.js";
import type { DocsCatalog, DocsReadOutput, DocsSearchScope } from "./schema.js";

interface SearchDocsInput {
  query: string;
  scope: DocsSearchScope;
  limit: number;
}

interface ReadDocInput {
  docId?: string;
  sectionId?: string;
  cursor?: string;
  maxSections: number;
  maxChars: number;
}

export interface DocsStore {
  searchDocs: (input: SearchDocsInput) => Array<{
    docId: string;
    sectionId: string;
    title: string;
    section: string;
    tab?: string;
    anchor?: string;
    url: string;
    snippet: string;
  }>;
  readDoc: (input: ReadDocInput) => DocsReadOutput;
}

export const parseDocsCatalog = (value: unknown): DocsCatalog =>
  docsCatalogSchema.parse(value);

export const createDocsStore = (catalog: DocsCatalog): DocsStore => {
  const pagesById = new Map(catalog.pages.map((page) => [page.id, page]));
  const searchRecords: SearchRecord[] = catalog.pages.flatMap((page) =>
    page.sections.map((section) => ({
      page,
      section,
      searchableText: normalizeDocsText(
        [
          page.title,
          page.description,
          page.caption,
          page.keywords.join(" "),
          section.heading,
          section.markdown,
        ]
          .filter((value) => value !== undefined)
          .join(" "),
      ),
    })),
  );

  return {
    searchDocs: ({ query, scope, limit }) => {
      const normalizedQuery = normalizeDocsText(query);

      if (normalizedQuery === "") {
        return [];
      }

      return searchRecords
        .filter(({ page }) => scope === "all" || page.scope === scope)
        .map((record) => ({
          record,
          score: getSearchScore(record, normalizedQuery),
        }))
        .filter(({ score }) => score > 0)
        .sort(
          (left, right) =>
            right.score - left.score ||
            left.record.page.title.localeCompare(right.record.page.title),
        )
        .slice(0, limit)
        .map(({ record }) => ({
          docId: record.page.id,
          sectionId: record.section.id,
          title: record.page.title,
          section: record.section.heading,
          ...(record.section.tab === undefined
            ? {}
            : { tab: record.section.tab }),
          ...(record.section.anchor === ""
            ? {}
            : { anchor: record.section.anchor }),
          url: getSectionUrl(record.page, record.section),
          snippet: normalizeDocsText(record.section.markdown).slice(0, 300),
        }));
    },

    readDoc: (input) => {
      const hasCursor = input.cursor !== undefined;
      const hasDocId = input.docId !== undefined;

      if (
        hasCursor === hasDocId ||
        (hasCursor && input.sectionId !== undefined)
      ) {
        return {
          found: false,
          sections: [],
          message:
            "Provide either cursor, or docId with an optional sectionId.",
        };
      }

      const cursor = hasCursor
        ? decodeDocsCursor(input.cursor as string)
        : null;

      if (hasCursor && cursor === null) {
        return { found: false, sections: [], message: "Invalid cursor." };
      }

      const page = pagesById.get(cursor?.docId ?? (input.docId as string));

      if (page === undefined) {
        return {
          found: false,
          sections: [],
          message: "Documentation page not found.",
        };
      }

      const requestedSectionIndex =
        input.sectionId === undefined
          ? 0
          : page.sections.findIndex(
              (section) => section.id === input.sectionId,
            );
      const sectionIndex = cursor?.sectionIndex ?? requestedSectionIndex;
      const charOffset = cursor?.charOffset ?? 0;
      const cursorSection = page.sections[sectionIndex];

      if (sectionIndex < 0 || cursorSection === undefined) {
        return {
          found: false,
          sections: [],
          message:
            input.sectionId === undefined
              ? "Invalid cursor."
              : `Section '${input.sectionId}' not found.`,
        };
      }

      if (charOffset > cursorSection.markdown.length) {
        return { found: false, sections: [], message: "Invalid cursor." };
      }

      const sections = [];
      let currentCharOffset = charOffset;
      let currentSectionIndex = sectionIndex;
      let totalChars = 0;

      while (
        currentSectionIndex < page.sections.length &&
        sections.length < input.maxSections
      ) {
        const section = page.sections[currentSectionIndex];
        const remainingMarkdown = section.markdown.slice(currentCharOffset);

        if (
          sections.length > 0 &&
          totalChars + remainingMarkdown.length > input.maxChars
        ) {
          break;
        }

        const markdown = remainingMarkdown.slice(
          0,
          Math.max(input.maxChars - totalChars, 0),
        );

        sections.push({
          id: section.id,
          heading: section.heading,
          anchor: section.anchor,
          ...(section.tab === undefined ? {} : { tab: section.tab }),
          markdown,
          url: getSectionUrl(page, section),
        });
        totalChars += markdown.length;

        if (markdown.length < remainingMarkdown.length) {
          currentCharOffset += markdown.length;
          break;
        }

        currentSectionIndex += 1;
        currentCharOffset = 0;

        if (totalChars >= input.maxChars) break;
      }

      return {
        found: true,
        doc: {
          docId: page.id,
          title: page.title,
          ...(page.description === undefined
            ? {}
            : { description: page.description }),
          url: page.url,
        },
        sections,
        ...(currentSectionIndex < page.sections.length
          ? {
              nextCursor: encodeDocsCursor({
                docId: page.id,
                sectionIndex: currentSectionIndex,
                charOffset: currentCharOffset,
              }),
            }
          : {}),
      };
    },
  };
};

export const loadDocsCatalog = (): DocsStore => {
  const catalogUrl = new URL(
    "../../../catalogs/docs/catalog.json",
    import.meta.url,
  );
  const catalog = JSON.parse(readFileSync(catalogUrl, "utf8")) as unknown;

  return createDocsStore(parseDocsCatalog(catalog));
};

let docsStore: DocsStore | null = null;

export const getOrLoadDocsStore = (): DocsStore => {
  if (docsStore === null) {
    docsStore = loadDocsCatalog();
  }

  return docsStore;
};
