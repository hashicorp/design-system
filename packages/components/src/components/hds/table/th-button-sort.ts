/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';

const NOOP = () => {};

export default class HdsTableThButtonSortComponent extends Component {
  /**
   * Generates a unique ID for the (hidden) "label prefix/suffix" <span> elements
   *
   * @param prefixLabelId/suffixLabelId
   */
  prefixLabelId = 'prefix-' + guidFor(this);
  suffixLabelId = 'suffix-' + guidFor(this);

  /**
   * @param icon
   * @type {string}
   * @private
   * @default swap-vertical
   * @description Determines which icon to use based on the sort order defined
   */
  get icon() {
    switch (this.args.sortOrder) {
      case 'asc':
        return 'arrow-up';
      case 'desc':
        return 'arrow-down';
      default:
        return 'swap-vertical';
    }
  }

  /**
   * @param sortOrderLabel
   * @default 'ascending'
   * @description Determines the label (suffix) to use in the `aria-labelledby` attribute of the button, used to indicate what will happen if the user clicks on the button
   */
  get sortOrderLabel() {
    return this.args.sortOrder === 'asc' ? 'descending' : 'ascending';
  }

  /**
   * @param onClick
   * @type {function}
   * @default () => {}
   */
  get onClick() {
    let { onClick } = this.args;

    if (typeof onClick === 'function') {
      return onClick;
    } else {
      return NOOP;
    }
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-table__th-button', 'hds-table__th-button--sort'];

    // add a class based on the @sortOrder argument
    if (this.args.sortOrder === 'asc' || this.args.sortOrder === 'desc') {
      classes.push(`hds-table__th-button--is-sorted`);
    }

    return classes.join(' ');
  }
}
