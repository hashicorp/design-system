/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import style from 'ember-style-modifier';

import {
  HdsCdsAccordion,
  HdsCdsAccordionItem,
} from '@hashicorp/design-system-components/components';
import { HdsButton } from '@hashicorp/design-system-components/components';

export default class CodeFragmentExternalControl extends Component {
  @tracked isFirstItemOpen = false;

  toggleFirstItem = () => {
    this.isFirstItemOpen = !this.isFirstItemOpen;
    const item = document.querySelector(
      '#external-control-item-1',
    ) as HTMLElement & { open: boolean };
    if (item) {
      item.open = this.isFirstItemOpen;
    }
  };

  <template>
    <div>
      <HdsButton
        @text={{if this.isFirstItemOpen "Close First Item" "Open First Item"}}
        @color="secondary"
        @size="small"
        {{on "click" this.toggleFirstItem}}
        {{style marginBottom="1rem"}}
      />

      <HdsCdsAccordion>
        <HdsCdsAccordionItem
          id="external-control-item-1"
          title="Externally Controlled Item"
        >
          <p>This accordion item can be opened/closed via the button above.</p>
        </HdsCdsAccordionItem>
        <HdsCdsAccordionItem title="Regular Item 1">
          <p>This item works normally without external control.</p>
        </HdsCdsAccordionItem>
        <HdsCdsAccordionItem title="Regular Item 2">
          <p>This item also works normally without external control.</p>
        </HdsCdsAccordionItem>
      </HdsCdsAccordion>
    </div>
  </template>
}
