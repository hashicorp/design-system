/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';
import NOOP from 'showcase/utils/noop';

import { HdsToast } from '@hashicorp/design-system-components/components';

const SubSectionActions: TemplateOnlyComponent = <template>
  <ShwTextH2>Actions</ShwTextH2>

  <ShwFlex as |SF|>
    <SF.Item>
      <HdsToast @color="warning" @onDismiss={{NOOP}} as |T|>
        <T.Title>Action passed as yielded component</T.Title>
        <T.Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</T.Description>
        <T.Button @text="Action" @color="secondary" />
      </HdsToast>
    </SF.Item>
    <SF.Item>
      <HdsToast @color="warning" @onDismiss={{NOOP}} as |T|>
        <T.Title>With multiple actions passed as yielded components</T.Title>
        <T.Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</T.Description>
        <T.Button @text="Secondary" @color="secondary" />
        <T.Button @icon="plus" @text="Tertiary" @color="tertiary" />
        <T.LinkStandalone
          @icon="plus"
          @text="Standalone"
          @href="#"
          @color="secondary"
        />
      </HdsToast>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionActions;
