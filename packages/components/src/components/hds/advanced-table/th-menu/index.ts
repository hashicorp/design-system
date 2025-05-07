/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import HdsAdvancedTableColumn from '../models/column.ts';
import { action } from '@ember/object';

export interface HdsAdvancedTableThMenuSignature {
  Args: {
    column: HdsAdvancedTableColumn;
    onStartResize: () => void;
  };
  Blocks: {
    default?: [];
  };
  Element: HTMLDivElement;
}

export default class HdsAdvancedTableThMenu extends Component<HdsAdvancedTableThMenuSignature> {
  @tracked isResizing = false;

  @action
  enableResizing(callback: (() => void) | undefined): void {
    this.args.onStartResize();

    callback?.();
  }

  @action
  resetColumnWidth(callback: (() => void) | undefined): void {
    const { column } = this.args ?? {};

    if (column) {
      column.restoreWidth();
    }

    callback?.();
  }
}
