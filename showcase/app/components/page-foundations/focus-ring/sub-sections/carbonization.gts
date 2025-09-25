/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier/modifiers/style';

import ShwFlex from 'showcase/components/shw/flex';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

const SubSectionCarbonization: TemplateOnlyComponent = <template>
  <ShwCarbonizationComparisonGrid>
    <:theming>
      <ShwFlex @direction="column" as |SF|>
        <SF.Item>
          <div
            class="hds-focus-ring-action-box-shadow"
            {{style width="fit-content"}}
          >
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
            {{style border-radius="5px" width="fit-content"}}
          >
            <ShwPlaceholder
              @text="with border radius"
              @width="100"
              @height="100"
              @background="transparent"
            />
          </div>
        </SF.Item>
        <SF.Item>
          <div
            class="hds-focus-ring-critical-box-shadow"
            {{style border-radius="5px" width="fit-content"}}
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
    </:theming>
  </ShwCarbonizationComparisonGrid>
</template>;

export default SubSectionCarbonization;
