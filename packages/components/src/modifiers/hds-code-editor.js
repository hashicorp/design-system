/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { modifier } from 'ember-modifier';
import * as monaco from 'monaco-editor';

export default modifier(function hdsCodeEditor(element, [options]) {
  // Initialize the Monaco Editor
  const editor = monaco.editor.create(element, {
    value: options.value || '',
    language: options.language || 'javascript',
    theme: options.theme || 'vs-dark',
    ...options
  });

  // Cleanup when the element is destroyed
  return () => {
    editor.dispose();
  };
});
