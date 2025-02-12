import { _ as _applyDecoratedDescriptor, a as _defineProperty, b as _initializerDefineProperty } from '../../../_rollupPluginBabelHelpers-C_TsMG3M.js';
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { focusable } from 'tabbable';
import { HdsAdvancedTableHorizontalAlignmentValues, HdsAdvancedTableThSortOrderLabelValues, HdsAdvancedTableThSortOrderValues } from './types.js';
import { onFocusTrapDeactivate } from '../../../modifiers/hds-advanced-table-cell/dom-management.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div\n  class={{this.classNames}}\n  aria-sort={{this.ariaSort}}\n  role=\"columnheader\"\n  aria-rowspan={{@rowspan}}\n  aria-colspan={{@colspan}}\n  {{hds-advanced-table-cell\n    handleEnableFocusTrap=this.enableFocusTrap\n    shouldTrapFocus=this._shouldTrapFocus\n    setCellElement=this.setElement\n  }}\n  {{! @glint-expect-error - https://github.com/josemarluedke/ember-focus-trap/issues/86 }}\n  {{focus-trap\n    isActive=this._shouldTrapFocus\n    focusTrapOptions=(hash\n      onDeactivate=this.onFocusTrapDeactivate initialFocus=this.getInitialFocus clickOutsideDeactivates=true\n    )\n  }}\n  ...attributes\n>\n  <div class=\"hds-advanced-table__th-content\">\n    <span id={{this._labelId}} class=\"hds-typography-body-200 hds-font-weight-semibold\">{{yield}}</span>\n    {{#if @tooltip}}\n      <Hds::AdvancedTable::ThButtonTooltip @tooltip={{@tooltip}} @labelId={{this._labelId}} />\n    {{/if}}\n    <Hds::AdvancedTable::ThButtonSort @sortOrder={{@sortOrder}} @onClick={{@onClickSort}} @labelId={{this._labelId}} />\n  </div>\n</div>");

var _class, _descriptor;
const ALIGNMENTS = Object.values(HdsAdvancedTableHorizontalAlignmentValues);
const DEFAULT_ALIGN = HdsAdvancedTableHorizontalAlignmentValues.Left;
let HdsAdvancedTableThSort = (_class = class HdsAdvancedTableThSort extends Component {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "_labelId", guidFor(this));
    _defineProperty(this, "_element", undefined);
    _initializerDefineProperty(this, "_shouldTrapFocus", _descriptor, this);
  }
  get ariaSort() {
    switch (this.args.sortOrder) {
      case HdsAdvancedTableThSortOrderValues.Asc:
        return HdsAdvancedTableThSortOrderLabelValues.Asc;
      case HdsAdvancedTableThSortOrderValues.Desc:
        return HdsAdvancedTableThSortOrderLabelValues.Desc;
      default:
        // none is the default per the spec.
        return HdsAdvancedTableThSortOrderLabelValues.None;
    }
  }
  get align() {
    const {
      align = DEFAULT_ALIGN
    } = this.args;
    assert(`@align for "Hds::Table" must be one of the following: ${ALIGNMENTS.join(', ')}; received: ${align}`, ALIGNMENTS.includes(align));
    return align;
  }
  get classNames() {
    const classes = ['hds-advanced-table__th', 'hds-advanced-table__th--sort'];

    // add a class based on the @align argument
    if (this.align) {
      classes.push(`hds-advanced-table__th--align-${this.align}`);
    }
    return classes.join(' ');
  }
  onFocusTrapDeactivate() {
    this._shouldTrapFocus = false;
    onFocusTrapDeactivate(this._element);
  }
  enableFocusTrap() {
    this._shouldTrapFocus = true;
  }
  getInitialFocus() {
    const cellFocusableElements = focusable(this._element);
    return cellFocusableElements[0];
  }
  setElement(element) {
    this._element = element;
  }
}, _descriptor = _applyDecoratedDescriptor(_class.prototype, "_shouldTrapFocus", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _applyDecoratedDescriptor(_class.prototype, "onFocusTrapDeactivate", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onFocusTrapDeactivate"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "enableFocusTrap", [action], Object.getOwnPropertyDescriptor(_class.prototype, "enableFocusTrap"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "getInitialFocus", [action], Object.getOwnPropertyDescriptor(_class.prototype, "getInitialFocus"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "setElement", [action], Object.getOwnPropertyDescriptor(_class.prototype, "setElement"), _class.prototype), _class);
setComponentTemplate(TEMPLATE, HdsAdvancedTableThSort);

export { ALIGNMENTS, DEFAULT_ALIGN, HdsAdvancedTableThSort as default };
//# sourceMappingURL=th-sort.js.map
