/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';
import { concat } from '@ember/helper';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';

import {
  HdsTabsTab,
  HdsTabsPanel,
} from '@hashicorp/design-system-components/components';
import { SIZES } from '@hashicorp/design-system-components/components/hds/tabs/index';

const SubSectionBaseElements: TemplateOnlyComponent = <template>
  <ShwTextH2>Base elements</ShwTextH2>

  <ShwTextH3>TabsTab</ShwTextH3>

  <ShwTextH4>Content</ShwTextH4>

  <ShwFlex @direction="column" as |SF|>
    {{#each SIZES as |size|}}
      <SF.Item @label={{capitalize size}}>
        <ShwFlex as |SF|>
          <SF.Item @label="Text only">
            <div class={{concat "hds-tabs--size-" size}}>
              <ul class="shw-component-tabs-sample-ul-wrapper" role="tablist">
                <HdsTabsTab>Lorem ipsum</HdsTabsTab>
              </ul>
            </div>
          </SF.Item>
          <SF.Item @label="Icon + Text">
            <div class={{concat "hds-tabs--size-" size}}>
              <ul class="shw-component-tabs-sample-ul-wrapper" role="tablist">
                <HdsTabsTab @icon="hexagon">Lorem ipsum</HdsTabsTab>
              </ul>
            </div>
          </SF.Item>
          <SF.Item @label="Text + Counter">
            <div class={{concat "hds-tabs--size-" size}}>
              <ul class="shw-component-tabs-sample-ul-wrapper" role="tablist">
                <HdsTabsTab @count="10">Lorem ipsum</HdsTabsTab>
              </ul>
            </div>
          </SF.Item>
          <SF.Item @label="Icon + Text + Counter">
            <div class={{concat "hds-tabs--size-" size}}>
              <ul class="shw-component-tabs-sample-ul-wrapper" role="tablist">
                <HdsTabsTab @icon="hexagon" @count="10">Lorem ipsum</HdsTabsTab>
              </ul>
            </div>
          </SF.Item>
        </ShwFlex>
      </SF.Item>
    {{/each}}
  </ShwFlex>

  <ShwTextH4>States</ShwTextH4>

  <ShwFlex @direction="column" as |SF|>
    {{#each SIZES as |size|}}
      <SF.Item @label={{capitalize size}}>
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
      </SF.Item>
    {{/each}}
  </ShwFlex>

  <ShwTextH3>TabsPanel</ShwTextH3>

  <HdsTabsPanel>
    <ShwPlaceholder @text="Panel with generic content" @height="50" />
  </HdsTabsPanel>

  <ShwDivider />
</template>;

export default SubSectionBaseElements;
