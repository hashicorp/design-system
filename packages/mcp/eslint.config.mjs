/**
 * Copyright HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import ts from 'typescript-eslint';

export default ts.config(
  { ignores: ['dist/', 'node_modules/'] },
  js.configs.recommended,
  {
    rules: {
      curly: ['error', 'all'],
      eqeqeq: ['error', 'always'],
      'no-restricted-syntax': [
        'error',
        {
          selector: 'IfStatement > UnaryExpression[operator="!"]',
          message:
            'Use explicit comparisons in conditionals instead of negation.',
        },
        {
          selector: 'ConditionalExpression > UnaryExpression[operator="!"]',
          message:
            'Use explicit comparisons in conditionals instead of negation.',
        },
        {
          selector: 'WhileStatement > UnaryExpression[operator="!"]',
          message:
            'Use explicit comparisons in conditionals instead of negation.',
        },
        {
          selector: 'DoWhileStatement > UnaryExpression[operator="!"]',
          message:
            'Use explicit comparisons in conditionals instead of negation.',
        },
      ],
    },
  },
  ...ts.configs.recommended,
  prettier
);
