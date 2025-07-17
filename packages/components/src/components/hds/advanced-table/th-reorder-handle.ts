/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { modifier } from 'ember-modifier';
import { scheduleOnce } from '@ember/runloop';

import type HdsAdvancedTableColumn from './models/column.ts';

export interface HdsAdvancedTableThReorderHandleSignature {
  Args: {
    column: HdsAdvancedTableColumn;
    columnWidth: number;
    tableHeight?: number;
    onReorderDragStart: (column: HdsAdvancedTableColumn) => void;
    onReorderDragEnd?: () => void;
  };
  Blocks: {
    default?: [];
  };
  Element: HTMLDivElement;
}

function constructDragPreview(width: number, height?: number): HTMLDivElement {
  const dragPreviewElement = document.createElement('div');

  dragPreviewElement.className = 'hds-advanced-table__th-reorder-drag-preview';

  dragPreviewElement.style.width = `${width}px`;

  if (height) {
    dragPreviewElement.style.height = `${height}px`;
  }

  document.body.appendChild(dragPreviewElement);

  return dragPreviewElement;
}

export default class HdsAdvancedTableThReorderHandle extends Component<HdsAdvancedTableThReorderHandleSignature> {
  private _registerElement = modifier((element: HTMLDivElement) => {
    this.args.column.reorderHandleElement = element;
  });

  get classNames(): string {
    const classes = ['hds-advanced-table__th-reorder-handle'];

    return classes.join(' ');
  }

  @action
  handleDragStart(event: DragEvent): void {
    const { column, columnWidth, tableHeight, onReorderDragStart } = this.args;

    if (column.key === undefined || typeof onReorderDragStart !== 'function') {
      return;
    }

    event.dataTransfer?.setData('text/plain', column.key);

    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
    }

    const dragPreview = constructDragPreview(columnWidth, tableHeight);

    document.body.appendChild(dragPreview);

    event.dataTransfer?.setDragImage(dragPreview, columnWidth / 2, 10);

    setTimeout(() => document.body.removeChild(dragPreview), 0);

    onReorderDragStart(column);
  }

  @action
  handleDragEnd(): void {
    const { column, onReorderDragEnd } = this.args;

    column.isBeingDragged = false;

    if (typeof onReorderDragEnd === 'function') {
      onReorderDragEnd();
    }
  }

  @action
  handleKeydown(event: KeyboardEvent): void {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      return;
    }

    const { column } = this.args;

    column.table.stepColumn(column, event.key === 'ArrowLeft' ? -1 : 1);

    // we need to wait for the next run loop to ensure that the element has been registered with the column after moving
    // eslint-disable-next-line ember/no-runloop
    scheduleOnce(
      'afterRender',
      this,
      this.args.column.focusReorderHandle.bind(this)
    );
  }
}
