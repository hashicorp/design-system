/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { Diagnostic as DiagnosticType } from '@codemirror/lint';
import type { HdsCodeEditorSignature } from '../../hds-code-editor';
import type { Extension, Text } from '@codemirror/state';

export enum HdsCodeEditorJsonLintingError {
  InvalidSyntax = 'Invalid syntax',
  KeyExpected = 'Key expected',
  KeyMustBeDoubleQuoted = 'Key must be double quoted',
  MissingComma = 'Missing comma',
  TrailingComma = 'Trailing comma',
  ValueExpected = 'Value expected',
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
  lineNumber: number
): HTMLElement {
  const wrapper = document.createElement('div');
  wrapper.classList.add('cm-diagnosticText-inner');

  const icon = document.createElement('div');
  icon.classList.add('cm-lint-marker-error');
  icon.setAttribute('aria-hidden', 'true');

  const text = document.createElement('span');
  text.textContent = `Line ${lineNumber}: ${message}`;

  wrapper.append(icon, text);

  return wrapper;
}

// lezer JSON parser uses '⚠' as a placeholder for syntax errors
const errorNodeName = '⚠';

export default async function jsonLinter(
  onLint: HdsCodeEditorSignature['Args']['Named']['onLint']
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
          renderMessage: () => renderErrorMessage(message, lineNumber),
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
