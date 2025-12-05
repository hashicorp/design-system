/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwDivider from 'showcase/components/shw/divider';

const SubSectionBase: TemplateOnlyComponent = <template>
  <ShwTextH2>Base "focus ring" effect</ShwTextH2>

  <ShwFlex as |SF|>
    <SF.Item>
      <div class="hds-focus-ring-action-box-shadow">
        <ShwPlaceholder
          @text="no radius"
          @width="100"
          @height="100"
          @background="transparent"
        />
      </div>
    </SF.Item>
    <SF.Item>
      <div
        class="hds-focus-ring-action-box-shadow"
        {{style border-radius="5px"}}
      >
        <ShwPlaceholder
          @text="with border radius"
          @width="100"
          @height="100"
          @background="transparent"
        />
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionBase;
