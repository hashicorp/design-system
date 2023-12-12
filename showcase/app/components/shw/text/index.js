/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export const AVAILABLE_TAGS = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
  'span',
  'div',
];

export const AVAILABLE_ALIGNS = ['left', 'center', 'right'];
export const AVAILABLE_WEIGHTS = ['inherit', 'regular', 'bold'];

export const MAPPING_VARIANT_TO_TAG = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h5',
  body: 'p',
};

export default class ShwTextIndexComponent extends Component {
  /**
   * Get a tag to render based on the `@tag` argument passed or the value of `this.size` (via mapping)
   *
   * @method #tag
   * @return {string} The html tag to use in the dynamic render of the component
   */
  get tag() {
    let { tag } = this.args;

    if (tag) {
      assert(
        `@tag for "Shw::Text" must be one of the following: ${AVAILABLE_TAGS.join(
          ', '
        )}; received: ${tag}`,
        AVAILABLE_TAGS.includes(tag)
      );
    }

    return this.args.tag || MAPPING_VARIANT_TO_TAG[this.variant];
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
    let { variant } = this.args;

    if (variant) {
      variant = variant.toLowerCase();
    } else {
      assert(`You need to provide a @variant arguments to "Shw::Text"`);
    }

    return variant;
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
        `@align for "Shw::Text" must be one of the following: ${AVAILABLE_ALIGNS.join(
          ', '
        )}; received: ${align}`,
        AVAILABLE_ALIGNS.includes(align)
      );
    }

    return align;
  }

  /**
   * Sets the weight of the text
   * Accepted values: see AVAILABLE_WEIGHTS
   *
   * @param weight
   * @type {string}
   */
  get weight() {
    let { weight = 'inherit' } = this.args;

    return weight;
  }

  /**
   * Get the class names to apply to the component.
   * @method #classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['shw-text'];

    // Add a class based on the @variant or @tag arguments
    classes.push(`shw-text-${this.variant}`);

    // Add a class based on the @weight argument
    if (this.weight && this.weight !== 'inherit') {
      classes.push(`shw-text-weight-${this.variant.weight}`);
    }

    // Add a class based on the @align argument
    if (this.align) {
      classes.push(`shw-text-align-${this.align}`);
    }

    // Add a class based on the @color argument (if pre-defined)
    if (this.predefinedColor) {
      classes.push(`shw-fg-color-${this.predefinedColor}`);
    }

    return classes.join(' ');
  }
}
