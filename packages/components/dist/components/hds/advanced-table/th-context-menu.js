import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<Hds::Dropdown class=\"hds-advanced-table__th-context-menu\" @enableCollisionDetection={{true}} ...attributes as |D|>\n  <D.ToggleIcon\n    @icon=\"more-vertical\"\n    @text=\"Additional actions for {{@column.label}}\"\n    @hasChevron={{false}}\n    @size=\"small\"\n  />\n\n  {{#each this._options as |option|}}\n    <D.Interactive\n      @icon={{option.icon}}\n      data-test-context-option-key={{option.key}}\n      {{on \"click\" (fn option.action @column D.close)}}\n    >\n      {{option.label}}\n    </D.Interactive>\n  {{/each}}\n</Hds::Dropdown>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsAdvancedTableThContextMenu extends Component {
  static {
    g(this.prototype, "_element", [tracked]);
  }
  #_element = (i(this, "_element"), void 0);
  get _options() {
    const {
      column,
      hasResizableColumns
    } = this.args;
    let options = [];
    if (hasResizableColumns) {
      if (!column.isLast) {
        options = [...options, {
          key: 'resize-column',
          label: 'Resize column',
          icon: 'resize-column',
          action: this.resizeColumn.bind(this)
        }];
      }
      options = [...options, {
        key: 'reset-column-width',
        label: 'Reset column width',
        icon: 'rotate-ccw',
        action: this.resetColumnWidth.bind(this)
      }];
    }
    return options;
  }
  resizeColumn() {
    this.args.resizeHandleElement?.focus();
  }
  static {
    n(this.prototype, "resizeColumn", [action]);
  }
  resetColumnWidth(column, dropdownCloseCallback) {
    const {
      onColumnResize
    } = this.args;
    const {
      previous: previousColumn,
      next: nextColumn
    } = column.siblings;
    previousColumn?.onNextColumnWidthRestored(column.imposedWidthDelta);
    nextColumn?.onPreviousColumnWidthRestored();
    column.restoreWidth();
    if (typeof onColumnResize === 'function' && column.key !== undefined) {
      onColumnResize(column.key, column.width);
    }
    dropdownCloseCallback?.();
  }
  static {
    n(this.prototype, "resetColumnWidth", [action]);
  }
}
setComponentTemplate(TEMPLATE, HdsAdvancedTableThContextMenu);

export { HdsAdvancedTableThContextMenu as default };
//# sourceMappingURL=th-context-menu.js.map
