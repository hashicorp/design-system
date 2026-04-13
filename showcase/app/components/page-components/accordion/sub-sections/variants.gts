/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';
import { lt } from 'ember-truth-helpers';

import ShwDivider from 'showcase/components/shw/divider';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import {
  SIZES,
  TYPES,
} from '@hashicorp/design-system-components/components/hds/accordion/types';

import CodeFragmentWithPlaceholderContent from '../code-fragments/with-placeholder-content';
import CodeFragmentWithToggleVariants from '../code-fragments/with-toggle-variants';

const SubSectionVariants: TemplateOnlyComponent = <template>
  <ShwTextH2>Type</ShwTextH2>

  {{#each TYPES as |type index|}}
    <ShwTextH3>{{capitalize type}}</ShwTextH3>

    <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
      <SG.Item @label="One item">
        <CodeFragmentWithPlaceholderContent @type={{type}} />
      </SG.Item>

      <SG.Item @label="Multiple items">
        <CodeFragmentWithToggleVariants @type={{type}} />
      </SG.Item>
    </ShwGrid>

    {{#if (lt index 1)}}
      <ShwDivider @level={{2}} />
    {{/if}}
  {{/each}}

  <ShwDivider />

  <ShwTextH2>Size</ShwTextH2>

  {{#each SIZES as |size index|}}
    <ShwTextH3>{{capitalize size}}</ShwTextH3>

    <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
      {{#each TYPES as |type|}}
        <SG.Item @label={{type}}>
          <CodeFragmentWithToggleVariants @size={{size}} @type={{type}} />
        </SG.Item>
      {{/each}}
    </ShwGrid>

    {{#if (lt index 2)}}
      <ShwDivider @level={{2}} />
    {{/if}}
  {{/each}}

  <ShwDivider />
</template>;

export default SubSectionVariants;
