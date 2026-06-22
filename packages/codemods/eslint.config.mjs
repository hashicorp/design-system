/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import js from '@eslint/js';
import n from 'eslint-plugin-n';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';

export default [
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
      ecmaVersion: 'latest',
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
    files: ['**/__tests__/**/*.js', 'transforms/**/test.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  prettierConfig,
];
