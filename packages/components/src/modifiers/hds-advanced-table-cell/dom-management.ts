/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { isFocusable, tabbable } from 'tabbable';

export const onFocusTrapDeactivate = (cell: HTMLDivElement) => {
  const cellTabbableChildren = tabbable(cell);

  for (const child of cellTabbableChildren) {
    child.setAttribute('tabindex', '-1');
  }

  cell.setAttribute('tabindex', '0');
};

// whether a click on `target` moves focus, to it or to its closest focusable ancestor
export const isInFocusableElement = (target: EventTarget | null): boolean => {
  for (
    let node = target instanceof Element ? target : null;
    node;
    node = node.parentElement
  ) {
    if (isFocusable(node)) {
      return true;
    }
  }

  return false;
};

export const updateTabbableChildren = (
  cell: HTMLDivElement,
  isFocusTrapActive?: boolean
): void => {
  const cellTabbableChildren = tabbable(cell, { displayCheck: 'none' });

  for (const child of cellTabbableChildren) {
    if (child instanceof HTMLElement) {
      if (!isFocusTrapActive) {
        child.setAttribute('tabindex', '-1');
      }

      child.setAttribute('data-advanced-table-child-focusable', '');
    }
  }
};
