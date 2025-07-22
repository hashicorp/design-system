/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { array } from '@ember/helper';
import { capitalize } from '@ember/string';
import { eq } from 'ember-truth-helpers';
import { modifier } from 'ember-modifier';

import ShwGrid from 'showcase/components/shw/grid';

import { HdsCopyButton } from '@hashicorp/design-system-components/components';
import {
  SIZES,
  SUCCESS_ICON,
  ERROR_ICON,
} from '@hashicorp/design-system-components/components/hds/copy/button/index';

import { INTERACTION_STATES } from 'showcase/utils/ComponentStates';

export interface CopyButtonStatesSignature {
  Element: HTMLDivElement;
}

export default class CopyButtonStates extends Component<CopyButtonStatesSignature> {
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
    <div {{this.replaceCopyStatus}}>
      <ShwGrid @columns={{6}} as |SG|>
        {{#each SIZES as |size|}}
          {{#each INTERACTION_STATES as |state|}}
            <SG.Item @label={{if (eq size "small") (capitalize state)}}>
              <HdsCopyButton
                @text="Copy"
                @size={{size}}
                mock-state-value={{state}}
                @targetToCopy="#targetToCopy"
              />
            </SG.Item>
          {{/each}}
          {{#let (array "success" "error") as |statuses|}}
            {{#each statuses as |status|}}
              <SG.Item @label={{if (eq size "small") (capitalize status)}}>
                <HdsCopyButton
                  @text="Copy"
                  @size={{size}}
                  @targetToCopy="#targetToCopy"
                  mock-copy-status={{status}}
                />
              </SG.Item>
            {{/each}}
          {{/let}}
        {{/each}}
      </ShwGrid>
    </div>
  </template>
}
