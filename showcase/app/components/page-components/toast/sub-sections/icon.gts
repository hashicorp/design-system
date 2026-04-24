/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';
import NOOP from 'showcase/utils/noop';

import { HdsToast } from '@hashicorp/design-system-components/components';

const SubSectionIcon: TemplateOnlyComponent = <template>
  <ShwTextH2>Icon</ShwTextH2>

  <ShwFlex as |SF|>
    <SF.Item>
      <HdsToast @color="highlight" @onDismiss={{NOOP}} as |T|>
        <T.Title>Default icon</T.Title>
        <T.Description>Lorem ipsum dolor sit amet.</T.Description>
      </HdsToast>
    </SF.Item>
    <SF.Item>
      <HdsToast @color="highlight" @icon="meh" @onDismiss={{NOOP}} as |T|>
        <T.Title>With icon override</T.Title>
        <T.Description>Lorem ipsum dolor sit amet.</T.Description>
      </HdsToast>
    </SF.Item>
    <SF.Item>
      <HdsToast @color="highlight" @icon="running" @onDismiss={{NOOP}} as |T|>
        <T.Title>With animated icon</T.Title>
        <T.Description>Lorem ipsum dolor sit amet.</T.Description>
      </HdsToast>
    </SF.Item>
    <SF.Item>
      <HdsToast @color="highlight" @icon={{false}} @onDismiss={{NOOP}} as |T|>
        <T.Title>Without icon</T.Title>
        <T.Description>Lorem ipsum dolor sit amet.</T.Description>
      </HdsToast>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionIcon;
