/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';

interface DocPlaceholderSignature {
  Args: {
    width?: string;
    height?: string;
    background?: string;
    text?: string;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class DocPlaceholder extends Component<DocPlaceholderSignature> {
  get width() {
    let { width = '100%' } = this.args;

    if (typeof width === 'string' && width.match(/^[\d]+$/)) {
      width = `${parseInt(width, 10)}px`;
    }

    return width;
  }

  get height() {
    let { height = '100%' } = this.args;

    if (typeof height === 'string' && height.match(/^[\d]+$/)) {
      height = `${parseInt(height, 10)}px`;
    }

    return height;
  }

  get style() {
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

    return styles.length > 0 ? htmlSafe(styles.join('; ')) : undefined;
  }

  <template>
    <div class="doc-placeholder" style={{this.style}} ...attributes>
      {{#if @text}}
        {{@text}}
      {{else}}
        {{yield}}
      {{/if}}
    </div>
  </template>
}
