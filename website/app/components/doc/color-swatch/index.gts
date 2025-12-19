/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';

import DocCopyButton from 'website/components/doc/copy-button';

interface DocColorSwatchSignature {
  Args: {
    color: {
      colorName: string;
      cssVariable: string;
      cssHelper?: string;
      value: string;
    };
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class DocColorSwatch extends Component<DocColorSwatchSignature> {
  get colorName() {
    return this.args.color.colorName;
  }

  get cssVariable() {
    return this.args.color.cssVariable;
  }

  get cssHelper() {
    return this.args.color.cssHelper ?? false;
  }

  get hexValue() {
    return this.args.color.value;
  }

  get cardStyle() {
    let style = '';
    style += `background-color: ${this.hexValue};`;
    return htmlSafe(style);
  }

  <template>
    <div class="doc-color-swatch">
      <div
        class="doc-color-swatch__preview doc-color-swatch__preview-{{this.cssHelper}}"
        style={{this.cardStyle}}
      ></div>
      <div class="doc-color-swatch__info">
        <h3 class="doc-color-swatch__name">{{this.colorName}}</h3>
        <ul class="doc-color-swatch__list" role="list">
          <li class="doc-color-swatch__listitem">
            <span class="doc-color-swatch__listitem--context">CSS Variable</span>
            <DocCopyButton @textToCopy={{this.cssVariable}} @type="ghost" />

          </li>
          {{#if this.cssHelper}}
            <li class="doc-color-swatch__listitem">
              <span class="doc-color-swatch__listitem--context">CSS Helper</span>
              <DocCopyButton
                @textToCopy={{this.cssHelper}}
                @textToShow=".{{this.cssHelper}}"
                @type="ghost"
              />
            </li>
          {{/if}}
          <li class="doc-color-swatch__listitem">
            <span class="doc-color-swatch__listitem--context">HEX</span>
            <DocCopyButton @textToCopy={{this.hexValue}} @type="ghost" />
          </li>
        </ul>
      </div>
    </div>
  </template>
}
