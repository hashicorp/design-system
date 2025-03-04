import RSVP from 'rsvp';

import type { Diagnostic as DiagnosticType } from '@codemirror/lint';
import type {
  HdsCodeEditorLintDiagnostic,
  HdsCodeEditorSignature,
} from '../../hds-code-editor';
import type { Extension, Text } from '@codemirror/state';

export enum HdsCodeEditorJsonLintingError {
  InvalidSyntax = 'Invalid syntax',
  KeyExpected = 'Key expected',
  KeyMustBeDoubleQuoted = 'Key must be double quoted',
  MissingComma = 'Missing comma',
  TrailingComma = 'Trailing comma',
  ValueExpected = 'Value expected',
}

export function parseDiagnostics(
  diagnostics: DiagnosticType[]
): HdsCodeEditorLintDiagnostic[] {
  return diagnostics.map((diagnostic) => ({
    from: diagnostic.from,
    to: diagnostic.to,
    message: diagnostic.message,
    severity: diagnostic.severity,
  }));
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

export function renderErrorMessage(message: string): HTMLElement {
  const wrapper = document.createElement('div');
  wrapper.classList.add('cm-diagnosticText-inner');

  const icon = document.createElement('div');
  icon.classList.add('cm-lint-marker-error');

  const text = document.createElement('span');
  text.textContent = message;

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
  ] = await RSVP.all([
    import('@codemirror/view'),
    import('@codemirror/language'),
    import('@codemirror/lint'),
  ]);

  const jsonLinter = linter((view) => {
    const diagnostics: DiagnosticType[] = [];
    const doc = view.state.doc;
    const tree = syntaxTree(view.state);
    const seenKeys = new Set();

    tree.cursor().iterate((node) => {
      // lezer JSON parser uses '⚠' as a placeholder for syntax errors
      if (node.name === '⚠') {
        console.log({ node });
        const errorChar = doc.sliceString(node.from, node.to);
        const prevChar = doc.sliceString(node.from - 1, node.from);
        const nextChar = doc.sliceString(node.to, node.to + 1);

        let message = 'Syntax error in JSON.';

        // use specific characters to provide more context for the error
        if (errorChar === ',') {
          message = 'Trailing commas are not allowed in JSON.';
        } else if (prevChar === ':' && !['"', '{'].includes(errorChar)) {
          message = 'Invalid value after colon.';
        } else if (
          errorChar.match(/[a-zA-Z]/) &&
          prevChar !== '"' &&
          prevChar !== ':'
        ) {
          message = 'Unquoted keys must be enclosed in double quotes.';
        } else if (nextChar === '' || nextChar === undefined) {
          message = 'Unexpected end of JSON input.';
        } else if (prevChar === ',' && !['"', '{', '['].includes(errorChar)) {
          message = 'Missing comma between properties.';
        } else if (errorChar === '"') {
          message = 'String is not closed properly.';
        }

        diagnostics.push({
          from: node.from,
          to: node.to,
          message,
          severity: 'error',
        });
      }

      // detect duplicate keys in objects
      if (node.name === 'Property') {
        const keyNode = node.node.firstChild;

        if (keyNode) {
          const keyText = doc.sliceString(keyNode.from, keyNode.to);

          if (seenKeys.has(keyText)) {
            diagnostics.push({
              from: keyNode.from,
              to: keyNode.to,
              message: `Duplicate key '${keyText}' found in JSON object.`,
              severity: 'error',
            });
          }

          seenKeys.add(keyText);
        }
      }
    });

    if (onLint) {
      onLint(parseDiagnostics(diagnostics));
    }

    return diagnostics;
  });

  return [jsonLinter, lintGutter()];
}
