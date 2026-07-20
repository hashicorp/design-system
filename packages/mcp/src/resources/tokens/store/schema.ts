/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from "zod";

import type { JsonValue } from "../../../types.js";

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

const jsonValueSchema: z.ZodType<JsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.null(),
    z.array(jsonValueSchema),
    z.record(z.string(), jsonValueSchema),
  ]),
);

const tokenAttributesSchema = z
  .object({
    category: z.string().min(1).optional(),
  })
  .catchall(z.any());

const tokenOriginalSchema = z
  .object({
    $type: z.string().min(1).optional(),
    $value: jsonValueSchema.optional(),
    key: z.string().optional(),
  })
  .catchall(jsonValueSchema);

export const tokenCatalogRowSchema = z
  .object({
    key: z.string().min(1),
    $type: z.enum(TOKEN_TYPES).optional(),
    $value: jsonValueSchema,
    name: z.string().min(1),
    attributes: tokenAttributesSchema.optional(),
    path: z.array(z.string().min(1)),
    original: tokenOriginalSchema.optional(),
  })
  .catchall(z.any());

export const tokenCatalogSchema = z.array(tokenCatalogRowSchema);

export type TokenCatalogRow = z.infer<typeof tokenCatalogRowSchema>;
