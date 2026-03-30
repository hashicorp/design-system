/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import style from 'ember-style-modifier';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';
import ShwPlaceholder from 'showcase/components/shw/placeholder';

import {
  HdsCardContainer,
  HdsTextBody,
} from '@hashicorp/design-system-components/components';
import {
  BACKGROUNDS,
  LEVELS,
} from '@hashicorp/design-system-components/components/hds/card/container';

const CardCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Card - Carbonization"}}

  <ShwTextH1>Card - Carbonization</ShwTextH1>

  <section>

    <ShwTextH2>Basic Content</ShwTextH2>

    <ShwTextBody>Note: The Carbon Tile has padding, but the HDS component does
      not. This difference is intentional to maintain existing layouts of card
      content across themes.</ShwTextBody>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <HdsCardContainer>
          <div {{style width="200px" height="150px"}}>
            <HdsTextBody>Card content</HdsTextBody>
          </div>
        </HdsCardContainer>
      </:theming>
      <:reference>
        <cds-tile>
          <div {{style width="200px" height="150px"}}>
            Card content
          </div>
        </cds-tile>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH2>Elevation Levels</ShwTextH2>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          {{#each LEVELS as |level|}}
            <SF.Item>
              <HdsCardContainer @level={{level}}>
                <ShwPlaceholder
                  @text={{level}}
                  @width="200"
                  @height="100"
                  @background="transparent"
                />
              </HdsCardContainer>
            </SF.Item>
          {{/each}}
        </ShwFlex>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH2>Border</ShwTextH2>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          {{#each LEVELS as |level|}}
            <SF.Item>
              <HdsCardContainer @level={{level}} @hasBorder={{true}}>
                <ShwPlaceholder
                  @text={{level}}
                  @width="200"
                  @height="100"
                  @background="transparent"
                />
              </HdsCardContainer>
            </SF.Item>
          {{/each}}
        </ShwFlex>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH2>Interactive</ShwTextH2>

    <ShwCarbonizationComparisonGrid @label="Level default">
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          {{#each LEVELS as |level|}}
            <SF.Item>
              <HdsCardContainer @level={{level}}>
                <ShwPlaceholder
                  @text={{level}}
                  @width="200"
                  @height="100"
                  @background="transparent"
                />
              </HdsCardContainer>
            </SF.Item>
          {{/each}}
        </ShwFlex>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid @label="Level hover">
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          {{#each LEVELS as |level|}}
            <SF.Item>
              <HdsCardContainer @levelHover={{level}} mock-state-value="hover">
                <ShwPlaceholder
                  @text={{level}}
                  @width="200"
                  @height="100"
                  @background="transparent"
                />
              </HdsCardContainer>
            </SF.Item>
          {{/each}}
        </ShwFlex>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid @label="Level active">
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          {{#each LEVELS as |level|}}
            <SF.Item>
              <HdsCardContainer
                @levelActive={{level}}
                mock-state-value="active"
              >
                <ShwPlaceholder
                  @text={{level}}
                  @width="200"
                  @height="100"
                  @background="transparent"
                />
              </HdsCardContainer>
            </SF.Item>
          {{/each}}
        </ShwFlex>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwTextH3>Demo</ShwTextH3>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <HdsCardContainer
              @level="base"
              @levelHover="mid"
              @levelActive="high"
            >
              <ShwPlaceholder
                @text="Lorem ipsum"
                @width="200"
                @height="100"
                @background="transparent"
              />
            </HdsCardContainer>
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH2>Background</ShwTextH2>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          {{#each BACKGROUNDS as |background|}}
            <SF.Item>
              <HdsCardContainer @level="mid" @background={{background}}>
                <ShwPlaceholder
                  @text={{background}}
                  @width="200"
                  @height="100"
                  @background="transparent"
                />
              </HdsCardContainer>
            </SF.Item>
          {{/each}}
        </ShwFlex>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

  </section>
</template>;

export default CardCarbonizationIndex;
