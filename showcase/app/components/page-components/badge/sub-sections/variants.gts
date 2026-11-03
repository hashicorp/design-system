/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';

import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import { HdsBadge } from '@hashicorp/design-system-components/components';
import {
  COLORS,
  SIZES,
  TYPES,
} from '@hashicorp/design-system-components/components/hds/badge/index';

const SubSectionVariants: TemplateOnlyComponent = <template>
  <ShwTextH2>Size</ShwTextH2>

  <ShwFlex as |SF|>
    {{#each SIZES as |size|}}
      <SF.Item @label={{capitalize size}}>
        <HdsBadge @text="Lorem ipsum" @icon="activity" @size={{size}} />
      </SF.Item>
    {{/each}}
  </ShwFlex>

  <ShwTextH2>Type</ShwTextH2>

  <ShwFlex as |SF|>
    {{#each TYPES as |type|}}
      <SF.Item @label={{capitalize type}}>
        <HdsBadge @text="Lorem ipsum" @type={{type}} />
      </SF.Item>
    {{/each}}
  </ShwFlex>

  <ShwTextH2>Color</ShwTextH2>

  {{#each COLORS as |color|}}
    <ShwGrid @label={{capitalize color}} @columns={{3}} as |SG|>
      {{#each TYPES as |type|}}
        <SG.Item class="shw-component-badge-sample-color--{{color}}">
          <HdsBadge @text={{capitalize type}} @type={{type}} @color={{color}} />
        </SG.Item>
      {{/each}}
    </ShwGrid>
  {{/each}}
</template>;

export default SubSectionVariants;
