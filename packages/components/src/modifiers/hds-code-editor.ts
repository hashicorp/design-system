/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { modifier } from 'ember-modifier';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution.js';

export interface HdsCodeEditorModifierSignature {
  Element: HTMLElement;
  Args: {
    Named: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value?: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      language?: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      theme?: any;
    };
  };
}

export default modifier<HdsCodeEditorModifierSignature>(function hdsCodeEditor(
  element,
  _positional,
  named = {}
) {
  monaco.editor.defineTheme('hds-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: 'ffa500', fontStyle: 'italic' },
      { token: 'keyword', foreground: '00ff00' },
      { token: 'identifier', foreground: 'ff0000' },
    ],
    colors: {
      'editor.background': '#1e1e1e',
      'editor.foreground': '#d4d4d4',
      'editor.lineHighlightBackground': '#2b2b2b',
    },
  });

  // Set the custom theme as the active theme
  monaco.editor.setTheme('hds-dark');

  // Initialize the Monaco Editor
  const editor = monaco.editor.create(element, {
    value: named.value || '',
    language: named.language || 'javascript',
    theme: named.theme || 'hds-dark',
    automaticLayout: true,
    ...named,
  });

  // Cleanup when the element is destroyed
  return () => {
    editor.dispose();
  };
});
