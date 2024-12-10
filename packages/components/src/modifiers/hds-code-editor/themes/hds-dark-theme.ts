/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { EditorView } from '@codemirror/view';

const BG_COLOR = '#0d0e12';
const ACTIVE_LINE_BG_COLOR = 'rgba(0, 74, 222, 0.2)';

const hdsDark = EditorView.theme(
  {
    '&': {
      color: '#efeff1',
      backgroundColor: BG_COLOR,
      height: '100%',
    },
    '.cm-content': {
      padding: '16px 0',
    },
    '.cm-gutter': {
      backgroundColor: BG_COLOR,
      borderRight: '1px solid rgba(178, 182, 189, 40%)',
      color: '#b2b6bd',
    },
    '.cm-lineNumbers': {
      color: '#b2b6bd',
    },
    '.cm-lineNumbers .cm-gutterElement': {
      borderLeft: '4px solid transparent',
      padding: '0 16px',
    },
    '.cm-gutterElement.cm-activeLineGutter': {
      borderColor: '#1555D4',
      backgroundColor: ACTIVE_LINE_BG_COLOR,
      outline: '1px solid #1555D4',
    },
    '.cm-line': {
      padding: '0 16px',
    },
    '.cm-activeLine': {
      backgroundColor: ACTIVE_LINE_BG_COLOR,
      outline: '1px solid #1555D4',
    },
    '.cm-matchingBracket': {
      outline: '1px solid #BFBFC0',
    },
  },
  { dark: true }
);

export default hdsDark;
