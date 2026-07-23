/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { readFileSync } from "node:fs";

import { getSearchScore, normalizeText } from "./lookup.js";
import { codeExamplesCatalogSchema } from "./schema.js";

import type { SearchRecord } from "./lookup.js";
import type {
  CodeExample,
  CodeExampleReadOutput,
  CodeExamplesCatalog,
  CodeExamplesSearchOutput,
} from "./schema.js";

interface SearchCodeExamplesInput {
  query: string;
  component?: string;
  limit: number;
}

interface ReadCodeExampleInput {
  exampleId: string;
}

export interface CodeExamplesStore {
  searchCodeExamples: (
    input: SearchCodeExamplesInput,
  ) => CodeExamplesSearchOutput["results"];
  readCodeExample: (input: ReadCodeExampleInput) => CodeExampleReadOutput;
}

export const parseCodeExamplesCatalog = (value: unknown): CodeExamplesCatalog =>
  codeExamplesCatalogSchema.parse(value);

export const createCodeExamplesStore = (
  catalog: CodeExamplesCatalog,
): CodeExamplesStore => {
  const examplesById = new Map<string, CodeExample>(
    catalog.examples.map((example) => [example.id, example]),
  );

  const searchRecords: SearchRecord[] = catalog.examples.map((example) => ({
    example,
    searchableText: normalizeText(
      [
        example.component,
        example.title,
        example.importedHdsComponents.join(" "),
        example.localDependencies.join(" "),
        example.source,
      ].join(" "),
    ),
  }));

  return {
    searchCodeExamples: ({ query, component, limit }) => {
      const normalizedQuery = normalizeText(query);

      if (normalizedQuery === "") {
        return [];
      }

      const normalizedComponent =
        component !== undefined ? normalizeText(component) : undefined;

      return searchRecords
        .filter((record) => {
          if (normalizedComponent === undefined) return true;
          return normalizeText(record.example.component).includes(
            normalizedComponent,
          );
        })
        .map((record) => ({
          record,
          score: getSearchScore(record, normalizedQuery),
        }))
        .filter(({ score }) => score > 0)
        .sort(
          (left, right) =>
            right.score - left.score ||
            left.record.example.component.localeCompare(
              right.record.example.component,
            ) ||
            left.record.example.title.localeCompare(
              right.record.example.title,
            ),
        )
        .slice(0, limit)
        .map(({ record }) => ({
          exampleId: record.example.id,
          component: record.example.component,
          title: record.example.title,
          sourcePath: record.example.sourcePath,
          ...(record.example.showcaseUrl !== undefined
            ? { showcaseUrl: record.example.showcaseUrl }
            : {}),
          importedHdsComponents: record.example.importedHdsComponents,
          localDependencies: record.example.localDependencies,
          snippet: normalizeText(record.example.source).slice(0, 300),
        }));
    },

    readCodeExample: ({ exampleId }) => {
      const example = examplesById.get(exampleId);

      if (example === undefined) {
        return {
          found: false,
          message: `Code example '${exampleId}' not found.`,
        };
      }

      return {
        found: true,
        example: {
          exampleId: example.id,
          component: example.component,
          title: example.title,
          sourcePath: example.sourcePath,
          ...(example.showcaseUrl !== undefined
            ? { showcaseUrl: example.showcaseUrl }
            : {}),
          language: "gts" as const,
          source: example.source,
          importedHdsComponents: example.importedHdsComponents,
          localDependencies: example.localDependencies,
          isStandalone: example.isStandalone,
        },
      };
    },
  };
};

export const loadCodeExamplesCatalog = (): CodeExamplesStore => {
  const catalogUrl = new URL(
    "../../../catalogs/code-examples/catalog.json",
    import.meta.url,
  );
  const catalog = JSON.parse(readFileSync(catalogUrl, "utf8")) as unknown;

  return createCodeExamplesStore(parseCodeExamplesCatalog(catalog));
};

let codeExamplesStore: CodeExamplesStore | null = null;

export const getOrLoadCodeExamplesStore = (): CodeExamplesStore => {
  if (codeExamplesStore === null) {
    codeExamplesStore = loadCodeExamplesCatalog();
  }

  return codeExamplesStore;
};
