/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import MiniSearch from 'minisearch';
import { normalizeDocsSearchResult } from './normalize-result.js';
import { docsPageSchema } from './schema.js';
import { isRecordInScope } from './scopes.js';

import type { DocsSearchResult } from './normalize-result.js';
import type { DocsSearchScope } from './scopes.js';

type DocsCatalogSource = 'docs';

type SearchInput = {
  query: string;
  scope: DocsSearchScope;
  limit: number;
};

type CatalogMeta = {
  totalRecordCount: number;
  sources: {
    docs: number;
  };
  builtAt: string | null;
  available: boolean;
  message?: string;
};

export type DocsCatalogStore = {
  getMeta: () => CatalogMeta;
  search: (input: SearchInput) => {
    resultCount: number;
    results: DocsSearchResult[];
  };
};

type InternalCatalogRecord = {
  id: string;
  source: DocsCatalogSource;
  title: string;
  url: string;
  kind: string;
  section: string;
  snippet: string;
  scopes: ReadonlySet<Exclude<DocsSearchScope, 'all'>>;
  searchableText: string;
};

type IndexedDocument = {
  id: string;
  title: string;
  section: string;
  kind: string;
  snippet: string;
  searchableText: string;
};

type RankedRecord = {
  id: string;
  score: number;
  title: string;
  section: string;
  kind: string;
  snippet: string;
};

type RankingBucket = 'exact' | 'prefix' | 'substring' | 'other';

const thisDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(thisDir, '../../../../..');
const websiteDocsPath = resolve(repoRoot, 'website/dist/docs');

const toNormalizedText = (value: string): string => {
  return value.replace(/\s+/gu, ' ').trim().toLowerCase();
};

const toPlainText = (value: string): string => {
  return value
    .replace(/!\[[^\]]*\]\([^\)]+\)/gu, ' ')
    .replace(/\[([^\]]+)\]\([^\)]+\)/gu, '$1')
    .replace(/<[^>]+>/gu, ' ')
    .replace(/`+/gu, ' ')
    .replace(/\s+/gu, ' ')
    .trim();
};

const stripJsonExtension = (value: string): string => {
  if (value.endsWith('.json')) {
    return value.slice(0, -5);
  }

  return value;
};

const toDocsUrl = (pathOrSlug: string): string => {
  const normalized = stripJsonExtension(pathOrSlug).replace(/\/index$/u, '');

  return `https://helios.hashicorp.design/${normalized}`;
};

const toMainCategory = (
  section: string
): 'components' | 'foundations' | 'patterns' | 'about' | null => {
  if (['components', 'layouts', 'overrides', 'utilities'].includes(section)) {
    return 'components';
  }

  if (['foundations', 'icons'].includes(section)) {
    return 'foundations';
  }

  if (section === 'patterns') {
    return 'patterns';
  }

  if (['about', 'whats-new', 'getting-started', 'updates'].includes(section)) {
    return 'about';
  }

  return null;
};

const getDocsScopesForSection = (
  section: string,
  kind: string
): ReadonlySet<Exclude<DocsSearchScope, 'all'>> => {
  const scopes = new Set<Exclude<DocsSearchScope, 'all'>>();
  const mainCategory = toMainCategory(section);

  if (mainCategory !== null) {
    scopes.add(mainCategory);
  }

  if (kind === 'component-api-property') {
    scopes.add('componentApi');
  }

  if (
    kind === 'heading' ||
    kind === 'paragraph' ||
    kind === 'table' ||
    kind === 'wcag-list'
  ) {
    scopes.add('content');
  }

  return scopes;
};

const splitLines = (value: string): string[] => {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line !== '');
};

const extractHeadings = (content: string): string[] => {
  const headings: string[] = [];

  for (const rawLine of splitLines(content)) {
    if (!rawLine.startsWith('#')) {
      continue;
    }

    const heading = rawLine.replace(/^#+\s*/u, '').trim();

    if (heading !== '') {
      headings.push(toPlainText(heading));
    }
  }

  return headings;
};

const extractComponentApiProperties = (content: string): string[] => {
  const matches = content.matchAll(/<C\.Property\s+@name="([^"]+)"/gu);
  const names: string[] = [];

  for (const match of matches) {
    const propertyName = match[1]?.trim();

    if (propertyName !== undefined && propertyName !== '') {
      names.push(propertyName);
    }
  }

  return names;
};

