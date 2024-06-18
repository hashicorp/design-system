import { _ as _applyDecoratedDescriptor, b as _initializerDefineProperty } from '../../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { getElementId } from '../../../../utils/hds-get-element-id.js';
import { setAriaDescribedBy } from '../../../../utils/hds-set-aria-described-by.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<fieldset class={{this.classNames}} id={{this.id}} {{did-insert this.setAriaDescribedBy}} ...attributes>\n  {{yield\n    (hash\n      Legend=(component\n        \"hds/form/legend\" isRequired=this.isRequired isOptional=this.isOptional contextualClass=\"hds-form-group__legend\"\n      )\n    )\n  }}\n  {{yield\n    (hash\n      HelperText=(component\n        \"hds/form/helper-text\"\n        controlId=this.id\n        onInsert=this.appendDescriptor\n        contextualClass=\"hds-form-group__helper-text\"\n      )\n    )\n  }}\n  <div class=\"hds-form-group__control-fields-wrapper\">\n    {{yield (hash Control=(component \"hds/yield\") ariaDescribedBy=this.ariaDescribedBy)}}\n  </div>\n  {{yield\n    (hash\n      Error=(component\n        \"hds/form/error\" controlId=this.id onInsert=this.appendDescriptor contextualClass=\"hds-form-group__error\"\n      )\n    )\n  }}\n</fieldset>");

var _class, _descriptor, _descriptor2;
let HdsFormFieldsetIndexComponent = (_class = class HdsFormFieldsetIndexComponent extends Component {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "ariaDescribedBy", _descriptor, this);
    _initializerDefineProperty(this, "descriptors", _descriptor2, this);
  }
  appendDescriptor(element) {
    this.descriptors.push(element.id);
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
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "ariaDescribedBy", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.args.extraAriaDescribedBy;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "descriptors", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _applyDecoratedDescriptor(_class.prototype, "appendDescriptor", [action], Object.getOwnPropertyDescriptor(_class.prototype, "appendDescriptor"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "setAriaDescribedBy", [action], Object.getOwnPropertyDescriptor(_class.prototype, "setAriaDescribedBy"), _class.prototype)), _class);
setComponentTemplate(TEMPLATE, HdsFormFieldsetIndexComponent);

export { HdsFormFieldsetIndexComponent as default };
//# sourceMappingURL=index.js.map
