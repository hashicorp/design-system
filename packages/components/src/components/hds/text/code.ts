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
type HdsTextCodeSizeNumber = Extract<
  HdsTextSizeValues,
  | HdsTextSizeValues.OneHundred
  | HdsTextSizeValues.TwoHundred
  | HdsTextSizeValues.ThreeHundred
>;
type HdsTextCodeSizeString = `${HdsTextCodeSizeNumber}`;
export type HdsTextCodeSizes = HdsTextCodeSizeNumber | HdsTextCodeSizeString;
export const AVAILABLE_SIZES = [
  HdsTextSizeValues.ThreeHundred,
  HdsTextSizeValues.TwoHundred,
  HdsTextSizeValues.OneHundred,
];
export const DEFAULT_SIZE = HdsTextSizeValues.TwoHundred;

export const DEFAULT_WEIGHT = HdsTextWeightValues.Regular;
export type HdsTextCodeWeight = Extract<HdsTextWeights, 'regular' | 'bold'>;
export const AVAILABLE_WEIGHTS_PER_SIZE: Record<
  HdsTextCodeSizes,
  HdsTextCodeWeight[]
> = {
  [HdsTextSizeValues.ThreeHundred]: [
    HdsTextWeightValues.Regular,
    HdsTextWeightValues.Bold,
  ],
  [HdsTextSizeValues.TwoHundred]: [
    HdsTextWeightValues.Regular,
    HdsTextWeightValues.Bold,
  ],
  [HdsTextSizeValues.OneHundred]: [
    HdsTextWeightValues.Regular,
    HdsTextWeightValues.Bold,
  ],
};

export interface HdsTextCodeSignature {
  Args: {
    size?: HdsTextCodeSizes;
    tag?: HdsTextTags;
    weight?: HdsTextCodeWeight;
    align?: HdsTextAligns;
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    color?: string | HdsTextColors;
  };
  Element:
    | HTMLSpanElement
    | HTMLHeadingElement
    | HTMLParagraphElement
    | HTMLDivElement;
  Blocks: {
    default: [];
  };
}

export default class HdsTextCode extends Component<HdsTextCodeSignature> {
  /**
   * Sets the "size" for the text
   * Accepted values: see AVAILABLE_SIZES
   *
   * @type {HdsTextCodeSizes}
   *
   * @param size
   */
  get size(): HdsTextCodeSizes {
    let { size = DEFAULT_SIZE } = this.args;

    // let's be a bit forgiving with the consumers
    if (typeof size === 'string') {
      size = parseInt(size, 10);
    }

    assert(
      `@size for "Hds::Text::Code" must be one of the following: ${AVAILABLE_SIZES.join(
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
  get weight(): HdsTextCodeWeight {
    const { weight = DEFAULT_WEIGHT } = this.args;

    const availableWeights = AVAILABLE_WEIGHTS_PER_SIZE[this.size];

    assert(
      `@weight for "Hds::Text::Code" with @size=${
        this.size
      } must be one of the following: ${availableWeights.join(
        ', '
      )}; received: ${weight}`,
      availableWeights.includes(weight)
    );

    return weight;
  }
}
