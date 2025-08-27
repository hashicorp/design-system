/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { modifier } from 'ember-modifier';
import { BORDER_WIDTH } from './index.ts';
import { requestAnimationFrameWaiter } from './utils.ts';

import type HdsAdvancedTableColumn from './models/column.ts';

export interface HdsAdvancedTableThReorderDropTargetSignature {
  Args: {
    column: HdsAdvancedTableColumn;
    tableHeight?: number;
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

export default class HdsAdvancedTableThReorderDropTarget extends Component<HdsAdvancedTableThReorderDropTargetSignature> {
  @tracked private _dragSide: 'left' | 'right' | null = null;
  @tracked private _isUpdateQueued: boolean = false;

  private _element!: HdsAdvancedTableThReorderDropTargetSignature['Element'];

  private _registerElement = modifier(
    (element: HdsAdvancedTableThReorderDropTargetSignature['Element']) => {
      this._element = element;
    }
  );

  // determines whether the drag event is occurring on the left or right side of the element
  private _getDragSide(event: DragEvent): 'left' | 'right' {
    const rect = this._element.getBoundingClientRect();
    const mouseX = event.clientX;
    const elementMiddleX = rect.left + rect.width / 2;

    return mouseX < elementMiddleX ? 'left' : 'right';
  }

  get isDraggingOver(): boolean {
    const { table } = this.args.column;

    return table.reorderHoveredColumn?.key === this.args.column.key;
  }

  get classNames(): string {
    const { column } = this.args;

    const classes = ['hds-advanced-table__th-reorder-drop-target'];

    if (column.isFirst) {
      classes.push('hds-advanced-table__th-reorder-drop-target--is-first');
    } else if (column.isLast) {
      classes.push('hds-advanced-table__th-reorder-drop-target--is-last');
    }

    if (column.isBeingDragged) {
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
      const { column } = this.args;
      const { table } = column;

      if (table.reorderDraggedColumn !== null) {
        if (table.reorderDraggedColumn.key === column.key) {
          table.reorderHoveredColumn = null;
        } else {
          table.reorderHoveredColumn = column;

          const { next, previous } = table.reorderDraggedColumn.siblings;
          const dragSide = this._getDragSide(event);

          if (
            (column === previous && dragSide === 'left') ||
            (column === next && dragSide === 'right') ||
            (column !== previous && column !== next)
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

    const { column, onReorderDrop } = this.args;
    const { _dragSide } = this;

    if (
      column === undefined ||
      _dragSide === null ||
      typeof onReorderDrop !== 'function'
    ) {
      return;
    }

    onReorderDrop(column, _dragSide);

    this._dragSide = null;
    column.table.reorderHoveredColumn = null;
  }
}
