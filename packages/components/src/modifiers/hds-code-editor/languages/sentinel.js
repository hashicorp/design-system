function wordRegexp(words) {
  return new RegExp('^((' + words.join(')|(') + '))\\b');
}

// Sentinel logical operators
const wordOperators = wordRegexp(['and', 'or', 'not']);

// Common Sentinel keywords
// Adjust/add as needed based on Sentinel features
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

// Common Sentinel built-ins / constants
// You can expand this list for Sentinel standard libraries/functions
const sentinelBuiltins = ['true', 'false', 'null'];

const keywords = wordRegexp(sentinelKeywords);
const builtins = wordRegexp(sentinelBuiltins);

export function mkSentinel(parserConf) {
  const ERRORCLASS = 'error';

  // Delimiters, operators, etc.
  // Sentinel uses braces `{}` for blocks; also parentheses `()`, brackets `[]`.
  const delimiters = parserConf.delimiters || /^[\(\)\[\]\{\},:;=\.]/;
  const operators = [
    parserConf.operators || /^(\+|\-|\*|\/|%|<=|>=|<|>|==|!=|!|&&|\|\|)/,
  ];

  // Sentinel typically does not rely on indentation for scope;
  // but we can keep a simplified bracket-based scope tracking for highlighting.
  // (This is optional — you can remove bracket scope logic if not needed.)
  function pushScope(state, type) {
    state.scopes.push(type);
  }
  function popScope(state) {
    return state.scopes.pop();
  }
  function topScope(state) {
    return state.scopes[state.scopes.length - 1];
  }

  // Sentinel comment tokens:
  //   Single-line: //
  //   Multi-line: /* ... */
  // We’ll handle both in `tokenBaseInner`.
  // No triple-quoted strings, no raw prefixes, etc.

  // Tokenizer
  function tokenBase(stream, state) {
    return tokenBaseInner(stream, state);
  }

  function tokenBaseInner(stream, state) {
    // Eat whitespace
    if (stream.eatSpace()) return null;

    // Single-line comment `//`
    if (stream.match('//')) {
      stream.skipToEnd();
      return 'comment';
    }
    // Multi-line comment `/* ... */`
    if (stream.match('/*')) {
      state.tokenize = tokenComment;
      return state.tokenize(stream, state);
    }

    // String handling: single or double quotes
    if (stream.match(/"/) || stream.match(/'/)) {
      // We’ve just consumed either " or '
      const quote = stream.current();
      state.tokenize = tokenString(quote);
      return state.tokenize(stream, state);
    }

    // Number literal
    // Simple handling: integers or floats
    if (stream.match(/^[0-9]+(\.[0-9]+)?/)) {
      return 'number';
    }

    // Operators
    for (let i = 0; i < operators.length; i++) {
      if (stream.match(operators[i])) return 'operator';
    }

    // Delimiters / punctuation
    if (stream.match(delimiters)) {
      const cur = stream.current();
      if (cur === '{' || cur === '[' || cur === '(') {
        pushScope(state, cur);
      } else if (cur === '}' || cur === ']' || cur === ')') {
        const top = topScope(state);
        // Quick check to match bracket types. If mismatch -> error style
        if (
          (cur === '}' && top === '{') ||
          (cur === ']' && top === '[') ||
          (cur === ')' && top === '(')
        ) {
          popScope(state);
        } else {
          return ERRORCLASS;
        }
      }
      return 'punctuation';
    }

    // Check for keywords, operators, builtins
    if (stream.match(keywords) || stream.match(wordOperators)) {
      return 'keyword';
    }
    if (stream.match(builtins)) {
      return 'builtin';
    }

    // Identifiers (variables, function names, etc.)
    if (stream.match(/^[_A-Za-z][_A-Za-z0-9]*/)) {
      return 'variable';
    }

    // If nothing matched, consume one character and mark it as error
    stream.next();
    return ERRORCLASS;
  }

  // Multi-line comment tokenizer
  function tokenComment(stream, state) {
    while (!stream.eol()) {
      if (stream.match('*/')) {
        state.tokenize = tokenBase;
        break;
      }
      stream.next();
    }
    return 'comment';
  }

  // Simple string tokenizer factory
  // Sentinel has straightforward strings: "abc" or 'abc'
  function tokenString(quote) {
    return function (stream, state) {
      let escaped = false,
        ch;
      while ((ch = stream.next()) != null) {
        if (ch === quote && !escaped) {
          // End of string
          state.tokenize = tokenBase;
          break;
        }
        escaped = !escaped && ch === '\\';
      }
      return 'string';
    };
  }

  // CodeMirror-compatible API
  return {
    name: 'sentinel',

    startState: function () {
      return {
        tokenize: tokenBase,
        scopes: [],
      };
    },

    token: function (stream, state) {
      const style = state.tokenize(stream, state);
      return style;
    },

    // Optional: bracket-based indentation
    // Sentinel doesn’t rely on indentation, but we can do a simple bracket match.
    indent: function (state, textAfter, cx) {
      // If you want no auto-indentation, return CodeMirror.Pass or just 0.
      // A very simple approach: each open brace adds one indent unit, each close brace subtracts one.
      let openScopes = state.scopes.length;
      // If the upcoming text starts with a closing brace, reduce indent
      if (/^\s*[\}\]\)]/.test(textAfter)) {
        openScopes = Math.max(0, openScopes - 1);
      }
      return openScopes * (cx ? cx.unit : 2);
    },

    // Sentinel line comment is //
    // We'll also treat # as comment if you want to mimic Terraform/HCL style, but by default it's just //
    languageData: {
      commentTokens: { line: '//', block: { open: '/*', close: '*/' } },
      closeBrackets: { brackets: ['(', '[', '{', '"', "'"] },
    },
  };
}

// Create a default export for Sentinel mode
export const sentinel = mkSentinel({});
