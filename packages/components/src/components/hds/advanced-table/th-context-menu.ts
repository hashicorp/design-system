/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import type HdsAdvancedTableColumn from './models/column.ts';
import type { HdsDropdownSignature } from '../dropdown/index.ts';
import type { HdsDropdownToggleIconSignature } from '../dropdown/toggle/icon.ts';

interface HdsAdvancedTableThContextMenuOption {
  key: string;
  label: string;
  icon: HdsDropdownToggleIconSignature['Args']['icon'];
  action: (
    column: HdsAdvancedTableColumn,
    dropdownCloseCallback?: () => void
  ) => void;
}

export interface HdsAdvancedTableThContextMenuSignature {
  Args: {
    column: HdsAdvancedTableColumn;
    hasResizableColumns?: boolean;
    onRestoreColumnWidths?: () => void;
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
        label: 'Reset column widths',
        icon: 'rotate-ccw',
        action: (
          _column: HdsAdvancedTableColumn,
          dropdownCloseCallback?: () => void
        ): void => {
          this.args.onRestoreColumnWidths?.();
          dropdownCloseCallback?.();
        },
      });
    }

    return options;
  }
}
