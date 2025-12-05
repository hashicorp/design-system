/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';
import ShwPlaceholder from 'showcase/components/shw/placeholder';

const SubSectionVariants: TemplateOnlyComponent = <template>
  <ShwTextH2>Color variants</ShwTextH2>

  <ShwFlex as |SF|>
    <SF.Item @label="action">
      <div class="hds-focus-ring-action-box-shadow">
        <ShwPlaceholder
          @text="with border radius"
          @width="100"
          @height="100"
          @background="transparent"
        />
      </div>
    </SF.Item>
    <SF.Item @label="critical">
      <div class="hds-focus-ring-critical-box-shadow">
        <ShwPlaceholder
          @text="with border radius"
          @width="100"
          @height="100"
          @background="transparent"
        />
      </div>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionVariants;
