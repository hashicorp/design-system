/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';

interface ColorCardSignature {
  Args: {
    color: {
      colorName: string;
      cssVariable: string;
      cssHelper?: string;
      value: string;
    };
  };
  Element: HTMLDivElement;
}

export default class ColorCard extends Component<ColorCardSignature> {
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
    style += `color: ${this.hexValue};`;
    return htmlSafe(style);
  }

  <template>
    <div class="doc-color-card" style={{this.cardStyle}} ...attributes>
      <div class="doc-color-card__color-preview"></div>
      <div class="doc-color-card__color-name">{{this.colorName}}</div>
      <ul class="doc-color-card__color-vars" role="list">
        <li>
          <span>CSS variable: </span>
          <code>--{{this.cssVariable}}</code>
        </li>
        {{#if this.cssHelper}}
          <li>
            <span>CSS helper:</span>
            <code>.{{this.cssHelper}}</code>
          </li>
        {{/if}}
        <li>
          <span>HEX value:</span>
          <code>{{this.hexValue}}</code>
        </li>
      </ul>
    </div>
  </template>
}
