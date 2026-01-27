/** TODO
 * - Try to make sure all of the functions that will always be passed in are not marked as optional. Remove unneeded guards
 */

/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { modifier } from 'ember-modifier';
import { parsePixel, requestAnimationFrameWaiter } from './utils.ts';
import { BORDER_WIDTH } from './index.ts';
import type Owner from '@ember/owner';

import type { HdsAdvancedTableColumn } from './types';
import type { HdsAdvancedTableSignature } from './index.ts';

const KEYBOARD_RESIZE_STEP = 10;

function calculateEffectiveDelta(
  deltaX: number,
  col: HdsAdvancedTableColumn,
  startColW: number,
  nextCol: HdsAdvancedTableColumn,
  startNextColW: number
): number {
  const colMin = parsePixel(col.minWidth) ?? 0;
  const colMax = parsePixel(col.maxWidth) ?? Infinity;
  const nextMin = parsePixel(nextCol.minWidth) ?? 0;
  const nextMax = parsePixel(nextCol.maxWidth) ?? Infinity;

  let effectiveDelta = 0;

  // expanding col, shrinking nextCol
  if (deltaX > 0) {
    const maxCanExpandCol = colMax - startColW;
    const maxCanShrinkNext = startNextColW - nextMin;

    effectiveDelta = Math.min(deltaX, maxCanExpandCol, maxCanShrinkNext);
    effectiveDelta = Math.max(0, effectiveDelta);
  }
  // shrinking col, expanding nextCol
  else if (deltaX < 0) {
    const absDeltaX = -deltaX;
    const maxCanShrinkCol = startColW - colMin;

    let maxCanExpandNext: number;
    if (startNextColW > nextMax) {
      maxCanExpandNext = Infinity;
    } else {
      maxCanExpandNext = nextMax - startNextColW;
    }

    effectiveDelta = -Math.min(absDeltaX, maxCanShrinkCol, maxCanExpandNext);
    effectiveDelta = Math.min(0, effectiveDelta);
  }

  return effectiveDelta;
}

export interface HdsAdvancedTableThResizeHandleSignature {
  Args: {
    column: HdsAdvancedTableColumn;
    siblingColumnKeys?: {
      previous?: HdsAdvancedTableColumn['key'];
      next?: HdsAdvancedTableColumn['key'];
    };
    tableHeight?: number;
    onApplyTransientWidth?: (columnKey: HdsAdvancedTableColumn['key']) => void;
    onColumnResize?: HdsAdvancedTableSignature['Args']['onColumnResize'];
    onGetAppliedWidth?: (
      columnKey: HdsAdvancedTableColumn['key']
    ) => HdsAdvancedTableColumn['width'];
    onGetColumnByKey?: (
      columnKey: HdsAdvancedTableColumn['key']
    ) => HdsAdvancedTableColumn | undefined;
    onSetTransientColumnWidth: (
      columnKey: HdsAdvancedTableColumn['key'],
      width: `${number}px`
    ) => void;
    onSetTransientColumnWidths: (options: { roundValues?: boolean }) => void;
    onResetTransientColumnWidths: () => void;
  };
  Blocks: {
    default?: [];
  };
  Element: HTMLDivElement;
}

export default class HdsAdvancedTableThResizeHandle extends Component<HdsAdvancedTableThResizeHandleSignature> {
  @tracked resizing: {
    startX: number;
    startColumnPxWidth: number;
    startNextColumnPxWidth?: number;
  } | null = null;
  // track the width change as it is changing, applied when resizing stops
  @tracked private _transientDelta: number = 0;
  @tracked private _isUpdateQueued: boolean = false;
  @tracked private _lastPointerEvent: PointerEvent | null = null;

  private _handleElement!: HdsAdvancedTableThResizeHandleSignature['Element'];
  private _boundResize: (event: PointerEvent) => void;
  private _boundStopResize: () => void;

  private _registerHandleElement = modifier(
    (element: HdsAdvancedTableThResizeHandleSignature['Element']) => {
      this._handleElement = element;
    }
  );

  constructor(
    owner: Owner,
    args: HdsAdvancedTableThResizeHandleSignature['Args']
  ) {
    super(owner, args);

    this._boundResize = this._resize.bind(this);
    this._boundStopResize = this._stopResize.bind(this);
  }

  get height(): string | undefined {
    const { tableHeight } = this.args;

    if (tableHeight === undefined) {
      return;
    }

    return `${tableHeight - BORDER_WIDTH * 2}px`;
  }

