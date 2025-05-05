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
  };
  Blocks: {
    default?: [];
  };
  Element: HTMLDivElement;
}

export default class HdsAdvancedTableThMenu extends Component<HdsAdvancedTableThMenuSignature> {
  @tracked isResizing = false;

  @action
  resetColumnWidth(): void {
    const { column } = this.args ?? {};

    if (column) {
      column.width = undefined;
    }
  }
}