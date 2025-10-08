/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwDivider from 'showcase/components/shw/divider';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import { HdsTabs } from '@hashicorp/design-system-components/components';

import CodeFragmentWithDynamicTabContent from 'showcase/components/page-components/tabs/code-fragments/with-dynamic-tab-content';
import CodeFragmentWithDynamicTabSelection from 'showcase/components/page-components/tabs/code-fragments/with-dynamic-tab-selection';
import CodeFragmentWithDynamicTabSelectionLoop from 'showcase/components/page-components/tabs/code-fragments/with-dynamic-tab-selection-loop';
import CodeFragmentWithRouting from 'showcase/components/page-components/tabs/code-fragments/with-routing';
import CodeFragmentWithRoutingAndNestedTabs from 'showcase/components/page-components/tabs/code-fragments/with-routing-and-nested-tabs';

import PageComponentsTabsController from 'showcase/controllers/page-components/tabs';

interface SubSectionDemosSignature {
  Args: {
    controller: PageComponentsTabsController;
  };
}

export default class SubSectionDemos extends Component<SubSectionDemosSignature> {
  <template>
    <ShwTextH2 @tag="h2">Examples of tabs implementation</ShwTextH2>

    <ShwTextH3>Internal vs external/controlled state</ShwTextH3>

    <ShwTextBody>Internal state (set via
      <code>@isSelected</code>)</ShwTextBody>
    <HdsTabs as |T|>
      <T.Tab>One</T.Tab>
      <T.Tab>Two</T.Tab>
      <T.Tab @isSelected={{true}}>Three (@isSelected)</T.Tab>
      <T.Panel><ShwPlaceholder @text="Content one" @height="50" /></T.Panel>
      <T.Panel><ShwPlaceholder @text="Content two" @height="50" /></T.Panel>
      <T.Panel>
        <ShwPlaceholder @text="Content three (on page load)" @height="50" />
      </T.Panel>
    </HdsTabs>

    <ShwTextBody>External state (set via
      <code>@selectedTabIndex</code>
      and controlled via query params)</ShwTextBody>

    <CodeFragmentWithRouting
      @selectedTabIndex={{@controller.currentTabWithRouting}}
    />

    <ShwDivider @level={{2}} />

    <ShwTextH3>Nested tabs</ShwTextH3>

    <ShwTextBody>Basic example</ShwTextBody>
    <HdsTabs as |T|>
      <T.Tab>🐤 One</T.Tab>
      <T.Tab>🦋 Two</T.Tab>
      <T.Tab>🐙 Three</T.Tab>
      <T.Panel as |P|>
        <HdsTabs @isParentVisible={{P.isVisible}} as |ST|>
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
        <HdsTabs @isParentVisible={{P.isVisible}} as |ST|>
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

    <ShwTextBody>With selected tabs (via
      <code>@isSelected</code>)</ShwTextBody>
    <HdsTabs as |T|>
      <T.Tab>🐤 One</T.Tab>
      <T.Tab @isSelected={{true}}>🦋 Two</T.Tab>
      <T.Tab>🐙 Three</T.Tab>
      <T.Panel as |P|>
        <HdsTabs @isParentVisible={{P.isVisible}} as |ST|>
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
        <HdsTabs @isParentVisible={{P.isVisible}} as |ST|>
          <ST.Tab>🦋 Tab Two - Sub-tab A</ST.Tab>
          <ST.Tab @isSelected={{true}}>🦋 Tab Two - Sub-tab B</ST.Tab>
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

    <ShwTextBody>With controlled/persisted state (via query params)</ShwTextBody>
    <CodeFragmentWithRoutingAndNestedTabs
      @selectedTabIndex={{@controller.currentTabWithRoutingAndNestedTabs}}
      @selectedTab_subtab1={{@controller.currentTabSubTab1WithRoutingAndNestedTabs}}
      @selectedTab_subtab2={{@controller.currentTabSubTab2WithRoutingAndNestedTabs}}
    />

    <ShwDivider @level={{2}} />

    <ShwTextH3>Dynamic content</ShwTextH3>

    <CodeFragmentWithDynamicTabContent />

    <CodeFragmentWithDynamicTabSelection />

    <CodeFragmentWithDynamicTabSelectionLoop />
  </template>
}
