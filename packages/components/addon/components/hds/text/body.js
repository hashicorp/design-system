/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

// notice: only some combinations of size + font-weight are allowed (per design specs)
// see: https://www.figma.com/file/oQsMzMMnynfPWpMEt91OpH/HDS-Product---Foundations?node-id=1262%3A9192

export const DEFAULT_SIZE = '200';
export const AVAILABLE_SIZES = [300, 200, 100];

export const DEFAULT_WEIGHT = 'regular';
export const AVAILABLE_WEIGHTS_PER_SIZE = {
  300: ['regular', 'medium', 'semibold'],
  200: ['regular', 'medium', 'semibold'],
  100: ['regular', 'medium', 'semibold'],
};

export default class HdsTextBodyComponent extends Component {
  /**
   * Sets the "size" for the text
   * Accepted values: see AVAILABLE_SIZES
   *
   * @type {string}
   *
   * @param size
   */
  get size() {
    let { size = DEFAULT_SIZE } = this.args;

    // let's be a bit forgiving with the consumers
    if (typeof size === 'string') {
      size = parseInt(size, 10);
    }

    assert(
      `@size for "Hds::Text::Body" must be one of the following: ${AVAILABLE_SIZES.join(
        ', '
      )}; received: ${size}`,
      AVAILABLE_SIZES.includes(size)
    );

    return size;
  }

  /**
   * Sets the "weight" for the text
   * Accepted values: see AVAILABLE_WEIGHTS_PER_SIZE
   *
   * @type {string}
   *
   * @param variant
   */
  get weight() {
    let { weight = DEFAULT_WEIGHT } = this.args;

    const availableWeights = AVAILABLE_WEIGHTS_PER_SIZE[this.size];

    assert(
      `@weight for "Hds::Text::Body" with @size=${
        this.size
      } must be one of the following: ${availableWeights.join(
        ', '
      )}; received: ${weight}`,
      availableWeights.includes(weight)
    );

    return weight;
  }
}
