import { _ as _applyDecoratedDescriptor } from '../../../../_rollupPluginBabelHelpers-81503waH.js';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<button\n  class={{this.classNames}}\n  type=\"button\"\n  {{on \"click\" this.onClick}}\n  aria-controls={{@contentId}}\n  aria-expanded={{if @isOpen \"true\" \"false\"}}\n  aria-label={{@ariaLabel}}\n  aria-labelledby={{@ariaLabelledBy}}\n  ...attributes\n>\n  <Hds::Icon @name=\"chevron-down\" @size={{if (eq @size \"large\") \"24\" \"16\"}} />\n</button>");

var _class;
let HdsAccordionItemButton = (_class = class HdsAccordionItemButton extends Component {
  onClick(event) {
    if (this.args.onClickToggle) {
      this.args.onClickToggle(event);
    }
  }

  /**
   * Get the class names to apply to the component.
   * @method ItemButton#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-accordion-item__button'];

    // add a class based on the @isOpen argument
    if (this.args.isOpen) {
      classes.push('hds-accordion-item__button--is-open');
    }

    // add a class based on the @size argument
    if (this.args.size) {
      classes.push(`hds-accordion-item__button--size-${this.args.size}`);
    }
    if (this.args.parentContainsInteractive === false) {
      classes.push('hds-accordion-item__button--parent-does-not-contain-interactive');
    } else {
      classes.push('hds-accordion-item__button--parent-contains-interactive');
    }
    return classes.join(' ');
  }
}, _applyDecoratedDescriptor(_class.prototype, "onClick", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onClick"), _class.prototype), _class);
setComponentTemplate(TEMPLATE, HdsAccordionItemButton);

export { HdsAccordionItemButton as default };
//# sourceMappingURL=button.js.map
