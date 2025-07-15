/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import type HdsAdvancedTableColumn from './models/column.ts';
import type { HdsDropdownSignature } from '../dropdown/index.ts';
import type { HdsDropdownToggleIconSignature } from '../dropdown/toggle/icon.ts';
import type { HdsAdvancedTableSignature } from './index.ts';
import type { HdsAdvancedTableThResizeHandleSignature } from './th-resize-handle.ts';
import type { HdsAdvancedTableThReorderHandleSignature } from './th-reorder-handle.ts';

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
    hasResizableColumns?: boolean;
    hasReorderableColumns?: boolean;
    reorderHandleElement?: HdsAdvancedTableThReorderHandleSignature['Element'];
    resizeHandleElement?: HdsAdvancedTableThResizeHandleSignature['Element'];
    onMoveColumnToPosition?: (
      column: HdsAdvancedTableColumn,
      position: 'start' | 'end'
    ) => void;
    onColumnResize?: HdsAdvancedTableSignature['Args']['onColumnResize'];
    onPinFirstColumn?: () => void;
  };
  Element: HdsDropdownSignature['Element'];
}

export default class HdsAdvancedTableThContextMenu extends Component<HdsAdvancedTableThContextMenuSignature> {
  @service hdsIntl!: HdsIntlService;

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
            action: this.moveColumn.bind(this),
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
  moveColumn() {
    console.log(this.args.reorderHandleElement);
    this.args.reorderHandleElement?.focus();
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

  get _stickyColumnOptions(): HdsAdvancedTableThContextMenuOption[] {
    const { isStickyColumn } = this.args;

    const translatedPinLabel = this.hdsIntl.t(
      'hds.advanced-table.th-context-menu.pin',
      { default: 'Pin column' }
    );
    const translatedUnpinLabel = this.hdsIntl.t(
      'hds.advanced-table.th-context-menu.unpin',
      { default: 'Unpin column' }
    );

    return [
      {
        key: 'pin-first-column',
        label: isStickyColumn ? translatedUnpinLabel : translatedPinLabel,
        icon: isStickyColumn ? 'pin-off' : 'pin',
        action: this._pinFirstColumn.bind(this),
      },
    ];
  }

  get _options(): HdsAdvancedTableThContextMenuOption[] {
    const {
      column,
      hasReorderableColumns,
      hasResizableColumns,
      isStickyColumn,
    } = this.args;

    let allGroups: HdsAdvancedTableThContextMenuOption[][] = [];

    if (hasResizableColumns) {
      allGroups = [...allGroups, this._resizeOptions];
    }

    if (hasReorderableColumns && isStickyColumn === undefined) {
      allGroups = [...allGroups, this._reorderOptions];
    }

    // we don't allow pinning/unpinning of the sticky column if columns are reorderable
    if (
      isStickyColumn !== undefined &&
      column.isFirst &&
      !hasReorderableColumns
    ) {
      allGroups = [...allGroups, this._stickyColumnOptions];
    }

    return allGroups.reduce<HdsAdvancedTableThContextMenuOption[]>(
      (options, group, index) => {
        // Add a separator before each group except the first
        if (index > 0) {
          return [...options, { key: 'separator' }, ...group];
        }
        return [...options, ...group];
      },
      []
    );
  }

  private _registerDropdownToggleElement = modifier(
    (element: HdsDropdownToggleButtonSignature['Element']) => {
      this.args.column.thContextMenuToggleElement = element;
    }
  );

  private _resizeColumn() {
    this.args.resizeHandleElement?.focus();
  }

  private _resetColumnWidth(dropdownCloseCallback: () => void): void {
    const { column, onColumnResize } = this.args;

    column.restoreWidth();

    if (typeof onColumnResize === 'function' && column.key !== undefined) {
      onColumnResize(column.key, column.width);
    }

    dropdownCloseCallback();
  }

  private _moveColumn() {
    // eslint-disable-next-line ember/no-runloop
    scheduleOnce(
      'afterRender',
      this,
      this.args.column.focusReorderHandle.bind(this)
    );
  }

  private _moveColumnToPosition(
    position: 'start' | 'end',
    dropdownCloseCallback?: () => void
  ): void {
    const { column } = this.args;

    column.table.moveColumnToTerminalPosition(column, position);

    requestAnimationFrame(() => {
      dropdownCloseCallback?.();

      column.thContextMenuToggleElement?.focus();
    });
  }

  private _pinFirstColumn(dropdownCloseCallback: () => void): void {
    const { onPinFirstColumn } = this.args;

    if (typeof onPinFirstColumn === 'function') {
      onPinFirstColumn();
    }

    dropdownCloseCallback();
  }
}
