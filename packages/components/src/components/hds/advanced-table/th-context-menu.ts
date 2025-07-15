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
  label?: string;
  icon?: HdsDropdownToggleIconSignature['Args']['icon'];
  action?: (
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
    hasReorderableColumns?: boolean;
    resizeHandleElement?: HdsAdvancedTableThResizeHandleSignature['Element'];
    onColumnResize?: HdsAdvancedTableSignature['Args']['onColumnResize'];
  };
  Element: HdsDropdownSignature['Element'];
}

export default class HdsAdvancedTableThContextMenu extends Component<HdsAdvancedTableThContextMenuSignature> {
  @tracked private _element!: HdsDropdownSignature['Element'];

  get _options(): HdsAdvancedTableThContextMenuOption[] {
    const { hasReorderableColumns, hasResizableColumns } = this.args;

    let optionsGroups: HdsAdvancedTableThContextMenuOption[][] = [];

    if (hasResizableColumns) {
      optionsGroups = [
        ...optionsGroups,
        [
          {
            key: 'resize-column',
            label: 'Resize column',
            icon: 'resize-column',
            action: this.resizeColumn.bind(this),
          },
          {
            key: 'reset-column-width',
            label: 'Reset column width',
            icon: 'rotate-ccw',
            action: this.resetColumnWidth.bind(this),
          },
        ],
      ];
    }

    if (hasReorderableColumns) {
      optionsGroups = [
        ...optionsGroups,
        [
          {
            key: 'reorder-column',
            label: 'Move column',
            icon: 'move-horizontal',
            action: this.reorderColumn.bind(this),
          },
          {
            key: 'move-column-to-start',
            label: 'Move column to start',
            icon: 'start',
            action: this.moveColumnToStart.bind(this),
          },
          {
            key: 'reorder-column',
            label: 'Move column to end',
            icon: 'end',
            action: this.moveColumnToEnd.bind(this),
          },
        ],
      ];
    }

    // add a seperator between each group
    optionsGroups = optionsGroups.map((group, index) => {
      if (index > 0) {
        return [{ key: 'separator' }, ...group];
      }
      return group;
    });

    return optionsGroups.flat();
  }

  @action
  reorderColumn(
    _column: HdsAdvancedTableColumn,
    _previousColumn?: HdsAdvancedTableColumn,
    _nextColumn?: HdsAdvancedTableColumn,
    dropdownCloseCallback?: () => void
  ) {
    console.log('Reorder column action triggered');
    dropdownCloseCallback?.();
  }

  @action
  moveColumnToStart(
    _column: HdsAdvancedTableColumn,
    _previousColumn?: HdsAdvancedTableColumn,
    _nextColumn?: HdsAdvancedTableColumn,
    dropdownCloseCallback?: () => void
  ) {
    console.log('Move column to start action triggered');
    dropdownCloseCallback?.();
  }

  @action
  moveColumnToEnd(
    _column: HdsAdvancedTableColumn,
    _previousColumn?: HdsAdvancedTableColumn,
    _nextColumn?: HdsAdvancedTableColumn,
    dropdownCloseCallback?: () => void
  ) {
    console.log('Move column to end action triggered');
    dropdownCloseCallback?.();
  }

  @action
  resizeColumn() {
    this.args.resizeHandleElement?.focus();
  }

  @action
  resetColumnWidth(
    column: HdsAdvancedTableColumn,
    previousColumn?: HdsAdvancedTableColumn,
    nextColumn?: HdsAdvancedTableColumn,
    dropdownCloseCallback?: () => void
  ): void {
    const { onColumnResize } = this.args;

    previousColumn?.onNextColumnWidthRestored(column.imposedWidthDelta);
    nextColumn?.onPreviousColumnWidthRestored();
    column.restoreWidth();

    if (typeof onColumnResize === 'function' && column.key !== undefined) {
      onColumnResize(column.key, column.width);
    }

    dropdownCloseCallback?.();
  }
}
