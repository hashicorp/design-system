/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';
import { capitalize } from '@ember/string';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';
import ShwGrid from 'showcase/components/shw/grid';
import NOOP from 'showcase/utils/noop';

import { HdsTag } from '@hashicorp/design-system-components/components';
import { COLORS } from '@hashicorp/design-system-components/components/hds/tag/index';

// these are used only for presentation purpose in the showcase
const STATES = ['default', 'hover', 'active', 'focus'];

const SubSectionLinkColors: TemplateOnlyComponent = <template>
  <ShwTextH2>Link Colors</ShwTextH2>

  {{#each COLORS as |color|}}
    <ShwTextH3>{{capitalize color}}</ShwTextH3>
    <ShwGrid @columns={{4}} {{style width="max-content"}} as |SG|>
      {{#each STATES as |state|}}
        <SG.Item @label={{capitalize state}}>
          <ShwFlex @direction="column" as |SF|>
            <SF.Item>
              <HdsTag
                @color={{color}}
                @text="My link tag"
                @onDismiss={{NOOP}}
                @route="page-components.tag"
                mock-state-value={{state}}
                mock-state-selector="button"
              />
            </SF.Item>
            <SF.Item>
              <HdsTag
                @color={{color}}
                @text="My link tag"
                @onDismiss={{NOOP}}
                @route="page-components.tag"
                mock-state-value={{state}}
                mock-state-selector="a"
              />
            </SF.Item>
            <SF.Item>
              <HdsTag
                @color={{color}}
                @text="My link tag"
                @route="page-components.tag"
                mock-state-value={{state}}
                mock-state-selector="a"
              />
            </SF.Item>
          </ShwFlex>
        </SG.Item>
      {{/each}}
    </ShwGrid>
  {{/each}}

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionLinkColors;
