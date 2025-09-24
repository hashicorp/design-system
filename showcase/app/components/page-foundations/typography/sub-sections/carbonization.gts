/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { notEq } from 'ember-truth-helpers';

import ShwFlex from 'showcase/components/shw/flex';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import { STYLES_COMBINATIONS } from './styles';

const SubSectionCarbonization: TemplateOnlyComponent = <template>
  {{#each-in STYLES_COMBINATIONS as |style weights|}}
    <ShwCarbonizationComparisonGrid
      @hideThemeLabels={{(if (notEq style "display-500") true)}}
    >
      <:themed>
        <ShwFlex @direction="column" as |SF|>
          {{#each weights as |weight|}}
            <SF.Item>
              <p
                class="hds-typography-{{style}} hds-font-weight-{{weight}}"
              >{{style}} / {{weight}}</p>
            </SF.Item>
          {{/each}}
        </ShwFlex>
      </:themed>
    </ShwCarbonizationComparisonGrid>
  {{/each-in}}
</template>;

export default SubSectionCarbonization;
