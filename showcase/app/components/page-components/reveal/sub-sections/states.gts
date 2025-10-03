/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';

import { HdsRevealToggleButton } from '@hashicorp/design-system-components/components';

const STATES = ['default', 'hover', 'active', 'focus'];

const SubSectionStates: TemplateOnlyComponent = <template>
  <ShwTextH2>States</ShwTextH2>
  <ShwTextBody>(<strong>Note:</strong>
    buttons below are inactive)</ShwTextBody>

  <ShwFlex @gap="5rem" as |SF|>
    {{#each STATES as |state|}}
      <SF.Item @label={{state}}>
        <HdsRevealToggleButton
          @text="More options"
          mock-state-value={{state}}
        />
      </SF.Item>
    {{/each}}
  </ShwFlex>

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionStates;
