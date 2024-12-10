import { _ as _applyDecoratedDescriptor, b as _initializerDefineProperty, a as _defineProperty } from '../../../_rollupPluginBabelHelpers-81503waH.js';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';
import { HdsTableThSortOrderLabelValues, HdsTableThSortOrderValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<Hds::Table::Th\n  class=\"hds-table__th--is-selectable\"\n  aria-sort={{if this.isSortable this.ariaSort}}\n  @scope={{@selectionScope}}\n  ...attributes\n>\n  <div class=\"hds-table__th-content\">\n    <Hds::Form::Checkbox::Base\n      id={{this._checkboxId}}\n      class=\"hds-table__checkbox\"\n      checked={{@isSelected}}\n      aria-label={{this.ariaLabel}}\n      {{did-insert this.didInsert}}\n      {{will-destroy this.willDestroyNode}}\n      {{on \"change\" this.onSelectionChange}}\n    />\n    {{#if this.isSortable}}\n      <span id={{this._labelId}} class=\"sr-only\">selection state</span>\n      <Hds::Table::ThButtonSort\n        @sortOrder={{@sortBySelectedOrder}}\n        @onClick={{@onClickSortBySelected}}\n        @labelId={{this._labelId}}\n      />\n    {{/if}}\n  </div>\n</Hds::Table::Th>");

var _class, _descriptor;
let HdsTableThSelectable = (_class = class HdsTableThSelectable extends Component {
  constructor(owner, args) {
    super(owner, args);
    _initializerDefineProperty(this, "isSelected", _descriptor, this);
    _defineProperty(this, "_guid", guidFor(this));
    _defineProperty(this, "_checkboxId", `checkbox-${this._guid}`);
    _defineProperty(this, "_labelId", `label-${this._guid}`);
    this.isSelected = this.args.isSelected ?? false;
  }
  get isSortable() {
    return this.args.onClickSortBySelected !== undefined;
  }
  get ariaLabel() {
    const {
      selectionAriaLabelSuffix
    } = this.args;
    const prefix = this.isSelected ? 'Deselect' : 'Select';
    if (selectionAriaLabelSuffix) {
      return `${prefix} ${selectionAriaLabelSuffix}`;
    } else {
      return prefix;
    }
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
      // we need to use a custom event listener here because changing the `checked` value via JS
      // (and this happens with the "select all") doesn't trigger the `change` event
      // and consequently the `aria-label` won't be automatically updated (and so we have to force it)
      checkbox.addEventListener('toggle', this.updateAriaLabel.bind(this), true);
    }
  }
  willDestroyNode(checkbox) {
    super.willDestroy();
    const {
      willDestroy
    } = this.args;
    if (typeof willDestroy === 'function') {
      willDestroy(this.args.selectionKey);
      if (checkbox) {
        checkbox.removeEventListener('toggle', this.updateAriaLabel.bind(this), true);
      }
    }
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
  updateAriaLabel(event) {
    // Assert event.target as HTMLInputElement to access the 'checked' property
    const target = event.target;
    this.isSelected = target.checked;
  }
}, _descriptor = _applyDecoratedDescriptor(_class.prototype, "isSelected", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class.prototype, "didInsert", [action], Object.getOwnPropertyDescriptor(_class.prototype, "didInsert"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "willDestroyNode", [action], Object.getOwnPropertyDescriptor(_class.prototype, "willDestroyNode"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onSelectionChange", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onSelectionChange"), _class.prototype), _class);
setComponentTemplate(TEMPLATE, HdsTableThSelectable);

export { HdsTableThSelectable as default };
//# sourceMappingURL=th-selectable.js.map
