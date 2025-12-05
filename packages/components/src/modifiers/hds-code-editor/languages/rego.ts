/**
 * Copyright IBM Corp. 2021, 2025
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
  'as',
  'contains',
  'data',
  'default',
  'else',
  'every',
  'false',
  'if',
  'in',
  'import',
  'input',
  'package',
  'not',
  'null',
  'some',
  'true',
  'with',
];

// built-ins / constants
const regoBuiltins = [
  // numbers
  'abs',
  'ceil',
  'floor',
  'numbers.range',
  'numbers.range_step',
  'rand.intn',
  'round',
  // aggregates
  'count',
  'max',
  'min',
  'product',
  'sort',
  'sum',
  // arrays
  'array.concat',
  'array.reverse',
  'array.slice',
  // sets
  'intersection',
  'union',
  // objects
  'json.filter',
  'json.match_scema',
  'json.patch',
  'json.remove',
  'json.verify_schema',
  'object.filter',
  'object.get',
  'object.keys',
  'object.remove',
  'object.subset',
  'object.union',
  'object.union_n',
  // strings
  'concat',
  'contains',
  'endswith',
  'format_int',
  'indexof_n',
  'lower',
  'replace',
  'split',
  'sprintf',
  'startswith',
  'strings.any_prefix_match',
  'strings.count',
  'strings.render_template',
  'strings.replace_n',
  'strings.reverse',
  'substring',
  'trim',
  'trim_left',
  'trim_prefix',
  'trim_right',
  'trim_space',
  'trim_suffix',
  'upper',
  // regex
  'regex.find_all_string_submatch_n',
  'regex.find_n',
  'regex.globs_match',
  'regex.is_valid',
  'regex.match',
  'regex.replace',
  'regex.split',
  'regex.template_match',
  // glob
  'glob.match',
  'glob.quote_meta',
  // bitwise
  'bits.and',
  'bits.lsh',
  'bits.negate',
  'bits.or',
  'bits.rsh',
  'bits.xor',
  // conversions
  'to_number',
  // units
  'units.parse',
  'units.parse_bytes',
  // types
  'is_array',
  'is_boolean',
  'is_null',
  'is_number',
  'is_object',
  'is_set',
  'is_string',
  'type_name',
  // encoding
  'base64.decode',
  'base64.encode',
  'base64.is_valid',
  'base64url.decode',
  'base64url.encode',
  'base64url.encode_no_pad',
  'hex.decode',
  'hex.encode',
  'json.is_valid',
  'json.marshal',
  'json.marshal_with_options',
  'json.unmarshal',
  'urlquery.decode',
  'urlquery.decode_object',
  'urlquery.encode',
  'urlquery.encode_object',
  'yaml.is_valid',
  'yaml.marshal',
  'yaml.unmarshal',
  // token signing
  'io.jwt.encode_sign',
  'io.jwt.encode_sign_raw',
  // token verification
  'io.jwt.decode',
  'io.jwt.decode_verify',
  'io.jwt.verify_es256',
  'io.jwt.verify_es384',
  'io.jwt.verify_es512',
  'io.jwt.verify_hs256',
  'io.jwt.verify_hs384',
  'io.jwt.verify_hs512',
  'io.jwt.verify_ps384',
  'io.jwt.verify_ps512',
  'io.jwt.verify_rs256',
  'io.jwt.verify_rs384',
  'io.jwt.verify_rs512',
  // time
  'time.add_date',
  'time.clock',
  'time.date',
  'time.diff',
  'time.format',
  'time.now_ns',
  'time.parse_duration_ns',
  'time.parse_ns',
  'time.parse_rfc3339_ns',
  'time.weekday',
  // crypto
  'crypto.hmac.equal',
  'crypto.hmac.md5',
  'crypto.hmac.sha1',
  'crypto.hmac.sha256',
  'crypto.hmac.sha512',
  'crypto.md5',
  'crypto.parse_private_keys',
  'crypto.sha1',
  'crypto.sha256',
  'crypto.x509.parse_and_verify_certificates',
  'crypto.x509.parse_and_verify_certificates_with_options',
  'crypto.x509.parse_certificates',
  'crypto.x509.parse_keypair',
  'crypto.x509.parse_rsa_private_key',
  // graphs
  'graph.reachable',
  'graph.reachable_paths',
  'walk',
  // graphql
  'graphql.is_valid',
  'graphql.parse',
  'graphql.parse_and_verify',
  'graphql.parse_query',
  'graphql.parse_schema',
  'graphql.parse_schema_is_valid',
  // http
  'http.send',
  // aws
  'providers.aws.sign_req',
  // net
  'net.cidr_contains',
  'net.cidr_contains_matches',
  'net.cidr_expand',
  'net.cidr_intersects',
  'net.cidr_is_valid',
  'net.cidr_merge',
  'net.lookup_ip_addr',
  // uuid
  'uuid.parse',
  'uuid.rfc4122',
  // semantic versions
  'semver.compare',
  'semver.is_valid',
  // rego
  'rego.metadata.chain',
  'rego.metadata.rule',
  'rego.metadata.parse_module',
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
