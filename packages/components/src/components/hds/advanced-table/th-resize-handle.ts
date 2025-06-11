/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { modifier } from 'ember-modifier';

import type HdsAdvancedTableColumn from './models/column';
import type { HdsAdvancedTableSignature } from '.';

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
    nextColumn?: HdsAdvancedTableColumn;
    hasResizableColumns: HdsAdvancedTableSignature['Args']['hasResizableColumns'];
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

  private handleElement!: HdsAdvancedTableThResizeHandleSignature['Element'];
  private boundResize: (event: PointerEvent) => void;
  private boundStopResize: () => void;

  private registerHandleElement = modifier(
    (element: HdsAdvancedTableThResizeHandleSignature['Element']) => {
      this.handleElement = element;
    }
  );

  constructor(
    owner: unknown,
    args: HdsAdvancedTableThResizeHandleSignature['Args']
  ) {
    super(owner, args);

    this.boundResize = this._resize.bind(this);
    this.boundStopResize = this._stopResize.bind(this);
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
  handleKeydown(event: KeyboardEvent): void {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const { column, nextColumn } = this.args;

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

    this.handleElement.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    });
  }

  @action
  startResize(event: PointerEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const { column, nextColumn } = this.args;

    this.resizing = {
      startX: event.clientX,
      startColumnPxWidth: column.pxWidth ?? 0,
      startNextColumnPxWidth: nextColumn?.pxWidth ?? 0,
    };

    window.addEventListener('pointermove', this.boundResize);
    window.addEventListener('pointerup', this.boundStopResize);
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
    } else {
      column.setPxWidth(startColumnPxWidth + deltaX);
    }
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

    this._applyResizeDelta(
      deltaX,
      column,
      startColumnPxWidth, // Width at the start of the drag
      nextColumn,
      startNextColumnPxWidth // Width of next col at the start of the drag
    );
  }

  private _stopResize(): void {
    window.removeEventListener('pointermove', this.boundResize);
    window.removeEventListener('pointerup', this.boundStopResize);

    this.resizing = null;
  }
}
