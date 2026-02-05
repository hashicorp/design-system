/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';

import ShwPlaceholder from 'showcase/components/shw/placeholder';

import { HdsPopoverPrimitive } from '@hashicorp/design-system-components/components';

export interface CodeFragmentWithFocusOutSignature {
  Element: HTMLDivElement;
}

export default class CodeFragmentWithFocusOut extends Component<CodeFragmentWithFocusOutSignature> {
  @tracked showExtraContent = false;

  demoShowContent = () => {
    this.showExtraContent = true;
  };

  demoHideContent = () => {
    this.showExtraContent = false;
  };

  demoOnFocusOut = () => {
    console.log('Popover focus out detected');
    const demoBtn = document.getElementById('demo-btn');
    demoBtn?.focus();
  };

  <template>
    <HdsPopoverPrimitive
      @enableClickEvents={{true}}
      @onFocusOut={{this.demoOnFocusOut}}
      as |PP|
    >
      <div
        class="shw-utilities-popover-primitive-fake-container"
        {{PP.setupPrimitiveContainer}}
      >
        <button
          type="button"
          class="shw-utilities-popover-primitive-fake-toggle"
          {{PP.setupPrimitiveToggle}}
        >Toggle</button>
        <div
          class="shw-utilities-popover-primitive-fake-popover"
          {{PP.setupPrimitivePopover}}
        >
          <ShwPlaceholder @text="Content" @width="120" @height="40" />
          <button
            type="button"
            id="demo-btn"
            {{on "click" this.demoShowContent}}
          >Show extra content</button>
          {{#if this.showExtraContent}}
            <div class="shw-utilities-popover-primitive-fake-extra-content">
              <button
                type="button"
                id="demo-btn-2"
                {{on "click" this.demoHideContent}}
              >Hide extra content</button>
              <ShwPlaceholder
                @text="On click of the button, this content will be removed, and focus will be set back on the previous button"
                @height="100"
                @width="120"
              />
            </div>
          {{/if}}
        </div>
      </div>
    </HdsPopoverPrimitive>
  </template>
}
