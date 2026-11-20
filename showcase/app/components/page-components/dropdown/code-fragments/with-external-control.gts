/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';
import style from 'ember-style-modifier';

import { HdsDropdown } from '@hashicorp/design-system-components/components';
import type { HdsDropdownForceStates } from '@hashicorp/design-system-components/components/hds/dropdown/types';

export default class CodeFragmentWithExternalControl extends Component {
  @tracked state: HdsDropdownForceStates = 'close';

  get buttonLabel(): string {
    return this.state === 'open' ? 'Close dropdown' : 'Open dropdown';
  }

  onToggle = () => {
    this.state = this.state === 'open' ? 'close' : 'open';
  };

  // use callbacks to keep consumer tracked state in sync with internal component state
  onOpen = () => {
    this.state = 'open';
  };

  onClose = () => {
    this.state = 'close';
  };

  <template>
    <button
      type="button"
      {{style padding=".25rem" marginBottom="1rem"}}
      {{on "click" this.onToggle}}
    >
      {{this.buttonLabel}}
    </button>
    <HdsDropdown
      @forceState={{this.state}}
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
