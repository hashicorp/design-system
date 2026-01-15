/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { scheduleOnce } from '@ember/runloop';
import { modifier } from 'ember-modifier';

import type HdsAdvancedTableColumn from './models/column.ts';
import type { HdsDropdownSignature } from '../dropdown/index.ts';
import type { HdsDropdownToggleIconSignature } from '../dropdown/toggle/icon.ts';
import type { HdsAdvancedTableSignature } from './index.ts';
import type { HdsAdvancedTableThReorderHandleSignature } from './th-reorder-handle.ts';
import type { HdsAdvancedTableThResizeHandleSignature } from './th-resize-handle.ts';
import type { HdsDropdownToggleButtonSignature } from '../dropdown/toggle/button.ts';
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
    isStickyColumn?: boolean;
    reorderHandleElement?: HdsAdvancedTableThReorderHandleSignature['Element'];
    resizeHandleElement?: HdsAdvancedTableThResizeHandleSignature['Element'];
    onColumnResize?: HdsAdvancedTableSignature['Args']['onColumnResize'];
    onPinFirstColumn?: () => void;
  };
  Element: HdsDropdownSignature['Element'];
}

export default class HdsAdvancedTableThContextMenu extends Component<HdsAdvancedTableThContextMenuSignature> {
  @service declare readonly hdsIntl: HdsIntlService;

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
        action: this._resetColumnWidth.bind(this),
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
          action: this._resizeColumn.bind(this),
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
        action: () => this._moveColumn(),
      },
    ];

    if (!column.isFirst) {
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
          action: (close) => this._moveColumnToPosition('start', close),
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
          action: (close) => this._moveColumnToPosition('end', close),
        },
      ];
    }

    return reorderOptions;
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
