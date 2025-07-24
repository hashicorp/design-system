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

const SIZES = [HdsTextSizeValues.ThreeHundred, HdsTextSizeValues.TwoHundred, HdsTextSizeValues.OneHundred];
const DEFAULT_SIZE = HdsTextSizeValues.TwoHundred;
const DEFAULT_WEIGHT = HdsTextWeightValues.Regular;
const WEIGHTS_PER_SIZE = {
  300: [HdsTextWeightValues.Regular, HdsTextWeightValues.Medium, HdsTextWeightValues.Semibold],
  200: [HdsTextWeightValues.Regular, HdsTextWeightValues.Medium, HdsTextWeightValues.Semibold],
  100: [HdsTextWeightValues.Regular, HdsTextWeightValues.Medium, HdsTextWeightValues.Semibold]
};
class HdsTextBody extends Component {
  // Sets the "size" for the text
  get size() {
    let {
      size = DEFAULT_SIZE
    } = this.args;

    // let's be a bit forgiving with the consumers
    if (typeof size === 'string') {
      size = parseInt(size, 10);
    }
    assert(`@size for "Hds::Text::Body" must be one of the following: ${SIZES.join(', ')}; received: ${size}`, SIZES.includes(size));
    return size;
  }

  // Sets the "weight" for the text
  get weight() {
    const {
      weight = DEFAULT_WEIGHT
    } = this.args;
    const weights = WEIGHTS_PER_SIZE[this.size];
    assert(`@weight for "Hds::Text::Body" with @size=${this.size} must be one of the following: ${weights.join(', ')}; received: ${weight}`, weights.includes(weight));
    return weight;
  }
}
setComponentTemplate(TEMPLATE, HdsTextBody);

export { DEFAULT_SIZE, DEFAULT_WEIGHT, SIZES, WEIGHTS_PER_SIZE, HdsTextBody as default };
//# sourceMappingURL=body.js.map