const getTopLevelSection = (pathValue: string): string => {
  const [section] = pathValue.split('/');

  return section ?? 'docs';
};

const toWebsiteDocRecords = (rawJson: string): InternalCatalogRecord[] => {
  const parsedJson = JSON.parse(rawJson) as unknown;
  const parsed = docsPageSchema.safeParse(parsedJson);

  if (!parsed.success) {
    return [];
  }

  const attrs = parsed.data.data.attributes;
  const pathValue = attrs.path ?? parsed.data.data.id;
  const section = getTopLevelSection(pathValue);
  const title = attrs.title?.trim() || parsed.data.data.id;
  const description = attrs.description?.trim() ?? attrs.caption?.trim() ?? '';
  const content = attrs.content ?? '';
  const contentText = toPlainText(content);
  const snippet = description !== '' ? description : contentText.slice(0, 400);
  const url = toDocsUrl(pathValue);

  const records: InternalCatalogRecord[] = [
    {
      id: `docs:${pathValue}:page`,
      source: 'docs',
      title,
      url,
      kind: 'page',
      section,
      snippet,
      scopes: getDocsScopesForSection(section, 'page'),
      searchableText: `${title} ${section} ${snippet} ${contentText}`,
    },
  ];

  const headings = extractHeadings(content);

  for (const [index, heading] of headings.entries()) {
    records.push({
      id: `docs:${pathValue}:heading:${index}`,
      source: 'docs',
      title: heading,
      url,
      kind: 'heading',
      section,
      snippet,
      scopes: getDocsScopesForSection(section, 'heading'),
      searchableText: `${heading} ${title} ${section} ${snippet}`,
    });
  }

  if (section === 'components') {
    const apiProperties = extractComponentApiProperties(content);

    for (const [index, propertyName] of apiProperties.entries()) {
      records.push({
        id: `docs:${pathValue}:component-api:${index}`,
        source: 'docs',
        title: `${title} API ${propertyName}`,
        url,
        kind: 'component-api-property',
        section,
        snippet: `Component API property ${propertyName}.`,
        scopes: getDocsScopesForSection(section, 'component-api-property'),
        searchableText: `${title} ${propertyName} component api`,
      });
    }
  }

  if (records.every((record) => record.title.trim() === '')) {
    return [];
  }

  return records;
};

const readJsonFilesRecursively = (directoryPath: string): string[] => {
  const queue = [directoryPath];
  const filePaths: string[] = [];

  while (queue.length > 0) {
    const currentPath = queue.shift();

    if (currentPath === undefined) {
      continue;
    }

    const entries = readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = resolve(currentPath, entry.name);

      if (entry.isDirectory()) {
        queue.push(fullPath);
      } else if (entry.isFile() && fullPath.endsWith('.json')) {
        filePaths.push(fullPath);
      }
    }
  }

  return filePaths.sort((a, b) => a.localeCompare(b));
};

const loadWebsiteDocsRecords = (): InternalCatalogRecord[] => {
  const stats = statSync(websiteDocsPath);

  if (!stats.isDirectory()) {
    throw new Error(`Website docs path is not a directory: ${websiteDocsPath}`);
  }

  const jsonFiles = readJsonFilesRecursively(websiteDocsPath);
  const records: InternalCatalogRecord[] = [];

  for (const filePath of jsonFiles) {
    const rawJson = readFileSync(filePath, 'utf8');
    const pageRecords = toWebsiteDocRecords(rawJson);

    records.push(...pageRecords);
  }

  return records;
};

const toBucketIndex = (bucket: RankingBucket): number => {
  if (bucket === 'exact') {
    return 0;
  }

  if (bucket === 'prefix') {
    return 1;
  }

  if (bucket === 'substring') {
    return 2;
  }

  return 3;
};

export const classifyRankingBucket = (
  query: string,
  record: Pick<RankedRecord, 'title' | 'section' | 'kind' | 'snippet'>
): RankingBucket => {
  const normalizedQuery = toNormalizedText(query);

  if (normalizedQuery === '') {
    return 'other';
  }

  const fields = [record.title, record.section, record.kind, record.snippet]
    .map((value) => toNormalizedText(value))
    .filter((value) => value !== '');

  if (fields.some((value) => value === normalizedQuery)) {
    return 'exact';
  }

  if (fields.some((value) => value.startsWith(normalizedQuery))) {
    return 'prefix';
  }

  if (fields.some((value) => value.includes(normalizedQuery))) {
    return 'substring';
  }

  return 'other';
};

