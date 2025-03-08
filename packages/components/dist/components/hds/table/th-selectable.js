import Component from '@glimmer/component';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';
import { HdsTableThSortOrderLabelValues, HdsTableThSortOrderValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<Hds::Table::Th\n  class=\"hds-table__th--is-selectable\"\n  aria-sort={{if this.isSortable this.ariaSort}}\n  @scope={{@selectionScope}}\n  ...attributes\n>\n  <div class=\"hds-table__th-content\">\n    <Hds::Form::Checkbox::Base\n      id={{this._checkboxId}}\n      class=\"hds-table__checkbox\"\n      checked={{@isSelected}}\n      aria-label={{this.ariaLabel}}\n      {{did-insert this.didInsert}}\n      {{will-destroy this.willDestroyNode}}\n      {{on \"change\" this.onSelectionChange}}\n    />\n    {{#if this.isSortable}}\n      <span id={{this._labelId}} class=\"sr-only\">selection state</span>\n      <Hds::Table::ThButtonSort\n        @sortOrder={{@sortBySelectedOrder}}\n        @onClick={{@onClickSortBySelected}}\n        @labelId={{this._labelId}}\n      />\n    {{/if}}\n  </div>\n</Hds::Table::Th>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsTableThSelectable extends Component {
  static {
    g(this.prototype, "isSelected", [tracked]);
  }
  #isSelected = (i(this, "isSelected"), undefined);
  _guid = guidFor(this);
  _checkboxId = `checkbox-${this._guid}`;
  _labelId = `label-${this._guid}`;
  constructor(owner, args) {
    super(owner, args);
    this.isSelected = this.args.isSelected ?? false;
  }
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
      case HdsTableThSortOrderValues.Asc:
        return HdsTableThSortOrderLabelValues.Asc;
      case HdsTableThSortOrderValues.Desc:
        return HdsTableThSortOrderLabelValues.Desc;
      default:
        // none is the default per the spec.
        return HdsTableThSortOrderLabelValues.None;
    }
  }
  didInsert(checkbox) {
    const {
      didInsert
    } = this.args;
    if (typeof didInsert === 'function') {
      didInsert(checkbox, this.args.selectionKey);
    }
  }
  static {
    n(this.prototype, "didInsert", [action]);
  }
  willDestroyNode() {
    super.willDestroy();
    const {
      willDestroy
    } = this.args;
    if (typeof willDestroy === 'function') {
      willDestroy(this.args.selectionKey);
    }
  }
  static {
    n(this.prototype, "willDestroyNode", [action]);
  }
  onSelectionChange(event) {
    // Assert event.target as HdsFormCheckboxBaseSignature['Element'] to access the 'checked' property
    const target = event.target;
    this.isSelected = target.checked;
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
setComponentTemplate(TEMPLATE, HdsTableThSelectable);

export { HdsTableThSelectable as default };
//# sourceMappingURL=th-selectable.js.map
