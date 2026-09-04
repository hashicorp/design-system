/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { modifier } from 'ember-modifier';
import { on } from '@ember/modifier';
import style from 'ember-style-modifier';
import { concat } from '@ember/helper';

import {
  measureColumnWidth,
  parsePixel,
  requestAnimationFrameWaiter,
} from './utils.ts';
import { BORDER_WIDTH } from './index.gts';
import { DEFAULT_MIN_WIDTH } from './column-manager/width.gts';
import hdsT from '../../../helpers/hds-t.ts';

import type Owner from '@ember/owner';
import type {
  HdsAdvancedTableNormalizedColumn,
  HdsAdvancedTablePixelString,
} from './types';
import type { HdsAdvancedTableSignature } from './index.gts';

const KEYBOARD_RESIZE_STEP = 10;

export interface HdsAdvancedTableThResizeHandleSignature {
  Args: {
    column?: HdsAdvancedTableNormalizedColumn;
    tableHeight?: number;
    onBeginColumnResize?: () => void;
    onColumnResize?: HdsAdvancedTableSignature['Args']['onColumnResize'];
    onCommitColumnWidths?: () => void;
    onGetAppliedWidth?: (
      columnKey: HdsAdvancedTableNormalizedColumn['key']
    ) => HdsAdvancedTableNormalizedColumn['width'];
    onResetTransientColumnWidths?: () => void;
    onResizeColumnByDelta?: (
      columnKey: HdsAdvancedTableNormalizedColumn['key'],
      deltaPx: number
    ) => number;
  };
  Blocks: {
    default?: [];
  };
  Element: HTMLDivElement;
}

export default class HdsAdvancedTableThResizeHandle extends Component<HdsAdvancedTableThResizeHandleSignature> {
  @tracked resizing: { startX: number } | null = null;
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

    if (column === undefined || onGetAppliedWidth === undefined) {
      return 0;
    }

    const pixelWidth = parsePixel(onGetAppliedWidth(column.key));

    if (pixelWidth !== undefined) {
      return Math.round(pixelWidth);
    }

    // the applied width is an `fr` weight once a resize commits, and parsing that
    // would report 0 — measure the rendered cell instead
    return parsePixel(measureColumnWidth(this._handleElement)) ?? 0;
  }

  get minWidthInPixels(): number {
    return parsePixel(this.args.column?.minWidth ?? DEFAULT_MIN_WIDTH) ?? 0;
  }

  get maxWidthInPixels(): number {
    const explicitMax = parsePixel(this.args.column?.maxWidth);

    if (explicitMax !== undefined) {
      return explicitMax;
    }

    const table = this._handleElement?.closest('.hds-advanced-table');

    return table instanceof HTMLElement
      ? table.offsetWidth
      : this.minWidthInPixels;
  }

  get widthValueText(): string {
    return `${this.currentWidthInPixels}px`;
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

  @action
  onColumnResize(key?: string, width?: HdsAdvancedTablePixelString): void {
    const { onColumnResize } = this.args;

    if (typeof onColumnResize === 'function' && key !== undefined) {
      onColumnResize(key, width);
    }
  }

  private _finishColumnResize(
    columnKey: HdsAdvancedTableNormalizedColumn['key']
  ): void {
    const { onCommitColumnWidths, onResetTransientColumnWidths } = this.args;

    if (this._transientDelta !== 0) {
      onCommitColumnWidths?.();
    }

    onResetTransientColumnWidths?.();

    this.resizing = null;
    this._transientDelta = 0;

    requestAnimationFrameWaiter(() => {
      this.onColumnResize(columnKey, measureColumnWidth(this._handleElement));
    });
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
      onBeginColumnResize,
      onResizeColumnByDelta,
      onCommitColumnWidths,
      onResetTransientColumnWidths,
    } = this.args;

    if (
      column === undefined ||
      onBeginColumnResize === undefined ||
      onResizeColumnByDelta === undefined ||
      onCommitColumnWidths === undefined ||
      onResetTransientColumnWidths === undefined
    ) {
      return;
    }

    onBeginColumnResize();

    const deltaX =
      event.key === 'ArrowRight' ? KEYBOARD_RESIZE_STEP : -KEYBOARD_RESIZE_STEP;

    this._transientDelta = onResizeColumnByDelta(column.key, deltaX);

    // ensure the resize handle remains visible during keyboard navigation.
    this._handleElement.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    });

    // use a microtask to commit the final state after the render pass.
    queueMicrotask(() => this._finishColumnResize(column.key));
  }

  @action
  startResize(event: PointerEvent): void {
    if (event.button !== 0) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const { column, onBeginColumnResize } = this.args;

    if (column === undefined || onBeginColumnResize === undefined) {
      return;
    }

    onBeginColumnResize();

    this.resizing = { startX: event.clientX };

    window.addEventListener('pointermove', this._boundResize);
    window.addEventListener('pointerup', this._boundStopResize);
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

      const { column, onResizeColumnByDelta } = this.args;

      if (column !== undefined && onResizeColumnByDelta !== undefined) {
        const deltaX = event.clientX - this.resizing.startX;

        this._transientDelta = onResizeColumnByDelta(column.key, deltaX);
      }

      this._isUpdateQueued = false;
    });
  }

  private _stopResize(): void {
    window.removeEventListener('pointermove', this._boundResize);
    window.removeEventListener('pointerup', this._boundStopResize);

    const { column } = this.args;

    if (column === undefined) {
      this.args.onResetTransientColumnWidths?.();

      this.resizing = null;
      this._transientDelta = 0;

      return;
    }

    this._finishColumnResize(column.key);
  }

  <template>
    {{! template-lint-disable no-pointer-down-event-binding }}
    <div
      class={{this.classNames}}
      draggable="false"
      role="slider"
      aria-orientation="horizontal"
      aria-valuenow={{this.currentWidthInPixels}}
      aria-valuemin={{this.minWidthInPixels}}
      aria-valuemax={{this.maxWidthInPixels}}
      aria-valuetext={{this.widthValueText}}
      tabindex="0"
      aria-label={{hdsT
        "hds.components.advanced-table.th-resize-handle.aria-label"
        columnLabel=@column.label
        default=(concat "Resize " @column.label " column")
      }}
      {{this._registerHandleElement}}
      {{on "pointerdown" this.startResize}}
      {{on "keydown" this.handleKeydown}}
      {{style height=this.height}}
      ...attributes
    />
  </template>
}
