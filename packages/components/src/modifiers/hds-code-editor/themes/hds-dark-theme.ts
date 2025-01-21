/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { EditorView } from '@codemirror/view';
import {
  HDS_CODE_BLOCK_LINE_HIGHLIGHT,
  HDS_CODE_BLOCK_LINE_HIGHLIGHT_BORDER,
  HDS_CODE_BLOCK_GREEN,
  HDS_CODE_BLOCK_WHITE,
  HDS_CODE_EDITOR_COLOR_BORDER_PRIMARY,
  HDS_CODE_EDITOR_COLOR_SURFACE_PRIMARY,
  HDS_CODE_EDITOR_COLOR_FOREGROUND_FAINT,
  HDS_CODE_EDITOR_COLOR_FOREGROUND_HIGH_CONTRAST,
} from '../palettes/hds-dark-palette.ts';

const hdsDark = EditorView.theme(
  {
    '&': {
      color: HDS_CODE_BLOCK_WHITE,
      backgroundColor: HDS_CODE_EDITOR_COLOR_SURFACE_PRIMARY,
      height: '100%',
    },
    '& ::selection': {
      backgroundColor: HDS_CODE_BLOCK_GREEN,
      color: HDS_CODE_EDITOR_COLOR_SURFACE_PRIMARY,
    },
    '.cm-content': {
      padding: '16px 0',
    },
    '.cm-gutters': {
      backgroundColor: HDS_CODE_EDITOR_COLOR_SURFACE_PRIMARY,
    },
    '.cm-gutter': {
      borderRight: `1px solid ${HDS_CODE_EDITOR_COLOR_BORDER_PRIMARY}`,
    },
    '.cm-lineNumbers': {
      color: HDS_CODE_EDITOR_COLOR_FOREGROUND_FAINT,
    },
    '.cm-lineNumbers .cm-gutterElement': {
      borderLeft: '4px solid transparent',
      padding: '0 16px',
    },
    '.cm-gutterElement.cm-activeLineGutter': {
      backgroundColor: HDS_CODE_EDITOR_COLOR_SURFACE_PRIMARY,
    },
    '&:not(.cm-hasSelection).cm-focused .cm-gutterElement.cm-activeLineGutter':
      {
        borderColor: HDS_CODE_BLOCK_LINE_HIGHLIGHT_BORDER,
        backgroundColor: HDS_CODE_BLOCK_LINE_HIGHLIGHT,
        color: HDS_CODE_EDITOR_COLOR_FOREGROUND_HIGH_CONTRAST,
        outline: `1px solid ${HDS_CODE_BLOCK_LINE_HIGHLIGHT_BORDER}`,
      },
    '.cm-line': {
      padding: '0 16px',
    },
    '.cm-activeLine': {
      backgroundColor: HDS_CODE_EDITOR_COLOR_SURFACE_PRIMARY,
    },
    '&:not(.cm-hasSelection).cm-focused .cm-activeLine': {
      backgroundColor: HDS_CODE_BLOCK_LINE_HIGHLIGHT,
      outline: `1px solid ${HDS_CODE_BLOCK_LINE_HIGHLIGHT_BORDER}`,
    },
    '.cm-matchingBracket': {
      outline: `1px solid ${HDS_CODE_BLOCK_WHITE}`,
    },
  },
  { dark: true }
);

export default hdsDark;
