/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from "zod";
import { SITE_BASE_URL } from "../constants.js";

const siteUrlSchema = z
  .string()
  .startsWith(SITE_BASE_URL, `must be a ${SITE_BASE_URL} url`);

const docsChunkSchema = z
  .object({
    id: z.string().min(1),
    url: siteUrlSchema,
    // readable markdown, with the <Doc::*> and <Hds::*> usage examples left intact
    content: z.string(),
    // the same passage as `content` stripped to prose (for search scoring)
    text: z.string(),
    tab: z.string().min(1).optional(),
    // ancestor headings first, the chunk's own heading last; absent on a tab preamble
    headingTrail: z.array(z.string()).optional(),
    level: z.number().int().optional(),
    // identifiers harvested from the chunk's demo code, such as `@isFullWidth`
    symbols: z.array(z.string()).optional(),
  })
  .catchall(z.any());

const docsPageLinksSchema = z
  .object({
    github: z.string().min(1).optional(),
    figma: z.string().min(1).optional(),
  })
  .catchall(z.any());

const docsPageStatusSchema = z
  .object({
    updated: z.string().min(1).optional(),
    deprecated: z.string().min(1).optional(),
  })
  .catchall(z.any());

const docsPageSchema = z
  .object({
    route: z.string().min(1),
    section: z.string().min(1),
    title: z.string().min(1),
    url: siteUrlSchema,
    caption: z.string().optional(),
    description: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    related: z.array(z.string()).optional(),
    links: docsPageLinksSchema.optional(),
    status: docsPageStatusSchema.optional(),
    chunks: z.array(docsChunkSchema),
  })
  .catchall(z.any());

export const docsCatalogSchema = z
  .object({
    // when this snapshot of the docs site was bundled
    bundledAt: z.string().min(1),
    siteBaseUrl: z.literal(SITE_BASE_URL),
    pages: z.record(z.string().min(1), docsPageSchema),
  })
  .catchall(z.any());

export type DocsChunk = z.infer<typeof docsChunkSchema>;
export type DocsPageLinks = z.infer<typeof docsPageLinksSchema>;
export type DocsPageStatus = z.infer<typeof docsPageStatusSchema>;
export type DocsPage = z.infer<typeof docsPageSchema>;
export type DocsCatalog = z.infer<typeof docsCatalogSchema>;
