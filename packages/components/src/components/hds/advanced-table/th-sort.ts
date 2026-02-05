/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { focusable, type FocusableElement } from 'tabbable';
import { modifier } from 'ember-modifier';
import {
  HdsAdvancedTableHorizontalAlignmentValues,
  HdsAdvancedTableThSortOrderValues,
  HdsAdvancedTableThSortOrderLabelValues,
} from './types.ts';

import type {
  HdsAdvancedTableHorizontalAlignment,
  HdsAdvancedTableNormalizedColumn,
  HdsAdvancedTableThSortOrder,
  HdsAdvancedTableThSortOrderLabels,
  HdsAdvancedTableColumnReorderSide,
} from './types';
import type { HdsAdvancedTableThReorderHandleSignature } from './th-reorder-handle.ts';
import type { HdsAdvancedTableThButtonSortSignature } from './th-button-sort.ts';
import { onFocusTrapDeactivate } from '../../../modifiers/hds-advanced-table-cell/dom-management.ts';
import type { HdsAdvancedTableThSignature } from './th.ts';
import type { HdsAdvancedTableSignature } from './index.ts';
import type { HdsAdvancedTableThResizeHandleSignature } from './th-resize-handle.ts';

export const ALIGNMENTS: HdsAdvancedTableHorizontalAlignment[] = Object.values(
  HdsAdvancedTableHorizontalAlignmentValues
);
export const DEFAULT_ALIGN = HdsAdvancedTableHorizontalAlignmentValues.Left;

export interface HdsAdvancedTableThSortSignature {
  Args: {
    align?: HdsAdvancedTableHorizontalAlignment;
    column?: HdsAdvancedTableThSignature['Args']['column'];
    colspan?: number;
    draggedColumnKey?: HdsAdvancedTableNormalizedColumn['key'] | null;
    firstColumnKey?: HdsAdvancedTableNormalizedColumn['key'];
    hasReorderableColumns?: HdsAdvancedTableSignature['Args']['hasReorderableColumns'];
    hasResizableColumns?: HdsAdvancedTableSignature['Args']['hasResizableColumns'];
    hasSelectableRows?: HdsAdvancedTableSignature['Args']['isSelectable'];
    hasStickyFirstColumn?: HdsAdvancedTableSignature['Args']['hasStickyFirstColumn'];
    rowspan?: number;
    sortOrder?: HdsAdvancedTableThSortOrder;
    tableHeight?: number;
    tooltip?: string;
    isStickyColumn?: boolean;
    isStickyColumnPinned?: boolean;
    lastColumnKey?: HdsAdvancedTableNormalizedColumn['key'];
    reorderHoveredColumnKey?: HdsAdvancedTableNormalizedColumn['key'] | null;
    siblingColumnKeys?: {
      previous?: HdsAdvancedTableNormalizedColumn['key'];
      next?: HdsAdvancedTableNormalizedColumn['key'];
    };
    onApplyTransientWidth?: (
      columnKey: HdsAdvancedTableNormalizedColumn['key']
    ) => void;
    onClickSort?: HdsAdvancedTableThButtonSortSignature['Args']['onClick'];
    onColumnResize?: HdsAdvancedTableSignature['Args']['onColumnResize'];
    onGetAppliedWidth?: (
      columnKey: HdsAdvancedTableNormalizedColumn['key']
    ) => HdsAdvancedTableNormalizedColumn['width'];
    onGetColumnByKey?: (
      columnKey: HdsAdvancedTableNormalizedColumn['key']
    ) => HdsAdvancedTableNormalizedColumn | undefined;
    onMoveColumnToTerminalPosition?: (
      columnKey: HdsAdvancedTableNormalizedColumn['key'],
      position: 'start' | 'end'
    ) => void;
    onPinFirstColumn?: () => void;
    onReorderDrop?: (
      columnKey: HdsAdvancedTableNormalizedColumn['key'],
      side: HdsAdvancedTableColumnReorderSide
    ) => void;
    onSetDraggedColumnKey: (
      key: HdsAdvancedTableNormalizedColumn['key'] | null
    ) => void;
    onSetReorderHoveredColumnKey: (
      key: HdsAdvancedTableNormalizedColumn['key'] | null
    ) => void;
    onSetTransientColumnWidth: (
      columnKey: HdsAdvancedTableNormalizedColumn['key'],
      width: `${number}px`
    ) => void;
    onSetTransientColumnWidths: (options: { roundValues?: boolean }) => void;
    onResetTransientColumnWidths: () => void;
    onStepColumn: (
      columnKey: HdsAdvancedTableNormalizedColumn['key'],
      step: number
    ) => void;
    onUpdateResizeDebt: (
      columnKey: HdsAdvancedTableNormalizedColumn['key'],
      delta: number
    ) => void;
  };
  Blocks: {
    default?: [];
  };
  Element: HTMLDivElement;
}

export default class HdsAdvancedTableThSort extends Component<HdsAdvancedTableThSortSignature> {
  private _labelId = guidFor(this);
  private _element!: HTMLDivElement;

  @tracked private _shouldTrapFocus = false;
  @tracked
  private _reorderHandleElement?: HdsAdvancedTableThReorderHandleSignature['Element'];
  @tracked
  private _resizeHandleElement?: HdsAdvancedTableThResizeHandleSignature['Element'];

  get isFirstColumn(): boolean {
    const { column, firstColumnKey } = this.args;

    return (
      firstColumnKey !== undefined &&
      column !== undefined &&
      firstColumnKey === column.key
    );
  }

  get isLastColumn(): boolean {
    const { column, lastColumnKey } = this.args;

    return (
      lastColumnKey !== undefined &&
      column !== undefined &&
      lastColumnKey === column.key
    );
  }

