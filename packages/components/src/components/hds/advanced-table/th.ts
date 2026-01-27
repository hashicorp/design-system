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
import { onFocusTrapDeactivate } from '../../../modifiers/hds-advanced-table-cell/dom-management.ts';
import { HdsAdvancedTableHorizontalAlignmentValues } from './types.ts';

import type {
  HdsAdvancedTableHorizontalAlignment,
  HdsAdvancedTableScope,
  HdsAdvancedTableExpandState,
  HdsAdvancedTableColumn,
  HdsAdvancedTableColumnReorderSide,
} from './types.ts';
import type { HdsAdvancedTableThReorderHandleSignature } from './th-reorder-handle.ts';
import type { HdsAdvancedTableThResizeHandleSignature } from './th-resize-handle.ts';
import type { HdsAdvancedTableSignature } from './index.ts';

export const ALIGNMENTS: HdsAdvancedTableHorizontalAlignment[] = Object.values(
  HdsAdvancedTableHorizontalAlignmentValues
);
export const DEFAULT_ALIGN = HdsAdvancedTableHorizontalAlignmentValues.Left;

export interface HdsAdvancedTableThSignature {
  Args: {
    align?: HdsAdvancedTableHorizontalAlignment;
    column?: HdsAdvancedTableColumn;
    colspan?: number;
    depth?: number;
    draggedColumnKey?: HdsAdvancedTableColumn['key'];
    firstColumnKey?: HdsAdvancedTableColumn['key'];
    hasExpandAllButton?: boolean;
    hasReorderableColumns?: HdsAdvancedTableSignature['Args']['hasReorderableColumns'];
    hasResizableColumns?: HdsAdvancedTableSignature['Args']['hasResizableColumns'];
    hasSelectableRows?: HdsAdvancedTableSignature['Args']['isSelectable'];
    hasStickyFirstColumn?: HdsAdvancedTableSignature['Args']['hasStickyFirstColumn'];
    isExpanded?: HdsAdvancedTableExpandState;
    isExpandable?: boolean;
    isStickyColumnPinned?: boolean;
    lastColumnKey?: HdsAdvancedTableColumn['key'];
    siblingColumnKeys?: {
      previous?: HdsAdvancedTableColumn['key'];
      next?: HdsAdvancedTableColumn['key'];
    };
    newLabel?: string;
    parentId?: string;
    rowspan?: number;
    scope?: HdsAdvancedTableScope;
    tooltip?: string;
    tableHeight?: number;
    didInsertExpandButton?: (button: HTMLButtonElement) => void;
    onApplyTransientWidth?: (columnKey: HdsAdvancedTableColumn['key']) => void;
    onClickToggle?: () => void;
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
      column: HdsAdvancedTableColumn,
      side: HdsAdvancedTableColumnReorderSide
    ) => void;
    onSetDraggedColumnKey: (key: HdsAdvancedTableColumn['key']) => void;
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
    willDestroyExpandButton?: (button: HTMLButtonElement) => void;
  };
  Blocks: {
    default?: [];
  };
  Element: HTMLDivElement;
}

export default class HdsAdvancedTableTh extends Component<HdsAdvancedTableThSignature> {
  private _labelId = this.args.newLabel ? this.args.newLabel : guidFor(this);
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

  get isStickyColumn(): boolean {
    const { rowspan, colspan, hasStickyFirstColumn } = this.args;

    const isStickyColumn =
      this.isFirstColumn && hasStickyFirstColumn !== undefined;

    if (isStickyColumn) {
      assert(
        'Cannot have custom rowspan or colspan if there are nested rows.',
        rowspan === undefined || colspan === undefined
      );
    }

    return isStickyColumn;
  }

  get scope(): HdsAdvancedTableScope {
    const { scope = 'col' } = this.args;
    return scope;
  }

  get role(): string {
    if (this.scope === 'col') return 'columnheader';
    else return 'rowheader';
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
    if (this.args.rowspan) {
      return `span ${this.args.rowspan}`;
    }
    return 'auto';
  }

  get colspan(): string | undefined {
    if (this.args.colspan) {
      return `span ${this.args.colspan}`;
    }
    return 'auto';
  }

  get paddingLeft(): string | undefined {
    if (this.args.depth) {
      return `calc(${this.args.depth} * 32px + 16px)`;
    }
  }

  get classNames(): string {
    const classes = ['hds-advanced-table__th'];

    // add a class based on the @align argument
    if (this.align) {
      classes.push(`hds-advanced-table__th--align-${this.align}`);
    }

    if (this.isStickyColumn) {
      classes.push('hds-advanced-table__th--is-sticky-column');
    }

    if (this.isStickyColumn && this.args.isStickyColumnPinned) {
      classes.push('hds-advanced-table__th--is-sticky-column-pinned');
    }

    if (this.isColumnBeingDragged) {
      classes.push('hds-advanced-table__th--is-being-dragged');
    }

    return classes.join(' ');
  }

  get showDropTarget(): boolean {
    return this.tableHasColumnBeingDragged === true && !this.isStickyColumn;
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
