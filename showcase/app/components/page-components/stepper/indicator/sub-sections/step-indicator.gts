/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';

import ShwDivider from 'showcase/components/shw/divider';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import { HdsStepperStepIndicator } from '@hashicorp/design-system-components/components';

import { STATUSES } from '@hashicorp/design-system-components/components/hds/stepper/step/indicator';

const STATES = ['default', 'hover', 'active'];

const SubSectionStepIndicator: TemplateOnlyComponent = <template>
  <ShwTextH2>StepIndicator</ShwTextH2>

  <ShwTextH3>Default</ShwTextH3>

  <ShwGrid @columns={{6}} as |SG|>
    {{#each STATUSES as |status|}}
      <SG.Item @label={{capitalize status}}>
        <HdsStepperStepIndicator @status={{status}} @text="1" />
      </SG.Item>
    {{/each}}
  </ShwGrid>

  <ShwTextH3>Interactive</ShwTextH3>

  <ShwGrid @columns={{6}} as |SG|>
    {{#each STATUSES as |status|}}
      {{#each STATES as |state|}}
        <SG.Item @label="{{capitalize status}}/{{state}}">
          <HdsStepperStepIndicator
            @status={{status}}
            @text="1"
            @isInteractive={{true}}
            mock-state-value={{state}}
          />
        </SG.Item>
      {{/each}}
      <SG.Item />
      <SG.Item />
      <SG.Item />
    {{/each}}
  </ShwGrid>

  <ShwDivider />
</template>;

export default SubSectionStepIndicator;
