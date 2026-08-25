/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// a local BM25 index; scoring never leaves this process
// https://lucene.apache.org/core/9_12_3/core/org/apache/lucene/search/similarities/BM25Similarity.html

import { BM25_B, BM25_K1 } from "../constants.js";
import { tokenize } from "./tokenize.js";

export interface WeightedField {
  value: string | string[] | undefined;
  weight: number;
}

interface Posting {
  documentIndex: number;
  frequency: number;
}

export interface Bm25Index {
  documentCount: number;
  averageLength: number;
  documentLengths: Float64Array;
  postings: Map<string, Posting[]>;
}

export interface Bm25Scores {
  scores: Float64Array;
  matchedTermsByDocument: Map<number, Set<string>>;
}

const toFieldText = (value: string | string[] | undefined): string => {
  if (value === undefined) {
    return "";
  } else {
    return Array.isArray(value) ? value.join(" ") : value;
  }
};

export const buildBm25Index = (documents: WeightedField[][]): Bm25Index => {
  const documentLengths = new Float64Array(documents.length);
  const postings = new Map<string, Posting[]>();

  let totalLength = 0;

  for (const [documentIndex, fields] of documents.entries()) {
    const termFrequencies = new Map<string, number>();

    let documentLength = 0;

    for (const field of fields) {
      if (field.weight <= 0) {
        continue;
      }

      for (const term of tokenize(toFieldText(field.value))) {
        termFrequencies.set(
          term,
          (termFrequencies.get(term) ?? 0) + field.weight,
        );

        documentLength += field.weight;
      }
    }

    documentLengths[documentIndex] = documentLength;
    totalLength += documentLength;

    for (const [term, frequency] of termFrequencies) {
      const termPostings = postings.get(term);

      if (termPostings === undefined) {
        postings.set(term, [{ documentIndex, frequency }]);
      } else {
        termPostings.push({ documentIndex, frequency });
      }
    }
  }

  return {
    documentCount: documents.length,
    averageLength: documents.length === 0 ? 0 : totalLength / documents.length,
    documentLengths,
    postings,
  };
};

// inverse document frequency, the one measure of how much a term narrows the corpus down
const getIdf = (documentCount: number, documentFrequency: number): number => {
  return Math.log(
    1 + (documentCount - documentFrequency + 0.5) / (documentFrequency + 0.5),
  );
};

export const scoreBm25 = (
  index: Bm25Index,
  queryTerms: string[],
): Bm25Scores => {
  const scores = new Float64Array(index.documentCount);
  const matchedTermsByDocument = new Map<number, Set<string>>();

  if (index.documentCount === 0 || index.averageLength === 0) {
    return { scores, matchedTermsByDocument };
  }

  for (const term of queryTerms) {
    const termPostings = index.postings.get(term);

    if (termPostings === undefined) {
      continue;
    }

    const idf = getIdf(index.documentCount, termPostings.length);

    for (const { documentIndex, frequency } of termPostings) {
      const normalizedLength =
        index.documentLengths[documentIndex] / index.averageLength;
      const denominator =
        frequency + BM25_K1 * (1 - BM25_B + BM25_B * normalizedLength);

      scores[documentIndex] +=
        (idf * (frequency * (BM25_K1 + 1))) / denominator;

      const matched = matchedTermsByDocument.get(documentIndex);

      if (matched === undefined) {
        matchedTermsByDocument.set(documentIndex, new Set([term]));
      } else {
        matched.add(term);
      }
    }
  }

  return { scores, matchedTermsByDocument };
};

export const hasTerm = (index: Bm25Index, term: string): boolean => {
  return index.postings.has(term);
};

// how completely a query and a name are the same set of words, as a Jaccard ratio
// https://www.ibm.com/think/topics/jaccard-similarity
export const getNameMatchRatio = (
  queryTerms: Set<string>,
  nameTerms: Set<string>,
): number => {
  if (queryTerms.size === 0 || nameTerms.size === 0) {
    return 0;
  }

  let shared = 0;

  for (const term of nameTerms) {
    if (queryTerms.has(term)) shared += 1;
  }

  if (shared === 0) {
    return 0;
  }

  return shared / (queryTerms.size + nameTerms.size - shared);
};
