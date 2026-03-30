/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';

import type { HdsAdvancedTableNormalizedColumn } from './types';

export interface HdsAdvancedTableThReorderHandleSignature {
  Args: {
    column: HdsAdvancedTableNormalizedColumn;
    tableHeight?: number;
    thElement?: HTMLDivElement;
    onFocusReorderHandle: () => void;
    onSetDraggedColumnKey: (
      columnKey: HdsAdvancedTableNormalizedColumn['key'] | null
    ) => void;
    onStepColumn: (step: number) => void;
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
  @action
  handleDragStart(event: DragEvent): void {
    const { column, tableHeight, thElement, onSetDraggedColumnKey } = this.args;
    const { key } = column;

    if (thElement === undefined) {
      return;
    }

    onSetDraggedColumnKey(key);

    const thElementWidth = thElement.offsetWidth;

    event.dataTransfer?.setData('text/plain', key);

    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
    }

    const dragPreview = constructDragPreview(thElementWidth, tableHeight);

    document.body.appendChild(dragPreview);

    // set the drag image, center it, and offset it vertically by 10px
    event.dataTransfer?.setDragImage(dragPreview, thElementWidth / 2, 10);

    setTimeout(() => document.body.removeChild(dragPreview), 0);
  }

  @action
  handleKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowRight': {
        event.preventDefault();

        const { onStepColumn } = this.args;
        const direction = event.key === 'ArrowLeft' ? -1 : 1;
        onStepColumn(direction);

        // we need to wait for the next run loop to ensure that the element has been registered with the column after moving
        // eslint-disable-next-line ember/no-runloop
        scheduleOnce('afterRender', this, this.args.onFocusReorderHandle);
        break;
      }

      case ' ': {
        event.preventDefault();
        break;
      }

      default:
        break;
    }
  }
}
