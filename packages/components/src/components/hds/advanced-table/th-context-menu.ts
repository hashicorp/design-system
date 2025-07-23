/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';

import type HdsAdvancedTableColumn from './models/column.ts';
import type { HdsDropdownSignature } from '../dropdown/index.ts';
import type { HdsDropdownToggleIconSignature } from '../dropdown/toggle/icon.ts';
import type { HdsAdvancedTableSignature } from './index.ts';
import { tracked } from '@glimmer/tracking';
import type { HdsAdvancedTableThResizeHandleSignature } from './th-resize-handle.ts';

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
    resizeHandleElement?: HdsAdvancedTableThResizeHandleSignature['Element'];
    onColumnResize?: HdsAdvancedTableSignature['Args']['onColumnResize'];
  };
  Element: HdsDropdownSignature['Element'];
}

export default class HdsAdvancedTableThContextMenu extends Component<HdsAdvancedTableThContextMenuSignature> {
  @tracked private _element!: HdsDropdownSignature['Element'];

  get _options(): HdsAdvancedTableThContextMenuOption[] {
    const { column, hasResizableColumns } = this.args;

    let options: HdsAdvancedTableThContextMenuOption[] = [];

    if (hasResizableColumns) {
      if (!column.isLast) {
        options = [
          ...options,
          {
            key: 'resize-column',
            label: 'Resize column',
            icon: 'resize-column',
            action: this.resizeColumn.bind(this),
          },
        ];
      }

      options = [
        ...options,
        {
          key: 'reset-column-width',
          label: 'Reset column width',
          icon: 'rotate-ccw',
          action: this.resetColumnWidth.bind(this),
        },
      ];
    }

    return options;
  }

  @action
  resizeColumn() {
    this.args.resizeHandleElement?.focus();
  }

  @action
  resetColumnWidth(
    column: HdsAdvancedTableColumn,
    dropdownCloseCallback?: () => void
  ): void {
    const { onColumnResize } = this.args;

    const { previous: previousColumn, next: nextColumn } = column.siblings;

    previousColumn?.onNextColumnWidthRestored(column.imposedWidthDelta);
    nextColumn?.onPreviousColumnWidthRestored();
    column.restoreWidth();

    if (typeof onColumnResize === 'function' && column.key !== undefined) {
      onColumnResize(column.key, column.width);
    }

    dropdownCloseCallback?.();
  }
}
