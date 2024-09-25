import { a as _defineProperty } from '../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { guidFor } from '@ember/object/internals';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<button\n  type=\"button\"\n  class={{this.classNames}}\n  {{hds-tooltip this.tooltip}}\n  aria-labelledby=\"{{this.prefixLabelId}} {{@labelId}}\"\n  ...attributes\n>\n  <span id={{this.prefixLabelId}} class=\"hds-table__th-button-aria-label-hidden-segment\">More information for</span>\n  <Hds::Icon @name=\"info\" />\n</button>");

class HdsTableThButtonTooltip extends Component {
  constructor(...args) {
    super(...args);
    // Generates a unique ID for the (hidden) "label prefix" <span> element
    _defineProperty(this, "prefixLabelId", guidFor(this));
  }
  get tooltip() {
    assert(`@tooltip for "HdsTableThButtonTooltip" must be a string`, typeof this.args.tooltip === 'string');
    return this.args.tooltip;
  }
  get classNames() {
    const classes = ['hds-table__th-button', 'hds-table__th-button--tooltip'];
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsTableThButtonTooltip);

export { HdsTableThButtonTooltip as default };
//# sourceMappingURL=th-button-tooltip.js.map
