/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';
import style from 'ember-style-modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwGrid from 'showcase/components/shw/grid';

import { HdsLinkStandalone } from '@hashicorp/design-system-components/components';
import {
  COLORS,
  SIZES,
} from '@hashicorp/design-system-components/components/hds/link/standalone';

const STATES = ['default', 'hover', 'active', 'focus'];

const SubSectionStates: TemplateOnlyComponent = <template>
  <ShwTextH2>States</ShwTextH2>

  {{#each COLORS as |color|}}
    <ShwTextH3>{{capitalize color}}</ShwTextH3>
    <ShwGrid @columns={{4}} {{style width="fit-content"}} as |SG|>
      {{#each SIZES as |size|}}
        {{#each STATES as |state|}}
          <SG.Item @label="{{capitalize size}}/{{capitalize state}}">
            <HdsLinkStandalone
              @icon="plus"
              @text="Lorem ipsum"
              @size={{size}}
              @color={{color}}
              @href="../components/link"
              mock-state-value={{state}}
            />
          </SG.Item>
        {{/each}}
      {{/each}}
    </ShwGrid>
  {{/each}}
</template>;

export default SubSectionStates;
