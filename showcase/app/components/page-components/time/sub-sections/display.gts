/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import style from 'ember-style-modifier';
import { inject as service } from '@ember/service';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';

import { HdsTime } from '@hashicorp/design-system-components/components';
import { DISPLAYS } from '@hashicorp/design-system-components/services/hds-time';
import type TimeService from '@hashicorp/design-system-components/services/hds-time';

export default class SubSectionDisplay extends Component {
  @service declare readonly hdsTime: TimeService;

  get nearTimeDates() {
    const now = this.hdsTime.now;

    const fiveMinutesFromNow = new Date(now + 1000 * 60 * 5);
    const twoDaysFromNow = new Date(now + 1000 * 60 * 60 * 24 * 2);
    const oneWeekFromNow = new Date(now + 1000 * 60 * 60 * 24 * 7);
    const fiveMinutesAgo = new Date(now - 1000 * 60 * 5);
    const twoDaysAgo = new Date(now - 1000 * 60 * 60 * 24 * 2);
    const oneWeekAgo = new Date(now - 1000 * 60 * 60 * 24 * 7);

    return [
      fiveMinutesFromNow,
      twoDaysFromNow,
      oneWeekFromNow,
      fiveMinutesAgo,
      twoDaysAgo,
      oneWeekAgo,
    ];
  }

  <template>
    <ShwTextH2>Display</ShwTextH2>

    <ShwFlex @gap="4rem 9rem" as |SF|>
      <SF.Item @label="Default with display unset">
        <HdsTime @date="05 September 2018 14:07:32" @isOpen={{true}} />
      </SF.Item>

      {{#each DISPLAYS as |display|}}
        <SF.Item @label={{display}}>
          <HdsTime
            @date="05 September 2018 14:07:32"
            @display={{display}}
            @isOpen={{true}}
          />
        </SF.Item>
      {{/each}}
    </ShwFlex>

    <ShwDivider {{style marginTop="6rem"}} @level={{2}} />

    <ShwTextH3>Near time examples using “relative” display type</ShwTextH3>

    <ShwFlex @gap="2rem" as |SF|>
      {{#each this.nearTimeDates as |date|}}
        <SF.Item @label="{{date}}">
          <HdsTime @date={{date}} @display="relative" />
        </SF.Item>
      {{/each}}
    </ShwFlex>
  </template>
}
