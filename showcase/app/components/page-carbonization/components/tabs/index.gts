/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { capitalize } from '@ember/string';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import { HdsTabs } from '@hashicorp/design-system-components/components';
import { SIZES } from '@hashicorp/design-system-components/components/hds/tabs/index';

const TabsCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Tabs - Carbonization"}}

  <ShwTextH1>Tabs - Carbonization</ShwTextH1>

  <section>
    <ShwTextH2>Sizes</ShwTextH2>

    {{#each SIZES as |size|}}
      <ShwCarbonizationComparisonGrid
        @label={{capitalize size}}
        @layout="side-by-side"
      >
        <:theming>
          <HdsTabs @size={{size}} as |T|>
            <T.Tab>One</T.Tab>
            <T.Tab>Two</T.Tab>
            <T.Tab>Three</T.Tab>

            <T.Panel><ShwPlaceholder
                @text="Content one"
                @height="50"
              /></T.Panel>
            <T.Panel><ShwPlaceholder
                @text="Content two"
                @height="50"
              /></T.Panel>
            <T.Panel><ShwPlaceholder
                @text="Content three"
                @height="50"
              /></T.Panel>
          </HdsTabs>
        </:theming>
        <:reference>
          <cds-tabs
            value="all"
            disabled="false"
            selection-mode="automatic"
            type=""
          >
            <cds-tab
              id="tab-all-{{size}}"
              target="panel-all-{{size}}"
              value="all"
            >One</cds-tab>
            <cds-tab
              id="tab-cloudFoundry-{{size}}"
              target="panel-cloudFoundry-{{size}}"
              value="cloudFoundry"
            >
              Two
            </cds-tab>
            <cds-tab
              id="tab-staging-{{size}}"
              target="panel-staging-{{size}}"
              value="staging"
              disabled
            >
              Three
            </cds-tab>
          </cds-tabs>

          <div class="cds-ce-demo-devenv--tab-panels">
            <div
              id="panel-all-{{size}}"
              role="tabpanel"
              aria-labelledby="tab-all-{{size}}"
            >
              <ShwPlaceholder @text="Content one" @height="50" />
            </div>
            <div
              id="panel-cloudFoundry-{{size}}"
              role="tabpanel"
              aria-labelledby="tab-cloudFoundry-{{size}}"
              hidden
            >
              <ShwPlaceholder @text="Content two" @height="50" />
            </div>
            <div
              id="panel-staging-{{size}}"
              role="tabpanel"
              aria-labelledby="tab-staging-{{size}}"
              hidden
            >
              <ShwPlaceholder @text="Content three" @height="50" />
            </div>
          </div>
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}
  </section>
</template>;

export default TabsCarbonizationIndex;
