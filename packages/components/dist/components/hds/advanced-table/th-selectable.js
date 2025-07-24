import Component from '@glimmer/component';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';
import { HdsAdvancedTableThSortOrderLabelValues, HdsAdvancedTableThSortOrderValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<Hds::AdvancedTable::Th\n  class=\"hds-advanced-table__th--is-selectable\"\n  aria-sort={{if this.isSortable this.ariaSort}}\n  @scope={{@selectionScope}}\n  @isStickyColumn={{@isStickyColumn}}\n  @isStickyColumnPinned={{@isStickyColumnPinned}}\n  ...attributes\n>\n  <div class=\"hds-advanced-table__th-content\">\n    <Hds::Form::Checkbox::Base\n      id={{this._checkboxId}}\n      class=\"hds-advanced-table__checkbox\"\n      checked={{@isSelected}}\n      aria-label={{this.ariaLabel}}\n      {{this._manageCheckbox}}\n      {{on \"change\" this.onSelectionChange}}\n    />\n    {{#if this.isSortable}}\n      <span id={{this._labelId}} class=\"sr-only\">selection state</span>\n      <Hds::AdvancedTable::ThButtonSort\n        @sortOrder={{@sortBySelectedOrder}}\n        @onClick={{@onClickSortBySelected}}\n        @labelId={{this._labelId}}\n      />\n    {{/if}}\n  </div>\n</Hds::AdvancedTable::Th>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsAdvancedTableThSelectable extends Component {
  static {
    g(this.prototype, "_isSelected", [tracked], function () {
      return this.args.isSelected ?? false;
    });
  }
  #_isSelected = (i(this, "_isSelected"), void 0);
  _guid = guidFor(this);
  _checkboxId = `checkbox-${this._guid}`;
  _labelId = `label-${this._guid}`;
  get isSortable() {
    return this.args.onClickSortBySelected !== undefined;
  }
  get ariaLabel() {
    const {
      selectionAriaLabelSuffix = 'row'
    } = this.args;
    return `Select ${selectionAriaLabelSuffix}`;
  }
  get ariaSort() {
    switch (this.args.sortBySelectedOrder) {
      case HdsAdvancedTableThSortOrderValues.Asc:
        return HdsAdvancedTableThSortOrderLabelValues.Asc;
      case HdsAdvancedTableThSortOrderValues.Desc:
        return HdsAdvancedTableThSortOrderLabelValues.Desc;
      default:
        // none is the default per the spec.
        return HdsAdvancedTableThSortOrderLabelValues.None;
    }
  }
  _manageCheckbox = modifier(checkbox => {
    const {
      didInsert,
      willDestroy
    } = this.args;
    if (typeof didInsert === 'function') {
      didInsert(checkbox, this.args.selectionKey);
    }
    return () => {
      if (typeof willDestroy === 'function') {
        willDestroy(this.args.selectionKey);
      }
    };
  });
  onSelectionChange(event) {
    // Assert event.target as HdsFormCheckboxBaseSignature['Element'] to access the 'checked' property
    const target = event.target;
    this._isSelected = target.checked;
    const {
      onSelectionChange
    } = this.args;
    if (typeof onSelectionChange === 'function') {
      onSelectionChange(target, this.args.selectionKey);
    }
  }
  static {
    n(this.prototype, "onSelectionChange", [action]);
  }
}
setComponentTemplate(TEMPLATE, HdsAdvancedTableThSelectable);

export { HdsAdvancedTableThSelectable as default };
//# sourceMappingURL=th-selectable.js.map
