import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import node from 'eslint-plugin-node';
import prettier from 'eslint-plugin-prettier';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
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
