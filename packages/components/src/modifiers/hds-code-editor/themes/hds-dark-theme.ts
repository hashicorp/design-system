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
  HDS_CODE_EDITOR_COLOR_SURFACE_INTERACTIVE_ACTIVE,
  HDS_CODE_EDITOR_COLOR_FOCUS_ACTION_EXTERNAL,
  HDS_CODE_EDITOR_COLOR_FOCUS_ACTION_INTERNAL,
  HDS_CODE_EDITOR_COLOR_FOREGROUND_CRITICAL,
  HDS_CODE_EDITOR_COLOR_FOREGROUND_FAINT,
  HDS_CODE_EDITOR_COLOR_FOREGROUND_HIGH_CONTRAST,
  HDS_CODE_EDITOR_COLOR_FOREGROUND_NEUTRAL_300,
  HDS_CODE_EDITOR_COLOR_FOREGROUND_NEUTRAL_400,
  HDS_CODE_EDITOR_COLOR_TOOLTIP_BACKGROUND,
} from '../palettes/hds-dark-palette.ts';

const CLOSE_BUTTON_SELECTOR = '.cm-panel.cm-panel-lint button[name="close"]';

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
    '.cm-gutter:first-of-type .cm-gutterElement': {
      borderLeft: '4px solid transparent',
    },
    '.cm-gutter:last-of-type': {
      borderRight: `1px solid ${HDS_CODE_EDITOR_COLOR_BORDER_PRIMARY}`,
    },
    '.cm-lineNumbers': {
      color: HDS_CODE_EDITOR_COLOR_FOREGROUND_FAINT,
    },
    '.cm-lineNumbers .cm-gutterElement': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'end',
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

    // linting gutter
    '&.cm-lintingEnabled .cm-lineNumbers .cm-gutterElement': {
      paddingLeft: '8px',
    },
    '.cm-gutter-lint': {
      width: '28px',
    },
    '.cm-gutter-lint .cm-gutterElement': {
      padding: '0',
    },
    '.cm-lint-marker-error': {
      width: '24px',
      height: '24px',
      padding: '6px',
      content: `url('data:image/svg+xml,<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g id="x-diamond-fill"><path id="Path" fill-rule="evenodd" clip-rule="evenodd" d="M9.56912 0.752289C8.69045 -0.126408 7.26581 -0.126415 6.38713 0.752272L0.730298 6.40911C-0.148388 7.28779 -0.148379 8.71243 0.730316 9.5911L6.38715 15.2478C7.26583 16.1265 8.69044 16.1265 9.56911 15.2478L15.2258 9.59109C16.1045 8.71241 16.1045 7.2878 15.2258 6.40912L9.56912 0.752289ZM5.21967 5.21955C5.51256 4.92665 5.98744 4.92665 6.28033 5.21955L8 6.93922L9.71967 5.21955C10.0126 4.92665 10.4874 4.92665 10.7803 5.21955C11.0732 5.51244 11.0732 5.98731 10.7803 6.28021L9.06066 7.99988L10.7803 9.71955C11.0732 10.0124 11.0732 10.4873 10.7803 10.7802C10.4874 11.0731 10.0126 11.0731 9.71967 10.7802L8 9.06054L6.28033 10.7802C5.98744 11.0731 5.51256 11.0731 5.21967 10.7802C4.92678 10.4873 4.92678 10.0124 5.21967 9.71955L6.93934 7.99988L5.21967 6.28021C4.92678 5.98731 4.92678 5.51244 5.21967 5.21955Z" fill="${encodeURIComponent(HDS_CODE_EDITOR_COLOR_FOREGROUND_CRITICAL)}"/></g></svg>');`,
    },

    // linter diagnostics panel
    '.cm-panel.cm-panel-lint ul li.cm-diagnostic': {
      backgroundColor: HDS_CODE_EDITOR_COLOR_SURFACE_PRIMARY,
      borderBottom: `1px solid ${HDS_CODE_EDITOR_COLOR_BORDER_PRIMARY}`,
      color: HDS_CODE_EDITOR_COLOR_FOREGROUND_HIGH_CONTRAST,
      fontFamily: 'var(--token-typography-body-100-font-family)',
      fontSize: '13px',
      padding: '16px',
    },
    '.cm-panel.cm-panel-lint ul:focus li.cm-diagnostic[aria-selected]': {
      background: 'none',
      backgroundColor: HDS_CODE_EDITOR_COLOR_SURFACE_PRIMARY,
      color: HDS_CODE_EDITOR_COLOR_FOREGROUND_HIGH_CONTRAST,
    },
    '.cm-panel.cm-panel-lint ul li.cm-diagnostic:last-of-type': {
      borderBottom: '0',
    },
    '.cm-panels-bottom .cm-panel.cm-panel-lint': {
      borderTop: `3px solid ${HDS_CODE_EDITOR_COLOR_BORDER_STRONG}`,
    },
    '.cm-diagnostic': {
      borderLeft: 'none',
    },
    '.cm-diagnosticText-inner': {
      alignItems: 'center',
      display: 'flex',
      gap: '16px',
    },
    // linter diagnostics panel close button
    [`${CLOSE_BUTTON_SELECTOR}`]: {
      alignItems: 'center',
      borderRadius: '5px',
      color: HDS_CODE_EDITOR_COLOR_FOREGROUND_NEUTRAL_300,
      cursor: 'pointer',
      display: 'flex',
      fontFamily: 'var(--token-typography-body-100-font-family)',
      height: '20px',
      lineHeight: '20px',
      justifyContent: 'center',
      right: '22px',
      top: '6px',
      width: '20px',
    },
    [`${CLOSE_BUTTON_SELECTOR}:hover, ${CLOSE_BUTTON_SELECTOR}:active, ${CLOSE_BUTTON_SELECTOR}:focus`]:
      {
        backgroundColor: HDS_CODE_EDITOR_COLOR_SURFACE_INTERACTIVE_ACTIVE,
        border: '1px solid transparent',
        color: HDS_CODE_EDITOR_COLOR_FOREGROUND_NEUTRAL_400,
      },
    [`${CLOSE_BUTTON_SELECTOR}:active`]: {
      borderColor: HDS_CODE_EDITOR_COLOR_FOREGROUND_NEUTRAL_400,
    },
    [`${CLOSE_BUTTON_SELECTOR}:focus`]: {
      borderColor: HDS_CODE_EDITOR_COLOR_FOCUS_ACTION_INTERNAL,
      outline: `3px solid ${HDS_CODE_EDITOR_COLOR_FOCUS_ACTION_EXTERNAL}`,
    },

    // tooltips
    '.cm-tooltip': {
      backgroundColor: HDS_CODE_EDITOR_COLOR_TOOLTIP_BACKGROUND,
      borderRadius: '5px',
      color: HDS_CODE_EDITOR_COLOR_FOREGROUND_HIGH_CONTRAST,
      fontFamily: 'var(--token-typography-body-100-font-family)',
      fontSize: '13px',
      padding: '8px 12px',
    },
    '.cm-tooltip::before': {
      borderLeft: '8px solid transparent',
      borderRight: '8px solid transparent',
      content: '""',
      left: '16px',
      position: 'absolute',
      transform: 'translateX(-50%)',
    },
    '.cm-tooltip-above': {
      transform: 'translateX(-4px) translateY(-6px)',
    },
    '.cm-tooltip-below': {
      transform: 'translateX(-4px) translateY(6px)',
    },
    '.cm-tooltip-above::before': {
      borderTop: `8px solid ${HDS_CODE_EDITOR_COLOR_TOOLTIP_BACKGROUND}`,
      bottom: '-8px',
    },
    '.cm-tooltip-below::before': {
      borderBottom: `8px solid ${HDS_CODE_EDITOR_COLOR_TOOLTIP_BACKGROUND}`,
      top: '-8px',
    },
    '.cm-tooltip .cm-lint-marker-error': {
      display: 'none',
    },
  },
  { dark: true }
);

export default hdsDark;
