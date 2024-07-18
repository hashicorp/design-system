import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<select class={{this.classNames}} {{style width=@width}} ...attributes>\n  {{yield (hash Options=(component \"hds/yield\"))}}\n</select>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsFormSelectBaseComponent extends Component {
  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-form-select'];

    // add typographic classes
    classes.push('hds-typography-body-200', 'hds-font-weight-regular');

    // add a class based on the @isInvalid argument
    if (this.args.isInvalid) {
      classes.push(`hds-form-select--is-invalid`);
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsFormSelectBaseComponent);

export { HdsFormSelectBaseComponent as default };
//# sourceMappingURL=base.js.map
