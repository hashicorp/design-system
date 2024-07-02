import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<Hds::Button\n  @text={{@text}}\n  @color=\"tertiary\"\n  @icon=\"chevron-down\"\n  aria-expanded={{if @isOpen \"true\" \"false\"}}\n  class={{this.classNames}}\n  ...attributes\n/>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsRevealToggleButtonComponent extends Component {
  /**
   * Get the class names to apply to the component.
   * @method ToggleButton#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-reveal__toggle-button'];

    // add a class based on the @isOpen argument
    if (this.args.isOpen) {
      classes.push('hds-reveal__toggle-button--is-open');
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsRevealToggleButtonComponent);

export { HdsRevealToggleButtonComponent as default };
//# sourceMappingURL=button.js.map
