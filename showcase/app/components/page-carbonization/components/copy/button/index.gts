/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { pageTitle } from 'ember-page-title';
import { array } from '@ember/helper';
import { eq } from 'ember-truth-helpers';
import { modifier } from 'ember-modifier';
import style from 'ember-style-modifier';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import {
  HdsCopyButton,
  HdsIcon,
} from '@hashicorp/design-system-components/components';
import {
  SIZES,
  SUCCESS_ICON,
  ERROR_ICON,
} from '@hashicorp/design-system-components/components/hds/copy/button/index';

const STATES = ['default', 'hover', 'active', 'focus'];
const COPY_STATUSES = ['success', 'error'];

export default class CopyButtonCarbonizationIndex extends Component {
  replaceCopyStatus = modifier((container: HTMLDivElement) => {
    container.querySelectorAll('[mock-copy-status]').forEach((element) => {
      const status = element.getAttribute('mock-copy-status');
      element.classList.remove('hds-copy-button--status-idle');
      element.classList.add(`hds-copy-button--status-${status}`);

      const icon = element.querySelector('svg use');

      if (icon) {
        if (status === 'success') {
          window.setTimeout(() => {
            icon.setAttribute('href', `#hds-icon-flight-${SUCCESS_ICON}-16`);
          }, 100);
        } else if (status === 'error') {
          window.setTimeout(() => {
            icon.setAttribute('href', `#hds-icon-flight-${ERROR_ICON}-16`);
          }, 100);
        }
      }
    });
  });

  <template>
    {{pageTitle "CopyButton - Carbonization"}}

    <ShwTextH1>CopyButton - Carbonization</ShwTextH1>

    <input
      type="hidden"
      id="targetToCopy"
      value="This is some text stored in a hidden <input> element"
    />

    <section>

      <ShwTextH2>Content</ShwTextH2>

      <ShwCarbonizationComparisonGrid>
        <:theming>
          <ShwFlex @direction="column" as |SF|>
            <SF.Item>
              <HdsCopyButton @text="Copy" @targetToCopy="#targetToCopy" />
            </SF.Item>
            <SF.Item>
              <HdsCopyButton
                @isIconOnly={{true}}
                @text="Copy"
                @targetToCopy="#targetToCopy"
              />
            </SF.Item>
          </ShwFlex>
        </:theming>
        <:reference>
          <ShwFlex @direction="column" as |SF|>
            <SF.Item>
              <cds-button size="md" kind="secondary">
                <HdsIcon @name="clipboard-copy" slot="icon" />
                Copy
              </cds-button>
            </SF.Item>
            <SF.Item>
              <cds-icon-button size="md" kind="secondary">
                <HdsIcon @name="clipboard-copy" slot="icon" />
                <span slot="tooltip-content">Copy</span>
              </cds-icon-button>
            </SF.Item>
          </ShwFlex>
        </:reference>
      </ShwCarbonizationComparisonGrid>

      <ShwDivider @level={{2}} />

      <ShwTextH2>Sizes</ShwTextH2>

      <ShwCarbonizationComparisonGrid>
        <:theming>
          <ShwFlex @direction="column" as |SF|>
            {{#each SIZES as |size|}}
              <SF.Item>
                <HdsCopyButton
                  @text="Copy"
                  @size={{size}}
                  @targetToCopy="#targetToCopy"
                />
              </SF.Item>
            {{/each}}
            <SF.Item>
              <HdsCopyButton
                @text="Copy"
                @isFullWidth={{true}}
                @targetToCopy="#targetToCopy"
              />
            </SF.Item>
          </ShwFlex>
        </:theming>
        <:reference>
          <ShwFlex @direction="column" as |SF|>
            {{#let (array "sm" "md") as |SIZES|}}
              {{#each SIZES as |size|}}
                <SF.Item>
                  <cds-button size={{size}} kind="secondary">
                    <HdsIcon @name="clipboard-copy" slot="icon" />
                    Copy
                  </cds-button>
                </SF.Item>
              {{/each}}
            {{/let}}
          </ShwFlex>
        </:reference>
      </ShwCarbonizationComparisonGrid>

      <ShwDivider @level={{2}} />

      <ShwTextH2>States</ShwTextH2>

      {{#each STATES as |state|}}
        <ShwCarbonizationComparisonGrid @label={{state}}>
          <:theming>
            <ShwFlex @direction="column" @gap="0.75rem" as |SF|>
              <SF.Item>
                <HdsCopyButton
                  @text="Copy"
                  @targetToCopy="#targetToCopy"
                  mock-state-value={{state}}
                />
              </SF.Item>
              <SF.Item>
                <HdsCopyButton
                  @isIconOnly={{true}}
                  @text="Copy"
                  @targetToCopy="#targetToCopy"
                  mock-state-value={{state}}
                />
              </SF.Item>
            </ShwFlex>
          </:theming>
          <:reference>
            {{#if (eq state "default")}}
              <ShwFlex @direction="column" @gap="0.75rem" as |SF|>
                <SF.Item>
                  <cds-button size="md" kind="secondary">
                    <HdsIcon @name="clipboard-copy" slot="icon" />
                    Copy
                  </cds-button>
                </SF.Item>
                <SF.Item>
                  <cds-icon-button size="md" kind="secondary">
                    <HdsIcon @name="clipboard-copy" slot="icon" />
                    <span slot="tooltip-content">Copy</span>
                  </cds-icon-button>
                </SF.Item>
              </ShwFlex>
            {{else}}
              <pre>TODO: add static image here</pre>
            {{/if}}
          </:reference>
        </ShwCarbonizationComparisonGrid>
      {{/each}}

      {{! Note: HdsIcons are needed to load the svgs for the copy button statuses }}
      <HdsIcon @name="clipboard-checked" {{style display="none"}} />
      <HdsIcon @name="clipboard-x" {{style display="none"}} />
      <div {{this.replaceCopyStatus}}>
        {{#each COPY_STATUSES as |status|}}
          <ShwCarbonizationComparisonGrid @label={{status}}>
            <:theming>
              <ShwFlex @direction="column" @gap="0.75rem" as |SF|>
                <SF.Item>
                  <HdsCopyButton
                    @text="Copy"
                    @targetToCopy="#targetToCopy"
                    mock-copy-status={{status}}
                  />
                </SF.Item>
                <SF.Item>
                  <HdsCopyButton
                    @isIconOnly={{true}}
                    @text="Copy"
                    @targetToCopy="#targetToCopy"
                    mock-copy-status={{status}}
                  />
                </SF.Item>
              </ShwFlex>
            </:theming>
          </ShwCarbonizationComparisonGrid>
        {{/each}}
      </div>
    </section>
  </template>
}
