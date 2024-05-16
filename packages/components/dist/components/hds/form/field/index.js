import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { schedule } from '@ember/runloop';
import { getElementId } from '../../../../utils/hds-get-element-id.js';
import { setAriaDescribedBy } from '../../../../utils/hds-set-aria-described-by.js';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class={{this.classNames}} {{did-insert this.setAriaDescribedBy}} ...attributes>\n  {{yield\n    (hash\n      Label=(component\n        \"hds/form/label\"\n        controlId=this.id\n        isRequired=this.isRequired\n        isOptional=this.isOptional\n        contextualClass=\"hds-form-field__label\"\n      )\n    )\n  }}\n  {{yield\n    (hash\n      HelperText=(component\n        \"hds/form/helper-text\"\n        controlId=this.id\n        onInsert=this.appendDescriptor\n        contextualClass=\"hds-form-field__helper-text\"\n      )\n    )\n  }}\n  <div class=\"hds-form-field__control\">\n    {{yield (hash Control=(component \"hds/yield\") id=this.id ariaDescribedBy=this.ariaDescribedBy)}}\n  </div>\n  {{yield\n    (hash\n      CharacterCount=(component\n        \"hds/form/character-count\"\n        controlId=this.id\n        onInsert=this.appendDescriptor\n        contextualClass=\"hds-form-field__character-count\"\n      )\n    )\n  }}\n  {{yield\n    (hash\n      Error=(component\n        \"hds/form/error\" controlId=this.id onInsert=this.appendDescriptor contextualClass=\"hds-form-field__error\"\n      )\n    )\n  }}\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const LAYOUT_TYPES = ['vertical', 'flag'];
class HdsFormFieldIndexComponent extends Component {
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
    // we schedule this afterRender to capture all descriptors registered onInsert
    schedule('afterRender', () => {
      setAriaDescribedBy(this);
    });
  }

  /**
   * Sets the layout of the field
   *
   * @param layout
   * @type {string}
   */
  static {
    n(this.prototype, "setAriaDescribedBy", [action]);
  }
  get layout() {
    let {
      layout
    } = this.args;
    assert(`@layout for "Hds::Form::Field" must be one of the following: ${LAYOUT_TYPES.join(', ')}; received: ${layout}`, LAYOUT_TYPES.includes(layout));
    return layout;
  }

  /**
   * Calculates the unique ID to assign to the form control
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
    let classes = [];
    if (this.args.layout) {
      classes.push(`hds-form-field--layout-${this.layout}`);
    }

    // add a class based on the @contextualClass argument
    // notice: this will *not* be documented for public use
    if (this.args.contextualClass) {
      classes.push(this.args.contextualClass);
    }
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
setComponentTemplate(TEMPLATE, HdsFormFieldIndexComponent);

export { LAYOUT_TYPES, HdsFormFieldIndexComponent as default };
//# sourceMappingURL=index.js.map
