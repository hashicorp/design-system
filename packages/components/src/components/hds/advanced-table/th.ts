/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { scheduleOnce } from '@ember/runloop';
import { focusable, type FocusableElement } from 'tabbable';
import { modifier } from 'ember-modifier';
import { onFocusTrapDeactivate } from '../../../modifiers/hds-advanced-table-cell/dom-management.ts';
import {
  HdsAdvancedTableHorizontalAlignmentValues,
  HdsAdvancedTableThSortOrderLabelValues,
  HdsAdvancedTableThSortOrderValues,
} from './types.ts';

import type {
  HdsAdvancedTableHorizontalAlignment,
  HdsAdvancedTableScope,
  HdsAdvancedTableExpandState,
  HdsAdvancedTableColumnReorderSide,
  HdsAdvancedTableNormalizedColumn,
  HdsAdvancedTableThSortOrderLabels,
  HdsAdvancedTableThSortOrder,
} from './types.ts';

import type { HdsAdvancedTableThButtonSortSignature } from './th-button-sort.ts';
import type { HdsAdvancedTableThReorderHandleSignature } from './th-reorder-handle.ts';
import type { HdsAdvancedTableThResizeHandleSignature } from './th-resize-handle.ts';
import type { HdsAdvancedTableSignature } from './index.ts';
import type Owner from '@ember/owner';

export const ALIGNMENTS: HdsAdvancedTableHorizontalAlignment[] = Object.values(
  HdsAdvancedTableHorizontalAlignmentValues
);
export const DEFAULT_ALIGN = HdsAdvancedTableHorizontalAlignmentValues.Left;

export interface HdsAdvancedTableThSignature {
  Args: {
    align?: HdsAdvancedTableHorizontalAlignment;
    column?: HdsAdvancedTableNormalizedColumn;
    colspan?: number;
    depth?: number;
    draggedColumnKey?: HdsAdvancedTableNormalizedColumn['key'] | null;
    firstColumnKey?: HdsAdvancedTableNormalizedColumn['key'];
    hasExpandAllButton?: boolean;
    hasReorderableColumns?: HdsAdvancedTableSignature['Args']['hasReorderableColumns'];
    hasResizableColumns?: HdsAdvancedTableSignature['Args']['hasResizableColumns'];
    hasSelectableRows?: HdsAdvancedTableSignature['Args']['isSelectable'];
    hasStickyFirstColumn?: HdsAdvancedTableSignature['Args']['hasStickyFirstColumn'];
    isExpandable?: boolean;
    isExpanded?: HdsAdvancedTableExpandState;
    isStickyColumn?: boolean;
    isStickyColumnPinned?: boolean;
    lastColumnKey?: HdsAdvancedTableNormalizedColumn['key'];
    newLabel?: string;
    parentId?: string;
    reorderHoveredColumnKey?: HdsAdvancedTableNormalizedColumn['key'] | null;
    rowspan?: number;
    scope?: HdsAdvancedTableScope;
    siblingColumnKeys?: {
      previous?: HdsAdvancedTableNormalizedColumn['key'];
      next?: HdsAdvancedTableNormalizedColumn['key'];
    };
    draggedColumnSiblingColumnKeys?: {
      previous?: HdsAdvancedTableNormalizedColumn['key'];
      next?: HdsAdvancedTableNormalizedColumn['key'];
    };
    sortOrder?: HdsAdvancedTableThSortOrder;
    tableHeight?: number;
    tooltip?: string;
    didInsertExpandButton?: (button: HTMLButtonElement) => void;
    onApplyTransientWidth?: (
      columnKey: HdsAdvancedTableNormalizedColumn['key']
    ) => void;
    onClickSort?: HdsAdvancedTableThButtonSortSignature['Args']['onClick'];
    onClickToggle?: () => void;
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
    onResetTransientColumnWidths?: () => void;
    onRestoreColumnWidth?: (
      columnKey: HdsAdvancedTableNormalizedColumn['key']
    ) => void;
    onSetDraggedColumnKey?: (
      key: HdsAdvancedTableNormalizedColumn['key'] | null
    ) => void;
    onSetReorderHoveredColumnKey?: (
      key: HdsAdvancedTableNormalizedColumn['key'] | null
    ) => void;
    onSetTransientColumnWidth?: (
      columnKey: HdsAdvancedTableNormalizedColumn['key'],
      width: `${number}px`
    ) => void;
    onSetTransientColumnWidths?: (options: { roundValues?: boolean }) => void;
    onStepColumn?: (
      columnKey: HdsAdvancedTableNormalizedColumn['key'],
      step: number
    ) => void;
    onUpdateResizeDebt?: (
      columnKey: HdsAdvancedTableNormalizedColumn['key'],
      delta: number
    ) => void;
    willDestroyExpandButton?: (button: HTMLButtonElement) => void;
  };
  Blocks: {
    default?: [];
  };
  Element: HTMLDivElement;
}

