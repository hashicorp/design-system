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
  HdsSideNavHeader,
  HdsSideNavHeaderHomeLink,
  HdsSideNavPortal,
  HdsSideNavPortalTarget,
  HdsSideNavList,
  HdsButton,
  HdsButtonSet,
  HdsDropdown,
} from '@hashicorp/design-system-components/components';

import ModalWithTrigger from '../../../page-components/modal/code-fragments/with-trigger';
import SuperSelectWithButtons from 'showcase/components/page-components/form/super-select/code-fragments/with-multiple-base-element';
import FlyoutWithTrigger from 'showcase/components/page-components/flyout/code-fragments/with-trigger';

import { on } from '@ember/modifier';

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

  <ShwDivider @level={{2}} />

  <ShwTextH3>With nested button content</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item @label="">
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
              <HdsButton @icon="search" @isIconOnly={{true}} @text="Search" />
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
          <HdsSideNavList as |SNL|>
            <SNL.Item>
              <HdsDropdown as |D|>
                <D.ToggleButton @text="Dropdown" />
                <D.Interactive @href="#">Add</D.Interactive>
                <D.Interactive @href="#">Add More</D.Interactive>
                <D.Interactive @href="#">Add Another Thing Too</D.Interactive>
                <D.Footer @hasDivider={{true}}>
                  <HdsButtonSet>
                    <HdsButton
                      @text="Apply filters"
                      @isFullWidth={{true}}
                      @size="small"
                    />
                    <HdsButton
                      @text="Cancel"
                      @color="secondary"
                      @size="small"
                    />
                  </HdsButtonSet>
                </D.Footer>
              </HdsDropdown>
            </SNL.Item>
            <SNL.Item>
              <SuperSelectWithButtons @isSelected={{true}} />
            </SNL.Item>
            <SNL.Item>
              <ModalWithTrigger @triggerText="Open modal" id="basic-modal">
                <:modal as |M|>
                  <M.Header>
                    Modal title
                  </M.Header>
                  <M.Body>
                    <p class="hds-typography-body-300 hds-foreground-primary">
                      Modal content
                    </p>
                  </M.Body>
                  <M.Footer as |F|>
                    <HdsButtonSet>
                      <HdsButton
                        type="submit"
                        @text="Leave Beta"
                        {{on "click" F.close}}
                      />
                      <HdsButton
                        type="button"
                        @text="Cancel"
                        @color="secondary"
                        {{on "click" F.close}}
                      />
                    </HdsButtonSet>
                  </M.Footer>
                </:modal>
              </ModalWithTrigger>
            </SNL.Item>
            <SNL.Item>
              <FlyoutWithTrigger
                @triggerText="Open medium flyout"
                id="medium-flyout"
              >
                <:flyout as |F|>
                  <F.Header>
                    Medium flyout title
                  </F.Header>
                  <F.Body>
                    <p class="hds-typography-body-300 hds-foreground-primary">
                      Aliquam ac enim iaculis, faucibus enim id, dapibus quam.
                      Nunc nibh mi, vehicula sed enim eget, lacinia venenatis
                      tortor. Quisque vitae accumsan est, eu vehicula arcu.
                      Pellentesque ut turpis tortor. Curabitur eu turpis nec
                      tellus vehicula imperdiet finibus in magna. Fusce
                      tincidunt condimentum tristique. Ut mauris enim, finibus
                      pulvinar vulputate at, ultrices ut purus. Aenean tincidunt
                      eros a scelerisque blandit. Praesent vel fermentum velit,
                      nec sodales turpis. Suspendisse ac rhoncus urna. Donec
                      fermentum, justo aliquam facilisis sodales, quam magna
                      pulvinar turpis, ut commodo diam ex ut arcu. Ut suscipit
                      nisi sed bibendum pretium. Quisque efficitur, arcu quis
                      congue consectetur, ex lorem euismod arcu, id viverra
                      velit lacus non odio. Vestibulum ac mauris tortor.
                      Pellentesque nec dignissim libero.
                    </p>
                    <p class="hds-typography-body-300 hds-foreground-primary">
                      Duis euismod semper egestas. Vivamus consectetur augue eu
                      mattis suscipit. Ut libero ipsum, sollicitudin a ornare
                      ornare, consectetur eget mauris. Pellentesque sodales
                      ligula eget purus congue molestie. Vivamus dolor magna,
                      condimentum at consectetur vestibulum, mollis a purus.
                      Aliquam malesuada arcu quis orci imperdiet accumsan. Donec
                      pharetra odio libero, id cursus ipsum tristique vitae.
                      Morbi placerat hendrerit massa vel varius. Vestibulum ante
                      ipsum primis in faucibus orci luctus et ultrices posuere
                      cubilia curae; Donec maximus porttitor ipsum, sed
                      ultricies est fermentum at. In dignissim luctus ex vel
                      condimentum.
                    </p>
                    <p class="hds-typography-body-300 hds-foreground-primary">
                      Nulla facilisi. Mauris consequat vehicula nunc, ut rutrum
                      elit posuere quis. Duis convallis elit ac nibh viverra
                      dapibus. Quisque eu laoreet arcu, in pharetra sapien.
                      Nulla velit urna, elementum non dignissim in, gravida et
                      dui. Praesent tincidunt vel leo sed ornare. Proin finibus
                      metus dictum odio blandit dictum. Donec ipsum tellus,
                      molestie nec aliquam sit amet, sollicitudin non neque.
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </F.Body>
                  <F.Footer as |FF|>
                    <HdsButtonSet>
                      <HdsButton
                        type="submit"
                        @text="Primary"
                        {{on "click" FF.close}}
                      />
                      <HdsButton
                        type="button"
                        @text="Secondary"
                        @color="secondary"
                        {{on "click" FF.close}}
                      />
                    </HdsButtonSet>
                  </F.Footer>
                </:flyout>
              </FlyoutWithTrigger>
            </SNL.Item>
          </HdsSideNavList>
        </:body>
      </HdsSideNav>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionContent;
