/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { focusable, type FocusableElement } from 'tabbable';
import type Owner from '@ember/owner';
import { modifier } from 'ember-modifier';

import {
  HdsAdvancedTableHorizontalAlignmentValues,
  HdsAdvancedTableThSortOrderValues,
  HdsAdvancedTableThSortOrderLabelValues,
} from './types.ts';
import type {
  HdsAdvancedTableHorizontalAlignment,
  HdsAdvancedTableThSortOrder,
  HdsAdvancedTableThSortOrderLabels,
  HdsAdvancedTableColumnReorderSide,
} from './types.ts';
import type { HdsAdvancedTableThReorderHandleSignature } from './th-reorder-handle.ts';
import type { HdsAdvancedTableThButtonSortSignature } from './th-button-sort.ts';
import { onFocusTrapDeactivate } from '../../../modifiers/hds-advanced-table-cell/dom-management.ts';
import type { HdsAdvancedTableThSignature } from './th.ts';
import type { HdsAdvancedTableSignature } from './index.ts';
import type { HdsAdvancedTableThResizeHandleSignature } from './th-resize-handle.ts';
import type HdsAdvancedTableColumn from './models/column.ts';

export const ALIGNMENTS: string[] = Object.values(
  HdsAdvancedTableHorizontalAlignmentValues
);
export const DEFAULT_ALIGN = HdsAdvancedTableHorizontalAlignmentValues.Left;

export interface HdsAdvancedTableThSortSignature {
  Args: {
    column?: HdsAdvancedTableThSignature['Args']['column'];
    align?: HdsAdvancedTableHorizontalAlignment;
    hasReorderableColumns?: HdsAdvancedTableSignature['Args']['hasReorderableColumns'];
    hasResizableColumns?: HdsAdvancedTableSignature['Args']['hasResizableColumns'];
    onClickSort?: HdsAdvancedTableThButtonSortSignature['Args']['onClick'];
    sortOrder?: HdsAdvancedTableThSortOrder;
    tooltip?: string;
    rowspan?: number;
    colspan?: number;
    tableHeight?: number;
    isStickyColumn?: boolean;
    isStickyColumnPinned?: boolean;
    onColumnResize?: HdsAdvancedTableSignature['Args']['onColumnResize'];
    onReorderDragEnd?: () => void;
    onReorderDragStart?: (column: HdsAdvancedTableColumn) => void;
    onReorderDrop?: (
      column: HdsAdvancedTableColumn,
      side: 'left' | 'right'
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

  constructor(owner: Owner, args: HdsAdvancedTableThSortSignature['Args']) {
    super(owner, args);

    const { rowspan, colspan, isStickyColumn } = args;

    if (isStickyColumn) {
      assert(
        'Cannot have custom rowspan or colspan if there are nested rows.',
        rowspan === undefined || colspan === undefined
      );
    }
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

  get showContextMenu(): boolean {
    const { hasResizableColumns, hasReorderableColumns, isStickyColumn } =
      this.args;

    return (
      (hasResizableColumns ||
        hasReorderableColumns ||
        isStickyColumn !== undefined) ??
      false
    );
  }

  get classNames(): string {
    const classes = ['hds-advanced-table__th', 'hds-advanced-table__th--sort'];

    // add a class based on the @align argument
    if (this.align) {
      classes.push(`hds-advanced-table__th--align-${this.align}`);
    }

    if (this.args.isStickyColumn) {
      classes.push('hds-advanced-table__th--is-sticky-column');
    }

    if (this.args.isStickyColumn && this.args.isStickyColumnPinned) {
      classes.push('hds-advanced-table__th--is-sticky-column-pinned');
    }

    if (this.args.column?.isBeingDragged) {
      classes.push('hds-advanced-table__th--is-being-dragged');
    }

    return classes.join(' ');
  }

  @action
  handleDragStart(column: HdsAdvancedTableColumn): void {
    const { onReorderDragStart } = this.args;

    if (
      column === undefined ||
      column.key === undefined ||
      typeof onReorderDragStart !== 'function'
    ) {
      return;
    }

    // Set the local state that shows this column is being dragged
    column.isBeingDragged = true;

    // Call the main action from the parent table component
    onReorderDragStart(column);
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

  @action setElement(element: HTMLDivElement): void {
    this._element = element;

    if (this.args.column !== undefined) {
      this.args.column.thElement = element;
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
