/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import type HdsAdvancedTableColumn from './models/column';

const TABLE_BORDER_WIDTH = 1;

export interface HdsAdvancedTableThResizeHandleSignature {
  Args: {
    column: HdsAdvancedTableColumn;
    tableHeight?: number;
  };
  Blocks: {
    default?: [];
  };
  Element: HTMLDivElement;
}

export default class HdsAdvancedTableThResizeHandle extends Component<HdsAdvancedTableThResizeHandleSignature> {
  @tracked resizing: { startX: number; startW: number } | null = null;

  private _resize(event: PointerEvent): void {
    const { column } = this.args;

    if (this.resizing === null || column === undefined) {
      return;
    }

    const { startX, startW } = this.resizing;

    const deltaX = event.clientX - startX;
    const newW = startW + deltaX;

    column.setNumericalWidth(newW);
  }

  @action
  startResize(event: PointerEvent): void {
    event.preventDefault();

    const { column } = this.args;

    this.resizing = { startX: event.clientX, startW: column.numericalWidth };

    window.addEventListener('pointermove', this._resize.bind(this));
    window.addEventListener('pointerup', this._stopResize.bind(this));
  }

  private _stopResize() {
    window.removeEventListener('pointermove', this._resize.bind(this));
    window.removeEventListener('pointerup', this._stopResize.bind(this));

    this.resizing = null;
  }

  get height(): string | undefined {
    const { tableHeight } = this.args;

    if (tableHeight === undefined) {
      return;
    }

    return `${tableHeight - TABLE_BORDER_WIDTH * 2}px`;
  }
}
