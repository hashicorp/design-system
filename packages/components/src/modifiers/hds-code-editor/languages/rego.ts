/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { StringStream } from '@codemirror/language';

type Quote = '"' | "'";

interface ParserConfig {
  delimiters?: RegExp;
  operators?: RegExp;
}

interface RegoState {
  tokenize: (stream: StringStream, state: RegoState) => string | null;
}

function wordRegexp(words: string[]): RegExp {
  return new RegExp('^((' + words.join(')|(') + '))\\b');
}

// keywords
const regoKeywords = [
  'package',
  'import',
  'default',
  'with',
  'else',
  'some',
  'not',
  'as',
];

// built-ins / constants
const regoBuiltins = [
  // constants and implicit variables
  'true',
  'false',
  'null',
  'data',
  // general built-ins:
  'all',
  'any',
  'append',
  'base64.decode',
  'base64.encode',
  'base64url.decode',
  'base64url.encode',
  'ceil',
  'concat',
  'concat_array',
  'contains',
  'count',
  'decodejson',
  'encodejson',
  'endswith',
  'flatten',
  'floor',
  'indexof',
  'is_number',
  'is_string',
  'keys',
  'lower',
  'max',
  'merge',
  'min',
  'regex.match',
  'regex.find',
  'regex.split',
  'reverse',
  'round',
  'set',
  'split',
  'sprintf',
  'startswith',
  'substr',
  'sum',
  'trace',
  'type_name',
  'union',
  'upper',
  'uuid',
  // namespaced built-ins:
  'json.marshal',
  'json.unmarshal',
  'http.send',
  'time.now',
  'time.parse_rfc3339',
  'net.cidr_contains',
];

const keywords = wordRegexp(regoKeywords);
const builtins = wordRegexp(regoBuiltins);

export function mkRego(parserConf: ParserConfig = {}) {
  const ERRORCLASS = 'error';

  // delimiters, operators, etc.
  const delimiters = parserConf.delimiters ?? /^[()[\]{},:;.|]/;
  const operators = [
    parserConf.operators ?? /^(?:in|\+|-|\*|\/|%|<=|>=|<|>|==|!=|&&|\|\|)\b/,
  ];

  // tokenizer
  function tokenBase(stream: StringStream, state: RegoState): string | null {
    if (stream.eatSpace()) return null;

    // comments
    // single-line comment starting with #
    if (stream.match('#')) {
      stream.skipToEnd();
      return 'comment';
    }
    // multi-line comment starting with /* ... */
    if (stream.match('/*')) {
      state.tokenize = tokenComment;
      return state.tokenize(stream, state);
    }

    // strings
    // only double-quoted strings are standard
    if (stream.match('"')) {
      state.tokenize = tokenString('"');
      return state.tokenize(stream, state);
    }

    // numbers
    if (stream.match(/^[0-9]+(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?/)) {
      return 'number';
    }

    // operators ---
    for (let i = 0; i < operators.length; i++) {
      if (stream.match(operators[i]!)) {
        return 'operator';
      }
    }

    // delimiters/punctuation
    if (stream.match(delimiters)) {
      return 'punctuation';
    }

    // keywords, operators, builtins
    if (stream.match(keywords)) {
      return 'keyword';
    }
    if (stream.match(builtins)) {
      return 'builtin';
    }

    // identifiers (variables, function names, etc.)
    if (stream.match(/^[_A-Za-z][_A-Za-z0-9]*/)) {
      return 'variable';
    }

    // if nothing matched, consume one character and mark it as error
    stream.next();

    return ERRORCLASS;
  }

  /**
   * Tokenizer for multi-line (block) comments.
   */
  function tokenComment(stream: StringStream, state: RegoState): string {
    while (!stream.eol()) {
      if (stream.match('*/')) {
        state.tokenize = tokenBase;
        break;
      }
      stream.next();
    }
    return 'comment';
  }

  // string tokenizer factory
  function tokenString(
    quote: Quote
  ): (stream: StringStream, state: RegoState) => string {
    return function (stream: StringStream, state: RegoState): string {
      let escaped = false;
      let ch = null;

      while ((ch = stream.next()) != null) {
        if (ch === quote && !escaped) {
          // end of string
          state.tokenize = tokenBase;
          break;
        }
        escaped = !escaped && ch === '\\';
      }

      return 'string';
    };
  }

  // CodeMirror API
  return {
    name: 'rego',

    startState: function (): RegoState {
      return { tokenize: tokenBase };
    },

    token: function (stream: StringStream, state: RegoState): string | null {
      return state.tokenize(stream, state);
    },

    languageData: {
      commentTokens: { line: '#', block: { open: '/*', close: '*/' } },
      closeBrackets: { brackets: ['(', '[', '{', '"', "'"] },
    },
  };
}

export const rego = mkRego();
