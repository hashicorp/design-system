/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { focusable } from 'tabbable';

export const handleGridCellKeyPress = (
  event: KeyboardEvent,
  enableFocusTrap: () => void
): void => {
  const { key, target } = event;

  const changeActiveCell = (oldCell: HTMLElement, newCell: HTMLElement) => {
    oldCell.setAttribute('tabindex', '-1');
    newCell.setAttribute('tabindex', '0');
    newCell.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
    newCell.focus({ preventScroll: true });
  };

  const findNewRow = (
    currentRow: HTMLElement,
    direction: 'ArrowDown' | 'ArrowUp'
  ) => {
    const grid = currentRow.parentElement?.closest('[role="grid"]');
    const allVisibleRows = grid?.querySelectorAll(
      '[role="row"]:not(.hds-advanced-table__tr--hidden)'
    );

    if (allVisibleRows) {
      const currentRowIndex = Array.from(allVisibleRows).indexOf(currentRow);
      if (direction === 'ArrowDown') return allVisibleRows[currentRowIndex + 1];
      else if (direction === 'ArrowUp')
        return allVisibleRows[currentRowIndex - 1];
    }
  };

  if (
    target instanceof HTMLElement &&
    (target.classList.contains('hds-advanced-table__th') ||
      target.classList.contains('hds-advanced-table__td'))
  ) {
    if (key === 'Enter') {
      const cellFocusableChildren = focusable(target);

      if (cellFocusableChildren.length > 0) {
        for (let i = 0; i < cellFocusableChildren.length; i++) {
          const child = cellFocusableChildren[i];
          if (child?.hasAttribute('data-advanced-table-child-focusable')) {
            child.setAttribute('tabindex', '0');
          }
        }
        target.setAttribute('tabindex', '-1');
        enableFocusTrap();
      }
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      const nextElement =
        key === 'ArrowRight'
          ? target.nextElementSibling
          : target.previousElementSibling;

      if (nextElement !== null && nextElement instanceof HTMLElement) {
        changeActiveCell(target, nextElement);
      }
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
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
        const allVisibleRows = table?.querySelectorAll(
          '[role="row"]:not(.hds-advanced-table__tr--hidden)'
        );

        if (allVisibleRows) {
          const nextRow =
            key === 'Home'
              ? allVisibleRows[0]
              : allVisibleRows[allVisibleRows.length - 1];

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
        const allVisibleRows = grid?.querySelectorAll(
          '[role="row"]:not(.hds-advanced-table__tr--hidden)'
        );

        if (allVisibleRows) {
          const nextRow =
            event.key === 'PageUp'
              ? allVisibleRows[0]
              : allVisibleRows[allVisibleRows.length - 1];

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
