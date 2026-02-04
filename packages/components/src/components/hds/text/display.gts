/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import HdsText from './index.gts';
import { HdsTextSizeValues, HdsTextWeightValues } from './types.ts';
import type {
  HdsTextAligns,
  HdsTextColors,
  HdsTextSizes,
  HdsTextTags,
  HdsTextWeights,
} from './types.ts';

// notice: only some combinations of size + font-weight are allowed (per design specs)
// see: https://www.figma.com/file/oQsMzMMnynfPWpMEt91OpH/HDS-Product---Foundations?node-id=1262%3A9192

export const DEFAULT_SIZE = HdsTextSizeValues.TwoHundred;

// Filter out reverse mappings from enum
// https://www.typescriptlang.org/docs/handbook/enums.html#reverse-mappings
export const SIZES: HdsTextSizes[] = Object.values(HdsTextSizeValues).filter(
  (v): boolean => typeof v === 'number'
) as HdsTextSizes[];

export type HdsTextDisplayWeight = Extract<
  HdsTextWeights,
  'medium' | 'semibold' | 'bold'
>;
export const DEFAULT_WEIGHTS_PER_SIZE: Record<
  HdsTextSizeValues,
  HdsTextDisplayWeight
> = {
  [HdsTextSizeValues.FiveHundred]: HdsTextWeightValues.Bold,
  [HdsTextSizeValues.FourHundred]: HdsTextWeightValues.Semibold,
  [HdsTextSizeValues.ThreeHundred]: HdsTextWeightValues.Semibold,
  [HdsTextSizeValues.TwoHundred]: HdsTextWeightValues.Semibold,
  [HdsTextSizeValues.OneHundred]: HdsTextWeightValues.Medium,
};
export const WEIGHTS_PER_SIZE: Record<HdsTextSizes, HdsTextDisplayWeight[]> = {
  [HdsTextSizeValues.FiveHundred]: [HdsTextWeightValues.Bold],
  [HdsTextSizeValues.FourHundred]: [
    HdsTextWeightValues.Medium,
    HdsTextWeightValues.Semibold,
    HdsTextWeightValues.Bold,
  ],
  [HdsTextSizeValues.ThreeHundred]: [
    HdsTextWeightValues.Medium,
    HdsTextWeightValues.Semibold,
    HdsTextWeightValues.Bold,
  ],
  [HdsTextSizeValues.TwoHundred]: [HdsTextWeightValues.Semibold],
  [HdsTextSizeValues.OneHundred]: [HdsTextWeightValues.Medium],
};

export interface HdsTextDisplaySignature {
  Args: {
    size?: HdsTextSizes;
    tag?: HdsTextTags;
    weight?: HdsTextDisplayWeight;
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

export default class HdsTextDisplay extends Component<HdsTextDisplaySignature> {
  // Sets the "size" for the text
  get size(): HdsTextSizes {
    let { size = DEFAULT_SIZE } = this.args;

    // let's be a bit forgiving with the consumers
    if (typeof size === 'string') {
      size = parseInt(size, 10);
    }

    assert(
      `@size for "Hds::Text::Display" must be one of the following: ${SIZES.join(
        ', '
      )}; received: ${size}`,
      SIZES.includes(size)
    );

    return size;
  }

  // Sets the "weight" for the text
  get weight(): HdsTextDisplayWeight {
    let { weight } = this.args;

    if (weight) {
      const weights = WEIGHTS_PER_SIZE[this.size];
      assert(
        `@weight for "Hds::Text::Display" with @size=${
          this.size
        } must be one of the following: ${weights.join(
          ', '
        )}; received: ${weight}`,
        weights.includes(weight)
      );
    } else {
      // use the default (first item in the array)
      weight = DEFAULT_WEIGHTS_PER_SIZE[this.size];
    }

    return weight;
  }

  <template>
    <HdsText
      @group="display"
      @size={{this.size}}
      @weight={{this.weight}}
      @align={{@align}}
      @color={{@color}}
      @tag={{@tag}}
      ...attributes
    >{{yield}}</HdsText>
  </template>
}
