/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';

const FONT_WEIGHTS = ['regular', 'medium', 'semibold', 'bold'];

const SubSectionWeights: TemplateOnlyComponent = <template>
  <ShwTextH2>Weights</ShwTextH2>

  <ShwFlex @direction="column" as |SF|>
    {{#each FONT_WEIGHTS as |weight|}}
      <SF.Item @label="{{weight}}">
        <p class="hds-font-family-sans-text hds-font-weight-{{weight}}">The fox
          jumped over the lazy dog</p>
      </SF.Item>
    {{/each}}
  </ShwFlex>
</template>;

export default SubSectionWeights;
