import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<button\n  type=\"button\"\n  class={{this.classNames}}\n  {{hds-tooltip this.text options=this.options}}\n  ...attributes\n>{{~yield~}}</button>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const PLACEMENTS = ['top', 'top-start', 'top-end', 'right', 'right-start', 'right-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end'];
class HdsTooltipIndexComponent extends Component {
  /**
   * @param text
   * @type {string}
   * @description text content for tooltip
   */
  get text() {
    let {
      text
    } = this.args;
    assert('@text for "Hds::TooltipButton" must have a valid value', text !== undefined);
    return text;
  }
  get options() {
    let {
      placement
    } = this.args;
    assert('@placement for "Hds::TooltipButton" must have a valid value', placement == undefined || PLACEMENTS.includes(placement));
    return {
      ...this.args.extraTippyOptions,
      // takes string
      placement: placement,
      // takes array of 2 numbers (skidding, distance): array(0, 0)
      offset: this.args.offset
    };
  }

  /**
   * @param isInline
   * @type {boolean}
   * @default true
   * @description sets display for the button
   */
  get isInline() {
    let {
      isInline = true
    } = this.args;
    return isInline;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-tooltip-button'];

    // add a class based on the @isInline argument
    if (this.isInline) {
      classes.push('hds-tooltip-button--is-inline');
    } else {
      classes.push('hds-tooltip-button--is-block');
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsTooltipIndexComponent);

export { PLACEMENTS, HdsTooltipIndexComponent as default };
//# sourceMappingURL=index.js.map
