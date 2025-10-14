/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';
import { capitalize } from '@ember/string';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwDivider from 'showcase/components/shw/divider';
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
        <HdsTag
          @text="My tag"
          @onDismiss={{NOOP}}
          mock-state-value={{state}}
          mock-state-selector="button"
        />
      </SG.Item>
    {{/each}}
  </ShwGrid>

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionStates;
