/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from "zod";

import { DOCS_SEARCH_SCOPES } from "../constants.js";

export const docsSearchScopeSchema = z.enum(DOCS_SEARCH_SCOPES);

export const docsSectionSchema = z.object({
  id: z.string().min(1),
  heading: z.string().min(1),
  anchor: z.string(),
  tab: z.string().optional(),
  markdown: z.string(),
});

export const docsPageSchema = z.object({
  id: z.string().min(1),
  url: z.string().startsWith("/"),
  title: z.string().min(1),
  description: z.string().optional(),
  caption: z.string().optional(),
  keywords: z.array(z.string()),
  scope: docsSearchScopeSchema.exclude(["all"]),
  sections: z.array(docsSectionSchema),
});

export const docsCatalogSchema = z.object({
  version: z.literal(1),
  pages: z.array(docsPageSchema),
});

export const docsSearchResultSchema = z.object({
  docId: z.string(),
  sectionId: z.string(),
  title: z.string(),
  section: z.string(),
  tab: z.string().optional(),
  anchor: z.string().optional(),
  url: z.string(),
  snippet: z.string(),
});

export const docsSearchOutputSchema = z.object({
  query: z.string(),
  scope: docsSearchScopeSchema,
  resultCount: z.number().int(),
  results: z.array(docsSearchResultSchema),
});

export const docsReadSectionSchema = z.object({
  id: z.string(),
  heading: z.string(),
  anchor: z.string(),
  tab: z.string().optional(),
  markdown: z.string(),
  url: z.string(),
});

const docsReadNotFoundSchema = z.object({
  found: z.literal(false),
  sections: z.array(z.never()).length(0),
  message: z.string(),
});

const docsReadFoundSchema = z.object({
  found: z.literal(true),
  doc: z.object({
    docId: z.string(),
    title: z.string(),
    description: z.string().optional(),
    url: z.string(),
  }),
  sections: z.array(docsReadSectionSchema),
  nextCursor: z.string().optional(),
});

export const docsReadOutputSchema = z.discriminatedUnion("found", [
  docsReadNotFoundSchema,
  docsReadFoundSchema,
]);

export const docsReadToolOutputSchema = {
  found: z.boolean(),
  doc: z
    .object({
      docId: z.string(),
      title: z.string(),
      description: z.string().optional(),
      url: z.string(),
    })
    .optional(),
  sections: z.array(docsReadSectionSchema),
  nextCursor: z.string().optional(),
  message: z.string().optional(),
};

export type DocsCatalog = z.infer<typeof docsCatalogSchema>;
export type DocsPage = z.infer<typeof docsPageSchema>;
export type DocsReadOutput = z.infer<typeof docsReadOutputSchema>;
export type DocsSearchOutput = z.infer<typeof docsSearchOutputSchema>;
export type DocsSearchScope = z.infer<typeof docsSearchScopeSchema>;
export type DocsSection = z.infer<typeof docsSectionSchema>;
