import { _ as _applyDecoratedDescriptor, b as _initializerDefineProperty, a as _defineProperty } from '../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<Hds::Table::Th class=\"hds-table__th--is-selectable\" @scope={{@selectionScope}} ...attributes>\n  <Hds::Form::Checkbox::Base\n    id={{this.checkboxId}}\n    class=\"hds-table__checkbox\"\n    checked={{@isSelected}}\n    aria-label={{this.ariaLabel}}\n    {{did-insert this.didInsert}}\n    {{will-destroy this.willDestroy}}\n    {{on \"change\" this.onSelectionChange}}\n  />\n</Hds::Table::Th>");

var _class, _descriptor;
let HdsTableThSelectableComponent = (_class = class HdsTableThSelectableComponent extends Component {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "isSelected", _descriptor, this);
    /**
     * Generate a unique ID for the Checkbox
     * @return {string}
     */
    _defineProperty(this, "checkboxId", 'checkbox-' + guidFor(this));
  }
  get ariaLabel() {
    let {
      selectionAriaLabelSuffix
    } = this.args;
    const prefix = this.isSelected ? 'Deselect' : 'Select';
    if (selectionAriaLabelSuffix) {
      return `${prefix} ${selectionAriaLabelSuffix}`;
    } else {
      return prefix;
    }
  }
  didInsert(checkbox) {
    let {
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
  willDestroy(checkbox) {
    super.willDestroy(...arguments);
    let {
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
    this.isSelected = event.target.checked;
    let {
      onSelectionChange
    } = this.args;
    if (typeof onSelectionChange === 'function') {
      onSelectionChange(event.target, this.args.selectionKey);
    }
  }
  updateAriaLabel(event) {
    // updating the `isSelected` value will trigger the update of the `aria-label` value via the `ariaLabel` getter
    this.isSelected = event.target.checked;
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "isSelected", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.args.isSelected;
  }
}), _applyDecoratedDescriptor(_class.prototype, "didInsert", [action], Object.getOwnPropertyDescriptor(_class.prototype, "didInsert"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "willDestroy", [action], Object.getOwnPropertyDescriptor(_class.prototype, "willDestroy"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onSelectionChange", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onSelectionChange"), _class.prototype)), _class);
setComponentTemplate(TEMPLATE, HdsTableThSelectableComponent);

export { HdsTableThSelectableComponent as default };
//# sourceMappingURL=th-selectable.js.map
