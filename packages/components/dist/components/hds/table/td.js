import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { HdsTableHorizontalAlignmentValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<td class={{this.classNames}} ...attributes>\n  {{yield}}\n</td>");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const ALIGNMENTS = Object.values(HdsTableHorizontalAlignmentValues);
const DEFAULT_ALIGN = HdsTableHorizontalAlignmentValues.Left;
class HdsTableTd extends Component {
  /**
   * @param align
   * @type {string}
   * @default left
   * @description Determines the text alignment of the header or cell content. Options are: "left", "center", "right". If no align is defined, "left" is used.
   */
  get align() {
    const {
      align = DEFAULT_ALIGN
    } = this.args;
    assert(`@align for "Hds::Table::Td" must be one of the following: ${ALIGNMENTS.join(', ')}; received: ${align}`, ALIGNMENTS.includes(align));
    return align;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-table__td', 'hds-typography-body-200', 'hds-font-weight-regular'];

    // add a class based on the @align argument
    if (this.align) {
      classes.push(`hds-table__td--align-${this.align}`);
    }
    return classes.join(' ');
  }
}
setComponentTemplate(TEMPLATE, HdsTableTd);

export { ALIGNMENTS, DEFAULT_ALIGN, HdsTableTd as default };
//# sourceMappingURL=td.js.map
