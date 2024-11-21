import { _ as _applyDecoratedDescriptor, b as _initializerDefineProperty, a as _defineProperty } from '../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';
import { HdsAdvancedTableThSortOrderLabelValues, HdsAdvancedTableThSortOrderValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<Hds::AdvancedTable::Th\n  class=\"hds-advanced-table__th--is-selectable\"\n  aria-sort={{if this.isSortable this.ariaSort}}\n  @scope={{@selectionScope}}\n  ...attributes\n>\n  <div class=\"hds-advanced-table__th-content\">\n    <Hds::Form::Checkbox::Base\n      id={{this.checkboxId}}\n      class=\"hds-advanced-table__checkbox\"\n      checked={{@isSelected}}\n      aria-label={{this.ariaLabel}}\n      {{did-insert this.didInsertCheckbox}}\n      {{will-destroy this.willDestroyNode}}\n      {{on \"change\" this.onSelectionChange}}\n    />\n    {{#if this.isSortable}}\n      <span id={{this.labelId}} class=\"sr-only\">selection state</span>\n      <Hds::AdvancedTable::ThButtonSort\n        @sortOrder={{@sortBySelectedOrder}}\n        @onClick={{@onClickSortBySelected}}\n        @labelId={{this.labelId}}\n      />\n    {{/if}}\n  </div>\n</Hds::AdvancedTable::Th>");

var _class, _descriptor;
let HdsAdvancedTableThSelectable = (_class = class HdsAdvancedTableThSelectable extends Component {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "isSelected", _descriptor, this);
    _defineProperty(this, "guid", guidFor(this));
    _defineProperty(this, "checkboxId", `checkbox-${this.guid}`);
    _defineProperty(this, "labelId", `label-${this.guid}`);
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
      case HdsAdvancedTableThSortOrderValues.Asc:
        return HdsAdvancedTableThSortOrderLabelValues.Asc;
      case HdsAdvancedTableThSortOrderValues.Desc:
        return HdsAdvancedTableThSortOrderLabelValues.Desc;
      default:
        // none is the default per the spec.
        return HdsAdvancedTableThSortOrderLabelValues.None;
    }
  }
  didInsertCheckbox(checkbox) {
    const {
      didInsertCheckbox
    } = this.args;
    if (typeof didInsertCheckbox === 'function') {
      didInsertCheckbox(checkbox, this.args.selectionKey);
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
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "isSelected", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.args.isSelected ?? false;
  }
}), _applyDecoratedDescriptor(_class.prototype, "didInsertCheckbox", [action], Object.getOwnPropertyDescriptor(_class.prototype, "didInsertCheckbox"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "willDestroyNode", [action], Object.getOwnPropertyDescriptor(_class.prototype, "willDestroyNode"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onSelectionChange", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onSelectionChange"), _class.prototype)), _class);
setComponentTemplate(TEMPLATE, HdsAdvancedTableThSelectable);

export { HdsAdvancedTableThSelectable as default };
//# sourceMappingURL=th-selectable.js.map
