import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { focusable } from 'tabbable';
import { HdsAdvancedTableHorizontalAlignmentValues } from './types.js';
import { onFocusTrapDeactivate } from '../../../modifiers/hds-advanced-table-cell/dom-management.js';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div\n  class={{this.classNames}}\n  role={{this.role}}\n  aria-rowspan={{@rowspan}}\n  aria-colspan={{@colspan}}\n  aria-describedby={{@parentId}}\n  {{style grid-row=this.rowspan grid-column=this.colspan padding-left=this.paddingLeft}}\n  {{hds-advanced-table-cell\n    handleEnableFocusTrap=this.enableFocusTrap\n    shouldTrapFocus=this._shouldTrapFocus\n    setCellElement=this.setElement\n  }}\n  {{! @glint-expect-error - https://github.com/josemarluedke/ember-focus-trap/issues/86 }}\n  {{focus-trap\n    isActive=this._shouldTrapFocus\n    focusTrapOptions=(hash\n      onDeactivate=this.onFocusTrapDeactivate initialFocus=this.getInitialFocus clickOutsideDeactivates=true\n    )\n  }}\n  ...attributes\n>\n  {{#if @isVisuallyHidden}}\n    <span class=\"sr-only\">{{yield}}</span>\n  {{else}}\n    {{#if @tooltip}}\n      <div class=\"hds-advanced-table__th-content\">\n        {{#if @isExpandable}}\n          <Hds::AdvancedTable::ThButtonExpand\n            @labelId={{this._labelId}}\n            @onToggle={{@onClickToggle}}\n            @isExpanded={{@isExpanded}}\n          />\n        {{/if}}\n        <span id={{this._labelId}} class=\"hds-typography-body-200 hds-font-weight-semibold\">{{yield}}</span>\n        <Hds::AdvancedTable::ThButtonTooltip @tooltip={{@tooltip}} @labelId={{this._labelId}} />\n      </div>\n    {{else}}\n      <div class=\"hds-advanced-table__th-content\">\n        {{#if @isExpandable}}\n          <Hds::AdvancedTable::ThButtonExpand\n            @labelId={{this._labelId}}\n            @onToggle={{@onClickToggle}}\n            @isExpanded={{@isExpanded}}\n          />\n        {{/if}}\n        <span class=\"hds-typography-body-200 hds-font-weight-semibold\" id={{this._labelId}}>{{yield}}</span>\n      </div>\n    {{/if}}\n  {{/if}}\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const ALIGNMENTS = Object.values(HdsAdvancedTableHorizontalAlignmentValues);
const DEFAULT_ALIGN = HdsAdvancedTableHorizontalAlignmentValues.Left;
class HdsAdvancedTableTh extends Component {
  _labelId = this.args.newLabel ? this.args.newLabel : guidFor(this);
  _element;
  static {
    g(this.prototype, "_shouldTrapFocus", [tracked], function () {
      return false;
    });
  }
  #_shouldTrapFocus = (i(this, "_shouldTrapFocus"), undefined);
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
  static {
    n(this.prototype, "onFocusTrapDeactivate", [action]);
  }
  enableFocusTrap() {
    this._shouldTrapFocus = true;
  }
  static {
    n(this.prototype, "enableFocusTrap", [action]);
  }
  getInitialFocus() {
    const cellFocusableElements = focusable(this._element);
    return cellFocusableElements[0];
  }
  static {
    n(this.prototype, "getInitialFocus", [action]);
  }
  setElement(element) {
    this._element = element;
  }
  static {
    n(this.prototype, "setElement", [action]);
  }
}
setComponentTemplate(TEMPLATE, HdsAdvancedTableTh);

export { ALIGNMENTS, DEFAULT_ALIGN, HdsAdvancedTableTh as default };
//# sourceMappingURL=th.js.map
