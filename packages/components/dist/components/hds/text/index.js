import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { HdsTextColorValues, HdsTextAlignValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{! IMPORTANT: we removed any extra newlines before/after the `let` to reduce the issues with unexpected whitespaces (see https://github.com/hashicorp/design-system/pull/1652) }}\n{{#let (element this.componentTag) as |Tag|}}<Tag\n    class={{this.classNames}}\n    {{style color=this.customColor}}\n    ...attributes\n  >{{yield}}</Tag>{{/let}}");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const AVAILABLE_COLORS = Object.values(HdsTextColorValues);
const AVAILABLE_ALIGNS = Object.values(HdsTextAlignValues);

// A union of all types in the HTMLElementTagNameMap interface

class HdsTextComponent extends Component {
  /**
   * Get a tag to render based on the `@tag` argument passed or the value of `this.size` (via mapping)
   *
   * @method #componentTag
   * @return {HdsTextTags} The html tag to use in the dynamic render of the component
   */
  get componentTag() {
    const {
      tag = 'span'
    } = this.args;
    return tag;
  }

  /**
   * Sets the "variant" (style) for the text
   * Accepted values: see AVAILABLE_VARIANTS
   *
   * @param variant
   * @type {string}
   */
  get variant() {
    const {
      group,
      size
    } = this.args;

    // notice: for performance reasons we don't do any other extra check on these values
    // we assume they've already been validated by the "parent" components
    return `${group}-${size}`;
  }

  /**
   * Sets the alignment of the text
   * Accepted values: see AVAILABLE_ALIGNS
   *
   * @param align
   * @type {HdsTextAligns}
   */
  get align() {
    const {
      align
    } = this.args;
    if (align) {
      assert(`@align for "Hds::Text" must be one of the following: ${AVAILABLE_ALIGNS.join(', ')}; received: ${align}`, AVAILABLE_ALIGNS.includes(align));
    }
    return align;
  }

  /**
   * Sets the color of the text as pre-defined value
   * Accepted values: see AVAILABLE_COLORS
   *
   * @param color
   * @type {HdsTextColors}
   */
  get predefinedColor() {
    const {
      color
    } = this.args;
    if (color && AVAILABLE_COLORS.includes(color)) {
      return color;
    } else {
      return undefined;
    }
  }

  /**
   * Sets the color of the text as custom value (via inline style)
   *
   * @param color
   * @type {string}
   */
  get customColor() {
    const {
      color
    } = this.args;
    if (color && !AVAILABLE_COLORS.includes(color)) {
      return color;
    } else {
      return undefined;
    }
  }

  /**
   * Get the class names to apply to the component.
   * @method #classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-text'];

    // add a (helper) class based on the "group + size" variant
    classes.push(`hds-typography-${this.variant}`);

    // add a (helper) class based on the @weight argument
    if (this.args.weight) {
      classes.push(`hds-font-weight-${this.args.weight}`);
    }

    // add a class based on the @align argument
    if (this.align) {
      classes.push(`hds-text--align-${this.align}`);
    }

    // add a (helper) class based on the @color argument (if pre-defined)
    if (this.predefinedColor) {
      classes.push(`hds-foreground-${this.predefinedColor}`);
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsTextComponent);

export { AVAILABLE_ALIGNS, AVAILABLE_COLORS, HdsTextComponent as default };
//# sourceMappingURL=index.js.map
