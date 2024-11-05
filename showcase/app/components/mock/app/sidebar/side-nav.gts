/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

// HDS components
import {
  HdsSideNav,
  HdsSideNavHeader,
  HdsSideNavHeaderHomeLink,
  HdsSideNavList,
  HdsButton,
  HdsDropdown,
} from '@hashicorp/design-system-components/components';

// types
import type { HdsSideNavSignature } from '@hashicorp/design-system-components/components/hds/side-nav/index';

export interface MockAppSidebarSideNavSignature {
  Args: {
    isResponsive?: HdsSideNavSignature['Args']['isResponsive'];
    hasA11yRefocus?: HdsSideNavSignature['Args']['hasA11yRefocus'];
    isCollapsible?: HdsSideNavSignature['Args']['isCollapsible'];
    showHeader?: boolean;
    showFooter?: boolean;
  };
  Element: HdsSideNavSignature['Element'];
}

export default class MockAppSidebarSideNav extends Component<MockAppSidebarSideNavSignature> {
  isResponsive;
  hasA11yRefocus;
  isCollapsible;
  showHeader;
  showFooter;

  constructor(owner: unknown, args: MockAppSidebarSideNavSignature['Args']) {
    super(owner, args);
    this.isResponsive = this.args.isResponsive ?? true;
    this.hasA11yRefocus = this.args.hasA11yRefocus ?? true;
    this.isCollapsible = this.args.isCollapsible ?? true;
    this.showHeader = this.args.showHeader ?? true;
    this.showFooter = this.args.showFooter ?? true;
  }

  <template>
    <HdsSideNav
      @isResponsive={{this.isResponsive}}
      @hasA11yRefocus={{this.hasA11yRefocus}}
      @isCollapsible={{this.isCollapsible}}
    >
      <:header>
        {{#if this.showHeader}}
          <HdsSideNavHeader>
            <:logo>
              <HdsSideNavHeaderHomeLink
                @icon="hashicorp"
                @ariaLabel="HashiCorp"
                @href="#"
              />
            </:logo>
            <:actions>
              <HdsButton @icon="search" @isIconOnly={{true}} @text="Search" />
              <HdsDropdown @enableCollisionDetection={{true}} as |dd|>
                <dd.ToggleIcon @icon="help" @text="help menu" />
                <dd.Title @text="Help & Support" />
                <dd.Interactive @href="#">Documentation</dd.Interactive>
                <dd.Interactive @href="#">Tutorials</dd.Interactive>
                <dd.Interactive @href="#">Terraform Provider</dd.Interactive>
                <dd.Interactive @href="#">Changelog</dd.Interactive>
                <dd.Separator />
                <dd.Interactive @href="#">Create support ticket</dd.Interactive>
                <dd.Interactive @href="#">Give feedback</dd.Interactive>
              </HdsDropdown>
              <HdsDropdown @enableCollisionDetection={{true}} as |dd|>
                <dd.ToggleIcon @icon="user" @text="user menu" />
                <dd.Title @text="Signed In" />
                <dd.Description @text="email@domain.com" />
                <dd.Interactive @href="#">Account Settings</dd.Interactive>
              </HdsDropdown>
            </:actions>
          </HdsSideNavHeader>
        {{/if}}
      </:header>
      <:body>
        <HdsSideNavList
          class="hds-side-nav-hide-when-minimized"
          aria-label="Dashboard"
          as |SNL|
        >
          <SNL.Link @icon="dashboard" @text="Dashboard" @isActive={{true}} />
        </HdsSideNavList>
        <HdsSideNavList
          class="hds-side-nav-hide-when-minimized"
          aria-label="Services"
          as |SNL|
        >
          <SNL.Title>Services</SNL.Title>
          <SNL.Link @text="Boundary" @icon="boundary" @href="#" />
          <SNL.Link @text="Consul" @icon="consul" @href="#" />
          <SNL.Link @text="Packer" @icon="packer" @href="#" />
          <SNL.Link @text="Vault" @icon="vault" @href="#" />
          <SNL.Link
            @text="Vault Secrets"
            @icon="vault-secrets-square"
            @href="#"
          />
          <SNL.Link @text="Terraform" @icon="terraform" @href="#" />
          <SNL.Link @text="Vagrant" @icon="vagrant" @badge="Alpha" @href="#" />
          <SNL.Link
            @text="Waypoint"
            @icon="waypoint"
            @badge="Alpha"
            @hasSubItems={{true}}
          />
        </HdsSideNavList>
        <HdsSideNavList
          class="hds-side-nav-hide-when-minimized"
          aria-label="Organization"
          as |SNL|
        >
          <SNL.Title>Default Org</SNL.Title>
          <SNL.Link
            @text="HashiCorp Virtual Networks"
            @icon="network"
            @href="#"
          />
          <SNL.Link
            @text="Access control (IAM)"
            @icon="users"
            @href="#"
            @hasSubItems={{true}}
          />
          <SNL.Link
            @text="Billing"
            @icon="credit-card"
            @href="#"
            @hasSubItems={{true}}
          />
          <SNL.Link
            @text="Settings"
            @icon="settings"
            @href="#"
            @hasSubItems={{true}}
          />
          <SNL.Link
            @href="#"
            @isHrefExternal={{true}}
            @icon="guide"
            @text="Documentation"
          />
        </HdsSideNavList>
      </:body>
      <:footer>
        {{#if this.showFooter}}
          <HdsDropdown
            class="hds-side-nav-hide-when-minimized shw-layout-app-frame-full-width-elem"
            @enableCollisionDetection={{true}}
            as |dd|
          >
            <dd.ToggleButton @text="Choose an organization" @icon="org" />
            <dd.Checkmark>
              organizationName
            </dd.Checkmark>
          </HdsDropdown>
        {{/if}}
      </:footer>
    </HdsSideNav>
  </template>
}
