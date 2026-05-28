/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import MiniSearch from 'minisearch';
import {
  normalizeDocsSearchResult,
  truncateSnippet,
} from './normalize-result.js';
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

type ReadDocInput = {
  docId?: string;
  url?: string;
  anchor?: string;
  detail?: 'full' | 'summary';
  cursor?: string;
  maxSections: number;
  maxChars: number;
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
  readDoc: (input: ReadDocInput) => DocsReadResult;
};

export type DocsReadSection = {
  heading: string;
  anchor: string;
  excerpt: string;
  url: string;
  level?: number;
  truncated?: boolean;
  remainingChars?: number;
  nextCursor?: string;
};

export type DocsReadResult = {
  found: boolean;
  requested: {
    docId?: string;
    url?: string;
    anchor?: string;
    detail: 'full' | 'summary';
    cursor?: string;
    maxSections: number;
    maxChars: number;
  };
  doc?: {
    docId: string;
    url: string;
    title: string;
    section: string;
  };
  sections: DocsReadSection[];
  nextCursor?: string;
  message?: string;
};

type ParsedDocSection = {
  heading: string;
  anchor: string;
  level: number;
  text: string;
  url: string;
};

type ReadCursor = {
  docId: string;
  anchor: string;
  offset: number;
};

type InternalCatalogRecord = {
  id: string;
  source: DocsCatalogSource;
  docId: string;
  anchor?: string;
  title: string;
  url: string;
  kind: string;
  section: string;
  snippet: string;
  scopes: ReadonlySet<Exclude<DocsSearchScope, 'all'>>;
  searchableText: string;
  contentText: string;
  sections?: ParsedDocSection[];
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
  docId: string;
  url: string;
  anchor?: string;
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

const toAnchorSlug = (value: string): string => {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/gu, '')
    .trim()
    .replace(/\s+/gu, '-');
};

