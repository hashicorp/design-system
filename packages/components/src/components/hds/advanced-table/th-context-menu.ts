/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import type HdsAdvancedTableColumn from './models/column.ts';
import type { HdsDropdownSignature } from '../dropdown/index.ts';
import type { HdsDropdownToggleIconSignature } from '../dropdown/toggle/icon.ts';
import { action } from '@ember/object';

interface HdsAdvancedTableThContextMenuOption {
  key: string;
  label: string;
  icon: HdsDropdownToggleIconSignature['Args']['icon'];
  action: (
    column: HdsAdvancedTableColumn,
    previousColumn?: HdsAdvancedTableColumn,
    nextColumn?: HdsAdvancedTableColumn,
    dropdownCloseCallback?: () => void
  ) => void;
}

export interface HdsAdvancedTableThContextMenuSignature {
  Args: {
    column: HdsAdvancedTableColumn;
    previousColumn?: HdsAdvancedTableColumn;
    nextColumn?: HdsAdvancedTableColumn;
    hasResizableColumns?: boolean;
  };
  Element: HdsDropdownSignature['Element'];
}

export default class HdsAdvancedTableThContextMenu extends Component<HdsAdvancedTableThContextMenuSignature> {
  get _options(): HdsAdvancedTableThContextMenuOption[] {
    const { hasResizableColumns } = this.args;

    const options: HdsAdvancedTableThContextMenuOption[] = [];

    if (hasResizableColumns) {
      options.push({
        key: 'reset-column-width',
        label: 'Reset column width',
        icon: 'rotate-ccw',
        action: this.resetColumnWidth.bind(this),
      });
    }

    return options;
  }

  @action
  resetColumnWidth(
    column: HdsAdvancedTableColumn,
    previousColumn?: HdsAdvancedTableColumn,
    nextColumn?: HdsAdvancedTableColumn,
    dropdownCloseCallback?: () => void
  ): void {
    previousColumn?.onNextColumnWidthRestored(column.imposedWidthDelta);
    nextColumn?.onPreviousColumnWidthRestored();
    column.restoreWidth();
    dropdownCloseCallback?.();
  }
}
