import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { HdsTextSizeValues, HdsTextWeightValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<Hds::Text\n  @group=\"code\"\n  @size={{this.size}}\n  @weight={{this.weight}}\n  @align={{@align}}\n  @color={{@color}}\n  @tag={{@tag}}\n  ...attributes\n>{{yield}}</Hds::Text>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const AVAILABLE_SIZES = [HdsTextSizeValues.ThreeHundred, HdsTextSizeValues.TwoHundred, HdsTextSizeValues.OneHundred];
const DEFAULT_SIZE = HdsTextSizeValues.TwoHundred;
const DEFAULT_WEIGHT = HdsTextWeightValues.Regular;
const AVAILABLE_WEIGHTS_PER_SIZE = {
  [HdsTextSizeValues.ThreeHundred]: [HdsTextWeightValues.Regular, HdsTextWeightValues.Bold],
  [HdsTextSizeValues.TwoHundred]: [HdsTextWeightValues.Regular, HdsTextWeightValues.Bold],
  [HdsTextSizeValues.OneHundred]: [HdsTextWeightValues.Regular, HdsTextWeightValues.Bold]
};
class HdsTextCodeComponent extends Component {
  /**
   * Sets the "size" for the text
   * Accepted values: see AVAILABLE_SIZES
   *
   * @type {HdsTextCodeSizes}
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
    assert(`@size for "Hds::Text::Code" must be one of the following: ${AVAILABLE_SIZES.join(', ')}; received: ${size}`, AVAILABLE_SIZES.includes(size));
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
    const {
      weight = DEFAULT_WEIGHT
    } = this.args;
    const availableWeights = AVAILABLE_WEIGHTS_PER_SIZE[this.size];
    assert(`@weight for "Hds::Text::Code" with @size=${this.size} must be one of the following: ${availableWeights.join(', ')}; received: ${weight}`, availableWeights.includes(weight));
    return weight;
  }
}
setComponentTemplate(TEMPLATE, HdsTextCodeComponent);

export { AVAILABLE_SIZES, AVAILABLE_WEIGHTS_PER_SIZE, DEFAULT_SIZE, DEFAULT_WEIGHT, HdsTextCodeComponent as default };
//# sourceMappingURL=code.js.map
