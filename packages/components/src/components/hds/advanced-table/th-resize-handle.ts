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
import {
  DEFAULT_MIN_WIDTH,
  DEFAULT_MAX_WIDTH,
} from './column-manager/width.gts';

import type Owner from '@ember/owner';
import type { HdsAdvancedTableNormalizedColumn } from './types';
import type { HdsAdvancedTableSignature } from './index.ts';

const KEYBOARD_RESIZE_STEP = 10;

function calculateEffectiveDelta(
  deltaX: number,
  col: HdsAdvancedTableNormalizedColumn,
  startColW: number,
  nextCol: HdsAdvancedTableNormalizedColumn,
  startNextColW: number
): number {
  const colMin = parsePixel(col.minWidth ?? DEFAULT_MIN_WIDTH) ?? 0;
  const colMax = parsePixel(col.maxWidth ?? DEFAULT_MAX_WIDTH) ?? Infinity;
  const nextMin = parsePixel(nextCol.minWidth ?? DEFAULT_MIN_WIDTH) ?? 0;
  const nextMax = parsePixel(nextCol.maxWidth ?? DEFAULT_MAX_WIDTH) ?? Infinity;

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
    column: HdsAdvancedTableNormalizedColumn;
    siblingColumnKeys?: {
      previous?: HdsAdvancedTableNormalizedColumn['key'];
      next?: HdsAdvancedTableNormalizedColumn['key'];
    };
    tableHeight?: number;
    onApplyTransientWidth: (
      columnKey: HdsAdvancedTableNormalizedColumn['key']
    ) => void;
    onGetAppliedWidth: (
      columnKey: HdsAdvancedTableNormalizedColumn['key']
    ) => HdsAdvancedTableNormalizedColumn['width'];
    onGetColumnByKey: (
      columnKey: HdsAdvancedTableNormalizedColumn['key']
    ) => HdsAdvancedTableNormalizedColumn | undefined;
    onSetTransientColumnWidth: (
      columnKey: HdsAdvancedTableNormalizedColumn['key'],
      width: `${number}px`
    ) => void;
    onSetTransientColumnWidths: (options: { roundValues?: boolean }) => void;
    onResetTransientColumnWidths: () => void;
    onUpdateResizeDebt: (delta: number) => void;
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

  get currentWidthInPixels(): number {
    const { column, onGetAppliedWidth } = this.args;

    if (onGetAppliedWidth === undefined) {
      return 0;
    }

    const appliedWidth = onGetAppliedWidth(column.key);

    return parsePixel(appliedWidth) ?? 0;
  }

  get minWidthInPixels(): number {
    return parsePixel(this.args.column.minWidth ?? DEFAULT_MIN_WIDTH) ?? 0;
  }

  get maxWidthInPixels(): number {
    return (
      parsePixel(this.args.column.maxWidth ?? DEFAULT_MAX_WIDTH) ?? Infinity
    );
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
      onApplyTransientWidth,
      onGetAppliedWidth,
      onSetTransientColumnWidths,
      onResetTransientColumnWidths,
      onUpdateResizeDebt,
    } = this.args;
    const { next: nextColumnKey } = siblingColumnKeys ?? {};

    if (
      nextColumnKey === undefined ||
      onApplyTransientWidth === undefined ||
      onGetAppliedWidth === undefined
    ) {
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
      if (this._transientDelta !== 0) {
        onUpdateResizeDebt(this._transientDelta);
      }
      // reset transient values
      onApplyTransientWidth(column.key);
      onApplyTransientWidth(nextColumnKey);

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
    const startNextColumnAppliedWidth =
      nextColumnKey !== undefined
        ? onGetAppliedWidth(nextColumnKey)
        : undefined;

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

  private _setColumnWidth(
    column: HdsAdvancedTableNormalizedColumn,
    width: number
  ): void {
    this.args.onSetTransientColumnWidth(column.key, `${width}px`);
  }

  private _applyResizeDelta(
    deltaX: number,
    column: HdsAdvancedTableNormalizedColumn,
    startColumnPxWidth: number,
    nextColumnKey?: HdsAdvancedTableNormalizedColumn['key'],
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
    const {
      column,
      onGetAppliedWidth,
      onResetTransientColumnWidths,
      onUpdateResizeDebt,
    } = this.args;

    window.removeEventListener('pointermove', this._boundResize);
    window.removeEventListener('pointerup', this._boundStopResize);

    if (this._transientDelta !== 0) {
      onUpdateResizeDebt(this._transientDelta);
    }

    this._applyTransientWidths();

    // reset the transient width
    onResetTransientColumnWidths();

    // reset the resizing state
    this.resizing = null;
    this._transientDelta = 0;

    const appliedWidth = onGetAppliedWidth(column.key);

    this.onColumnResize(column.key, appliedWidth);
  }
}
