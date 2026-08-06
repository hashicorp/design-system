/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwFlex from 'showcase/components/shw/flex';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwDivider from 'showcase/components/shw/divider';

const SubSectionBase: TemplateOnlyComponent = <template>
  <ShwTextH4 @tag="h2">Base "focus ring" effect</ShwTextH4>

  <ShwFlex as |SF|>
    <SF.Item>
      <div class="hds-focus-ring-box-shadow-action">
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
        class="hds-focus-ring-box-shadow-action"
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
