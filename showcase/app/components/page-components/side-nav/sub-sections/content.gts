/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import {
  HdsSideNav,
  HdsSideNavPortal,
  HdsSideNavPortalTarget,
} from '@hashicorp/design-system-components/components';

const SubSectionContent: TemplateOnlyComponent = <template>
  <ShwTextH2>Content</ShwTextH2>

  <ShwTextH3>With generic content</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item @label="Header + Body + Footer, base invocation">
      <div class="shw-component-sim-side-nav-root-container">
        <HdsSideNav @isResponsive={{false}} @hasA11yRefocus={{false}}>
          <:header>
            <ShwPlaceholder @text="header" />
          </:header>
          <:body>
            <ShwPlaceholder @text="body" />
          </:body>
          <:footer>
            <ShwPlaceholder @text="footer" />
          </:footer>
        </HdsSideNav>
      </div>
    </SF.Item>
    <SF.Item @label="Header + Body + Footer, heights declared">
      <div class="shw-component-sim-side-nav-root-container">
        <HdsSideNav @isResponsive={{false}} @hasA11yRefocus={{false}}>
          <:header>
            <ShwPlaceholder @text="header" @height="72px" />
          </:header>
          <:body>
            <ShwPlaceholder @text="body" @height="300px" />
          </:body>
          <:footer>
            <ShwPlaceholder @text="footer" @height="36px" />
          </:footer>
        </HdsSideNav>
      </div>
    </SF.Item>
    <SF.Item @label="Header (with extra) + Body (with extra) + Footer">
      <div class="shw-component-sim-side-nav-root-container">
        <HdsSideNav @isResponsive={{false}} @hasA11yRefocus={{false}}>
          <:header>
            <ShwPlaceholder @height="72px" @text="header" />
            <ShwPlaceholder
              @height="60px"
              @text="extra content for 'header'"
              @background="#e4c5f3"
              id="ec-header"
            />
          </:header>
          <:body>
            <ShwPlaceholder @height="250px" @text="body" />
            <ShwPlaceholder
              @height="60px"
              @text="extra content for 'body'"
              @background="#e4c5f3"
            />
          </:body>
          <:footer>
            <ShwPlaceholder @height="36px" @text="footer" />
          </:footer>
        </HdsSideNav>
      </div>
    </SF.Item>
    <SF.Item @label="Header + Body (scrollable) + Footer">
      <div class="shw-component-sim-side-nav-root-container">
        <HdsSideNav @isResponsive={{false}} @hasA11yRefocus={{false}}>
          <:header>
            <ShwPlaceholder @height="72px" @text="header" />
          </:header>
          <:body>
            <ShwPlaceholder
              @height="500px"
              @text="body"
              @background="#d2f4ff"
              tabindex="0"
            />
          </:body>
          <:footer>
            <ShwPlaceholder @height="36px" @text="footer" />
          </:footer>
        </HdsSideNav>
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>With content injected via "portal"</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item @label="Header + Body with PortalTarget/Portal + Footer">
      <div class="shw-component-sim-side-nav-root-container">
        <HdsSideNav @isResponsive={{false}} @hasA11yRefocus={{false}}>
          <:header>
            <ShwPlaceholder @height="72px" @text="header" />
          </:header>
          <:body>
            <HdsSideNavPortalTarget @targetName="sidenav-portal-demo-1" />
          </:body>
          <:footer>
            <ShwPlaceholder @height="36px" @text="footer" />
          </:footer>
        </HdsSideNav>
      </div>
    </SF.Item>
  </ShwFlex>

  <HdsSideNavPortal
    @targetName="sidenav-portal-demo-1"
    @ariaLabel="Primary on portal demo 1"
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
</template>;

export default SubSectionContent;
