/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import ShwTextBody from 'showcase/components/shw/text/body';

import { HdsAccordionItem } from '@hashicorp/design-system-components/components';

export default class CodeFragmentWithToggleCallback extends Component {
  @tracked toggleCount = 0;

  onClickToggle = () => {
    this.toggleCount += 1;
  };

  <template>
    <HdsAccordionItem @onClickToggle={{this.onClickToggle}}>
      <:toggle>Toggle to update the callback count</:toggle>
      <:content>The callback runs each time the item is toggled.</:content>
    </HdsAccordionItem>
    <ShwTextBody>
      Toggle callback called
      <strong>{{this.toggleCount}}</strong>
      times.
    </ShwTextBody>
  </template>
}
