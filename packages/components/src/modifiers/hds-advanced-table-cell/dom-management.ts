/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { tabbable } from 'tabbable';

export const onFocusTrapDeactivate = (cell: HTMLDivElement) => {
  const cellTabbableChildren = tabbable(cell);

  for (const child of cellTabbableChildren) {
    child.setAttribute('tabindex', '-1');
  }

  cell.setAttribute('tabindex', '0');
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
