'use strict';

module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    // 'stylelint-prettier/recommended',
    // 'stylelint-config-prettier-scss',
  ],
  rules: {
    // =============================
    // PRETTIER OVERRIDES:
    // =============================
    // 'indentation': null, // to test with prettier
    // "indentation": 2,
    // "string-quotes": "double",

    // =============================
    // TO FIX:
    // =============================
    // =============================
    // TO DISCUSS:
    // =============================

    // no strong opinions, probably OK to conform to suggested format
    // see: https://stylelint.io/user-guide/rules/list/alpha-value-notation/
    'alpha-value-notation': null,

    // not sure what to do with this rule, seems the default is "never" with some exceptions
    // probably I would keep the default provided by 'stylelint-config-standard-scss'
    // see: https://stylelint.io/user-guide/rules/list/at-rule-empty-line-before/
    // 'at-rule-empty-line-before': null,

    // preference for 'legacy'
    // see: https://stylelint.io/user-guide/rules/list/color-function-notation/
    'color-function-notation': null,

    // would disable this rule, impacts a "grid-template-areas" definition, not sure why
    // see: https://stylelint.io/user-guide/rules/list/declaration-block-no-redundant-longhand-properties/
    'declaration-block-no-redundant-longhand-properties': null,

    // what option here? 'never-single-line' or 'never'?
    // see: https://stylelint.io/user-guide/rules/list/function-parentheses-space-inside/
    'function-parentheses-space-inside': 'never-single-line',

    // I propose to use "2" here (in some cases is useful to add extra visual space between blocks to better separate/group content)
    // see: https://stylelint.io/user-guide/rules/list/max-empty-lines/
    // 'max-empty-lines': null,
    'max-empty-lines': 2,

    // see: https://stylelint.io/user-guide/rules/list/max-line-length/
    // TODO: I can't get the regex to work, I'll get back to this later
    // 'max-line-length': [200, { ignore: ['non-comments'], ignore: ['comments'], ignorePattern: ["/.*; //.*/"] }],
    'max-line-length': null,

    // no strong opinions, probably OK to conform to suggested format
    // see: https://stylelint.io/user-guide/rules/list/number-leading-zero/
    'number-leading-zero': null,

    // no strong opinions, probably would keep what we have now (no big impact)
    // see: https://stylelint.io/user-guide/rules/list/number-max-precision/
    'number-max-precision': 5,

    // I would prefer to be explicit when a mixin is called
    // see: https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-mixin-argumentless-call-parentheses/README.md
    'scss/at-mixin-argumentless-call-parentheses': 'always',

    // no strong opinions, probably OK to conform to suggested format
    // see: https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-rule-conditional-no-parentheses/README.md
    'scss/at-rule-conditional-no-parentheses': null,

    // not sure why we would want this rule active as is by default, probably needs some tweaking (so my suggestion is to simply disable it)
    // see: https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/double-slash-comment-empty-line-before/README.md
    'scss/double-slash-comment-empty-line-before': null,

    // while in theory this is a good idea, probably I would turn off this rule because it's buggy and triggers an error for us that doesn't make sense
    // see: https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/operator-no-unspaced/README.md
    // (many issues https://github.com/stylelint-scss/stylelint-scss/issues?q=is%3Aissue+is%3Aopen+%22operator-no-unspaced%22)
    'scss/operator-no-unspaced': null,

    // probably a good idea, but we have the make sure this will not impact consumers (may be using old versions of Sass?)
    // see: https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/no-global-function-names/README.md
    'scss/no-global-function-names': null,

    // using the default one doesn't work for us (we're using BEM)
    // found this pattern here: https://github.com/humanmade/coding-standards/pull/199
    // see: https://stylelint.io/user-guide/rules/list/selector-class-pattern/
    'selector-class-pattern': [
      '^(?<block>(?:[a-z][a-z0-9]*)(?:-[a-z0-9]+)*)(?<element>(?:__[a-z][a-z0-9]*(?:-[a-z0-9]+)*))?(?<modifier>(?:--[a-z][a-z0-9]*)(?:-[a-z0-9]+)*)?$',
      { resolveNestedSelectors: true },
    ],
    // potentially we could even use this one (I tried to use https://github.com/SunHuawei/stylelint-force-app-name-prefix/ but didn't work...)
    // 'selector-class-pattern': [
    //   '^hds-(?<block>(?:[a-z][a-z0-9]*)(?:-[a-z0-9]+)*)(?<element>(?:__[a-z][a-z0-9]*(?:-[a-z0-9]+)*))?(?<modifier>(?:--[a-z][a-z0-9]*)(?:-[a-z0-9]+)*)?$|^mock-(?:[a-z][a-z0-9]*)$',
    //   { resolveNestedSelectors: true },
    // ],

    // the 'always-multi-line' option works for me
    // see: https://stylelint.io/user-guide/rules/list/selector-list-comma-newline-after/
    'selector-list-comma-newline-after': 'always-multi-line',

    // strong-ish option here to disable this check: I prefer being explicit vs implicit (but if there are stronger opinions, I can live with it)
    // see: https://stylelint.io/user-guide/rules/list/shorthand-property-no-redundant-values/
    'shorthand-property-no-redundant-values': null,

    // I would stick to the one we're using ("double") which is also the "standar" one (https://github.com/stylelint/stylelint-config-standard/blob/c12b8cb2b9a57e8dbd2696dd7ac2f78e72b829a4/index.js#L162)
    // see: https://stylelint.io/user-guide/rules/list/string-quotes/
    // 'string-quotes': 'double',
    'string-quotes': null,

    // since there's an issue with "currentColor" (https://github.com/stylelint/stylelint/issues/5863) I propose to simply ignore it
    // see: https://stylelint.io/user-guide/rules/list/value-keyword-case/
    'value-keyword-case': ['lower', { ignoreKeywords: ['currentColor'] }],

    // =============================
    // CONTROVERSIAL/HARD-TO-DECIDE:
    // =============================

    'block-closing-brace-empty-line-before': null,
    'block-opening-brace-newline-after': null,
    'block-opening-brace-space-before': null,
    'declaration-block-semicolon-newline-after': null,
    'declaration-empty-line-before': null,
    'no-descending-specificity': null,
    'no-duplicate-selectors': null, // 'no-duplicate-selectors': [true, { disallowInList: false }],
    'rule-empty-line-before': null,
    'scss/comment-no-empty': null,
  },
};
