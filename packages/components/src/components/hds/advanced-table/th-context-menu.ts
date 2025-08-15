/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';

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
  action?: (dropdownCloseCallback?: () => void) => void;
}
export interface HdsAdvancedTableThContextMenuSignature {
  Args: {
    column: HdsAdvancedTableColumn;
    hasResizableColumns?: boolean;
    hasReorderableColumns?: boolean;
    isStickyColumn?: boolean;
    reorderHandleElement?: HdsAdvancedTableThReorderHandleSignature['Element'];
    resizeHandleElement?: HdsAdvancedTableThResizeHandleSignature['Element'];
    onColumnResize?: HdsAdvancedTableSignature['Args']['onColumnResize'];
    onPinFirstColumn?: () => void;
  };
  Element: HdsDropdownSignature['Element'];
}

export default class HdsAdvancedTableThContextMenu extends Component<HdsAdvancedTableThContextMenuSignature> {
  @service hdsIntl!: HdsIntlService;

  @tracked private _element!: HdsDropdownSignature['Element'];

  get _resizeOptions(): HdsAdvancedTableThContextMenuOption[] {
    const { column } = this.args;

    let resizeOptions: HdsAdvancedTableThContextMenuOption[] = [
      {
        key: 'reset-column-width',
        label: 'Reset column width',
        icon: 'rotate-ccw',
        action: this.resetColumnWidth.bind(this),
      },
    ];

    if (!column.isLast) {
      resizeOptions = [
        {
          key: 'resize-column',
          label: 'Resize column',
          icon: 'resize-column',
          action: this.resizeColumn.bind(this),
        },
        ...resizeOptions,
      ];
    }

    return resizeOptions;
  }

  get _reorderOptions(): HdsAdvancedTableThContextMenuOption[] {
    const { column } = this.args;

    let reorderOptions: HdsAdvancedTableThContextMenuOption[] = [
      {
        key: 'reorder-column',
        label: 'Move column',
        icon: 'move-horizontal',
        action: () => this.moveColumn(),
      },
    ];

    if (!column.isFirstNonSticky) {
      reorderOptions = [
        ...reorderOptions,
        {
          key: 'move-column-to-start',
          label: 'Move column to start',
          icon: 'start',
          action: (close) => this.moveColumnToPosition('start', close),
        },
      ];
    }

    if (!column.isLast) {
      reorderOptions = [
        ...reorderOptions,
        {
          key: 'move-column-to-end',
          label: 'Move column to end',
          icon: 'end',
          action: (close) => this.moveColumnToPosition('end', close),
        },
      ];
    }

    return reorderOptions;
  }

  get _options(): HdsAdvancedTableThContextMenuOption[] {
    const { hasReorderableColumns, hasResizableColumns, isStickyColumn } =
      this.args;

    let allGroups: HdsAdvancedTableThContextMenuOption[][] = [];
    if (hasResizableColumns) {
      allGroups = [
        ...allGroups,
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

    if (hasReorderableColumns && isStickyColumn !== true) {
      allGroups = [...allGroups, this._reorderOptions];
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

  @action
  private moveColumn() {
    // eslint-disable-next-line ember/no-runloop
    scheduleOnce(
      'afterRender',
      this,
      this.args.column.focusReorderHandle.bind(this)
    );
  }

  @action
  private resizeColumn() {
    this.args.resizeHandleElement?.focus();
  }

  @action
  private moveColumnToPosition(
    position: 'start' | 'end',
    dropdownCloseCallback?: () => void
  ): void {
    const { column } = this.args;

    column.table.moveColumnToTerminalPosition(column, position);

    dropdownCloseCallback?.();
  }

  @action
  private resetColumnWidth(dropdownCloseCallback?: () => void): void {
    const { onColumnResize, column } = this.args;

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
