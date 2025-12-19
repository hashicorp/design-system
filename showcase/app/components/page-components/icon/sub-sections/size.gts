/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { service } from '@ember/service';
import { on } from '@ember/modifier';

import style from 'ember-style-modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';

import {
  HdsIcon,
  HdsFormToggleField,
} from '@hashicorp/design-system-components/components';
import type HdsCarbonService from '@hashicorp/design-system-components/services/hds-carbon';

export default class SubSectionSize extends Component {
  @service declare readonly hdsCarbon: HdsCarbonService;

  toggleCarbonMode = () => {
    this.hdsCarbon.toggleCarbonMode();
  };
  <template>
    <div class="shw-component-icon-theme-toggle-container">
      <HdsFormToggleField {{on "change" this.toggleCarbonMode}} as |F|>
        <F.Label>Enable Carbon theme</F.Label>
      </HdsFormToggleField>
    </div>

    <ShwTextH2>Size</ShwTextH2>

    <ShwTextBody>Base sizes</ShwTextBody>

    <ShwFlex as |SF|>
      <SF.Item @label="16px (default)">
        <HdsIcon @name="check-circle-fill" />
      </SF.Item>
      <SF.Item @label="24px">
        <HdsIcon @name="check-circle-fill" @size="24" />
      </SF.Item>
    </ShwFlex>

    <ShwTextBody>Custom sizes</ShwTextBody>

    <ShwFlex as |SF|>
      <SF.Item @label="12px (stretched)">
        <div {{style width="12px" height="12px"}}>
          <HdsIcon @name="check-circle-fill" @size="16" @stretched={{true}} />
        </div>
      </SF.Item>
      <SF.Item @label="32px (stretched)">
        <div {{style width="32px" height="32px"}}>
          <HdsIcon @name="check-circle-fill" @size="24" @stretched={{true}} />
        </div>
      </SF.Item>
      <SF.Item @label="32px (stretched + inline)">
        <div {{style width="32px" height="32px"}}>
          <HdsIcon
            @name="check-circle-fill"
            @size="24"
            @stretched={{true}}
            @isInline={{true}}
          />
        </div>
      </SF.Item>
    </ShwFlex>

    <ShwDivider />
  </template>
}
