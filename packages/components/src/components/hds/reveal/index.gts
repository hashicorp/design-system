/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';
import { on } from '@ember/modifier';

import HdsDisclosurePrimitive from '../disclosure-primitive/index.gts';
import HdsRevealToggleButton from './toggle/button.gts';

import type { HdsDisclosurePrimitiveSignature } from '../disclosure-primitive/index.gts';
import type { HdsRevealToggleButtonSignature } from './toggle/button.gts';

export interface HdsRevealSignature {
  Args: {
    text: HdsRevealToggleButtonSignature['Args']['text'];
    textWhenOpen?: HdsRevealToggleButtonSignature['Args']['text'];
    isOpen?: HdsRevealToggleButtonSignature['Args']['isOpen'];
  };
  Blocks: {
    default: [];
  };
  Element: HdsDisclosurePrimitiveSignature['Element'];
}

export default class HdsReveal extends Component<HdsRevealSignature> {
  /**
   * Generates a unique ID for the Content
   *
   * @param _contentId
   */
  private _contentId = 'content-' + guidFor(this);

  /**
   * @param getText
   * @type {string}
   * @description A local function that emulates a getter to compute the value of the `@text` argument for the button (mainly to make TypeScript happy)
   */
  getText = (isOpen: boolean): string => {
    if (isOpen && this.args.textWhenOpen !== undefined) {
      return this.args.textWhenOpen;
    } else {
      if (this.args.text !== undefined) {
        return this.args.text;
      } else {
        assert('@text for "Hds::Reveal" must have a valid value');
      }
    }
  };

  <template>
    <HdsDisclosurePrimitive
      class="hds-reveal"
      @isOpen={{@isOpen}}
      ...attributes
    >
      <:toggle as |t|>
        <HdsRevealToggleButton
          aria-controls={{this._contentId}}
          @text={{this.getText t.isOpen}}
          @isOpen={{t.isOpen}}
          {{on "click" t.onClickToggle}}
        />
      </:toggle>

      <:content>
        <div
          class="hds-reveal__content hds-typography-body-200 hds-foreground-primary"
          id={{this._contentId}}
        >
          {{yield}}
        </div>
      </:content>
    </HdsDisclosurePrimitive>
  </template>
}
