/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import { HdsBadge } from '@hashicorp/design-system-components/components';

const SubSectionContent: TemplateOnlyComponent = <template>
  <ShwTextH2>Content</ShwTextH2>

  <ShwFlex as |SF|>
    <SF.Item>
      <HdsBadge @text="Neutral badge" />
    </SF.Item>
    <SF.Item>
      <HdsBadge @text="Terraform" @icon="terraform" />
    </SF.Item>
    <SF.Item>
      <HdsBadge @text="Terraform" @icon="terraform" @isIconOnly={{true}} />
    </SF.Item>
  </ShwFlex>

  <ShwFlex as |SF|>
    <SF.Item>
      <p>This is a paragraph: <HdsBadge @text="Inline badge" /></p>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionContent;
