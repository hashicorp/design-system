/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwGrid from 'showcase/components/shw/grid';
import ShwDivider from 'showcase/components/shw/divider';

import { HdsAccordion } from '@hashicorp/design-system-components/components';

const SubSectionContent: TemplateOnlyComponent = <template>
  <ShwTextH2>Content</ShwTextH2>

  <ShwGrid @columns={{2}} as |SG|>
    <SG.Item @label="Card (default)">
      <HdsAccordion as |A|>
        <A.Item>
          <:toggle>Account settings</:toggle>
          <:content>
            Manage your account preferences, notifications, and security
            settings.
          </:content>
        </A.Item>
        <A.Item>
          <:toggle>Billing details</:toggle>
          <:content>
            Review invoices and update the payment method for this account.
          </:content>
        </A.Item>
      </HdsAccordion>
    </SG.Item>

    <SG.Item @label="Flush">
      <HdsAccordion @type="flush" as |A|>
        <A.Item>
          <:toggle>Deployment configuration</:toggle>
          <:content>
            <p>
              Configure the deployment region and runtime options for this
              service.
            </p>
          </:content>
        </A.Item>
        <A.Item>
          <:toggle>Access control</:toggle>
          <:content>
            Choose which teams can view and manage this service.
          </:content>
        </A.Item>
      </HdsAccordion>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionContent;
