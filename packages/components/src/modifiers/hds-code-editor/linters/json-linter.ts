/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { Diagnostic as DiagnosticType } from '@codemirror/lint';
import type { HdsCodeEditorSignature } from '../../hds-code-editor';
import type { Extension, Text } from '@codemirror/state';
import type HdsIntlService from '../../../services/hds-intl.ts';

export enum HdsCodeEditorJsonLintingError {
  InvalidSyntax = 'Invalid syntax',
  KeyExpected = 'Key expected',
  KeyMustBeDoubleQuoted = 'Key must be double quoted',
  MissingComma = 'Missing comma',
  TrailingComma = 'Trailing comma',
  ValueExpected = 'Value expected',
}

function translateErrorMessage(
  message: string,
  hdsIntl?: HdsIntlService
): string {
  if (hdsIntl === undefined) {
    return message;
  }

  const options = { default: message };

  switch (message as HdsCodeEditorJsonLintingError) {
    case HdsCodeEditorJsonLintingError.InvalidSyntax:
      return hdsIntl.t(
        'hds.modifiers.hds-code-editor.json-linter.errors.invalid-syntax',
        options
      );

    case HdsCodeEditorJsonLintingError.KeyExpected:
      return hdsIntl.t(
        'hds.modifiers.hds-code-editor.json-linter.errors.key-expected',
        options
      );

    case HdsCodeEditorJsonLintingError.KeyMustBeDoubleQuoted:
      return hdsIntl.t(
        'hds.modifiers.hds-code-editor.json-linter.errors.key-must-be-double-quoted',
        options
      );

    case HdsCodeEditorJsonLintingError.MissingComma:
      return hdsIntl.t(
        'hds.modifiers.hds-code-editor.json-linter.errors.missing-comma',
        options
      );

    case HdsCodeEditorJsonLintingError.TrailingComma:
      return hdsIntl.t(
        'hds.modifiers.hds-code-editor.json-linter.errors.trailing-comma',
        options
      );

    case HdsCodeEditorJsonLintingError.ValueExpected:
      return hdsIntl.t(
        'hds.modifiers.hds-code-editor.json-linter.errors.value-expected',
        options
      );

    default:
      return message;
  }
}

export function findNextToken(
  doc: Text,
  index: number,
  step: number = 1
): string {
  while (index >= 0 && index < doc.length) {
    const token = doc.sliceString(index, index + 1);

    if (token.trim() !== '') {
      return token;
    }

    index += step;
  }
  return '';
}

export function determineErrorMessage({
  previousToken,
  nextToken,
  errorToken,
}: {
  previousToken: string;
  nextToken: string;
  errorToken: string;
}): HdsCodeEditorJsonLintingError {
  let message: HdsCodeEditorJsonLintingError =
    HdsCodeEditorJsonLintingError.InvalidSyntax;

  if (errorToken === '') {
    if (previousToken === '{' && nextToken === ':') {
      message = HdsCodeEditorJsonLintingError.KeyExpected;
    } else if (previousToken === '"' && nextToken === '"') {
      message = HdsCodeEditorJsonLintingError.MissingComma;
    } else if (
      previousToken === ',' &&
      (nextToken === '}' || nextToken === ']')
    ) {
      message = HdsCodeEditorJsonLintingError.TrailingComma;
    }
  } else {
    if (
      (previousToken === '{' || previousToken === ',') &&
      (nextToken === '"' || nextToken === ':')
    ) {
      message = HdsCodeEditorJsonLintingError.KeyMustBeDoubleQuoted;
    } else if (
      previousToken === ':' &&
      (nextToken === ',' || nextToken === '}' || nextToken === ']')
    ) {
      message = HdsCodeEditorJsonLintingError.ValueExpected;
    }
  }

  return message;
}

// this renders the error message for both the tooltip and the drawer item
export function renderErrorMessage(
  message: string,
  lineNumber: number,
  hdsIntl?: HdsIntlService
): HTMLElement {
  const displayMessage = translateErrorMessage(message, hdsIntl);

  const textContent = hdsIntl
    ? hdsIntl.t('hds.modifiers.hds-code-editor.json-linter.line-message', {
        default: `Line ${lineNumber}: ${displayMessage}`,
        lineNumber,
        message: displayMessage,
      })
    : `Line ${lineNumber}: ${displayMessage}`;

  const wrapper = document.createElement('div');
  wrapper.classList.add('cm-diagnosticText-inner');

  const icon = document.createElement('div');
  icon.classList.add('cm-lint-marker-error');
  icon.setAttribute('aria-hidden', 'true');

  const text = document.createElement('span');
  text.textContent = textContent;

  wrapper.append(icon, text);

  return wrapper;
}

// lezer JSON parser uses '⚠' as a placeholder for syntax errors
const errorNodeName = '⚠';

export default async function jsonLinter(
  onLint: HdsCodeEditorSignature['Args']['Named']['onLint'],
  hdsIntl?: HdsIntlService
): Promise<Extension[]> {
  const [
    { EditorView, keymap },
    { syntaxTree },
    { linter, lintGutter, lintKeymap },
  ] = await Promise.all([
    import('@codemirror/view'),
    import('@codemirror/language'),
    import('@codemirror/lint'),
  ]);

  const jsonLinter = linter((editor) => {
    const diagnostics: DiagnosticType[] = [];
    const doc = editor.state.doc;
    const tree = syntaxTree(editor.state);
    const seenLines = new Set();

    tree.cursor().iterate((node) => {
      if (node.name === errorNodeName) {
        const lineNumber = doc.lineAt(node.from).number;

        if (seenLines.has(lineNumber)) {
          return;
        }

        const message = determineErrorMessage({
          previousToken: findNextToken(doc, node.from - 1, -1),
          nextToken: findNextToken(doc, node.to),
          errorToken: doc.sliceString(node.from, node.to),
        });

        diagnostics.push({
          from: node.from,
          to: node.to,
          message,
          severity: 'error',
          renderMessage: () => renderErrorMessage(message, lineNumber, hdsIntl),
        });

        seenLines.add(lineNumber);
      }
    });

    onLint?.(diagnostics, doc.toString(), editor);

    return diagnostics;
  });

  return [
    jsonLinter,
    lintGutter(),
    keymap.of([...lintKeymap]),
    EditorView.editorAttributes.of({ class: 'cm-lintingEnabled' }),
  ];
}
