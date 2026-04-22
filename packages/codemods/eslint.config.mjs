import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import n from 'eslint-plugin-n';
import prettier from 'eslint-plugin-prettier';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const compat = new FlatCompat({
  baseDirectory: __dirname,
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
      n,
    },

    extends: compat.extends(
      'eslint:recommended',
      'plugin:prettier/recommended',
      'plugin:n/recommended'
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
  {
    files: ['eslint.config.mjs'],
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
    },
    rules: {
      'n/no-unpublished-import': 'off',
    },
  },
  globalIgnores(['!**/.*', '**/__testfixtures__']),
]);
