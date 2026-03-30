/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { capitalize } from '@ember/string';
import { array } from '@ember/helper';
import { eq } from 'ember-truth-helpers';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';
import ShwFlex from 'showcase/components/shw/flex';

import {
  HdsPaginationNumbered,
  HdsPaginationCompact,
  HdsPaginationNavArrow,
  HdsPaginationNavNumber,
  HdsPaginationSizeSelector,
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
      @layout="column"
    >
      <:theming>
        <HdsPaginationNumbered @totalItems={{40}} />
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Closest Carbon equivalent</ShwTextH3>

    <ShwCarbonizationComparisonGrid
      @label="minimal features, without truncation"
      @layout="column"
    >
      <:theming>
        <HdsPaginationNumbered
          @totalItems={{40}}
          @showInfo={{false}}
          @showSizeSelector={{false}}
        />
      </:theming>
      <:reference>
        <cds-pagination-nav size="sm" total-items="4"></cds-pagination-nav>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid
      @label="minimal features, with truncation"
      @layout="column"
    >
      <:theming>
        <HdsPaginationNumbered
          @totalItems={{100}}
          @showInfo={{false}}
          @showSizeSelector={{false}}
        />
      </:theming>
      <:reference>
        <cds-pagination-nav
          size="sm"
          items-shown="7"
          total-items="10"
        ></cds-pagination-nav>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider />

    <ShwTextH2>PaginationCompact vs. Carbon Pagination</ShwTextH2>

    <ShwTextH3>No Carbon equivalent</ShwTextH3>

    <ShwCarbonizationComparisonGrid
      @label="with default features"
      @layout="column"
    >
      <:theming>
        <HdsPaginationCompact />
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Closest Carbon equivalent</ShwTextH3>

    <ShwCarbonizationComparisonGrid
      @label="showLabels=false, showSizeSelector=true"
      @layout="column"
    >
      <:theming>
        <HdsPaginationCompact
          @showLabels={{false}}
          @showSizeSelector={{true}}
        />
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

    <ShwDivider />

    <ShwTextH2>Base element states</ShwTextH2>

    <ShwTextH3>PaginationSizeSelector</ShwTextH3>

    <ShwCarbonizationComparisonGrid @label="Base (default)">
      <:theming>
        <HdsPaginationSizeSelector @pageSizes={{array 10 30 50}} />
      </:theming>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid>
      <:label>With
        <code>@currentPageSize</code>
        (selected option)</:label>
      <:theming>
        <HdsPaginationSizeSelector
          @pageSizes={{array 10 30 50}}
          @selectedSize={{30}}
        />
      </:theming>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid>
      <:label>With
        <code>@label</code>
        to add custom label text
      </:label>
      <:theming>
        <HdsPaginationSizeSelector
          @pageSizes={{array 10 30 50}}
          @label="Items"
        />
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>PaginationNavArrow</ShwTextH3>

    {{#let (array "default" "hover" "active" "focus") as |states|}}
      {{#each states as |state|}}
        <ShwCarbonizationComparisonGrid @label={{capitalize state}}>
          <:theming>
            <ShwFlex
              mock-state-value={{state}}
              mock-state-selector="button,a"
              as |SF|
            >
              <SF.Item>
                <HdsPaginationNavArrow @direction="prev" />
              </SF.Item>
              <SF.Item>
                <HdsPaginationNavArrow @direction="next" />
              </SF.Item>
            </ShwFlex>
            <ShwFlex
              mock-state-value={{state}}
              mock-state-selector="button,a"
              as |SF|
            >
              <SF.Item>
                <HdsPaginationNavArrow @direction="prev" @showLabel={{false}} />
              </SF.Item>
              <SF.Item>
                <HdsPaginationNavArrow @direction="next" @showLabel={{false}} />
              </SF.Item>
            </ShwFlex>
          </:theming>
          <:reference>
            {{#if (eq state "default")}}
              <ShwFlex as |SF|>
                <SF.Item>
                  <cds-button
                    pagination=""
                    size="sm"
                    button-class-name="cds--btn cds--btn--icon-only cds--pagination__button cds--pagination__button--backward cds--pagination__button--no-index cds--btn--md cds--btn--ghost"
                    tooltip-text="Previous"
                    kind="primary"
                    tab-index="0"
                    tooltip-alignment=""
                    tooltip-position="top"
                    type="button"
                  >
                    <svg
                      focusable="false"
                      preserveAspectRatio="xMidYMid meet"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      slot="icon"
                      width="16"
                      height="16"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                    ><path d="M20 24 10 16 20 8z"></path></svg>
                  </cds-button>
                </SF.Item>
                <SF.Item>
                  <cds-button
                    tooltip-position="top"
                    pagination=""
                    size="sm"
                    button-class-name="cds--btn cds--btn--icon-only cds--pagination__button cds--pagination__button--forward cds--btn--md cds--btn--ghost"
                    tooltip-text="Next"
                    kind="primary"
                    tab-index="0"
                    tooltip-alignment=""
                    type="button"
                  >
                    <svg
                      focusable="false"
                      preserveAspectRatio="xMidYMid meet"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      slot="icon"
                      width="16"
                      height="16"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                    ><path d="M12 8 22 16 12 24z"></path></svg>
                  </cds-button>
                </SF.Item>
              </ShwFlex>
            {{else}}
              <pre>TODO: static image here</pre>
            {{/if}}
          </:reference>
        </ShwCarbonizationComparisonGrid>
      {{/each}}
    {{/let}}
    <ShwCarbonizationComparisonGrid @label="Disabled">
      <:theming>
        <ShwFlex as |SF|>
          <SF.Item>
            <HdsPaginationNavArrow @direction="prev" @disabled={{true}} />
          </SF.Item>
          <SF.Item>
            <HdsPaginationNavArrow @direction="next" @disabled={{true}} />
          </SF.Item>
        </ShwFlex>
        <ShwFlex as |SF|>
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
      </:theming>
      <:reference>
        <ShwFlex as |SF|>
          <SF.Item>
            <cds-button
              pagination=""
              size="sm"
              disabled=""
              button-class-name="cds--btn cds--btn--icon-only cds--pagination__button cds--pagination__button--backward cds--pagination__button--no-index cds--btn--md cds--btn--ghost"
              tooltip-text="Previous"
              kind="primary"
              tab-index="0"
              tooltip-alignment=""
              tooltip-position="top"
              type="button"
            >
              <svg
                focusable="false"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                slot="icon"
                width="16"
                height="16"
                viewBox="0 0 32 32"
                aria-hidden="true"
              ><path d="M20 24 10 16 20 8z"></path></svg>
            </cds-button>
          </SF.Item>
          <SF.Item>
            <cds-button
              tooltip-position="top"
              disabled=""
              pagination=""
              size="sm"
              button-class-name="cds--btn cds--btn--icon-only cds--pagination__button cds--pagination__button--forward cds--btn--md cds--btn--ghost"
              tooltip-text="Next"
              kind="primary"
              tab-index="0"
              tooltip-alignment=""
              type="button"
            >
              <svg
                focusable="false"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                slot="icon"
                width="16"
                height="16"
                viewBox="0 0 32 32"
                aria-hidden="true"
              ><path d="M12 8 22 16 12 24z"></path></svg>
            </cds-button>
          </SF.Item>
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>PaginationNavNumber</ShwTextH3>

    {{#let (array "default" "hover" "active" "focus") as |states|}}
      {{#each states as |state|}}
        <ShwCarbonizationComparisonGrid @label={{capitalize state}}>
          <:theming>
            <ShwFlex
              mock-state-value={{state}}
              mock-state-selector="button,a"
              as |SF|
            >
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
            </ShwFlex>
            <ShwFlex
              mock-state-value={{state}}
              mock-state-selector="button,a"
              as |SF|
            >
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
          </:theming>
          <:reference as |R|>
            <R.NoEquivalent @isCompact={{true}} />
          </:reference>
        </ShwCarbonizationComparisonGrid>
      {{/each}}
    {{/let}}

  </section>
</template>;

export default PaginationCarbonizationIndex;
