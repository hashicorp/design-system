/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import type RouterService from '@ember/routing/router-service';

import ShwPlaceholder from 'showcase/components/shw/placeholder';

import { HdsTabs } from '@hashicorp/design-system-components/components';
import type { HdsTabsSignature } from '@hashicorp/design-system-components/components/hds/tabs/index';

interface CodeFragmentWithRoutingAndNestedTabsSignature {
  Args: {
    selectedTabIndex: HdsTabsSignature['Args']['selectedTabIndex'];
    selectedTab_subtab1: HdsTabsSignature['Args']['selectedTabIndex'];
    selectedTab_subtab2: HdsTabsSignature['Args']['selectedTabIndex'];
  };
}

export default class CodeFragmentWithRoutingAndNestedTabs extends Component<CodeFragmentWithRoutingAndNestedTabsSignature> {
  @service declare readonly router: RouterService;

  onClickTab = (_event: MouseEvent, index: number) => {
    this.router.transitionTo({
      queryParams: { currentTabWithRoutingAndNestedTabs: index },
    });
  };

  onClickSubTab1 = (_event: MouseEvent, index: number) => {
    this.router.transitionTo({
      queryParams: { currentTabSubTab1WithRoutingAndNestedTabs: index },
    });
  };

  onClickSubTab2 = (_event: MouseEvent, index: number) => {
    this.router.transitionTo({
      queryParams: { currentTabSubTab2WithRoutingAndNestedTabs: index },
    });
  };

  <template>
    <HdsTabs
      @selectedTabIndex={{@selectedTabIndex}}
      @onClickTab={{this.onClickTab}}
      as |T|
    >
      <T.Tab>🐤 One</T.Tab>
      <T.Tab>🦋 Two</T.Tab>
      <T.Tab>🐙 Three</T.Tab>
      <T.Panel as |P|>
        <HdsTabs
          @selectedTabIndex={{@selectedTab_subtab1}}
          @onClickTab={{this.onClickSubTab1}}
          @isParentVisible={{P.isVisible}}
          as |ST|
        >
          <ST.Tab>🐤 Tab One - Sub-tab A</ST.Tab>
          <ST.Tab>🐤 Tab One - Sub-tab B</ST.Tab>
          <ST.Tab>🐤 Tab One - Sub-tab C</ST.Tab>
          <ST.Panel><ShwPlaceholder
              @text="🐤 Tab One - Content A"
              @height="50"
            /></ST.Panel>
          <ST.Panel><ShwPlaceholder
              @text="🐤 Tab One - Content B"
              @height="50"
            /></ST.Panel>
          <ST.Panel><ShwPlaceholder
              @text="🐤 Tab One - Content C"
              @height="50"
            /></ST.Panel>
        </HdsTabs>
      </T.Panel>
      <T.Panel as |P|>
        <HdsTabs
          @selectedTabIndex={{@selectedTab_subtab2}}
          @onClickTab={{this.onClickSubTab2}}
          @isParentVisible={{P.isVisible}}
          as |ST|
        >
          <ST.Tab>🦋 Tab Two - Sub-tab A</ST.Tab>
          <ST.Tab>🦋 Tab Two - Sub-tab B</ST.Tab>
          <ST.Panel><ShwPlaceholder
              @text="🦋 Tab Two - Content A"
              @height="50"
            /></ST.Panel>
          <ST.Panel><ShwPlaceholder
              @text="🦋 Tab Two - Content B"
              @height="50"
            /></ST.Panel>
        </HdsTabs>
      </T.Panel>
      <T.Panel><ShwPlaceholder
          @text="🐙 Tab Three - Content"
          @height="50"
        /></T.Panel>
    </HdsTabs>
  </template>
}
