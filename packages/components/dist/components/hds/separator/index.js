import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { HdsSeparatorSpacingValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<hr class={{this.classNames}} ...attributes />");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const DEFAULT_SPACING = HdsSeparatorSpacingValues.TwentyFour;
const SPACING = Object.values(HdsSeparatorSpacingValues);
class HdsSeparatorComponent extends Component {
  /**
   * Sets the margin for the separator
   * Accepted values: 24, 0
   *
   * @param spacing
   * @type {HdsSeparatorSpacing}
   * @default 24
   */
  get spacing() {
    const {
      spacing = DEFAULT_SPACING
    } = this.args;
    assert(`@spacing for "Hds::Separator" must be one of the following: ${SPACING.join(', ')}; received: ${spacing}`, SPACING.includes(spacing));
    return spacing;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-separator'];

    // add a class based on the @spacing argument
    classes.push(`hds-separator--spacing-${this.spacing}`);
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsSeparatorComponent);

export { DEFAULT_SPACING, SPACING, HdsSeparatorComponent as default };
//# sourceMappingURL=index.js.map
