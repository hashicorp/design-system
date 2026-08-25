/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { memoizeCatalogLoader } from "../../shared/catalog.js";
import { getMcpPackageDirectory } from "../../shared/project-root.js";
import { normalizeLookupValue } from "../../shared/normalize.js";
import {
  CHUNK_FIELD_WEIGHTS,
  CHUNK_SCORE_WEIGHT,
  DOCS_CATALOG_FILE_NAME,
  NOT_FOUND_SUGGESTION_LIMIT,
  MAX_HITS_PER_ROUTE,
  PAGE_FIELD_WEIGHTS,
  PAGE_NAME_MATCH_WEIGHT,
  PAGE_ONLY_CHUNK_LIMIT,
  PAGE_SCORE_WEIGHT,
  VERSION_HISTORY_SCORE_MULTIPLIER,
  VERSION_HISTORY_TAB,
} from "./constants.js";
import {
  buildSnippet,
  getAncestorHeadings,
  getChunkHeading,
  getPageNameTerms,
  matchesDocsPath,
  matchesFilters,
  normalizeRoute,
  toChunkRecord,
  toPageRecord,
} from "./lookup.js";
import { docsCatalogSchema } from "./schema.js";
import {
  buildBm25Index,
  getNameMatchRatio,
  hasTerm,
  scoreBm25,
} from "./search-index.js";
import { tokenize, tokenizeQuery } from "./tokenize.js";

import type {
  DocsChunkRecord,
  DocsPageRecord,
  DocsSearchFilters,
} from "./lookup.js";
import type { DocsCatalog } from "./schema.js";
import type { Bm25Index, WeightedField } from "./search-index.js";

export interface DocsCatalogMeta {
  bundledAt: string;
  siteBaseUrl: string;
  totalPageCount: number;
  totalChunkCount: number;
}

export interface DocsSearchHit {
  chunk: DocsChunkRecord;
  page: DocsPageRecord;
  score: number;
  relScore: number;
  pageMatchedTerms: string[];
  snippet: string;
}

export interface DocsSearchQuery {
  query: string;
  limit: number;
  section?: string;
  tab?: string;
  docsPath?: string;
}

export interface DocsSearchOutcome {
  filters: DocsSearchFilters;
  unknownFilters: string[];
  matchedTerms: string[];
  unmatchedTerms: string[];
  totalMatches: number;
  hits: DocsSearchHit[];
}

export interface DocsCatalogStore {
  getMeta: () => DocsCatalogMeta;
  search: (query: DocsSearchQuery) => DocsSearchOutcome;
  getChunkById: (id: string) => DocsChunkRecord | null;
  getPageByRoute: (route: string) => DocsPageRecord | null;
  getChildChunks: (id: string) => DocsChunkRecord[];
  suggestChunkIds: (id: string) => string[];
  listSections: () => string[];
  listTabs: () => string[];
}

interface QueryAnalysis {
  terms: string[];
  termSet: Set<string>;
  displayByTerm: Map<string, string>;
  matchedTerms: string[];
  unmatchedTerms: string[];
}

interface SearchCandidate {
  chunkIndex: number;
  pageIndex: number;
  score: number;
}

// splits the raw query into the words a caller would recognize
const QUERY_WORD_PATTERN = /[A-Za-z0-9][A-Za-z0-9.:@_-]*/g;

const roundScore = (value: number): number => {
  return Math.round(value * 10_000) / 10_000;
};

const getCommonPrefixLength = (left: string, right: string): number => {
  const limit = Math.min(left.length, right.length);
  let index = 0;

  while (index < limit && left[index] === right[index]) {
    index += 1;
  }

  return index;
};

export const parseDocsCatalog = (value: unknown): DocsCatalog => {
  return docsCatalogSchema.parse(value);
};

// trims the result window so no single page can hold all of it, in score order
const diversifyByPage = (
  candidates: SearchCandidate[],
  limit: number,
): SearchCandidate[] => {
  const kept: SearchCandidate[] = [];
  const overflow: SearchCandidate[] = [];
  const countsByPage = new Map<number, number>();

  for (const candidate of candidates) {
    if (kept.length >= limit) {
      break;
    }

    const seen = countsByPage.get(candidate.pageIndex) ?? 0;

    if (seen >= MAX_HITS_PER_ROUTE) {
      overflow.push(candidate);

      continue;
    }

    countsByPage.set(candidate.pageIndex, seen + 1);

    kept.push(candidate);
  }

  return kept.length >= limit
    ? kept
    : [...kept, ...overflow.slice(0, limit - kept.length)];
};

