// TODO
// did insert
// add escape listener to focusable elements inside cell

const getAllFocusableChildren = element => {
  return element.querySelectorAll('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
};
const handleGridCellChildKeyPress = event => {
  const {
    key,
    target
  } = event;
  console.log('key', key);
  console.log('target', target);
  if (target instanceof HTMLElement) {
    if (key === 'Escape') {
      const cell = target.closest('hds-advanced-table__th, hds-advanced-table__td');
      console.log(cell);
      if (cell instanceof HTMLElement) {
        cell.setAttribute('tabindex', '0');
        cell.focus();
      }
    }
  }
};
const didInsertGridCell = cell => {
  const focusableChildren = getAllFocusableChildren(cell);
  for (const child of focusableChildren) {
    if (child instanceof HTMLElement) {
      child.setAttribute('tabindex', '-1');
      child.addEventListener('keydown', handleGridCellChildKeyPress);
    }
  }
  const currentRow = cell.parentElement;
  if (currentRow?.parentElement?.classList.contains('hds-advanced-table__thead')) {
    const thead = currentRow.parentElement;
    if (thead.children.item(0) === currentRow && currentRow.children.item(0) === cell) {
      cell.setAttribute('tabindex', '0');
    } else {
      cell.setAttribute('tabindex', '-1');
    }
  } else if (currentRow?.parentElement?.classList.contains('hds-advanced-table__tbody')) {
    const table = currentRow.parentElement?.closest('[role="grid"]');
    const thead = table?.querySelector('[role="rowgroup"].hds-advanced-table__thead');
    const tbody = table?.querySelector('[role="rowgroup"].hds-advanced-table__tbody');
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
    oldCell.setAttribute('tabindex', '-1');
    newCell.setAttribute('tabindex', '0');
    newCell.focus();
  };
  const findNewRow = (currentRow, direction) => {
    const table = currentRow.parentElement?.closest('[role="grid"]');
    const allRows = table?.querySelectorAll('[role="row"]');
    if (allRows) {
      const currentRowIndex = Array.from(allRows).indexOf(currentRow);
      if (direction === 'ArrowDown') return allRows[currentRowIndex + 1];else if (direction === 'ArrowUp') return allRows[currentRowIndex - 1];
    }
  };
  if (target instanceof HTMLElement) {
    if (key === 'Enter') {
      const focusableChildren = getAllFocusableChildren(target);

      // TODO: test this more. if screen reader keeps up with the state of the focusable element, can bring it back.
      // if (focusableChildren.length === 1) {
      //   const element = focusableChildren[0] as HTMLElement;
      //   element.click();
      // } else

      if (focusableChildren.length > 0) {
        const element = focusableChildren[0];
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
          const nextRow = key === 'Home' ? allRows[0] : allRows[allRows.length - 1];
          if (nextRow) {
            const cellsInNextRow = nextRow.children;
            const nextElement = key === 'Home' ? cellsInNextRow[0] : cellsInNextRow[cellsInNextRow.length - 1];
            if (nextElement && nextElement instanceof HTMLElement) {
              changeActiveCell(target, nextElement);
            }
          }
        }
      } else {
        const currentRow = target.parentElement;
        if (currentRow) {
          const allCells = currentRow.children;
          const nextElement = key === 'Home' ? allCells[0] : allCells[allCells.length - 1];
          if (nextElement && nextElement instanceof HTMLElement) {
            changeActiveCell(target, nextElement);
          }
        }
      }
    } else if (event.key === 'PageUp' || event.key === 'PageDown') {
      event.preventDefault();
      const currentRow = target.parentElement;
      if (currentRow instanceof HTMLElement) {
        const currentCellIndex = Array.from(currentRow.children).indexOf(target);
        const table = currentRow.parentElement?.closest('[role="grid"]');
        const allRows = table?.querySelectorAll('[role="row"]');
        if (allRows) {
          const nextRow = event.key === 'PageUp' ? allRows[0] : allRows[allRows.length - 1];
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

export { didInsertGridCell, handleGridCellKeyPress };
//# sourceMappingURL=helpers.js.map
