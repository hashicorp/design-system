/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { modifier } from 'ember-modifier';
import { requestAnimationFrameWaiter } from './utils.ts';
import { BORDER_WIDTH } from './index.ts';

import type HdsAdvancedTableColumn from './models/column.ts';
import type { HdsAdvancedTableSignature } from './index.ts';

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
  @tracked private _inProgressBorrowedWidth: number = 0;

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

    this._setWidthDebts();

    this.onColumnResize(column.key, column.width);

    this._inProgressBorrowedWidth = 0;

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
    if (event.button !== 0) {
      return;
    }

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

      // set the width for the current column
      this._setColumnWidth(
        column,
        Math.round(startColumnPxWidth + effectiveDelta)
      );

      // the actual new column width may differ from the intended width due to min/max constraints.
      const actualNewColumnWidth = column.pxAppliedWidth ?? startColumnPxWidth;
      const actualAppliedDelta = actualNewColumnWidth - startColumnPxWidth;

      nextColumn.setPxWidth(startNextColumnPxWidth - actualAppliedDelta);

      this._inProgressBorrowedWidth = actualAppliedDelta;
    } else {
      column.setPxTransientWidth(Math.round(startColumnPxWidth + deltaX));
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

      this._isUpdateQueued = false;
    });
  }

  private _stopResize(): void {
    const { column } = this.args;

    window.removeEventListener('pointermove', this._boundResize);
    window.removeEventListener('pointerup', this._boundStopResize);

    this._setWidthDebts();

    // reset the transient width
    column.table.resetTransientColumnWidths();

    this._inProgressBorrowedWidth = 0;
    this.resizing = null;
    this._transientDelta = 0;

    this.onColumnResize(column.key, column.appliedWidth);
  }

  private _setWidthDebts(): void {
    const { column } = this.args;
    const { next: nextColumn } = column.siblings;

    if (nextColumn !== undefined && nextColumn.key !== undefined) {
      column.widthDebts = {
        ...column.widthDebts,
        [nextColumn.key]:
          (column.widthDebts[nextColumn.key] ?? 0) +
          this._inProgressBorrowedWidth,
      };
    }
  }
}
