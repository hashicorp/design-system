/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { capitalize } from '@ember/string';
import { array } from '@ember/helper';
import { eq, or } from 'ember-truth-helpers';
import { modifier } from 'ember-modifier';
import style from 'ember-style-modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import {
  HdsCopySnippet,
  HdsIcon,
} from '@hashicorp/design-system-components/components';
import {
  COLORS,
  SUCCESS_ICON,
  ERROR_ICON,
} from '@hashicorp/design-system-components/components/hds/copy/snippet/index';

const STATES = ['default', 'hover', 'active', 'focus'];

export default class SubSectionBaseElements extends Component {
  replaceCopyStatus = modifier((container: HTMLDivElement) => {
    container.querySelectorAll('[mock-copy-status]').forEach((element) => {
      const status = element.getAttribute('mock-copy-status');
      element.classList.remove('hds-copy-snippet--status-idle');
      element.classList.add(`hds-copy-snippet--status-${status}`);

      const icon = element.querySelector('svg use');

      if (icon) {
        if (status === 'success') {
          // Note: Timeout is needed to allow the copy button component to load the default icon before it's replaced with the status icon
          window.setTimeout(() => {
            icon.setAttribute('href', `#hds-icon-flight-${SUCCESS_ICON}-16`);
          }, 200);
        } else if (status === 'error') {
          window.setTimeout(() => {
            icon.setAttribute('href', `#hds-icon-flight-${ERROR_ICON}-16`);
          }, 200);
        }
      }
    });
  });

  <template>
    <ShwTextH2>States</ShwTextH2>

    {{! Note: HdsIcons are needed to preload the SVGs for the copy button statuses }}
    <HdsIcon @name="clipboard-checked" {{style display="none"}} />
    <HdsIcon @name="clipboard-x" {{style display="none"}} />
    <div {{this.replaceCopyStatus}}>
      <ShwGrid @columns={{6}} as |SG|>
        {{#each COLORS as |color|}}
          {{#each STATES as |state|}}
            <SG.Item @label={{if (eq color "primary") (capitalize state)}}>
              <div
                class={{if
                  (or (eq state "default") (eq state "focus"))
                  "shw-component-copy-snippet-state-container-chequered-background"
                }}
              >
                <HdsCopySnippet
                  @textToCopy="fbrct1ed-fgr35h-tyng89-wed4r"
                  @color={{color}}
                  mock-state-value={{state}}
                />
              </div>
            </SG.Item>
          {{/each}}
          {{#let (array "success" "error") as |statuses|}}
            {{#each statuses as |status|}}
              <SG.Item @label={{if (eq color "primary") (capitalize status)}}>
                <HdsCopySnippet
                  @textToCopy="fbrct1ed-fgr35h-tyng89-wed4r"
                  @color={{color}}
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
