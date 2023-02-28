/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { htmlSafe } from '@ember/template';

export default class DocTokenCardIndexComponent extends Component {
  @tracked isExpanded = false;

  get token() {
    let { token } = this.args;
    return {
      name: token.name,
      type: token.type,
      value: token.value,
      aliases: token.aliases,
      category: token.attributes.category,
      original_value: token.original.value,
      deprecated: token.deprecated,
      comment: token?.documentation?.comment ?? token?.comment ?? undefined,
    };
  }

  get isAlias() {
    return (
      this.token.original_value !== this.token.value &&
      this.token.original_value.includes('{')
    );
  }

  get isDeprecated() {
    return this.token.deprecated;
  }

  get colorPreviewStyle() {
    const isColor =
      this.token.value.startsWith('#') || this.token.value.startsWith('rgb');
    return isColor
      ? htmlSafe(`background-color: ${this.token.value}`)
      : undefined;
  }

  get backgroundImagePreviewStyle() {
    const isBackgroundImage = this.token.value.match(/url\("data:image\//);
    let backgroundColor;
    if (this.token.value.match(/fill='%23f{3,6}'/i)) {
      backgroundColor = 'rgb(0 0 0 / 15%)';
    } else {
      backgroundColor = 'transparent';
    }
    return isBackgroundImage
      ? htmlSafe(
          `background-image: ${this.token.value}; background-color: ${backgroundColor}`
        )
      : undefined;
  }

  get fontPreviewStyle() {
    if (this.token.type === 'font-size') {
      return htmlSafe(`font-size: ${this.token.value}`);
    } else if (
      this.token.name.startsWith('token-typography') &&
      (this.token.name.includes('font-stack') ||
        this.token.name.includes('font-family'))
    ) {
      return htmlSafe(`font-family: ${this.token.value}`);
    } else if (this.token.name.startsWith('token-typography-font-weight')) {
      return htmlSafe(`font-weight: ${this.token.value}`);
    } else {
      return undefined;
    }
  }

  get sizePreviewStyle() {
    const isSize =
      this.token.type === 'size' && this.token.value.endsWith('px');
    return isSize ? htmlSafe(`height: ${this.token.value}`) : undefined;
  }

  get boxShadowPreviewStyle() {
    const isBoxShadow = this.token.name.endsWith('box-shadow');
    return isBoxShadow
      ? htmlSafe(`box-shadow: ${this.token.value}`)
      : undefined;
  }

  @action
  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
