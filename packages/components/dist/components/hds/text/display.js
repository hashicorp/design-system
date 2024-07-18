import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { HdsTextSizeValues, HdsTextWeightValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<Hds::Text\n  @group=\"display\"\n  @size={{this.size}}\n  @weight={{this.weight}}\n  @align={{@align}}\n  @color={{@color}}\n  @tag={{@tag}}\n  ...attributes\n>{{yield}}</Hds::Text>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

// notice: only some combinations of size + font-weight are allowed (per design specs)
// see: https://www.figma.com/file/oQsMzMMnynfPWpMEt91OpH/HDS-Product---Foundations?node-id=1262%3A9192

const DEFAULT_SIZE = HdsTextSizeValues.TwoHundred;

// Filter out reverse mappings from enum
// https://www.typescriptlang.org/docs/handbook/enums.html#reverse-mappings
const AVAILABLE_SIZES = Object.values(HdsTextSizeValues).filter(v => typeof v === 'number');
const DEFAULT_WEIGHTS_PER_SIZE = {
  [HdsTextSizeValues.FiveHundred]: HdsTextWeightValues.Bold,
  [HdsTextSizeValues.FourHundred]: HdsTextWeightValues.Semibold,
  [HdsTextSizeValues.ThreeHundred]: HdsTextWeightValues.Semibold,
  [HdsTextSizeValues.TwoHundred]: HdsTextWeightValues.Semibold,
  [HdsTextSizeValues.OneHundred]: HdsTextWeightValues.Medium
};
const AVAILABLE_WEIGHTS_PER_SIZE = {
  [HdsTextSizeValues.FiveHundred]: [HdsTextWeightValues.Bold],
  [HdsTextSizeValues.FourHundred]: [HdsTextWeightValues.Medium, HdsTextWeightValues.Semibold, HdsTextWeightValues.Bold],
  [HdsTextSizeValues.ThreeHundred]: [HdsTextWeightValues.Medium, HdsTextWeightValues.Semibold, HdsTextWeightValues.Bold],
  [HdsTextSizeValues.TwoHundred]: [HdsTextWeightValues.Semibold],
  [HdsTextSizeValues.OneHundred]: [HdsTextWeightValues.Medium]
};
class HdsTextDisplayComponent extends Component {
  /**
   * Sets the "size" for the text
   * Accepted values: see AVAILABLE_SIZES
   *
   * @type {HdsTextSizes}
   *
   * @param size
   */
  get size() {
    let {
      size = DEFAULT_SIZE
    } = this.args;

    // let's be a bit forgiving with the consumers
    if (typeof size === 'string') {
      size = parseInt(size, 10);
    }
    assert(`@size for "Hds::Text::Display" must be one of the following: ${AVAILABLE_SIZES.join(', ')}; received: ${size}`, AVAILABLE_SIZES.includes(size));
    return size;
  }

  /**
   * Sets the "weight" for the text
   * Accepted values: see AVAILABLE_WEIGHTS_PER_SIZE
   *
   * @type {HdsTextDisplayWeight}
   *
   * @param variant
   */
  get weight() {
    let {
      weight
    } = this.args;
    if (weight) {
      const availableWeights = AVAILABLE_WEIGHTS_PER_SIZE[this.size];
      assert(`@weight for "Hds::Text::Display" with @size=${this.size} must be one of the following: ${availableWeights.join(', ')}; received: ${weight}`, availableWeights.includes(weight));
    } else {
      // use the default (first item in the array)
      weight = DEFAULT_WEIGHTS_PER_SIZE[this.size];
    }
    return weight;
  }
}
setComponentTemplate(TEMPLATE, HdsTextDisplayComponent);

export { AVAILABLE_SIZES, AVAILABLE_WEIGHTS_PER_SIZE, DEFAULT_SIZE, DEFAULT_WEIGHTS_PER_SIZE, HdsTextDisplayComponent as default };
//# sourceMappingURL=display.js.map
