import RSVP from 'rsvp';

import type { Diagnostic as DiagnosticType } from '@codemirror/lint';
import type { Extension } from '@codemirror/state';

export default async function jsonLinter(): Promise<Extension[]> {
  const [{ syntaxTree }, { linter, lintGutter }] = await RSVP.all([
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

    return diagnostics;
  });

  return [jsonLinter, lintGutter()];
}
