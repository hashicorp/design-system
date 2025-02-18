import { _ as _applyDecoratedDescriptor, a as _defineProperty, b as _initializerDefineProperty } from '../../../_rollupPluginBabelHelpers-C_TsMG3M.js';
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { focusable } from 'tabbable';
import { HdsAdvancedTableHorizontalAlignmentValues } from './types.js';
import { onFocusTrapDeactivate } from '../../../modifiers/hds-advanced-table-cell/dom-management.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div\n  class={{this.classNames}}\n  role={{this.role}}\n  aria-rowspan={{@rowspan}}\n  aria-colspan={{@colspan}}\n  aria-describedby={{@parentId}}\n  {{style grid-row=this.rowspan grid-column=this.colspan padding-left=this.paddingLeft}}\n  {{hds-advanced-table-cell\n    handleEnableFocusTrap=this.enableFocusTrap\n    shouldTrapFocus=this._shouldTrapFocus\n    setCellElement=this.setElement\n  }}\n  {{! @glint-expect-error - https://github.com/josemarluedke/ember-focus-trap/issues/86 }}\n  {{focus-trap\n    isActive=this._shouldTrapFocus\n    focusTrapOptions=(hash\n      onDeactivate=this.onFocusTrapDeactivate initialFocus=this.getInitialFocus clickOutsideDeactivates=true\n    )\n  }}\n  ...attributes\n>\n  {{#if @isVisuallyHidden}}\n    <span class=\"sr-only\">{{yield}}</span>\n  {{else}}\n    {{#if @tooltip}}\n      <div class=\"hds-advanced-table__th-content\">\n        {{#if @isExpandable}}\n          <Hds::AdvancedTable::ThButtonExpand\n            @labelId={{this._labelId}}\n            @onToggle={{@onClickToggle}}\n            @isExpanded={{@isExpanded}}\n          />\n        {{/if}}\n        <span id={{this._labelId}} class=\"hds-typography-body-200 hds-font-weight-semibold\">{{yield}}</span>\n        <Hds::AdvancedTable::ThButtonTooltip @tooltip={{@tooltip}} @labelId={{this._labelId}} />\n      </div>\n    {{else}}\n      <div class=\"hds-advanced-table__th-content\">\n        {{#if @isExpandable}}\n          <Hds::AdvancedTable::ThButtonExpand\n            @labelId={{this._labelId}}\n            @onToggle={{@onClickToggle}}\n            @isExpanded={{@isExpanded}}\n          />\n        {{/if}}\n        <span class=\"hds-typography-body-200 hds-font-weight-semibold\" id={{this._labelId}}>{{yield}}</span>\n      </div>\n    {{/if}}\n  {{/if}}\n</div>");

var _class, _descriptor;
const ALIGNMENTS = Object.values(HdsAdvancedTableHorizontalAlignmentValues);
const DEFAULT_ALIGN = HdsAdvancedTableHorizontalAlignmentValues.Left;
let HdsAdvancedTableTh = (_class = class HdsAdvancedTableTh extends Component {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "_labelId", this.args.newLabel ? this.args.newLabel : guidFor(this));
    _defineProperty(this, "_element", undefined);
    _initializerDefineProperty(this, "_shouldTrapFocus", _descriptor, this);
  }
  get scope() {
    const {
      scope = 'col'
    } = this.args;
    return scope;
  }
  get role() {
    if (this.scope === 'col') return 'columnheader';else return 'rowheader';
  }
  get align() {
    const {
      align = DEFAULT_ALIGN
    } = this.args;
    assert(`@align for "Hds::Table::Th" must be one of the following: ${ALIGNMENTS.join(', ')}; received: ${align}`, ALIGNMENTS.includes(align));
    return align;
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
  get paddingLeft() {
    if (this.args.depth) {
      return `calc(${this.args.depth} * 32px + 16px)`;
    }
  }
  get classNames() {
    const classes = ['hds-advanced-table__th'];

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
setComponentTemplate(TEMPLATE, HdsAdvancedTableTh);

export { ALIGNMENTS, DEFAULT_ALIGN, HdsAdvancedTableTh as default };
//# sourceMappingURL=th.js.map
