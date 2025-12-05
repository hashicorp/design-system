/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwGrid from 'showcase/components/shw/grid';

import { HdsAlert } from '@hashicorp/design-system-components/components';

const SubSectionActions: TemplateOnlyComponent = <template>
  <ShwTextH2>Actions</ShwTextH2>

  <ShwGrid @columns={{2}} as |SG|>
    <SG.Item>
      <HdsAlert @type="inline" @color="warning" as |A|>
        <A.Title>Action passed as yielded component</A.Title>
        <A.Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</A.Description>
        <A.Button @text="Action" @color="secondary" />
      </HdsAlert>
    </SG.Item>

    <SG.Item>
      <HdsAlert @type="inline" @color="warning" as |A|>
        <A.Title>With multiple actions passed as yielded components</A.Title>
        <A.Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</A.Description>
        <A.Button @text="Secondary" @color="secondary" />
        <A.Button @icon="plus" @text="Tertiary" @color="tertiary" />
        <A.LinkStandalone
          @icon="plus"
          @text="Standalone"
          @href="#"
          @color="secondary"
        />
      </HdsAlert>
    </SG.Item>

    <SG.Item>
      <HdsAlert @type="inline" @color="warning" as |A|>
        <A.Title>With actions and custom content</A.Title>
        <A.Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</A.Description>
        <A.Button @text="Action" @color="secondary" />
        <A.LinkStandalone
          @icon="plus"
          @text="Action"
          @href="#"
          @color="secondary"
        />
        <A.Generic>
          <div
            class="shw-component-alert-sample-custom-content-after-actions"
          >This for example could be extra text, specific for a special use
            case.</div>
        </A.Generic>
      </HdsAlert>
    </SG.Item>
  </ShwGrid>
</template>;

export default SubSectionActions;
