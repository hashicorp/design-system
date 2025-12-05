/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { EditorView } from '@codemirror/view';
import {
  HDS_CODE_BLOCK_LINE_HIGHLIGHT,
  HDS_CODE_BLOCK_LINE_HIGHLIGHT_BORDER,
  HDS_CODE_BLOCK_GREEN,
  HDS_CODE_BLOCK_WHITE,
  HDS_CODE_EDITOR_COLOR_SURFACE_FAINT,
  HDS_CODE_EDITOR_COLOR_SURFACE_PRIMARY,
  HDS_CODE_EDITOR_COLOR_SURFACE_INTERACTIVE_ACTIVE,
  HDS_CODE_EDITOR_COLOR_FOREGROUND_CRITICAL,
  HDS_CODE_EDITOR_COLOR_FOREGROUND_FAINT,
  HDS_CODE_EDITOR_COLOR_FOCUS_ACTION_INTERNAL,
  HDS_CODE_EDITOR_COLOR_FOCUS_ACTION_EXTERNAL,
} from '../palettes/hds-dark-palette.ts';

const CLOSE_BUTTON_SELECTOR = '.cm-panel.cm-panel-lint button[name="close"]';
const PANEL_DIAGNOSTIC_ITEM_SELECTOR =
  '.cm-panel.cm-panel-lint ul li.cm-diagnostic';

