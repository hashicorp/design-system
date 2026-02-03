/**
 * TODOs
 * - Make sure that updating @columns updates this.columnOrder
 * - Make sure that removed keys are no longer tracked
 */

/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { fn, hash } from '@ember/helper';
import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';
import { TrackedMap } from 'tracked-built-ins';
import { HdsAdvancedTableColumnReorderSideValues } from './types.ts';
import { isPixelSize, pixelToNumber } from './utils.ts';

import type {
  HdsAdvancedTableColumn,
  HdsAdvancedTableColumnReorderCallback,
  HdsAdvancedTableColumnReorderSide,
  HdsAdvancedTablePixelString,
} from './types';
import type { HdsAdvancedTableSignature } from './index.ts';
import type Owner from '@ember/owner';
import type { ModifierLike } from '@glint/template';

export const DEFAULT_WIDTH = '1fr'; // default to '1fr' to allow flexible width
export const DEFAULT_MIN_WIDTH = '150px';
export const DEFAULT_MAX_WIDTH = '800px';

type HdsAdvancedTableColumnWidth = HdsAdvancedTableColumn['width'];

export interface HdsAdvancedTableSyncThElementsSignature {
  Element: HTMLDivElement;
  Args: {
    Positional: [HdsAdvancedTableColumn['key']];
  };
}

export interface HdsAdvancedTableSyncWidthValuesSignature {
  Element: HTMLDivElement;
  Args: {
    Positional: [HdsAdvancedTableColumnManagerSignature['Args']['columns']];
  };
}

export interface HdsAdvancedTableColumnManagerSignature {
  Args: {
    columns: HdsAdvancedTableColumn[];
    columnOrder: HdsAdvancedTableSignature['Args']['columnOrder'];
    hasReorderableColumns?: HdsAdvancedTableSignature['Args']['hasReorderableColumns'];
    hasStickyFirstColumn?: HdsAdvancedTableSignature['Args']['hasStickyFirstColumn'];
    isSelectable?: HdsAdvancedTableSignature['Args']['isSelectable'];
    onColumnReorder: HdsAdvancedTableSignature['Args']['onColumnReorder'];
  };
  Blocks: {
    default: [
      {
        columns: HdsAdvancedTableColumn[];
        columnOrder: HdsAdvancedTableSignature['Args']['columnOrder'];
        draggedColumnKey: HdsAdvancedTableColumn['key'] | undefined;
        firstColumnKey: HdsAdvancedTableColumn['key'] | undefined;
        gridTemplateColumns: string;
        lastColumnKey: HdsAdvancedTableColumn['key'] | undefined;
        orderedColumns: HdsAdvancedTableColumn[];
        reorderHoveredColumnKey: HdsAdvancedTableColumn['key'] | undefined;
        syncThElements: ModifierLike<HdsAdvancedTableSyncThElementsSignature>;
        syncWidthValues: ModifierLike<HdsAdvancedTableSyncWidthValuesSignature>;
        applyTransientWidth: (columnKey: HdsAdvancedTableColumn['key']) => void;
        getAppliedWidth: (
          columnKey: HdsAdvancedTableColumn['key']
        ) => HdsAdvancedTableColumn['width'];
        getColumnByKey: (
          columnKey: HdsAdvancedTableColumn['key']
        ) => HdsAdvancedTableColumn | undefined;
        getIsStickyColumn: (
          columnKey: HdsAdvancedTableColumn['key']
        ) => boolean | undefined;
        getSiblingColumnKeys: (columnKey: HdsAdvancedTableColumn['key']) => {
          previous?: HdsAdvancedTableColumn['key'];
          next?: HdsAdvancedTableColumn['key'];
        };
        moveColumnToDropTarget: (
          columnKey: HdsAdvancedTableColumn['key'],
          side: HdsAdvancedTableColumnReorderSide
        ) => void;
        moveColumnToTarget: (
          columnKey: HdsAdvancedTableColumn['key'],
          targetColumnKey: HdsAdvancedTableColumn['key'],
          side: HdsAdvancedTableColumnReorderSide
        ) => void;
        moveColumnToTerminalPosition: (
          columnKey: HdsAdvancedTableColumn['key'],
          position: 'start' | 'end'
        ) => void;
        restoreColumnWidth: (columnKey: HdsAdvancedTableColumn['key']) => void;
        setDraggedColumnKey: (columnKey: HdsAdvancedTableColumn['key']) => void;
        setReorderHoveredColumnKey: (
          key: HdsAdvancedTableColumn['key']
        ) => void;
        setTransientColumnWidths: (options: { roundValues?: boolean }) => void;
        setTransientColumnWidth: (
          columnKey: HdsAdvancedTableColumn['key'],
          width: `${number}px`,
          clamped?: boolean
        ) => void;
        resetTransientColumnWidths: () => void;
        stepColumn: (
          columnKey: HdsAdvancedTableColumn['key'],
          step: number
        ) => void;
        updateResizeDebt: (
          columnKey: HdsAdvancedTableColumn['key'],
          delta: number
        ) => void;
      },
    ];
  };
}

