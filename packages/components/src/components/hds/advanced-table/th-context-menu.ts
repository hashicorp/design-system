/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { scheduleOnce } from '@ember/runloop';

import type HdsAdvancedTableColumn from './models/column.ts';
import type { HdsDropdownSignature } from '../dropdown/index.ts';
import type { HdsDropdownToggleIconSignature } from '../dropdown/toggle/icon.ts';
import type { HdsAdvancedTableSignature } from './index.ts';
import type { HdsAdvancedTableThReorderHandleSignature } from './th-reorder-handle.ts';
import type { HdsAdvancedTableThResizeHandleSignature } from './th-resize-handle.ts';
import type HdsIntlService from '../../../services/hds-intl.ts';

interface HdsAdvancedTableThContextMenuOption {
  key: string;
  icon?: HdsDropdownToggleIconSignature['Args']['icon'];
  label?: string;
  action?: (dropdownCloseCallback: () => void) => void;
}

export interface HdsAdvancedTableThContextMenuSignature {
  Args: {
    column: HdsAdvancedTableColumn;
    hasResizableColumns?: boolean;
    hasReorderableColumns?: boolean;
    hasStickyFirstColumn?: boolean;
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

    const translatedResetWidthLabel = this.hdsIntl.t(
      'hds.advanced-table.th-context-menu.reset-width',
      { default: 'Reset column width' }
    );

    let resizeOptions: HdsAdvancedTableThContextMenuOption[] = [
      {
        key: 'reset-column-width',
        label: translatedResetWidthLabel,
        icon: 'rotate-ccw',
        action: this.resetColumnWidth.bind(this),
      },
    ];

    if (!column.isLast) {
      const translatedResizeLabel = this.hdsIntl.t(
        'hds.advanced-table.th-context-menu.resize',
        { default: 'Resize column' }
      );

      resizeOptions = [
        {
          key: 'resize-column',
          label: translatedResizeLabel,
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

    const translatedMoveColumnLabel = this.hdsIntl.t(
      'hds.advanced-table.th-context-menu.move-column',
      { default: 'Move column' }
    );

    let reorderOptions: HdsAdvancedTableThContextMenuOption[] = [
      {
        key: 'reorder-column',
        label: translatedMoveColumnLabel,
        icon: 'move-horizontal',
        action: () => this.moveColumn(),
      },
    ];

    if (!column.isFirstNonSticky) {
      const translatedMoveColumnToStartLabel = this.hdsIntl.t(
        'hds.advanced-table.th-context-menu.move-column-to-start',
        { default: 'Move column to start' }
      );
      reorderOptions = [
        ...reorderOptions,
        {
          key: 'move-column-to-start',
          label: translatedMoveColumnToStartLabel,
          icon: 'start',
          action: (close) => this.moveColumnToPosition('start', close),
        },
      ];
    }

    if (!column.isLast) {
      const translatedMoveColumnToEndLabel = this.hdsIntl.t(
        'hds.advanced-table.th-context-menu.move-column-to-end',
        { default: 'Move column to end' }
      );
      reorderOptions = [
        ...reorderOptions,
        {
          key: 'move-column-to-end',
          label: translatedMoveColumnToEndLabel,
          icon: 'end',
          action: (close) => this.moveColumnToPosition('end', close),
        },
      ];
    }

    return reorderOptions;
  }

  get _stickyColumnOptions(): HdsAdvancedTableThContextMenuOption[] {
    const { column, isStickyColumn } = this.args;

    let stickyColumnOptions: HdsAdvancedTableThContextMenuOption[] = [];

    if (column.isFirst) {
      const translatedPinLabel = this.hdsIntl.t(
        'hds.advanced-table.th-context-menu.pin',
        { default: 'Pin column' }
      );
      const translatedUnpinLabel = this.hdsIntl.t(
        'hds.advanced-table.th-context-menu.unpin',
        { default: 'Unpin column' }
      );

      stickyColumnOptions = [
        ...stickyColumnOptions,
        {
          key: 'pin-first-column',
          label: isStickyColumn ? translatedUnpinLabel : translatedPinLabel,
          icon: isStickyColumn ? 'pin-off' : 'pin',
          action: this.pinFirstColumn.bind(this),
        },
      ];
    }

    return stickyColumnOptions;
  }

  get _options(): HdsAdvancedTableThContextMenuOption[] {
    const { hasReorderableColumns, hasResizableColumns, hasStickyFirstColumn } =
      this.args;

    let allGroups: HdsAdvancedTableThContextMenuOption[][] = [];

    if (hasResizableColumns) {
      allGroups = [...allGroups, this._resizeOptions];
    }

    if (hasReorderableColumns) {
      allGroups = [...allGroups, this._reorderOptions];
    }

    if (hasStickyFirstColumn) {
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

  @action
  private resizeColumn() {
    this.args.resizeHandleElement?.focus();
  }

  @action
  private resetColumnWidth(dropdownCloseCallback: () => void): void {
    const { column, onColumnResize } = this.args;

    column.restoreWidth();

    if (typeof onColumnResize === 'function' && column.key !== undefined) {
      onColumnResize(column.key, column.width);
    }

    dropdownCloseCallback();
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
  private moveColumnToPosition(
    position: 'start' | 'end',
    dropdownCloseCallback?: () => void
  ): void {
    const { column } = this.args;

    column.table.moveColumnToTerminalPosition(column, position);

    dropdownCloseCallback?.();
  }

  @action
  private pinFirstColumn(dropdownCloseCallback: () => void): void {
    const { onPinFirstColumn } = this.args;

    if (typeof onPinFirstColumn === 'function') {
      onPinFirstColumn();
    }

    dropdownCloseCallback();
  }
}
