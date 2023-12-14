/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';

export default class HdsTableThButtonTooltipComponent extends Component {
  /**
   * Generates a unique ID for the (hidden) "label prefix" <span> element
   *
   * @param prefixLabelId
   */
  prefixLabelId = guidFor(this);

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-table__th-button', 'hds-table__th-button--tooltip'];

    return classes.join(' ');
  }
}
