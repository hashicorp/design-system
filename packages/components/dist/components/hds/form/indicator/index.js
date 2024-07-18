import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{#if @isOptional}}\n  <Hds::Text::Body class={{this.classNames}} tag=\"span\" @size=\"100\" @weight=\"regular\">(Optional)</Hds::Text::Body>\n{{/if}}\n{{#if @isRequired}}\n  &nbsp;<Hds::Badge aria-hidden=\"true\" class={{this.classNames}} @size=\"small\" @color=\"neutral\" @text=\"Required\" />\n{{/if}}");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsFormIndicatorComponent extends Component {
  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-form-indicator'];
    if (this.args.isOptional) {
      // add speficic class for "optional" indicator
      classes.push('hds-form-indicator--optional');
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsFormIndicatorComponent);

export { HdsFormIndicatorComponent as default };
//# sourceMappingURL=index.js.map
