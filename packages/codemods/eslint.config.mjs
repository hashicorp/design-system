const { defineConfig, globalIgnores } = require('eslint/config');

const prettier = require('eslint-plugin-prettier');
const node = require('eslint-plugin-node');
const globals = require('globals');
const js = require('@eslint/js');

const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = defineConfig([
  {
    languageOptions: {
      ecmaVersion: 2018,
      parserOptions: {},

      globals: {
        ...globals.node,
      },
    },

    plugins: {
      prettier,
      node,
    },

    extends: compat.extends(
      'eslint:recommended',
      'plugin:prettier/recommended',
      'plugin:node/recommended'
    ),

    rules: {},
  },
  {
    files: ['__tests__/**/*.js'],

    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  globalIgnores(['!**/.*', '**/__testfixtures__']),
]);
