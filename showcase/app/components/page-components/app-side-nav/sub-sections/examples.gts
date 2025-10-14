/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwGrid from 'showcase/components/shw/grid';
import ShwFlex from 'showcase/components/shw/flex';

import {
  HdsAppSideNav,
  HdsAppSideNavPortal,
  HdsAppSideNavPortalTarget,
  HdsAppSideNavList,
} from '@hashicorp/design-system-components/components';

const SubSectionExamples: TemplateOnlyComponent = <template>
  <ShwTextH2>Examples of sidebar navigation</ShwTextH2>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item>
      <ShwTextH3>Content injected via portal</ShwTextH3>
      <ShwFlex as |SF|>
        <SF.Item @label="With PortalTarget + Portal with “nav” items">
          <div
            class="shw-component-sim-app-side-nav-root-container"
            {{style height="auto"}}
          >
            <HdsAppSideNav @isResponsive={{false}}>
              <HdsAppSideNavPortalTarget @targetName="sidenav-portal-demo-2" />
            </HdsAppSideNav>
          </div>
        </SF.Item>
      </ShwFlex>
      <HdsAppSideNavPortal
        @targetName="sidenav-portal-demo-2"
        @ariaLabel="Primary on portal demo 2"
        as |Nav|
      >
        <Nav.Link @icon="dashboard" @text="Dashboard" @isActive={{true}} />
        <Nav.Title>Services</Nav.Title>
        <Nav.Link @text="Boundary" @icon="boundary" @href="#" />
        <Nav.Link @text="Consul" @icon="consul" @href="#" />
        <Nav.Link @text="Packer" @icon="packer" @href="#" />
        <Nav.Link @text="Vault" @icon="vault" @href="#" />
        <Nav.Link
          @text="Vault Secrets"
          @icon="vault-secrets-square"
          @href="#"
        />
        <Nav.Link @text="Terraform" @icon="terraform" @href="#" />
        <Nav.Link @text="Vagrant" @icon="vagrant" @badge="Alpha" @href="#" />
        <Nav.Link
          @text="Waypoint"
          @icon="waypoint"
          @badge="Alpha"
          @hasSubItems={{true}}
        />
        <Nav.Title>Default Org</Nav.Title>
        <Nav.Link
          @text="HashiCorp Virtual Networks"
          @icon="network"
          @href="#"
        />
        <Nav.Link
          @text="Access control (IAM)"
          @icon="users"
          @href="#"
          @hasSubItems={{true}}
        />
        <Nav.Link
          @text="Billing"
          @icon="credit-card"
          @href="#"
          @hasSubItems={{true}}
        />
        <Nav.Link
          @text="Settings"
          @icon="settings"
          @href="#"
          @hasSubItems={{true}}
        />
        <Nav.Link
          @href="#"
          @isHrefExternal={{true}}
          @icon="guide"
          @text="Documentation"
        />
      </HdsAppSideNavPortal>
    </SG.Item>

    <SG.Item>
      <ShwTextH3>Yielded content</ShwTextH3>

      <ShwFlex as |SF|>
        <SF.Item @label="With product icons using text color">
          <div
            class="shw-component-sim-app-side-nav-root-container"
            {{style height="auto"}}
          >
            <HdsAppSideNav @isResponsive={{false}}>
              <HdsAppSideNavList aria-label="Dashboard" as |SNL|>
                <SNL.Link
                  @icon="dashboard"
                  @text="Dashboard"
                  @isActive={{true}}
                />
              </HdsAppSideNavList>

              <HdsAppSideNavList aria-label="Services" as |SNL|>
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
              </HdsAppSideNavList>
            </HdsAppSideNav>
          </div>
        </SF.Item>
      </ShwFlex>
    </SG.Item>

    <SG.Item>
      <ShwTextH3>Yielded content</ShwTextH3>

      <ShwFlex as |SF|>
        <SF.Item @label="With back link">
          <div class="shw-component-sim-app-side-nav-root-container">
            <HdsAppSideNav @isResponsive={{false}}>
              <HdsAppSideNavList as |SNL|>
                <SNL.BackLink @text="A “back” link" @href="#" />
                <SNL.Title>A section title</SNL.Title>
                <SNL.Link @text="A link with just text" @href="#" />
                <SNL.Link
                  @text="A link with an icon"
                  @icon="network"
                  @href="#"
                />
                <SNL.Link
                  @text="With a “count”"
                  @icon="users"
                  @count="12"
                  @href="#"
                />
                <SNL.Link
                  @text="With a “badge” "
                  @icon="credit-card"
                  @badge="Beta"
                  @href="#"
                />
                <SNL.Link
                  @text="With “sub items” indicator"
                  @icon="settings"
                  @hasSubItems={{true}}
                />
                <SNL.Link
                  @href="#"
                  @isHrefExternal={{true}}
                  @icon="guide"
                  @text="As an “external” link"
                />
              </HdsAppSideNavList>
            </HdsAppSideNav>
          </div>
        </SF.Item>
      </ShwFlex>
    </SG.Item>
  </ShwGrid>
</template>;

export default SubSectionExamples;
