/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import { HdsDismissButton } from '@hashicorp/design-system-components/components';

const DismissButtonCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "DismissButton - Carbonization"}}

  <ShwTextH1>DismissButton - Carbonization</ShwTextH1>

  <section>

    <ShwTextH2>States</ShwTextH2>

    <ShwCarbonizationComparisonGrid @label="default">
      <:theming>
        <HdsDismissButton mock-state-value="default" />
      </:theming>
      <:reference>
        <cds-icon-button kind="ghost" size="lg" part="button" align="left">
          <svg
            slot="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="currentColor"
            width="20"
            height="20"
            aria-hidden="true"
          >
            <path
              d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16z"
            />
          </svg>
          <span slot="tooltip-content">Close</span>
        </cds-icon-button>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwCarbonizationComparisonGrid @label="hover">
      <:theming>
        <HdsDismissButton mock-state-value="hover" />
      </:theming>
      <:reference>
        <pre>TODO: static image here</pre>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwCarbonizationComparisonGrid @label="active">
      <:theming>
        <HdsDismissButton mock-state-value="active" />
      </:theming>
      <:reference>
        <pre>TODO: static image here</pre>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwCarbonizationComparisonGrid @label="focus">
      <:theming>
        <HdsDismissButton mock-state-value="focus" />
      </:theming>
      <:reference>
        <pre>TODO: static image here</pre>
      </:reference>
    </ShwCarbonizationComparisonGrid>

  </section>
</template>;

export default DismissButtonCarbonizationIndex;
