const js = require('@eslint/js');
const n = require('eslint-plugin-n');
const prettierConfig = require('eslint-config-prettier');
const prettierPlugin = require('eslint-plugin-prettier');
const globals = require('globals');

module.exports = [
  {
    ignores: ['node_modules/', '__testfixtures__/', '!**/.*'],
  },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    plugins: {
      n,
      prettier: prettierPlugin,
    },
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: 'script',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      ...n.configs.recommended.rules,
      'prettier/prettier': 'error',
      'n/no-unpublished-require': 'off',
    },
  },
  {
    files: ['transforms/**/test.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  prettierConfig,
];
