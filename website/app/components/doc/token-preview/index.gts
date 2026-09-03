/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import style from 'ember-style-modifier';

interface DocTokenPreviewSignature {
  Args: {
    name: string;
    type: string;
    value: string;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class DocTokenPreview extends Component<DocTokenPreviewSignature> {
  get colorPreviewStyle() {
    if (
      // token values may be numbers
      typeof this.args.value === 'string' &&
      // check that is a known color format
      (this.args.value.startsWith('#') || this.args.value.startsWith('rgb'))
    ) {
      return `var(--${this.args.name})`;
    } else {
      return undefined;
    }
  }

  get backgroundImagePreviewStyle() {
    if (
      // token values may be numbers
      typeof this.args.value === 'string' &&
      // check that is a background image
      this.args.value.match(/url\("data:image\//)
    ) {
      let backgroundColor;
      if (this.args.value.match(/fill='%23f{3,6}'/i)) {
        backgroundColor = 'rgb(0 0 0 / 15%)';
      } else {
        backgroundColor = 'transparent';
      }
      return {
        backgroundImage: `var(--${this.args.name})`,
        backgroundColor,
      };
    } else {
      return undefined;
    }
  }

  get fontPreviewStyle() {
    if (this.args.type === 'font-size') {
      return {
        fontSize: `var(--${this.args.name})`,
        fontFamily: undefined,
        fontWeight: undefined,
      };
    } else if (
      this.args.name.startsWith('hds-typography') &&
      (this.args.name.includes('font-stack') ||
        this.args.name.includes('font-family'))
    ) {
      return {
        fontFamily: `var(--${this.args.name})`,
        fontSize: undefined,
        fontWeight: undefined,
      };
    } else if (this.args.name.startsWith('hds-typography-font-weight')) {
      return {
        fontWeight: `var(--${this.args.name})`,
        fontSize: undefined,
        fontFamily: undefined,
      };
    } else {
      return undefined;
    }
  }

  get sizePreviewStyle() {
    if (
      // token values may be numbers
      typeof this.args.value === 'string' &&
      // check that is a size (dimension)
      this.args.type === 'dimension' &&
      (this.args.value.endsWith('px') || this.args.value === '0')
    ) {
      return `var(--${this.args.name})`;
    } else {
      return undefined;
    }
  }

  get boxShadowPreviewStyle() {
    const isBoxShadow = this.args.name.endsWith('box-shadow');
    return isBoxShadow ? `var(--${this.args.name})` : undefined;
  }

  <template>
    {{#if this.colorPreviewStyle}}
      <div
        class="doc-token-preview doc-token-preview--color"
        {{style backgroundColor=this.colorPreviewStyle}}
      />
    {{else if this.backgroundImagePreviewStyle}}
      <div
        class="doc-token-preview doc-token-preview--image"
        {{style
          backgroundImage=this.backgroundImagePreviewStyle.backgroundImage
          backgroundColor=this.backgroundImagePreviewStyle.backgroundColor
        }}
      />
    {{else if this.fontPreviewStyle}}
      <div
        class="doc-token-preview doc-token-preview--font"
        {{style
          fontSize=this.fontPreviewStyle.fontSize
          fontFamily=this.fontPreviewStyle.fontFamily
          fontWeight=this.fontPreviewStyle.fontWeight
        }}
      >Aa</div>
    {{else if this.sizePreviewStyle}}
      <div
        class="doc-token-preview doc-token-preview--size"
        {{style --doc-token-preview-size=this.sizePreviewStyle}}
      >
        <span class="doc-token-preview__value">{{@value}}</span>
      </div>
    {{else if this.boxShadowPreviewStyle}}
      <div
        class="doc-token-preview doc-token-preview--boxshadow"
        {{style --doc-token-preview-box-shadow=this.boxShadowPreviewStyle}}
      />
    {{else}}
      <div class="doc-token-preview doc-token-preview--unknown" />
    {{/if}}
  </template>
}
