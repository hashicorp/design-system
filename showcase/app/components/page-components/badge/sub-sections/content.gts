/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import { HdsBadge } from '@hashicorp/design-system-components/components';

const SubSectionContent: TemplateOnlyComponent = <template>
  <ShwTextH2>Content</ShwTextH2>

  <ShwFlex as |SF|>
    <SF.Item @label="Text">
      <HdsBadge @text="In progress" />
    </SF.Item>
    <SF.Item @label="Numeric text">
      <HdsBadge @text={{3}} />
    </SF.Item>
    <SF.Item @label="With icon">
      <HdsBadge @text="Active" @icon="check" />
    </SF.Item>
    <SF.Item @label="Icon only">
      <HdsBadge @text="Active" @icon="check" @isIconOnly={{true}} />
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionContent;
