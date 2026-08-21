/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { capitalize } from '@ember/string';
import { concat } from '@ember/helper';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwTxtBody from 'showcase/components/shw/text/body';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwFlex from 'showcase/components/shw/flex';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import {
  HdsTabs,
  HdsTabsTab,
} from '@hashicorp/design-system-components/components';
import { SIZES } from '@hashicorp/design-system-components/components/hds/tabs/index';

const TabsCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Tabs - Carbonization"}}

  <ShwTextH1>Tabs - Carbonization</ShwTextH1>

  <ShwTxtBody>Note: The Carbon examples incorrectly change the border color of
    the selected Tab on hover.</ShwTxtBody>

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
            >
              Three
            </cds-tab>
          </cds-tabs>

          <div>
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

    <ShwTextH2>Base elements</ShwTextH2>

    <ShwTextH3>TabsTab</ShwTextH3>

    <ShwTextH4>States</ShwTextH4>

    {{#each SIZES as |size|}}
      <ShwCarbonizationComparisonGrid @label={{capitalize size}}>
        <:theming>
          <ShwFlex as |SF|>
            <SF.Item @label="Default">
              <div class={{concat "hds-tabs--size-" size}}>
                <ul class="shw-component-tabs-sample-ul-wrapper" role="tablist">
                  <HdsTabsTab>Lorem ipsum</HdsTabsTab>
                </ul>
                <ul class="shw-component-tabs-sample-ul-wrapper" role="tablist">
                  <HdsTabsTab @icon="hexagon" @count="10">Lorem ipsum</HdsTabsTab>
                </ul>
              </div>
            </SF.Item>
            <SF.Item @label="Selected">
              <div
                class={{concat
                  "hds-tabs--size-"
                  size
                  " shw-component-tabs-selector-example"
                }}
              >
                <ul class="shw-component-tabs-sample-ul-wrapper" role="tablist">
                  <HdsTabsTab class="hds-tabs__tab--is-selected">Lorem ipsum</HdsTabsTab>
                  {{! template-lint-disable no-invalid-role }}
                  <li class="hds-tabs__tab-indicator" role="presentation"></li>
                  {{! template-lint-enable no-invalid-role }}
                </ul>
              </div>
              <div
                class={{concat
                  "hds-tabs--size-"
                  size
                  " shw-component-tabs-selector-example"
                }}
              >
                <ul class="shw-component-tabs-sample-ul-wrapper" role="tablist">
                  <HdsTabsTab
                    @icon="hexagon"
                    @count="10"
                    class="hds-tabs__tab--is-selected"
                  >Lorem ipsum</HdsTabsTab>
                  {{! template-lint-disable no-invalid-role }}
                  <li class="hds-tabs__tab-indicator" role="presentation"></li>
                  {{! template-lint-enable no-invalid-role }}
                </ul>
              </div>
            </SF.Item>
            <SF.Item @label="Hover">
              <div class={{concat "hds-tabs--size-" size}}>
                <ul class="shw-component-tabs-sample-ul-wrapper" role="tablist">
                  <HdsTabsTab mock-state-value="hover">Lorem ipsum</HdsTabsTab>
                </ul>
                <ul class="shw-component-tabs-sample-ul-wrapper" role="tablist">
                  <HdsTabsTab
                    @icon="hexagon"
                    @count="10"
                    mock-state-value="hover"
                  >Lorem ipsum</HdsTabsTab>
                </ul>
              </div>
            </SF.Item>
            <SF.Item @label="Focus">
              <div class={{concat "hds-tabs--size-" size}}>
                <ul class="shw-component-tabs-sample-ul-wrapper" role="tablist">
                  <HdsTabsTab
                    mock-state-value="focus"
                    mock-state-selector="button"
                  >Lorem ipsum</HdsTabsTab>
                </ul>
                <ul class="shw-component-tabs-sample-ul-wrapper" role="tablist">
                  <HdsTabsTab
                    @icon="hexagon"
                    @count="10"
                    mock-state-value="focus"
                    mock-state-selector="button"
                  >Lorem ipsum</HdsTabsTab>
                </ul>
              </div>
            </SF.Item>
            <SF.Item @label="Focus selected Tab">
              <div
                class={{concat
                  "hds-tabs--size-"
                  size
                  " shw-component-tabs-selector-example"
                }}
              >
                <ul class="shw-component-tabs-sample-ul-wrapper" role="tablist">
                  <HdsTabsTab
                    mock-state-value="focus"
                    class="hds-tabs__tab--is-selected"
                    mock-state-selector="button"
                  >Lorem ipsum</HdsTabsTab>
                  {{! template-lint-disable no-invalid-role }}
                  <li class="hds-tabs__tab-indicator" role="presentation"></li>
                  {{! template-lint-enable no-invalid-role }}
                </ul>
              </div>
              <div
                class={{concat
                  "hds-tabs--size-"
                  size
                  " shw-component-tabs-selector-example"
                }}
              >
                <ul class="shw-component-tabs-sample-ul-wrapper" role="tablist">
                  <HdsTabsTab
                    @icon="hexagon"
                    @count="10"
                    class="hds-tabs__tab--is-selected"
                    mock-state-value="focus"
                    mock-state-selector="button"
                  >Lorem ipsum</HdsTabsTab>
                  {{! template-lint-disable no-invalid-role }}
                  <li class="hds-tabs__tab-indicator" role="presentation"></li>
                  {{! template-lint-enable no-invalid-role }}
                </ul>
              </div>
            </SF.Item>
          </ShwFlex>
        </:theming>
      </ShwCarbonizationComparisonGrid>
    {{/each}}
  </section>
</template>;

export default TabsCarbonizationIndex;
