/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';

import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import {
  HdsCdsBadge,
  HdsIcon,
} from '@hashicorp/design-system-components/components';

import {
  CDS_BADGE_SIZE_OPTIONS,
  CDS_BADGE_TYPE_OPTIONS,
} from '@hashicorp/design-system-components/components/hds/cds-badge/index';

const SubSectionVariants: TemplateOnlyComponent = <template>
  <ShwTextH2>Size</ShwTextH2>

  <ShwFlex as |SF|>
    {{#each CDS_BADGE_SIZE_OPTIONS as |size|}}
      <SF.Item @label={{capitalize size}}>
        <HdsCdsBadge size={{size}}>
          <HdsIcon @name="activity" @isInline={{true}} slot="icon" />
          Lorem ipsum
        </HdsCdsBadge>
      </SF.Item>
    {{/each}}
  </ShwFlex>

  {{!-- <ShwTextH2>Type</ShwTextH2>

  <ShwFlex as |SF|>
    {{#each TYPES as |type|}}
      <SF.Item @label={{capitalize type}}>
        <HdsBadge @icon="activity" @text="Lorem ipsum" @type={{type}} />
      </SF.Item>
    {{/each}}
  </ShwFlex> --}}

  <ShwTextH2>Color</ShwTextH2>

  <ShwGrid @columns={{5}} as |SG|>
    {{!-- {{#each CDS_BADGE_SIZE_OPTIONS as |size|}} --}}
    {{!-- {{#each TYPES as |type|}} --}}
    {{#each CDS_BADGE_TYPE_OPTIONS as |color|}}
      <SG.Item>
        <HdsCdsBadge @type={{color}}>
          <HdsIcon @name="activity" @isInline={{true}} slot="icon" />
          Lorem ipsum
        </HdsCdsBadge>

        {{!-- <HdsCdsBadge @size={{size}} @type={{color}}>
            Lorem ipsum
          </HdsCdsBadge> --}}

        {{!-- <HdsCdsBadge @size={{size}} @type={{color}}>
            <HdsIcon
              @name="activity"
              @isInline={{true}}
              aria-label="Lorem ipsum"
              slot="icon"
            />
          </HdsCdsBadge> --}}
      </SG.Item>
    {{/each}}
    {{!-- {{/each}} --}}
    {{!-- {{/each}} --}}
  </ShwGrid>
</template>;

export default SubSectionVariants;
