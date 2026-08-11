/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from "zod";

const componentArgSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  required: z.boolean(),
  values: z.array(z.string()).optional(),
  inheritedFrom: z.string().min(1).optional(),
});

const componentBlockYieldSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
});

const componentBlockSchema = z.object({
  name: z.string().min(1),
  yields: z.array(componentBlockYieldSchema),
});

export const componentCatalogEntrySchema = z
  .object({
    name: z.string().min(1),
    modulePath: z.string().min(1),
    docsPath: z.string().min(1).optional(),
    element: z.string().min(1).optional(),
    args: z.array(componentArgSchema),
    blocks: z.array(componentBlockSchema),
  })
  .catchall(z.any());

export const componentCatalogSchema = z
  .object({
    components: z.array(componentCatalogEntrySchema),
  })
  .catchall(z.any());

export type ComponentArg = z.infer<typeof componentArgSchema>;
export type ComponentBlockYield = z.infer<typeof componentBlockYieldSchema>;
export type ComponentBlock = z.infer<typeof componentBlockSchema>;
export type ComponentCatalogEntry = z.infer<typeof componentCatalogEntrySchema>;
export type ComponentCatalog = z.infer<typeof componentCatalogSchema>;
