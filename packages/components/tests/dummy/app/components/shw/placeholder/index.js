/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';

export default class PlaceholderIndexComponent extends Component {
  /**
   * Sets the width for the placeholder
   *
   * @param width
   * @type {string}
   * @default '100%'
   */
  get width() {
    let { width = '100%' } = this.args;

    if (typeof width === 'string' && width.match(/^[\d]+$/)) {
      width = `${parseInt(width, 10)}px`;
    }

    return width;
  }

  /**
   * Sets the width for the placeholder
   *
   * @param width
   * @type {string}
   * @default '100%'
   */
  get height() {
    let { height = '100%' } = this.args;

    if (typeof height === 'string' && height.match(/^[\d]+$/)) {
      height = `${parseInt(height, 10)}px`;
    }

    return height;
  }

  /**
   * Get a style attribute to apply to the placeholder based on the other properties argument.
   * @return {string} The style attribute to apply to the placeholder
   */
  get style() {
    let styles = [];
    if (this.width) {
      styles.push(`width: ${this.width}`);
    }
    if (this.height) {
      styles.push(`height: ${this.height}`);
    }
    if (this.args.background) {
      styles.push(`background: ${this.args.background}`);
    }
    return styles.length > 0 ? htmlSafe(styles.join('; ')) : undefined;
  }
}
