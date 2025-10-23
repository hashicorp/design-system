/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import style from 'ember-style-modifier/modifiers/style';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import ShwFlex from 'showcase/components/shw/flex';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

const FocusRingIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Focus ring"}}

  <ShwTextH1>Focus ring - Carbonization</ShwTextH1>

  <section>
    <ShwCarbonizationComparisonGrid>
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <div
              class="hds-focus-ring-action-box-shadow"
              {{style width="fit-content"}}
            >
              <ShwPlaceholder
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
                @width="100"
                @height="100"
                @background="transparent"
              />
            </div>
          </SF.Item>
        </ShwFlex>
      </:theming>
    </ShwCarbonizationComparisonGrid>

  </section>
</template>;

export default FocusRingIndex;
