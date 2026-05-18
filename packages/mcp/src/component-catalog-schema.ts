/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from 'zod';

const catalogApiNoteSchema = z.object({
  kind: z.enum(['note', 'important', 'warning']),
  text: z.string().min(1),
});

const catalogApiLinkSchema = z.object({
  href: z.string().min(1),
  label: z.string().min(1).optional(),
});

const catalogArgSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  required: z.boolean().optional(),
  description: z.string().optional(),
  default: z.string().optional(),
  values: z.array(z.string()).optional(),
  notes: z.array(catalogApiNoteSchema).optional(),
  links: z.array(catalogApiLinkSchema).optional(),
});

const catalogBlockSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

const catalogDesignSchema = z.object({
  figmaUrl: z.string().url(),
  nodeId: z.string().min(1).optional(),
  fileKey: z.string().min(1).optional(),
});

type CatalogApiPropertyShape = {
  name: string;
  type?: string;
  required?: boolean;
  default?: string;
  values?: string[];
  valueNote?: string;
  description?: string;
  notes?: Array<{ kind: 'note' | 'important' | 'warning'; text: string }>;
  links?: Array<{ href: string; label?: string }>;
  properties?: CatalogApiPropertyShape[];
};

const catalogApiPropertySchema: z.ZodType<CatalogApiPropertyShape> = z.lazy(
  () =>
    z.object({
      name: z.string().min(1),
      type: z.string().optional(),
      required: z.boolean().optional(),
      default: z.string().optional(),
      values: z.array(z.string()).optional(),
      valueNote: z.string().optional(),
      description: z.string().optional(),
      notes: z.array(catalogApiNoteSchema).optional(),
      links: z.array(catalogApiLinkSchema).optional(),
      properties: z.array(catalogApiPropertySchema).optional(),
    })
);

const catalogApiSchema = z.object({
  arguments: z.array(catalogApiPropertySchema).optional(),
  blocks: z.array(catalogApiPropertySchema).optional(),
  contextualComponents: z.array(catalogApiPropertySchema).optional(),
});

const catalogComponentSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  summary: z.string().min(1),
  design: catalogDesignSchema.optional(),
  args: z.array(catalogArgSchema).optional(),
  blocks: z.array(catalogBlockSchema).optional(),
  api: catalogApiSchema,
  a11yNotes: z.array(z.string()).optional(),
  examples: z.array(z.string()).optional(),
});

export const componentCatalogSchema = z.object({
  generatedAt: z.string().datetime().optional(),
  components: z.array(catalogComponentSchema),
});

export type ComponentCatalog = z.infer<typeof componentCatalogSchema>;
export type ComponentCatalogComponent = ComponentCatalog['components'][number];
