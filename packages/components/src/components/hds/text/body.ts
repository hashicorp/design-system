/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { HdsTextSizeValues, HdsTextWeightValues } from './types.ts';
import type {
  HdsTextAligns,
  HdsTextColors,
  HdsTextTags,
  HdsTextWeights,
} from './types.ts';

// notice: only some combinations of size + font-weight are allowed (per design specs)
// see: https://www.figma.com/file/oQsMzMMnynfPWpMEt91OpH/HDS-Product---Foundations?node-id=1262%3A9192

// Allow consumers to provide either string or number representation of size
type HdsTextBodySizeNumber = Extract<HdsTextSizeValues, HdsTextSizeValues.OneHundred | HdsTextSizeValues.TwoHundred | HdsTextSizeValues.ThreeHundred>;
type HdsTextBodySizeString = `${HdsTextBodySizeNumber}`;
export type HdsTextBodySizes = HdsTextBodySizeNumber | HdsTextBodySizeString;
export const AVAILABLE_SIZES = [HdsTextSizeValues.ThreeHundred, HdsTextSizeValues.TwoHundred, HdsTextSizeValues.OneHundred];
export const DEFAULT_SIZE = HdsTextSizeValues.TwoHundred;

export const DEFAULT_WEIGHT = HdsTextWeightValues.Regular;
export type HdsTextBodyWeight = Extract<HdsTextWeights, "regular" | "medium" | "semibold">;
export const AVAILABLE_WEIGHTS_PER_SIZE: Record<HdsTextBodySizes, HdsTextBodyWeight[]> = {
  300: [HdsTextWeightValues.Regular, HdsTextWeightValues.Medium, HdsTextWeightValues.Semibold],
  200: [HdsTextWeightValues.Regular, HdsTextWeightValues.Medium, HdsTextWeightValues.Semibold],
  100: [HdsTextWeightValues.Regular, HdsTextWeightValues.Medium, HdsTextWeightValues.Semibold],
};

export interface HdsTextBodySignature {
  Args: {
    size: HdsTextBodySizes;
    color?: string | HdsTextColors;
    tag?: HdsTextTags;
    align?: HdsTextAligns;
    weight?: HdsTextBodyWeight;
  };
  Element: HTMLSpanElement | HTMLHeadingElement | HTMLParagraphElement | HTMLDivElement;
  Blocks: {
    default: [],
  };
}

export default class HdsTextBodyComponent extends Component<HdsTextBodySignature> {
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
