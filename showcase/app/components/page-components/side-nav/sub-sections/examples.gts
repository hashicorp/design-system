/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import CodeFragmentWithComplexListContent from 'showcase/components/page-components/side-nav/code-fragments/with-complex-list-content';
import CodeFragmentWithDemoAppListContent from 'showcase/components/page-components/side-nav/code-fragments/with-demo-app-list-content';

import {
  HdsButton,
  HdsDropdown,
  HdsSideNav,
  HdsSideNavHeader,
  HdsSideNavHeaderHomeLink,
  HdsSideNavPortal,
  HdsSideNavPortalTarget,
} from '@hashicorp/design-system-components/components';

const SubSectionExamples: TemplateOnlyComponent = <template>
  <ShwTextH2>Examples of sidebar navigation</ShwTextH2>

  <ShwGrid @columns={{2}} as |SG|>

    <SG.Item>
      <ShwTextH3>Using content injected via portal</ShwTextH3>
      <ShwFlex as |SF|>
        <SF.Item @label="With PortalTarget + Portal with “nav” items">
          <div
            class="shw-component-sim-side-nav-root-container"
            {{style height="auto"}}
          >
            <HdsSideNav @isResponsive={{false}} @hasA11yRefocus={{false}}>
              <:header>
                <HdsSideNavHeader>
                  <:logo>
                    <HdsSideNavHeaderHomeLink
                      @icon="hashicorp"
                      @ariaLabel="HashiCorp"
                      @href="#"
                    />
                  </:logo>
                  <:actions>
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
              </:header>
              <:body>
                <HdsSideNavPortalTarget @targetName="sidenav-portal-demo-2" />
              </:body>
              <:footer>
                <span>OrgSelect / ContextSwitcher</span>
              </:footer>
            </HdsSideNav>
          </div>
        </SF.Item>
      </ShwFlex>
      <HdsSideNavPortal
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
      </HdsSideNavPortal>

    </SG.Item>
    <SG.Item>
      <ShwTextH3>Using yielded content</ShwTextH3>

      <ShwFlex as |SF|>
        <SF.Item
          @label="With multiple 'list' (nav) containers & extra button in header"
        >
          <div
            class="shw-component-sim-side-nav-root-container"
            {{style height="auto"}}
          >
            <HdsSideNav @isResponsive={{false}} @hasA11yRefocus={{false}}>
              <:header>
                <HdsSideNavHeader>
                  <:logo>
                    <HdsSideNavHeaderHomeLink
                      @icon="hashicorp"
                      @ariaLabel="HashiCorp"
                      @href="#"
                    />
                  </:logo>
                  <:actions>
                    <HdsButton
                      @icon="search"
                      @isIconOnly={{true}}
                      @text="Search"
                    />
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
              </:header>

              <:body>
                <CodeFragmentWithDemoAppListContent
                  @hasDashboardLink={{true}}
                />
              </:body>

              <:footer>
                <span>OrgSelect / ContextSwitcher</span>
              </:footer>
            </HdsSideNav>
          </div>
        </SF.Item>
      </ShwFlex>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Only body content (used with AppHeader)</ShwTextH3>

  <div class="shw-component-sim-side-nav-root-container">
    <HdsSideNav @isResponsive={{false}} @hasA11yRefocus={{false}}>
      <:body>
        <CodeFragmentWithDemoAppListContent @hasDashboardLink={{true}} />
      </:body>
    </HdsSideNav>
  </div>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Collapsible</ShwTextH3>

  <ShwGrid @columns={{3}} @gap="3rem" as |SG|>
    <SG.Item @label="w/o special class used on content">
      <div class="shw-component-sim-side-nav-root-container">
        <HdsSideNav
          @isResponsive={{true}}
          @hasA11yRefocus={{false}}
          @isCollapsible={{true}}
        >
          <:header>
            <ShwPlaceholder @text="header" @height="72px" />
          </:header>
          <:body>
            <ShwPlaceholder @text="body" />
          </:body>
          <:footer>
            <ShwPlaceholder @text="footer" @height="36px" />
          </:footer>
        </HdsSideNav>
      </div>
    </SG.Item>
    <SG.Item @label="with special class used on body & footer">
      <div class="shw-component-sim-side-nav-root-container">
        <HdsSideNav
          @isResponsive={{true}}
          @hasA11yRefocus={{false}}
          @isCollapsible={{true}}
        >
          <:header>
            <ShwPlaceholder @text="header" @height="72px" />
          </:header>
          <:body>
            <ShwPlaceholder
              @text="body (hide class)"
              class="hds-side-nav-hide-when-minimized"
            />
          </:body>
          <:footer>
            <ShwPlaceholder
              @text="footer (hide class)"
              @height="36px"
              class="hds-side-nav-hide-when-minimized"
            />
          </:footer>
        </HdsSideNav>
      </div>
    </SG.Item>
    <SG.Item @label="generic body injected via portal">
      <div class="shw-component-sim-side-nav-root-container">
        <HdsSideNav
          @isResponsive={{true}}
          @hasA11yRefocus={{false}}
          @isCollapsible={{true}}
        >
          <:header>
            <ShwPlaceholder
              @height="72px"
              @text="header (hide class)"
              class="hds-side-nav-hide-when-minimized"
            />
          </:header>
          <:body>
            <HdsSideNavPortalTarget @targetName="sidenav-portal-demo-3a" />
          </:body>
          <:footer>
            <ShwPlaceholder
              @height="36px"
              @text="footer (hide class)"
              class="hds-side-nav-hide-when-minimized"
            />
          </:footer>
        </HdsSideNav>
      </div>
    </SG.Item>
    <SG.Item as |SGI|>
      <SGI.Label><code>SideNav::List</code> as body</SGI.Label>
      <div class="shw-component-sim-side-nav-root-container">
        <CodeFragmentWithComplexListContent />
      </div>
    </SG.Item>
    <SG.Item as |SGI|>
      <SGI.Label><code>SideNav::List</code> with special class</SGI.Label>
      <div class="shw-component-sim-side-nav-root-container">
        <CodeFragmentWithComplexListContent @hasCustomClass={{true}} />
      </div>
    </SG.Item>
    <SG.Item as |SGI|>
      <SGI.Label><code>SideNav::List</code>
        body injected via portal</SGI.Label>
      <div class="shw-component-sim-side-nav-root-container">
        <HdsSideNav
          @isResponsive={{true}}
          @hasA11yRefocus={{false}}
          @isCollapsible={{true}}
        >
          <:header>
            <ShwPlaceholder
              @height="72px"
              @text="header (hide class)"
              class="hds-side-nav-hide-when-minimized"
            />
          </:header>
          <:body>
            <HdsSideNavPortalTarget @targetName="sidenav-portal-demo-3b" />
          </:body>
          <:footer>
            <ShwPlaceholder
              @height="36px"
              @text="footer (hide class)"
              class="hds-side-nav-hide-when-minimized"
            />
          </:footer>
        </HdsSideNav>
      </div>
    </SG.Item>
  </ShwGrid>

  <HdsSideNavPortal
    @targetName="sidenav-portal-demo-3a"
    @ariaLabel="Primary on portal demo 3a"
    as |Nav|
  >
    <Nav.ExtraBefore>
      <ShwPlaceholder
        @height="72px"
        @text="extraBefore"
        @background="#f3d9c5"
      />
    </Nav.ExtraBefore>
    <Nav.Item>
      <ShwPlaceholder @height="200px" @text="portaled content" />
    </Nav.Item>
    <Nav.ExtraAfter>
      <ShwPlaceholder @height="72px" @text="extraAfter" @background="#f3d9c5" />
    </Nav.ExtraAfter>
  </HdsSideNavPortal>

  <HdsSideNavPortal
    @targetName="sidenav-portal-demo-3b"
    @ariaLabel="Primary on portal demo 3b"
    as |Nav|
  >
    <Nav.BackLink @text="A “back” link" @href="#" />
    <Nav.Title>A section title</Nav.Title>
    <Nav.Link @text="A link with just text" @href="#" />
    <Nav.Link @text="A link with an icon" @icon="network" @href="#" />
    <Nav.Link @text="With a “count”" @icon="users" @count="12" @href="#" />
    <Nav.Link
      @text="With a “badge” "
      @icon="credit-card"
      @badge="Beta"
      @href="#"
    />
    <Nav.Link
      @text="With “sub items” indicator"
      @icon="settings"
      @hasSubItems={{true}}
    />
    <Nav.Link
      @href="#"
      @isHrefExternal={{true}}
      @icon="guide"
      @text="As an “external” link"
    />
    <Nav.Link @icon="hexagon" @href="#">
      <ShwPlaceholder
        @height="20px"
        @text="With generic yielded content"
        @background="#e4e4e4"
      />
    </Nav.Link>
    <Nav.Item>
      <ShwPlaceholder
        @height="20px"
        @text="Generic yielded content"
        @background="#e4e4e4"
      />
    </Nav.Item>
  </HdsSideNavPortal>
</template>;

export default SubSectionExamples;
