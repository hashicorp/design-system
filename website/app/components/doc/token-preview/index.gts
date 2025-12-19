/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import style from 'ember-style-modifier';

interface DocTokenPreviewSignature {
  Args: {
    token: {
      name: string;
      $type: string;
      $value: string | number;
    };
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class DocTokenPreview extends Component<DocTokenPreviewSignature> {
  get token() {
    const { token } = this.args;
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
      return `var(--${this.token.name})`;
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
      return {
        backgroundImage: `var(--${this.token.name})`,
        backgroundColor,
      };
    } else {
      return {
        backgroundImage: undefined,
        backgroundColor: undefined,
      };
    }
  }

  get fontPreviewStyle() {
    if (this.token.$type === 'font-size') {
      return {
        fontSize: `var(--${this.token.name})`,
        fontFamily: undefined,
        fontWeight: undefined,
      };
    } else if (
      this.token.name.startsWith('token-typography') &&
      (this.token.name.includes('font-stack') ||
        this.token.name.includes('font-family'))
    ) {
      return {
        fontFamily: `var(--${this.token.name})`,
        fontSize: undefined,
        fontWeight: undefined,
      };
    } else if (this.token.name.startsWith('token-typography-font-weight')) {
      return {
        fontWeight: `var(--${this.token.name})`,
        fontSize: undefined,
        fontFamily: undefined,
      };
    } else {
      return {
        fontWeight: undefined,
        fontSize: undefined,
        fontFamily: undefined,
      };
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
      return `var(--${this.token.name})`;
    } else {
      return undefined;
    }
  }

  get boxShadowPreviewStyle() {
    const isBoxShadow = this.token.name.endsWith('box-shadow');
    return isBoxShadow ? `var(--${this.token.name})` : undefined;
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
        {{style --token-value-height=this.sizePreviewStyle}}
      >
        <span class="doc-token-preview__value">{{this.token.$value}}</span>
      </div>
    {{else if this.boxShadowPreviewStyle}}
      <div
        class="doc-token-preview doc-token-preview--boxshadow"
        {{style --token-value-box-shadow=this.boxShadowPreviewStyle}}
      />
    {{else}}
      <div class="doc-token-preview doc-token-preview--unknown" />
    {{/if}}
  </template>
}
