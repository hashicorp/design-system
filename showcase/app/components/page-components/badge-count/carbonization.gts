import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { array } from '@ember/helper';
import { notEq } from 'ember-truth-helpers';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import { HdsBadgeCount } from '@hashicorp/design-system-components/components';
import {
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
      <:reference>
        <ShwFlex @direction="column" as |SF|>
          {{#let (array "sm" "md" "lg") as |SIZES|}}
            {{#each SIZES as |size|}}
              <SF.Item>
                <cds-tag size={{size}}>3</cds-tag>
                <cds-tag size={{size}}>99+</cds-tag>
              </SF.Item>
            {{/each}}
          {{/let}}
        </ShwFlex>
      </:reference>
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
      <:reference>
        <ShwFlex @direction="column" as |SF|>
          {{#let (array "gray" "high-contrast" "outline") as |TYPES|}}
            {{#each TYPES as |type|}}
              <SF.Item>
                <cds-tag type={{type}}>3</cds-tag>
                <cds-tag type={{type}}>99+</cds-tag>
              </SF.Item>
            {{/each}}
          {{/let}}
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH2>Color</ShwTextH2>

    <ShwCarbonizationComparisonGrid @label="neutral">
      <:theming>
        <ShwFlex @direction="column" @gap="0.5rem" as |SF|>
          {{#each TYPES as |type|}}
            <SF.Item class="shw-component-badge-sample-color--neutral">
              <HdsBadgeCount @text="3" @type={{type}} @color="neutral" />
              <HdsBadgeCount @text="99+" @type={{type}} @color="neutral" />
            </SF.Item>
          {{/each}}
        </ShwFlex>
      </:theming>
      <:reference>
        <ShwFlex @direction="column" @gap="0.5rem" as |SF|>
          <SF.Item>
            <cds-tag type="gray">3</cds-tag>
            <cds-tag type="gray">99+</cds-tag>
          </SF.Item>
          <SF.Item>
            <cds-tag type="outline">3</cds-tag>
            <cds-tag type="outline">99+</cds-tag>
          </SF.Item>
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid @label="neutral-dark-mode">
      <:theming>
        <ShwFlex @direction="column" @gap="0.5rem" as |SF|>
          {{#each TYPES as |type|}}
            <SF.Item
              class="shw-component-badge-sample-color--neutral-dark-mode"
            >
              <HdsBadgeCount
                @text="3"
                @type={{type}}
                @color="neutral-dark-mode"
              />
              <HdsBadgeCount
                @text="99+"
                @type={{type}}
                @color="neutral-dark-mode"
              />
            </SF.Item>
          {{/each}}
        </ShwFlex>
      </:theming>
      <:reference>
        <cds-tag type="high-contrast">3</cds-tag>
        <cds-tag type="high-contrast">99+</cds-tag>
      </:reference>
    </ShwCarbonizationComparisonGrid>

  </section>
</template>;

export default BadgeCountIndex;
