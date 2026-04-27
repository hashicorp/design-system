/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import {
  HdsCdsBadge,
  HdsIcon,
} from '@hashicorp/design-system-components/components';

const SubSectionContent: TemplateOnlyComponent = <template>
  <ShwTextH2>Content</ShwTextH2>

  <ShwFlex as |SF|>
    <SF.Item>
      <HdsCdsBadge>Only text</HdsCdsBadge>
    </SF.Item>
    <SF.Item>
      <HdsCdsBadge>
        <HdsIcon @name="activity" @isInline={{true}} slot="icon" />
        Text + icon
      </HdsCdsBadge>
    </SF.Item>
    {{! <SF.Item>
      <HdsCdsBadge>
        <HdsIcon @name="activity" aria-label="Only icon" slot="icon" />
      </HdsCdsBadge>
    </SF.Item> }}
    <SF.Item {{style width="200px"}}>
      <HdsCdsBadge>
        <HdsIcon @name="activity" @isInline={{true}} slot="icon" />
        This is a very long text that should go on two lines
      </HdsCdsBadge>
    </SF.Item>
  </ShwFlex>
  <ShwFlex as |SF|>
    <SF.Item>
      <p>This is a paragraph:
        <HdsCdsBadge>
          <HdsIcon @name="activity" @isInline={{true}} slot="icon" />
          Lorem ipsum
        </HdsCdsBadge>
      </p>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionContent;
