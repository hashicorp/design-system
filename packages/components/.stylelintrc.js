'use strict';

module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-prettier/recommended',
    'stylelint-config-prettier-scss',
  ],
  rules: {
    'number-max-precision': null,
    'prettier/prettier': true,
    'scss/comment-no-empty': null,
    'scss/no-global-function-names': null,
    'scss/at-import-no-partial-leading-underscore': null,
    'scss/at-mixin-pattern': null,
    'selector-class-pattern': null,
  },
};
