/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';

import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import { HdsStepperTaskIndicator } from '@hashicorp/design-system-components/components';

import { STATUSES } from '@hashicorp/design-system-components/components/hds/stepper/task/indicator';

const STATES = ['default', 'hover', 'active'];

const SubSectionTaskIndicator: TemplateOnlyComponent = <template>
  <ShwTextH2>TaskIndicator</ShwTextH2>

  <ShwTextH3>Default</ShwTextH3>

  <ShwGrid @columns={{6}} as |SG|>
    {{#each STATUSES as |status|}}
      <SG.Item @label={{capitalize status}}>
        <HdsStepperTaskIndicator @status={{status}} />
      </SG.Item>
    {{/each}}
  </ShwGrid>

  <ShwTextH3>Interactive</ShwTextH3>

  <ShwGrid @columns={{6}} as |SG|>
    {{#each STATUSES as |status|}}
      {{#each STATES as |state|}}
        <SG.Item @label="{{capitalize status}}/{{state}}">
          <HdsStepperTaskIndicator
            @status={{status}}
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
</template>;

export default SubSectionTaskIndicator;
