import { a as _defineProperty } from '../../../../_rollupPluginBabelHelpers-DSLVWx63.js';
import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { guidFor } from '@ember/object/internals';
import { HdsAccordionSizeValues, HdsAccordionTypeValues, HdsAccordionItemTitleTagValues } from '../types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n\n<Hds::DisclosurePrimitive\n  class={{this.classNames}}\n  @isOpen={{(or @isOpen (eq @forceState \"open\"))}}\n  @onClickToggle={{@onClickToggle}}\n  ...attributes\n>\n  <:toggle as |t|>\n    <div class=\"hds-accordion-item__toggle\">\n      <Hds::Accordion::Item::Button\n        @isOpen={{t.isOpen}}\n        @onClickToggle={{t.onClickToggle}}\n        @contentId={{this._contentId}}\n        @ariaLabel={{@ariaLabel}}\n        @ariaLabelledBy={{this.ariaLabelledBy}}\n        @size={{this.size}}\n        @parentContainsInteractive={{this.containsInteractive}}\n      />\n\n      <Hds::Text::Body\n        @tag={{this.titleTag}}\n        @size={{this.toggleTextSize}}\n        @weight=\"semibold\"\n        @color=\"strong\"\n        id={{this._titleId}}\n        class=\"hds-accordion-item__toggle-content\"\n      >\n        {{yield to=\"toggle\"}}\n      </Hds::Text::Body>\n    </div>\n  </:toggle>\n\n  <:content as |c|>\n    <Hds::Text::Body\n      class=\"hds-accordion-item__content\"\n      @tag=\"div\"\n      @size=\"200\"\n      @weight=\"regular\"\n      @color=\"primary\"\n      id={{this._contentId}}\n    >\n      {{yield (hash close=c.close) to=\"content\"}}\n    </Hds::Text::Body>\n  </:content>\n</Hds::DisclosurePrimitive>");

const SIZES = Object.values(HdsAccordionSizeValues);
const DEFAULT_SIZE = HdsAccordionSizeValues.Medium;
const TYPES = Object.values(HdsAccordionTypeValues);
const DEFAULT_TYPE = HdsAccordionTypeValues.Card;
const TEXT_SIZE_MAP = {
  small: 100,
  medium: 200,
  large: 300
};
class HdsAccordionItem extends Component {
  constructor(...args) {
    super(...args);
    /**
     * Generates a unique ID for the Content
     *
     * @param _contentId
     */
    _defineProperty(this, "_contentId", 'content-' + guidFor(this));
    _defineProperty(this, "_titleId", 'title-' + guidFor(this));
  }
  get ariaLabelledBy() {
    if (!this.args.ariaLabel) {
      return this._titleId;
    }
    return undefined;
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
   * @param toggleTextSize
   * @type {HdsTextSizes}
   * @default 'medium'
   */
  get toggleTextSize() {
    const size = this.args.size ?? DEFAULT_SIZE;
    return TEXT_SIZE_MAP[size];
  }

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
    assert(`@size for "Hds::Accordion::Item" must be one of the following: ${SIZES.join(', ')}; received: ${size}`, SIZES.includes(size));
    return size;
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
    assert(`@type for "Hds::Accordion::Item" must be one of the following: ${TYPES.join(', ')}; received: ${type}`, TYPES.includes(type));
    return type;
  }
  get titleTag() {
    return this.args.titleTag ?? HdsAccordionItemTitleTagValues.Div;
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

    // add a class based on the @isStatic argument
    if (this.args.isStatic) {
      classes.push('hds-accordion-item--is-static');
    }

    // add a class based on the @size argument
    classes.push(`hds-accordion-item--size-${this.size}`);

    // add a class based on the @type argument
    classes.push(`hds-accordion-item--type-${this.type}`);
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
setComponentTemplate(TEMPLATE, HdsAccordionItem);

export { DEFAULT_SIZE, DEFAULT_TYPE, SIZES, TYPES, HdsAccordionItem as default };
//# sourceMappingURL=index.js.map
