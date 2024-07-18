import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { HdsRichTooltipToggleIconPositionValues, HdsRichTooltipToggleSizeValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{! IMPORTANT: we need to add \"squishies\" here (~) because otherwise the whitespace added by Ember becomes visible in the underlined text (being an inline element) - See https://handlebarsjs.com/guide/expressions.html#whitespace-control }}\n<button\n  class={{this.classNames}}\n  ...attributes\n  type=\"button\"\n  aria-controls={{@popoverId}}\n  aria-describedby={{@popoverId}}\n  aria-expanded={{if @isOpen \"true\" \"false\"}}\n  {{@setupPrimitiveToggle}}\n>\n  {{~#if (has-block)~}}\n    {{yield}}\n  {{~else~}}\n    {{~#if (and @icon (eq this.iconPosition \"leading\"))~}}\n      <FlightIcon class=\"hds-rich-tooltip__toggle-icon\" @name={{@icon}} @isInlineBlock={{this.isInline}} />\n    {{~/if~}}\n    {{~#if @text~}}\n      <span class=\"hds-rich-tooltip__toggle-text\">{{~@text~}}</span>\n    {{~/if~}}\n    {{~#if (and @icon (eq this.iconPosition \"trailing\"))~}}\n      <FlightIcon class=\"hds-rich-tooltip__toggle-icon\" @name={{@icon}} @isInlineBlock={{this.isInline}} />\n    {{~/if~}}\n  {{~/if~}}\n</button>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const ICONPOSITIONS = Object.values(HdsRichTooltipToggleIconPositionValues);
const DEFAULT_ICONPOSITION = HdsRichTooltipToggleIconPositionValues.Trailing;
const SIZES = Object.values(HdsRichTooltipToggleSizeValues);
class HdsRichTooltipToggleComponent extends Component {
  /**
   * @param isInline
   * @type {boolean}
   * @default true
   * @description sets display inline for the element
   */
  get isInline() {
    const {
      isInline = false
    } = this.args;
    return isInline;
  }

  /**
   * @param iconPosition
   * @type {string}
   * @default leading
   * @description Positions the icon before or after the text; allowed values are `leading` or `trailing`
   */
  get iconPosition() {
    const {
      iconPosition = DEFAULT_ICONPOSITION
    } = this.args;
    assert(`@iconPosition for "Hds::RichTooltip::Toggle" must be one of the following: ${ICONPOSITIONS.join(', ')}; received: ${iconPosition}`, ICONPOSITIONS.includes(iconPosition));
    return iconPosition;
  }

  /**
   * @param size
   * @type {string}
   * @default medium
   * @description The size of the "info" text; acceptable values are `small`, `medium`, `large`
   */
  get size() {
    let size;

    // we assign a "size" only if `@text` is provided
    if (this.args.text) {
      size = this.args.size;
      assert(`@size for "Hds::RichTooltip::Toggle" must be one of the following: ${SIZES.join(', ')}; received: ${size}`, size === undefined || SIZES.includes(size));
    }
    return size;
  }

  /**
   * Get the class names to apply to the component.
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-rich-tooltip__toggle'];

    // add a class based on the @isInline argument
    if (this.isInline) {
      classes.push('hds-rich-tooltip__toggle--is-inline');
    } else {
      classes.push('hds-rich-tooltip__toggle--is-block');
    }

    // add a class based on the @size argument (if provided)
    if (this.size) {
      classes.push(`hds-rich-tooltip__toggle--size-${this.size}`);
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsRichTooltipToggleComponent);

export { DEFAULT_ICONPOSITION, ICONPOSITIONS, SIZES, HdsRichTooltipToggleComponent as default };
//# sourceMappingURL=toggle.js.map
