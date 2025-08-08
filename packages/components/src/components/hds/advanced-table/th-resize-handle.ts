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
    const maxCanExpandNext = nextMax - startNextColW;

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
  // track the width change as it is changing, applied when resizing stops
  @tracked private _tempXDelta: number = 0;

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

  @action
  onColumnResize(key?: string, width?: string): void {
    const { onColumnResize } = this.args;

    if (typeof onColumnResize === 'function' && key !== undefined) {
      onColumnResize(key, width);
    }
  }

  @action
  handleKeydown(event: KeyboardEvent): void {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const { column } = this.args;
    const { next: nextColumn } = column.siblings;

    const currentColumnPxWidth = column.pxWidth;
    const currentNextColumnPxWidth = nextColumn?.pxWidth;

    let deltaX = 0;
    if (event.key === 'ArrowLeft') {
      deltaX = -KEYBOARD_RESIZE_STEP;
    } else if (event.key === 'ArrowRight') {
      deltaX = KEYBOARD_RESIZE_STEP;
    }

    if (deltaX === 0) return;

    this._applyResizeDelta(
      deltaX,
      column,
      currentColumnPxWidth ?? 0, // Current width before keyboard step
      nextColumn,
      currentNextColumnPxWidth ?? 0 // Current next col width before keyboard step
    );

    this._setWidthDebts();

    this.onColumnResize(column.key, column.width);

    this._tempXDelta = 0;

    this._handleElement.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    });
  }

  @action
  startResize(event: PointerEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const { column } = this.args;
    const { next: nextColumn } = column.siblings;

    this.resizing = {
      startX: event.clientX,
      startColumnPxWidth: column.pxWidth ?? 0,
      startNextColumnPxWidth: nextColumn?.pxWidth ?? 0,
    };

    window.addEventListener('pointermove', this._boundResize);
    window.addEventListener('pointerup', this._boundStopResize);
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

      column.setPxWidth(startColumnPxWidth + effectiveDelta);

      // the actual new column width may differ from the intended width due to min/max constraints.
      const actualNewColumnWidth = column.pxWidth ?? startColumnPxWidth;
      const actualAppliedDelta = actualNewColumnWidth - startColumnPxWidth;

      nextColumn.setPxWidth(startNextColumnPxWidth - actualAppliedDelta);

      this._tempXDelta = actualAppliedDelta;
    } else {
      column.setPxWidth(startColumnPxWidth + deltaX);
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

    this.onColumnResize(column.key, column.width);

    this._tempXDelta = 0;
    this.resizing = null;
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
    const delta = this._tempXDelta;

    if (
      delta === 0 ||
      nextColumn === undefined ||
      nextColumn.key === undefined ||
      column.key === undefined
    ) {
      return;
    }

    if (delta > 0) {
      this._addDebt(column, nextColumn.key, delta);
    } else {
      const amountBorrowed = -delta;

      this._addDebt(nextColumn, column.key, amountBorrowed);
    }
  }
}
