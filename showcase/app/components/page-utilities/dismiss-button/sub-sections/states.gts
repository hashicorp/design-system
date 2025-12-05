/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';
import style from 'ember-style-modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwGrid from 'showcase/components/shw/grid';

import { HdsDismissButton } from '@hashicorp/design-system-components/components';

const STATES = ['default', 'hover', 'active', 'focus'];

const SubSectionStates: TemplateOnlyComponent = <template>
  <ShwTextH2>States</ShwTextH2>

  <ShwGrid @columns={{4}} {{style width="fit-content"}} as |SG|>
    {{#each STATES as |state|}}
      <SG.Item
        @label={{capitalize state}}
        class="shw-utility-dismiss-button-sample-state"
      >
        <HdsDismissButton mock-state-value={{state}} />
      </SG.Item>
    {{/each}}
  </ShwGrid>
</template>;

export default SubSectionStates;
