/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// record shapes the store hands out, plus the filter and snippet rules applied to them

import { normalizeLookupValue } from "../../../shared/normalize.js";
import { SNIPPET_MAX_LENGTH } from "../constants.js";
import { tokenize } from "./tokenize.js";

import type {
  DocsChunk,
  DocsPage,
  DocsPageLinks,
  DocsPageStatus,
} from "./schema.js";

export interface DocsPageRecord {
  route: string;
  section: string;
  title: string;
  url: string;
  caption?: string;
  description?: string;
  keywords: string[];
  related: string[];
  links?: DocsPageLinks;
  status?: DocsPageStatus;
}

export interface DocsChunkRecord {
  id: string;
  route: string;
  section: string;
  pageTitle: string;
  pageUrl: string;
  url: string;
  tab?: string;
  headingTrail: string[];
  level?: number;
  content: string;
  text: string;
  symbols: string[];
}

export interface DocsSearchFilters {
  section?: string;
  tab?: string;
  docsPath?: string;
}

// a route with no leading or trailing slash, matching the `docsPath` in the component catalog
export const normalizeRoute = (value: string): string => {
  return normalizeLookupValue(value).replace(/^\/+|\/+$/g, "");
};

export const toPageRecord = (page: DocsPage): DocsPageRecord => {
  return {
    route: page.route,
    section: page.section,
    title: page.title,
    url: page.url,
    ...(page.caption === undefined ? {} : { caption: page.caption }),
    ...(page.description === undefined
      ? {}
      : { description: page.description }),
    keywords: page.keywords ?? [],
    related: page.related ?? [],
    ...(page.links === undefined ? {} : { links: page.links }),
    ...(page.status === undefined ? {} : { status: page.status }),
  };
};

export const toChunkRecord = (
  chunk: DocsChunk,
  page: DocsPage,
): DocsChunkRecord => {
  return {
    id: chunk.id,
    route: page.route,
    section: page.section,
    pageTitle: page.title,
    pageUrl: page.url,
    url: chunk.url,
    ...(chunk.tab === undefined ? {} : { tab: chunk.tab }),
    headingTrail: chunk.headingTrail ?? [],
    ...(chunk.level === undefined ? {} : { level: chunk.level }),
    content: chunk.content,
    text: chunk.text,
    symbols: chunk.symbols ?? [],
  };
};

export const getHeadingPath = (chunk: DocsChunkRecord): string[] => {
  return [
    chunk.pageTitle,
    ...(chunk.tab === undefined ? [] : [chunk.tab]),
    ...chunk.headingTrail,
  ];
};

export const getChunkHeading = (chunk: DocsChunkRecord): string | undefined => {
  return chunk.headingTrail.at(-1);
};

// the words a page is called by: its title, plus the terminal segment of its route
export const getPageNameTerms = (page: DocsPageRecord): Set<string> => {
  const terminalSegment = page.route.split("/").at(-1) ?? page.route;

  return new Set([...tokenize(page.title), ...tokenize(terminalSegment)]);
};

export const getAncestorHeadings = (chunk: DocsChunkRecord): string[] => {
  return chunk.headingTrail.slice(0, -1);
};

export const matchesDocsPath = (route: string, docsPath: string): boolean => {
  return route === docsPath || route.startsWith(`${docsPath}/`);
};

export const matchesFilters = (
  chunk: DocsChunkRecord,
  filters: DocsSearchFilters,
): boolean => {
  if (
    filters.section !== undefined &&
    normalizeLookupValue(chunk.section) !== filters.section
  ) {
    return false;
  }

  if (
    filters.tab !== undefined &&
    (chunk.tab === undefined || normalizeLookupValue(chunk.tab) !== filters.tab)
  ) {
    return false;
  }

  if (
    filters.docsPath !== undefined &&
    !matchesDocsPath(normalizeRoute(chunk.route), filters.docsPath)
  ) {
    return false;
  }

  return true;
};

const SENTENCE_BOUNDARY_PATTERN = /(?<=[.!?])\s+/;
const ELLIPSIS = "…";

const countMatches = (sentence: string, queryTerms: Set<string>): number => {
  let matches = 0;

  for (const term of tokenize(sentence)) {
    if (queryTerms.has(term)) {
      matches += 1;
    }
  }

  return matches;
};

const scoreSentence = (sentence: string, queryTerms: Set<string>): number => {
  const tokenCount = tokenize(sentence).length;

  if (tokenCount === 0) return 0;

  return countMatches(sentence, queryTerms) / Math.sqrt(tokenCount);
};

export const buildSnippet = (
  text: string,
  queryTerms: Set<string>,
  budget: number = SNIPPET_MAX_LENGTH,
): string => {
  const trimmed = text.trim();

  if (trimmed.length <= budget) {
    return trimmed;
  }

  const sentences = trimmed.split(SENTENCE_BOUNDARY_PATTERN);

  if (sentences.length === 1) {
    return `${trimmed.slice(0, budget).trimEnd()}${ELLIPSIS}`;
  }

  const scores = sentences.map((sentence) =>
    scoreSentence(sentence, queryTerms),
  );

  let seedIndex = 0;

  for (const [index, score] of scores.entries()) {
    if (score > scores[seedIndex]) seedIndex = index;
  }

  const seed = sentences[seedIndex];

  if (seed.length > budget) {
    const prefix = seedIndex > 0 ? ELLIPSIS : "";

    return `${prefix}${seed.slice(0, budget - prefix.length).trimEnd()}${ELLIPSIS}`;
  }

  let start = seedIndex;
  let end = seedIndex;
  let length = seed.length;

  while (true) {
    const previous = start > 0 ? start - 1 : null;
    const next = end < sentences.length - 1 ? end + 1 : null;

    if (previous === null && next === null) {
      break;
    }

    const takePrevious =
      next === null || (previous !== null && scores[previous] >= scores[next]);
    const candidate = takePrevious ? previous : next;

    if (candidate === null) {
      break;
    }

    const candidateLength = sentences[candidate].length + 1;

    if (length + candidateLength > budget) {
      break;
    }

    length += candidateLength;

    if (takePrevious) {
      start = candidate;
    } else {
      end = candidate;
    }
  }

  const window = sentences.slice(start, end + 1).join(" ");
  const prefix = start > 0 ? ELLIPSIS : "";
  const suffix = end < sentences.length - 1 ? ELLIPSIS : "";

  return `${prefix}${window}${suffix}`;
};
