/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';
import { capitalize } from '@ember/string';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwGrid from 'showcase/components/shw/grid';

import { HdsLinkInline } from '@hashicorp/design-system-components/components';
import { COLORS } from '@hashicorp/design-system-components/components/hds/link/inline';

const STATES = ['default', 'hover', 'active', 'focus'];

const SubSectionStates: TemplateOnlyComponent = <template>
  <ShwTextH2>States</ShwTextH2>

  {{#each COLORS as |color|}}
    <ShwTextH3>{{capitalize color}}</ShwTextH3>
    <ShwGrid @columns={{4}} {{style width="fit-content"}} as |SG|>
      {{#each STATES as |state|}}
        <SG.Item
          @label="{{capitalize state}}"
          class="shw-component-link-inline-state-samples"
        >
          <div class="hds-typography-body-300">Lorem
            <HdsLinkInline
              @color={{color}}
              @href="/components/link/inline"
              mock-state-value={{state}}
            >ipsum dolor</HdsLinkInline>
            sit amet
          </div>
          <div class="hds-typography-body-300">Lorem
            <HdsLinkInline
              @color={{color}}
              @href="/components/link/inline"
              @icon="external-link"
              @iconPosition="trailing"
              mock-state-value={{state}}
            >ipsum dolor</HdsLinkInline>
            sit amet
          </div>
        </SG.Item>
      {{/each}}
    </ShwGrid>
  {{/each}}
</template>;

export default SubSectionStates;
