/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { Text } from '@codemirror/state';
import {
  findNextToken,
  determineErrorMessage,
  renderErrorMessage,
  HdsCodeEditorJsonLintingError,
} from '@hashicorp/design-system-components/modifiers/hds-code-editor/linters/json-linter';

module('Unit | Modifier | hds-code-editor/linters/json-linter', function () {
  test('findNextToken returns the next non-whitespace token', function (assert) {
    const doc = Text.of(['  {']);

    assert.strictEqual(
      findNextToken(doc, 0, 1),
      '{',
      'Finds the next token correctly',
    );
    assert.strictEqual(
      findNextToken(doc, 2, 1),
      '{',
      'Skips whitespace and finds next token',
    );
    assert.strictEqual(
      findNextToken(doc, 3, 1),
      '',
      'Returns empty string when out of bounds',
    );
  });

  test('determineErrorMessage returns correct error messages', function (assert) {
    assert.strictEqual(
      determineErrorMessage({
        previousToken: '{',
        nextToken: ':',
        errorToken: '',
      }),
      HdsCodeEditorJsonLintingError.KeyExpected,
      'Detects missing key error',
    );

    assert.strictEqual(
      determineErrorMessage({
        previousToken: '"',
        nextToken: '"',
        errorToken: '',
      }),
      HdsCodeEditorJsonLintingError.MissingComma,
      'Detects missing comma error',
    );

    assert.strictEqual(
      determineErrorMessage({
        previousToken: ',',
        nextToken: '}',
        errorToken: '',
      }),
      HdsCodeEditorJsonLintingError.TrailingComma,
      'Detects trailing comma error',
    );
  });

  test('renderErrorMessage creates correct HTML structure', function (assert) {
    const lineNumber = 123;
    const message = 'Syntax Error';
    const element = renderErrorMessage(message, lineNumber);

    assert.ok(
      element.classList.contains('cm-diagnosticText-inner'),
      'Has correct wrapper class',
    );
    assert.strictEqual(element.children.length, 2, 'Has two children');
    assert.ok(
      element?.children[0]?.classList.contains('cm-lint-marker-error'),
      'Has error icon',
    );
    assert.strictEqual(
      element?.children[1]?.textContent,
      `Line ${lineNumber}: ${message}`,
      'Has correct text content',
    );
  });
});
