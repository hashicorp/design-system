/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { EditorView } from '@codemirror/view';

const CLOSE_BUTTON_SELECTOR = '.cm-panel.cm-panel-lint button[name="close"]';
const PANEL_DIAGNOSTIC_ITEM_SELECTOR =
  '.cm-panel.cm-panel-lint ul li.cm-diagnostic';

const hdsTheme = EditorView.theme({
  '&': {
    color: 'var(--token-code-block-color-foreground-primary)',
    backgroundColor: 'var(--token-code-block-color-surface-primary)',
    height: '100%',
  },
  '.cm-content': {
    borderLeft: '1px solid var(--token-code-block-color-border-primary)',
    height: '100%',
    padding: '16px 0',
  },
  '.cm-content ::selection': {
    backgroundColor: 'var(--token-code-block-color-palette-green)',
    color: 'var(--token-code-block-color-surface-primary)',
  },
  '.cm-gutters': {
    backgroundColor: 'var(--token-code-block-color-surface-primary)',
    border: 'none',
  },
  '.cm-gutter:first-of-type .cm-gutterElement': {
    borderLeft: '4px solid transparent',
  },
  '.cm-lineNumbers': {
    color: 'var(--token-code-block-color-foreground-primary)',
  },
  '.cm-lineNumbers .cm-gutterElement': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    padding: '0px 16px',
  },
  '.cm-gutterElement.cm-activeLineGutter': {
    backgroundColor: 'var(--token-code-block-color-surface-primary)',
  },
  '&:not(.cm-hasSelection).cm-focused .cm-gutterElement.cm-activeLineGutter': {
    borderColor: 'var(--token-code-block-line-highlight-border-color)',
    backgroundColor: 'var(--token-code-block-line-highlight-surface-color)',
    color: 'var(--token-color-code-block-color-foreground-primary)',
    outline: '1px solid var(--token-code-block-line-highlight-border-color)',
  },
  '.cm-line': {
    padding: '4px 16px',
  },
  '.cm-activeLine': {
    backgroundColor: 'var(--token-code-block-color-surface-primary)',
  },
  '&:not(.cm-hasSelection).cm-focused .cm-activeLine': {
    backgroundColor: 'var(--token-code-block-line-highlight-surface-color)',
    outline: '1px solid var(--token-code-block-line-highlight-border-color)',
  },
  '.cm-matchingBracket': {
    outline: '1px solid var(--token-code-block-color-foreground-primary)',
  },

  // set a minimum height on the editor content when linting is enabled
  '&.cm-lintingEnabled .cm-content': {
    minHeight: '160px',
  },

  // replace the underline svg
  '.cm-lintRange-error': {
    backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="6" height="3">%3Cpath%20d%3D%22m0%202.5%20l2%20-1.5%20l1%200%20l2%201.5%20l1%200%22%20stroke%3D%22${encodeURIComponent('#EF3016')}%22%20fill%3D%22none%22%20stroke-width%3D%22.7%22%2F%3E</svg>')`,
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
    content: `url('data:image/svg+xml,<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.56912 0.752289C8.69045 -0.126408 7.26581 -0.126415 6.38713 0.752272L0.730298 6.40911C-0.148388 7.28779 -0.148379 8.71243 0.730316 9.5911L6.38715 15.2478C7.26583 16.1265 8.69044 16.1265 9.56911 15.2478L15.2258 9.59109C16.1045 8.71241 16.1045 7.2878 15.2258 6.40912L9.56912 0.752289ZM5.21967 5.21955C5.51256 4.92665 5.98744 4.92665 6.28033 5.21955L8 6.93922L9.71967 5.21955C10.0126 4.92665 10.4874 4.92665 10.7803 5.21955C11.0732 5.51244 11.0732 5.98731 10.7803 6.28021L9.06066 7.99988L10.7803 9.71955C11.0732 10.0124 11.0732 10.4873 10.7803 10.7802C10.4874 11.0731 10.0126 11.0731 9.71967 10.7802L8 9.06054L6.28033 10.7802C5.98744 11.0731 5.51256 11.0731 5.21967 10.7802C4.92678 10.4873 4.92678 10.0124 5.21967 9.71955L6.93934 7.99988L5.21967 6.28021C4.92678 5.98731 4.92678 5.51244 5.21967 5.21955Z" fill="${encodeURIComponent('#EF3016')}"/></svg>');`,
  },

  // linter diagnostics panel
  '.cm-panel.cm-panel-lint ul': {
    backgroundColor: 'var(--token-color-palette-neutral-500)',
    maxHeight: '85px',
  },
  [`${PANEL_DIAGNOSTIC_ITEM_SELECTOR}`]: {
    backgroundColor: 'var(--token-code-block-color-surface-primary)',
    border: '4px solid transparent',
    color: 'var(--token-code-block-color-foreground-primary)',
    fontFamily: 'var(--token-typography-body-100-font-family)',
    fontSize: '13px',
    marginBottom: '1px',
    padding: '16px 12px',
  },
  [`${PANEL_DIAGNOSTIC_ITEM_SELECTOR}:last-of-type`]: {
    marginBottom: '0',
  },
  [`${PANEL_DIAGNOSTIC_ITEM_SELECTOR}:hover`]: {
    backgroundColor: 'var(--token-code-block-color-surface-faint)',
  },
  '.cm-panel.cm-panel-lint ul:focus li.cm-diagnostic[aria-selected]': {
    background: 'none',
    backgroundColor: 'var(--token-code-block-color-surface-primary)',
    border: '4px solid var(--token-code-block-color-focus-action-external)',
    boxShadow:
      'inset 0 0 0 1px var(--token-code-block-color-focus-action-internal)',
    color: 'var(--token-code-block-color-foreground-primary)',
  },
  '.cm-panels-bottom': {
    borderTop: 'none',
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
    color: 'var(--token-code-block-color-foreground-faint)',
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
      backgroundColor:
        'var(--token-code-block-color-surface-interactive-active)',
      border: '1px solid transparent',
      color: 'var(--token-code-block-color-foreground-primary)',
    },
  [`${CLOSE_BUTTON_SELECTOR}:focus`]: {
    borderColor: 'var(--token-code-block-color-focus-action-internal)',
    outline: '3px solid var(--token-code-block-color-focus-action-external)',
  },

  // tooltips
  '.cm-tooltip': {
    backgroundColor: 'var(--token-code-block-color-surface-faint)',
    borderRadius: 'var(--token-border-radius-small)',
    color: 'var(--token-code-block-color-foreground-primary)',
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
    borderTop: '8px solid var(--token-code-block-color-surface-faint)',
    bottom: '-8px',
  },
  '.cm-tooltip-below::before': {
    borderBottom: '8px solid var(--token-code-block-color-surface-faint)',
    top: '-8px',
  },
  // only show the marker within the diagnostics panel
  '.cm-tooltip .cm-lint-marker-error': {
    display: 'none',
  },
});

export default hdsTheme;
