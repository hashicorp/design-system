/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export default class HdsVisibilityToggleIndexComponent extends Component {
  /**
   * @param ariaLabel
   * @type {string}
   * @default 'Show masked content'
   */
  get ariaLabel() {
    return this.args.ariaLabel || this.args.isMasked
      ? 'Show masked content'
      : 'Hide masked content';
  }

  /**
   * @param ariaMessageText
   * @type {string}
   * @default 'Input content is now hidden'
   */
  get ariaMessageText() {
    return this.args.ariaMessageText || this.args.isMasked
      ? 'Input content is now hidden'
      : 'Input content is now visible';
  }
}
