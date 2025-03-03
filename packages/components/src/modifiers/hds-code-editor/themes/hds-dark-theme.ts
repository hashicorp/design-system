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
  HDS_CODE_EDITOR_COLOR_BORDER_STRONG,
  HDS_CODE_EDITOR_COLOR_SURFACE_PRIMARY,
  HDS_CODE_EDITOR_COLOR_FOREGROUND_CRITICAL,
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
    '.cm-content': {
      padding: '16px 0',
    },
    '.cm-content ::selection': {
      backgroundColor: HDS_CODE_BLOCK_GREEN,
      color: HDS_CODE_EDITOR_COLOR_SURFACE_PRIMARY,
    },
    '.cm-gutters': {
      backgroundColor: HDS_CODE_EDITOR_COLOR_SURFACE_PRIMARY,
    },
    '.cm-gutter:last-of-type': {
      borderRight: `1px solid ${HDS_CODE_EDITOR_COLOR_BORDER_PRIMARY}`,
    },
    '.cm-lineNumbers': {
      color: HDS_CODE_EDITOR_COLOR_FOREGROUND_FAINT,
    },
    '.cm-lineNumbers .cm-gutterElement': {
      borderLeft: '4px solid transparent',
      display: 'flex',
      alignItems: 'center',
      padding: '0px 16px',
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
      padding: '4px 16px',
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

    // linting
    '&.cm-lintingEnabled': {
      // styles specific to linting
    },
    '.cm-gutter-lint': {
      width: '36px',
    },
    '.cm-lint-marker-error': {
      width: '24px',
      height: '24px',
      padding: '4px',
      content: `url('data:image/svg+xml,<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g id="x-diamond-fill"><path id="Path" fill-rule="evenodd" clip-rule="evenodd" d="M9.56912 0.752289C8.69045 -0.126408 7.26581 -0.126415 6.38713 0.752272L0.730298 6.40911C-0.148388 7.28779 -0.148379 8.71243 0.730316 9.5911L6.38715 15.2478C7.26583 16.1265 8.69044 16.1265 9.56911 15.2478L15.2258 9.59109C16.1045 8.71241 16.1045 7.2878 15.2258 6.40912L9.56912 0.752289ZM5.21967 5.21955C5.51256 4.92665 5.98744 4.92665 6.28033 5.21955L8 6.93922L9.71967 5.21955C10.0126 4.92665 10.4874 4.92665 10.7803 5.21955C11.0732 5.51244 11.0732 5.98731 10.7803 6.28021L9.06066 7.99988L10.7803 9.71955C11.0732 10.0124 11.0732 10.4873 10.7803 10.7802C10.4874 11.0731 10.0126 11.0731 9.71967 10.7802L8 9.06054L6.28033 10.7802C5.98744 11.0731 5.51256 11.0731 5.21967 10.7802C4.92678 10.4873 4.92678 10.0124 5.21967 9.71955L6.93934 7.99988L5.21967 6.28021C4.92678 5.98731 4.92678 5.51244 5.21967 5.21955Z" fill="${encodeURIComponent(HDS_CODE_EDITOR_COLOR_FOREGROUND_CRITICAL)}"/></g></svg>');`,
    },
    '.cm-tooltip': {
      position: 'relative',
      background: '#333',
      color: '#fff',
      padding: '8px',
      borderRadius: '4px',
      fontSize: '12px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    },
    '.cm-tooltip::before': {
      content: '""',
      position: 'absolute',
      bottom: '-6px' /* Adjust based on tooltip position */,
      left: '6px',
      transform: 'translateX(-50%)',
      borderLeft: '6px solid transparent',
      borderRight: '6px solid transparent',
      borderTop: '6px solid #333' /* Match the tooltip background */,
    },
    '.cm-diagnostic': {
      borderLeft: 'none',
    },
    '.cm-panel.cm-panel-lint ul li.cm-diagnostic': {
      backgroundColor: HDS_CODE_EDITOR_COLOR_SURFACE_PRIMARY,
      color: HDS_CODE_EDITOR_COLOR_FOREGROUND_HIGH_CONTRAST,
      fontFamily: 'var(--token-typography-body-100-font-family)',
      padding: '16px',
    },
    '.cm-panels-bottom .cm-panel.cm-panel-lint': {
      borderTop: `3px solid ${HDS_CODE_EDITOR_COLOR_BORDER_STRONG}`,
    },
  },
  { dark: true }
);

export default hdsDark;
