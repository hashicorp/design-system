/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';

import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';
import type HdsIntlService from '../../../services/hds-intl.ts';
import HdsDropdown from '../dropdown/index.gts';
import type { HdsDropdownSignature } from '../dropdown/index.ts';
import type { HdsDropdownToggleIconSignature } from '../dropdown/toggle/icon.ts';
import type { HdsAdvancedTableSignature } from './index.ts';
import type HdsAdvancedTableColumn from './models/column.ts';
import type { HdsAdvancedTableThResizeHandleSignature } from './th-resize-handle.gts';

interface HdsAdvancedTableThContextMenuOption {
  key: string;
  label: string;
  icon: HdsDropdownToggleIconSignature['Args']['icon'];
  action: (
    column: HdsAdvancedTableColumn,
    dropdownCloseCallback: () => void
  ) => void;
}

export interface HdsAdvancedTableThContextMenuSignature {
  Args: {
    column: HdsAdvancedTableColumn;
    isStickyColumn?: boolean;
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
    const { column, isStickyColumn, hasResizableColumns } = this.args;

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
        { default: 'Reset column width' }
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

    if (isStickyColumn !== undefined && column.isFirst) {
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
          label: isStickyColumn ? translatedUnpinLabel : translatedPinLabel,
          icon: isStickyColumn ? 'pin-off' : 'pin',
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
    dropdownCloseCallback: () => void
  ): void {
    const { onColumnResize } = this.args;

    column.restoreWidth();

    if (typeof onColumnResize === 'function' && column.key !== undefined) {
      onColumnResize(column.key, column.width);
    }

    dropdownCloseCallback();
  }

  @action
  pinFirstColumn(
    column: HdsAdvancedTableColumn,
    dropdownCloseCallback: () => void
  ): void {
    const { onPinFirstColumn } = this.args;

    if (typeof onPinFirstColumn === 'function') {
      onPinFirstColumn();
    }

    dropdownCloseCallback();
  }

  <template>
    <HdsDropdown
      class="hds-advanced-table__th-context-menu"
      @enableCollisionDetection={{true}}
      ...attributes
      as |D|
    >
      <D.ToggleIcon
        @icon="more-vertical"
        @text="Additional actions for {{@column.label}}"
        @hasChevron={{false}}
        @size="small"
      />

      {{#each this._options as |option|}}
        <D.Interactive
          @icon={{option.icon}}
          data-test-context-option-key={{option.key}}
          {{! @glint-expect-error }}
          {{on "click" (fn option.action @column D.close)}}
        >
          {{option.label}}
        </D.Interactive>
      {{/each}}
    </HdsDropdown>
  </template>
}