export default class HdsAdvancedTableColumnManager extends Component<HdsAdvancedTableColumnManagerSignature> {
  @tracked _columnOrder: string[] = [];

  @tracked draggedColumnKey?: HdsAdvancedTableColumn['key'];
  @tracked reorderHoveredColumnKey?: HdsAdvancedTableColumn['key'];

  // tracking th elements by column key
  thElements = new TrackedMap<string, HTMLDivElement>();

  // width tracking
  columnWidths = new TrackedMap<string, HdsAdvancedTableColumnWidth>();
  originalColumnWidths = new TrackedMap<string, HdsAdvancedTableColumnWidth>();
  transientColumnWidths = new TrackedMap<string, HdsAdvancedTablePixelString>();

  // debt tracking: key -> { lenderKey -> amount }
  columnDebts = new TrackedMap<string, Record<string, number>>();

  constructor(
    owner: Owner,
    args: HdsAdvancedTableColumnManagerSignature['Args']
  ) {
    super(owner, args);

    const { columnOrder, columns, hasReorderableColumns } = args;

    if (hasReorderableColumns) {
      assert(
        'All columns must have a key when reordering is enabled',
        columns.every((column) => column.key !== undefined)
      );

      if (columnOrder === undefined || columnOrder.length === 0) {
        this._columnOrder = columns.map((column) => column.key!);
      } else {
        this._columnOrder = columnOrder;
      }
    }
  }

  get columnOrder(): string[] {
    return this.args.columnOrder ?? this._columnOrder;
  }
  set columnOrder(value: string[]) {
    this._columnOrder = value;
  }

  get orderedColumns(): HdsAdvancedTableColumn[] {
    const { columns, hasReorderableColumns } = this.args;

    if (hasReorderableColumns && this.columnOrder !== undefined) {
      return this.columnOrder.reduce<HdsAdvancedTableColumn[]>((acc, key) => {
        const column = this.getColumnByKey(key);

        if (column !== undefined) {
          acc.push(column);
        }

        return acc;
      }, []);
    } else {
      return columns;
    }
  }

  get firstColumnKey(): HdsAdvancedTableColumn['key'] | undefined {
    const firstColumn = this.orderedColumns[0];

    return firstColumn?.key;
  }

  get lastColumnKey(): HdsAdvancedTableColumn['key'] | undefined {
    const lastColumn = this.orderedColumns[this.orderedColumns.length - 1];

    return lastColumn?.key;
  }

  get gridTemplateColumns(): string {
    const { isSelectable } = this.args;

    let style = isSelectable ? 'min-content ' : '';

    for (const col of this.args.columns) {
      if (col.key === undefined) {
        continue;
      }

      const appliedWidth = this.getAppliedWidth(col.key);

      style += ` ${appliedWidth}`;
    }

    return style;
  }

  getColumnByKey(
    key: HdsAdvancedTableColumn['key']
  ): HdsAdvancedTableColumn | undefined {
    if (key === undefined) {
      return;
    }

    return this.args.columns.find((column) => column.key === key);
  }

