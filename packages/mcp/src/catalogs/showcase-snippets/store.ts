/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import {
  existsSync,
  readFileSync,
  statSync,
} from 'node:fs';
import { dirname, extname, posix, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import fg from 'fast-glob';

export type ShowcaseSnippetLanguage = 'gts' | 'ts' | 'hbs' | 'js';
export type ShowcaseSnippetKind = 'example' | 'helper';

type ShowcaseSnippetRecord = {
  id: string;
  resolvedSlug: string;
  name: string;
  path: string;
  language: ShowcaseSnippetLanguage;
  kind: ShowcaseSnippetKind;
  source: string;
};

export type ShowcaseSnippetResult = {
  id: string;
  name: string;
  path: string;
  language: ShowcaseSnippetLanguage;
  kind: ShowcaseSnippetKind;
  source?: string;
};

export type ShowcaseSnippetGroupResult = {
  component: string;
  resolvedSlug: string | null;
  snippetCount: number;
  snippets: ShowcaseSnippetResult[];
  message?: string;
};

type ExtractSnippetsInput = {
  components: string[];
  query?: string;
  limitPerComponent: number;
  includeSource: boolean;
};

type CatalogMeta = {
  available: boolean;
  message?: string;
  totalSnippetCount: number;
  builtAt: string | null;
};

type LoaderOptions = {
  listSnippetFiles?: () => string[];
  readSnippetSource?: (filePath: string) => string;
  now?: () => Date;
};

export type ShowcaseSnippetsCatalogStore = {
  getMeta: () => CatalogMeta;
  extractSnippets: (input: ExtractSnippetsInput) => {
    query: string | null;
    limitPerComponent: number;
    includeSource: boolean;
    resultCount: number;
    results: ShowcaseSnippetGroupResult[];
  };
};

const thisDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(thisDir, '../../../../..');
const showcasePageComponentsPath = resolve(
  repoRoot,
  'showcase/app/components/page-components'
);
const pageComponentsMarker = '/showcase/app/components/page-components/';

const SUPPORTED_EXTENSIONS = new Set(['.gts', '.ts', '.hbs', '.js']);

const toUnavailableMessage = (reason: string): string => {
  return `Showcase snippets catalog unavailable: ${reason}`;
};

const normalizePathSeparators = (value: string): string => {
  return value.replace(/\\/gu, '/');
};

const normalizeComponentSlug = (value: string): string => {
  return normalizePathSeparators(value)
    .trim()
    .toLowerCase()
    .replace(/^hds[/:\s-]*/u, '')
    .replace(/^\/+/u, '')
    .replace(/\/+$/u, '')
    .replace(/\/+/gu, '/');
};

const normalizeQuery = (value: string | undefined): string | null => {
  if (value === undefined) {
    return null;
  }

  const normalized = value.trim().toLowerCase();

  return normalized === '' ? null : normalized;
};

const readSnippetFilesRecursively = (directoryPath: string): string[] => {
  const paths = fg.sync('**/*.{gts,ts,hbs,js}', {
    cwd: directoryPath,
    absolute: true,
    onlyFiles: true,
  });

  return paths
    .filter((filePath) => {
      return SUPPORTED_EXTENSIONS.has(extname(filePath).toLowerCase());
    })
    .sort((a, b) => a.localeCompare(b));
};

const listDefaultSnippetFiles = (): string[] => {
  const stats = statSync(showcasePageComponentsPath);

  if (!stats.isDirectory()) {
    throw new Error(
      `showcase page-components path is not a directory: ${showcasePageComponentsPath}`
    );
  }

  return readSnippetFilesRecursively(showcasePageComponentsPath).filter((filePath) => {
    return normalizePathSeparators(filePath).includes('/code-fragments/');
  });
};

const parseSnippetRecord = (
  filePath: string,
  readSnippetSource: (inputPath: string) => string
): ShowcaseSnippetRecord | null => {
  const normalizedFilePath = normalizePathSeparators(filePath);
  const markerIndexInAbsolute = normalizedFilePath.indexOf(pageComponentsMarker);
  const relativeToPageComponents =
    markerIndexInAbsolute >= 0
      ? normalizedFilePath.slice(
          markerIndexInAbsolute + pageComponentsMarker.length
        )
      : normalizePathSeparators(relative(showcasePageComponentsPath, filePath));
  const marker = '/code-fragments/';
  const markerIndex = relativeToPageComponents.indexOf(marker);

  if (markerIndex < 0) {
    return null;
  }

  const rawSlug = relativeToPageComponents.slice(0, markerIndex);
  const resolvedSlug = normalizeComponentSlug(rawSlug);

  if (resolvedSlug === '') {
    return null;
  }

  const snippetPath = relativeToPageComponents.slice(markerIndex + marker.length);

  if (snippetPath === '') {
    return null;
  }

  const extension = extname(snippetPath).toLowerCase();

  if (!SUPPORTED_EXTENSIONS.has(extension)) {
    return null;
  }

  const language = extension.slice(1) as ShowcaseSnippetLanguage;
  const pathWithoutExtension = snippetPath.slice(0, -extension.length);
  const kind: ShowcaseSnippetKind = snippetPath.startsWith('helpers/')
    ? 'helper'
    : 'example';
  const repoRelativePath = posix.join(
    'showcase/app/components/page-components',
    relativeToPageComponents
  );

  return {
    id: `${resolvedSlug}:${snippetPath}`,
    resolvedSlug,
    name: pathWithoutExtension,
    path: repoRelativePath,
    language,
    kind,
    source: readSnippetSource(filePath),
  };
};

const toSearchBlob = (record: ShowcaseSnippetRecord): string => {
  return [record.name, record.path, record.source].join(' ').toLowerCase();
};

export const loadShowcaseSnippetsCatalog = (
  options: LoaderOptions = {}
): ShowcaseSnippetsCatalogStore => {
  const listSnippetFiles = options.listSnippetFiles ?? listDefaultSnippetFiles;
  const readSnippetSource =
    options.readSnippetSource ??
    ((filePath: string) => {
      return readFileSync(filePath, 'utf8');
    });
  const getNow = options.now ?? (() => new Date());
  const hasCustomList = options.listSnippetFiles !== undefined;

  let available = true;
  let message: string | undefined;
  let records: ShowcaseSnippetRecord[] = [];

  if (!hasCustomList && !existsSync(showcasePageComponentsPath)) {
    available = false;
    message = toUnavailableMessage(
      `showcase page-components folder not found at ${showcasePageComponentsPath}.`
    );
  } else {
    try {
      const files = listSnippetFiles();
      records = files
        .map((filePath) => parseSnippetRecord(filePath, readSnippetSource))
        .filter((record): record is ShowcaseSnippetRecord => record !== null)
        .sort((a, b) => {
          if (a.resolvedSlug !== b.resolvedSlug) {
            return a.resolvedSlug.localeCompare(b.resolvedSlug);
          }

          return a.path.localeCompare(b.path);
        });

      if (records.length === 0) {
        available = false;
        message = toUnavailableMessage('showcase code-fragment files are missing.');
      }
    } catch (error) {
      available = false;
      message = toUnavailableMessage(
        `showcase snippets failed to load (${error instanceof Error ? error.message : 'unknown error'}).`
      );
    }
  }

  const recordsBySlug = new Map<string, ShowcaseSnippetRecord[]>();

  for (const record of records) {
    const existing = recordsBySlug.get(record.resolvedSlug) ?? [];
    recordsBySlug.set(record.resolvedSlug, [...existing, record]);
  }

  const meta: CatalogMeta = {
    available,
    ...(message === undefined ? {} : { message }),
    totalSnippetCount: records.length,
    builtAt: available ? getNow().toISOString() : null,
  };

  return {
    getMeta: () => meta,
    extractSnippets: ({ components, query, limitPerComponent, includeSource }) => {
      const normalizedQuery = normalizeQuery(query);
      const results: ShowcaseSnippetGroupResult[] = [];
      let resultCount = 0;

      for (const component of components) {
        const resolvedInputSlug = normalizeComponentSlug(component);
        const recordsForSlug =
          resolvedInputSlug === ''
            ? undefined
            : recordsBySlug.get(resolvedInputSlug);

        if (meta.available === false) {
          results.push({
            component,
            resolvedSlug: null,
            snippetCount: 0,
            snippets: [],
            message: meta.message ?? 'Showcase snippets catalog is unavailable.',
          });

          continue;
        }

        if (recordsForSlug === undefined) {
          results.push({
            component,
            resolvedSlug: null,
            snippetCount: 0,
            snippets: [],
            message: 'No showcase code fragments found for this component.',
          });

          continue;
        }

        const filteredRecords =
          normalizedQuery === null
            ? recordsForSlug
            : recordsForSlug.filter((record) => {
                return toSearchBlob(record).includes(normalizedQuery);
              });

        const sortedRecords = [...filteredRecords].sort((a, b) => {
          return a.path.localeCompare(b.path);
        });
        const limitedRecords = sortedRecords.slice(0, limitPerComponent);

        const snippets: ShowcaseSnippetResult[] = limitedRecords.map((record) => {
          return {
            id: record.id,
            name: record.name,
            path: record.path,
            language: record.language,
            kind: record.kind,
            ...(includeSource ? { source: record.source } : {}),
          };
        });

        resultCount += snippets.length;

        results.push({
          component,
          resolvedSlug: resolvedInputSlug,
          snippetCount: snippets.length,
          snippets,
          ...(snippets.length === 0
            ? { message: 'No snippets matched the provided query.' }
            : {}),
        });
      }

      return {
        query: normalizedQuery,
        limitPerComponent,
        includeSource,
        resultCount,
        results,
      };
    },
  };
};
