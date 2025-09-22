/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';
import style from 'ember-style-modifier/modifiers/style';

import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import { HdsBadgeCount } from '@hashicorp/design-system-components/components';
import {
  COLORS,
  SIZES,
  TYPES,
} from '@hashicorp/design-system-components/components/hds/badge-count/index';

const SubSectionVariants: TemplateOnlyComponent = <template>
  <ShwTextH2>Size</ShwTextH2>

  <ShwFlex as |SF|>
    {{#each SIZES as |size|}}
      <SF.Item @label={{capitalize size}}>
        <HdsBadgeCount @text="Lorem ipsum" @size={{size}} />
      </SF.Item>
    {{/each}}
  </ShwFlex>

  <ShwTextH2>Type</ShwTextH2>

  <ShwFlex as |SF|>
    {{#each TYPES as |type|}}
      <SF.Item @label={{capitalize type}}>
        <HdsBadgeCount @text="Lorem ipsum" @type={{type}} />
      </SF.Item>
    {{/each}}
  </ShwFlex>

  <ShwTextH2>Color</ShwTextH2>

  {{#each COLORS as |color|}}
    <ShwGrid
      @label={{capitalize color}}
      @columns={{3}}
      {{style width="fit-content"}}
      as |SG|
    >
      {{#each SIZES as |size|}}
        {{#each TYPES as |type|}}
          <SG.Item class="shw-component-badge-sample-color--{{color}}">
            <HdsBadgeCount
              @text="3"
              @size={{size}}
              @type={{type}}
              @color={{color}}
            />
          </SG.Item>
        {{/each}}
      {{/each}}
    </ShwGrid>
  {{/each}}
</template>;

export default SubSectionVariants;
