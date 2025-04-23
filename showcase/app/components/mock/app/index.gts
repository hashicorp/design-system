/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { hash } from '@ember/helper';
import style from 'ember-style-modifier';
import MockAppHeaderAppHeader from './header/app-header';
import MockAppSidebarSideNav from './sidebar/app-side-nav';
import MockSidebarSideNav from './sidebar/side-nav';
import MockAppMainPageHeader from './main/page-header';
import MockAppMainGenericTextContent from './main/generic-text-content';
import MockAppMainGenericAdvancedTable from './main/generic-advanced-table';
import MockAppFooterAppFooter from './footer/app-footer';

// HDS components
import { HdsAppFrame } from '@hashicorp/design-system-components/components';

// types
import type { ComponentLike } from '@glint/template';
import type { HdsAppFrameSignature } from '@hashicorp/design-system-components/components/hds/app-frame/index';
import type { MockAppHeaderAppHeaderSignature } from './header/app-header';
import type { MockAppSidebarSideNavSignature } from './sidebar/app-side-nav';
import type { MockSidebarSideNavSignature } from './sidebar/side-nav';
import type { MockAppMainPageHeaderSignature } from './main/page-header';
import type { MockAppMainGenericTextContentSignature } from './main/generic-text-content';
import type { MockAppMainGenericAdvancedTableSignature } from './main/generic-advanced-table';
import type { MockAppFooterAppFooterSignature } from './footer/app-footer';

export interface MockAppSignature {
  Args: {
    hasHeader?: HdsAppFrameSignature['Args']['hasHeader'];
    hasSidebar?: HdsAppFrameSignature['Args']['hasSidebar'];
    hasOldSidebar?: boolean;
    hasFooter?: HdsAppFrameSignature['Args']['hasFooter'];
  };
  Blocks: {
    header?: [
      {
        AppHeader?: ComponentLike<MockAppHeaderAppHeaderSignature>;
      },
    ];
    sidebar?: [
      {
        SideNav?:
          | ComponentLike<MockAppSidebarSideNavSignature>
          | ComponentLike<MockSidebarSideNavSignature>;
      },
    ];
    main?: [
      {
        PageHeader?: ComponentLike<MockAppMainPageHeaderSignature>;
        GenericTextContent?: ComponentLike<MockAppMainGenericTextContentSignature>;
        GenericAdvancedTable?: ComponentLike<MockAppMainGenericAdvancedTableSignature>;
      },
    ];
    footer?: [
      {
        AppFooter?: ComponentLike<MockAppFooterAppFooterSignature>;
      },
    ];
  };
  Element: HdsAppFrameSignature['Element'];
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class MockApp extends Component<MockAppSignature> {
  <template>
    <HdsAppFrame
      @hasHeader={{@hasHeader}}
      @hasSidebar={{@hasSidebar}}
      @hasFooter={{@hasFooter}}
      ...attributes
      as |Frame|
    >
      <Frame.Header>
        {{#if (has-block "header")}}
          {{yield (hash AppHeader=MockAppHeaderAppHeader) to="header"}}
        {{else}}
          <MockAppHeaderAppHeader />
        {{/if}}
      </Frame.Header>
      <Frame.Sidebar>
        {{#if (has-block "sidebar")}}
          {{yield (hash SideNav=MockAppSidebarSideNav) to="sidebar"}}
        {{else}}
          {{#if @hasOldSidebar}}
            <MockSidebarSideNav />
          {{else}}
            <MockAppSidebarSideNav />
          {{/if}}
        {{/if}}
      </Frame.Sidebar>
      <Frame.Main {{style overflow="auto"}}>
        <div class="mock-app-layout-main-content-wrapper">
          {{yield
            (hash
              PageHeader=MockAppMainPageHeader
              GenericTextContent=MockAppMainGenericTextContent
              GenericAdvancedTable=MockAppMainGenericAdvancedTable
            )
            to="main"
          }}
        </div>
      </Frame.Main>
      <Frame.Footer>
        {{#if (has-block "footer")}}
          {{yield (hash AppFooter=MockAppFooterAppFooter) to="footer"}}
        {{else}}
          <MockAppFooterAppFooter />
        {{/if}}
      </Frame.Footer>
    </HdsAppFrame>
  </template>
}
