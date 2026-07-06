/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from "zod";

export const TOKEN_TYPES = [
  "color",
  "dimension",
  "fontFamily",
  "fontWeight",
  "lineHeight",
  "letterSpacing",
  "duration",
  "cubicBezier",
  "number",
  "shadow",
  "other",
] as const;

export type TokenType = (typeof TOKEN_TYPES)[number];

const tokenAttributesSchema = z
  .object({
    category: z.string().min(1).optional(),
  })
  .passthrough();

const tokenOriginalSchema = z
  .object({
    $type: z.string().optional(),
    $value: z.unknown().optional(),
    key: z.string().optional(),
  })
  .passthrough();

export const tokenCatalogRowSchema = z
  .object({
    key: z.string().min(1),
    $type: z.string().optional(),
    $value: z.unknown(),
    name: z.string().min(1),
    attributes: tokenAttributesSchema.optional(),
    path: z.array(z.string().min(1)),
    original: tokenOriginalSchema.optional(),
  })
  .passthrough();

export const tokenCatalogSchema = z.array(tokenCatalogRowSchema);

export type TokenCatalogRow = z.infer<typeof tokenCatalogRowSchema>;
