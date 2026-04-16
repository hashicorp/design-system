/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { fn } from '@ember/helper';
import { on } from '@ember/modifier';

import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import { HdsCdsButton } from '@hashicorp/design-system-components/components';

export default class SubSectionInteractive extends Component {
  @tracked isDisabled = false;

  toggleDisabled = () => {
    this.isDisabled = !this.isDisabled;
  };

  alertMessage = (message: string) => {
    window.alert(message);
  };

  <template>
    <ShwTextH2>Interactive Examples</ShwTextH2>

    <ShwGrid @columns={{3}} as |SG|>
      <SG.Item>
        <ShwTextH3>Toggle Disabled State</ShwTextH3>
        <p>Click the button to toggle disabled state</p>
        <HdsCdsButton @kind="primary" @disabled={{this.isDisabled}}>
          {{#if this.isDisabled}}
            Disabled
          {{else}}
            Enabled
          {{/if}}
        </HdsCdsButton>
        <br />
        <button type="button" {{on "click" this.toggleDisabled}}>
          Toggle Disabled
        </button>
      </SG.Item>
    </ShwGrid>

    <ShwTextH3>Button as Link</ShwTextH3>

    <ShwFlex as |SF|>
      <SF.Item @label="Primary link">
        <HdsCdsButton @kind="primary" @href="https://hashicorp.com">
          Go to Hashicorp
        </HdsCdsButton>
      </SF.Item>
      <SF.Item @label="Secondary link with target">
        <HdsCdsButton
          @kind="secondary"
          @href="https://hashicorp.com"
          @target="_blank"
        >
          Open in new tab
        </HdsCdsButton>
      </SF.Item>
      <SF.Item @label="Ghost link with rel">
        <HdsCdsButton
          @kind="ghost"
          @href="https://hashicorp.com"
          @target="_blank"
          @rel="noopener noreferrer"
        >
          External link
        </HdsCdsButton>
      </SF.Item>
    </ShwFlex>

    <ShwTextH3>Button with Click Handler</ShwTextH3>

    <ShwFlex as |SF|>
      <SF.Item @label="With window alert">
        <HdsCdsButton
          @kind="primary"
          {{on "click" (fn this.alertMessage "Hello from HDS!")}}
        >
          Click me
        </HdsCdsButton>
      </SF.Item>
    </ShwFlex>
  </template>
}
