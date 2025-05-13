/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { assert } from '@ember/debug';

import type HdsAdvancedTableColumn from './models/column';

const TABLE_BORDER_WIDTH = 1;

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
    nextColumn?: HdsAdvancedTableColumn;
    tableHeight?: number;
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

  private boundResize: (event: PointerEvent) => void;
  private boundStopResize: () => void;

  constructor(
    owner: unknown,
    args: HdsAdvancedTableThResizeHandleSignature['Args']
  ) {
    super(owner, args);

    this.boundResize = this._resize.bind(this);
    this.boundStopResize = this._stopResize.bind(this);
  }

  get classNames(): string {
    const classes = ['hds-advanced-table-th-resize-handle'];

    if (this.resizing !== null) {
      classes.push('hds-advanced-table-th-resize-handle--resizing');
    }

    return classes.join(' ');
  }

  @action
  startResize(event: PointerEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const { column, nextColumn } = this.args;

    assert(
      'HdsAdvancedTableThResizeHandle: column pxWidth must be a number to start resize.',
      typeof column.pxWidth === 'number'
    );

    this.resizing = {
      startX: event.clientX,
      startColumnPxWidth: column.pxWidth,
      startNextColumnPxWidth: nextColumn?.pxWidth,
    };

    window.addEventListener('pointermove', this.boundResize);
    window.addEventListener('pointerup', this.boundStopResize);
  }

  private _resize(event: PointerEvent): void {
    if (this.resizing === null) {
      return;
    }

    event.preventDefault();

    const { column, nextColumn } = this.args;
    const { startX, startColumnPxWidth, startNextColumnPxWidth } =
      this.resizing;
    const deltaX = event.clientX - startX;

    const canResizeNeighbor =
      nextColumn !== undefined &&
      nextColumn.isResizable &&
      startNextColumnPxWidth !== undefined;

    if (canResizeNeighbor) {
      const effectiveDelta = calculateEffectiveDelta(
        deltaX,
        column,
        startColumnPxWidth,
        nextColumn, // Known to be valid and resizable here
        startNextColumnPxWidth // Known to be a number here
      );

      column.setPxWidth(startColumnPxWidth + effectiveDelta);

      const actualNewColumnWidth = column.pxWidth ?? startColumnPxWidth;
      const actualAppliedDelta = actualNewColumnWidth - startColumnPxWidth;

      nextColumn.setPxWidth(startNextColumnPxWidth - actualAppliedDelta);
    } else {
      column.setPxWidth(startColumnPxWidth + deltaX);
    }
  }

  private _stopResize(): void {
    window.removeEventListener('pointermove', this.boundResize);
    window.removeEventListener('pointerup', this.boundStopResize);

    this.resizing = null;
  }

  get height(): string | undefined {
    const { tableHeight } = this.args;

    if (tableHeight === undefined) {
      return;
    }

    return `${tableHeight - TABLE_BORDER_WIDTH * 2}px`;
  }
}
