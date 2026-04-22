import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
      ecmaVersion: 12,
      sourceType: 'module',
      parserOptions: {},
    },

    extends: compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
    ),

    plugins: {
      '@typescript-eslint': typescriptEslint,
    },

    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
]);
