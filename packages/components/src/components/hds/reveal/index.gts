/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { on } from '@ember/modifier';

import HdsRevealToggleButton from './toggle/button.gts';
import HdsDisclosurePrimitive from '../disclosure-primitive/index.gts';

import type { HdsDisclosurePrimitiveSignature } from '../disclosure-primitive/index.gts';
import type { HdsRevealToggleButtonSignature } from './toggle/button.gts';

export interface HdsRevealSignature {
  Args: {
    text: HdsRevealToggleButtonSignature['Args']['text'];
    textWhenOpen?: HdsRevealToggleButtonSignature['Args']['text'];
    isOpen?: HdsRevealToggleButtonSignature['Args']['isOpen'];
    ariaDescribedBy?: string;
  };
  Blocks: {
    default: [];
  };
  Element: HdsDisclosurePrimitiveSignature['Element'];
}

export default class HdsReveal extends Component<HdsRevealSignature> {
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
          aria-controls={{t.contentId}}
          aria-describedby={{@ariaDescribedBy}}
          @text={{this.getText t.isOpen}}
          @isOpen={{t.isOpen}}
          {{on "click" t.onClickToggle}}
        />
      </:toggle>

      <:content>
        <div
          class="hds-reveal__content hds-typography-body-200 hds-foreground-primary"
        >
          {{yield}}
        </div>
      </:content>
    </HdsDisclosurePrimitive>
  </template>
}
