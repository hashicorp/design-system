/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import style from 'ember-style-modifier';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwDivider from 'showcase/components/shw/divider';
import ShwOutliner from 'showcase/components/shw/outliner';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import {
  HdsPaginationNumbered,
  HdsPaginationCompact,
} from '@hashicorp/design-system-components/components';

const PaginationCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Pagination - Carbonization"}}

  <ShwTextH1>Pagination - Carbonization</ShwTextH1>

  <section>
    <ShwTextH2>PaginationNumbered vs. Carbon PaginationNav</ShwTextH2>

    <ShwCarbonizationComparisonGrid
      @label="with default features (no Carbon equivilant)"
      @sideBySide={{true}}
    >
      <:theming>
        <HdsPaginationNumbered @totalItems={{40}} />
      </:theming>
    </ShwCarbonizationComparisonGrid>

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

    <ShwCarbonizationComparisonGrid
      @label="with default features (no Carbon equivilant)"
      @sideBySide={{true}}
    >
      <:theming>
        <ShwOutliner {{style outline-offset="7px"}}>
          <HdsPaginationCompact />
        </ShwOutliner>
      </:theming>
    </ShwCarbonizationComparisonGrid>

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
  </section>
</template>;

export default PaginationCarbonizationIndex;
