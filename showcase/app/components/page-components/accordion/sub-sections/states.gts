/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwGrid from 'showcase/components/shw/grid';
import ShwDivider from 'showcase/components/shw/divider';

import { HdsAccordion } from '@hashicorp/design-system-components/components';

const STATES = ['default', 'hover', 'active', 'focus'];

const SubSectionStates: TemplateOnlyComponent = <template>
  <ShwTextH2>States</ShwTextH2>
  <ShwTextBody>
    Mocked states are for visual comparison; the accordions in the content
    examples above can be opened and closed with pointer or keyboard input.
  </ShwTextBody>

  <ShwTextH3>Full toggle area</ShwTextH3>
  <ShwGrid @columns={{4}} as |SG|>
    {{#each STATES as |state|}}
      <SG.Item @label={{capitalize state}}>
        <HdsAccordion as |A|>
          <A.Item
            mock-state-value={{state}}
            mock-state-selector=".hds-disclosure-primitive__toggle"
          >
            <:toggle>View configuration</:toggle>
            <:content>Configuration details.</:content>
          </A.Item>
        </HdsAccordion>
      </SG.Item>
    {{/each}}
  </ShwGrid>

  <ShwTextH3>Chevron button only</ShwTextH3>
  <ShwGrid @columns={{4}} as |SG|>
    {{#each STATES as |state|}}
      <SG.Item @label={{capitalize state}}>
        <HdsAccordion as |A|>
          <A.Item
            @containsInteractive={{true}}
            mock-state-value={{state}}
            mock-state-selector="button"
          >
            <:toggle>View configuration</:toggle>
            <:content>Configuration details.</:content>
          </A.Item>
        </HdsAccordion>
      </SG.Item>
    {{/each}}
  </ShwGrid>

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionStates;
