/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';

export default class DocTokenPreviewComponent extends Component {
  get token() {
    let { token } = this.args;
    return {
      name: token.name,
      // note: we prefix `type` and `value` with `$` because we're using the DTCG format
      $type: token.$type,
      $value: token.$value,
    };
  }

  get colorPreviewStyle() {
    if (
      // token values may be numbers
      typeof this.token.$value === 'string' &&
      // check that is a known color format
      (this.token.$value.startsWith('#') || this.token.$value.startsWith('rgb'))
    ) {
      return htmlSafe(`background-color: var(--${this.token.name})`);
    } else {
      return undefined;
    }
  }

  get backgroundImagePreviewStyle() {
    if (
      // token values may be numbers
      typeof this.token.$value === 'string' &&
      // check that is a background image
      this.token.$value.match(/url\("data:image\//)
    ) {
      let backgroundColor;
      if (this.token.$value.match(/fill='%23f{3,6}'/i)) {
        backgroundColor = 'rgb(0 0 0 / 15%)';
      } else {
        backgroundColor = 'transparent';
      }
      return htmlSafe(
        `background-image: var(--${this.token.name}); background-color: ${backgroundColor}`,
      );
    } else {
      return undefined;
    }
  }

  get fontPreviewStyle() {
    if (this.token.$type === 'font-size') {
      return htmlSafe(`font-size: var(--${this.token.name})`);
    } else if (
      this.token.name.startsWith('token-typography') &&
      (this.token.name.includes('font-stack') ||
        this.token.name.includes('font-family'))
    ) {
      return htmlSafe(`font-family: var(--${this.token.name})`);
    } else if (this.token.name.startsWith('token-typography-font-weight')) {
      return htmlSafe(`font-weight: var(--${this.token.name})`);
    } else {
      return undefined;
    }
  }

  get sizePreviewStyle() {
    if (
      // token values may be numbers
      typeof this.token.$value === 'string' &&
      // check that is a size (dimension)
      this.token.$type === 'dimension' &&
      this.token.$value.endsWith('px')
    ) {
      return htmlSafe(`--token-value-height: var(--${this.token.name})`);
    } else {
      return undefined;
    }
  }

  get boxShadowPreviewStyle() {
    const isBoxShadow = this.token.name.endsWith('box-shadow');
    return isBoxShadow
      ? htmlSafe(`--token-value-box-shadow: var(--${this.token.name})`)
      : undefined;
  }
}
