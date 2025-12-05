/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwFlex from 'showcase/components/shw/flex';
import ShwOutliner from 'showcase/components/shw/outliner';

import { HdsSeparator } from '@hashicorp/design-system-components/components';

const SubSectionVariants: TemplateOnlyComponent = <template>
  <ShwFlex @direction="column" as |SF|>
    <SF.Item @label="Default (24px)">
      <ShwOutliner class="shw-component-separator-container">
        <HdsSeparator />
      </ShwOutliner>
    </SF.Item>
    <SF.Item @label="No spacing (0px)">
      <ShwOutliner class="shw-component-separator-container">
        <HdsSeparator @spacing="0" />
      </ShwOutliner>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionVariants;
