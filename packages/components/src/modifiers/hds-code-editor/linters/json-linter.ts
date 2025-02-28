import RSVP from 'rsvp';

import type { Diagnostic as DiagnosticType } from '@codemirror/lint';
import type { Extension, Text } from '@codemirror/state';

function getSurroundingTokens(
  doc: Text,
  errorStart: number,
  errorEnd: number
): {
  previousToken: string;
  nextToken: string;
} {
  let previousToken = '';
  let nextToken = '';

  // find the previous non-whitespace token
  let left = errorStart - 1;
  while (left >= 0) {
    const token = doc.sliceString(left, left + 1);

    if (token.trim() !== '') {
      previousToken = token;
      break;
    }

    left--;
  }

  // find the next non-whitespace token
  let right = errorEnd;
  while (right < doc.length) {
    const token = doc.sliceString(right, right + 1);

    if (token.trim() !== '') {
      nextToken = token;
      break;
    }

    right++;
  }

  return { previousToken, nextToken };
}

// lezer JSON parser uses '⚠' as a placeholder for syntax errors
const errorNodeName = '⚠';

export default async function jsonLinter(): Promise<Extension[]> {
  const [{ keymap }, { syntaxTree }, { linter, lintGutter, lintKeymap }] =
    await RSVP.all([
      import('@codemirror/view'),
      import('@codemirror/language'),
      import('@codemirror/lint'),
    ]);

  const jsonLinter = linter((view) => {
    const diagnostics: DiagnosticType[] = [];
    const doc = view.state.doc;
    const tree = syntaxTree(view.state);

    const seenLines = new Set();

    tree.cursor().iterate((node) => {
      if (node.name === errorNodeName) {
        const lineNumber = doc.lineAt(node.from).number;

        if (seenLines.has(lineNumber)) {
          return;
        }

        const errorToken = doc.sliceString(node.from, node.to);
        const { previousToken, nextToken } = getSurroundingTokens(
          doc,
          node.from,
          node.to
        );

        let message = 'Invalid syntax';

        if (errorToken === '') {
          if (previousToken === '{' && nextToken === ':') {
            message = 'Key expected';
          } else if (previousToken === '"' && nextToken === '"') {
            message = 'Missing comma';
          } else if (
            previousToken === ',' &&
            (nextToken === '}' || nextToken === ']')
          ) {
            message = 'Trailing comma';
          }
        } else {
          if (
            (previousToken === '{' || previousToken === ',') &&
            (nextToken === '"' || nextToken === ':')
          ) {
            message = 'Key must be double quoted';
          } else if (
            previousToken === ':' &&
            (nextToken === ',' || nextToken === '}' || nextToken === ']')
          ) {
            message = 'Value expected';
          }
        }

        diagnostics.push({
          from: node.from,
          to: node.to,
          message,
          severity: 'error',
          renderMessage: () => {
            const element = document.createElement('div');

            element.textContent = message;

            return element;
          },
        });

        seenLines.add(lineNumber);
      }
    });

    return diagnostics;
  });

  return [jsonLinter, lintGutter(), keymap.of([...lintKeymap])];
}
