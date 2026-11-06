/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';
import style from 'ember-style-modifier';

import { HdsDropdown } from '@hashicorp/design-system-components/components';

export default class CodeFragmentWithExternalControl extends Component {
  @tracked isOpen = true;

  get buttonLabel(): string {
    return this.isOpen ? 'Close dropdown' : 'Open dropdown';
  }

  onToggle = () => {
    this.isOpen = !this.isOpen;
  };

  // callbacks needed to keep tracked state in sync with internal state
  onOpen = () => {
    this.isOpen = true;
  };

  onClose = () => {
    this.isOpen = false;
  };

  <template>
    <div {{style marginBottom="1rem"}}>
      <button
        type="button"
        {{on "click" this.onToggle}}
      >{{this.buttonLabel}}</button>
      <p>isOpen: {{this.isOpen}}</p>
    </div>

    <HdsDropdown
      @isOpen={{this.isOpen}}
      @onOpen={{this.onOpen}}
      @onClose={{this.onClose}}
      as |D|
    >
      <D.ToggleButton @color="secondary" @text="Menu" />
      <D.Interactive @href="#">Create</D.Interactive>
      <D.Interactive @href="#">Edit</D.Interactive>
    </HdsDropdown>
  </template>
}