export default class HdsAdvancedTableTh extends Component<HdsAdvancedTableThSignature> {
  private _labelId: string;

  @tracked private _element!: HTMLDivElement;
  @tracked private _shouldTrapFocus = false;
  @tracked
  private _reorderHandleElement?: HdsAdvancedTableThReorderHandleSignature['Element'];
  @tracked
  private _resizeHandleElement?: HdsAdvancedTableThResizeHandleSignature['Element'];

  constructor(owner: Owner, args: HdsAdvancedTableThSignature['Args']) {
    super(owner, args);

    this._labelId = this.args.newLabel ?? guidFor(this);
  }

  get isSortable(): boolean {
    return this.args.column?.isSortable ?? false;
  }

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

  get scope(): HdsAdvancedTableScope {
    return this.args.scope ?? 'col';
  }

  get role(): string {
    return this.scope === 'col' ? 'columnheader' : 'rowheader';
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
      `@align for "Hds::Table::Th" must be one of the following: ${ALIGNMENTS.join(
        ', '
      )}; received: ${align}`,
      ALIGNMENTS.includes(align)
    );

    return align;
  }

  // rowspan and colspan have to return 'auto' if not defined because otherwise the style modifier sets grid-area: undefined on the cell, which breaks the grid styles
  get rowspan(): string {
    return this.args.rowspan !== undefined
      ? `span ${this.args.rowspan}`
      : 'auto';
  }

  get colspan(): string | undefined {
    return this.args.colspan !== undefined
      ? `span ${this.args.colspan}`
      : 'auto';
  }

  get paddingLeft(): string | undefined {
    return this.args.depth !== undefined
      ? `calc(${this.args.depth} * 32px + 16px)`
      : undefined;
  }

  get classNames(): string {
    const { isStickyColumn, isStickyColumnPinned } = this.args;

    const classes = ['hds-advanced-table__th'];

    if (this.isSortable) {
      classes.push('hds-advanced-table__th--sort');
    }

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
    this.args.onApplyTransientWidth?.(columnKey);
  }

  @action resetTransientColumnWidths(): void {
    this.args.onResetTransientColumnWidths?.();
  }

  @action getAppliedWidth(
    columnKey: HdsAdvancedTableNormalizedColumn['key']
  ): HdsAdvancedTableNormalizedColumn['width'] | undefined {
    return this.args.onGetAppliedWidth?.(columnKey);
  }

  @action getColumnByKey(
    columnKey: HdsAdvancedTableNormalizedColumn['key']
  ): HdsAdvancedTableNormalizedColumn | undefined {
    return this.args.onGetColumnByKey?.(columnKey);
  }

  @action setDraggedColumnKey(
    columnKey: HdsAdvancedTableNormalizedColumn['key'] | null
  ): void {
    this.args.onSetDraggedColumnKey?.(columnKey);
  }

  @action setTransientColumnWidth(
    columnKey: HdsAdvancedTableNormalizedColumn['key'],
    width: `${number}px`
  ): void {
    const { column, onSetTransientColumnWidth } = this.args;

    if (column !== undefined && onSetTransientColumnWidth !== undefined) {
      onSetTransientColumnWidth(columnKey, width);
    }
  }

  @action setTransientColumnWidths(options: { roundValues?: boolean }): void {
    this.args.onSetTransientColumnWidths?.(options);
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

  @action setElement(element: HTMLDivElement): void {
    // eslint-disable-next-line ember/no-runloop, ember/no-incorrect-calls-with-inline-anonymous-functions
    scheduleOnce('afterRender', () => {
      this._element = element;
    });
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

  private _manageExpandButton = modifier((button: HTMLButtonElement) => {
    const { didInsertExpandButton, willDestroyExpandButton } = this.args;

    if (typeof didInsertExpandButton === 'function') {
      didInsertExpandButton(button);
    }

    return () => {
      if (typeof willDestroyExpandButton === 'function') {
        willDestroyExpandButton(button);
      }
    };
  });
}