const normalizeAnchorInput = (value: string): string => {
  return toAnchorSlug(value.trim().replace(/^#/u, ''));
};

const normalizeDocId = (value: string): string => {
  return stripJsonExtension(value.trim())
    .replace(/^https?:\/\/[^/]+/u, '')
    .replace(/^\//u, '')
    .replace(/\/+$/u, '');
};

const normalizeDocUrl = (value: string): string | null => {
  const trimmedValue = value.trim();

  if (trimmedValue === '') {
    return null;
  }

  const asUrlInput =
    trimmedValue.startsWith('http://') || trimmedValue.startsWith('https://')
      ? trimmedValue
      : `https://helios.hashicorp.design/${trimmedValue.replace(/^\//u, '')}`;

  try {
    const parsedUrl = new URL(asUrlInput);
    const normalizedPath = parsedUrl.pathname.replace(/\/+$/u, '');

    return normalizedPath === ''
      ? 'https://helios.hashicorp.design'
      : `https://helios.hashicorp.design${normalizedPath}`;
  } catch {
    return null;
  }
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

const normalizeSectionText = (value: string): string => {
  return toPlainText(value).replace(/\s+/gu, ' ').trim();
};

const createUniqueAnchor = (
  preferredAnchor: string,
  usedAnchors: Set<string>
): string => {
  const baseAnchor = preferredAnchor === '' ? 'section' : preferredAnchor;

  if (!usedAnchors.has(baseAnchor)) {
    usedAnchors.add(baseAnchor);

    return baseAnchor;
  }

  let suffix = 2;

  while (usedAnchors.has(`${baseAnchor}-${suffix}`)) {
    suffix += 1;
  }

  const uniqueAnchor = `${baseAnchor}-${suffix}`;
  usedAnchors.add(uniqueAnchor);

  return uniqueAnchor;
};

const parseDocSections = (
  content: string,
  url: string,
  title: string
): ParsedDocSection[] => {
  const lines = content.split('\n');
  const usedAnchors = new Set<string>();
  const preambleLines: string[] = [];
  const sections: ParsedDocSection[] = [];

  let current:
    | {
        heading: string;
        level: number;
        anchor: string;
        lines: string[];
      }
    | undefined;

  const pushCurrentSection = (): void => {
    if (current === undefined) {
      return;
    }

    const sectionText = normalizeSectionText(current.lines.join('\n'));

    sections.push({
      heading: current.heading,
      anchor: current.anchor,
      level: current.level,
      text: sectionText === '' ? current.heading : sectionText,
      url: `${url}#${current.anchor}`,
    });

    current = undefined;
  };

  for (const rawLine of lines) {
    const headingMatch = rawLine.match(/^(#{1,6})\s+(.+)$/u);

    if (headingMatch !== null) {
      pushCurrentSection();

      const headingText = normalizeSectionText(headingMatch[2] ?? '');

      if (headingText === '') {
        continue;
      }

      const headingAnchor = createUniqueAnchor(
        toAnchorSlug(headingText),
        usedAnchors
      );

      current = {
        heading: headingText,
        level: headingMatch[1]?.length ?? 1,
        anchor: headingAnchor,
        lines: [],
      };

      continue;
    }

    if (current !== undefined) {
      current.lines.push(rawLine);
    } else {
      preambleLines.push(rawLine);
    }
  }

  pushCurrentSection();

  const preambleText = normalizeSectionText(preambleLines.join('\n'));

  if (preambleText !== '') {
    const overviewAnchor = createUniqueAnchor('overview', usedAnchors);

    sections.unshift({
      heading: `${title} overview`,
      anchor: overviewAnchor,
      level: 1,
      text: preambleText,
      url: `${url}#${overviewAnchor}`,
    });
  }

  if (sections.length > 0) {
    return sections;
  }

  const fallbackText = normalizeSectionText(content);

  return [
    {
      heading: title,
      anchor: 'overview',
      level: 1,
      text: fallbackText === '' ? title : fallbackText,
      url: `${url}#overview`,
    },
  ];
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
  const docId = parsed.data.data.id;
  const pathValue = attrs.path ?? docId;
  const section = getTopLevelSection(pathValue);
  const title = attrs.title?.trim() || parsed.data.data.id;
  const description = attrs.description?.trim() ?? attrs.caption?.trim() ?? '';
  const content = attrs.content ?? '';
  const url = toDocsUrl(pathValue);
  const sections = parseDocSections(content, url, title);
  const contentText = sections
    .map((sectionValue) => sectionValue.text)
    .join(' ');
  const snippet = description !== '' ? description : contentText.slice(0, 400);

  const records: InternalCatalogRecord[] = [
    {
      id: `docs:${pathValue}:page`,
      source: 'docs',
      docId,
      title,
      url,
      kind: 'page',
      section,
      snippet,
      scopes: getDocsScopesForSection(section, 'page'),
      searchableText: `${title} ${section} ${snippet} ${contentText}`,
      contentText,
      sections,
    },
  ];

  const headings = sections;

  for (const [index, heading] of headings.entries()) {
    records.push({
      id: `docs:${pathValue}:heading:${index}`,
      source: 'docs',
      docId,
      anchor: heading.anchor,
      title: heading.heading,
      url,
      kind: 'heading',
      section,
      snippet,
      scopes: getDocsScopesForSection(section, 'heading'),
      searchableText: `${heading.heading} ${title} ${section} ${snippet} ${heading.text}`,
      contentText: heading.text,
    });
  }

  if (section === 'components') {
    const apiProperties = extractComponentApiProperties(content);

    for (const [index, propertyName] of apiProperties.entries()) {
      records.push({
        id: `docs:${pathValue}:component-api:${index}`,
        source: 'docs',
        docId,
        anchor: toAnchorSlug(propertyName),
        title: `${title} API ${propertyName}`,
        url,
        kind: 'component-api-property',
        section,
        snippet: `Component API property ${propertyName}.`,
        scopes: getDocsScopesForSection(section, 'component-api-property'),
        searchableText: `${title} ${propertyName} component api`,
        contentText,
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

const getCanonicalPageUrl = (value: string): string => {
  const [withoutHash = value] = value.split('#');

  if (withoutHash.endsWith('/')) {
    return withoutHash.slice(0, -1);
  }

  return withoutHash;
};

const getScoreFloor = (topScore: number): number => {
  if (!Number.isFinite(topScore) || topScore <= 0) {
    return Number.NEGATIVE_INFINITY;
  }

  return topScore * 0.2;
};

const extractSnippetAroundQuery = (
  text: string,
  query: string,
  maxLength = 200
): string | null => {
  const normalizedText = text.replace(/\s+/gu, ' ').trim();
  const normalizedQuery = query.replace(/\s+/gu, ' ').trim().toLowerCase();

  if (normalizedText === '' || normalizedQuery === '') {
    return null;
  }

  const haystack = normalizedText.toLowerCase();
  const queryIndex = haystack.indexOf(normalizedQuery);

  if (queryIndex < 0) {
    return null;
  }

  const contextWindow = Math.max(maxLength - normalizedQuery.length, 40);
  let start = Math.max(0, queryIndex - Math.floor(contextWindow / 2));
  const end = Math.min(normalizedText.length, start + maxLength);

  if (end === normalizedText.length) {
    start = Math.max(0, end - maxLength);
  }

  let snippet = normalizedText.slice(start, end).trim();

  if (start > 0) {
    snippet = `...${snippet}`;
  }

  if (end < normalizedText.length) {
    snippet = `${snippet}...`;
  }

  return truncateSnippet(snippet, maxLength);
};

const toResultSnippet = (
  query: string,
  record: InternalCatalogRecord
): string => {
  const matchLocalSnippet =
    extractSnippetAroundQuery(record.contentText, query) ??
    extractSnippetAroundQuery(record.searchableText, query);

  if (matchLocalSnippet !== null) {
    return matchLocalSnippet;
  }

  return truncateSnippet(record.snippet, 200);
};

const buildRequestedPayload = (
  input: ReadDocInput
): DocsReadResult['requested'] => {
  return {
    ...(input.docId === undefined ? {} : { docId: input.docId }),
    ...(input.url === undefined ? {} : { url: input.url }),
    ...(input.anchor === undefined ? {} : { anchor: input.anchor }),
    detail: input.detail ?? 'full',
    ...(input.cursor === undefined ? {} : { cursor: input.cursor }),
    maxSections: input.maxSections,
    maxChars: input.maxChars,
  };
};

const toDocLookupIds = (docId: string): string[] => {
  const normalized = normalizeDocId(docId);
  const withoutIndex = normalized.replace(/\/index$/u, '');

  return Array.from(new Set([normalized, withoutIndex]));
};

const encodeCursor = (cursor: ReadCursor): string => {
  return Buffer.from(JSON.stringify(cursor), 'utf8').toString('base64url');
};

const decodeCursor = (value: string): ReadCursor | null => {
  try {
    const parsed = JSON.parse(
      Buffer.from(value, 'base64url').toString('utf8')
    ) as Partial<ReadCursor>;

    if (
      typeof parsed.docId !== 'string' ||
      typeof parsed.anchor !== 'string' ||
      typeof parsed.offset !== 'number' ||
      Number.isInteger(parsed.offset) === false ||
      parsed.offset < 0
    ) {
      return null;
    }

    return {
      docId: parsed.docId,
      anchor: parsed.anchor,
      offset: parsed.offset,
    };
  } catch {
    return null;
  }
};

const toDocSections = (
  pageRecord: InternalCatalogRecord
): ParsedDocSection[] => {
  const sections = pageRecord.sections ?? [];

  if (sections.length > 0) {
    return sections;
  }

  const fallbackText = normalizeSectionText(pageRecord.contentText);

  return [
    {
      heading: pageRecord.title,
      anchor: 'overview',
      level: 1,
      text: fallbackText === '' ? pageRecord.title : fallbackText,
      url: `${pageRecord.url}#overview`,
    },
  ];
};

const toSectionExcerpt = (
  section: ParsedDocSection,
  detail: 'full' | 'summary',
  offset: number,
  maxChars: number,
  docId: string
): DocsReadSection => {
  const sectionText = section.text;
  const sliceStart = Math.max(0, Math.min(offset, sectionText.length));
  const remaining = sectionText.length - sliceStart;

  if (remaining <= maxChars) {
    return {
      heading: section.heading,
      anchor: section.anchor,
      excerpt:
        detail === 'summary'
          ? truncateSnippet(sectionText.slice(sliceStart), maxChars)
          : sectionText.slice(sliceStart),
      url: section.url,
      level: section.level,
      truncated: false,
      remainingChars: 0,
    };
  }

  const excerptRaw = sectionText.slice(sliceStart, sliceStart + maxChars);
  const nextCursor = encodeCursor({
    docId,
    anchor: section.anchor,
    offset: sliceStart + excerptRaw.length,
  });

  return {
    heading: section.heading,
    anchor: section.anchor,
    excerpt:
      detail === 'summary' ? truncateSnippet(excerptRaw, maxChars) : excerptRaw,
    url: section.url,
    level: section.level,
    truncated: true,
    remainingChars: sectionText.length - (sliceStart + excerptRaw.length),
    nextCursor,
  };
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
  const pageRecordByDocId = new Map<string, InternalCatalogRecord>();
  const pageRecordByUrl = new Map<string, InternalCatalogRecord>();

  for (const record of allRecords) {
    if (record.kind === 'page') {
      for (const lookupId of toDocLookupIds(record.docId)) {
        pageRecordByDocId.set(lookupId, record);
      }

      const pathFromUrl = record.url.replace(
        /^https:\/\/helios\.hashicorp\.design\//u,
        ''
      );

      for (const lookupPath of toDocLookupIds(pathFromUrl)) {
        pageRecordByDocId.set(lookupPath, record);
      }

      pageRecordByUrl.set(record.url, record);
    }
  }

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
          docId: record.docId,
          url: record.url,
          anchor: record.anchor,
          title: record.title,
          section: record.section,
          kind: record.kind,
          snippet: toResultSnippet(normalizedQuery, record),
        });
      }

      const rankedHits = rankSearchResults(normalizedQuery, scopedHits);
      const topScore = rankedHits[0]?.score ?? Number.NEGATIVE_INFINITY;
      const scoreFloor = getScoreFloor(topScore);
      const filteredHits = rankedHits.filter((hit) => hit.score >= scoreFloor);

      const dedupedHits: RankedRecord[] = [];
      const seenPageUrls = new Set<string>();

      for (const hit of filteredHits) {
        const canonicalPageUrl = getCanonicalPageUrl(hit.url);

        if (seenPageUrls.has(canonicalPageUrl)) {
          continue;
        }

        seenPageUrls.add(canonicalPageUrl);
        dedupedHits.push(hit);

        if (dedupedHits.length >= limit) {
          break;
        }
      }

      return {
        resultCount: dedupedHits.length,
        results: dedupedHits.map((hit) => {
          const record = recordById.get(hit.id);
          const rankBucket = classifyRankingBucket(normalizedQuery, hit);

          return normalizeDocsSearchResult({
            title: record?.title,
            url: record?.url,
            kind: record?.kind,
            section: record?.section,
            snippet: hit.snippet,
            docId: hit.docId,
            anchor: hit.anchor,
            score: hit.score,
            rankBucket,
          });
        }),
      };
    },
    readDoc: (input: ReadDocInput) => {
      const requested = buildRequestedPayload(input);

      if (available === false) {
        return {
          found: false,
          requested,
          sections: [],
          message: meta.message ?? 'Docs retrieval is unavailable.',
        };
      }

      const normalizedDocId =
        input.docId === undefined ? undefined : normalizeDocId(input.docId);
      const normalizedUrl =
        input.url === undefined ? null : normalizeDocUrl(input.url);
      const decodedCursor =
        input.cursor === undefined ? null : decodeCursor(input.cursor);

      let pageRecord: InternalCatalogRecord | undefined;

      if (normalizedDocId !== undefined) {
        pageRecord = pageRecordByDocId.get(normalizedDocId);
      }

      if (pageRecord === undefined && normalizedUrl !== null) {
        pageRecord = pageRecordByUrl.get(normalizedUrl);
      }

      if (pageRecord === undefined && decodedCursor !== null) {
        pageRecord = pageRecordByDocId.get(normalizeDocId(decodedCursor.docId));
      }

      if (
        pageRecord === undefined &&
        input.cursor !== undefined &&
        decodedCursor === null
      ) {
        return {
          found: false,
          requested,
          sections: [],
          message: 'Requested cursor was invalid.',
        };
      }

      if (pageRecord === undefined) {
        return {
          found: false,
          requested,
          sections: [],
          message: 'Requested doc was not found in the docs catalog.',
        };
      }

      const detail = input.detail ?? 'full';
      const allSections = toDocSections(pageRecord);
      const maxSections = Math.max(1, input.maxSections);
      let startIndex = 0;
      let firstSectionOffset = 0;
      let message: string | undefined;

      if (input.cursor !== undefined) {
        if (decodedCursor === null) {
          message = 'Requested cursor was invalid; returned top sections.';
        } else if (decodedCursor.docId !== pageRecord.docId) {
          message =
            'Requested cursor did not match this doc; returned top sections.';
        } else {
          const cursorSectionIndex = allSections.findIndex(
            (sectionValue) => sectionValue.anchor === decodedCursor.anchor
          );

          if (cursorSectionIndex < 0) {
            message =
              'Requested cursor section was not found; returned top sections.';
          } else {
            startIndex = cursorSectionIndex;
            firstSectionOffset = decodedCursor.offset;
          }
        }
      } else if (input.anchor !== undefined) {
        const normalizedAnchor = normalizeAnchorInput(input.anchor);
        const anchorStartIndex = allSections.findIndex(
          (section) => section.anchor === normalizedAnchor
        );

        if (anchorStartIndex >= 0) {
          startIndex = anchorStartIndex;
        } else {
          message = `Requested anchor "${input.anchor}" was not found; returned top sections.`;
        }
      }

      const sections: DocsReadSection[] = [];
      let nextCursor: string | undefined;

      for (
        let index = startIndex;
        index < allSections.length && sections.length < maxSections;
        index += 1
      ) {
        const sectionValue = allSections[index];

        if (sectionValue === undefined) {
          continue;
        }

        const sectionResult = toSectionExcerpt(
          sectionValue,
          detail,
          index === startIndex ? firstSectionOffset : 0,
          input.maxChars,
          pageRecord.docId
        );

        sections.push(sectionResult);

        if (sectionResult.nextCursor !== undefined) {
          nextCursor = sectionResult.nextCursor;

          break;
        }
      }

      if (
        nextCursor === undefined &&
        sections.length > 0 &&
        startIndex + sections.length < allSections.length
      ) {
        const nextSection = allSections[startIndex + sections.length];

        if (nextSection !== undefined) {
          nextCursor = encodeCursor({
            docId: pageRecord.docId,
            anchor: nextSection.anchor,
            offset: 0,
          });
        }
      }

      return {
        found: true,
        requested,
        doc: {
          docId: pageRecord.docId,
          url: pageRecord.url,
          title: pageRecord.title,
          section: pageRecord.section,
        },
        sections,
        ...(nextCursor === undefined ? {} : { nextCursor }),
        ...(message === undefined ? {} : { message }),
      };
    },
  };
};
