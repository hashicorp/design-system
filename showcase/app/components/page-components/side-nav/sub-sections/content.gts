/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array } from '@ember/helper';
import { eq } from 'ember-truth-helpers';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';

import {
  HdsSideNav,
  HdsSideNavPortal,
  HdsSideNavPortalTarget,
  HdsSideNavList,
  HdsButton,
  HdsButtonSet,
  HdsDropdown,
  HdsDropdownToggleButton,
  HdsDropdownToggleIcon,
} from '@hashicorp/design-system-components/components';

import ModalWithTrigger from 'showcase/components/page-components/modal/code-fragments/with-trigger';
import SuperSelectWithButtons from 'showcase/components/page-components/form/super-select/code-fragments/with-minimal-content-and-buttons';
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

  <ShwFlex class="shw-component-sidenav-content-examples" as |SF|>
    <SF.Item @label="Fully interactive examples">
      <HdsSideNav @isResponsive={{false}} @hasA11yRefocus={{false}}>
        <:body>
          <HdsSideNavList as |SNL|>
            <SNL.Item>
              <SuperSelectWithButtons @placeholder="SuperSelect" />
            </SNL.Item>
            <SNL.Item>
              <HdsDropdown as |D|>
                <D.ToggleButton @text="Dropdown" />
                <D.Footer>
                  {{! <HdsButtonSet> }}
                  <HdsButton
                    @text="Primary"
                    @isFullWidth={{true}}
                    @size="small"
                  />
                  <HdsButton
                    @text="Secondary"
                    @color="secondary"
                    @size="small"
                  />
                  {{! </HdsButtonSet> }}
                </D.Footer>
              </HdsDropdown>
            </SNL.Item>
            <SNL.Item>
              <ModalWithTrigger @triggerText="Open modal" id="nested-modal">
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
                        @text="Primary"
                        {{on "click" F.close}}
                      />
                      <HdsButton
                        type="button"
                        @text="Secondary"
                        @color="secondary"
                        {{on "click" F.close}}
                      />
                    </HdsButtonSet>
                  </M.Footer>
                </:modal>
              </ModalWithTrigger>
            </SNL.Item>
            <SNL.Item>
              <FlyoutWithTrigger @triggerText="Open flyout" id="nested-flyout">
                <:flyout as |F|>
                  <F.Header>
                    Flyout title
                  </F.Header>
                  <F.Body>
                    <p class="hds-typography-body-300 hds-foreground-primary">
                      Flyout body
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

    <SF.Item as |SFI|>
      <SFI.Label>Buttons without specific parent</SFI.Label>

      <HdsSideNav @isResponsive={{false}} @hasA11yRefocus={{false}}>
        <:body>
          <div>
            <HdsSideNavList as |SNL|>
              <SNL.Item>
                <HdsButton @text="Primary" @size="small" />
              </SNL.Item>
              <SNL.Item>
                <HdsButton @text="Secondary" @color="secondary" @size="small" />
              </SNL.Item>
              <SNL.Item>
                <HdsDropdownToggleButton @text="Dropdown" @size="small" />
              </SNL.Item>
              <SNL.Item>
                <HdsDropdownToggleIcon
                  @text="Dropdown"
                  @icon="more-horizontal"
                  @size="small"
                />
              </SNL.Item>
            </HdsSideNavList>
          </div>
        </:body>
      </HdsSideNav>
    </SF.Item>
  </ShwFlex>

  <ShwTextH4>Nested content using default button styles</ShwTextH4>

  <ShwFlex
    class="shw-component-sidenav-content-examples shw-component-sidenav-ember-basic-dropdown-content-example"
    as |SF|
  >
    {{#let
      (array
        "hds-dropdown__content"
        "ember-basic-dropdown-content"
        "hds-dialog-primitive__wrapper"
      )
      as |classNames|
    }}
      {{#each classNames as |className|}}
        <SF.Item as |SFI|>
          <SFI.Label>in an
            <code>.{{className}}</code>
            parent</SFI.Label>
          <HdsSideNav @isResponsive={{false}} @hasA11yRefocus={{false}}>
            <:body>
              <div class={{className}}>
                <HdsSideNavList as |SNL|>
                  <SNL.Item>
                    <HdsButton @text="Primary" @size="small" />
                  </SNL.Item>
                  <SNL.Item>
                    <HdsButton
                      @text="Secondary"
                      @color="secondary"
                      @size="small"
                    />
                  </SNL.Item>
                  <SNL.Item>
                    <HdsDropdownToggleButton @text="Dropdown" @size="small" />
                  </SNL.Item>
                  <SNL.Item>
                    <HdsDropdownToggleIcon
                      @text="Dropdown"
                      @icon="more-horizontal"
                      @size="small"
                    />
                  </SNL.Item>
                </HdsSideNavList>
              </div>
            </:body>
          </HdsSideNav>
        </SF.Item>
      {{/each}}
    {{/let}}
  </ShwFlex>
</template>;

export default SubSectionContent;
