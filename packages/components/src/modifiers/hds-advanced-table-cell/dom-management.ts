/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { tabbable } from 'tabbable';

import type { HdsAdvancedTableTdSignature } from '../../components/hds/advanced-table/td.ts';
import type { HdsAdvancedTableThSignature } from '../../components/hds/advanced-table/th.ts';

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
  const cellTabbableChildren = tabbable(cell);

  for (const child of cellTabbableChildren) {
    if (child instanceof HTMLElement) {
      if (!isFocusTrapActive) {
        child.setAttribute('tabindex', '-1');
      }
      child.setAttribute('data-advanced-table-child-focusable', '');
    }
  }
};

export const didInsertGridCell = (
  cell:
    | HdsAdvancedTableThSignature['Element']
    | HdsAdvancedTableTdSignature['Element']
): void => {
  updateTabbableChildren(cell);

  const currentRow = cell.parentElement;

  if (
    currentRow?.parentElement?.classList.contains('hds-advanced-table__thead')
  ) {
    const thead = currentRow.parentElement;
    if (
      thead.children.item(0) === currentRow &&
      currentRow.children.item(0) === cell
    ) {
      cell.setAttribute('tabindex', '0');
    } else {
      cell.setAttribute('tabindex', '-1');
    }
  } else if (
    currentRow?.parentElement?.classList.contains('hds-advanced-table__tbody')
  ) {
    const grid = currentRow.parentElement?.closest('[role="grid"]');
    const thead = grid?.querySelector(
      '[role="rowgroup"].hds-advanced-table__thead'
    );
    const tbody = grid?.querySelector(
      '[role="rowgroup"].hds-advanced-table__tbody'
    );

    if (thead === null) {
      if (
        tbody?.children.item(0) === currentRow &&
        currentRow.children.item(0) === cell
      ) {
        cell.setAttribute('tabindex', '0');
      }
    } else {
      cell.setAttribute('tabindex', '-1');
    }
  }
};

export const updateLastRowClass = (element: HTMLDivElement) => {
  console.log('in update last row class');
  const previousLastRow = element.querySelectorAll(
    '.hds-advanced-table__tr--last-row'
  );

  console.log(previousLastRow);

  if (previousLastRow) {
    for (let i = 0; i < previousLastRow.length; i++) {
      previousLastRow[i]?.classList.remove('hds-advanced-table__tr--last-row');
    }
  }

  const visibleRows = Array.from(
    element.querySelectorAll(
      '.hds-advanced-table__tr:not(.hds-advanced-table__tr--hidden)'
    )
  );

  console.log(visibleRows);
  if (visibleRows) {
    visibleRows[visibleRows.length - 1]?.classList.add(
      'hds-advanced-table__tr--last-row'
    );
  }
};
