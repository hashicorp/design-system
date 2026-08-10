/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from "zod";

export const TOKEN_TYPES = [
  "color",
  "cubicBezier",
  "dimension",
  "duration",
  "font-family",
  "font-weight",
  "font-size",
  "letter-spacing",
  "number",
  "other",
] as const;

export type TokenType = (typeof TOKEN_TYPES)[number];

const tokenAttributesSchema = z
  .object({
    category: z.string().min(1),
  })
  .catchall(z.any());

export type TokenAttributes = z.infer<typeof tokenAttributesSchema>;

const tokenOriginalSchema = z
  .object({
    $type: z.string().min(1).optional(),
    $value: z.json().optional(),
    key: z.string().optional(),
  })
  .catchall(z.json());

export type TokenOriginal = z.infer<typeof tokenOriginalSchema>;

export const tokenCatalogRowSchema = z
  .object({
    key: z.string().min(1),
    $type: z.string().min(1).optional(),
    $value: z.json(),
    name: z.string().min(1),
    attributes: tokenAttributesSchema,
    path: z.array(z.string().min(1)),
    original: tokenOriginalSchema.optional(),
  })
  .catchall(z.any());

export const tokenCatalogSchema = z.array(tokenCatalogRowSchema);

export type TokenCatalogRow = z.infer<typeof tokenCatalogRowSchema>;
