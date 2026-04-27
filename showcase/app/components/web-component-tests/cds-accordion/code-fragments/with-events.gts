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

interface EventDetail {
  open: boolean;
}

export default class CodeFragmentWithEvents extends Component {
  @tracked beingToggledLogs: string[] = [];
  @tracked toggledLogs: string[] = [];

  handleBeingToggled = (event: Event) => {
    const customEvent = event as CustomEvent<EventDetail>;
    const timestamp = new Date().toLocaleTimeString();
    this.beingToggledLogs = [
      `[${timestamp}] Being toggled - Open: ${customEvent.detail.open}`,
      ...this.beingToggledLogs,
    ].slice(0, 5);
  };

  handleToggled = (event: Event) => {
    const customEvent = event as CustomEvent<EventDetail>;
    const timestamp = new Date().toLocaleTimeString();
    this.toggledLogs = [
      `[${timestamp}] Toggled - Open: ${customEvent.detail.open}`,
      ...this.toggledLogs,
    ].slice(0, 5);
  };

  <template>
    <div>
      <HdsCdsAccordion>
        <HdsCdsAccordionItem
          title="Section 1"
          {{on "cds-accordion-item-beingtoggled" this.handleBeingToggled}}
          {{on "cds-accordion-item-toggled" this.handleToggled}}
        >
          <p>Content for section 1. Toggle this to see events fired.</p>
        </HdsCdsAccordionItem>
        <HdsCdsAccordionItem
          title="Section 2"
          {{on "cds-accordion-item-beingtoggled" this.handleBeingToggled}}
          {{on "cds-accordion-item-toggled" this.handleToggled}}
        >
          <p>Content for section 2. Toggle this to see events fired.</p>
        </HdsCdsAccordionItem>
      </HdsCdsAccordion>

      <div {{style marginTop="2rem"}}>
        <h4 {{style marginBottom="0.5rem" fontWeight="600"}}>
          cds-accordion-item-beingtoggled events:
        </h4>
        <div
          {{style
            background="#f4f4f4"
            padding="1rem"
            borderRadius="4px"
            fontFamily="monospace"
            fontSize="0.875rem"
            minHeight="3rem"
          }}
        >
          {{#if this.beingToggledLogs.length}}
            {{#each this.beingToggledLogs as |beingToggledLog|}}
              <div>{{beingToggledLog}}</div>
            {{/each}}
          {{else}}
            <em {{style color="#666"}}>No events yet. Toggle an accordion item
              above.</em>
          {{/if}}
        </div>

        <h4 {{style margin="1rem 0 0.5rem" fontWeight="600"}}>
          cds-accordion-item-toggled events:
        </h4>
        <div
          {{style
            background="#f4f4f4"
            padding="1rem"
            borderRadius="4px"
            fontFamily="monospace"
            fontSize="0.875rem"
            minHeight="3rem"
          }}
        >
          {{#if this.toggledLogs.length}}
            {{#each this.toggledLogs as |toggledLog|}}
              <div>{{toggledLog}}</div>
            {{/each}}
          {{else}}
            <em {{style color="#666"}}>No events yet. Toggle an accordion item
              above.</em>
          {{/if}}
        </div>
      </div>
    </div>
  </template>
}
