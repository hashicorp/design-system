/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { capitalize } from '@ember/string';
import { array } from '@ember/helper';
import { modifier } from 'ember-modifier';

import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import { HdsCodeBlockCopyButton } from '@hashicorp/design-system-components/components';
import {
  SUCCESS_ICON,
  ERROR_ICON,
} from '@hashicorp/design-system-components/components/hds/copy/button/index';

const STATES = ['default', 'hover', 'active', 'focus'];

export default class SubSectionBaseElements extends Component {
  replaceCopyStatus = modifier((container: HTMLDivElement) => {
    container.querySelectorAll('[mock-copy-status]').forEach((element) => {
      const status = element.getAttribute('mock-copy-status');
      element.classList.remove('hds-copy-button--status-idle');
      element.classList.add(`hds-copy-button--status-${status}`);

      const icon = element.querySelector('svg use');

      if (icon) {
        if (status === 'success') {
          // eg. href="#flight-clipboard-checked-16"
          icon.setAttribute('href', `#flight-${SUCCESS_ICON}-16`);
        } else if (status === 'error') {
          icon.setAttribute('href', `#flight-${ERROR_ICON}-16`);
        }
      }
    });
  });

  <template>
    <ShwTextH2>CodeBlockCopyButton</ShwTextH2>

    <ShwTextH3>States</ShwTextH3>

    <span class="shw-component-code-block-display-none" id="test-target">Copy me</span>

    <ShwGrid @columns={{6}} {{this.replaceCopyStatus}} as |SG|>
      {{#each STATES as |state|}}
        <SG.Item
          @label={{capitalize state}}
          class="shw-component-code-block-copy-button"
        >
          <HdsCodeBlockCopyButton
            mock-state-value={{state}}
            @targetToCopy="#test-target"
            class="hds-code-block--theme-dark"
          />
        </SG.Item>
      {{/each}}
      {{#let (array "success" "error") as |statuses|}}
        {{#each statuses as |status|}}
          <SG.Item
            @label={{capitalize status}}
            class="shw-component-code-block-copy-button"
          >
            <HdsCodeBlockCopyButton
              mock-copy-status={{status}}
              @targetToCopy="#test-target"
              class="hds-code-block--theme-dark"
            />
          </SG.Item>
        {{/each}}
      {{/let}}
    </ShwGrid>
  </template>
}
