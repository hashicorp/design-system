/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwFlex from 'showcase/components/shw/flex';

import {
  HdsAppSideNav,
  HdsAppSideNavPortal,
  HdsAppSideNavPortalTarget,
} from '@hashicorp/design-system-components/components';

const SubSectionContent: TemplateOnlyComponent = <template>
  <ShwTextH2>Content</ShwTextH2>

  <ShwTextH3>With generic content</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item @label="Body base invocation">
      <div class="shw-component-sim-app-side-nav-root-container">
        <HdsAppSideNav @isResponsive={{false}}>
          <ShwPlaceholder @text="body" />
        </HdsAppSideNav>
      </div>
    </SF.Item>

    <SF.Item @label="Body (scrollable)">
      <div class="shw-component-sim-app-side-nav-root-container">
        <HdsAppSideNav @isResponsive={{false}}>
          <ShwPlaceholder
            @height="800px"
            @text="body"
            @background="#d2f4ff"
            tabindex="0"
          />
        </HdsAppSideNav>
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwTextH3>With content injected via "portal"</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item @label="Body with PortalTarget/Portal">
      <div class="shw-component-sim-app-side-nav-root-container">
        <HdsAppSideNav @isResponsive={{false}}>
          <HdsAppSideNavPortalTarget @targetName="sidenav-portal-demo-1" />
        </HdsAppSideNav>
      </div>
    </SF.Item>
  </ShwFlex>

  <HdsAppSideNavPortal
    @targetName="sidenav-portal-demo-1"
    @ariaLabel="Primary on portal demo 1"
    as |Nav|
  >
    <Nav.ExtraBefore><ShwPlaceholder
        @height="72px"
        @text="extraBefore"
        @background="#f3d9c5"
      /></Nav.ExtraBefore>
    <Nav.Item><ShwPlaceholder
        @height="200px"
        @text="portaled content"
      /></Nav.Item>
    <Nav.ExtraAfter><ShwPlaceholder
        @height="72px"
        @text="extraAfter"
        @background="#f3d9c5"
      /></Nav.ExtraAfter>
  </HdsAppSideNavPortal>
</template>;

export default SubSectionContent;
