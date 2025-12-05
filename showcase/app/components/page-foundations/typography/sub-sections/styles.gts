/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwFlex from 'showcase/components/shw/flex';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwTextH2 from 'showcase/components/shw/text/h2';

// we add all the allowed combinations here, per design specs
const STYLES_COMBINATIONS = {
  'display-500': ['bold'],
  'display-400': ['medium', 'semibold', 'bold'],
  'display-300': ['medium', 'semibold', 'bold'],
  'display-200': ['semibold'],
  'display-100': ['medium'],
  'body-300': ['regular', 'medium', 'semibold'],
  'body-200': ['regular', 'medium', 'semibold'],
  'body-100': ['regular', 'medium', 'semibold'],
  'code-300': ['regular', 'bold'],
  'code-200': ['regular', 'bold'],
  'code-100': ['regular', 'bold'],
};

const SubSectionStyles: TemplateOnlyComponent = <template>
  <ShwTextH2>Styles</ShwTextH2>
  <ShwTextBody><em>Notice: we are showing only the combinations of
      <code>font-size</code>
      ("style") and
      <code>font-weight</code>
      that the design system
      <strong>suggests</strong>
      to use.</em></ShwTextBody>

  <ShwFlex @direction="column" as |SF|>
    {{#each-in STYLES_COMBINATIONS as |style weights|}}
      <SF.Item @label="{{style}}">
        {{#each weights as |weight|}}
          <p class="hds-typography-{{style}} hds-font-weight-{{weight}}">The fox
            jumped over the lazy dog ({{weight}})</p>
        {{/each}}
      </SF.Item>
    {{/each-in}}
  </ShwFlex>
</template>;

export default SubSectionStyles;
