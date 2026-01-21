/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { focusable } from 'tabbable';
import { hdsKeyboardKey } from '../../utils/hds-keyboard-key.ts';

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

  const findNewRow = (currentRow: HTMLElement, direction: string) => {
    const grid = currentRow.parentElement?.closest('[role="grid"]');
    const allVisibleRows = grid?.querySelectorAll(
      '[role="row"]:not(.hds-advanced-table__tr--hidden)'
    );

    if (allVisibleRows) {
      const currentRowIndex = Array.from(allVisibleRows).indexOf(currentRow);
      if (direction === hdsKeyboardKey['arrowDown'])
        return allVisibleRows[currentRowIndex + 1];
      else if (direction === hdsKeyboardKey['arrowUp'])
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
    } else if (
      event.key === hdsKeyboardKey['arrowRight'] ||
      event.key === hdsKeyboardKey['arrowLeft']
    ) {
      event.preventDefault();
      const nextElement =
        key === hdsKeyboardKey['arrowRight']
          ? target.nextElementSibling
          : target.previousElementSibling;

      if (nextElement !== null && nextElement instanceof HTMLElement) {
        changeActiveCell(target, nextElement);
      }
    } else if (
      event.key === hdsKeyboardKey['arrowDown'] ||
      event.key === hdsKeyboardKey['arrowUp']
    ) {
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
    } else if (
      event.key === hdsKeyboardKey['home'] ||
      event.key === hdsKeyboardKey['end']
    ) {
      event.preventDefault();
      if (event.ctrlKey) {
        const table = target.parentElement?.closest('[role="grid"]');
        const allVisibleRows = table?.querySelectorAll(
          '[role="row"]:not(.hds-advanced-table__tr--hidden)'
        );

        if (allVisibleRows) {
          const nextRow =
            key === hdsKeyboardKey['home']
              ? allVisibleRows[0]
              : allVisibleRows[allVisibleRows.length - 1];

          if (nextRow) {
            const cellsInNextRow = nextRow.children;
            const nextElement =
              key === hdsKeyboardKey['home']
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
            key === hdsKeyboardKey['home']
              ? allCells[0]
              : allCells[allCells.length - 1];

          if (nextElement && nextElement instanceof HTMLElement) {
            changeActiveCell(target, nextElement);
          }
        }
      }
    } else if (
      event.key === hdsKeyboardKey['pageUp'] ||
      event.key === hdsKeyboardKey['pageDown']
    ) {
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
            event.key === hdsKeyboardKey['pageUp']
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
