import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { notEq } from 'ember-truth-helpers';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import { HdsBadgeCount } from '@hashicorp/design-system-components/components';
import {
  COLORS,
  SIZES,
  TYPES,
} from '@hashicorp/design-system-components/components/hds/badge-count/index';

const BadgeCountIndex: TemplateOnlyComponent = <template>
  {{pageTitle "BadgeCount - Carbonization"}}

  <ShwTextH1>BadgeCount - Carbonization</ShwTextH1>

  <section>

    <ShwTextH2>Size</ShwTextH2>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          {{#each SIZES as |size|}}
            <SF.Item>
              <HdsBadgeCount @text="3" @size={{size}} />
              <HdsBadgeCount @text="99+" @size={{size}} />
            </SF.Item>
          {{/each}}
        </ShwFlex>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH2>Type</ShwTextH2>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          {{#each TYPES as |type|}}
            <SF.Item>
              <HdsBadgeCount @text="3" @type={{type}} />
              <HdsBadgeCount @text="99+" @type={{type}} />
            </SF.Item>
          {{/each}}
        </ShwFlex>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH2>Color</ShwTextH2>

    {{#each COLORS as |color index|}}
      <ShwCarbonizationComparisonGrid
        @hideThemeLabels={{(if (notEq index 0) true)}}
      >
        <:theming>
          <ShwFlex @direction="column" @gap="0.5rem" as |SF|>
            {{#each TYPES as |type|}}
              <SF.Item class="shw-component-badge-sample-color--{{color}}">
                <HdsBadgeCount @text="3" @type={{type}} @color={{color}} />
                <HdsBadgeCount @text="99+" @type={{type}} @color={{color}} />
              </SF.Item>
            {{/each}}
          </ShwFlex>
        </:theming>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

  </section>
</template>;

export default BadgeCountIndex;
