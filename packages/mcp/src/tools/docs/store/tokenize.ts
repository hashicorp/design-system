/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import dictionary from "./dictionary.json" with { type: "json" };

// the single tokenizer both the index and every query run through

const MIN_TOKEN_LENGTH = 2;

// version strings are the point of the version-history tab, so they survive as whole tokens
const VERSION_PATTERN = /\d+\.\d+(?:\.\d+)?/g;

const NON_ALPHANUMERIC_PATTERN = /[^A-Za-z0-9]+/;
const CAMEL_BOUNDARY_PATTERN = /[a-z0-9][A-Z]/;
const CAMEL_SPLIT_PATTERN = /(?<=[a-z0-9])(?=[A-Z])/;

const STOPWORDS = new Set(dictionary.stopWords);

const NAMESPACE_TOKEN = "hds";
const NAMESPACE_PREFIX_PATTERN = /\bhds(?:::|[-_])(?=[A-Za-z0-9])/gi;

const pushToken = (tokens: string[], candidate: string): void => {
  if (candidate.length < MIN_TOKEN_LENGTH) {
    return;
  } else if (STOPWORDS.has(candidate)) {
    return;
  } else {
    tokens.push(candidate);
  }
};

export const tokenize = (value: string): string[] => {
  const tokens: string[] = [];

  const withoutNamespace = value.replace(NAMESPACE_PREFIX_PATTERN, "");
  const withoutVersions = withoutNamespace.replace(
    VERSION_PATTERN,
    (version) => {
      tokens.push(version);

      return " ";
    },
  );

  for (const rawToken of withoutVersions.split(NON_ALPHANUMERIC_PATTERN)) {
    if (rawToken.length === 0) continue;

    pushToken(tokens, rawToken.toLowerCase());

    if (!CAMEL_BOUNDARY_PATTERN.test(rawToken)) {
      continue;
    }

    const parts = rawToken.split(CAMEL_SPLIT_PATTERN);

    for (const [index, part] of parts.entries()) {
      if (index === 0 && part.toLowerCase() === NAMESPACE_TOKEN) {
        continue;
      }

      pushToken(tokens, part.toLowerCase());
    }
  }

  return tokens;
};

export const tokenizeQuery = (value: string): string[] => {
  return [...new Set(tokenize(value))];
};
