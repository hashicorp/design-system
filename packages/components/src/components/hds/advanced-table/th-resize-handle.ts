/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { modifier } from 'ember-modifier';

import type HdsAdvancedTableColumn from './models/column.ts';
import type { HdsAdvancedTableSignature } from './index.ts';

const TABLE_BORDER_WIDTH = 1;
const KEYBOARD_RESIZE_STEP = 10;

function calculateEffectiveDelta(
  deltaX: number,
  col: HdsAdvancedTableColumn,
  startColW: number,
  nextCol: HdsAdvancedTableColumn,
  startNextColW: number
): number {
  const colMin = col.pxMinWidth ?? 0;
  const colMax = col.pxMaxWidth ?? Infinity;
  const nextMin = nextCol.pxMinWidth ?? 0;
  const nextMax = nextCol.pxMaxWidth ?? Infinity;

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
    hasResizableColumns: HdsAdvancedTableSignature['Args']['hasResizableColumns'];
    tableHeight?: number;
    onColumnResize?: HdsAdvancedTableSignature['Args']['onColumnResize'];
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
  @tracked private _transientDelta: number = 0;

  private _handleElement!: HdsAdvancedTableThResizeHandleSignature['Element'];
  private _boundResize: (event: PointerEvent) => void;
  private _boundStopResize: () => void;

  private _registerHandleElement = modifier(
    (element: HdsAdvancedTableThResizeHandleSignature['Element']) => {
      this._handleElement = element;
    }
  );

  constructor(
    owner: unknown,
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

    return `${tableHeight - TABLE_BORDER_WIDTH * 2}px`;
  }

  get classNames(): string {
    const classes = ['hds-advanced-table__th-resize-handle'];

    if (this.resizing !== null) {
      classes.push('hds-advanced-table__th-resize-handle--resizing');
    }

    return classes.join(' ');
  }

  private _applyTransientWidths() {
    const { column } = this.args;
    const { next: nextColumn } = column.siblings;

    column.width = column.appliedWidth;

    if (nextColumn !== undefined) {
      nextColumn.width = nextColumn.appliedWidth;
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

    const { column } = this.args;
    const { next: nextColumn } = column.siblings;

    if (nextColumn === undefined) {
      return;
    }

    column.table.setTransientColumnWidths({ roundValues: true });

    const startColumnPxWidth = Math.round(column.pxAppliedWidth ?? 0);
    const startNextColumnPxWidth = Math.round(nextColumn.pxAppliedWidth ?? 0);
    const deltaX =
      event.key === 'ArrowRight' ? KEYBOARD_RESIZE_STEP : -KEYBOARD_RESIZE_STEP;

    this._applyResizeDelta(
      deltaX,
      column,
      startColumnPxWidth,
      nextColumn,
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
      column.table.resetTransientColumnWidths();
      this._transientDelta = 0;

      this.onColumnResize(column.key, column.width);
    });
  }

  @action
  startResize(event: PointerEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const { column } = this.args;
    const { next: nextColumn } = column.siblings;

    column.table.setTransientColumnWidths();

    this.resizing = {
      startX: event.clientX,
      startColumnPxWidth: Math.round(column.pxAppliedWidth ?? 0),
      startNextColumnPxWidth: Math.round(nextColumn?.pxAppliedWidth ?? 0),
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
    nextColumn?: HdsAdvancedTableColumn,
    startNextColumnPxWidth?: number
  ): void {
    const canResizeNeighbor =
      nextColumn !== undefined && startNextColumnPxWidth !== undefined;

    if (canResizeNeighbor) {
      const effectiveDelta = calculateEffectiveDelta(
        deltaX,
        column,
        startColumnPxWidth,
        nextColumn,
        startNextColumnPxWidth
      );

      this._setColumnWidth(
        column,
        Math.round(startColumnPxWidth + effectiveDelta)
      );

      // the actual new column width may differ from the intended width due to min/max constraints.
      const actualNewColumnWidth = column.pxAppliedWidth ?? startColumnPxWidth;
      const actualAppliedDelta = actualNewColumnWidth - startColumnPxWidth;

      this._setColumnWidth(
        nextColumn,
        Math.round(startNextColumnPxWidth - actualAppliedDelta)
      );

      this._transientDelta = actualAppliedDelta;
    } else {
      column.setPxTransientWidth(Math.round(startColumnPxWidth + deltaX));
    }
  }

  private _resize(event: PointerEvent): void {
    if (this.resizing === null) {
      return;
    }

    event.preventDefault();

    const { column } = this.args;
    const { next: nextColumn } = column.siblings;
    const { startX, startColumnPxWidth, startNextColumnPxWidth } =
      this.resizing;
    const deltaX = event.clientX - startX;

    this._applyResizeDelta(
      deltaX,
      column,
      startColumnPxWidth, // Width at the start of the drag
      nextColumn,
      startNextColumnPxWidth // Width of next col at the start of the drag
    );
  }

  private _stopResize(): void {
    const { column } = this.args;

    window.removeEventListener('pointermove', this._boundResize);
    window.removeEventListener('pointerup', this._boundStopResize);

    this._setWidthDebts();

    this._applyTransientWidths();

    // reset the transient width
    column.table.resetTransientColumnWidths();

    // reset the resizing state
    this.resizing = null;
    this._transientDelta = 0;

    this.onColumnResize(column.key, column.appliedWidth);
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
