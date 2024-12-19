/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { HdsAdvancedTableTdSignature } from './td';
import type { HdsAdvancedTableThSignature } from './th';

const getAllFocusableChildren = (element: HTMLElement): NodeListOf<Element> => {
  return element.querySelectorAll(
    'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'
  );
};

const getParentCell = (element: HTMLElement): Element | null | undefined => {
  const targetParent = element.parentElement;

  if (targetParent) {
    return targetParent.closest(
      '.hds-advanced-table__th, .hds-advanced-table__td'
    );
  }
};

const handleGridCellChildKeyPress = (event: KeyboardEvent): void => {
  const { key, target } = event;

  if (target instanceof HTMLElement) {
    const cell = getParentCell(target);
    if (cell instanceof HTMLElement) {
      const allCellFocusableChildren = Array.from(
        getAllFocusableChildren(cell)
      ) as HTMLElement[];

      if (key === 'Tab') {
        const indexOfTarget = allCellFocusableChildren.indexOf(target);
        let newTarget;

        if (indexOfTarget === 0 && event.shiftKey) {
          event.preventDefault();
          newTarget =
            allCellFocusableChildren[allCellFocusableChildren.length - 1];
        }

        if (indexOfTarget === allCellFocusableChildren.length - 1) {
          event.preventDefault();
          newTarget = allCellFocusableChildren[0];
        }

        if (newTarget) {
          newTarget.focus();
        }
      }

      if (key === 'Escape') {
        cell.setAttribute('tabindex', '0');
        cell.focus();
        for (let i = 0; i < allCellFocusableChildren.length; i++) {
          const child = allCellFocusableChildren[i];
          if (child?.hasAttribute('data-advanced-table-child-focusable')) {
            child.setAttribute('tabindex', '-1');
          }
        }
      }
    }
  }
};

export const didInsertGridCell = (
  cell:
    | HdsAdvancedTableThSignature['Element']
    | HdsAdvancedTableTdSignature['Element']
): void => {
  const focusableChildren = getAllFocusableChildren(cell);

  for (const child of focusableChildren) {
    if (child instanceof HTMLElement) {
      child.setAttribute('tabindex', '-1');
      child.setAttribute('data-advanced-table-child-focusable', '');
      child.addEventListener('keydown', handleGridCellChildKeyPress);
    }
  }

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

export const handleGridCellKeyPress = (event: KeyboardEvent): void => {
  const { key, target } = event;

  const changeActiveCell = (oldCell: HTMLElement, newCell: HTMLElement) => {
    oldCell.setAttribute('tabindex', '-1');
    newCell.setAttribute('tabindex', '0');
    newCell.focus();
  };

  const findNewRow = (
    currentRow: HTMLElement,
    direction: 'ArrowDown' | 'ArrowUp'
  ) => {
    const grid = currentRow.parentElement?.closest('[role="grid"]');
    const allRows = grid?.querySelectorAll('[role="row"]');

    if (allRows) {
      const currentRowIndex = Array.from(allRows).indexOf(currentRow);
      if (direction === 'ArrowDown') return allRows[currentRowIndex + 1];
      else if (direction === 'ArrowUp') return allRows[currentRowIndex - 1];
    }
  };

  if (target instanceof HTMLElement) {
    if (key === 'Enter') {
      const cellFocusableChildren = getAllFocusableChildren(target);

      if (cellFocusableChildren.length > 0) {
        for (let i = 0; i < cellFocusableChildren.length; i++) {
          const child = cellFocusableChildren[i];
          if (child?.hasAttribute('data-advanced-table-child-focusable')) {
            child.setAttribute('tabindex', '0');
          }
        }
        const element = cellFocusableChildren[0] as HTMLElement;
        target.setAttribute('tabindex', '-1');
        element.focus();
      }
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      const nextElement =
        key === 'ArrowRight'
          ? target.nextElementSibling
          : target.previousElementSibling;

      if (nextElement !== null && nextElement instanceof HTMLElement) {
        changeActiveCell(target, nextElement);
      }
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      const currentRow = target.parentElement;

      if (currentRow instanceof HTMLElement) {
        const currentCellIndex = Array.from(currentRow.children).indexOf(
          target
        );
        const nextRow = findNewRow(currentRow, event.key);

        if (nextRow !== null && nextRow instanceof HTMLElement) {
          const nextCell = nextRow.children[currentCellIndex];
          if (nextCell instanceof HTMLElement) {
            changeActiveCell(target, nextCell);
          }
        }
      }
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      if (event.ctrlKey) {
        const table = target.parentElement?.closest('[role="grid"]');
        const allRows = table?.querySelectorAll('[role="row"]');

        if (allRows) {
          const nextRow =
            key === 'Home' ? allRows[0] : allRows[allRows.length - 1];

          if (nextRow) {
            const cellsInNextRow = nextRow.children;
            const nextElement =
              key === 'Home'
                ? cellsInNextRow[0]
                : cellsInNextRow[cellsInNextRow.length - 1];

            if (nextElement && nextElement instanceof HTMLElement) {
              changeActiveCell(target, nextElement);
            }
          }
        }
      } else {
        const currentRow = target.parentElement;

        if (currentRow) {
          const allCells = currentRow.children;
          const nextElement =
            key === 'Home' ? allCells[0] : allCells[allCells.length - 1];

          if (nextElement && nextElement instanceof HTMLElement) {
            changeActiveCell(target, nextElement);
          }
        }
      }
    } else if (event.key === 'PageUp' || event.key === 'PageDown') {
      event.preventDefault();
      const currentRow = target.parentElement;

      if (currentRow instanceof HTMLElement) {
        const currentCellIndex = Array.from(currentRow.children).indexOf(
          target
        );

        const grid = currentRow.parentElement?.closest('[role="grid"]');
        const allRows = grid?.querySelectorAll('[role="row"]');

        if (allRows) {
          const nextRow =
            event.key === 'PageUp' ? allRows[0] : allRows[allRows.length - 1];

          if (nextRow !== null && nextRow instanceof HTMLElement) {
            const nextCell = nextRow.children[currentCellIndex];
            if (nextCell instanceof HTMLElement) {
              changeActiveCell(target, nextCell);
            }
          }
        }
      }
    }
  }
};
