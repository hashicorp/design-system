// TODO
// did insert
// add escape listener to focusable elements inside cell
// Page Down: Moves focus down an author-determined number of rows, typically scrolling so the bottom row in the currently visible set of rows becomes one of the first visible rows. If focus is in the last row of the grid, focus does not move.
// Page Up: Moves focus up an author-determined number of rows, typically scrolling so the top row in the currently visible set of rows becomes one of the last visible rows. If focus is in the first row of the grid, focus does not move.
// Home: moves focus to the first cell in the row that contains focus.
// End: moves focus to the last cell in the row that contains focus.
// Control + Home: moves focus to the first cell in the first row.
// Control + End: moves focus to the last cell in the last row.

const didInsertGridCell = cell => {
  const currentRow = cell.parentElement;
  if (currentRow?.parentElement?.tagName === 'THEAD') {
    const thead = currentRow.parentElement;
    if (thead.children.item(0) === currentRow && currentRow.children.item(0) === cell) {
      cell.setAttribute('tabindex', '0');
    } else {
      cell.setAttribute('tabindex', '-1');
    }
  } else if (currentRow?.parentElement?.tagName === 'TBODY') {
    const table = currentRow.parentElement.parentElement;
    const thead = table?.querySelector('thead');
    const tbody = table?.querySelector('tbody');
    if (thead === null) {
      if (tbody?.children.item(0) === currentRow && currentRow.children.item(0) === cell) {
        cell.setAttribute('tabindex', '0');
      }
    } else {
      cell.setAttribute('tabindex', '-1');
    }
  }
};
const handleGridCellKeyPress = event => {
  const {
    key,
    target
  } = event;
  const changeActiveCell = (oldCell, newCell) => {
    newCell.setAttribute('tabindex', '0');
    newCell.classList.add('hds-table__td--gridcell-active');
    oldCell.setAttribute('tabindex', '-1');
    oldCell.classList.remove('hds-table__td--gridcell-active');
    newCell.focus();
  };
  if (target instanceof HTMLElement) {
    if (key === 'Enter') {
      const focusableElements = target.querySelectorAll('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusableElements.length === 1) {
        const element = focusableElements[0];
        element.click();
      } else if (focusableElements.length > 1) {
        const element = focusableElements[0];
        element.focus();
      }
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      const nextElement = key === 'ArrowRight' ? target.nextElementSibling : target.previousElementSibling;
      if (nextElement !== null && nextElement instanceof HTMLElement) {
        changeActiveCell(target, nextElement);
      }
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      const currentRow = target.parentElement;
      if (currentRow instanceof HTMLElement) {
        const currentCellIndex = Array.from(currentRow.children).indexOf(target);
        const nextRow = key === 'ArrowDown' ? currentRow.nextElementSibling : currentRow.previousElementSibling;
        if (nextRow !== null && nextRow instanceof HTMLElement) {
          const nextCell = nextRow.children[currentCellIndex];
          if (nextCell instanceof HTMLElement) {
            changeActiveCell(target, nextCell);
          }
        } else {
          if (currentRow?.parentElement?.tagName === 'TBODY') {
            const thead = currentRow?.parentElement?.previousElementSibling;
            const lastTheadRow = thead?.querySelector('tr:last-child');
            const theadCell = lastTheadRow?.children[currentCellIndex];
            if (key === 'ArrowUp' && theadCell instanceof HTMLElement) {
              changeActiveCell(target, theadCell);
            }
          } else if (currentRow?.parentElement?.tagName === 'THEAD') {
            const tbody = currentRow?.parentElement?.nextElementSibling;
            const firstTbodyRow = tbody?.querySelector('tr:first-child');
            const tbodyCell = firstTbodyRow?.children[currentCellIndex];
            if (key === 'ArrowDown' && tbodyCell instanceof HTMLElement) {
              changeActiveCell(target, tbodyCell);
            }
          }
        }
      }
    }
  }
};

export { didInsertGridCell, handleGridCellKeyPress };
//# sourceMappingURL=helpers.js.map
