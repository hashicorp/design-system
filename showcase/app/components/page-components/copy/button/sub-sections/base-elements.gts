/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { capitalize } from '@ember/string';
import style from 'ember-style-modifier';
import { array } from '@ember/helper';
import { eq } from 'ember-truth-helpers';
import { modifier } from 'ember-modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwOutliner from 'showcase/components/shw/outliner';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import { HdsCopyButton } from '@hashicorp/design-system-components/components';
import {
  SIZES,
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
    <input
      type="hidden"
      id="targetToCopy"
      value="This is some text stored in a hidden &lt;input&gt; element"
    />
    <ShwTextH2>Content</ShwTextH2>

    <ShwFlex as |SF|>
      <SF.Item @label="Default">
        <HdsCopyButton @text="Copy" @targetToCopy="#targetToCopy" />
      </SF.Item>
      <SF.Item @label="Icon only">
        <HdsCopyButton
          @isIconOnly={{true}}
          @text="Copy"
          @targetToCopy="#targetToCopy"
        />
      </SF.Item>
    </ShwFlex>

    <ShwTextH2>Sizes</ShwTextH2>

    <ShwFlex as |SF|>
      {{#each SIZES as |size|}}
        <SF.Item @label={{capitalize size}}>
          <HdsCopyButton
            @text="Copy"
            @size={{size}}
            @targetToCopy="#targetToCopy"
          />
        </SF.Item>
      {{/each}}
      <SF.Item @label="Full width">
        <ShwOutliner {{style width="300px"}}>
          <HdsCopyButton
            @text="Copy"
            @isFullWidth={{true}}
            @targetToCopy="#targetToCopy"
          />
        </ShwOutliner>
      </SF.Item>
    </ShwFlex>

    <ShwTextH2>States</ShwTextH2>

    <div {{this.replaceCopyStatus}}>
      <ShwGrid @columns={{6}} as |SG|>
        {{#each SIZES as |size|}}
          {{#each STATES as |state|}}
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

    <ShwDivider />
  </template>
}
