/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

let HdsCodeEditorJsonLintingError = /*#__PURE__*/function (HdsCodeEditorJsonLintingError) {
  HdsCodeEditorJsonLintingError["InvalidSyntax"] = "Invalid syntax";
  HdsCodeEditorJsonLintingError["KeyExpected"] = "Key expected";
  HdsCodeEditorJsonLintingError["KeyMustBeDoubleQuoted"] = "Key must be double quoted";
  HdsCodeEditorJsonLintingError["MissingComma"] = "Missing comma";
  HdsCodeEditorJsonLintingError["TrailingComma"] = "Trailing comma";
  HdsCodeEditorJsonLintingError["ValueExpected"] = "Value expected";
  return HdsCodeEditorJsonLintingError;
}({});
function findNextToken(doc, index, step = 1) {
  while (index >= 0 && index < doc.length) {
    const token = doc.sliceString(index, index + 1);
    if (token.trim() !== '') {
      return token;
    }
    index += step;
  }
  return '';
}
function determineErrorMessage({
  previousToken,
  nextToken,
  errorToken
}) {
  let message = HdsCodeEditorJsonLintingError.InvalidSyntax;
  if (errorToken === '') {
    if (previousToken === '{' && nextToken === ':') {
      message = HdsCodeEditorJsonLintingError.KeyExpected;
    } else if (previousToken === '"' && nextToken === '"') {
      message = HdsCodeEditorJsonLintingError.MissingComma;
    } else if (previousToken === ',' && (nextToken === '}' || nextToken === ']')) {
      message = HdsCodeEditorJsonLintingError.TrailingComma;
    }
  } else {
    if ((previousToken === '{' || previousToken === ',') && (nextToken === '"' || nextToken === ':')) {
      message = HdsCodeEditorJsonLintingError.KeyMustBeDoubleQuoted;
    } else if (previousToken === ':' && (nextToken === ',' || nextToken === '}' || nextToken === ']')) {
      message = HdsCodeEditorJsonLintingError.ValueExpected;
    }
  }
  return message;
}

// this renders the error message for both the tooltip and the drawer item
function renderErrorMessage(message, lineNumber) {
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
async function jsonLinter(onLint) {
  const [{
    EditorView,
    keymap
  }, {
    syntaxTree
  }, {
    linter,
    lintGutter,
    lintKeymap
  }] = await Promise.all([import('@codemirror/view'), import('@codemirror/language'), import('@codemirror/lint')]);
  const jsonLinter = linter(editor => {
    const diagnostics = [];
    const doc = editor.state.doc;
    const tree = syntaxTree(editor.state);
    const seenLines = new Set();
    tree.cursor().iterate(node => {
      if (node.name === errorNodeName) {
        const lineNumber = doc.lineAt(node.from).number;
        if (seenLines.has(lineNumber)) {
          return;
        }
        const message = determineErrorMessage({
          previousToken: findNextToken(doc, node.from - 1, -1),
          nextToken: findNextToken(doc, node.to),
          errorToken: doc.sliceString(node.from, node.to)
        });
        diagnostics.push({
          from: node.from,
          to: node.to,
          message,
          severity: 'error',
          renderMessage: () => renderErrorMessage(message, lineNumber)
        });
        seenLines.add(lineNumber);
      }
    });
    onLint?.(diagnostics, doc.toString(), editor);
    return diagnostics;
  });
  return [jsonLinter, lintGutter(), keymap.of([...lintKeymap]), EditorView.editorAttributes.of({
    class: 'cm-lintingEnabled'
  })];
}

export { HdsCodeEditorJsonLintingError, jsonLinter as default, determineErrorMessage, findNextToken, renderErrorMessage };
//# sourceMappingURL=json-linter.js.map