  moveColumnToTerminalPosition = (
    columnKey: HdsAdvancedTableColumn['key'],
    position: 'start' | 'end'
  ): void => {
    if (columnKey === undefined) {
      return;
    }

    let targetColumnKey: HdsAdvancedTableColumn['key'];
    let side: HdsAdvancedTableColumnReorderSide;

    const firstColumn = this.orderedColumns[0];
    const lastColumn = this.orderedColumns[this.orderedColumns.length - 1];

    if (firstColumn === undefined || lastColumn === undefined) {
      return;
    }

    if (position === 'start') {
      targetColumnKey = firstColumn.key!;
      side = HdsAdvancedTableColumnReorderSideValues.Left;
    } else {
      targetColumnKey = lastColumn.key!;
      side = HdsAdvancedTableColumnReorderSideValues.Right;
    }

    if (targetColumnKey === undefined) {
      return;
    }

    // Move the column to the target position
    this.moveColumnToTarget(columnKey, targetColumnKey, side);
  };

  stepColumn = (
    columnKey: HdsAdvancedTableColumn['key'],
    step: number
  ): void => {
    if (columnKey === undefined) {
      return;
    }

    const oldIndex = this.columnOrder.indexOf(columnKey);
    const newIndex = oldIndex + step;

    // Check if the new position is within the array bounds.
    if (newIndex < 0 || newIndex >= this.columnOrder.length) {
      return;
    }

    const targetColumnKey = this.columnOrder[newIndex];

    if (targetColumnKey === undefined) {
      return;
    }

    // Determine the side based on the step direction.
    const side: HdsAdvancedTableColumnReorderSide =
      step > 0
        ? HdsAdvancedTableColumnReorderSideValues.Right
        : HdsAdvancedTableColumnReorderSideValues.Left;

    this.moveColumnToTarget(columnKey, targetColumnKey, side);
  };

  moveColumnToDropTarget = (
    targetColumnKey: HdsAdvancedTableColumn['key'],
    side: HdsAdvancedTableColumnReorderSide
  ): void => {
    const sourceColumnKey = this.draggedColumnKey;

    if (
      sourceColumnKey === undefined ||
      targetColumnKey === undefined ||
      sourceColumnKey === targetColumnKey
    ) {
      return;
    }

    this.moveColumnToTarget(sourceColumnKey, targetColumnKey, side);
  };

