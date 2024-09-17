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
  // Initialize the Monaco Editor
  const editor = monaco.editor.create(element, {
    value: named.value || '',
    language: named.language || 'javascript',
    theme: named.theme || 'vs-dark',
    automaticLayout: true,
    ...named,
  });

  // Cleanup when the element is destroyed
  return () => {
    editor.dispose();
  };
});