export const createDocsCatalogStore = (
  catalog: DocsCatalog,
): DocsCatalogStore => {
  const pages: DocsPageRecord[] = [];
  const pageNameTerms: Set<string>[] = [];
  const chunks: DocsChunkRecord[] = [];
  const chunkPageIndexes: number[] = [];
  const pageIndexByRoute = new Map<string, number>();
  const chunkIndexById = new Map<string, number>();
  const sections = new Set<string>();
  const tabs = new Set<string>();

  for (const page of Object.values(catalog.pages)) {
    const pageIndex = pages.length;
    const record = toPageRecord(page);

    pages.push(record);
    pageNameTerms.push(getPageNameTerms(record));
    pageIndexByRoute.set(normalizeRoute(page.route), pageIndex);
    sections.add(page.section);

    for (const chunk of page.chunks) {
      chunkIndexById.set(chunk.id.toLowerCase(), chunks.length);
      chunkPageIndexes.push(pageIndex);
      chunks.push(toChunkRecord(chunk, page));

      if (chunk.tab !== undefined) {
        tabs.add(chunk.tab);
      }
    }
  }

  const normalizedSections = new Set(
    [...sections].map((section) => normalizeLookupValue(section)),
  );
  const normalizedTabs = new Set(
    [...tabs].map((tab) => normalizeLookupValue(tab)),
  );

  let indexes: { page: Bm25Index; chunk: Bm25Index } | null = null;

  const getIndexes = (): { page: Bm25Index; chunk: Bm25Index } => {
    if (indexes !== null) {
      return indexes;
    }

    const pageDocuments: WeightedField[][] = pages.map((page) => [
      { value: page.route, weight: PAGE_FIELD_WEIGHTS.name },
      { value: page.title, weight: PAGE_FIELD_WEIGHTS.title },
      { value: page.keywords, weight: PAGE_FIELD_WEIGHTS.keywords },
      {
        value: [page.description, page.caption].filter(
          (value): value is string => value !== undefined,
        ),
        weight: PAGE_FIELD_WEIGHTS.description,
      },
    ]);

    const chunkDocuments: WeightedField[][] = chunks.map((chunk) => [
      { value: getChunkHeading(chunk), weight: CHUNK_FIELD_WEIGHTS.heading },
      {
        value: getAncestorHeadings(chunk),
        weight: CHUNK_FIELD_WEIGHTS.ancestorHeadings,
      },
      { value: chunk.tab, weight: CHUNK_FIELD_WEIGHTS.tab },
      { value: chunk.text, weight: CHUNK_FIELD_WEIGHTS.body },
      { value: chunk.symbols, weight: CHUNK_FIELD_WEIGHTS.body },
    ]);

    indexes = {
      page: buildBm25Index(pageDocuments),
      chunk: buildBm25Index(chunkDocuments),
    };

    return indexes;
  };

  const analyzeQuery = (
    query: string,
    pageIndex: Bm25Index,
    chunkIndex: Bm25Index,
  ): QueryAnalysis => {
    const displayByTerm = new Map<string, string>();
    const matchedTerms: string[] = [];
    const unmatchedTerms: string[] = [];

    for (const word of query.match(QUERY_WORD_PATTERN) ?? []) {
      const wordTerms = tokenize(word);

      // a word that is entirely stopwords is neither a match nor a miss
      if (wordTerms.length === 0) {
        continue;
      }

      let isMatched = false;

      for (const term of wordTerms) {
        if (!displayByTerm.has(term)) {
          displayByTerm.set(term, word);
        }

        if (hasTerm(pageIndex, term) || hasTerm(chunkIndex, term)) {
          isMatched = true;
        }
      }

      const bucket = isMatched ? matchedTerms : unmatchedTerms;

      if (!bucket.includes(word)) {
        bucket.push(word);
      }
    }

    const terms = tokenizeQuery(query);

    return {
      terms,
      termSet: new Set(terms),
      displayByTerm,
      matchedTerms,
      unmatchedTerms,
    };
  };

  const resolveFilters = (
    query: DocsSearchQuery,
  ): { filters: DocsSearchFilters; unknownFilters: string[] } => {
    const filters: DocsSearchFilters = {};
    const unknownFilters: string[] = [];

    /**
     * A value that normalizes to nothing — `"  "`, or a `docsPath` of `"/"` — is reported and
     * then dropped. Applying it would match no chunk at all, and echoing it back in `filters`
     * would name an empty string as the filter that did the excluding.
     */
    if (query.section !== undefined) {
      const section = normalizeLookupValue(query.section);

      if (section.length > 0) {
        filters.section = section;
      }

      if (section.length === 0 || !normalizedSections.has(section)) {
        unknownFilters.push(`section: ${query.section}`);
      }
    }

    if (query.tab !== undefined) {
      const tab = normalizeLookupValue(query.tab);

      if (tab.length > 0) {
        filters.tab = tab;
      }

      if (tab.length === 0 || !normalizedTabs.has(tab)) {
        unknownFilters.push(`tab: ${query.tab}`);
      }
    }

    if (query.docsPath !== undefined) {
      const docsPath = normalizeRoute(query.docsPath);

      if (docsPath.length > 0) {
        filters.docsPath = docsPath;
      }

      const isKnownRoute =
        docsPath.length > 0 &&
        [...pageIndexByRoute.keys()].some((route) =>
          matchesDocsPath(route, docsPath),
        );

      if (!isKnownRoute) {
        unknownFilters.push(`docsPath: ${query.docsPath}`);
      }
    }

    return { filters, unknownFilters };
  };

  const search = (query: DocsSearchQuery): DocsSearchOutcome => {
    const { page: pageIndex, chunk: chunkIndex } = getIndexes();
    const analysis = analyzeQuery(query.query, pageIndex, chunkIndex);
    const { filters, unknownFilters } = resolveFilters(query);

    const emptyOutcome: DocsSearchOutcome = {
      filters,
      unknownFilters,
      matchedTerms: analysis.matchedTerms,
      unmatchedTerms: analysis.unmatchedTerms,
      totalMatches: 0,
      hits: [],
    };

    if (analysis.terms.length === 0) {
      return emptyOutcome;
    }

    const pageScores = scoreBm25(pageIndex, analysis.terms);
    const chunkScores = scoreBm25(chunkIndex, analysis.terms);
    const nameMatchRatios = pageNameTerms.map((nameTerms) =>
      getNameMatchRatio(analysis.termSet, nameTerms),
    );

    const isVersionHistoryScoped =
      filters.tab === normalizeLookupValue(VERSION_HISTORY_TAB);

    const candidates: SearchCandidate[] = [];
    const pageOnlyCounts = new Map<number, number>();

    for (const [index, chunk] of chunks.entries()) {
      const chunkScore = chunkScores.scores[index];
      const ownerPageIndex = chunkPageIndexes[index];
      const pageScore = pageScores.scores[ownerPageIndex];

      if (chunkScore === 0 && pageScore === 0) {
        continue;
      }

      if (!matchesFilters(chunk, filters)) {
        continue;
      }

      if (chunkScore === 0) {
        const seen = pageOnlyCounts.get(ownerPageIndex) ?? 0;

        if (seen >= PAGE_ONLY_CHUNK_LIMIT) {
          continue;
        }

        pageOnlyCounts.set(ownerPageIndex, seen + 1);
      }

      let score =
        PAGE_SCORE_WEIGHT * pageScore + CHUNK_SCORE_WEIGHT * chunkScore;

      score *= 1 + PAGE_NAME_MATCH_WEIGHT * nameMatchRatios[ownerPageIndex];

      if (chunk.tab === VERSION_HISTORY_TAB && !isVersionHistoryScoped) {
        score *= VERSION_HISTORY_SCORE_MULTIPLIER;
      }

      candidates.push({ chunkIndex: index, pageIndex: ownerPageIndex, score });
    }

    if (candidates.length === 0) {
      return emptyOutcome;
    }

    candidates.sort((left, right) =>
      right.score === left.score
        ? left.chunkIndex - right.chunkIndex
        : right.score - left.score,
    );

    const topScore = candidates[0].score;

    const hits = diversifyByPage(candidates, query.limit).map((candidate) => {
      const chunk = chunks[candidate.chunkIndex];
      const pageMatched =
        pageScores.matchedTermsByDocument.get(candidate.pageIndex) ?? new Set();
      const pageMatchedTerms = [...pageMatched]
        .map((term) => analysis.displayByTerm.get(term) ?? term)
        .filter((term, index, all) => all.indexOf(term) === index);

      return {
        chunk,
        page: pages[candidate.pageIndex],
        score: roundScore(candidate.score),
        relScore: topScore === 0 ? 0 : roundScore(candidate.score / topScore),
        pageMatchedTerms,
        snippet: buildSnippet(chunk.text, analysis.termSet),
      };
    });

    return {
      filters,
      unknownFilters,
      matchedTerms: analysis.matchedTerms,
      unmatchedTerms: analysis.unmatchedTerms,
      totalMatches: candidates.length,
      hits,
    };
  };

  // a chunk id is route-shaped, so it tolerates the same stray casing and slashes a route does
  const getChunkById = (id: string): DocsChunkRecord | null => {
    const index = chunkIndexById.get(normalizeRoute(id));

    return index === undefined ? null : chunks[index];
  };

  const getChildChunks = (id: string): DocsChunkRecord[] => {
    const parent = getChunkById(id);

    if (parent === null) {
      return [];
    }

    // scoped to the parent's own page, so a route that prefixes another cannot claim its chunks
    return chunks.filter(
      (chunk) =>
        chunk.route === parent.route &&
        (chunk.id.startsWith(`${parent.id}/`) ||
          chunk.id.startsWith(`${parent.id}#`)),
    );
  };

  const suggestChunkIds = (id: string): string[] => {
    const requested = normalizeRoute(id);
    const route = requested.split("#")[0];
    const pageIndex = pageIndexByRoute.get(route);

    if (pageIndex !== undefined) {
      return chunks
        .filter((chunk) => chunk.route === pages[pageIndex].route)
        .slice(0, NOT_FOUND_SUGGESTION_LIMIT)
        .map((chunk) => chunk.id);
    }

    return (
      chunks
        .map((chunk) => ({
          id: chunk.id,
          overlap: getCommonPrefixLength(chunk.id.toLowerCase(), requested),
        }))
        .filter((candidate) => candidate.overlap > 0)
        // codepoint order, never locale order: these keys carry `/`, `#` and `-`
        .sort((left, right) => {
          if (right.overlap !== left.overlap) {
            return right.overlap - left.overlap;
          } else {
            return left.id < right.id ? -1 : left.id > right.id ? 1 : 0;
          }
        })
        .slice(0, NOT_FOUND_SUGGESTION_LIMIT)
        .map((candidate) => candidate.id)
    );
  };

  return {
    getMeta: () => ({
      bundledAt: catalog.bundledAt,
      siteBaseUrl: catalog.siteBaseUrl,
      totalPageCount: pages.length,
      totalChunkCount: chunks.length,
    }),
    search,
    getChunkById,
    getPageByRoute: (route: string) => {
      const index = pageIndexByRoute.get(normalizeRoute(route));

      return index === undefined ? null : pages[index];
    },
    getChildChunks,
    suggestChunkIds,
    listSections: () => [...sections].sort(),
    listTabs: () => [...tabs].sort(),
  };
};

const docsCatalogLoader = memoizeCatalogLoader<DocsCatalogStore>(() => {
  const catalogPath = join(getMcpPackageDirectory(), DOCS_CATALOG_FILE_NAME);
  const rawCatalog = readFileSync(catalogPath, "utf8");

  return createDocsCatalogStore(parseDocsCatalog(JSON.parse(rawCatalog)));
});

export const loadDocsCatalog = (): DocsCatalogStore => {
  return docsCatalogLoader.load();
};

export const getOrLoadDocsStore = (): DocsCatalogStore => {
  return docsCatalogLoader.getOrLoad();
};
