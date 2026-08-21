/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { notEq } from 'ember-truth-helpers';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import { HdsIconTile } from '@hashicorp/design-system-components/components';

import {
  SIZES,
  COLORS,
  PRODUCTS,
} from '@hashicorp/design-system-components/components/hds/icon-tile/index';

const IconTileCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "IconTile - Carbonization"}}

  <ShwTextH1>IconTile - Carbonization</ShwTextH1>

  <section>
    <ShwTextH2>Size</ShwTextH2>

    <ShwCarbonizationComparisonGrid @label="With logo">
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          {{#each SIZES as |size|}}
            <SF.Item>
              <HdsIconTile @logo="boundary" @size={{size}} />
            </SF.Item>
          {{/each}}
        </ShwFlex>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid @label="With icon">
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          {{#each SIZES as |size|}}
            <SF.Item>
              <HdsIconTile @icon="dashboard" @size={{size}} />
            </SF.Item>
          {{/each}}
        </ShwFlex>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid @label="With logo + secondary icon">
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          {{#each SIZES as |size|}}
            <SF.Item>
              <HdsIconTile
                @logo="boundary"
                @size={{size}}
                @iconSecondary="plus"
              />
            </SF.Item>
          {{/each}}
        </ShwFlex>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid @label="With icon + secondary icon">
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          {{#each SIZES as |size|}}
            <SF.Item>
              <HdsIconTile
                @icon="dashboard"
                @size={{size}}
                @iconSecondary="trash"
              />
            </SF.Item>
          {{/each}}
        </ShwFlex>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH2>Logo</ShwTextH2>

    {{#each PRODUCTS as |product|}}
      <ShwCarbonizationComparisonGrid @label={{product}}>
        <:theming>
          <ShwFlex @direction="column" as |SF2|>
            {{#each SIZES as |size|}}
              <SF2.Item>
                <HdsIconTile @logo={{product}} @size={{size}} />
              </SF2.Item>
            {{/each}}
          </ShwFlex>
        </:theming>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    <ShwDivider @level={{2}} />

    <ShwTextH2>Color</ShwTextH2>

    {{#each COLORS as |color|}}
      {{! As agreed with designers, we prefer to hide the option of icon with "hcp" color }}
      {{#if (notEq color "hcp")}}
        <ShwCarbonizationComparisonGrid @label={{color}}>
          <:theming>
            <ShwFlex @direction="column" as |SF|>
              {{#each SIZES as |size|}}
                <SF.Item>
                  <HdsIconTile
                    @icon="dashboard"
                    @size={{size}}
                    @color={{color}}
                  />
                </SF.Item>
              {{/each}}
            </ShwFlex>
          </:theming>
        </ShwCarbonizationComparisonGrid>
      {{/if}}
    {{/each}}
  </section>
</template>;

export default IconTileCarbonizationIndex;
