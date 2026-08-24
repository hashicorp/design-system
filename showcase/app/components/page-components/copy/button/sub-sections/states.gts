/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { capitalize } from '@ember/string';
import { eq } from 'ember-truth-helpers';
import { modifier } from 'ember-modifier';
import style from 'ember-style-modifier';

import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import {
  HdsCopyButton,
  HdsIcon,
} from '@hashicorp/design-system-components/components';
import {
  SIZES,
  SUCCESS_ICON,
  ERROR_ICON,
} from '@hashicorp/design-system-components/components/hds/copy/button/index';

// these are used only for presentation purpose in the showcase
const STATES = ['default', 'hover', 'active', 'focus', 'disabled'];

export default class SubSectionStates extends Component {
  replaceCopyStatus = modifier((container: HTMLDivElement) => {
    container.querySelectorAll('[mock-copy-status]').forEach((element) => {
      const status = element.getAttribute('mock-copy-status');
      element.classList.remove('hds-copy-button--status-idle');
      element.classList.add(`hds-copy-button--status-${status}`);

      const icon = element.querySelector('svg use');

      if (icon) {
        if (status === 'success') {
          // Note: Timeout is needed to allow the copy button component to load the default icon before it's replaced with the status icon
          window.setTimeout(() => {
            icon.setAttribute('href', `#flight-${SUCCESS_ICON}-16`);
          }, 200);
        } else if (status === 'error') {
          window.setTimeout(() => {
            icon.setAttribute('href', `#flight-${ERROR_ICON}-16`);
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
      <ShwGrid @columns={{7}} as |SG|>
        {{#each SIZES as |size|}}
          {{#each STATES as |state|}}
            <SG.Item @label="{{capitalize size}} / {{capitalize state}}">
              {{#if (eq state "disabled")}}
                <HdsCopyButton
                  @text="Copy token"
                  @size={{size}}
                  @textToCopy="fbrct1ed-fgr35h-tyng89-wed4r"
                  disabled
                />
              {{else}}
                <HdsCopyButton
                  @text="Copy token"
                  @size={{size}}
                  @textToCopy="fbrct1ed-fgr35h-tyng89-wed4r"
                  mock-state-value={{state}}
                />
              {{/if}}
            </SG.Item>
          {{/each}}
          <SG.Item @label="{{capitalize size}} / Success">
            <HdsCopyButton
              @text="Copy token"
              @size={{size}}
              @textToCopy="fbrct1ed-fgr35h-tyng89-wed4r"
              mock-copy-status="success"
            />
          </SG.Item>
          <SG.Item @label="{{capitalize size}} / Error">
            <HdsCopyButton
              @text="Copy token"
              @size={{size}}
              @textToCopy="fbrct1ed-fgr35h-tyng89-wed4r"
              mock-copy-status="error"
            />
          </SG.Item>
        {{/each}}
      </ShwGrid>
    </div>
  </template>
}
