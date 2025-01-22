function wordRegexp(words) {
  return new RegExp('^((' + words.join(')|(') + '))\\b');
}

// logical operators
const wordOperators = wordRegexp(['and', 'contains', 'else', 'in', 'is', 'matches', 'not', 'or', 'xor']);

// keywords
const sentinelKeywords = ['all', 'any', 'as', 'break', 'case', 'continue', 'default', 'else', 'empty', 'filter', 'for', 'func', 'if', 'import', 'map', 'param', 'return', 'rule', 'when'];

// built-ins / constants
const sentinelBuiltins = ['true', 'false', 'null', 'undefined', 'length', 'append', 'delete', 'keys', 'values', 'range', 'print', 'int', 'float', 'string', 'bool'];
const keywords = wordRegexp(sentinelKeywords);
const builtins = wordRegexp(sentinelBuiltins);
function mkSentinel(parserConf) {
  const ERRORCLASS = 'error';

  // delimiters, operators, etc.
  const delimiters = parserConf.delimiters ?? /^[()[\]{},:;=.]/;
  const operators = [parserConf.operators ?? /^(\+|-|\*|\/|%|<=|>=|<|>|==|!=|!|&&|\|\|)/];

  // tokenizer
  function tokenBase(stream, state) {
    return tokenBaseInner(stream, state);
  }
  function tokenBaseInner(stream, state) {
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
      state.tokenize = tokenString(quote);
      return state.tokenize(stream, state);
    }

    // numbers
    if (stream.match(/^[0-9]+(\.[0-9]+)?/)) {
      return 'number';
    }

    // operators
    for (let i = 0; i < operators.length; i++) {
      if (stream.match(operators[i])) {
        return 'operator';
      }
    }

    // delimiters/punctuation
    if (stream.match(delimiters)) {
      return 'punctuation';
    }

    // keywords, operators, builtins
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

  // string tokenizer factory
  function tokenString(quote) {
    return function (stream, state) {
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
        tokenize: tokenBase
      };
    },
    token: function (stream, state) {
      return state.tokenize(stream, state);
    },
    languageData: {
      commentTokens: {
        line: '//',
        block: {
          open: '/*',
          close: '*/'
        }
      },
      closeBrackets: {
        brackets: ['(', '[', '{', '"', "'"]
      }
    }
  };
}
const sentinel = mkSentinel({});

export { mkSentinel, sentinel };
//# sourceMappingURL=sentinel.js.map
