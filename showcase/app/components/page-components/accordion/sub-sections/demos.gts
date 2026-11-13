/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwGrid from 'showcase/components/shw/grid';
import ShwDivider from 'showcase/components/shw/divider';

import {
  HdsAccordion,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

const SubSectionDemos: TemplateOnlyComponent = <template>
  <ShwTextH2>Demos</ShwTextH2>

  <ShwTextH3>Force state</ShwTextH3>
  <ShwGrid @columns={{2}} as |SG|>
    <SG.Item @label="Open all items">
      <HdsAccordion @forceState="open" as |A|>
        <A.Item>
          <:toggle>Database settings</:toggle>
          <:content>The settings are visible on initial render.</:content>
        </A.Item>
        <A.Item>
          <:toggle>Network settings</:toggle>
          <:content>The settings are visible on initial render.</:content>
        </A.Item>
      </HdsAccordion>
    </SG.Item>
    <SG.Item @label="All items closed">
      <HdsAccordion @forceState="close" as |A|>
        <A.Item>
          <:toggle>Database settings</:toggle>
          <:content>The settings are hidden on initial render.</:content>
        </A.Item>
      </HdsAccordion>
    </SG.Item>
  </ShwGrid>

  <ShwTextH3>Item options</ShwTextH3>
  <ShwGrid @columns={{2}} as |SG|>
    <SG.Item @label="Open initially">
      <HdsAccordion as |A|>
        <A.Item @isOpen={{true}}>
          <:toggle>Open when rendered</:toggle>
          <:content>This item starts open and remains interactive.</:content>
        </A.Item>
      </HdsAccordion>
    </SG.Item>
    <SG.Item @label="Static content">
      <HdsAccordion as |A|>
        <A.Item @isStatic={{true}} @isOpen={{true}}>
          <:toggle>Static section</:toggle>
          <:content>This content is shown without an interactive toggle.</:content>
        </A.Item>
      </HdsAccordion>
    </SG.Item>
    <SG.Item @label="Interactive title link">
      <HdsAccordion as |A|>
        <A.Item @containsInteractive={{true}}>
          <:toggle>
            Service endpoint
            <HdsLinkInline @href="#service-endpoint-details">
              API reference
            </HdsLinkInline>
          </:toggle>
          <:content>
            <p id="service-endpoint-details">
              The title link and chevron button are independently interactive.
            </p>
          </:content>
        </A.Item>
      </HdsAccordion>
    </SG.Item>
    <SG.Item @label="Custom accessible name">
      <HdsAccordion as |A|>
        <A.Item @ariaLabel="Toggle production environment details">
          <:toggle>Production environment</:toggle>
          <:content>Details for the production environment.</:content>
        </A.Item>
      </HdsAccordion>
      <ShwTextBody>
        The toggle's accessible name is provided by
        <code>@ariaLabel</code>
        instead of the visible title.
      </ShwTextBody>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionDemos;