  get tableHasColumnBeingDragged(): boolean {
    const { draggedColumnKey } = this.args;

    return draggedColumnKey != null;
  }

  get isColumnBeingDragged(): boolean {
    const { column, draggedColumnKey } = this.args;

    return (
      draggedColumnKey != null &&
      column !== undefined &&
      draggedColumnKey === column.key
    );
  }

  get ariaSort(): HdsAdvancedTableThSortOrderLabels {
    switch (this.args.sortOrder) {
      case HdsAdvancedTableThSortOrderValues.Asc:
        return HdsAdvancedTableThSortOrderLabelValues.Asc;
      case HdsAdvancedTableThSortOrderValues.Desc:
        return HdsAdvancedTableThSortOrderLabelValues.Desc;
      default:
        // none is the default per the spec.
        return HdsAdvancedTableThSortOrderLabelValues.None;
    }
  }

  get align(): HdsAdvancedTableHorizontalAlignment {
    const { align = DEFAULT_ALIGN } = this.args;

    assert(
      `@align for "Hds::Table" must be one of the following: ${ALIGNMENTS.join(
        ', '
      )}; received: ${align}`,
      ALIGNMENTS.includes(align)
    );
    return align;
  }

  get classNames(): string {
    const { isStickyColumn, isStickyColumnPinned } = this.args;

    const classes = ['hds-advanced-table__th', 'hds-advanced-table__th--sort'];

    // add a class based on the @align argument
    if (this.align) {
      classes.push(`hds-advanced-table__th--align-${this.align}`);
    }

    if (isStickyColumn) {
      classes.push('hds-advanced-table__th--is-sticky-column');
    }

    if (isStickyColumn && isStickyColumnPinned) {
      classes.push('hds-advanced-table__th--is-sticky-column-pinned');
    }

    if (this.isColumnBeingDragged) {
      classes.push('hds-advanced-table__th--is-being-dragged');
    }

    return classes.join(' ');
  }

  get showDropTarget(): boolean {
    const { isStickyColumn } = this.args;

    return this.tableHasColumnBeingDragged === true && !isStickyColumn;
  }

  get showResizeHandle(): boolean {
    const { hasResizableColumns } = this.args;

    return (
      hasResizableColumns === true &&
      !this.isLastColumn &&
      !this.tableHasColumnBeingDragged
    );
  }

  @action onFocusTrapDeactivate(): void {
    this._shouldTrapFocus = false;
    onFocusTrapDeactivate(this._element);
  }

  @action enableFocusTrap(): void {
    this._shouldTrapFocus = true;
  }

  @action getInitialFocus(): FocusableElement | undefined {
    const cellFocusableElements = focusable(this._element);
    return cellFocusableElements[0];
  }

  @action focusReorderHandle(): void {
    if (this._element === undefined) {
      return;
    }

    // focus the th element first (parent) to ensure the handle is visible
    this._element.focus({ preventScroll: true });

    if (this._reorderHandleElement === undefined) {
      return;
    }

    // then focus the reorder handle element
    this._reorderHandleElement.focus();
  }

  @action applyTransientWidth(
    columnKey: HdsAdvancedTableNormalizedColumn['key']
  ): void {
    const { onApplyTransientWidth } = this.args;

    if (onApplyTransientWidth !== undefined) {
      onApplyTransientWidth(columnKey);
    }
  }

  @action resetTransientColumnWidths(): void {
    const { onResetTransientColumnWidths } = this.args;

    if (onResetTransientColumnWidths !== undefined) {
      onResetTransientColumnWidths();
    }
  }

  @action getAppliedWidth(
    columnKey: HdsAdvancedTableNormalizedColumn['key']
  ): HdsAdvancedTableNormalizedColumn['width'] | undefined {
    const { onGetAppliedWidth } = this.args;

    if (onGetAppliedWidth === undefined) {
      return undefined;
    }

    return onGetAppliedWidth(columnKey);
  }

  @action getColumnByKey(
    columnKey: HdsAdvancedTableNormalizedColumn['key']
  ): HdsAdvancedTableNormalizedColumn | undefined {
    const { onGetColumnByKey } = this.args;

    if (onGetColumnByKey === undefined) {
      return undefined;
    }

    return onGetColumnByKey(columnKey);
  }

  @action setDraggedColumnKey(): void {
    const { column, onSetDraggedColumnKey } = this.args;

    if (column !== undefined && onSetDraggedColumnKey !== undefined) {
      onSetDraggedColumnKey(column.key);
    }
  }

  @action setTransientColumnWidth(width: `${number}px`) {
    const { column, onSetTransientColumnWidth } = this.args;

    if (column !== undefined && onSetTransientColumnWidth !== undefined) {
      onSetTransientColumnWidth(column.key, width);
    }
  }

  @action setTransientColumnWidths(options: { roundValues?: boolean }) {
    const { onSetTransientColumnWidths } = this.args;

    if (onSetTransientColumnWidths !== undefined) {
      onSetTransientColumnWidths(options);
    }
  }

  @action stepColumn(step: number): void {
    const { column, onStepColumn } = this.args;

    if (column !== undefined && onStepColumn !== undefined) {
      onStepColumn(column.key, step);
    }
  }

  @action updateResizeDebt(delta: number): void {
    const { column, onUpdateResizeDebt } = this.args;

    if (column !== undefined && onUpdateResizeDebt !== undefined) {
      onUpdateResizeDebt(column.key, delta);
    }
  }

  private _registerReorderHandleElement = modifier(
    (element: HdsAdvancedTableThReorderHandleSignature['Element']) => {
      this._reorderHandleElement = element;
    }
  );

  private _registerResizeHandleElement = modifier(
    (element: HdsAdvancedTableThResizeHandleSignature['Element']) => {
      this._resizeHandleElement = element;
    }
  );
}
