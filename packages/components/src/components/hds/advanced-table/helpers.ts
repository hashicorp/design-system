// TODO
// did insert
// add escape listener to focusable elements inside cell
// Page Down: Moves focus down an author-determined number of rows, typically scrolling so the bottom row in the currently visible set of rows becomes one of the first visible rows. If focus is in the last row of the grid, focus does not move.
// Page Up: Moves focus up an author-determined number of rows, typically scrolling so the top row in the currently visible set of rows becomes one of the last visible rows. If focus is in the first row of the grid, focus does not move.
// Home: moves focus to the first cell in the row that contains focus.
// End: moves focus to the last cell in the row that contains focus.
// Control + Home: moves focus to the first cell in the first row.
// Control + End: moves focus to the last cell in the last row.

import type { HdsAdvancedTableTdSignature } from './td';
import type { HdsAdvancedTableThSignature } from './th';

export const didInsertGridCell = (
  cell:
    | HdsAdvancedTableThSignature['Element']
    | HdsAdvancedTableTdSignature['Element']
): void => {
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
    const table = currentRow.parentElement?.closest('[role="grid"]');
    const thead = table?.querySelector(
      '[role="rowgroup"].hds-advanced-table__thead'
    );
    const tbody = table?.querySelector(
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
    const table = currentRow.parentElement?.closest('[role="grid"]');
    const allRows = table?.querySelectorAll('[role="row"]');

    if (allRows) {
      const currentRowIndex = Array.from(allRows).indexOf(currentRow);
      if (direction === 'ArrowDown') return allRows[currentRowIndex + 1];
      else if (direction === 'ArrowUp') return allRows[currentRowIndex - 1];
    }
  };

  if (target instanceof HTMLElement) {
    if (key === 'Enter') {
      const focusableElements = target.querySelectorAll(
        'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      // if (focusableElements.length === 1) {
      //   const element = focusableElements[0] as HTMLElement;
      //   element.click();
      // } else

      if (focusableElements.length > 0) {
        const element = focusableElements[0] as HTMLElement;
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
    }
  }
};
