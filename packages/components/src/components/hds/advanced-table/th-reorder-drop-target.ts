/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { modifier } from 'ember-modifier';

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
  @tracked private _isDraggingOver = false;
  @tracked private _dragCount = 0;

  private _element!: HdsAdvancedTableThReorderDropTargetSignature['Element'];

  private _registerElement = modifier(
    (element: HdsAdvancedTableThReorderDropTargetSignature['Element']) => {
      this._element = element;
    }
  );

  private _resetDragState(): void {
    this._dragCount = 0;
    this._isDraggingOver = false;
    this._dragSide = null;
  }

  // determines whether the drag event is occurring on the left or right side of the element
  private _getDragSide(event: DragEvent): 'left' | 'right' {
    const rect = this._element.getBoundingClientRect();
    const mouseX = event.clientX;
    const elementMiddleX = rect.left + rect.width / 2;

    return mouseX < elementMiddleX ? 'left' : 'right';
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
    } else if (this._isDraggingOver && this._dragSide !== null) {
      classes.push(
        ...[
          'hds-advanced-table__th-reorder-drop-target--is-dragging-over',
          `hds-advanced-table__th-reorder-drop-target--is-dragging-over--${this._dragSide}`,
        ]
      );
    }

    return classes.join(' ');
  }

  get height(): `${number}px` | undefined {
    const { tableHeight } = this.args;

    if (tableHeight === undefined) {
      return undefined;
    }

    // subtract 2px to account for borders
    const height = tableHeight - 4;

    return `${height}px`;
  }

  @action
  handleDragOver(event: DragEvent): void {
    event.preventDefault();

    const { column } = this.args;
    const { reorderDraggedColumn } = column.table;

    if (column.isBeingDragged || reorderDraggedColumn === null) {
      return;
    }

    const { next, previous } = reorderDraggedColumn.siblings;
    const dragSide = this._getDragSide(event);

    if (
      (column === previous && dragSide === 'left') ||
      (column === next && dragSide === 'right') ||
      (column !== previous && column !== next)
    ) {
      this._dragSide = dragSide;
    }
  }

  @action
  handleDragEnter(event: DragEvent): void {
    event.preventDefault();

    this._dragCount = this._dragCount + 1;

    if (this._dragCount === 1) {
      this._isDraggingOver = true;
    }
  }

  @action
  handleDragLeave(event: DragEvent): void {
    event.preventDefault();

    this._dragCount = this._dragCount - 1;

    // ensure count doesn't go negative and reset isDraggingOver when appropriate
    if (this._dragCount <= 0) {
      this._resetDragState();
    }
  }

  @action
  handleDrop(event: DragEvent): void {
    event.preventDefault();

    const { column, onReorderDrop } = this.args;
    const { _dragSide } = this;

    // reset drag state completely when an item is dropped
    this._resetDragState();

    if (
      column === undefined ||
      _dragSide === null ||
      typeof onReorderDrop !== 'function'
    ) {
      return;
    }

    onReorderDrop(column, _dragSide);
  }
}
