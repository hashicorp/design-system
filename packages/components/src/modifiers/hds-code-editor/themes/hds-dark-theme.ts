/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { EditorView } from '@codemirror/view';

const BG_COLOR = '#0d0e12';

const hdsDark = EditorView.theme(
  {
    '&': {
      color: 'white',
      backgroundColor: BG_COLOR,
      height: '100%',
    },
    '.cm-content': {
      caretColor: '#ffffff',
      padding: '16px',
    },
    '.cm-cursor, .cm-dropCursor': {
      borderLeftColor: '#ffffff',
    },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      {
        backgroundColor: '#555555',
      },
    '.cm-panels': {
      backgroundColor: '#333333',
      color: 'white',
    },
    '.cm-panels.cm-panels-top': {
      borderBottom: '2px solid black',
    },
    '.cm-panels.cm-panels-bottom': {
      borderTop: '2px solid black',
    },
    '.cm-searchMatch': {
      backgroundColor: '#72a1ff59',
      outline: '1px solid #457dff',
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: '#6199ff2f',
    },
    '.cm-activeLine': {
      backgroundColor: '#6699ff0b',
    },
    '.cm-selectionMatch': {
      backgroundColor: '#aafe661a',
    },
    '.cm-matchingBracket, .cm-nonmatchingBracket': {
      backgroundColor: '#bad0f847',
      outline: '1px solid #515a6b',
    },
    '.cm-gutters': {
      backgroundColor: BG_COLOR,
      borderRight: '1px solid rgba(178, 182, 189, 40%)',
      color: '#b2b6bd',
      padding: '0 16px',
    },
    '.cm-activeLineGutter': {
      backgroundColor: '#6699ff0b',
    },
    '.cm-lineNumbers': {
      color: '#b2b6bd',
    },
    '.cm-foldPlaceholder': {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#ddd',
    },
    '.cm-tooltip': {
      border: '1px solid #181a1f',
      backgroundColor: '#333338',
    },
    '.cm-tooltip .cm-tooltip-arrow:before': {
      borderTopColor: '#333338',
    },
    '.cm-tooltip .cm-tooltip-arrow:after': {
      borderTopColor: '#181a1f',
    },
    '.cm-tooltip-autocomplete': {
      '& > ul > li[aria-selected]': {
        backgroundColor: '#ffffff10',
        color: 'white',
      },
    },
  },
  { dark: true }
);

export default hdsDark;
