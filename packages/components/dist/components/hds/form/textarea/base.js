import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{! Notice: this is not the native HTML <textarea> but the Ember component <Textarea> }}\n<Textarea\n  class={{this.classNames}}\n  {{style width=@width height=@height}}\n  rows=\"4\"\n  id={{@id}}\n  aria-describedby={{@ariaDescribedBy}}\n  ...attributes\n  @value={{@value}}\n/>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsFormTextareaBase extends Component {
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
setComponentTemplate(TEMPLATE, HdsFormTextareaBase);

export { HdsFormTextareaBase as default };
//# sourceMappingURL=base.js.map
