import { a as _defineProperty } from '../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<button\n  type=\"button\"\n  class={{this.classNames}}\n  {{hds-tooltip @tooltip}}\n  aria-labelledby=\"{{this.prefixLabelId}} {{@labelId}}\"\n  ...attributes\n>\n  <span id={{this.prefixLabelId}} class=\"hds-table__th-button-aria-label-hidden-segment\">More information for</span>\n  <FlightIcon @name=\"info\" />\n</button>");

class HdsTableThButtonTooltipComponent extends Component {
  constructor(...args) {
    super(...args);
    /**
     * Generates a unique ID for the (hidden) "label prefix" <span> element
     *
     * @param prefixLabelId
     */
    _defineProperty(this, "prefixLabelId", guidFor(this));
  }
  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-table__th-button', 'hds-table__th-button--tooltip'];
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsTableThButtonTooltipComponent);

export { HdsTableThButtonTooltipComponent as default };
//# sourceMappingURL=th-button-tooltip.js.map
