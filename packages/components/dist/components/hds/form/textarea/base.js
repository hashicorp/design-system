import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{! Notice: this is not the native HTML <textarea> but the Ember component <Textarea> }}\n<Textarea class={{this.classNames}} {{style width=@width height=@height}} rows=\"4\" ...attributes @value={{@value}} />");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsFormTextareaBaseComponent extends Component {
  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-form-textarea'];

    // add typographic classes
    classes.push('hds-typography-body-200', 'hds-font-weight-regular');

    // add a class based on the @isInvalid argument
    if (this.args.isInvalid) {
      classes.push(`hds-form-textarea--is-invalid`);
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsFormTextareaBaseComponent);

export { HdsFormTextareaBaseComponent as default };
//# sourceMappingURL=base.js.map
