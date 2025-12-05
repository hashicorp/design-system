/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import { HdsButton } from '@hashicorp/design-system-components/components';

const SubSectionDisplay: TemplateOnlyComponent = <template>
  <ShwTextH2>Display</ShwTextH2>

  <ShwFlex as |SF|>
    <SF.Item @label="Block">
      <div class="shw-component-button-display-sample">
        <HdsButton @text="Block" @icon="plus" />
        <HdsButton @text="Block" @icon="plus" />
      </div>
    </SF.Item>
    <SF.Item @label="Inline">
      <div class="shw-component-button-display-sample">
        <HdsButton @text="Inline" @icon="plus" @isInline={{true}} />
        <HdsButton @text="Inline" @icon="plus" @isInline={{true}} />
      </div>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionDisplay;
