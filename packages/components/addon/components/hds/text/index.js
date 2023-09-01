/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export const AVAILABLE_ALIGNS = ['left', 'center', 'right'];

export const AVAILABLE_COLORS = [
  'primary',
  'strong',
  'faint',
  'disabled',
  'high-contrast',
  'action',
  'action-hover',
  'action-active',
  'highlight',
  'highlight-on-surface',
  'highlight-high-contrast',
  'success',
  'success-on-surface',
  'success-high-contrast',
  'warning',
  'warning-on-surface',
  'warning-high-contrast',
  'critical',
  'critical-on-surface',
  'critical-high-contrast',
];

export default class HdsTextIndexComponent extends Component {
  /**
   * Get a tag to render based on the `@tag` argument passed or the value of `this.size` (via mapping)
   *
   * @method #componentTag
   * @return {string} The html tag to use in the dynamic render of the component
   */
  get componentTag() {
    let { tag = 'span' } = this.args;

    return tag;
  }

  /**
   * Sets the "variant" (style) for the text
   * Accepted values: see AVAILABLE_VARIANTS
   *
   * @type {string}
   *
   * @param variant
   */
  get variant() {
    let { group, size } = this.args;

    // notice: for performance reasons we don't do any other extra check on these values
    // we assume they've already been validated by the "parent" components
    return `${group}-${size}`;
  }

  /**
   * Sets the alignment of the text
   * Accepted values: see AVAILABLE_ALIGNS
   *
   * @param align
   * @type {string}
   */
  get align() {
    let { align } = this.args;

    if (align) {
      assert(
        `@align for "Hds::Text" must be one of the following: ${AVAILABLE_ALIGNS.join(
          ', '
        )}; received: ${align}`,
        AVAILABLE_ALIGNS.includes(align)
      );
    }

    return align;
  }

  /**
   * Sets the color of the text as pre-defined value
   * Accepted values: see AVAILABLE_COLORS
   *
   * @param color
   * @type {string}
   */
  get predefinedColor() {
    let { color } = this.args;

    if (AVAILABLE_COLORS.includes(color)) {
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
    let { color } = this.args;

    if (!AVAILABLE_COLORS.includes(color)) {
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
    let classes = ['hds-text'];

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
