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
  HdsAdvancedTableColumn,
  HdsAdvancedTableHorizontalAlignment,
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
    draggedColumnKey?: HdsAdvancedTableColumn['key'];
    firstColumnKey?: HdsAdvancedTableColumn['key'];
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
    lastColumnKey?: HdsAdvancedTableColumn['key'];
    reorderHoveredColumnKey?: HdsAdvancedTableColumn['key'];
    siblingColumnKeys?: {
      previous?: HdsAdvancedTableColumn['key'];
      next?: HdsAdvancedTableColumn['key'];
    };
    onApplyTransientWidth?: (columnKey: HdsAdvancedTableColumn['key']) => void;
    onClickSort?: HdsAdvancedTableThButtonSortSignature['Args']['onClick'];
    onColumnResize?: HdsAdvancedTableSignature['Args']['onColumnResize'];
    onGetAppliedWidth?: (
      columnKey: HdsAdvancedTableColumn['key']
    ) => HdsAdvancedTableColumn['width'];
    onGetColumnByKey?: (
      columnKey: HdsAdvancedTableColumn['key']
    ) => HdsAdvancedTableColumn | undefined;
    onMoveColumnToTerminalPosition?: (
      columnKey: HdsAdvancedTableColumn['key'],
      position: 'start' | 'end'
    ) => void;
    onPinFirstColumn?: () => void;
    onReorderDrop?: (
      columnKey: HdsAdvancedTableColumn['key'],
      side: HdsAdvancedTableColumnReorderSide
    ) => void;
    onSetDraggedColumnKey: (key: HdsAdvancedTableColumn['key']) => void;
    onSetReorderHoveredColumnKey: (key: HdsAdvancedTableColumn['key']) => void;
    onSetTransientColumnWidth: (
      columnKey: HdsAdvancedTableColumn['key'],
      width: `${number}px`
    ) => void;
    onSetTransientColumnWidths: (options: { roundValues?: boolean }) => void;
    onResetTransientColumnWidths: () => void;
    onStepColumn: (
      columnKey: HdsAdvancedTableColumn['key'],
      step: number
    ) => void;
    onUpdateResizeDebt: (
      columnKey: HdsAdvancedTableColumn['key'],
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

    return draggedColumnKey !== undefined;
  }

  get isColumnBeingDragged(): boolean {
    const { column, draggedColumnKey } = this.args;

    return (
      draggedColumnKey !== undefined &&
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

  @action applyTransientWidth(columnKey: HdsAdvancedTableColumn['key']): void {
    const { onApplyTransientWidth } = this.args;

    if (columnKey !== undefined && onApplyTransientWidth !== undefined) {
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
    columnKey: HdsAdvancedTableColumn['key']
  ): HdsAdvancedTableColumn['width'] | undefined {
    const { onGetAppliedWidth } = this.args;

    if (columnKey === undefined || onGetAppliedWidth === undefined) {
      return undefined;
    }

    return onGetAppliedWidth(columnKey);
  }

  @action getColumnByKey(
    columnKey: HdsAdvancedTableColumn['key']
  ): HdsAdvancedTableColumn | undefined {
    const { onGetColumnByKey } = this.args;

    if (columnKey === undefined || onGetColumnByKey === undefined) {
      return undefined;
    }

    return onGetColumnByKey(columnKey);
  }

  @action setDraggedColumnKey(): void {
    const { column, onSetDraggedColumnKey } = this.args;

    if (column?.key !== undefined && onSetDraggedColumnKey !== undefined) {
      onSetDraggedColumnKey(column.key);
    }
  }

  @action setTransientColumnWidth(width: `${number}px`) {
    const { column, onSetTransientColumnWidth } = this.args;

    if (column?.key !== undefined && onSetTransientColumnWidth !== undefined) {
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

    if (column?.key !== undefined && onStepColumn !== undefined) {
      onStepColumn(column.key, step);
    }
  }

  @action updateResizeDebt(delta: number): void {
    const { column, onUpdateResizeDebt } = this.args;

    if (column?.key !== undefined && onUpdateResizeDebt !== undefined) {
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
