/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';

import type { SafeString } from '@ember/template';

interface ShwPlaceholderSignature {
  Args: {
    background?: string;
    flex?: string;
    height?: string;
    text?: string;
    width?: string;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class ShwPlaceholder extends Component<ShwPlaceholderSignature> {
  /**
   * Sets the width for the placeholder
   *
   * @param width
   * @type {string}
   * @default '100%'
   */
  get width(): string {
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
  get height(): string {
    let { height = '100%' } = this.args;

    if (typeof height === 'string' && height.match(/^[\d]+$/)) {
      height = `${parseInt(height, 10)}px`;
    }

    return height;
  }

  /**
   * Get a style attribute to apply to the placeholder based on the other properties argument.
   * @return {SafeString} The style attribute to apply to the placeholder
   */
  get style(): SafeString | undefined {
    const styles = [];
    if (this.width) {
      styles.push(`width: ${this.width}`);
    }
    if (this.height) {
      styles.push(`height: ${this.height}`);
    }
    if (this.args.background) {
      styles.push(`background: ${this.args.background}`);
    }
    if (this.args.flex) {
      styles.push(`flex: ${this.args.flex}`);
    }

    return styles.length > 0 ? htmlSafe(styles.join('; ')) : undefined;
  }

  <template>
    <div class="shw-placeholder" style={{this.style}} ...attributes>
      {{#if @text}}
        {{@text}}
      {{else}}
        {{yield}}
      {{/if}}
    </div>
  </template>
}
