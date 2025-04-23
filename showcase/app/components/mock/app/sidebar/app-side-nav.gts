/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

// HDS components
import {
  HdsAppSideNav,
  HdsAppSideNavList,
} from '@hashicorp/design-system-components/components';

// types
import type { HdsAppSideNavSignature } from '@hashicorp/design-system-components/components/hds/app-side-nav/index';
import type Owner from '@ember/owner';

export interface MockAppSidebarSideNavSignature {
  Args: {
    isResponsive?: HdsAppSideNavSignature['Args']['isResponsive'];
    isCollapsible?: HdsAppSideNavSignature['Args']['isCollapsible'];
    showHeader?: boolean;
    showFooter?: boolean;
  };
  Element: HdsAppSideNavSignature['Element'];
}

export default class MockAppSidebarSideNav extends Component<MockAppSidebarSideNavSignature> {
  isResponsive;
  isCollapsible;
  showHeader;
  showFooter;

  constructor(owner: Owner, args: MockAppSidebarSideNavSignature['Args']) {
    super(owner, args);
    this.isResponsive = this.args.isResponsive ?? true;
    this.isCollapsible = this.args.isCollapsible ?? true;
    this.showHeader = this.args.showHeader ?? true;
    this.showFooter = this.args.showFooter ?? true;
  }

  <template>
    <HdsAppSideNav
      @isResponsive={{this.isResponsive}}
      @isCollapsible={{this.isCollapsible}}
    >
      <HdsAppSideNavList
        class="hds-side-nav-hide-when-minimized"
        aria-label="Dashboard"
        as |SNL|
      >
        <SNL.Link @icon="dashboard" @text="Dashboard" @isActive={{true}} />
      </HdsAppSideNavList>
      <HdsAppSideNavList
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
      </HdsAppSideNavList>
      <HdsAppSideNavList
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
      </HdsAppSideNavList>
    </HdsAppSideNav>
  </template>
}
