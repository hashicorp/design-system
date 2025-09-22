/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';
import { fn } from '@ember/helper';

import ShwPlaceholder from 'showcase/components/shw/placeholder';

import {
  HdsDisclosurePrimitive,
  HdsIcon,
} from '@hashicorp/design-system-components/components';

export default class CodeFragmentWithExternalControl extends Component {
  @tracked isOpen: boolean = false;

  toggleState = (state: string) => {
    if (state === 'open') {
      this.isOpen = true;
    } else if (state === 'close') {
      this.isOpen = false;
    } else if (state === 'toggle') {
      this.isOpen = !this.isOpen;
    }
  };

  onClickToggle = (isOpenInternalState: boolean) => {
    this.isOpen = isOpenInternalState;
  };

  <template>
    <button
      type="button"
      {{on "click" (fn this.toggleState "open")}}
    >Open</button>
    <button
      type="button"
      {{on "click" (fn this.toggleState "close")}}
    >Close</button>
    <button
      type="button"
      {{on "click" (fn this.toggleState "toggle")}}
    >Toggle</button>
    <div class="shw-utility-disclosure-primitive-container">
      <HdsDisclosurePrimitive
        @isOpen={{this.isOpen}}
        @onClickToggle={{this.onClickToggle}}
      >
        <:toggle as |t|>
          <button type="button" {{on "click" t.onClickToggle}}>
            Click me
            <HdsIcon @name={{if t.isOpen "chevron-up" "chevron-down"}} />
          </button>
        </:toggle>
        <:content>
          <ShwPlaceholder
            @text="some generic content here"
            @width="200"
            @height="90"
            @background="#e1f5fe"
          />
        </:content>
      </HdsDisclosurePrimitive>
    </div>
  </template>
}
