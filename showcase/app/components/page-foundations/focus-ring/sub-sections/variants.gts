/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwFlex from 'showcase/components/shw/flex';
import ShwPlaceholder from 'showcase/components/shw/placeholder';

const SubSectionVariants: TemplateOnlyComponent = <template>
  <ShwTextH4 @tag="h2">Color variants</ShwTextH4>

  <ShwFlex as |SF|>
    <SF.Item @label="action">
      <div class="hds-focus-ring-box-shadow-action">
        <ShwPlaceholder
          @text="with border radius"
          @width="100"
          @height="100"
          @background="transparent"
        />
      </div>
    </SF.Item>
    <SF.Item @label="critical">
      <div class="hds-focus-ring-box-shadow-critical">
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
