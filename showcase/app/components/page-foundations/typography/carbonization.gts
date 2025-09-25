/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { notEq } from 'ember-truth-helpers';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import ShwFlex from 'showcase/components/shw/flex';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import { STYLES_COMBINATIONS } from './sub-sections/styles';

const TypographyCarbonization: TemplateOnlyComponent = <template>
  {{pageTitle "Typography - Carbonization"}}

  <ShwTextH1>Typography - Carbonization</ShwTextH1>

  <section>
    {{#each-in STYLES_COMBINATIONS as |style weights|}}
      <ShwCarbonizationComparisonGrid
        @hideThemeLabels={{(if (notEq style "display-500") true)}}
      >
        <:theming>
          <ShwFlex @direction="column" as |SF|>
            {{#each weights as |weight|}}
              <SF.Item>
                <p
                  class="hds-typography-{{style}} hds-font-weight-{{weight}}"
                >{{style}} / {{weight}}</p>
              </SF.Item>
            {{/each}}
          </ShwFlex>
        </:theming>
      </ShwCarbonizationComparisonGrid>
    {{/each-in}}
  </section>
</template>;

export default TypographyCarbonization;
