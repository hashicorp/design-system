import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { DEFAULT_SIZE, SIZES, DEFAULT_TYPE, TYPES } from './item/index.js';
import { HdsAccordionItemTitleTagValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<div class={{this.classNames}} ...attributes>\n  {{yield\n    (hash\n      Item=(component \"hds/accordion/item\" titleTag=this.titleTag size=this.size type=this.type forceState=@forceState)\n    )\n  }}\n</div>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsAccordion extends Component {
  /**
   * Sets the size for the component
   *
   * @param size
   * @type {HdsAccordionSizes}
   * @default 'medium'
   */
  get size() {
    const {
      size = DEFAULT_SIZE
    } = this.args;
    assert(`@size for "Hds::Accordion" must be one of the following: ${SIZES.join(', ')}; received: ${size}`, SIZES.includes(size));
    return size;
  }
  get titleTag() {
    return this.args.titleTag ?? HdsAccordionItemTitleTagValues.Div;
  }

  /**
   * Sets the type of the component
   *
   * @param type
   * @type {HdsAccordionTypes}
   * @default 'card'
   */
  get type() {
    const {
      type = DEFAULT_TYPE
    } = this.args;
    assert(`@type for "Hds::Accordion" must be one of the following: ${TYPES.join(', ')}; received: ${type}`, TYPES.includes(type));
    return type;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-accordion'];

    // add a class based on the @size argument
    classes.push(`hds-accordion--size-${this.size}`);

    // add a class based on the @type argument
    classes.push(`hds-accordion--type-${this.type}`);
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsAccordion);

export { HdsAccordion as default };
//# sourceMappingURL=index.js.map
