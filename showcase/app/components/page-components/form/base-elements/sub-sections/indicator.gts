/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import { HdsFormIndicator } from '@hashicorp/design-system-components/components';

const SubSectionBaseIndicator: TemplateOnlyComponent = <template>
  <ShwTextH2>Indicator</ShwTextH2>

  <ShwFlex as |SF|>
    <SF.Item @label="isRequired">
      <HdsFormIndicator @isRequired={{true}} />
    </SF.Item>
    <SF.Item @label="isOptional">
      <HdsFormIndicator @isOptional={{true}} />
    </SF.Item>
    <SF.Item @label="No arguments">
      <HdsFormIndicator />
    </SF.Item>
  </ShwFlex>

  <ShwDivider />
</template>;

export default SubSectionBaseIndicator;
