/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { EditorView } from '@codemirror/view';

const BG_COLOR = '#15181E';
const ACTIVE_LINE_BG_COLOR = 'rgba(0, 74, 222, 0.2)';
const ACTIVE_LINE_BORDER_COLOR = '#1555D4';

const hdsDark = EditorView.theme(
  {
    '&': {
      color: '#efeff1',
      backgroundColor: BG_COLOR,
      height: '100%',
    },
    '.cm-content': {
      backgroundColor: BG_COLOR,
      padding: '16px 0',
    },
    '.cm-gutters': {
      backgroundColor: BG_COLOR,
    },
    '.cm-gutter': {
      borderRight: '1px solid rgba(178, 182, 189, 40%)',
      color: '#b2b6bd',
    },
    '.cm-lineNumbers': {
      color: '#878A8F',
    },
    '.cm-lineNumbers .cm-gutterElement': {
      borderLeft: '4px solid transparent',
      padding: '0 16px',
    },
    '.cm-gutterElement.cm-activeLineGutter': {
      borderColor: ACTIVE_LINE_BORDER_COLOR,
      backgroundColor: ACTIVE_LINE_BG_COLOR,
      color: '#EFEFF1',
      outline: `1px solid ${ACTIVE_LINE_BORDER_COLOR}`,
    },
    '.cm-line': {
      padding: '0 16px',
    },
    '.cm-activeLine': {
      backgroundColor: ACTIVE_LINE_BG_COLOR,
      outline: `1px solid ${ACTIVE_LINE_BORDER_COLOR}`,
    },
    '.cm-matchingBracket': {
      outline: '1px solid #EFEFF1',
    },
  },
  { dark: true }
);

export default hdsDark;
