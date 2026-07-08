/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwDivider from 'showcase/components/shw/divider';

export default class SubSectionComponentSandbox extends Component {
  @tracked value = '';
  @tracked showError = false;

  handleInput = (event: Event) => {
    this.value = (event.target as HTMLInputElement).value;
  };

  handleValidate = () => {
    this.showError = !this.value;
  };

  get isInvalid() {
    return this.showError && !this.value;
  }

  <template>
    <ShwTextH2>Component Sandbox — cds-text-input</ShwTextH2>

    <cds-text-input
      value={{this.value}}
      label="Full Name"
      helper-text="Enter your first and last name."
      invalid={{this.isInvalid}}
      invalid-text="Name is required."
      name="test"
      {{on "input" this.handleInput}}
    />

    <button type="button" {{on "click" this.handleValidate}}>Validate</button>

    {{#if this.value}}
      <p>✅ Value: {{this.value}}</p>
    {{/if}}

    <ShwDivider />
  </template>
}
