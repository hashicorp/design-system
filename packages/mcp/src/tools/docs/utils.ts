/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { MAX_FILTER_LENGTH } from "./constants.js";
import { getHeadingPath } from "../../stores/docs/lookup.js";

import type {
  DocsChunkRecord,
  DocsPageRecord,
} from "../../stores/docs/lookup.js";
import type { DocsSearchHit } from "../../stores/docs/index.js";

export interface SerializableSearchResult {
  id: string;
  score: number;
  relScore: number;
  title: string;
  pageDescription?: string;
  route: string;
  docsPath: string;
  section: string;
  tab?: string;
  headingPath: string[];
  url: string;
  pageAnchored: boolean;
  pageMatchedTerms: string[];
  snippet: string;
}

export interface TruncatedText {
  value: string;
  truncated: boolean;
}

export interface ChunkSelection {
  content: string;
  truncated: boolean;
  includedIds: string[];
  omittedIds: string[];
}

const TRUNCATION_NOTE = "\n\n[truncated: raise maxBytes to read the rest]";
const REPLACEMENT_CHARACTER = "�";
const CHUNK_SEPARATOR = "\n\n";

export const clampFilterValue = (value: string): string => {
  return value.slice(0, MAX_FILTER_LENGTH);
};

export const toSerializableSearchResult = (
  hit: DocsSearchHit,
): SerializableSearchResult => {
  return {
    id: hit.chunk.id,
    score: hit.score,
    relScore: hit.relScore,
    title: hit.page.title,
    ...(hit.page.description === undefined
      ? {}
      : { pageDescription: hit.page.description }),
    route: hit.chunk.route,
    docsPath: hit.chunk.route,
    section: hit.chunk.section,
    ...(hit.chunk.tab === undefined ? {} : { tab: hit.chunk.tab }),
    headingPath: getHeadingPath(hit.chunk),
    url: hit.chunk.url,
    pageAnchored: hit.pageMatchedTerms.length > 0,
    pageMatchedTerms: hit.pageMatchedTerms,
    snippet: hit.snippet,
  };
};

// absent rather than empty when a page carries neither link
export const toSerializablePageLinks = (
  page: DocsPageRecord,
): Record<string, unknown> | undefined => {
  const links = {
    ...(page.links?.github === undefined ? {} : { github: page.links.github }),
    ...(page.links?.figma === undefined ? {} : { figma: page.links.figma }),
  };

  return Object.keys(links).length === 0 ? undefined : links;
};

export const truncateToBytes = (
  value: string,
  maxBytes: number,
): TruncatedText => {
  if (Buffer.byteLength(value, "utf8") <= maxBytes) {
    return { value, truncated: false };
  }

  const noteBytes = Buffer.byteLength(TRUNCATION_NOTE, "utf8");
  const budget = Math.max(maxBytes - noteBytes, 0);
  const decoded = new TextDecoder("utf-8").decode(
    Buffer.from(value, "utf8").subarray(0, budget),
  );

  let truncatedValue = decoded;

  while (truncatedValue.endsWith(REPLACEMENT_CHARACTER)) {
    truncatedValue = truncatedValue.slice(0, -1);
  }

  return {
    value: `${truncatedValue.trimEnd()}${TRUNCATION_NOTE}`,
    truncated: true,
  };
};

export const joinChunkContent = (chunks: DocsChunkRecord[]): string => {
  return chunks.map((chunk) => chunk.content.trim()).join(CHUNK_SEPARATOR);
};

export const selectChunkContent = (
  chunks: DocsChunkRecord[],
  maxBytes: number,
): ChunkSelection => {
  const { value: content, truncated } = truncateToBytes(
    joinChunkContent(chunks),
    maxBytes,
  );

  if (!truncated) {
    return {
      content,
      truncated,
      includedIds: chunks.map((chunk) => chunk.id),
      omittedIds: [],
    };
  }

  // the note is appended verbatim, so what precedes it is exactly the content that survived
  const keptLength = content.length - TRUNCATION_NOTE.length;

  let offset = 0;
  let keptCount = 0;

  for (const chunk of chunks) {
    if (offset >= keptLength) break;

    offset += chunk.content.trim().length + CHUNK_SEPARATOR.length;
    keptCount += 1;
  }

  return {
    content,
    truncated,
    includedIds: chunks.slice(0, keptCount).map((chunk) => chunk.id),
    omittedIds: chunks.slice(keptCount).map((chunk) => chunk.id),
  };
};
