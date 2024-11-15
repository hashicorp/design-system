/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { EditorView } from '@codemirror/view';

const BG_COLOR = '#0d0e12';

const hdsDark = EditorView.theme(
  {
    '&': {
      color: '#efeff1',
      backgroundColor: BG_COLOR,
      height: '100%',
    },
    '.cm-content': {
      padding: '16px',
    },
    '.cm-gutters': {
      backgroundColor: BG_COLOR,
      borderRight: '1px solid rgba(178, 182, 189, 40%)',
      color: '#b2b6bd',
      padding: '0 16px',
    },
    '.cm-lineNumbers': {
      color: '#b2b6bd',
    },
  },
  { dark: true }
);

export default hdsDark;
