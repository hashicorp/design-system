import { a as _defineProperty } from '../../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<Hds::DisclosurePrimitive class={{this.classNames}} @isOpen={{@isOpen}} ...attributes>\n  <:toggle as |t|>\n    <div class=\"hds-accordion-item__toggle\">\n      <Hds::Accordion::Item::Button\n        @isOpen={{t.isOpen}}\n        @onClickToggle={{t.onClickToggle}}\n        @contentId={{this.contentId}}\n        @ariaLabel={{this.ariaLabel}}\n        @parentContainsInteractive={{this.containsInteractive}}\n      />\n\n      <Hds::Text::Display\n        @tag=\"div\"\n        @size=\"200\"\n        @weight=\"semibold\"\n        @color=\"strong\"\n        class=\"hds-accordion-item__toggle-content\"\n      >\n        {{yield to=\"toggle\"}}\n      </Hds::Text::Display>\n    </div>\n  </:toggle>\n\n  <:content>\n    <Hds::Text::Body\n      class=\"hds-accordion-item__content\"\n      @tag=\"div\"\n      @size=\"200\"\n      @weight=\"regular\"\n      @color=\"primary\"\n      id={{this.contentId}}\n    >\n      {{yield to=\"content\"}}\n    </Hds::Text::Body>\n  </:content>\n</Hds::DisclosurePrimitive>");

class HdsAccordionItemComponent extends Component {
  constructor(...args) {
    super(...args);
    /**
     * Generates a unique ID for the Content
     *
     * @param contentId
     */
    _defineProperty(this, "contentId", 'content-' + guidFor(this));
  }
  /**
   * @param ariaLabel
   * @type {string}
   * @default 'Toggle display'
   */
  get ariaLabel() {
    return this.args.ariaLabel ?? 'Toggle display';
  }

  /**
   * @param containsInteractive
   * @type {boolean}
   * @default false
   */
  get containsInteractive() {
    return this.args.containsInteractive ?? false;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-accordion-item'];

    // add a class based on the @isOpen argument
    if (this.args.isOpen) {
      classes.push('hds-accordion-item--is-open');
    }
    if (this.containsInteractive) {
      // Entire accordion item including the chevron is interactive:
      classes.push('hds-accordion-item--contains-interactive');
    } else {
      // Only chevron is interactive:
      classes.push('hds-accordion-item--does-not-contain-interactive');
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsAccordionItemComponent);

export { HdsAccordionItemComponent as default };
//# sourceMappingURL=index.js.map
