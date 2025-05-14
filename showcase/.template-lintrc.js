'use strict';

module.exports = {
  plugins: ['ember-template-lint-plugin-prettier'],
  extends: ['recommended', 'ember-template-lint-plugin-prettier:recommended'],
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
  ignore: ['blueprints/**', 'tests/**'],
  overrides: [
    // temporary fix until the prettier plugin works with `.gts/gjs` files
    // https://github.com/ember-template-lint/ember-template-lint-plugin-prettier/issues/268
    {
      files: ['**/*.{gjs,gts}'],
      rules: {
        prettier: false,
      },
    },
  ],
};
