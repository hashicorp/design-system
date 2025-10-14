/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array } from '@ember/helper';
import { eq } from 'ember-truth-helpers';

import ShwDivider from 'showcase/components/shw/divider';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwGrid from 'showcase/components/shw/grid';
import ShwFlex from 'showcase/components/shw/flex';

import {
  HdsAppSideNavList,
  HdsAppSideNavListTitle,
  HdsAppSideNavListItem,
  HdsAppSideNavListLink,
  HdsBadge,
  HdsBadgeCount,
  HdsAppSideNavListBackLink,
  HdsAppSideNavToggleButton,
} from '@hashicorp/design-system-components/components';

const STATES = ['default', 'hover', 'active', 'focus'];

const SubSectionBaseElements: TemplateOnlyComponent = <template>
  <ShwTextH2>HdsAppSideNavList</ShwTextH2>

  <ShwTextH3>Content</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item @label="Title with multiple items">
      <div class="shw-component-sim-app-side-nav-body">
        <HdsAppSideNavList aria-label="Multiple items" as |SNL|>
          <SNL.Title>Services</SNL.Title>

          <SNL.Link @text="Boundary" @icon="boundary" @href="#" />
          <SNL.Link @text="Consul" @icon="consul" @href="#" />
          <SNL.Link @text="Packer" @icon="packer" @href="#" />
          <SNL.Link @text="Vault" @icon="vault" @href="#" />
          <SNL.Link
            @text="Vault Secrets"
            @icon="vault-secrets-square"
            @badge="Alpha"
            @href="#"
          />
          <SNL.Link @text="Terraform" @icon="terraform" @href="#" />
          <SNL.Link @text="Vagrant" @icon="vagrant" @badge="Alpha" @href="#" />
          <SNL.Link
            @text="Waypoint"
            @icon="waypoint"
            @badge="Alpha"
            @hasSubItems={{true}}
            @href="#"
          />

          <SNL.Title>Default Org</SNL.Title>

          <SNL.Link
            @text="HashiCorp Virtual Networks"
            @icon="network"
            @href="#"
          />
          <SNL.Link @text="Access control (IAM)" @icon="users" @href="#" />
          <SNL.Link @text="Billing" @icon="credit-card" @href="#" />
          <SNL.Link @text="Settings" @icon="settings" @href="#" />
        </HdsAppSideNavList>
      </div>
    </SF.Item>

    <SF.Item @label="Multiple groups">
      <div class="shw-component-sim-app-side-nav-body">
        <HdsAppSideNavList aria-label="Dashboard (multiple groups)" as |SNL|>
          <SNL.Link @text="Dashboard" @icon="dashboard" @href="#" />
        </HdsAppSideNavList>
        <HdsAppSideNavList aria-label="Services (multiple groups)" as |SNL|>
          <SNL.Title>Services</SNL.Title>

          <SNL.Link @text="Boundary" @icon="boundary" @href="#" />
          <SNL.Link @text="Consul" @icon="consul" @href="#" />
          <SNL.Link @text="Packer" @icon="packer" @href="#" />
          <SNL.Link @text="Vault" @icon="vault" @href="#" />
          <SNL.Link
            @text="Vault Secrets"
            @icon="vault-secrets-square"
            @badge="Alpha"
            @href="#"
          />
          <SNL.Link @text="Terraform" @icon="terraform" @href="#" />
          <SNL.Link @text="Vagrant" @icon="vagrant" @badge="Alpha" @href="#" />
          <SNL.Link
            @text="Waypoint"
            @icon="waypoint"
            @badge="Alpha"
            @hasSubItems={{true}}
            @href="#"
          />
        </HdsAppSideNavList>
        <HdsAppSideNavList aria-label="Organization (multiple groups)" as |SNL|>
          <SNL.Title>Default Org</SNL.Title>

          <SNL.Link
            @text="HashiCorp Virtual Networks"
            @icon="network"
            @href="#"
          />
          <SNL.Link @text="Access control (IAM)" @icon="users" @href="#" />
          <SNL.Link @text="Billing" @icon="credit-card" @href="#" />
          <SNL.Link @text="Settings" @icon="settings" @href="#" />
        </HdsAppSideNavList>
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>AppSideNavListTitle</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item @label="Base">
      <ul class="shw-component-sim-app-side-nav-body">
        <HdsAppSideNavListTitle>Group title</HdsAppSideNavListTitle>
        <HdsAppSideNavListItem>
          <ShwPlaceholder @height="108px" @text="following content" />
        </HdsAppSideNavListItem>
      </ul>
    </SF.Item>
    <SF.Item @label="With very long text">
      <ul class="shw-component-sim-app-side-nav-body">
        <HdsAppSideNavListTitle>This is a long text that should go on two lines</HdsAppSideNavListTitle>
        <HdsAppSideNavListItem>
          <ShwPlaceholder @height="108px" @text="following content" />
        </HdsAppSideNavListItem>
      </ul>
    </SF.Item>
    <SF.Item @label="With very long text and no spaces">
      <ul class="shw-component-sim-app-side-nav-body">
        <HdsAppSideNavListTitle
        >ThisIsLongTextThatShouldWrapToTwoLinesAndNotOverflow</HdsAppSideNavListTitle>
        <HdsAppSideNavListItem>
          <ShwPlaceholder @height="108px" @text="following content" />
        </HdsAppSideNavListItem>
      </ul>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>AppSideNavListItem</ShwTextH3>

  <ul class="shw-component-sim-app-side-nav-body">
    <HdsAppSideNavListItem>
      <ShwPlaceholder @height="36px" @text="item" />
    </HdsAppSideNavListItem>
  </ul>

  <ShwDivider @level={{2}} />

  <ShwTextH3>AppSideNavListLink</ShwTextH3>

  <ShwTextH4>Content</ShwTextH4>

  <ShwGrid @columns={{4}} as |SG|>
    <SG.Item @label="Just text">
      <ul class="shw-component-sim-app-side-nav-list-link-wrapper">
        <HdsAppSideNavListLink @text="Boundary" @href="#" />
      </ul>
    </SG.Item>
    <SG.Item @label="Icon + text">
      <ul class="shw-component-sim-app-side-nav-list-link-wrapper">
        <HdsAppSideNavListLink @icon="boundary" @text="Boundary" @href="#" />
      </ul>
    </SG.Item>
    <SG.Item @label="Icon + text + badge">
      <ul class="shw-component-sim-app-side-nav-list-link-wrapper">
        <HdsAppSideNavListLink
          @icon="boundary"
          @text="Boundary"
          @badge="Alpha"
        />
      </ul>
    </SG.Item>
    <SG.Item @label="Icon + text + count">
      <ul class="shw-component-sim-app-side-nav-list-link-wrapper">
        <HdsAppSideNavListLink @icon="boundary" @text="Boundary" @count="3" />
      </ul>
    </SG.Item>
    <SG.Item @label="Icon + text + count + badge">
      <ul class="shw-component-sim-app-side-nav-list-link-wrapper">
        <HdsAppSideNavListLink
          @icon="boundary"
          @text="Boundary"
          @count="3"
          @badge="Alpha"
        />
      </ul>
    </SG.Item>
    <SG.Item @label="Icon + text + yielded badgecount/badge">
      <ul class="shw-component-sim-app-side-nav-list-link-wrapper">
        <HdsAppSideNavListLink @icon="boundary" @text="Boundary">
          <HdsBadgeCount @type="inverted" @size="small" @text="3" />
          <HdsBadge
            @type="inverted"
            @size="small"
            @color="success"
            @text="Beta"
          />
        </HdsAppSideNavListLink>
      </ul>
    </SG.Item>
    <SG.Item @label="Icon + long text">
      <ul class="shw-component-sim-app-side-nav-list-link-wrapper">
        <HdsAppSideNavListLink
          @icon="boundary"
          @text="This is a long text that should go on two lines"
        />
      </ul>
    </SG.Item>
    <SG.Item @label="Icon + long text + count + badge">
      <ul class="shw-component-sim-app-side-nav-list-link-wrapper">
        <HdsAppSideNavListLink
          @icon="boundary"
          @text="This is a long text that should go on two lines"
          @count="3"
          @badge="Alpha"
        />
      </ul>
    </SG.Item>

    <SG.Item @label="Text, hasSubItems">
      <ul class="shw-component-sim-app-side-nav-list-link-wrapper">
        <HdsAppSideNavListLink
          @text="Boundary"
          @href="#"
          @hasSubItems={{true}}
        />
      </ul>
    </SG.Item>
    <SG.Item @label="Icon + text, hasSubItems">
      <ul class="shw-component-sim-app-side-nav-list-link-wrapper">
        <HdsAppSideNavListLink
          @icon="boundary"
          @text="Boundary"
          @href="#"
          @hasSubItems={{true}}
        />
      </ul>
    </SG.Item>
    <SG.Item @label="Icon + text + badge, hasSubItems">
      <ul class="shw-component-sim-app-side-nav-list-link-wrapper">
        <HdsAppSideNavListLink
          @icon="boundary"
          @text="Boundary"
          @badge="Alpha"
          @hasSubItems={{true}}
        />
      </ul>
    </SG.Item>
    <SG.Item @label="Icon + text + count, hasSubItems">
      <ul class="shw-component-sim-app-side-nav-list-link-wrapper">
        <HdsAppSideNavListLink
          @icon="boundary"
          @text="Boundary"
          @count="3"
          @hasSubItems={{true}}
        />
      </ul>
    </SG.Item>
    <SG.Item @label="Icon + text + count + badge, hasSubItems">
      <ul class="shw-component-sim-app-side-nav-list-link-wrapper">
        <HdsAppSideNavListLink
          @icon="boundary"
          @text="Boundary"
          @count="3"
          @badge="Alpha"
          @hasSubItems={{true}}
        />
      </ul>
    </SG.Item>
    <SG.Item @label="Icon + text + yielded badgecount/badge, hasSubItems">
      <ul class="shw-component-sim-app-side-nav-list-link-wrapper">
        <HdsAppSideNavListLink
          @icon="boundary"
          @text="Boundary"
          @hasSubItems={{true}}
        >
          <HdsBadgeCount @type="inverted" @size="small" @text="3" />
          <HdsBadge
            @type="inverted"
            @size="small"
            @color="success"
            @text="Beta"
          />
        </HdsAppSideNavListLink>
      </ul>
    </SG.Item>
    <SG.Item @label="Icon + long text, hasSubItems">
      <ul class="shw-component-sim-app-side-nav-list-link-wrapper">
        <HdsAppSideNavListLink
          @icon="boundary"
          @text="This is a long text that should go on two lines"
          @hasSubItems={{true}}
        />
      </ul>
    </SG.Item>
    <SG.Item @label="Icon + long text + count + badge, hasSubItems">
      <ul class="shw-component-sim-app-side-nav-list-link-wrapper">
        <HdsAppSideNavListLink
          @icon="boundary"
          @text="This is a long text that should go on two lines"
          @count="3"
          @badge="Alpha"
          @hasSubItems={{true}}
        />
      </ul>
    </SG.Item>

    <SG.Item @label="Just yielded content">
      <ul class="shw-component-sim-app-side-nav-list-link-wrapper">
        <HdsAppSideNavListLink>
          <ShwPlaceholder @height="20px" @text="yielded content" />
        </HdsAppSideNavListLink>
      </ul>
    </SG.Item>
    <SG.Item @label="Icon + yielded content">
      {{! we've added an empty label on purpose, to test the layout in this case }}
      <ul class="shw-component-sim-app-side-nav-list-link-wrapper">
        <HdsAppSideNavListLink @icon="boundary" @text="">
          <ShwPlaceholder @height="20px" @text="yielded content" />
        </HdsAppSideNavListLink>
      </ul>
    </SG.Item>
    <SG.Item @label="Icon + text + yielded content">
      <ul class="shw-component-sim-app-side-nav-list-link-wrapper">
        <HdsAppSideNavListLink @icon="boundary" @text="Boundary">
          <ShwPlaceholder
            @height="20px"
            @width="auto"
            @flex="1 1 0"
            @text="yielded content"
          />
        </HdsAppSideNavListLink>
      </ul>
    </SG.Item>
    <SG.Item @label="With hasSubItems">
      <ul class="shw-component-sim-app-side-nav-list-link-wrapper">
        <HdsAppSideNavListLink
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
        </HdsAppSideNavListLink>
      </ul>
    </SG.Item>
    <SG.Item @label="Text with no style">
      <ul class="shw-component-sim-app-side-nav-list-link-wrapper">
        <HdsAppSideNavListLink>
          This text needs local styling
        </HdsAppSideNavListLink>
      </ul>
    </SG.Item>
    <SG.Item @label="Text with local style">
      <ul class="shw-component-sim-app-side-nav-list-link-wrapper">
        <HdsAppSideNavListLink>
          <span class="hds-typography-body-200 hds-font-weight-medium">
            This text is locally styled
          </span>
        </HdsAppSideNavListLink>
      </ul>
    </SG.Item>
    <SG.Item @label="Default link">
      <ul class="shw-component-sim-app-side-nav-list-link-wrapper">
        <HdsAppSideNavListLink
          @icon="hashicorp"
          @text="HashiCorp Cloud Platform"
          @href="#"
        />
      </ul>
    </SG.Item>
    <SG.Item @label="External link">
      <ul class="shw-component-sim-app-side-nav-list-link-wrapper">
        <HdsAppSideNavListLink
          @icon="hashicorp"
          @text="HashiCorp Cloud Platform"
          @isHrefExternal={{true}}
          @href="#"
        />
      </ul>
    </SG.Item>
    <SG.Item @label="Internal link">
      <ul class="shw-component-sim-app-side-nav-list-link-wrapper">
        <HdsAppSideNavListLink
          @icon="hashicorp"
          @text="HashiCorp Cloud Platform"
          @isHrefExternal={{false}}
          @href="#"
        />
      </ul>
    </SG.Item>
  </ShwGrid>

  <ShwTextH4>States</ShwTextH4>

  <ShwGrid @columns={{4}} as |SG|>
    {{#each STATES as |state|}}
      <SG.Item @label={{state}}>
        <ShwFlex as |SF|>
          <SF.Item @grow={{true}}>
            <ul class="shw-component-sim-app-side-nav-list-link-wrapper">
              <HdsAppSideNavListLink @text="Packer" @icon="packer" @href="#" />
              <HdsAppSideNavListLink
                @text="Terraform"
                @icon="terraform"
                @badge="Alpha"
                @count="3"
                @href="#"
                mock-state-value={{state}}
              />
              <HdsAppSideNavListLink
                @text="Vagrant"
                @icon="vagrant"
                @href="#"
              />
            </ul>
          </SF.Item>
          <SF.Item @grow={{true}}>
            <ul class="shw-component-sim-app-side-nav-list-link-wrapper">
              <HdsAppSideNavListLink @text="Packer" @icon="packer" @href="#" />
              <HdsAppSideNavListLink
                @text="This is a long text that should go on two lines"
                @icon="terraform"
                @href="#"
                mock-state-value={{state}}
              />
              <HdsAppSideNavListLink
                @text="Vagrant"
                @icon="vagrant"
                @href="#"
              />
            </ul>
          </SF.Item>
          <SF.Item @grow={{true}}>
            <ul class="shw-component-sim-app-side-nav-list-link-wrapper">
              <HdsAppSideNavListLink @text="Packer" @icon="packer" @href="#" />
              <HdsAppSideNavListLink
                @text="Terraform"
                @icon="terraform"
                @href="#"
                @hasSubItems={{true}}
                mock-state-value={{state}}
              />
              <HdsAppSideNavListLink
                @text="Vagrant"
                @icon="vagrant"
                @href="#"
              />
            </ul>
          </SF.Item>
        </ShwFlex>
      </SG.Item>
    {{/each}}
  </ShwGrid>

  <ShwGrid
    @label="with @isActive=true (link is 'current')"
    @columns={{4}}
    as |SG|
  >
    {{#each STATES as |state|}}
      <SG.Item>
        <ul class="shw-component-sim-app-side-nav-list-link-wrapper">
          <HdsAppSideNavListLink @text="Packer" @icon="packer" @href="#" />
          <HdsAppSideNavListLink
            @text="Terraform"
            @icon="terraform"
            @href="#"
            @hasSubItems={{true}}
            @isActive={{true}}
            mock-state-value={{state}}
          />
          <HdsAppSideNavListLink @text="Vagrant" @icon="vagrant" @href="#" />
        </ul>
      </SG.Item>
    {{/each}}
  </ShwGrid>

  <ShwTextH4>Focus before/after</ShwTextH4>

  {{#let (array "before" "after") as |positions|}}
    {{#each positions as |position|}}
      <ShwGrid @columns={{4}} as |SG|>
        {{#let (array "default" "active") as |states|}}
          {{#each states as |state|}}
            <SG.Item @label="{{state}} / focus {{position}}">
              <ul class="shw-component-sim-app-side-nav-list-link-wrapper">
                <HdsAppSideNavListLink
                  @text="Packer"
                  @icon="packer"
                  @href="#"
                  mock-state-value={{if (eq position "before") "focus"}}
                />
                <HdsAppSideNavListLink
                  @text="Terraform"
                  @icon="terraform"
                  @href="#"
                  mock-state-value={{state}}
                />
                <HdsAppSideNavListLink
                  @text="Vagrant"
                  @icon="vagrant"
                  @href="#"
                  mock-state-value={{if (eq position "after") "focus"}}
                />
              </ul>
            </SG.Item>
          {{/each}}
        {{/let}}
        <SG.Item @label="with @isActive=true / focus {{position}}">
          <ul class="shw-component-sim-app-side-nav-list-link-wrapper">
            <HdsAppSideNavListLink
              @text="Packer"
              @icon="packer"
              @href="#"
              mock-state-value={{if (eq position "before") "focus"}}
            />
            <HdsAppSideNavListLink
              @text="Terraform"
              @icon="terraform"
              @href="#"
              @hasSubItems={{true}}
              @isActive={{true}}
            />
            <HdsAppSideNavListLink
              @text="Vagrant"
              @icon="vagrant"
              @href="#"
              mock-state-value={{if (eq position "after") "focus"}}
            />
          </ul>
        </SG.Item>
      </ShwGrid>
    {{/each}}
  {{/let}}

  <ShwDivider @level={{2}} />

  <ShwTextH3>AppSideNavListBackLink</ShwTextH3>

  <ShwTextH4>Content</ShwTextH4>

  <ShwFlex as |SF|>
    <SF.Item @label="Base">
      <ul class="shw-component-sim-app-side-nav-body">
        <HdsAppSideNavListBackLink @text="Back to parent page" @href="#" />
      </ul>
    </SF.Item>
    <SF.Item @label="With very long text">
      <ul class="shw-component-sim-app-side-nav-body">
        <HdsAppSideNavListBackLink
          @text="This is a long text that should go on two lines"
          @href="#"
        />
      </ul>
    </SF.Item>
    <SF.Item @label="With very long text and no spaces">
      <ul class="shw-component-sim-app-side-nav-body">
        <HdsAppSideNavListBackLink
          @text="ThisIsLongTextThatShouldWrapToTwoLinesAndNotOverflow"
          @href="#"
        />
      </ul>
    </SF.Item>
  </ShwFlex>

  <ShwTextH4>States</ShwTextH4>

  <ShwGrid @columns={{4}} as |SG|>
    {{#each STATES as |state|}}
      <SG.Item @label={{state}}>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <ul class="shw-component-sim-app-side-nav-body">
              <HdsAppSideNavListBackLink
                @text="Back to parent page"
                @href="#"
                mock-state-value={{state}}
              />
            </ul>
          </SF.Item>
          <SF.Item>
            <ul class="shw-component-sim-app-side-nav-body">
              <HdsAppSideNavListBackLink
                @text="This is a long text that should go on two lines"
                @href="#"
                mock-state-value={{state}}
              />
            </ul>
          </SF.Item>
        </ShwFlex>
      </SG.Item>
    {{/each}}
  </ShwGrid>

  <ShwDivider />

  <ShwTextH2>AppSideNavToggleButton</ShwTextH2>

  <ShwTextH3>Content</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item @label="Minimized">
      <div class="shw-component-sim-toggle-button">
        <HdsAppSideNavToggleButton
          aria-label="Open menu"
          @icon="chevrons-right"
        />
      </div>
    </SF.Item>
    <SF.Item @label="Expanded">
      <div class="shw-component-sim-toggle-button">
        <HdsAppSideNavToggleButton
          aria-label="Close menu"
          @icon="chevrons-left"
        />
      </div>
    </SF.Item>
    <SF.Item @label="Custom icon">
      <div class="shw-component-sim-toggle-button">
        <HdsAppSideNavToggleButton aria-label="Menu" @icon="menu" />
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwTextH4>States</ShwTextH4>

  <ShwFlex as |SF|>
    {{#each STATES as |state|}}
      <SF.Item @label={{state}}>
        <div class="shw-component-sim-toggle-button">
          <HdsAppSideNavToggleButton
            aria-label="Close menu"
            @icon="chevrons-left"
            mock-state-value={{state}}
          />
        </div>
      </SF.Item>
    {{/each}}
  </ShwFlex>
</template>;

export default SubSectionBaseElements;
