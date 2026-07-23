/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from "zod";

const catalogArgSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  required: z.boolean().optional(),
  description: z.string().optional(),
  default: z.string().optional(),
});

const catalogBlockYieldSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  kind: z.enum(["component", "function", "value"]).optional(),
  componentName: z.string().min(1).optional(),
  boundArgs: z.array(z.string().min(1)).optional(),
  description: z.string().optional(),
});

const catalogBlockSchema = z.object({
  name: z.string().min(1),
  yields: z.array(catalogBlockYieldSchema).optional(),
});

const catalogDesignSchema = z.object({
  figmaUrl: z.string().url(),
  nodeId: z.string().min(1).optional(),
  fileKey: z.string().min(1).optional(),
});

const catalogComponentSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  design: catalogDesignSchema.optional(),
  args: z.array(catalogArgSchema).optional(),
  blocks: z.array(catalogBlockSchema).optional(),
});

export const componentCatalogSchema = z.object({
  updatedAt: z.string().datetime(),
  components: z.array(catalogComponentSchema),
});

export type ComponentCatalog = z.infer<typeof componentCatalogSchema>;
export type ComponentCatalogComponent = ComponentCatalog["components"][number];
