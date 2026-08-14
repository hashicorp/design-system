/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from "zod";

export const codeExampleSchema = z.object({
  id: z.string().min(1),
  component: z.string().min(1),
  title: z.string().min(1),
  sourcePath: z.string().min(1),
  showcaseUrl: z.string().optional(),
  source: z.string(),
  importedHdsComponents: z.array(z.string()),
  localDependencies: z.array(z.string()),
  isStandalone: z.boolean(),
});

export const codeExamplesCatalogSchema = z.object({
  version: z.literal(1),
  examples: z.array(codeExampleSchema),
});

export const codeExampleSearchResultSchema = z.object({
  exampleId: z.string(),
  component: z.string(),
  title: z.string(),
  sourcePath: z.string(),
  showcaseUrl: z.string().optional(),
  importedHdsComponents: z.array(z.string()),
  localDependencies: z.array(z.string()),
  snippet: z.string(),
});

export const codeExamplesSearchOutputSchema = z.object({
  query: z.string(),
  component: z.string().optional(),
  resultCount: z.number().int(),
  results: z.array(codeExampleSearchResultSchema),
});

const codeExampleReadNotFoundSchema = z.object({
  found: z.literal(false),
  message: z.string(),
});

const codeExampleReadFoundSchema = z.object({
  found: z.literal(true),
  example: z.object({
    exampleId: z.string(),
    component: z.string(),
    title: z.string(),
    sourcePath: z.string(),
    showcaseUrl: z.string().optional(),
    language: z.literal("gts"),
    source: z.string(),
    importedHdsComponents: z.array(z.string()),
    localDependencies: z.array(z.string()),
    isStandalone: z.boolean(),
  }),
});

export const codeExampleReadOutputSchema = z.discriminatedUnion("found", [
  codeExampleReadNotFoundSchema,
  codeExampleReadFoundSchema,
]);

export const codeExampleReadToolOutputSchema = {
  found: z.boolean(),
  example: z
    .object({
      exampleId: z.string(),
      component: z.string(),
      title: z.string(),
      sourcePath: z.string(),
      showcaseUrl: z.string().optional(),
      language: z.literal("gts"),
      source: z.string(),
      importedHdsComponents: z.array(z.string()),
      localDependencies: z.array(z.string()),
      isStandalone: z.boolean(),
    })
    .optional(),
  message: z.string().optional(),
};

export type CodeExample = z.infer<typeof codeExampleSchema>;
export type CodeExamplesCatalog = z.infer<typeof codeExamplesCatalogSchema>;
export type CodeExampleReadOutput = z.infer<typeof codeExampleReadOutputSchema>;
export type CodeExamplesSearchOutput = z.infer<
  typeof codeExamplesSearchOutputSchema
>;
