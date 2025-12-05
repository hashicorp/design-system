/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwPlaceholder from 'showcase/components/shw/placeholder';

import {
  HdsSideNav,
  HdsSideNavList,
} from '@hashicorp/design-system-components/components';

interface CodeFragmentWithComplexListContentSignature {
  Args: {
    hasCustomClass?: boolean;
  };
}

const CodeFragmentWithComplexListContent: TemplateOnlyComponent<CodeFragmentWithComplexListContentSignature> =
  <template>
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
        <HdsSideNavList
          class={{if @hasCustomClass "hds-side-nav-hide-when-minimized"}}
          as |SNL|
        >
          <SNL.BackLink @text="A “back” link" @href="#" />
          <SNL.Title>A section title</SNL.Title>
          <SNL.Link @text="A link with just text" @href="#" />
          <SNL.Link @text="A link with an icon" @icon="network" @href="#" />
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
          <SNL.Link @icon="hexagon" @href="#">
            <ShwPlaceholder
              @height="20px"
              @text="With generic yielded content"
              @background="#e4e4e4"
            />
          </SNL.Link>
          <SNL.Item>
            <ShwPlaceholder
              @height="20px"
              @text="Generic yielded content"
              @background="#e4e4e4"
            />
          </SNL.Item>
        </HdsSideNavList>
      </:body>
      <:footer>
        <ShwPlaceholder
          @height="36px"
          @text="footer (hide class)"
          class="hds-side-nav-hide-when-minimized"
        />
      </:footer>
    </HdsSideNav>
  </template>;

export default CodeFragmentWithComplexListContent;
