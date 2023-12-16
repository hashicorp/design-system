/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

// notice: only some combinations of size + font-weight are allowed (per design specs)
// see: https://www.figma.com/file/oQsMzMMnynfPWpMEt91OpH/HDS-Product---Foundations?node-id=1262%3A9192

export const DEFAULT_SIZE = '200';
export const AVAILABLE_SIZES = [500, 400, 300, 200, 100];

export const DEFAULT_WEIGHTS_PER_SIZE = {
  500: ['bold'],
  400: ['semibold'],
  300: ['semibold'],
  200: ['semibold'],
  100: ['medium'],
};
export const AVAILABLE_WEIGHTS_PER_SIZE = {
  500: ['bold'],
  400: ['medium', 'semibold', 'bold'],
  300: ['medium', 'semibold', 'bold'],
  200: ['semibold'],
  100: ['medium'],
};

export default class HdsTextDisplayComponent extends Component {
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
      `@size for "Hds::Text::Display" must be one of the following: ${AVAILABLE_SIZES.join(
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
    let { weight } = this.args;

    if (weight) {
      const availableWeights = AVAILABLE_WEIGHTS_PER_SIZE[this.size];
      assert(
        `@weight for "Hds::Text::Display" with @size=${
          this.size
        } must be one of the following: ${availableWeights.join(
          ', '
        )}; received: ${weight}`,
        availableWeights.includes(weight)
      );
    } else {
      // use the default (first item in the array)
      weight = DEFAULT_WEIGHTS_PER_SIZE[this.size];
    }

    return weight;
  }
}
