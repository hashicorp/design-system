import { tabbable } from 'tabbable';

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const onFocusTrapDeactivate = cell => {
  const cellTabbableChildren = tabbable(cell);
  for (const child of cellTabbableChildren) {
    child.setAttribute('tabindex', '-1');
  }
  cell.setAttribute('tabindex', '0');
};
const updateTabbableChildren = (cell, isFocusTrapActive) => {
  const cellTabbableChildren = tabbable(cell, {
    displayCheck: 'none'
  });
  for (const child of cellTabbableChildren) {
    if (child instanceof HTMLElement) {
      if (!isFocusTrapActive) {
        child.setAttribute('tabindex', '-1');
      }
      child.setAttribute('data-advanced-table-child-focusable', '');
    }
  }
};
const didInsertGridCell = cell => {
  updateTabbableChildren(cell);
  const currentRow = cell.parentElement;
  if (currentRow?.parentElement?.classList.contains('hds-advanced-table__thead')) {
    const thead = currentRow.parentElement;
    if (thead.children.item(0) === currentRow && currentRow.children.item(0) === cell) {
      cell.setAttribute('tabindex', '0');
    } else {
      cell.setAttribute('tabindex', '-1');
    }
  } else if (currentRow?.parentElement?.classList.contains('hds-advanced-table__tbody')) {
    const grid = currentRow.parentElement?.closest('[role="grid"]');
    const thead = grid?.querySelector('[role="rowgroup"].hds-advanced-table__thead');
    const tbody = grid?.querySelector('[role="rowgroup"].hds-advanced-table__tbody');
    if (thead === null) {
      if (tbody?.children.item(0) === currentRow && currentRow.children.item(0) === cell) {
        cell.setAttribute('tabindex', '0');
      }
    } else {
      cell.setAttribute('tabindex', '-1');
    }
  }
};

export { didInsertGridCell, onFocusTrapDeactivate, updateTabbableChildren };
//# sourceMappingURL=dom-management.js.map
