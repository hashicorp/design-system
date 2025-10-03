/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';
import { eq } from 'ember-truth-helpers';

import ShwDivider from 'showcase/components/shw/divider';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import { HdsFormRadioCard } from '@hashicorp/design-system-components/components';

const STATES = ['default', 'hover', 'focus', 'disabled'];

const SubSectionBaseControl: TemplateOnlyComponent = <template>
  <ShwTextH2>"Base" control</ShwTextH2>

  <ShwTextH3>States</ShwTextH3>

  <ShwGrid @columns={{4}} as |SG|>
    {{#each STATES as |state|}}
      <SG.Item
        @label={{capitalize state}}
        mock-state-value={{unless (eq state "disabled") state}}
        mock-state-selector="label"
      >
        <HdsFormRadioCard @disabled={{eq state "disabled"}} as |R|>
          <R.Icon @name="hexagon" />
          <R.Label>Label</R.Label>
          <R.Description>Description</R.Description>
        </HdsFormRadioCard>
      </SG.Item>
    {{/each}}
    {{#each STATES as |state|}}
      <SG.Item
        @label="{{capitalize state}} selected"
        mock-state-value={{unless (eq state "disabled") state}}
        mock-state-selector="label"
      >
        <HdsFormRadioCard
          @checked={{true}}
          @disabled={{eq state "disabled"}}
          as |R|
        >
          <R.Icon @name="hexagon" />
          <R.Label>Label</R.Label>
          <R.Description>Description</R.Description>
        </HdsFormRadioCard>
      </SG.Item>
    {{/each}}
  </ShwGrid>

  <ShwDivider />
</template>;

export default SubSectionBaseControl;
