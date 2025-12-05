/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwPlaceholder from 'showcase/components/shw/placeholder';

import MockAppHeaderAppHeader from 'showcase/components/mock/app/header/app-header';

import { HdsAppFrame } from '@hashicorp/design-system-components/components';

const PageComponentsAppHeaderFramelessDemoResponsiveness: TemplateOnlyComponent =
  <template>
    {{pageTitle "App Header responsiveness demo - Frameless"}}

    <HdsAppFrame as |Frame|>
      <Frame.Header>
        <MockAppHeaderAppHeader />
      </Frame.Header>
      <Frame.Sidebar>
        <ShwPlaceholder
          @width="120px"
          @height="100%"
          @text="sidebar"
          @background="#e4c5f3"
        />
      </Frame.Sidebar>
      <Frame.Main>
        <ShwPlaceholder @height="100%" @text="main" @background="#d2f4ff" />
      </Frame.Main>
      <Frame.Footer>
        <ShwPlaceholder @height="60px" @text="footer" @background="#fff8d2" />
      </Frame.Footer>
    </HdsAppFrame>
  </template>;

export default PageComponentsAppHeaderFramelessDemoResponsiveness;
