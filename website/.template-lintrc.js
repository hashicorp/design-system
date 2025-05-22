'use strict';

module.exports = {
  extends: 'recommended',
  rules: {
    'no-html-comments': false,
    'no-trailing-spaces': true,
    'no-negated-condition': false,
    'require-mandatory-role-attributes': false,
    'no-at-ember-render-modifiers': false,
    'no-unnecessary-curly-parens': false,
    'no-unnecessary-curly-strings': false,
    'no-redundant-role': false,
    'no-builtin-form-components': false,
  },
  ignore: ['tests/**'],
};
