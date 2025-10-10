/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';
import { eq, notEq } from 'ember-truth-helpers';
import style from 'ember-style-modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';

import {
  HdsBadge,
  HdsBadgeCount,
  HdsButton,
  HdsButtonSet,
  HdsDropdown,
  HdsDropdownToggleButton,
  HdsDropdownToggleIcon,
  HdsSideNavBase,
  HdsSideNavHeader,
  HdsSideNavHeaderHomeLink,
  HdsSideNavHeaderIconButton,
  HdsSideNavListBackLink,
  HdsSideNavListItem,
  HdsSideNavListLink,
  HdsSideNavListTitle,
  HdsSideNavToggleButton,
} from '@hashicorp/design-system-components/components';
import { COLORS as DROPDOWN_TOGGLE_BUTTON_COLORS } from '@hashicorp/design-system-components/components/hds/dropdown/toggle/button';
import type { HdsButtonColors } from '@hashicorp/design-system-components/components/hds/button/types';

import CodeFragmentWithDemoAppListContent from 'showcase/components/page-components/side-nav/code-fragments/with-demo-app-list-content';

const STATES = ['default', 'hover', 'active', 'focus', 'disabled'];
const BUTTON_COLORS: HdsButtonColors[] = ['primary', 'secondary'];

const SideNavIndex: TemplateOnlyComponent = <template>
  <ShwTextH2>SideNavBase</ShwTextH2>

  <ShwFlex as |SF|>
    <SF.Item @label="Header + Body + Footer">
      <div class="shw-component-sim-side-nav-root-container">
        <HdsSideNavBase>
          <:root>
            <ShwPlaceholder @height="72px" @text="root" />
          </:root>
          <:header>
            <ShwPlaceholder @height="72px" @text="header" />
          </:header>
          <:body>
            <ShwPlaceholder @height="250px" @text="body" />
          </:body>
          <:footer>
            <ShwPlaceholder @height="36px" @text="footer" />
          </:footer>
        </HdsSideNavBase>
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwDivider />

  <ShwTextH2>SideNavHeader</ShwTextH2>

  <ShwFlex as |SF|>
    <SF.Item @label="Logo (generic) + Actions (generic)">
      <div class="shw-component-sim-side-nav-header">
        <HdsSideNavHeader>
          <:logo>
            <ShwPlaceholder @height="100%" @width="100%" @text="generic" />
          </:logo>
          <:actions>
            <ShwPlaceholder @height="36px" @width="60px" @text="action" />
            <ShwPlaceholder @height="36px" @width="60px" @text="action" />
          </:actions>
        </HdsSideNavHeader>
      </div>
    </SF.Item>
    <SF.Item @label="Logo (HomeLink) + Actions (Dropdowns)">
      <div class="shw-component-sim-side-nav-header">
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
      </div>
    </SF.Item>
    <SF.Item @label="Logo (HomeLink) + Actions (IconButton + Dropdown)">
      <div class="shw-component-sim-side-nav-header">
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
              @icon="terminal-screen"
              @isIconOnly={{true}}
              @text="Terminal"
            />
            <HdsDropdown @enableCollisionDetection={{true}} as |dd|>
              <dd.ToggleButton @text="Help" />
              <dd.Title @text="Help & Support" />
              <dd.Interactive @href="#">Documentation</dd.Interactive>
              <dd.Interactive @href="#">Tutorials</dd.Interactive>
              <dd.Interactive @href="#">Terraform Provider</dd.Interactive>
              <dd.Interactive @href="#">Changelog</dd.Interactive>
              <dd.Separator />
              <dd.Interactive @href="#">Create support ticket</dd.Interactive>
              <dd.Interactive @href="#">Give feedback</dd.Interactive>
            </HdsDropdown>
          </:actions>
        </HdsSideNavHeader>
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>SideNavHeaderHomeLink</ShwTextH3>

  <ShwTextH4>Content</ShwTextH4>

  <ShwFlex as |SF|>
    <SF.Item @label="Icon">
      <div class="shw-component-side-nav-home-link-wrapper">
        <HdsSideNavHeaderHomeLink
          @icon="hashicorp"
          @ariaLabel="HashiCorp"
          @href="#"
        />
      </div>
    </SF.Item>
    <SF.Item @label="Icon with custom color">
      <div class="shw-component-side-nav-home-link-wrapper">
        <HdsSideNavHeaderHomeLink
          @icon="boundary"
          @ariaLabel="Boundary"
          @color="var(--token-color-boundary-brand)"
          @href="#"
        />
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwTextH4>States</ShwTextH4>

  <ShwFlex as |SF|>
    {{#each STATES as |state|}}
      <SF.Item @label={{state}}>
        <div class="shw-component-side-nav-home-link-wrapper">
          <HdsSideNavHeaderHomeLink
            @icon="hashicorp"
            @ariaLabel="HashiCorp"
            @href="#"
            mock-state-value={{state}}
          />
        </div>
      </SF.Item>
    {{/each}}
  </ShwFlex>
  <ShwFlex as |SF|>
    {{#each STATES as |state|}}
      <SF.Item>
        <div class="shw-component-side-nav-home-link-wrapper">
          <HdsSideNavHeaderHomeLink
            @icon="boundary"
            @ariaLabel="Boundary"
            @color="var(--token-color-boundary-brand)"
            @href="#"
            mock-state-value={{state}}
          />
        </div>
      </SF.Item>
    {{/each}}
  </ShwFlex>

  <ShwDivider @level={{2}} />
  {{! TODO: Once IconButton is fully deprecated, remove from examples }}
  <ShwTextH3>SideNavHeaderIconButton (deprecated)</ShwTextH3>

  <ShwTextH4>States</ShwTextH4>
  <ShwFlex as |SF|>
    {{#each STATES as |state|}}
      <SF.Item @label={{state}}>
        <div class="shw-component-sim-side-nav-elem-wrapper">
          <HdsSideNavHeaderIconButton
            @icon="search"
            @ariaLabel="Search"
            mock-state-value={{state}}
          />
        </div>
      </SF.Item>
    {{/each}}
  </ShwFlex>

  <ShwDivider />

  <ShwTextH2>HdsSideNavList</ShwTextH2>

  <ShwTextH3>Content</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item @label="Title with multiple items">
      <div class="shw-component-sim-side-nav-body">
        <CodeFragmentWithDemoAppListContent />
      </div>
    </SF.Item>

    <SF.Item @label="Multiple groups">
      <div class="shw-component-sim-side-nav-body">
        <CodeFragmentWithDemoAppListContent @hasDashboardLink={{true}} />
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>SideNavListTitle</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item @label="Base">
      <ul class="shw-component-sim-side-nav-body">
        <HdsSideNavListTitle>Group title</HdsSideNavListTitle>
        <HdsSideNavListItem>
          <ShwPlaceholder @height="108px" @text="following content" />
        </HdsSideNavListItem>
      </ul>
    </SF.Item>
    <SF.Item @label="With very long text">
      <ul class="shw-component-sim-side-nav-body">
        <HdsSideNavListTitle>This is a long text that should go on two lines</HdsSideNavListTitle>
        <HdsSideNavListItem>
          <ShwPlaceholder @height="108px" @text="following content" />
        </HdsSideNavListItem>
      </ul>
    </SF.Item>
    <SF.Item @label="With very long text and no spaces">
      <ul class="shw-component-sim-side-nav-body">
        <HdsSideNavListTitle
        >ThisIsLongTextThatShouldWrapToTwoLinesAndNotOverflow</HdsSideNavListTitle>
        <HdsSideNavListItem>
          <ShwPlaceholder @height="108px" @text="following content" />
        </HdsSideNavListItem>
      </ul>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>SideNavListItem</ShwTextH3>

  <ul class="shw-component-sim-side-nav-body">
    <HdsSideNavListItem>
      <ShwPlaceholder @height="36px" @text="item" />
    </HdsSideNavListItem>
  </ul>

  <ShwDivider @level={{2}} />

  <ShwTextH3>SideNavListLink</ShwTextH3>

  <ShwTextH4>Content</ShwTextH4>

  <ShwGrid @columns={{4}} as |SG|>
    <SG.Item @label="Just text">
      <HdsSideNavListLink @text="Boundary" @href="#" />
    </SG.Item>
    <SG.Item @label="Icon + text">
      <HdsSideNavListLink @icon="boundary" @text="Boundary" @href="#" />
    </SG.Item>
    <SG.Item @label="Icon + text + badge">
      <HdsSideNavListLink @icon="boundary" @text="Boundary" @badge="Alpha" />
    </SG.Item>
    <SG.Item @label="Icon + text + count">
      <HdsSideNavListLink @icon="boundary" @text="Boundary" @count="3" />
    </SG.Item>
    <SG.Item @label="Icon + text + count + badge">
      <HdsSideNavListLink
        @icon="boundary"
        @text="Boundary"
        @count="3"
        @badge="Alpha"
      />
    </SG.Item>
    <SG.Item @label="Icon + text + yielded badgecount/badge">
      <HdsSideNavListLink @icon="boundary" @text="Boundary">
        <HdsBadgeCount
          @type="inverted"
          @size="small"
          @color="neutral-dark-mode"
          @text="3"
        />
        <HdsBadge
          @type="inverted"
          @size="small"
          @color="success"
          @text="Beta"
        />
      </HdsSideNavListLink>
    </SG.Item>
    <SG.Item @label="Icon + long text">
      <HdsSideNavListLink
        @icon="boundary"
        @text="This is a long text that should go on two lines"
      />
    </SG.Item>
    <SG.Item @label="Icon + long text + count + badge">
      <HdsSideNavListLink
        @icon="boundary"
        @text="This is a long text that should go on two lines"
        @count="3"
        @badge="Alpha"
      />
    </SG.Item>

    <SG.Item @label="Text, hasSubItems">
      <HdsSideNavListLink @text="Boundary" @href="#" @hasSubItems={{true}} />
    </SG.Item>
    <SG.Item @label="Icon + text, hasSubItems">
      <HdsSideNavListLink
        @icon="boundary"
        @text="Boundary"
        @href="#"
        @hasSubItems={{true}}
      />
    </SG.Item>
    <SG.Item @label="Icon + text + badge, hasSubItems">
      <HdsSideNavListLink
        @icon="boundary"
        @text="Boundary"
        @badge="Alpha"
        @hasSubItems={{true}}
      />
    </SG.Item>
    <SG.Item @label="Icon + text + count, hasSubItems">
      <HdsSideNavListLink
        @icon="boundary"
        @text="Boundary"
        @count="3"
        @hasSubItems={{true}}
      />
    </SG.Item>
    <SG.Item @label="Icon + text + count + badge, hasSubItems">
      <HdsSideNavListLink
        @icon="boundary"
        @text="Boundary"
        @count="3"
        @badge="Alpha"
        @hasSubItems={{true}}
      />
    </SG.Item>
    <SG.Item @label="Icon + text + yielded badgecount/badge, hasSubItems">
      <HdsSideNavListLink
        @icon="boundary"
        @text="Boundary"
        @hasSubItems={{true}}
      >
        <HdsBadgeCount
          @type="inverted"
          @size="small"
          @color="neutral-dark-mode"
          @text="3"
        />
        <HdsBadge
          @type="inverted"
          @size="small"
          @color="success"
          @text="Beta"
        />
      </HdsSideNavListLink>
    </SG.Item>
    <SG.Item @label="Icon + long text, hasSubItems">
      <HdsSideNavListLink
        @icon="boundary"
        @text="This is a long text that should go on two lines"
        @hasSubItems={{true}}
      />
    </SG.Item>
    <SG.Item @label="Icon + long text + count + badge, hasSubItems">
      <HdsSideNavListLink
        @icon="boundary"
        @text="This is a long text that should go on two lines"
        @count="3"
        @badge="Alpha"
        @hasSubItems={{true}}
      />
    </SG.Item>

    <SG.Item @label="Just yielded content">
      <HdsSideNavListLink>
        <ShwPlaceholder @height="20px" @text="yielded content" />
      </HdsSideNavListLink>
    </SG.Item>
    <SG.Item @label="Icon + yielded content">
      {{! we've added an empty label on purpose, to test the layout in this case }}
      <HdsSideNavListLink @icon="boundary" @text="">
        <ShwPlaceholder @height="20px" @text="yielded content" />
      </HdsSideNavListLink>
    </SG.Item>
    <SG.Item @label="Icon + text + yielded content">
      <HdsSideNavListLink @icon="boundary" @text="Boundary">
        <ShwPlaceholder
          @height="20px"
          @width="auto"
          @flex="1 1 0"
          @text="yielded content"
        />
      </HdsSideNavListLink>
    </SG.Item>
    <SG.Item @label="With hasSubItems">
      <HdsSideNavListLink
        @icon="boundary"
        @text="Boundary"
        @hasSubItems={{true}}
      >
        <ShwPlaceholder
          @height="20px"
          @width="auto"
          @flex="1 1 0"
          @text="yielded content"
        />
      </HdsSideNavListLink>
    </SG.Item>
    <SG.Item @label="Text with no style">
      <HdsSideNavListLink>
        This text needs local styling
      </HdsSideNavListLink>
    </SG.Item>
    <SG.Item @label="Text with local style">
      <HdsSideNavListLink>
        <span class="hds-typography-body-200 hds-font-weight-medium">
          This text is locally styled
        </span>
      </HdsSideNavListLink>
    </SG.Item>
    <SG.Item @label="Default link">
      <HdsSideNavListLink
        @icon="hashicorp"
        @text="HashiCorp Cloud Platform"
        @href="#"
      />
    </SG.Item>
    <SG.Item @label="External link">
      <HdsSideNavListLink
        @icon="hashicorp"
        @text="HashiCorp Cloud Platform"
        @href="#"
        @isHrefExternal={{true}}
      />
    </SG.Item>
    <SG.Item @label="Internal link">
      <HdsSideNavListLink
        @icon="hashicorp"
        @text="HashiCorp Cloud Platform"
        @href="#"
        @isHrefExternal={{false}}
      />
    </SG.Item>
  </ShwGrid>

  <ShwTextH4>States</ShwTextH4>

  <ShwGrid @columns={{4}} as |SG|>
    {{#each STATES as |state|}}
      {{#if (notEq state "disabled")}}
        <SG.Item @label={{state}}>
          <ShwFlex as |SF|>
            <SF.Item @grow={{true}}>
              <div class="shw-component-sim-side-nav-list-link-wrapper">
                <HdsSideNavListLink
                  @text="Boundary"
                  @icon="boundary"
                  @badge="Alpha"
                  @count="3"
                  @href="#"
                  mock-state-value={{state}}
                />
              </div>
            </SF.Item>
            <SF.Item @grow={{true}}>
              <div class="shw-component-sim-side-nav-list-link-wrapper">
                <HdsSideNavListLink
                  @text="This is a long text that should go on two lines"
                  @icon="boundary"
                  @href="#"
                  mock-state-value={{state}}
                />
              </div>
            </SF.Item>
            <SF.Item @grow={{true}}>
              <div class="shw-component-sim-side-nav-list-link-wrapper">
                <HdsSideNavListLink
                  @text="Boundary"
                  @icon="boundary"
                  @hasSubItems={{true}}
                  mock-state-value={{state}}
                />
              </div>
            </SF.Item>
          </ShwFlex>
        </SG.Item>
      {{/if}}
    {{/each}}
  </ShwGrid>

  <ShwGrid
    @label="with @isActive=true (link is 'current')"
    @columns={{4}}
    as |SG|
  >
    {{#each STATES as |state|}}
      {{#if (notEq state "disabled")}}
        <SG.Item>
          <div class="shw-component-sim-side-nav-list-link-wrapper">
            <HdsSideNavListLink
              @text="Boundary"
              @icon="boundary"
              @href="#"
              @hasSubItems={{true}}
              @isActive={{true}}
              mock-state-value={{state}}
            />
          </div>
        </SG.Item>
      {{/if}}
    {{/each}}
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>SideNavListBackLink</ShwTextH3>

  <ShwTextH4>Content</ShwTextH4>

  <ShwFlex as |SF|>
    <SF.Item @label="Base">
      <ul class="shw-component-sim-side-nav-body">
        <HdsSideNavListBackLink @text="Back to parent page" @href="#" />
      </ul>
    </SF.Item>
    <SF.Item @label="With very long text">
      <ul class="shw-component-sim-side-nav-body">
        <HdsSideNavListBackLink
          @text="This is a long text that should go on two lines"
          @href="#"
        />
      </ul>
    </SF.Item>
    <SF.Item @label="With very long text and no spaces">
      <ul class="shw-component-sim-side-nav-body">
        <HdsSideNavListBackLink
          @text="ThisIsLongTextThatShouldWrapToTwoLinesAndNotOverflow"
          @href="#"
        />
      </ul>
    </SF.Item>
  </ShwFlex>

  <ShwTextH4>States</ShwTextH4>

  <ShwGrid @columns={{4}} as |SG|>
    {{#each STATES as |state|}}
      {{#if (notEq state "disabled")}}
        <SG.Item @label={{state}}>
          <ShwFlex @direction="column" as |SF|>
            <SF.Item>
              <ul class="shw-component-sim-side-nav-body">
                <HdsSideNavListBackLink
                  @text="Back to parent page"
                  @href="#"
                  mock-state-value={{state}}
                />
              </ul>
            </SF.Item>
            <SF.Item>
              <ul class="shw-component-sim-side-nav-body">
                <HdsSideNavListBackLink
                  @text="This is a long text that should go on two lines"
                  @href="#"
                  mock-state-value={{state}}
                />
              </ul>
            </SF.Item>
          </ShwFlex>
        </SG.Item>
      {{/if}}
    {{/each}}
  </ShwGrid>

  <ShwDivider />

  <ShwTextH2>SideNavToggleButton</ShwTextH2>

  <ShwTextH3>Content</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item @label="Minimized">
      <div class="shw-component-sim-toggle-button">
        <HdsSideNavToggleButton aria-label="Open menu" @icon="chevrons-right" />
      </div>
    </SF.Item>
    <SF.Item @label="Expanded">
      <div class="shw-component-sim-toggle-button">
        <HdsSideNavToggleButton aria-label="Close menu" @icon="chevrons-left" />
      </div>
    </SF.Item>
    <SF.Item @label="Custom icon">
      <div class="shw-component-sim-toggle-button">
        <HdsSideNavToggleButton aria-label="Menu" @icon="menu" />
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwTextH4>States</ShwTextH4>

  <ShwFlex as |SF|>
    {{#each STATES as |state|}}
      {{#if (notEq state "disabled")}}
        <SF.Item @label={{state}}>
          <div class="shw-component-sim-toggle-button">
            <HdsSideNavToggleButton
              aria-label="Close menu"
              @icon="chevrons-left"
              mock-state-value={{state}}
            />
          </div>
        </SF.Item>
      {{/if}}
    {{/each}}
  </ShwFlex>

  <ShwDivider />

  {{! TODO: Reorganize after other SideNav Showcase updates including nested interactive content examples are ready}}
  <ShwTextH2>Nested Dropdown</ShwTextH2>

  <ShwGrid @columns={{4}} as |SG|>
    <SG.Item @label="With nested content" {{style padding-bottom="11em"}}>
      <div class="hds-side-nav">
        <HdsDropdown
          @height="284px"
          @listPosition="bottom-left"
          @isOpen={{true}}
          as |D|
        >
          <D.ToggleIcon @icon="help" @text="help menu" />
          <D.Generic>
            <HdsDropdown as |D|>
              <D.ToggleButton @text="Menu" />
              <D.Interactive @href="#">Add</D.Interactive>
              <D.Interactive @href="#">Add More</D.Interactive>
              <D.Interactive @href="#">Add Another Thing Too</D.Interactive>
            </HdsDropdown>
          </D.Generic>
          <D.Checkbox>access</D.Checkbox>
          <D.Checkbox>homework</D.Checkbox>
          <D.Footer @hasDivider={{true}}>
            <HdsButtonSet>
              <HdsButton
                @text="Apply filters"
                @isFullWidth={{true}}
                @size="small"
              />
              <HdsButton @text="Cancel" @color="secondary" @size="small" />
              <HdsDropdown as |D|>
                <D.ToggleButton @text="Menu" />
                <D.Interactive @href="#">Add</D.Interactive>
                <D.Interactive @href="#">Add More</D.Interactive>
                <D.Interactive @href="#">Add Another Thing Too</D.Interactive>
              </HdsDropdown>
            </HdsButtonSet>
          </D.Footer>
        </HdsDropdown>
      </div>
    </SG.Item>
  </ShwGrid>

  <ShwDivider />

  <div class="shw-component-button-examples-section">
    <ShwTextH2>Child interactive components</ShwTextH2>

    <ShwTextH3>Buttons within SideNav</ShwTextH3>

    <ShwTextH4>States</ShwTextH4>

    {{#each BUTTON_COLORS as |color|}}
      <ShwTextBody>{{capitalize color}}</ShwTextBody>
      <ShwFlex as |SF|>
        {{#each STATES as |state|}}
          <SF.Item @label={{state}}>
            <div class="hds-side-nav">
              <HdsButton
                @icon="search"
                @isIconOnly={{true}}
                @text="Search"
                @color={{color}}
                mock-state-value={{state}}
                disabled={{eq state "disabled"}}
              />
            </div>
          </SF.Item>
        {{/each}}
      </ShwFlex>
    {{/each}}

    <ShwDivider @level={{2}} />

    <ShwTextH3>Dropdowns within SideNav</ShwTextH3>

    <ShwTextH4>States</ShwTextH4>

    <ShwGrid
      @columns={{6}}
      class="shw-component-sidenav-dropdown-states-matrix"
      as |SG|
    >
      {{! Notice: we use a non-standard way to showcase the states to reduce the (visual) complexity of this matrix }}

      {{#each STATES as |state|}}
        <SG.Item>
          <span class="shw-label">{{capitalize state}}</span>
        </SG.Item>
      {{/each}}
      <SG.Item>
        <span class="shw-label">Open</span>
      </SG.Item>

      {{#each DROPDOWN_TOGGLE_BUTTON_COLORS as |color|}}
        {{#each STATES as |state|}}
          <SG.Item @label="{{capitalize color}}">
            <div class="hds-side-nav">
              {{#if (eq state "disabled")}}
                <HdsDropdownToggleButton
                  @text="Lorem ipsum"
                  @color={{color}}
                  disabled
                />
              {{else}}
                <HdsDropdownToggleButton
                  @text="Lorem ipsum"
                  @color={{color}}
                  mock-state-value={{state}}
                />
              {{/if}}
            </div>
          </SG.Item>
        {{/each}}

        <SG.Item @label="{{capitalize color}}">
          <div class="hds-side-nav">
            <HdsDropdownToggleButton
              @text="Lorem ipsum"
              @isOpen={{true}}
              @color={{color}}
            />
          </div>
        </SG.Item>

        {{#each STATES as |state|}}
          <SG.Item @label="With icon">
            <div class="hds-side-nav">
              {{#if (eq state "disabled")}}
                <HdsDropdownToggleButton
                  @icon="hexagon"
                  @text="Lorem"
                  @color={{color}}
                  disabled
                />
              {{else}}
                <HdsDropdownToggleButton
                  @icon="hexagon"
                  @text="Lorem"
                  @color={{color}}
                  mock-state-value={{state}}
                />
              {{/if}}
            </div>
          </SG.Item>
        {{/each}}
        <SG.Item @label="With icon">
          <div class="hds-side-nav">
            <HdsDropdownToggleButton
              @icon="hexagon"
              @text="Lorem"
              @isOpen={{true}}
              @color={{color}}
            />
          </div>
        </SG.Item>
        {{#each STATES as |state|}}
          <SG.Item @label="With count">
            <div class="hds-side-nav">
              {{#if (eq state "disabled")}}
                <HdsDropdownToggleButton
                  @count="12"
                  @text="Lorem"
                  @color={{color}}
                  disabled
                />
              {{else}}
                <HdsDropdownToggleButton
                  @count="12"
                  @text="Lorem"
                  @color={{color}}
                  mock-state-value={{state}}
                />
              {{/if}}
            </div>
          </SG.Item>
        {{/each}}
        <SG.Item @label="With count">
          <div class="hds-side-nav">
            <HdsDropdownToggleButton
              @count="12"
              @text="Lorem"
              @isOpen={{true}}
              @color={{color}}
            />
          </div>
        </SG.Item>
        {{#each STATES as |state|}}
          <SG.Item @label="With badge">
            <div class="hds-side-nav">
              {{#if (eq state "disabled")}}
                <HdsDropdownToggleButton
                  @badge="Sit"
                  @badgeIcon="hexagon"
                  @text="Lorem"
                  @color={{color}}
                  disabled
                />
              {{else}}
                <HdsDropdownToggleButton
                  @badge="Sit"
                  @badgeIcon="hexagon"
                  @text="Lorem"
                  @color={{color}}
                  mock-state-value={{state}}
                />
              {{/if}}
            </div>
          </SG.Item>
        {{/each}}
        <SG.Item @label="With badge">
          <div class="hds-side-nav">
            <HdsDropdownToggleButton
              @badge="Sit"
              @badgeIcon="hexagon"
              @text="Lorem"
              @isOpen={{true}}
              @color={{color}}
            />
          </div>
        </SG.Item>
      {{/each}}

      {{#each STATES as |state|}}
        <SG.Item @label="Icon">
          <div class="hds-side-nav">
            <HdsDropdownToggleIcon
              @icon="more-horizontal"
              @text="overflow menu"
              @hasChevron={{false}}
              mock-state-value={{state}}
            />
          </div>
        </SG.Item>
      {{/each}}
      <SG.Item @label="Icon">
        <div class="hds-side-nav">
          <HdsDropdownToggleIcon
            @icon="more-horizontal"
            @text="overflow menu"
            @hasChevron={{false}}
            @isOpen={{true}}
          />
        </div>
      </SG.Item>

      {{#each STATES as |state|}}
        <SG.Item @label="Icon+chevron">
          <div class="hds-side-nav">
            <HdsDropdownToggleIcon
              @icon="user"
              @text={{state}}
              mock-state-value={{state}}
            />
          </div>
        </SG.Item>
      {{/each}}
      <SG.Item @label="Icon+chevron">
        <div class="hds-side-nav">
          <HdsDropdownToggleIcon @icon="user" @text="open" @isOpen={{true}} />
        </div>
      </SG.Item>

      {{#each STATES as |state|}}
        <SG.Item @label="Avatar+chevron">
          <div class="hds-side-nav">
            <HdsDropdownToggleIcon
              @text={{state}}
              @imageSrc="/assets/images/avatar.png"
              mock-state-value={{state}}
            />
          </div>
        </SG.Item>
      {{/each}}
      <SG.Item @label="Avatar+chevron">
        <div class="hds-side-nav">
          <HdsDropdownToggleIcon
            @text="open"
            @isOpen={{true}}
            @imageSrc="/assets/images/avatar.png"
          />
        </div>
      </SG.Item>
    </ShwGrid>
  </div>
</template>;

export default SideNavIndex;
