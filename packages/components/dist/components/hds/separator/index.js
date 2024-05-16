import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<hr class={{this.classNames}} ...attributes />");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const DEFAULT_SPACING = '24';
const SPACING = ['24', '0'];
class HdsSeparatorIndexComponent extends Component {
  /**
   * Sets the margin for the separator
   * Accepted values: 24, 0
   *
   * @param spacing
   * @type {string}
   * @default 'default'
   */
  get spacing() {
    let {
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
    let classes = ['hds-separator'];

    // add a class based on the @spacing argument
    classes.push(`hds-separator--spacing-${this.spacing}`);
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsSeparatorIndexComponent);

export { DEFAULT_SPACING, SPACING, HdsSeparatorIndexComponent as default };
//# sourceMappingURL=index.js.map
