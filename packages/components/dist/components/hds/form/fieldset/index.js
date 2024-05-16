import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { getElementId } from '../../../../utils/hds-get-element-id.js';
import { setAriaDescribedBy } from '../../../../utils/hds-set-aria-described-by.js';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<fieldset class={{this.classNames}} id={{this.id}} {{did-insert this.setAriaDescribedBy}} ...attributes>\n  {{yield\n    (hash\n      Legend=(component\n        \"hds/form/legend\" isRequired=this.isRequired isOptional=this.isOptional contextualClass=\"hds-form-group__legend\"\n      )\n    )\n  }}\n  {{yield\n    (hash\n      HelperText=(component\n        \"hds/form/helper-text\"\n        controlId=this.id\n        onInsert=this.appendDescriptor\n        contextualClass=\"hds-form-group__helper-text\"\n      )\n    )\n  }}\n  <div class=\"hds-form-group__control-fields-wrapper\">\n    {{yield (hash Control=(component \"hds/yield\") ariaDescribedBy=this.ariaDescribedBy)}}\n  </div>\n  {{yield\n    (hash\n      Error=(component\n        \"hds/form/error\" controlId=this.id onInsert=this.appendDescriptor contextualClass=\"hds-form-group__error\"\n      )\n    )\n  }}\n</fieldset>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsFormFieldsetIndexComponent extends Component {
  static {
    g(this.prototype, "ariaDescribedBy", [tracked], function () {
      return this.args.extraAriaDescribedBy;
    });
  }
  #ariaDescribedBy = (i(this, "ariaDescribedBy"), void 0);
  static {
    g(this.prototype, "descriptors", [tracked], function () {
      return [];
    });
  }
  #descriptors = (i(this, "descriptors"), void 0);
  appendDescriptor(element) {
    this.descriptors.push(element.id);
  }
  static {
    n(this.prototype, "appendDescriptor", [action]);
  }
  setAriaDescribedBy() {
    setAriaDescribedBy(this);
  }

  /**
   * Sets the layout of the group
   *
   * @param layout
   * @type {enum}
   * @default 'vertical'
   */
  static {
    n(this.prototype, "setAriaDescribedBy", [action]);
  }
  get layout() {
    return this.args.layout ?? 'vertical';
  }

  /**
   * Calculates the unique ID to assign to the fieldset
   */
  get id() {
    return getElementId(this);
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    // we just need a class for the layout
    let classes = ['hds-form-group'];

    // add a class based on the @layout argument
    classes.push(`hds-form-group--layout-${this.layout}`);
    return classes.join(' ');
  }

  /**
   * @param isRequired
   * @type {boolean}
   * @default false
   */
  get isRequired() {
    return this.args.isRequired || false;
  }

  /**
   * @param isOptional
   * @type {boolean}
   * @default false
   */
  get isOptional() {
    return this.args.isOptional || false;
  }
}
setComponentTemplate(TEMPLATE, HdsFormFieldsetIndexComponent);

export { HdsFormFieldsetIndexComponent as default };
//# sourceMappingURL=index.js.map
