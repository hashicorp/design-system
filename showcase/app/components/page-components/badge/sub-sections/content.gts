/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import { HdsBadge } from '@hashicorp/design-system-components/components';

const SubSectionContent: TemplateOnlyComponent = <template>
  <ShwTextH2>Content</ShwTextH2>

  <ShwFlex as |SF|>
    <SF.Item>
      <HdsBadge @text="Only text" />
    </SF.Item>
    <SF.Item>
      <HdsBadge @icon="activity" @text="Text + icon" />
    </SF.Item>
    <SF.Item>
      <HdsBadge @icon="activity" @text="Only icon" @isIconOnly={{true}} />
    </SF.Item>
    <SF.Item {{style width="200px"}}>
      <HdsBadge
        @icon="activity"
        @text="This is a very long text that should go on two lines"
      />
    </SF.Item>
  </ShwFlex>
  <ShwFlex as |SF|>
    <SF.Item>
      <p>This is a paragraph:
        <HdsBadge @icon="activity" @text="Lorem ipsum" /></p>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionContent;
