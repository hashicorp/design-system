/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';

const FONT_FAMILIES = ['sans-display', 'sans-text', 'mono-code'];

const SubSectionFamilies: TemplateOnlyComponent = <template>
  <ShwTextH2>Families</ShwTextH2>

  <ShwFlex @direction="column" as |SF|>
    {{#each FONT_FAMILIES as |family|}}
      <SF.Item @label="{{family}}">
        <p class="hds-font-family-{{family}}">The fox jumped over the lazy dog</p>
      </SF.Item>
    {{/each}}
  </ShwFlex>
</template>;

export default SubSectionFamilies;
