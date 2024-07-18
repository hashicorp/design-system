import { _ as _applyDecoratedDescriptor } from '../../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { getElementId } from '../../../../utils/hds-get-element-id.js';
import { ariaDescribedBy, registerAriaDescriptionElement, unregisterAriaDescriptionElement } from '../../../../utils/hds-aria-described-by.js';
import { HdsFormFieldLayoutValues } from './types.js';
import '../label/index.js';
import '../helper-text/index.js';
import '../character-count/index.js';
import '../error/index.js';
import { precompileTemplate } from '@ember/template-compilation';
import { c } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<div class={{this.classNames}} ...attributes>\n  {{yield\n    (hash\n      Label=(component\n        \"hds/form/label\"\n        controlId=this.id\n        isRequired=this.isRequired\n        isOptional=this.isOptional\n        contextualClass=\"hds-form-field__label\"\n      )\n    )\n  }}\n  {{yield\n    (hash\n      HelperText=(component\n        \"hds/form/helper-text\"\n        controlId=this.id\n        onInsert=this.appendDescriptor\n        contextualClass=\"hds-form-field__helper-text\"\n      )\n    )\n  }}\n  <div class=\"hds-form-field__control\">\n    {{! @glint-expect-error }}\n    {{yield (hash Control=(component \"hds/yield\") id=this.id ariaDescribedBy=this.ariaDescribedBy)}}\n  </div>\n  {{yield\n    (hash\n      CharacterCount=(component\n        \"hds/form/character-count\"\n        controlId=this.id\n        onInsert=this.appendDescriptor\n        contextualClass=\"hds-form-field__character-count\"\n      )\n    )\n  }}\n  {{yield\n    (hash\n      Error=(component\n        \"hds/form/error\"\n        controlId=this.id\n        onInsert=this.appendDescriptor\n        onRemove=this.removeDescriptor\n        contextualClass=\"hds-form-field__error\"\n      )\n    )\n  }}\n</div>");

var _class;
const LAYOUT_TYPES = Object.values(HdsFormFieldLayoutValues);
// @ts-expect-error: decorator function return type 'ClassOf<AriaDescribedByComponent>' is not assignable to 'typeof HdsFormFieldComponent'
const HdsFormFieldComponent = c((_class = class HdsFormFieldComponent extends Component {
  /**
   * Sets the layout of the field
   *
   * @param layout
   * @type {string}
   */
  get layout() {
    const {
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
    const classes = [];
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
  appendDescriptor(element) {
    registerAriaDescriptionElement(this, element);
  }
  removeDescriptor(element) {
    unregisterAriaDescriptionElement(this, element);
  }
}, (_applyDecoratedDescriptor(_class.prototype, "appendDescriptor", [action], Object.getOwnPropertyDescriptor(_class.prototype, "appendDescriptor"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "removeDescriptor", [action], Object.getOwnPropertyDescriptor(_class.prototype, "removeDescriptor"), _class.prototype)), _class), [ariaDescribedBy]);
var index = setComponentTemplate(TEMPLATE, HdsFormFieldComponent);

export { LAYOUT_TYPES, index as default };
//# sourceMappingURL=index.js.map
