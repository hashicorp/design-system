/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';

import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import { HdsBadge } from '@hashicorp/design-system-components/components';
import {
  COLORS,
  SIZES,
  TYPES,
} from '@hashicorp/design-system-components/components/hds/badge/index';

const SubSectionUseCds: TemplateOnlyComponent = <template>
  <ShwTextH2>useCds</ShwTextH2>

  <p class="hds-typography-body-200">When
    <code>@useCds</code>
    is true, the badge renders as a Carbon
    <code>cds-tag</code>
    web component instead of the native HDS markup.</p>

  <ShwTextH3>HDS vs Carbon (default)</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item @label="HDS (default)">
      <HdsBadge @icon="activity" @text="Lorem ipsum" />
    </SF.Item>
    <SF.Item @label="useCds=true">
      <HdsBadge @icon="activity" @text="Lorem ipsum" @useCds={{true}} />
    </SF.Item>
  </ShwFlex>

  <ShwTextH3>useCds across sizes</ShwTextH3>

  <ShwFlex as |SF|>
    {{#each SIZES as |size|}}
      <SF.Item @label={{capitalize size}}>
        <HdsBadge
          @icon="activity"
          @text="Lorem ipsum"
          @size={{size}}
          @useCds={{true}}
        />
      </SF.Item>
    {{/each}}
  </ShwFlex>

  <ShwTextH3>useCds across types</ShwTextH3>

  <ShwFlex as |SF|>
    {{#each TYPES as |type|}}
      <SF.Item @label={{capitalize type}}>
        <HdsBadge
          @icon="activity"
          @text="Lorem ipsum"
          @type={{type}}
          @useCds={{true}}
        />
      </SF.Item>
    {{/each}}
  </ShwFlex>

  <ShwTextH3>useCds across colors</ShwTextH3>

  <ShwGrid @columns={{4}} as |SG|>
    {{#each COLORS as |color|}}
      <SG.Item @label={{capitalize color}}>
        <HdsBadge
          @icon="activity"
          @text="Lorem ipsum"
          @color={{color}}
          @useCds={{true}}
        />
      </SG.Item>
    {{/each}}
  </ShwGrid>
</template>;

export default SubSectionUseCds;
