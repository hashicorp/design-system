import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<input class={{this.classNames}} {{style width=@width}} ...attributes value={{@value}} type={{this.type}} />");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const DEFAULT_TYPE = 'text';
const TYPES = ['text', 'email', 'password', 'url', 'date', 'time', 'datetime-local', 'search'];
class HdsFormTextInputBaseComponent extends Component {
  /**
   * Sets the type of input
   *
   * @param type
   * @type {string}
   * @default 'text'
   */
  get type() {
    let {
      type = DEFAULT_TYPE
    } = this.args;
    assert(`@type for "Hds::Form::TextInput" must be one of the following: ${TYPES.join(', ')}; received: ${type}`, TYPES.includes(type));
    return type;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-form-text-input'];

    // add typographic classes
    classes.push('hds-typography-body-200', 'hds-font-weight-regular');

    // add a class based on the @isInvalid argument
    if (this.args.isInvalid) {
      classes.push(`hds-form-text-input--is-invalid`);
    }

    // add a class based on the @hasVisibilityToggle argument
    if (this.args.hasVisibilityToggle) {
      classes.push(`hds-form-text-input--has-visibility-toggle`);
    }

    // add a class based on the @isLoading argument
    if (this.args.isLoading) {
      classes.push(`hds-form-text-input--is-loading`);
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsFormTextInputBaseComponent);

export { DEFAULT_TYPE, TYPES, HdsFormTextInputBaseComponent as default };
//# sourceMappingURL=base.js.map
