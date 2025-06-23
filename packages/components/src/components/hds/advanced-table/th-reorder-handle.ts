/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import type HdsAdvancedTableColumn from './models/column.ts';
import { action } from '@ember/object';

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

  dragPreviewElement.style.width = `${width}px`;

  if (height) {
    dragPreviewElement.style.height = `${height}px`;
  }

  // You can style this however you want the drag "ghost" image to look
  dragPreviewElement.style.opacity = '0.5';
  dragPreviewElement.style.backgroundColor = 'hsl(205, 80%, 90%)'; // A light blue
  dragPreviewElement.style.border = '1px solid hsl(205, 100%, 50%)';
  dragPreviewElement.style.borderRadius = '4px';
  dragPreviewElement.style.position = 'absolute';
  dragPreviewElement.style.left = '-9999px';
  dragPreviewElement.style.top = '-9999px';

  document.body.appendChild(dragPreviewElement);

  return dragPreviewElement;
}

export default class HdsAdvancedTableThReorderHandle extends Component<HdsAdvancedTableThReorderHandleSignature> {
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
}
