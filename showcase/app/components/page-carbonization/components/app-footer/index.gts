/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import { HdsAppFooter } from '@hashicorp/design-system-components/components';

const AppFooterCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "AppFooter - Carbonization"}}

  <ShwTextH1>AppFooter - Carbonization</ShwTextH1>

  <section>
    <ShwTextH2>Content</ShwTextH2>

    <ShwCarbonizationComparisonGrid
      @label="with status link & other recommended content"
      @sideBySide={{true}}
    >
      <:theming>
        <HdsAppFooter as |AF|>
          <AF.StatusLink @status="operational" />
          <AF.LegalLinks />
        </HdsAppFooter>
      </:theming>
    </ShwCarbonizationComparisonGrid>
  </section>
</template>;

export default AppFooterCarbonizationIndex;
