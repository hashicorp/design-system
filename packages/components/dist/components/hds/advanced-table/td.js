import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { focusable } from 'tabbable';
import { HdsAdvancedTableHorizontalAlignmentValues } from './types.js';
import { onFocusTrapDeactivate } from '../../../modifiers/hds-advanced-table-cell/dom-management.js';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div\n  class={{this.classNames}}\n  role=\"gridcell\"\n  aria-rowspan={{@rowspan}}\n  aria-colspan={{@colspan}}\n  {{style grid-row=this.rowspan grid-column=this.colspan}}\n  {{hds-advanced-table-cell\n    handleEnableFocusTrap=this.enableFocusTrap\n    shouldTrapFocus=this._shouldTrapFocus\n    setCellElement=this.setElement\n  }}\n  {{! @glint-expect-error - https://github.com/josemarluedke/ember-focus-trap/issues/86 }}\n  {{focus-trap\n    isActive=this._shouldTrapFocus\n    focusTrapOptions=(hash\n      onDeactivate=this.onFocusTrapDeactivate initialFocus=this.getInitialFocus clickOutsideDeactivates=true\n    )\n  }}\n  ...attributes\n>\n  {{yield}}\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const ALIGNMENTS = Object.values(HdsAdvancedTableHorizontalAlignmentValues);
const DEFAULT_ALIGN = HdsAdvancedTableHorizontalAlignmentValues.Left;
class HdsAdvancedTableTd extends Component {
  static {
    g(this.prototype, "_shouldTrapFocus", [tracked], function () {
      return false;
    });
  }
  #_shouldTrapFocus = (i(this, "_shouldTrapFocus"), undefined);
  _element;

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
    const classes = ['hds-advanced-table__td'];

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
setComponentTemplate(TEMPLATE, HdsAdvancedTableTd);

export { ALIGNMENTS, DEFAULT_ALIGN, HdsAdvancedTableTd as default };
//# sourceMappingURL=td.js.map
