/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { hash } from '@ember/helper';
import MockAppHeaderAppHeader from './header/app-header';
import MockAppSidebarSideNav from './sidebar/side-nav';
import MockAppMainPageHeader from './main/page-header';
import MockAppMainGenericTextContent from './main/generic-text-content';
import MockAppMainFormComplex from './main/form-complex';
import MockAppMainTableComplex from './main/table-complex';
import MockAppMainPagination from './main/pagination';
import MockAppFooterAppFooter from './footer/app-footer';

// HDS components
import {
  HdsAlert,
  HdsAppFrame,
} from '@hashicorp/design-system-components/components';

// types
import type { ComponentLike } from '@glint/template';
import type { HdsAppFrameSignature } from '@hashicorp/design-system-components/components/hds/app-frame/index';
import type { MockAppHeaderAppHeaderSignature } from './header/app-header';
import type { MockAppSidebarSideNavSignature } from './sidebar/side-nav';
import type { MockAppMainPageHeaderSignature } from './main/page-header';
import type { MockAppMainGenericTextContentSignature } from './main/generic-text-content';
import type { MockAppMainFormComplexSignature } from './main/form-complex';
import type { MockAppMainTableComplexSignature } from './main/table-complex';
import type { MockAppMainPaginationSignature } from './main/pagination';
import type { MockAppFooterAppFooterSignature } from './footer/app-footer';

export interface MockAppSignature {
  Args: {
    hasPageAlert?: boolean;
    hasHeader?: HdsAppFrameSignature['Args']['hasHeader'];
    hasSidebar?: HdsAppFrameSignature['Args']['hasSidebar'];
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
        SideNav?: ComponentLike<MockAppSidebarSideNavSignature>;
      },
    ];
    main?: [
      {
        PageHeader?: ComponentLike<MockAppMainPageHeaderSignature>;
        GenericTextContent?: ComponentLike<MockAppMainGenericTextContentSignature>;
        MockAppMainFormComplex?: ComponentLike<MockAppMainFormComplexSignature>;
        MockAppMainTableComplex?: ComponentLike<MockAppMainTableComplexSignature>;
        MockAppMainPagination?: ComponentLike<MockAppMainPaginationSignature>;
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
          <MockAppSidebarSideNav />
        {{/if}}
      </Frame.Sidebar>
      <Frame.Main>
        {{#if @hasPageAlert}}
          <HdsAlert @type="page" @color="highlight" as |A|>
            <A.Title>Lorem ipsum</A.Title>
            <A.Description>Lorem ipsum dolor sit amet.</A.Description>
          </HdsAlert>
        {{/if}}
        <div class="mock-app-layout-main-content-wrapper">
          {{yield
            (hash
              PageHeader=MockAppMainPageHeader
              GenericTextContent=MockAppMainGenericTextContent
              FormComplex=MockAppMainFormComplex
              TableComplex=MockAppMainTableComplex
              Pagination=MockAppMainPagination
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
