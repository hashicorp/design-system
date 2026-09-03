/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from "zod";

export const iconAssetSchema = z
  .object({
    id: z.string().min(1),
    fileName: z.string().min(1),
    iconName: z.string().min(1),
    description: z.string().optional(),
    category: z.string().min(1),
    size: z.string().min(1),
    width: z.number(),
    height: z.number(),
    mapping: z.string().min(1).optional(),
  })
  .catchall(z.any());

const lastRunFigmaSchema = z
  .object({
    id: z.string().min(1),
    page: z.string().min(1),
    excludeFrames: z.array(z.string()),
  })
  .catchall(z.any());

export const iconCatalogSchema = z
  .object({
    lastRunFigma: lastRunFigmaSchema.optional(),
    assets: z.array(iconAssetSchema),
  })
  .catchall(z.any());

export type IconAsset = z.infer<typeof iconAssetSchema>;
export type IconCatalog = z.infer<typeof iconCatalogSchema>;