export const rankSearchResults = (
  query: string,
  records: RankedRecord[]
): RankedRecord[] => {
  return [...records].sort((a, b) => {
    const bucketA = toBucketIndex(classifyRankingBucket(query, a));
    const bucketB = toBucketIndex(classifyRankingBucket(query, b));

    if (bucketA !== bucketB) {
      return bucketA - bucketB;
    }

    if (a.score !== b.score) {
      return b.score - a.score;
    }

    return a.id.localeCompare(b.id);
  });
};

type LoaderOptions = {
  loadWebsiteDocsRecords?: () => InternalCatalogRecord[];
  now?: () => Date;
};

const toUnavailableMessage = (reason: string): string => {
  return `Docs catalog unavailable: ${reason}`;
};

export const loadDocsCatalog = (
  options: LoaderOptions = {}
): DocsCatalogStore => {
  const readDocsRecords =
    options.loadWebsiteDocsRecords ?? loadWebsiteDocsRecords;
  const getNow = options.now ?? (() => new Date());

  let docsRecords: InternalCatalogRecord[] = [];

  let available = true;
  let message: string | undefined;

  if (!existsSync(websiteDocsPath)) {
    available = false;
    message = toUnavailableMessage(
      `website docs folder not found at ${websiteDocsPath}.`
    );
  } else {
    try {
      docsRecords = readDocsRecords();

      if (docsRecords.length === 0) {
        available = false;
        message = toUnavailableMessage('website docs folder has no records.');
      }
    } catch (error) {
      available = false;
      message = toUnavailableMessage(
        `website docs failed to load (${error instanceof Error ? error.message : 'unknown error'}).`
      );
    }
  }

  const allRecords = docsRecords;
  const recordById = new Map(allRecords.map((record) => [record.id, record]));

  const miniSearch = new MiniSearch<IndexedDocument>({
    fields: ['title', 'section', 'kind', 'snippet', 'searchableText'],
    storeFields: ['id', 'title', 'section', 'kind', 'snippet'],
    searchOptions: {
      prefix: true,
      fuzzy: 0.1,
    },
  });

  miniSearch.addAll(
    allRecords.map((record) => ({
      id: record.id,
      title: record.title,
      section: record.section,
      kind: record.kind,
      snippet: record.snippet,
      searchableText: record.searchableText,
    }))
  );

  const builtAt = available ? getNow().toISOString() : null;

  const meta: CatalogMeta = {
    totalRecordCount: allRecords.length,
    sources: {
      docs: docsRecords.length,
    },
    builtAt,
    available,
    ...(message === undefined ? {} : { message }),
  };

  return {
    getMeta: () => meta,
    search: ({ query, scope, limit }: SearchInput) => {
      if (available === false) {
        return {
          resultCount: 0,
          results: [],
        };
      }

      const normalizedQuery = query.trim();

      if (normalizedQuery === '' || limit <= 0) {
        return {
          resultCount: 0,
          results: [],
        };
      }

      const rawHits = miniSearch.search(normalizedQuery, {
        prefix: true,
        fuzzy: 0.1,
      });

      const scopedHits: RankedRecord[] = [];

      for (const hit of rawHits) {
        const hitId = typeof hit.id === 'string' ? hit.id : String(hit.id);
        const record = recordById.get(hitId);

        if (record === undefined) {
          continue;
        }

        if (!isRecordInScope(record.scopes, scope)) {
          continue;
        }

        scopedHits.push({
          id: hitId,
          score: hit.score,
          title: record.title,
          section: record.section,
          kind: record.kind,
          snippet: record.snippet,
        });
      }

      const rankedHits = rankSearchResults(normalizedQuery, scopedHits);
      const limitedHits = rankedHits.slice(0, limit);

      return {
        resultCount: limitedHits.length,
        results: limitedHits.map((hit) => {
          const record = recordById.get(hit.id);

          return normalizeDocsSearchResult({
            title: record?.title,
            url: record?.url,
            kind: record?.kind,
            section: record?.section,
            snippet: record?.snippet,
          });
        }),
      };
    },
  };
};
