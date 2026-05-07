/**
 * Copyright HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from 'zod';

const catalogArgSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  required: z.boolean().optional(),
  description: z.string().optional(),
  default: z.string().optional(),
  values: z.array(z.string()).optional(),
});

const catalogBlockSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

const catalogComponentSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  summary: z.string().min(1),
  args: z.array(catalogArgSchema).optional(),
  blocks: z.array(catalogBlockSchema).optional(),
  a11yNotes: z.array(z.string()).optional(),
  examples: z.array(z.string()).optional(),
});

export const componentCatalogSchema = z.object({
  version: z.string().min(1),
  generatedAt: z.string().datetime().optional(),
  components: z.array(catalogComponentSchema),
});

export type ComponentCatalog = z.infer<typeof componentCatalogSchema>;
export type ComponentCatalogComponent = ComponentCatalog['components'][number];
