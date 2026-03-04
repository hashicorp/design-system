/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import {
  HdsAppFooter,
  HdsAppFooterStatusLink,
} from '@hashicorp/design-system-components/components';

import { STATUSES as STATUS_LINK_STATUSES } from '@hashicorp/design-system-components/components/hds/app-footer/status-link';

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

    <ShwDivider />

    <ShwTextH2>AppFooterStatusLink</ShwTextH2>

    <ShwTextH3>Status variants</ShwTextH3>

    {{#each-in STATUS_LINK_STATUSES as |status|}}
      <ShwCarbonizationComparisonGrid @label={{status}}>
        <:theming>
          <ul class="hds-app-footer__list hds-app-footer--theme-light">
            <HdsAppFooterStatusLink @status={{status}} />
          </ul>
        </:theming>
      </ShwCarbonizationComparisonGrid>
    {{/each-in}}
  </section>
</template>;

export default AppFooterCarbonizationIndex;
