/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['node_modules/', 'dist/'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['scripts/**/*.ts'],
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
  {
    files: ['scripts/**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  }
);
