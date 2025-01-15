import { _ as _applyDecoratedDescriptor, b as _initializerDefineProperty, a as _defineProperty } from '../../../_rollupPluginBabelHelpers-C_TsMG3M.js';
import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { focusable } from 'tabbable';
import { HdsAdvancedTableHorizontalAlignmentValues } from './types.js';
import { onFocusTrapDeactivate, didInsertGridCell, handleGridCellKeyPress, updateTabbableChildren } from './helpers.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div\n  class={{this.classNames}}\n  role=\"gridcell\"\n  aria-rowspan={{@rowspan}}\n  aria-colspan={{@colspan}}\n  {{style grid-row=this.rowspan grid-column=this.colspan}}\n  {{did-insert this.didInsert}}\n  {{will-destroy this.willDestroy}}\n  {{! @glint-expect-error - https://github.com/josemarluedke/ember-focus-trap/issues/86 }}\n  {{focus-trap\n    isActive=this._shouldTrapFocus\n    shouldSelfFocus=true\n    focusTrapOptions=(hash\n      onDeactivate=this.onFocusTrapDeactivate initialFocus=this.getInitialFocus clickOutsideDeactivates=true\n    )\n  }}\n  ...attributes\n>\n  {{yield}}\n</div>");

var _class, _descriptor;
const ALIGNMENTS = Object.values(HdsAdvancedTableHorizontalAlignmentValues);
const DEFAULT_ALIGN = HdsAdvancedTableHorizontalAlignmentValues.Left;
let HdsAdvancedTableTd = (_class = class HdsAdvancedTableTd extends Component {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "_shouldTrapFocus", _descriptor, this);
    _defineProperty(this, "_element", undefined);
    _defineProperty(this, "_observer", undefined);
  }
  // rowspan and colspan have to return 'auto' if not defined because otherwise the style modifier sets grid-area: undefined on the cell, which breaks the grid styles
  get rowspan() {
    if (this.args.rowspan) {
      return `span ${this.args.rowspan}`;
    }
    return 'auto';
  }
  get colspan() {
    if (this.args.colspan) {
      return `span ${this.args.colspan}`;
    }
    return 'auto';
  }
  get align() {
    const {
      align = DEFAULT_ALIGN
    } = this.args;
    assert(`@align for "Hds::AdvancedTable::Td" must be one of the following: ${ALIGNMENTS.join(', ')}; received: ${align}`, ALIGNMENTS.includes(align));
    return align;
  }
  get classNames() {
    const classes = ['hds-advanced-table__td', 'hds-typography-body-200', 'hds-font-weight-regular'];

    // add a class based on the @align argument
    if (this.align) {
      classes.push(`hds-advanced-table__td--align-${this.align}`);
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
  didInsert(element) {
    this._element = element;
    didInsertGridCell(element);
    element.addEventListener('keydown', event => {
      handleGridCellKeyPress(event, this.enableFocusTrap);
    });
    this._observer = new MutationObserver(() => {
      updateTabbableChildren(this._element, this._shouldTrapFocus);
    });
    this._observer.observe(this._element, {
      childList: true,
      subtree: true
    });
  }
  willDestroy() {
    super.willDestroy();
    if (this._observer) {
      this._observer.disconnect();
    }
  }
}, _descriptor = _applyDecoratedDescriptor(_class.prototype, "_shouldTrapFocus", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _applyDecoratedDescriptor(_class.prototype, "onFocusTrapDeactivate", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onFocusTrapDeactivate"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "enableFocusTrap", [action], Object.getOwnPropertyDescriptor(_class.prototype, "enableFocusTrap"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "getInitialFocus", [action], Object.getOwnPropertyDescriptor(_class.prototype, "getInitialFocus"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "didInsert", [action], Object.getOwnPropertyDescriptor(_class.prototype, "didInsert"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "willDestroy", [action], Object.getOwnPropertyDescriptor(_class.prototype, "willDestroy"), _class.prototype), _class);
setComponentTemplate(TEMPLATE, HdsAdvancedTableTd);

export { ALIGNMENTS, DEFAULT_ALIGN, HdsAdvancedTableTd as default };
//# sourceMappingURL=td.js.map
