/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';
import { capitalize } from '@ember/string';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import NOOP from 'showcase/utils/noop';

import { HdsTag } from '@hashicorp/design-system-components/components';

// these are used only for presentation purpose in the showcase
const STATES = ['default', 'hover', 'active', 'focus'];

const SubSectionStates: TemplateOnlyComponent = <template>
  <ShwTextH2>States</ShwTextH2>

  <ShwGrid @columns={{4}} {{style width="max-content"}} as |SG|>
    {{#each STATES as |state|}}
      <SG.Item @label={{capitalize state}}>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <HdsTag
              @text="My link tag"
              @href="#"
              mock-state-value={{state}}
              mock-state-selector="a"
            />
          </SF.Item>
          <SF.Item>
            <HdsTag
              @href="#"
              @text="My link tag"
              @onDismiss={{NOOP}}
              mock-state-value={{state}}
              mock-state-selector="button"
            />
          </SF.Item>
          <SF.Item>
            <HdsTag
              @href="#"
              @text="My link tag"
              @onDismiss={{NOOP}}
              mock-state-value={{state}}
              mock-state-selector="a"
            />
          </SF.Item>
          <SF.Item>
            <HdsTag
              @href="#"
              @text="My link tag"
              @onDismiss={{NOOP}}
              mock-state-value={{state}}
              mock-state-selector="a, button"
            />
          </SF.Item>
          <SF.Item>
            <HdsTag
              @text="This is a very long text that should go on multiple lines"
              @tooltipPlacement="bottom"
              mock-state-value={{state}}
              mock-state-selector="button"
              mock-state-delay="200"
            />
          </SF.Item>
          <SF.Item>
            <HdsTag
              @text="This is a very long text that should go on multiple lines"
              @tooltipPlacement="bottom"
              @onDismiss={{NOOP}}
              mock-state-value={{state}}
              mock-state-selector=".hds-tooltip-button"
              mock-state-delay="200"
            />
          </SF.Item>
          <SF.Item>
            <HdsTag
              @text="This is a very long text that should go on multiple lines"
              @tooltipPlacement="bottom"
              @onDismiss={{NOOP}}
              mock-state-value={{state}}
              mock-state-selector=".hds-tag__dismiss, .hds-tooltip-button"
              mock-state-delay="200"
            />
          </SF.Item>
        </ShwFlex>
      </SG.Item>
    {{/each}}
  </ShwGrid>

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionStates;
