/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from "zod";

const catalogArgSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  required: z.boolean().optional(),
  summary: z.string().optional(),
  description: z.string().optional(),
  default: z.string().optional(),
});

const catalogBlockYieldSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  kind: z.enum(["component", "function", "value"]).optional(),
  componentName: z.string().min(1).optional(),
  sourcePath: z.string().min(1).optional(),
  boundArgs: z.array(z.string().min(1)).optional(),
  summary: z.string().optional(),
  description: z.string().optional(),
});

const catalogBlockSchema = z.object({
  name: z.string().min(1),
  summary: z.string().optional(),
  description: z.string().optional(),
  yields: z.array(catalogBlockYieldSchema).optional(),
});

const catalogDesignSchema = z.object({
  figmaUrl: z.string().url(),
  nodeId: z.string().min(1).optional(),
  fileKey: z.string().min(1).optional(),
});

const catalogComponentSchema = z.object({
  name: z.string().min(1),
  sourcePath: z.string().min(1),
  summary: z.string().min(1),
  docSourcePath: z.string().min(1).optional(),
  docEnrichedAt: z.string().datetime().optional(),
  design: catalogDesignSchema.optional(),
  args: z.array(catalogArgSchema).optional(),
  blocks: z.array(catalogBlockSchema).optional(),
  examples: z.array(z.string()).optional(),
});

export const componentCatalogSchema = z.object({
  updatedAt: z.string().datetime().optional(),
  components: z.array(catalogComponentSchema),
});

export type ComponentCatalog = z.infer<typeof componentCatalogSchema>;
export type ComponentCatalogComponent = ComponentCatalog["components"][number];
