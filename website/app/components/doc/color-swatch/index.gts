/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import style from 'ember-style-modifier';
import { eq } from 'ember-truth-helpers';

import DocCopyButton from 'website/components/doc/copy-button';

interface DocColorSwatchSignature {
  Args: {
    color: {
      colorName: string;
      cssVariable: string;
      cssHelper?: string;
      value: string;
      modes: Record<string, string> | undefined;
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

  get cdsModes() {
    return this.args.color.modes;
  }
  <template>
    <div class="doc-color-swatch">
      <div
        class="doc-color-swatch__color-preview"
        {{style backgroundColor=@color.value}}
      ></div>
      <div class="doc-color-swatch__info">
        <h3 class="doc-color-swatch__name">{{this.colorName}}</h3>
        <ul class="doc-color-swatch__list" role="list">
          <li class="doc-color-swatch__listitem">
            <span class="doc-color-swatch__listitem--context">CSS Variable</span>
            <DocCopyButton @type="code" @textToCopy={{this.cssVariable}} />

          </li>
          {{#if this.cssHelper}}
            <li class="doc-color-swatch__listitem">
              <span class="doc-color-swatch__listitem--context">CSS Helper</span>
              <DocCopyButton
                @type="code"
                @textToCopy={{this.cssHelper}}
                @textToShow=".{{this.cssHelper}}"
              />
            </li>
          {{/if}}
          <li class="doc-color-swatch__listitem">
            <span class="doc-color-swatch__listitem--context">HEX</span>
            <DocCopyButton @type="code" @textToCopy={{@color.value}} />
          </li>
          {{#if this.cdsModes}}
            <li class="doc-color-swatch__listitem">
              <span class="doc-color-swatch__listitem--context">Modes</span>
              <div class="doc-color-swatch__modes">
                {{#each-in this.cdsModes as |mode value|}}
                  {{#unless (eq mode "default")}}
                    <div class="doc-color-swatch__mode">
                      <div
                        class="doc-color-swatch__mode-preview"
                        {{style backgroundColor=value}}
                      ></div>
                      <div class="doc-color-swatch__mode-name">{{mode}}</div>
                      <DocCopyButton @type="code" @textToCopy={{value}} />
                    </div>
                  {{/unless}}
                {{/each-in}}
              </div>
            </li>
          {{/if}}
        </ul>
      </div>
    </div>
  </template>
}
