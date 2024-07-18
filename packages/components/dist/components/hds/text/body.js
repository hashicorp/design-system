import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { HdsTextSizeValues, HdsTextWeightValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<Hds::Text\n  @group=\"body\"\n  @size={{this.size}}\n  @weight={{this.weight}}\n  @align={{@align}}\n  @color={{@color}}\n  @tag={{@tag}}\n  ...attributes\n>{{yield}}</Hds::Text>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const AVAILABLE_SIZES = [HdsTextSizeValues.ThreeHundred, HdsTextSizeValues.TwoHundred, HdsTextSizeValues.OneHundred];
const DEFAULT_SIZE = HdsTextSizeValues.TwoHundred;
const DEFAULT_WEIGHT = HdsTextWeightValues.Regular;
const AVAILABLE_WEIGHTS_PER_SIZE = {
  300: [HdsTextWeightValues.Regular, HdsTextWeightValues.Medium, HdsTextWeightValues.Semibold],
  200: [HdsTextWeightValues.Regular, HdsTextWeightValues.Medium, HdsTextWeightValues.Semibold],
  100: [HdsTextWeightValues.Regular, HdsTextWeightValues.Medium, HdsTextWeightValues.Semibold]
};
class HdsTextBodyComponent extends Component {
  /**
   * Sets the "size" for the text
   * Accepted values: see AVAILABLE_SIZES
   *
   * @param size
   * @type {HdsTextBodySizes}
   *
   */
  get size() {
    let {
      size = DEFAULT_SIZE
    } = this.args;

    // let's be a bit forgiving with the consumers
    if (typeof size === 'string') {
      size = parseInt(size, 10);
    }
    assert(`@size for "Hds::Text::Body" must be one of the following: ${AVAILABLE_SIZES.join(', ')}; received: ${size}`, AVAILABLE_SIZES.includes(size));
    return size;
  }

  /**
   * Sets the "weight" for the text
   * Accepted values: see AVAILABLE_WEIGHTS_PER_SIZE
   *
   * @param weight
   * @type {HdsTextWeights}
   *
   */
  get weight() {
    const {
      weight = DEFAULT_WEIGHT
    } = this.args;
    const availableWeights = AVAILABLE_WEIGHTS_PER_SIZE[this.size];
    assert(`@weight for "Hds::Text::Body" with @size=${this.size} must be one of the following: ${availableWeights.join(', ')}; received: ${weight}`, availableWeights.includes(weight));
    return weight;
  }
}
setComponentTemplate(TEMPLATE, HdsTextBodyComponent);

export { AVAILABLE_SIZES, AVAILABLE_WEIGHTS_PER_SIZE, DEFAULT_SIZE, DEFAULT_WEIGHT, HdsTextBodyComponent as default };
//# sourceMappingURL=body.js.map
