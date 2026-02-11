/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import style from 'ember-style-modifier';

// HDS components
import {
  HdsAppSideNav,
  HdsAppSideNavList,
  HdsFormToggleField,
} from '@hashicorp/design-system-components/components';

// types
import type { HdsAppSideNavSignature } from '@hashicorp/design-system-components/components/hds/app-side-nav/index';
import type Owner from '@ember/owner';

export interface MockAppSidebarAppSideNavSignature {
  Args: {
    isResponsive?: HdsAppSideNavSignature['Args']['isResponsive'];
    isCollapsible?: HdsAppSideNavSignature['Args']['isCollapsible'];
    showDevToggle?: boolean;
    onToggleMinimizedStatus?: HdsAppSideNavSignature['Args']['onToggleMinimizedStatus'];
  };
  Blocks: {
    extraAfter?: [];
  };
  Element: HdsAppSideNavSignature['Element'];
}

export default class MockAppSidebarAppSideNav extends Component<MockAppSidebarAppSideNavSignature> {
  isResponsive;
  isCollapsible;
  @tracked showMockInteractionState = false;

  constructor(owner: Owner, args: MockAppSidebarAppSideNavSignature['Args']) {
    super(owner, args);
    this.isResponsive = this.args.isResponsive ?? true;
    this.isCollapsible = this.args.isCollapsible ?? true;
  }

  toggleMockInteractionState = () => {
    this.showMockInteractionState = !this.showMockInteractionState;
  };

  <template>
    <HdsAppSideNav
      @isResponsive={{this.isResponsive}}
      @isCollapsible={{this.isCollapsible}}
      @onToggleMinimizedStatus={{@onToggleMinimizedStatus}}
    >
      <HdsAppSideNavList aria-label="Dashboard" as |SNL|>
        <SNL.Link @icon="dashboard" @text="Dashboard" @isActive={{true}} />
      </HdsAppSideNavList>
      <HdsAppSideNavList aria-label="Services" as |SNL|>
        <SNL.Title>Services</SNL.Title>
        <SNL.Link
          @text={{if this.showMockInteractionState "isActive" "Boundary"}}
          @icon="boundary"
          @href="#"
          class="active"
        />
        <SNL.Link
          @text={{if this.showMockInteractionState ":focus" "Consul"}}
          @icon="consul"
          @href="#"
          class="mock-focus"
        />
        <SNL.Link
          @text={{if this.showMockInteractionState ":hover" "Packer"}}
          @icon="packer"
          @href="#"
          class="mock-hover"
        />
        <SNL.Link
          @text={{if this.showMockInteractionState ":active" "Vault"}}
          @icon="vault"
          @href="#"
          class="mock-active"
        />
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
      <HdsAppSideNavList aria-label="Organization" as |SNL|>
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
        {{#if @showDevToggle}}
          <SNL.ExtraAfter>
            <div {{style margin="32px 6px"}}>
              <HdsFormToggleField
                {{on "change" this.toggleMockInteractionState}}
                as |F|
              >
                <F.Label>Show mock states</F.Label>
              </HdsFormToggleField>
            </div>
          </SNL.ExtraAfter>
        {{/if}}
        {{#if (has-block "extraAfter")}}
          <SNL.ExtraAfter>
            {{yield to="extraAfter"}}
          </SNL.ExtraAfter>
        {{/if}}
      </HdsAppSideNavList>
    </HdsAppSideNav>
  </template>
}