  moveColumnToTarget = (
    sourceColumnKey: HdsAdvancedTableColumn['key'],
    targetColumnKey: HdsAdvancedTableColumn['key'],
    side: HdsAdvancedTableColumnReorderSide
  ): void => {
    if (sourceColumnKey === undefined || targetColumnKey === undefined) {
      return;
    }

    const oldIndex = this.columnOrder.indexOf(sourceColumnKey);
    const newIndex = this.columnOrder.indexOf(targetColumnKey);

    if (oldIndex !== -1 && newIndex !== -1) {
      const updated = [...this.columnOrder];

      updated.splice(oldIndex, 1); // Remove from old position

      // Calculate the insertion index based on the side
      // If dropping to the right of the target, insert after the target
      // If dropping to the left of the target, insert before the target
      // Adjust for the shift in indices caused by removing the source column
      const adjustedIndex =
        side === HdsAdvancedTableColumnReorderSideValues.Right
          ? newIndex > oldIndex
            ? newIndex
            : newIndex + 1
          : newIndex > oldIndex
            ? newIndex - 1
            : newIndex;

      updated.splice(adjustedIndex, 0, sourceColumnKey); // Insert at new position

      this.columnOrder = updated;

      // we need to wait until the reposition has finished
      requestAnimationFrame(() => {
        const thElement = this.thElements.get(sourceColumnKey);

        if (thElement === undefined) {
          return;
        }

        thElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });

        this.draggedColumnKey = undefined;

        const column = this.getColumnByKey(sourceColumnKey);

        assert('No column found with that key', column !== undefined);

        this.setColumnOrder({
          column,
          newOrder: updated,
          insertedAt: updated.indexOf(sourceColumnKey),
        });
      });
    }
  };

  setColumnOrder: HdsAdvancedTableColumnReorderCallback = ({
    column,
    newOrder,
    insertedAt,
  }) => {
    const { onColumnReorder } = this.args;

    this.columnOrder = newOrder;

    onColumnReorder?.({ column, newOrder, insertedAt });
  };

  // width debt management

  // // utils
  private _getPxWidth(key: string): number {
    const width = this.columnWidths.get(key);

    if (width !== undefined && isPixelSize(width)) {
      return pixelToNumber(width as `${number}px`);
    } else {
      return this.thElements.get(key)?.offsetWidth ?? 0;
    }
  }

  private _getPxMinWidth(key: string): number {
    const column = this.getColumnByKey(key);
    const minWidth = column?.minWidth ?? DEFAULT_MIN_WIDTH;

    return isPixelSize(minWidth) ? pixelToNumber(minWidth) : 0;
  }

  updateResizeDebt = (
    columnKey: HdsAdvancedTableColumn['key'],
    delta: number
  ): void => {
    if (delta === 0 || columnKey === undefined) {
      return;
    }

    const { next: nextColumnKey } = this.getSiblingColumnKeys(columnKey);

    if (nextColumnKey === undefined) {
      return;
    }

    // determine borrower and lender
    const borrowerKey = delta > 0 ? columnKey : nextColumnKey;
    const lenderKey = delta > 0 ? nextColumnKey : columnKey;
    let amount = Math.abs(delta);

    // check if lender has existing debt to borrower
    const lenderDebts = this.columnDebts.get(lenderKey) ?? {};
    const existingDebt = lenderDebts[borrowerKey] ?? 0;

    if (existingDebt > 0) {
      const paymentAmount = Math.min(amount, existingDebt);
      const newDebt = existingDebt - paymentAmount;

      const updatedDebts = { ...lenderDebts };

      if (newDebt <= 0) {
        delete updatedDebts[borrowerKey];
      } else {
        updatedDebts[borrowerKey] = newDebt;
      }

      this.columnDebts.set(lenderKey, updatedDebts);

      amount = amount - paymentAmount;
    }

    // if amount remains, create new debt
    if (amount > 0) {
      const borrowerDebts = this.columnDebts.get(borrowerKey) ?? {};

      this.columnDebts.set(borrowerKey, {
        ...borrowerDebts,
        [lenderKey]: (borrowerDebts[lenderKey] ?? 0) + amount,
      });
    }
  };

  // restores a column to its original width, settling all debts first
  restoreColumnWidth = (columnKey: HdsAdvancedTableColumn['key']): void => {
    if (columnKey === undefined) {
      return;
    }

    // settle debts (collect from debtors, pay lenders)
    this._settleWidthDebts(columnKey);

    // restore original width
    const originalWidth = this.originalColumnWidths.get(columnKey);

    if (originalWidth) {
      this.columnWidths.set(columnKey, originalWidth);
      this.transientColumnWidths.delete(columnKey);
    }
  };

  private _settleWidthDebts(key: string): void {
    this._collectWidthDebts(key);
    this._payWidthDebts(key);
  }

  private _collectWidthDebts(collectorKey: string): void {
    // iterate over all known columns to see if they owe the collector
    this.columnOrder.forEach((debtorKey) => {
      if (debtorKey === collectorKey) {
        return;
      }

      const debtorDebts = this.columnDebts.get(debtorKey);
      const debtToCollect = debtorDebts?.[collectorKey] ?? 0;

      if (debtToCollect <= 0) {
        return;
      }

      // attempt to source funds from the debtor
      const amountPaid = this._sourceFundsForPayment(debtorKey, debtToCollect);

      if (amountPaid > 0) {
        // add funds to collector
        const currentCollectorWidth = this._getPxWidth(collectorKey);

        this.columnWidths.set(
          collectorKey,
          `${currentCollectorWidth + amountPaid}px`
        );
        this.transientColumnWidths.delete(collectorKey);

        // update debtors ledger
        const remainingDebt = debtToCollect - amountPaid;
        const currentDebts = this.columnDebts.get(debtorKey) ?? {};
        const updatedDebts = { ...currentDebts };

        if (remainingDebt > 0) {
          updatedDebts[collectorKey] = remainingDebt;
        } else {
          delete updatedDebts[collectorKey];
        }

        this.columnDebts.set(debtorKey, updatedDebts);
      }
    });
  }

  private _payWidthDebts(payerKey: string): void {
    const debts = this.columnDebts.get(payerKey);

    if (debts === undefined) {
      return;
    }

    Object.entries(debts).forEach(([lenderKey, amount]) => {
      // give width back to lender
      const currentLenderWidth = this._getPxWidth(lenderKey);

      this.columnWidths.set(lenderKey, `${currentLenderWidth + amount}px`);
      this.transientColumnWidths.delete(lenderKey);
    });

    // lear payers debts
    this.columnDebts.delete(payerKey);
  }

  private _sourceFundsForPayment(key: string, amountNeeded: number): number {
    let fundsSourced = 0;

    // preferentially source width from our own surplus first
    const currentWidth = this._getPxWidth(key);
    const minWidth = this._getPxMinWidth(key);
    const surplus = Math.max(0, currentWidth - minWidth);
    const paymentFromSurplus = Math.min(amountNeeded, surplus);

    if (paymentFromSurplus > 0) {
      this.columnWidths.set(key, `${currentWidth - paymentFromSurplus}px`);
      this.transientColumnWidths.delete(key);

      fundsSourced = fundsSourced + paymentFromSurplus;
    }

    // if shortfall, source from our debtors (recursive)
    const shortfall = amountNeeded - fundsSourced;

    if (shortfall > 0) {
      // find who owes this column (key)
      const ourDebtors = this.columnOrder.filter((debtorKey) => {
        const debtorDebts = this.columnDebts.get(debtorKey);

        return debtorDebts && debtorDebts[key] && debtorDebts[key] > 0;
      });

      for (const subDebtorKey of ourDebtors) {
        const amountStillNeeded = amountNeeded - fundsSourced;

        if (amountStillNeeded <= 0) {
          break;
        }

        const subDebtorDebts = this.columnDebts.get(subDebtorKey)!;
        const subDebtOwed = subDebtorDebts[key] ?? 0;
        const amountToRequest = Math.min(amountStillNeeded, subDebtOwed);

        const collectedFromSubDebtor = this._sourceFundsForPayment(
          subDebtorKey,
          amountToRequest
        );

        if (collectedFromSubDebtor > 0) {
          fundsSourced = fundsSourced + collectedFromSubDebtor;

          // update sub-debtor ledger
          const remaining = subDebtOwed - collectedFromSubDebtor;
          const updatedSubDebts = { ...subDebtorDebts };

          if (remaining > 0) {
            updatedSubDebts[key] = remaining;
          } else {
            delete updatedSubDebts[key];
          }

          this.columnDebts.set(subDebtorKey, updatedSubDebts);
        }
      }
    }

    return fundsSourced;
  }

  // pure width functions
  applyTransientWidth = (columnKey: HdsAdvancedTableColumn['key']) => {
    if (columnKey == undefined) {
      return;
    }

    const transientWidth = this.transientColumnWidths.get(columnKey);

    this.columnWidths.set(columnKey, transientWidth);
  };

  setTransientColumnWidths = (
    options: { roundValues?: boolean } = {}
  ): void => {
    const roundValues = options.roundValues ?? false;

    this.columnWidths.forEach((width, key) => {
      let _width: number;

      if (width !== undefined && isPixelSize(width)) {
        _width = pixelToNumber(width as `${number}px`);
      } else {
        _width = this.thElements.get(key)?.offsetWidth ?? 0;
      }

      this.transientColumnWidths.set(
        key,
        `${roundValues ? Math.round(_width) : _width}px`
      );
    });
  };

  resetTransientColumnWidths = (): void => {
    this.transientColumnWidths.clear();
  };

  setTransientColumnWidth = (
    columnKey: HdsAdvancedTableColumn['key'],
    width: `${number}px`,
    clamped: boolean = true
  ): void => {
    if (columnKey === undefined) {
      return;
    }

    const column = this.getColumnByKey(columnKey);

    if (column === undefined) {
      return;
    }

    if (clamped) {
      const { minWidth, maxWidth } = column;

      const minWidthInPixels =
        minWidth === undefined ? 1 : pixelToNumber(minWidth);
      const maxWidthInPixels =
        maxWidth === undefined ? Infinity : pixelToNumber(maxWidth);

      const transientColumnWidthInPixels = Math.min(
        Math.max(pixelToNumber(width), minWidthInPixels),
        maxWidthInPixels
      );

      this.transientColumnWidths.set(
        columnKey,
        `${transientColumnWidthInPixels}px`
      );
    } else {
      this.transientColumnWidths.set(columnKey, width);
    }
  };

  getSiblingColumnKeys = (
    columnKey: HdsAdvancedTableColumn['key']
  ): {
    previous?: HdsAdvancedTableColumn['key'];
    next?: HdsAdvancedTableColumn['key'];
  } => {
    if (columnKey === undefined) {
      return {};
    }

    const columnIndex = this.columnOrder.indexOf(columnKey);

    if (columnIndex === -1) {
      return {};
    }

    return {
      previous:
        columnIndex === 0 ? undefined : this.columnOrder[columnIndex - 1],
      next:
        columnIndex === this.columnOrder.length - 1
          ? undefined
          : this.columnOrder[columnIndex + 1],
    };
  };

  getAppliedWidth = (
    columnKey: HdsAdvancedTableColumn['key']
  ): HdsAdvancedTableColumn['width'] => {
    if (columnKey === undefined) {
      return '0px';
    }

    const width = this.columnWidths.get(columnKey);
    const transientWidth = this.transientColumnWidths.get(columnKey);

    return transientWidth ?? width ?? '0px';
  };

  getIsStickyColumn = (
    columnKey: HdsAdvancedTableColumn['key']
  ): boolean | undefined => {
    const { hasStickyFirstColumn } = this.args;

    if (
      columnKey !== undefined &&
      columnKey === this.firstColumnKey &&
      hasStickyFirstColumn !== undefined
    ) {
      return hasStickyFirstColumn;
    }

    return undefined;
  };
  // end width functions

  syncThElements = modifier<HdsAdvancedTableSyncThElementsSignature>(
    (element, [key]) => {
      if (key !== undefined) {
        this.thElements.set(key, element);
      }
    }
  );

  syncWidthValues = modifier<HdsAdvancedTableSyncWidthValuesSignature>(
    (_element, [columns]) => {
      for (const column of columns) {
        if (column.key !== undefined) {
          this.columnWidths.set(column.key, column.width ?? DEFAULT_WIDTH);
          this.originalColumnWidths.set(column.key, column.width);
        }
      }
    }
  );

  <template>
    {{yield
      (hash
        columns=@columns
        columnOrder=this.columnOrder
        draggedColumnKey=this.draggedColumnKey
        firstColumnKey=this.firstColumnKey
        gridTemplateColumns=this.gridTemplateColumns
        lastColumnKey=this.lastColumnKey
        orderedColumns=this.orderedColumns
        syncThElements=this.syncThElements
        syncWidthValues=this.syncWidthValues
        applyTransientWidth=this.applyTransientWidth
        getAppliedWidth=this.getAppliedWidth
        getColumnByKey=this.getColumnByKey
        getSiblingColumnKeys=this.getSiblingColumnKeys
        getIsStickyColumn=this.getIsStickyColumn
        reorderHoveredColumnKey=this.reorderHoveredColumnKey
        restoreColumnWidth=this.restoreColumnWidth
        moveColumnToDropTarget=this.moveColumnToDropTarget
        moveColumnToTarget=this.moveColumnToTarget
        moveColumnToTerminalPosition=this.moveColumnToTerminalPosition
        setTransientColumnWidths=this.setTransientColumnWidths
        setTransientColumnWidth=this.setTransientColumnWidth
        resetTransientColumnWidths=this.resetTransientColumnWidths
        stepColumn=this.stepColumn
        setDraggedColumnKey=(fn (mut this.draggedColumnKey))
        setReorderHoveredColumnKey=(fn (mut this.reorderHoveredColumnKey))
        updateResizeDebt=this.updateResizeDebt
      )
    }}
  </template>
}
