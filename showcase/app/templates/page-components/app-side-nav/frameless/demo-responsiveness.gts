/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import { HdsAppFrame } from '@hashicorp/design-system-components/components';

import ShwPlaceholder from 'showcase/components/shw/placeholder';
import MockAppSidebarAppSideNav from 'showcase/components/mock/app/sidebar/app-side-nav';

const PageComponentsAppSideNavFramelessDemoResponsiveness: TemplateOnlyComponent =
  <template>
    {{pageTitle "App SideNav responsiveness demo - Frameless"}}

    <HdsAppFrame as |Frame|>
      <Frame.Header>
        <ShwPlaceholder @height="60px" @text="header" @background="#e5ffd2" />
      </Frame.Header>
      <Frame.Sidebar>
        <MockAppSidebarAppSideNav />
      </Frame.Sidebar>
      <Frame.Main>
        <ShwPlaceholder @height="100%" @text="main" @background="#d2f4ff" />
      </Frame.Main>
      <Frame.Footer>
        <ShwPlaceholder @height="60px" @text="footer" @background="#fff8d2" />
      </Frame.Footer>
    </HdsAppFrame>
  </template>;

export default PageComponentsAppSideNavFramelessDemoResponsiveness;
