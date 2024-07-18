import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<label class={{this.classNames}} for={{@controlId}} id={{this.id}} ...attributes>\n  {{yield}}\n  <Hds::Form::Indicator @isRequired={{@isRequired}} @isOptional={{@isOptional}} />\n</label>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const ID_PREFIX = 'label-';
class HdsFormLabelComponent extends Component {
  /**
   * Determines the unique ID to assign to the element
   * @method id
   * @return {(string|null)} The "id" attribute to apply to the element or null, if no controlId is provided
   */
  get id() {
    const {
      controlId
    } = this.args;
    if (controlId) {
      return `${ID_PREFIX}${controlId}`;
    }
    return null;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-form-label'];

    // add typographic classes
    classes.push('hds-typography-body-200', 'hds-font-weight-semibold');

    // add a class based on the @contextualClass argument
    // notice: this will *not* be documented for public use
    // the reason for this is that the contextual component declarations don't pass attributes to the component
    if (this.args.contextualClass) {
      classes.push(this.args.contextualClass);
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsFormLabelComponent);

export { ID_PREFIX, HdsFormLabelComponent as default };
//# sourceMappingURL=index.js.map
