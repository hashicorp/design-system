/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { get } from '@ember/helper';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import ShwFlex from 'showcase/components/shw/flex';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';
import ShwCarbonizationStylePreviewTypography from 'showcase/components/shw/carbonization/style-preview-typography';

import { STYLES_COMBINATIONS } from 'showcase/components/page-foundations/typography/sub-sections/styles';

type StyleMapping = {
  mapsTo: string;
  weights: Record<string, string>;
};

const HDS_CARBON_STYLES_MAPPING: Record<string, StyleMapping> = {
  'display-500': { mapsTo: 'heading-05', weights: { bold: 'semibold' } },
  'display-400': {
    mapsTo: 'heading-04',
    weights: { medium: 'regular', semibold: 'semibold', bold: 'semibold' },
  },
  'display-300': {
    mapsTo: 'heading-03',
    weights: { medium: 'regular', semibold: 'semibold', bold: 'semibold' },
  },
  'display-200': { mapsTo: 'heading-02', weights: { semibold: 'semibold' } },
  'display-100': { mapsTo: 'heading-01', weights: { medium: 'regular' } },
  'body-300': {
    mapsTo: 'body-02',
    weights: { regular: 'regular', medium: 'regular', semibold: 'semibold' },
  },
  'body-200': {
    mapsTo: 'body-01',
    weights: { regular: 'regular', medium: 'regular', semibold: 'semibold' },
  },
  'body-100': {
    mapsTo: 'body-compact-01',
    weights: { regular: 'regular', medium: 'regular', semibold: 'semibold' },
  },
  'code-300': {
    mapsTo: 'code-02',
    weights: { regular: 'regular', bold: 'semibold' },
  },
  'code-200': {
    mapsTo: 'code-02',
    weights: { regular: 'regular', bold: 'semibold' },
  },
  'code-100': {
    mapsTo: 'code-01',
    weights: { regular: 'regular', bold: 'semibold' },
  },
};

const TypographyCarbonization: TemplateOnlyComponent = <template>
  {{pageTitle "Typography - Carbonization"}}

  <ShwTextH1>Typography - Carbonization</ShwTextH1>

  <section>
    {{#each-in STYLES_COMBINATIONS as |style weights|}}
      <ShwCarbonizationComparisonGrid @sideBySide={{true}}>
        <:theming>
          <ShwFlex @direction="column" as |SF|>
            {{#each weights as |weight|}}
              <SF.Item>
                <ShwCarbonizationStylePreviewTypography
                  @class="hds-typography-{{style}} hds-font-weight-{{weight}}"
                  @label="{{style}} / {{weight}}"
                />
              </SF.Item>
            {{/each}}
          </ShwFlex>
        </:theming>
        <:reference>
          <ShwFlex @direction="column" as |SF|>
            {{#let (get HDS_CARBON_STYLES_MAPPING style) as |mappingItem|}}
              {{#each weights as |weight|}}
                {{#let (get mappingItem.weights weight) as |mappedWeight|}}
                  <SF.Item>
                    <ShwCarbonizationStylePreviewTypography
                      @class="cds--type-{{mappingItem.mapsTo}} cds--type-{{mappedWeight}}"
                      @label="{{mappingItem.mapsTo}}
                      /
                      {{mappedWeight}}"
                    />
                  </SF.Item>
                {{/let}}
              {{/each}}
            {{/let}}
          </ShwFlex>
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each-in}}
  </section>
</template>;

export default TypographyCarbonization;
