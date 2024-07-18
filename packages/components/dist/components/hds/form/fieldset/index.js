import { _ as _applyDecoratedDescriptor } from '../../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { getElementId } from '../../../../utils/hds-get-element-id.js';
import { ariaDescribedBy, registerAriaDescriptionElement, unregisterAriaDescriptionElement } from '../../../../utils/hds-aria-described-by.js';
import { HdsFormFieldsetLayoutValues } from './types.js';
import '../legend/index.js';
import '../helper-text/index.js';
import '../error/index.js';
import { c } from 'decorator-transforms/runtime';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<fieldset class={{this.classNames}} id={{this.id}} ...attributes>\n  {{yield\n    (hash\n      Legend=(component\n        \"hds/form/legend\" isRequired=this.isRequired isOptional=this.isOptional contextualClass=\"hds-form-group__legend\"\n      )\n    )\n  }}\n  {{yield\n    (hash\n      HelperText=(component\n        \"hds/form/helper-text\"\n        controlId=this.id\n        onInsert=this.appendDescriptor\n        contextualClass=\"hds-form-group__helper-text\"\n      )\n    )\n  }}\n  <div class=\"hds-form-group__control-fields-wrapper\">\n    {{! @glint-expect-error }}\n    {{yield (hash Control=(component \"hds/yield\") ariaDescribedBy=this.ariaDescribedBy)}}\n  </div>\n  {{yield\n    (hash\n      Error=(component\n        \"hds/form/error\"\n        controlId=this.id\n        onInsert=this.appendDescriptor\n        onRemove=this.removeDescriptor\n        contextualClass=\"hds-form-group__error\"\n      )\n    )\n  }}\n</fieldset>");

var _class;
// @ts-expect-error: decorator function return type 'ClassOf<AriaDescribedByComponent>' is not assignable to 'typeof HdsFormFieldComponent'
const HdsFormFieldsetComponent = c((_class = class HdsFormFieldsetComponent extends Component {
  /**
   * Sets the layout of the group
   *
   * @param layout
   * @type {enum}
   * @default 'vertical'
   */
  get layout() {
    return this.args.layout ?? HdsFormFieldsetLayoutValues.Vertical;
  }

  /**
   * Calculates the unique ID to assign to the fieldset
   */
  get id() {
    return getElementId(this);
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

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    // we just need a class for the layout
    const classes = ['hds-form-group'];

    // add a class based on the @layout argument
    classes.push(`hds-form-group--layout-${this.layout}`);
    return classes.join(' ');
  }
  appendDescriptor(element) {
    registerAriaDescriptionElement(this, element);
  }
  removeDescriptor(element) {
    unregisterAriaDescriptionElement(this, element);
  }
}, (_applyDecoratedDescriptor(_class.prototype, "appendDescriptor", [action], Object.getOwnPropertyDescriptor(_class.prototype, "appendDescriptor"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "removeDescriptor", [action], Object.getOwnPropertyDescriptor(_class.prototype, "removeDescriptor"), _class.prototype)), _class), [ariaDescribedBy]);
var index = setComponentTemplate(TEMPLATE, HdsFormFieldsetComponent);

export { index as default };
//# sourceMappingURL=index.js.map