const hdsDark = EditorView.theme(
  {
    '&': {
      color: HDS_CODE_BLOCK_WHITE,
      backgroundColor: HDS_CODE_EDITOR_COLOR_SURFACE_PRIMARY,
      height: '100%',
    },
    '.cm-content': {
      borderLeft: `1px solid var(--token-color-palette-neutral-500)`,
      height: '100%',
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
        color: 'var(--token-color-foreground-high-contrast)',
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

    // set a minimum height on the editor content when linting is enabled
    '&.cm-lintingEnabled .cm-content': {
      minHeight: '160px',
    },

    // replace the underline svg
    '.cm-lintRange-error': {
      backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="6" height="3">%3Cpath%20d%3D%22m0%202.5%20l2%20-1.5%20l1%200%20l2%201.5%20l1%200%22%20stroke%3D%22${encodeURIComponent(HDS_CODE_EDITOR_COLOR_FOREGROUND_CRITICAL)}%22%20fill%3D%22none%22%20stroke-width%3D%22.7%22%2F%3E</svg>')`,
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
      content: `url('data:image/svg+xml,<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.56912 0.752289C8.69045 -0.126408 7.26581 -0.126415 6.38713 0.752272L0.730298 6.40911C-0.148388 7.28779 -0.148379 8.71243 0.730316 9.5911L6.38715 15.2478C7.26583 16.1265 8.69044 16.1265 9.56911 15.2478L15.2258 9.59109C16.1045 8.71241 16.1045 7.2878 15.2258 6.40912L9.56912 0.752289ZM5.21967 5.21955C5.51256 4.92665 5.98744 4.92665 6.28033 5.21955L8 6.93922L9.71967 5.21955C10.0126 4.92665 10.4874 4.92665 10.7803 5.21955C11.0732 5.51244 11.0732 5.98731 10.7803 6.28021L9.06066 7.99988L10.7803 9.71955C11.0732 10.0124 11.0732 10.4873 10.7803 10.7802C10.4874 11.0731 10.0126 11.0731 9.71967 10.7802L8 9.06054L6.28033 10.7802C5.98744 11.0731 5.51256 11.0731 5.21967 10.7802C4.92678 10.4873 4.92678 10.0124 5.21967 9.71955L6.93934 7.99988L5.21967 6.28021C4.92678 5.98731 4.92678 5.51244 5.21967 5.21955Z" fill="${encodeURIComponent(HDS_CODE_EDITOR_COLOR_FOREGROUND_CRITICAL)}"/></svg>');`,
    },

    // linter diagnostics panel
    '.cm-panel.cm-panel-lint ul': {
      backgroundColor: 'var(--token-color-palette-neutral-500)',
      maxHeight: '85px',
    },
    [`${PANEL_DIAGNOSTIC_ITEM_SELECTOR}`]: {
      backgroundColor: HDS_CODE_EDITOR_COLOR_SURFACE_PRIMARY,
      border: '4px solid transparent',
      color: 'var(--token-color-foreground-high-contrast)',
      fontFamily: 'var(--token-typography-body-100-font-family)',
      fontSize: '13px',
      marginBottom: '1px',
      padding: '16px 12px',
    },
    [`${PANEL_DIAGNOSTIC_ITEM_SELECTOR}:last-of-type`]: {
      marginBottom: '0',
    },
    [`${PANEL_DIAGNOSTIC_ITEM_SELECTOR}:hover`]: {
      backgroundColor: HDS_CODE_EDITOR_COLOR_SURFACE_FAINT,
    },
    '.cm-panel.cm-panel-lint ul:focus li.cm-diagnostic[aria-selected]': {
      background: 'none',
      backgroundColor: 'var(--token-color-palette-neutral-700)',
      border: `4px solid ${HDS_CODE_EDITOR_COLOR_FOCUS_ACTION_EXTERNAL}`,
      boxShadow: `inset 0 0 0 1px ${HDS_CODE_EDITOR_COLOR_FOCUS_ACTION_INTERNAL}`,
      color: 'var(--token-color-foreground-high-contrast)',
    },
    '.cm-panels-bottom .cm-panel.cm-panel-lint': {
      borderTop: `3px solid var(--token-color-palette-neutral-500)`,
    },
    '.cm-diagnostic': {
      borderLeft: 'none',
    },
    '.cm-diagnosticText-inner': {
      alignItems: 'center',
      display: 'flex',
      gap: '16px',
    },
    '.cm-diagnosticText-inner .cm-lint-marker-error': {
      width: '16px',
      height: '16px',
      padding: '0',
    },
    // linter diagnostics panel close button
    [`${CLOSE_BUTTON_SELECTOR}`]: {
      alignItems: 'center',
      borderRadius: 'var(--token-border-radius-small)',
      color: 'var(--token-color-palette-neutral-300)',
      cursor: 'pointer',
      display: 'flex',
      fontFamily: 'var(--token-typography-body-100-font-family)',
      fontSize: '20px',
      height: '20px',
      lineHeight: '20px',
      paddingBottom: '3px',
      justifyContent: 'center',
      right: '22px',
      top: '6px',
      width: '20px',
    },
    [`${CLOSE_BUTTON_SELECTOR}:hover, ${CLOSE_BUTTON_SELECTOR}:active, ${CLOSE_BUTTON_SELECTOR}:focus`]:
      {
        backgroundColor: HDS_CODE_EDITOR_COLOR_SURFACE_INTERACTIVE_ACTIVE,
        border: '1px solid transparent',
        color: 'var(--token-color-palette-neutral-400)',
      },
    [`${CLOSE_BUTTON_SELECTOR}:focus`]: {
      borderColor: 'var(--token-color-focus-action-internal)',
      outline: `3px solid var(--token-color-focus-action-external)`,
    },

    // tooltips
    '.cm-tooltip': {
      backgroundColor: 'var(--token-color-palette-neutral-600)',
      borderRadius: 'var(--token-border-radius-small)',
      color: 'var(--token-color-foreground-high-contrast)',
      fontFamily: 'var(--token-typography-body-100-font-family)',
      fontSize: '13px',
      padding: '8px 12px',
    },
    '.cm-tooltip-above': {
      transform: 'translateX(-4px) translateY(-6px)',
    },
    '.cm-tooltip-below': {
      transform: 'translateX(-4px) translateY(6px)',
    },
    // tooltips arrow
    '.cm-tooltip::before': {
      borderLeft: '8px solid transparent',
      borderRight: '8px solid transparent',
      content: '""',
      left: '16px',
      position: 'absolute',
      transform: 'translateX(-50%)',
    },
    '.cm-tooltip-above::before': {
      borderTop: `8px solid var(--token-color-palette-neutral-600)`,
      bottom: '-8px',
    },
    '.cm-tooltip-below::before': {
      borderBottom: `8px solid var(--token-color-palette-neutral-600)`,
      top: '-8px',
    },
    // only show the marker within the diagnostics panel
    '.cm-tooltip .cm-lint-marker-error': {
      display: 'none',
    },
  },
  { dark: true }
);

export default hdsDark;
