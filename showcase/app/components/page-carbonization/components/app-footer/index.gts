/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import {
  HdsAppFooter,
  HdsAppFooterStatusLink,
  HdsThemeContext,
  HdsPageHeader,
  HdsBreadcrumb,
  HdsBreadcrumbItem,
  HdsButton,
  HdsTextBody,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

import { STATUSES as STATUS_LINK_STATUSES } from '@hashicorp/design-system-components/components/hds/app-footer/status-link';

const AppFooterCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "AppFooter - Carbonization"}}

  <ShwTextH1>AppFooter - Carbonization</ShwTextH1>

  <section>
    <ShwTextH2>Content</ShwTextH2>

    <ShwCarbonizationComparisonGrid @layout="column">
      <:label>With @theme=light (default)</:label>
      <:theming>
        <HdsAppFooter @theme="light" as |AF|>
          <AF.StatusLink @status="operational" />
          <AF.LegalLinks />
        </HdsAppFooter>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider />

    <ShwTextH2>Base elements</ShwTextH2>

    <ShwTextH3>AppFooterStatusLink</ShwTextH3>

    <ShwTextBody>Status variants</ShwTextBody>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <ul
          class="hds-app-footer__list hds-app-footer--theme-light shw-carbonization-app-footer-list"
        >
          {{#each-in STATUS_LINK_STATUSES as |status|}}
            <HdsAppFooterStatusLink @status={{status}} />
          {{/each-in}}
        </ul>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider />

    <ShwTextH2>Demo</ShwTextH2>

    <ShwTextBody>AppFooter (with default
      <code>@theme=light</code>) wrapped in a
      <code>HdsThemeContext</code>
      with
      <code>@context=dark</code></ShwTextBody>

    <ShwCarbonizationComparisonGrid @layout="column">
      <:theming>
        <div class="shw-carbonization-app-footer-demo-page">
          <HdsPageHeader as |PH|>
            <PH.Title>Page title</PH.Title>
            <PH.Breadcrumb>
              <HdsBreadcrumb aria-label="breadcrumbs with page title example">
                <HdsBreadcrumbItem @text="Organization" @icon="org" />
                <HdsBreadcrumbItem @text="Project" @icon="folder" />
                <HdsBreadcrumbItem @text="User" @icon="user" />
              </HdsBreadcrumb>
            </PH.Breadcrumb>
            <PH.Actions>
              <HdsButton
                @text="Create registry"
                @icon="plus"
                @iconPosition="leading"
                @color="primary"
              />
            </PH.Actions>
          </HdsPageHeader>

          <div class="shw-carbonization-app-footer-demo-page-content">
            <HdsTextBody @tag="p" @size="200">Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Excepturi
              <HdsLinkInline @href="#" @color="primary">aperiam a molestias
                quisquam</HdsLinkInline>
              sapiente alias corporis sit aliquid similique esse illum at itaque
              ducimus, eligendi eos. Iure dolor eos
              <HdsLinkInline @href="#" @color="secondary">cumque autem placeat</HdsLinkInline>
              pariatur voluptate deserunt quas, iste quo alias? Sequi, qui ipsa.
              Laborum, ipsa atque alias nostrum nihil repudiandae ratione
              inventore, qui impedit obcaecati facilis quaerat aliquam omnis
              consequuntur.</HdsTextBody>
          </div>

          <HdsThemeContext @context="dark">
            <div
              class="shw-carbonization-app-footer-demo-dark-background-wrapper"
            >
              <HdsAppFooter as |AF|>
                <AF.StatusLink @status="operational" />
                <AF.LegalLinks />
              </HdsAppFooter>
            </div>
          </HdsThemeContext>
        </div>
      </:theming>
    </ShwCarbonizationComparisonGrid>

  </section>
</template>;

export default AppFooterCarbonizationIndex;
