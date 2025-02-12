import { a as _defineProperty } from '../../../_rollupPluginBabelHelpers-C_TsMG3M.js';
import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { guidFor } from '@ember/object/internals';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<button\n  type=\"button\"\n  class={{this.classNames}}\n  {{hds-tooltip this.tooltip}}\n  aria-labelledby=\"{{this._prefixLabelId}} {{@labelId}}\"\n  ...attributes\n>\n  <span id={{this._prefixLabelId}} class=\"hds-advanced-table__th-button-aria-label-hidden-segment\">More information for</span>\n  <Hds::Icon @name=\"info\" />\n</button>");

class HdsAdvancedTableThButtonTooltip extends Component {
  constructor(...args) {
    super(...args);
    // Generates a unique ID for the (hidden) "label prefix" <span> element
    _defineProperty(this, "_prefixLabelId", guidFor(this));
  }
  get tooltip() {
    assert(`@tooltip for "HdsAdvancedTableThButtonTooltip" must be a string`, typeof this.args.tooltip === 'string');
    return this.args.tooltip;
  }
  get classNames() {
    const classes = ['hds-advanced-table__th-button', 'hds-advanced-table__th-button--tooltip'];
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsAdvancedTableThButtonTooltip);

export { HdsAdvancedTableThButtonTooltip as default };
//# sourceMappingURL=th-button-tooltip.js.map