  get classNames(): string {
    const classes = ['hds-advanced-table__th-resize-handle'];

    if (this.resizing !== null) {
      classes.push('hds-advanced-table__th-resize-handle--resizing');
    }

    return classes.join(' ');
  }

  private _applyTransientWidths() {
    const { column, siblingColumnKeys, onApplyTransientWidth } = this.args;

    if (onApplyTransientWidth === undefined) {
      return;
    }

    const { next: nextColumnKey } = siblingColumnKeys ?? {};

    onApplyTransientWidth(column.key);

    if (nextColumnKey !== undefined) {
      onApplyTransientWidth(nextColumnKey);
    }
  }

  @action
  onColumnResize(key?: string, width?: string): void {
    const { onColumnResize } = this.args;

    if (typeof onColumnResize === 'function' && key !== undefined) {
      onColumnResize(key, width);
    }
  }

  @action
  handleKeydown(event: KeyboardEvent): void {
    const validKeys = ['ArrowLeft', 'ArrowRight'];

    if (!validKeys.includes(event.key)) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const {
      column,
      siblingColumnKeys,
      onGetAppliedWidth,
      onSetTransientColumnWidths,
      onResetTransientColumnWidths,
    } = this.args;
    const { next: nextColumnKey } = siblingColumnKeys ?? {};

    if (nextColumnKey === undefined || onGetAppliedWidth === undefined) {
      return;
    }

    onSetTransientColumnWidths({ roundValues: true });

    const startColumnAppliedWidth = onGetAppliedWidth(column.key);
    const startNextColumnAppliedWidth = onGetAppliedWidth(nextColumnKey);

    const startColumnPxWidth = Math.round(
      parsePixel(startColumnAppliedWidth) ?? 0
    );
    const startNextColumnPxWidth = Math.round(
      parsePixel(startNextColumnAppliedWidth) ?? 0
    );
    const deltaX =
      event.key === 'ArrowRight' ? KEYBOARD_RESIZE_STEP : -KEYBOARD_RESIZE_STEP;

    this._applyResizeDelta(
      deltaX,
      column,
      startColumnPxWidth,
      nextColumnKey,
      startNextColumnPxWidth
    );

    // ensure the resize handle remains visible during keyboard navigation.
    this._handleElement.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    });

    // use a microtask to commit the final state after the render pass.
    queueMicrotask(() => {
      // reset transient values
      this._setWidthDebts();
      this._applyTransientWidths();
      onResetTransientColumnWidths();
      this._transientDelta = 0;

      this.onColumnResize(column.key, column.width);
    });
  }

  @action
  startResize(event: PointerEvent): void {
    if (event.button !== 0) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const {
      column,
      siblingColumnKeys,
      onGetAppliedWidth,
      onSetTransientColumnWidths,
    } = this.args;

    const { next: nextColumnKey } = siblingColumnKeys ?? {};

    if (onGetAppliedWidth === undefined) {
      return;
    }

    onSetTransientColumnWidths({});

    const startColumnAppliedWidth = onGetAppliedWidth(column.key);
    const startNextColumnAppliedWidth = onGetAppliedWidth(nextColumnKey);

    const startColumnPxWidth = Math.round(
      parsePixel(startColumnAppliedWidth) ?? 0
    );
    const startNextColumnPxWidth = Math.round(
      parsePixel(startNextColumnAppliedWidth) ?? 0
    );

    this.resizing = {
      startX: event.clientX,
      startColumnPxWidth,
      startNextColumnPxWidth,
    };

    window.addEventListener('pointermove', this._boundResize);
    window.addEventListener('pointerup', this._boundStopResize);
  }

  private _setColumnWidth(column: HdsAdvancedTableColumn, width: number): void {
    if (width > column.pxMaxWidth || width < column.pxMinWidth) {
      column.pxTransientWidth = width;
    } else {
      column.setPxTransientWidth(width);
    }
  }

  private _applyResizeDelta(
    deltaX: number,
    column: HdsAdvancedTableColumn,
    startColumnPxWidth: number,
    nextColumnKey?: HdsAdvancedTableColumn['key'],
    startNextColumnPxWidth?: number
  ): void {
    const { onGetAppliedWidth, onGetColumnByKey, onSetTransientColumnWidth } =
      this.args;

    if (onGetAppliedWidth === undefined || onGetColumnByKey === undefined) {
      return;
    }

    const canResizeNeighbor =
      nextColumnKey !== undefined && startNextColumnPxWidth !== undefined;

    if (canResizeNeighbor) {
      const nextColumn = onGetColumnByKey(nextColumnKey);

      if (nextColumn === undefined) {
        return;
      }

      const effectiveDelta = calculateEffectiveDelta(
        deltaX,
        column,
        startColumnPxWidth,
        nextColumn,
        startNextColumnPxWidth
      );

      // set the width for the current column
      this._setColumnWidth(
        column,
        Math.round(startColumnPxWidth + effectiveDelta)
      );

      // the actual new column width may differ from the intended width due to min/max constraints.
      const columnAppliedWidth = onGetAppliedWidth(column.key);
      const actualNewColumnWidth =
        parsePixel(columnAppliedWidth) ?? startColumnPxWidth;
      const actualAppliedDelta = actualNewColumnWidth - startColumnPxWidth;

      // set the width for the next sibling column
      this._setColumnWidth(
        nextColumn,
        Math.round(startNextColumnPxWidth - actualAppliedDelta)
      );

      this._transientDelta = actualAppliedDelta;
    } else if (onSetTransientColumnWidth !== undefined) {
      onSetTransientColumnWidth(
        column.key,
        `${Math.round(startColumnPxWidth + deltaX)}px`
      );
    }
  }

  private _resize(event: PointerEvent): void {
    this._lastPointerEvent = event;

    if (this._isUpdateQueued) {
      return;
    }

    this._isUpdateQueued = true;

    requestAnimationFrameWaiter(() => {
      if (this.resizing === null || this._lastPointerEvent === null) {
        this._isUpdateQueued = false;

        return;
      }

      const event = this._lastPointerEvent;

      event.preventDefault();

      const { column, siblingColumnKeys } = this.args;
      const { next: nextColumnKey } = siblingColumnKeys ?? {};
      const { startX, startColumnPxWidth, startNextColumnPxWidth } =
        this.resizing;
      const deltaX = event.clientX - startX;

      this._applyResizeDelta(
        deltaX,
        column,
        startColumnPxWidth, // Width at the start of the drag
        nextColumnKey,
        startNextColumnPxWidth // Width of next col at the start of the drag
      );

      this._isUpdateQueued = false;
    });
  }

  private _stopResize(): void {
    const { column, onGetAppliedWidth, onResetTransientColumnWidths } =
      this.args;

    window.removeEventListener('pointermove', this._boundResize);
    window.removeEventListener('pointerup', this._boundStopResize);

    this._setWidthDebts();

    this._applyTransientWidths();

    // reset the transient width
    onResetTransientColumnWidths();

    // reset the resizing state
    this.resizing = null;
    this._transientDelta = 0;

    const appliedWidth = onGetAppliedWidth?.(column.key);

    this.onColumnResize(column.key, appliedWidth);
  }

  private _addDebt(
    borrower: HdsAdvancedTableColumn,
    lenderKey: string,
    amount: number
  ): void {
    borrower.widthDebts = {
      ...borrower.widthDebts,
      [lenderKey]: (borrower.widthDebts[lenderKey] ?? 0) + amount,
    };
  }

  private _setWidthDebts(): void {
    const { column } = this.args;
    const { next: nextColumn } = column.siblings;
    const delta = this._transientDelta;

    if (
      delta === 0 ||
      nextColumn === undefined ||
      nextColumn.key === undefined ||
      column.key === undefined
    ) {
      return;
    }

    // Determine the borrower, lender, and the amount of width transferred
    const borrower = delta > 0 ? column : nextColumn;
    const lender = delta > 0 ? nextColumn : column;
    let amount = Math.abs(delta);

    if (borrower.key === undefined || lender.key === undefined) {
      return;
    }

    // Check if the lender already has a debt to the borrower.
    // If so, this transaction is a "payment" against that existing debt.
    const existingDebt = lender.widthDebts[borrower.key] ?? 0;

    if (existingDebt > 0) {
      const paymentAmount = Math.min(amount, existingDebt);

      // Reduce the lender's debt by the payment amount
      lender.widthDebts[borrower.key] = existingDebt - paymentAmount;

      if (lender.widthDebts[borrower.key]! <= 0) {
        delete lender.widthDebts[borrower.key];
      }

      // The amount of the new debt is reduced by the amount paid
      amount = amount - paymentAmount;
    }

    // If there is still a remaining amount, create a new debt for the borrower.
    if (amount > 0) {
      this._addDebt(borrower, lender.key, amount);
    }
  }
}
