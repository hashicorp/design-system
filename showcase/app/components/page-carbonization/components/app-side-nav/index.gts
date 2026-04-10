/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';
import ShwPlaceholder from 'showcase/components/shw/placeholder';

import {
  HdsAppSideNav,
  HdsAppSideNavList,
  HdsAppSideNavListTitle,
  HdsAppSideNavListLink,
  HdsAppSideNavListBackLink,
  HdsAppSideNavToggleButton,
} from '@hashicorp/design-system-components/components';

const STATES = ['default', 'hover', 'active', 'focus'];

const AppSideNavCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "AppSideNav - Carbonization"}}

  <ShwTextH1>AppSideNav - Carbonization</ShwTextH1>

  <section>
    <ShwTextH2>Content</ShwTextH2>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <div class="shw-component-sim-app-side-nav-root-container">
          <HdsAppSideNav @isResponsive={{false}}>
            <ShwPlaceholder @text="body" />
          </HdsAppSideNav>
        </div>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider />

    <ShwTextH2>Examples of sidebar navigation</ShwTextH2>

    <ShwTextH3>Yielded content</ShwTextH3>

    <ShwCarbonizationComparisonGrid>
      <:label>With product icons using text color</:label>
      <:theming>
        <div class="shw-component-sim-app-side-nav-root-container">
          <HdsAppSideNav @isResponsive={{false}}>
            <HdsAppSideNavList aria-label="Dashboard" as |SNL|>
              <SNL.Link
                @text="Dashboard"
                @icon="dashboard"
                @isActive={{true}}
                @href="#"
              />
            </HdsAppSideNavList>
            <HdsAppSideNavList aria-label="Multiple items" as |SNL|>
              <SNL.Title>Services</SNL.Title>
              <SNL.Link @text="Boundary" @icon="boundary" @href="#" />
              <SNL.Link @text="Consul" @icon="consul" @href="#" />
              <SNL.Link @text="Packer" @icon="packer" @href="#" />
              <SNL.Link @text="Vault" @icon="vault" @href="#" />
              <SNL.Link
                @text="Vault Secrets"
                @icon="vault-secrets-square"
                @badge="Alpha"
                @href="#"
              />
              <SNL.Link @text="Terraform" @icon="terraform" @href="#" />
              <SNL.Link
                @text="Vagrant"
                @icon="vagrant"
                @badge="Alpha"
                @href="#"
              />
              <SNL.Link
                @text="Waypoint"
                @icon="waypoint"
                @badge="Alpha"
                @hasSubItems={{true}}
                @href="#"
              />
              <SNL.Title>Default Org</SNL.Title>
              <SNL.Link
                @text="HashiCorp Virtual Networks"
                @icon="network"
                @href="#"
              />
              <SNL.Link @text="Access control (IAM)" @icon="users" @href="#" />
              <SNL.Link @text="Billing" @icon="credit-card" @href="#" />
              <SNL.Link @text="Settings" @icon="settings" @href="#" />
            </HdsAppSideNavList>
          </HdsAppSideNav>
        </div>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid>
      <:label>With back link</:label>
      <:theming>
        <div class="shw-component-sim-app-side-nav-root-container">
          <HdsAppSideNav @isResponsive={{false}}>
            <HdsAppSideNavList as |SNL|>
              <SNL.BackLink @text="A 'back' link" @href="#" />
              <SNL.Title>A section title</SNL.Title>
              <SNL.Link @text="A link with just text" @href="#" />
              <SNL.Link @text="A link with an icon" @icon="network" @href="#" />
              <SNL.Link
                @text="With a 'count'"
                @icon="users"
                @count="12"
                @href="#"
              />
              <SNL.Link
                @text="With a 'badge'"
                @icon="credit-card"
                @badge="Beta"
                @href="#"
              />
              <SNL.Link
                @text="With 'sub items' indicator"
                @icon="settings"
                @hasSubItems={{true}}
              />
              <SNL.Link
                @href="#"
                @isHrefExternal={{true}}
                @icon="guide"
                @text="As an 'external' link"
              />
            </HdsAppSideNavList>
          </HdsAppSideNav>
        </div>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider />

    <ShwTextH2>HdsAppSideNavList</ShwTextH2>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <div class="shw-component-sim-app-side-nav-body">
          <HdsAppSideNavList aria-label="Multiple items" as |SNL|>
            <SNL.Title>Services</SNL.Title>
            <SNL.Link @text="Boundary" @icon="boundary" @href="#" />
            <SNL.Link @text="Consul" @icon="consul" @href="#" />
            <SNL.Link @text="Packer" @icon="packer" @href="#" />
            <SNL.Link @text="Vault" @icon="vault" @href="#" />
            <SNL.Link
              @text="Vault Secrets"
              @icon="vault-secrets-square"
              @badge="Alpha"
              @href="#"
            />
            <SNL.Link @text="Terraform" @icon="terraform" @href="#" />
            <SNL.Link
              @text="Vagrant"
              @icon="vagrant"
              @badge="Alpha"
              @href="#"
            />
            <SNL.Link
              @text="Waypoint"
              @icon="waypoint"
              @badge="Alpha"
              @hasSubItems={{true}}
              @href="#"
            />
            <SNL.Title>Default Org</SNL.Title>
            <SNL.Link
              @text="HashiCorp Virtual Networks"
              @icon="network"
              @href="#"
            />
            <SNL.Link @text="Access control (IAM)" @icon="users" @href="#" />
            <SNL.Link @text="Billing" @icon="credit-card" @href="#" />
            <SNL.Link @text="Settings" @icon="settings" @href="#" />
          </HdsAppSideNavList>
        </div>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>AppSideNavListTitle</ShwTextH3>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <ul class="shw-component-sim-app-side-nav-body">
          <HdsAppSideNavListTitle>Group title</HdsAppSideNavListTitle>
          <HdsAppSideNavListTitle>This is a long text that should go on two
            lines</HdsAppSideNavListTitle>
        </ul>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>AppSideNavListLink</ShwTextH3>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <ul class="shw-component-sim-app-side-nav-list-link-wrapper">
          <HdsAppSideNavListLink @text="Boundary" @href="#" />
          <HdsAppSideNavListLink @icon="boundary" @text="Boundary" @href="#" />
          <HdsAppSideNavListLink
            @icon="boundary"
            @text="Boundary"
            @badge="Alpha"
          />
          <HdsAppSideNavListLink @icon="boundary" @text="Boundary" @count="3" />
          <HdsAppSideNavListLink
            @icon="boundary"
            @text="Boundary"
            @href="#"
            @hasSubItems={{true}}
          />
          <HdsAppSideNavListLink
            @icon="hashicorp"
            @text="HashiCorp Cloud Platform"
            @isHrefExternal={{true}}
            @href="#"
          />
        </ul>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwTextH4>States</ShwTextH4>

    {{#each STATES as |state|}}
      <ShwCarbonizationComparisonGrid>
        <:label>{{state}}</:label>
        <:theming>
          <ul class="shw-component-sim-app-side-nav-list-link-wrapper">
            <HdsAppSideNavListLink @text="Packer" @icon="packer" @href="#" />
            <HdsAppSideNavListLink
              @text="Terraform"
              @icon="terraform"
              @badge="Alpha"
              @count="3"
              @href="#"
              mock-state-value={{state}}
            />
            <HdsAppSideNavListLink @text="Vagrant" @icon="vagrant" @href="#" />
          </ul>
        </:theming>
        <:reference as |R|>
          <R.NoEquivalent @isCompact={{true}} />
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    <ShwTextH4>States with @isActive=true</ShwTextH4>

    {{#each STATES as |state|}}
      <ShwCarbonizationComparisonGrid>
        <:label>{{state}}</:label>
        <:theming>
          <ul class="shw-component-sim-app-side-nav-list-link-wrapper">
            <HdsAppSideNavListLink @text="Packer" @icon="packer" @href="#" />
            <HdsAppSideNavListLink
              @text="Terraform"
              @icon="terraform"
              @href="#"
              @hasSubItems={{true}}
              @isActive={{true}}
              mock-state-value={{state}}
            />
            <HdsAppSideNavListLink @text="Vagrant" @icon="vagrant" @href="#" />
          </ul>
        </:theming>
        <:reference as |R|>
          <R.NoEquivalent @isCompact={{true}} />
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    <ShwDivider @level={{2}} />

    <ShwTextH3>AppSideNavListBackLink</ShwTextH3>

    <ShwTextH4>Base</ShwTextH4>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <ul class="shw-component-sim-app-side-nav-body">
          <HdsAppSideNavListBackLink @text="Back to parent page" @href="#" />
          <HdsAppSideNavListBackLink
            @text="This is a long text that should go on two lines"
            @href="#"
          />
        </ul>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwTextH4>States</ShwTextH4>

    {{#each STATES as |state|}}
      <ShwCarbonizationComparisonGrid>
        <:label>{{state}}</:label>
        <:theming>
          <ul class="shw-component-sim-app-side-nav-body">
            <HdsAppSideNavListBackLink
              @text="Back to parent page"
              @href="#"
              mock-state-value={{state}}
            />
          </ul>
        </:theming>
        <:reference as |R|>
          <R.NoEquivalent @isCompact={{true}} />
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    <ShwDivider />

    <ShwTextH2>AppSideNavToggleButton</ShwTextH2>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <div class="shw-component-sim-toggle-button">
          <HdsAppSideNavToggleButton
            aria-label="Open menu"
            @icon="chevrons-right"
          />
        </div>
        <div class="shw-component-sim-toggle-button">
          <HdsAppSideNavToggleButton
            aria-label="Close menu"
            @icon="chevrons-left"
          />
        </div>
        <div class="shw-component-sim-toggle-button">
          <HdsAppSideNavToggleButton aria-label="Menu" @icon="menu" />
        </div>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwTextH3>States</ShwTextH3>

    {{#each STATES as |state|}}
      <ShwCarbonizationComparisonGrid>
        <:label>{{state}}</:label>
        <:theming>
          <div class="shw-component-sim-toggle-button">
            <HdsAppSideNavToggleButton
              aria-label="Close menu"
              @icon="chevrons-left"
              mock-state-value={{state}}
            />
          </div>
        </:theming>
        <:reference as |R|>
          <R.NoEquivalent @isCompact={{true}} />
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

  </section>
</template>;

export default AppSideNavCarbonizationIndex;
