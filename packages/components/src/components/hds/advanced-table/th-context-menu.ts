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
  };
  Element: HdsDropdownSignature['Element'];
}

export default class HdsAdvancedTableThContextMenu extends Component<HdsAdvancedTableThContextMenuSignature> {
  originalColumnWidth?: string = this.args.column.width;

  get classNames() {
    const classes = ['hds-advanced-table__th-context-menu'];

    return classes.join(' ');
  }

  get _options(): HdsAdvancedTableThContextMenuOption[] {
    const { column } = this.args;

    const options: HdsAdvancedTableThContextMenuOption[] = [];

    if (column.isResizable) {
      options.push({
        key: 'reset-column-width',
        label: 'Reset column width',
        icon: 'rotate-ccw',
        action: (
          column: HdsAdvancedTableColumn,
          dropdownCloseCallback?: () => void
        ): void => {
          column.restoreWidth();
          dropdownCloseCallback?.();
        },
      });
    }

    return options;
  }
}
