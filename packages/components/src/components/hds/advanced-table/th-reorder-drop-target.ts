/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { modifier } from 'ember-modifier';
import { BORDER_WIDTH } from './index.ts';
import { requestAnimationFrameWaiter } from './utils.ts';
import { HdsAdvancedTableColumnReorderSideValues } from './types.ts';

import type {
  HdsAdvancedTableNormalizedColumn,
  HdsAdvancedTableColumnReorderSide,
} from './types.ts';
import type { HdsAdvancedTableSignature } from './index.ts';

export interface HdsAdvancedTableThReorderDropTargetSignature {
  Args: {
    column?: HdsAdvancedTableNormalizedColumn;
    draggedColumnKey?: HdsAdvancedTableNormalizedColumn['key'] | null;
    isFirstColumn: boolean;
    isLastColumn: boolean;
    hasSelectableRows?: HdsAdvancedTableSignature['Args']['isSelectable'];
    reorderHoveredColumnKey?: HdsAdvancedTableNormalizedColumn['key'] | null;
    draggedColumnSiblingColumnKeys?: {
      previous?: HdsAdvancedTableNormalizedColumn['key'];
      next?: HdsAdvancedTableNormalizedColumn['key'];
    };
    tableHeight?: number;
    onReorderDrop?: (
      columnKey: HdsAdvancedTableNormalizedColumn['key'],
      side: HdsAdvancedTableColumnReorderSide
    ) => void;
    onSetReorderHoveredColumnKey?: (
      key: HdsAdvancedTableNormalizedColumn['key'] | null
    ) => void;
  };
  Blocks: {
    default?: [];
  };
  Element: HTMLDivElement;
}

export default class HdsAdvancedTableThReorderDropTarget extends Component<HdsAdvancedTableThReorderDropTargetSignature> {
  @tracked private _dragSide: HdsAdvancedTableColumnReorderSide | null = null;
  @tracked private _isUpdateQueued: boolean = false;

  private _element!: HdsAdvancedTableThReorderDropTargetSignature['Element'];

  private _registerElement = modifier(
    (element: HdsAdvancedTableThReorderDropTargetSignature['Element']) => {
      this._element = element;
    }
  );

  // determines whether the drag event is occurring on the left or right side of the element
  private _getDragSide(event: DragEvent): HdsAdvancedTableColumnReorderSide {
    const rect = this._element.getBoundingClientRect();
    const mouseX = event.clientX;
    const elementMiddleX = rect.left + rect.width / 2;

    return mouseX < elementMiddleX
      ? HdsAdvancedTableColumnReorderSideValues.Left
      : HdsAdvancedTableColumnReorderSideValues.Right;
  }

  get isBeingDragged(): boolean {
    const { column, draggedColumnKey } = this.args;

    return column !== undefined && column.key === draggedColumnKey;
  }

  get isDraggingOver(): boolean {
    const { column, reorderHoveredColumnKey } = this.args;

    return column !== undefined && column.key === reorderHoveredColumnKey;
  }

  get classNames(): string {
    const { isFirstColumn, isLastColumn } = this.args;

    const classes = ['hds-advanced-table__th-reorder-drop-target'];

    if (isFirstColumn && !this.args.hasSelectableRows) {
      classes.push('hds-advanced-table__th-reorder-drop-target--is-first');
    } else if (isLastColumn) {
      classes.push('hds-advanced-table__th-reorder-drop-target--is-last');
    }

    if (this.isBeingDragged) {
      classes.push(
        'hds-advanced-table__th-reorder-drop-target--is-being-dragged'
      );
    } else if (this.isDraggingOver && this._dragSide !== null) {
      classes.push(
        ...[
          'hds-advanced-table__th-reorder-drop-target--is-dragging-over',
          `hds-advanced-table__th-reorder-drop-target--is-dragging-over--${this._dragSide}`,
        ]
      );
    }

    return classes.join(' ');
  }

  get height(): string | undefined {
    const { tableHeight } = this.args;

    if (tableHeight === undefined) {
      return;
    }

    return `${tableHeight - BORDER_WIDTH * 2}px`;
  }

  @action
  handleDragOver(event: DragEvent): void {
    event.preventDefault();

    if (this._isUpdateQueued) {
      return;
    }

    this._isUpdateQueued = true;

    requestAnimationFrameWaiter(() => {
      const {
        column,
        draggedColumnKey,
        draggedColumnSiblingColumnKeys,
        onSetReorderHoveredColumnKey,
      } = this.args;

      if (column === undefined || onSetReorderHoveredColumnKey === undefined) {
        return;
      }

      if (draggedColumnKey !== null) {
        if (this.isBeingDragged) {
          onSetReorderHoveredColumnKey(null);
        } else {
          onSetReorderHoveredColumnKey(column.key);

          const { next, previous } = draggedColumnSiblingColumnKeys ?? {};
          const dragSide = this._getDragSide(event);

          if (
            (column.key === previous &&
              dragSide === HdsAdvancedTableColumnReorderSideValues.Left) ||
            (column.key === next &&
              dragSide === HdsAdvancedTableColumnReorderSideValues.Right) ||
            (column.key !== previous && column.key !== next)
          ) {
            this._dragSide = dragSide;
          }
        }
      }

      this._isUpdateQueued = false;
    });
  }

  @action
  handleDrop(event: DragEvent): void {
    event.preventDefault();

    const { column, onReorderDrop, onSetReorderHoveredColumnKey } = this.args;
    const { _dragSide } = this;

    if (
      column === undefined ||
      _dragSide === null ||
      typeof onReorderDrop !== 'function' ||
      typeof onSetReorderHoveredColumnKey !== 'function'
    ) {
      return;
    }

    onReorderDrop(column.key, _dragSide);

    this._dragSide = null;

    onSetReorderHoveredColumnKey(null);
  }
}
