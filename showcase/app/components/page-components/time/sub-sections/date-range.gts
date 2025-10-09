/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';

import { HdsTime } from '@hashicorp/design-system-components/components';

const SubSectionDateRange: TemplateOnlyComponent = <template>
  <ShwTextH2>Date range</ShwTextH2>

  <ShwFlex @gap="4rem 9rem" {{style marginBottom="80px"}} as |SF|>
    <SF.Item @label="With tooltip & same year range">
      <HdsTime
        @startDate="20 September 2024"
        @endDate="25 September 2024"
        @isOpen={{true}}
      />
    </SF.Item>

    <SF.Item @label="With different year range & no tooltip">
      <HdsTime
        @startDate="8 November 2024"
        @endDate="20 January 2025"
        @hasTooltip={{false}}
      />
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionDateRange;
