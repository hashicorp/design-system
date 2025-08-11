/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';

import type HdsAdvancedTableColumn from './models/column.ts';
import type { HdsDropdownSignature } from '../dropdown/index.ts';
import type { HdsDropdownToggleIconSignature } from '../dropdown/toggle/icon.ts';
import type { HdsAdvancedTableSignature } from './index.ts';
import { tracked } from '@glimmer/tracking';
import type { HdsAdvancedTableThResizeHandleSignature } from './th-resize-handle.ts';
import type HdsIntlService from '../../../services/hds-intl.ts';

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
    hasStickyFirstColumn?: boolean;
    hasResizableColumns?: boolean;
    resizeHandleElement?: HdsAdvancedTableThResizeHandleSignature['Element'];
    onColumnResize?: HdsAdvancedTableSignature['Args']['onColumnResize'];
    onPinFirstColumn?: () => void;
  };
  Element: HdsDropdownSignature['Element'];
}

export default class HdsAdvancedTableThContextMenu extends Component<HdsAdvancedTableThContextMenuSignature> {
  @service hdsIntl!: HdsIntlService;

  @tracked private _element!: HdsDropdownSignature['Element'];

  get _options(): HdsAdvancedTableThContextMenuOption[] {
    const { column, hasStickyFirstColumn, hasResizableColumns } = this.args;

    let options: HdsAdvancedTableThContextMenuOption[] = [];

    if (hasResizableColumns) {
      if (!column.isLast) {
        const translatedResizeLabel = this.hdsIntl.t(
          'hds.advanced-table.th-context-menu.resize',
          { default: 'Resize column' }
        );
        options = [
          ...options,
          {
            key: 'resize-column',
            label: translatedResizeLabel,
            icon: 'resize-column',
            action: this.resizeColumn.bind(this),
          },
        ];
      }

      const translatedResetWidthLabel = this.hdsIntl.t(
        'hds.advanced-table.th-context-menu.reset-width',
        { default: 'Resize column width' }
      );
      options = [
        ...options,
        {
          key: 'reset-column-width',
          label: translatedResetWidthLabel,
          icon: 'rotate-ccw',
          action: this.resetColumnWidth.bind(this),
        },
      ];
    }

    if (hasStickyFirstColumn !== undefined && column.isFirst) {
      const translatedPinLabel = this.hdsIntl.t(
        'hds.advanced-table.th-context-menu.pin',
        { default: 'Pin column' }
      );
      const translatedUnpinLabel = this.hdsIntl.t(
        'hds.advanced-table.th-context-menu.unpin',
        { default: 'Unpin column' }
      );
      options = [
        ...options,
        {
          key: 'pin-first-column',
          label: hasStickyFirstColumn
            ? translatedUnpinLabel
            : translatedPinLabel,
          icon: 'pin',
          action: this.pinFirstColumn.bind(this),
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

  @action
  pinFirstColumn(
    column: HdsAdvancedTableColumn,
    dropdownCloseCallback?: () => void
  ): void {
    const { onPinFirstColumn } = this.args;

    if (typeof onPinFirstColumn === 'function') {
      onPinFirstColumn();
    }

    dropdownCloseCallback?.();
  }
}
