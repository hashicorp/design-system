import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import type Owner from '@ember/owner';
import FastBootService from 'ember-cli-fastboot/services/fastboot';

import { HdsAccordion } from '@hashicorp/design-system-components/components';
import type { HdsAccordionSignature } from '@hashicorp/design-system-components/components/hds/accordion/index';

const STORAGE_KEY = 'website:accordion:item-2-state';

export default class LocalComponent extends Component {
  @tracked itemState: HdsAccordionSignature['Args']['forceState'];
  @service declare fastboot: FastBootService;

  constructor(owner: Owner, args: Record<string, never>) {
    super(owner, args);
    if (!this.fastboot.isFastBoot) {
      this.itemState = (sessionStorage.getItem(STORAGE_KEY) ??
        'open') as HdsAccordionSignature['Args']['forceState'];
    }
  }

  onItemToggle = () => {
    this.itemState = this.itemState === 'open' ? 'close' : 'open';
    sessionStorage.setItem(STORAGE_KEY, this.itemState);
  };

  <template>
    <HdsAccordion as |A|>
      <A.Item>
        <:toggle>Item one</:toggle>
        <:content>
          Additional content for item one
        </:content>
      </A.Item>
      <A.Item
        @onClickToggle={{this.onItemToggle}}
        @forceState={{this.itemState}}
      >
        <:toggle>Item two</:toggle>
        <:content>
          Item open on page load. Click to close then refresh the window. The
          Item will remember its state and remain closed.
        </:content>
      </A.Item>
      <A.Item>
        <:toggle>Item three</:toggle>
        <:content>
          Additional content for item three
        </:content>
      </A.Item>
    </HdsAccordion>
  </template>
}
