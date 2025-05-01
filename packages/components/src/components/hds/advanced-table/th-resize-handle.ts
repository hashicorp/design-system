/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import type HdsAdvancedTableColumn from './models/column';

export interface HdsAdvancedTableThResizeHandleSignature {
  Args: {
    column: HdsAdvancedTableColumn;
  };
  Blocks: {
    default?: [];
  };
  Element: HTMLDivElement;
}

export default class HdsAdvancedTableThResizeHandle extends Component<HdsAdvancedTableThResizeHandleSignature> {
  @tracked resizing: { startX: number; startW: number } | null = null;

  private _resize(event: PointerEvent): void {
    const { column } = this.args ?? {};

    if (this.resizing === null || column === undefined) {
      return;
    }

    const { startX, startW } = this.resizing;

    const newW = Math.max(startW + (event.clientX - startX), 50);

    column.width = `${newW}px`;
  }

  @action
  startResize(event: PointerEvent): void {
    event.preventDefault();

    const target = event.target as HTMLDivElement;
    const parent = target.parentElement as HTMLDivElement;
    const parentWidth = parent.clientWidth;

    const { column } = this.args ?? {};

    column.width = column.width ?? `${parentWidth}px`;

    // width is in px like `100px`
    const numericalWidth = parseInt(column.width, 10);

    this.resizing = { startX: event.clientX, startW: numericalWidth };

    window.addEventListener('pointermove', this._resize.bind(this));
    window.addEventListener('pointerup', this._stopResize.bind(this));
  }

  private _stopResize() {
    window.removeEventListener('pointermove', this._resize.bind(this));
    window.removeEventListener('pointerup', this._stopResize.bind(this));

    this.resizing = null;
  }
}