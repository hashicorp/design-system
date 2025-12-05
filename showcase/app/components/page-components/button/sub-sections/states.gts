/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';
import { eq, notEq } from 'ember-truth-helpers';

import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import { HdsButton } from '@hashicorp/design-system-components/components';
import {
  COLORS,
  SIZES,
} from '@hashicorp/design-system-components/components/hds/button/index';

// these are used only for presentation purpose in the showcase
const STATES = ['default', 'hover', 'active', 'focus', 'disabled'];

const SubSectionStates: TemplateOnlyComponent = <template>
  <ShwTextH2>States</ShwTextH2>

  {{#each COLORS as |color|}}
    <ShwTextH3>{{capitalize color}}</ShwTextH3>
    <ShwGrid @columns={{5}} as |SG|>
      {{#each SIZES as |size|}}
        {{#each STATES as |state|}}
          <SG.Item @label="{{capitalize size}} / {{capitalize state}}">
            {{#if (eq state "disabled")}}
              <HdsButton
                @icon="plus"
                @text="Lorem"
                @size={{size}}
                @color={{color}}
                disabled
              />
            {{else}}
              <HdsButton
                @icon="plus"
                @text="Lorem"
                @size={{size}}
                @color={{color}}
                mock-state-value={{state}}
              />
            {{/if}}
          </SG.Item>
        {{/each}}
      {{/each}}
      {{#if (notEq color "tertiary")}}
        {{#each STATES as |state|}}
          <SG.Item @label="Full width / {{capitalize state}}">
            {{#if (eq state "disabled")}}
              <HdsButton
                @icon="plus"
                @text="Lorem"
                @color={{color}}
                @isFullWidth={{true}}
                disabled
              />
            {{else}}
              <HdsButton
                @icon="plus"
                @text="Lorem"
                @color={{color}}
                @isFullWidth={{true}}
                mock-state-value={{state}}
              />
            {{/if}}
          </SG.Item>
        {{/each}}
      {{/if}}
    </ShwGrid>
  {{/each}}
</template>;

export default SubSectionStates;
