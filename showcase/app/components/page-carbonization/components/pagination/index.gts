/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import style from 'ember-style-modifier';
import { capitalize } from '@ember/string';
import { array } from '@ember/helper';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwDivider from 'showcase/components/shw/divider';
import ShwOutliner from 'showcase/components/shw/outliner';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';
import ShwFlex from 'showcase/components/shw/flex';

import {
  HdsPaginationNumbered,
  HdsPaginationCompact,
  HdsPaginationNavArrow,
  HdsPaginationNavNumber,
} from '@hashicorp/design-system-components/components';

import NOOP from 'showcase/utils/noop';

const PaginationCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Pagination - Carbonization"}}

  <ShwTextH1>Pagination - Carbonization</ShwTextH1>

  <section>
    <ShwTextH2>PaginationNumbered vs. Carbon PaginationNav</ShwTextH2>

    <ShwTextH3>No Carbon equivalent</ShwTextH3>

    <ShwCarbonizationComparisonGrid
      @label="with default features"
      @sideBySide={{true}}
    >
      <:theming>
        <HdsPaginationNumbered @totalItems={{40}} />
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwTextH3>Closest Carbon equivalent</ShwTextH3>

    <ShwCarbonizationComparisonGrid
      @label="minimal, without truncation"
      @sideBySide={{true}}
    >
      <:theming>
        <ShwOutliner {{style outline-offset="7px"}}>
          <HdsPaginationNumbered
            @totalItems={{40}}
            @showInfo={{false}}
            @showSizeSelector={{false}}
          />
        </ShwOutliner>
      </:theming>
      <:reference>
        <cds-pagination-nav size="sm" total-items="4"></cds-pagination-nav>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid
      @label="minimal, with truncation"
      @sideBySide={{true}}
    >
      <:theming>
        <ShwOutliner {{style outline-offset="7px"}}>
          <HdsPaginationNumbered
            @totalItems={{100}}
            @showInfo={{false}}
            @showSizeSelector={{false}}
          />
        </ShwOutliner>
      </:theming>
      <:reference>
        <cds-pagination-nav
          size="sm"
          items-shown="7"
          total-items="10"
        ></cds-pagination-nav>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH2>PaginationCompact vs. Carbon Pagination</ShwTextH2>

    <ShwTextH3>No Carbon equivalent</ShwTextH3>

    <ShwCarbonizationComparisonGrid
      @label="with default features"
      @sideBySide={{true}}
    >
      <:theming>
        <ShwOutliner {{style outline-offset="7px"}}>
          <HdsPaginationCompact />
        </ShwOutliner>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwTextH3>Closest Carbon equivalent</ShwTextH3>

    <mark>ISSUE: Carbon Pagination has a responsive layout and hides part of the
      UI in this comparison view</mark>

    <ShwCarbonizationComparisonGrid
      @label="showLabels=false, showSizeSelector=true"
      @sideBySide={{true}}
    >
      <:theming>
        <ShwOutliner {{style outline-offset="7px"}}>
          <HdsPaginationCompact
            @showLabels={{false}}
            @showSizeSelector={{true}}
          />
        </ShwOutliner>
      </:theming>
      <:reference>
        <cds-pagination
          backward-text="Previous"
          forward-text="Next"
          items-per-page-text="Items per page:"
          page="1"
          page-size="10"
          size="md"
          total-items="103"
        >
          <cds-select-item value="10">10</cds-select-item>
          <cds-select-item value="20">20</cds-select-item>
          <cds-select-item value="30">30</cds-select-item>
          <cds-select-item value="40">40</cds-select-item>
          <cds-select-item value="50">50</cds-select-item>
        </cds-pagination>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH2>Base element states</ShwTextH2>

    <ShwTextH3>PaginationNavArrow</ShwTextH3>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <ShwOutliner {{style outline-offset="7px"}}>
          <ShwFlex @direction="column" as |SF|>
            {{#let (array "default" "hover" "active" "focus") as |states|}}
              {{#each states as |state|}}
                <SF.Item
                  @label={{capitalize state}}
                  mock-state-value={{state}}
                  mock-state-selector="button,a"
                >
                  <ShwFlex as |SF|>
                    <SF.Item>
                      <HdsPaginationNavArrow @direction="prev" />
                    </SF.Item>
                    <SF.Item>
                      <HdsPaginationNavArrow @direction="next" />
                    </SF.Item>
                    <SF.Item>
                      <HdsPaginationNavArrow
                        @direction="prev"
                        @showLabel={{false}}
                      />
                    </SF.Item>
                    <SF.Item>
                      <HdsPaginationNavArrow
                        @direction="next"
                        @showLabel={{false}}
                      />
                    </SF.Item>
                  </ShwFlex>
                </SF.Item>
              {{/each}}
              <SF.Item @label="Disabled">
                <ShwFlex as |SF|>
                  <SF.Item>
                    <HdsPaginationNavArrow
                      @direction="prev"
                      @disabled={{true}}
                    />
                  </SF.Item>
                  <SF.Item>
                    <HdsPaginationNavArrow
                      @direction="next"
                      @disabled={{true}}
                    />
                  </SF.Item>
                  <SF.Item>
                    <HdsPaginationNavArrow
                      @direction="prev"
                      @showLabel={{false}}
                      @disabled={{true}}
                    />
                  </SF.Item>
                  <SF.Item>
                    <HdsPaginationNavArrow
                      @direction="next"
                      @showLabel={{false}}
                      @disabled={{true}}
                    />
                  </SF.Item>
                </ShwFlex>
              </SF.Item>
            {{/let}}
          </ShwFlex>
        </ShwOutliner>
      </:theming>
      <:reference>
        ???
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwTextH3>PaginationNavNumber</ShwTextH3>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <ShwOutliner {{style outline-offset="7px"}}>
          <ShwFlex @direction="column" as |SF|>
            {{#let (array "default" "hover" "active" "focus") as |states|}}
              {{#each states as |state|}}
                <SF.Item
                  @label={{capitalize state}}
                  mock-state-value={{state}}
                  mock-state-selector="button,a"
                >
                  <ShwFlex as |SF|>
                    <SF.Item>
                      <HdsPaginationNavNumber
                        @page={{1}}
                        @isSelected={{false}}
                        @onClick={{NOOP}}
                      />
                    </SF.Item>
                    <SF.Item>
                      <HdsPaginationNavNumber
                        @page={{12}}
                        @isSelected={{false}}
                        @onClick={{NOOP}}
                      />
                    </SF.Item>
                    <SF.Item>
                      <HdsPaginationNavNumber
                        @page={{123}}
                        @isSelected={{false}}
                        @onClick={{NOOP}}
                      />
                    </SF.Item>
                    <SF.Item>
                      <HdsPaginationNavNumber
                        @page={{1}}
                        @isSelected={{true}}
                        @onClick={{NOOP}}
                      />
                    </SF.Item>
                    <SF.Item>
                      <HdsPaginationNavNumber
                        @page={{12}}
                        @isSelected={{true}}
                        @onClick={{NOOP}}
                      />
                    </SF.Item>
                    <SF.Item>
                      <HdsPaginationNavNumber
                        @page={{123}}
                        @isSelected={{true}}
                        @onClick={{NOOP}}
                      />
                    </SF.Item>
                  </ShwFlex>
                </SF.Item>
              {{/each}}
            {{/let}}
          </ShwFlex>
        </ShwOutliner>
      </:theming>
      <:reference>
        ???
      </:reference>
    </ShwCarbonizationComparisonGrid>
  </section>
</template>;

export default PaginationCarbonizationIndex;
