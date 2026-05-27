/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from 'zod';

export const docsPageAttributesSchema = z
  .object({
    path: z.string().min(1).optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    caption: z.string().optional(),
    content: z.string().optional(),
  })
  .passthrough();

export const docsPageSchema = z
  .object({
    data: z
      .object({
        id: z.string().min(1),
        attributes: docsPageAttributesSchema,
      })
      .passthrough(),
  })
  .passthrough();

export type DocsPage = z.infer<typeof docsPageSchema>;
