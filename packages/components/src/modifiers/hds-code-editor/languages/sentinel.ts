import type { StringStream } from '@codemirror/language';

type Quote = '"' | "'";

interface ParserConfig {
  delimiters?: RegExp;
  operators?: RegExp;
}

interface SentinelState {
  tokenize: (stream: StringStream, state: SentinelState) => string | null;
}

function wordRegexp(words: string[]): RegExp {
  return new RegExp('^((' + words.join(')|(') + '))\\b');
}

// logical operators
const wordOperators = wordRegexp(['and', 'or', 'not']);

// keywords
const sentinelKeywords = [
  'import',
  'main',
  'rule',
  'precondition',
  'if',
  'else',
  'for',
  'while',
  'break',
  'continue',
  'return',
  'in',
  'each',
];

// built-ins / constants
const sentinelBuiltins = ['true', 'false', 'null'];

const keywords = wordRegexp(sentinelKeywords);
const builtins = wordRegexp(sentinelBuiltins);

export function mkSentinel(parserConf: ParserConfig) {
  const ERRORCLASS = 'error';

  // delimiters, operators, etc.
  const delimiters = parserConf['delimiters'] ?? /^[()[\]{},:;=.]/;
  const operators = [
    parserConf['operators'] ?? /^(\+|-|\*|\/|%|<=|>=|<|>|==|!=|!|&&|\|\|)/,
  ];

  // tokenizer
  function tokenBase(stream: StringStream, state: SentinelState) {
    return tokenBaseInner(stream, state);
  }

  function tokenBaseInner(stream: StringStream, state: SentinelState) {
    if (stream.eatSpace()) {
      return null;
    }

    // comments
    // single-line `//`
    if (stream.match('//')) {
      stream.skipToEnd();
      return 'comment';
    }
    // multi-line `/* ... */`
    if (stream.match('/*')) {
      state.tokenize = tokenComment;
      return state.tokenize(stream, state);
    }

    // strings
    if (stream.match(/"/) || stream.match(/'/)) {
      // We’ve just consumed either " or '
      const quote = stream.current();
      state.tokenize = tokenString(quote as Quote);
      return state.tokenize(stream, state);
    }

    // numbers
    if (stream.match(/^[0-9]+(\.[0-9]+)?/)) {
      return 'number';
    }

    // operators
    for (let i = 0; i < operators.length; i++) {
      if (stream.match(operators[i]!)) {
        return 'operator';
      }
    }

    // delimiters/punctuation
    if (stream.match(delimiters)) {
      return 'punctuation';
    }

    //keywords, operators, builtins
    if (stream.match(keywords) || stream.match(wordOperators)) {
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

  // multi-line comment tokenizer
  function tokenComment(stream: StringStream, state: SentinelState) {
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
  function tokenString(quote: Quote) {
    return function (stream: StringStream, state: SentinelState) {
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
    name: 'sentinel',

    startState: function () {
      return {
        tokenize: tokenBase,
      };
    },

    token: function (stream: StringStream, state: SentinelState) {
      return state.tokenize(stream, state);
    },

    languageData: {
      commentTokens: { line: '//', block: { open: '/*', close: '*/' } },
      closeBrackets: { brackets: ['(', '[', '{', '"', "'"] },
    },
  };
}

export const sentinel = mkSentinel({});