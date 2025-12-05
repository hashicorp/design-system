/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import { HdsBadgeCount } from '@hashicorp/design-system-components/components';

const SubSectionContent: TemplateOnlyComponent = <template>
  <ShwTextH2>Content</ShwTextH2>

  <ShwFlex as |SF|>
    <SF.Item>
      <HdsBadgeCount @text="3" />
    </SF.Item>
    <SF.Item>
      <HdsBadgeCount @text="99+" />
    </SF.Item>
    <SF.Item>
      <HdsBadgeCount @text="v1.2.3" />
    </SF.Item>
  </ShwFlex>
  <ShwFlex as |SF|>
    <SF.Item>
      <p>This is a paragraph: <HdsBadgeCount @text="3" /></p>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionContent;
