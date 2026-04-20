/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { capitalize } from '@ember/string';
import { eq } from 'ember-truth-helpers';
import style from 'ember-style-modifier';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import {
  HdsAppHeader,
  HdsAppHeaderHomeLink,
  HdsAppHeaderMenuButton,
  HdsButton,
  HdsDropdown,
} from '@hashicorp/design-system-components/components';

const STATES = ['default', 'hover', 'active', 'focus', 'disabled'];

const AppHeaderCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "AppHeader - Carbonization"}}

  <ShwTextH1>AppHeader - Carbonization</ShwTextH1>

  <section>
    <ShwTextH2>Content</ShwTextH2>

    <ShwTextH3>Basic header with logo</ShwTextH3>

    <ShwCarbonizationComparisonGrid @layout="column">
      <:theming>
        <HdsAppHeader @hasA11yRefocus={{false}}>
          <:logo>
            <HdsAppHeaderHomeLink
              @icon="hashicorp"
              @text="HashiCorp"
              @href="#"
            />
          </:logo>
        </HdsAppHeader>
      </:theming>
      <:reference>
        <cds-header aria-label="HashiCorp">
          <cds-header-name href="#" prefix="">HashiCorp</cds-header-name>
        </cds-header>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Header with navigation and actions</ShwTextH3>

    <ShwCarbonizationComparisonGrid @layout="column">
      <:theming>
        <HdsAppHeader @hasA11yRefocus={{false}}>
          <:logo>
            <HdsAppHeaderHomeLink
              @icon="hashicorp"
              @text="HashiCorp"
              @href="#"
            />
          </:logo>
          <:globalActions>
            <HdsDropdown @enableCollisionDetection={{true}} as |D|>
              <D.ToggleButton @text="Choose an organization" @icon="org" />
              <D.Checkmark>organizationName</D.Checkmark>
            </HdsDropdown>
          </:globalActions>
          <:utilityActions>
            <HdsDropdown @enableCollisionDetection={{true}} as |D|>
              <D.ToggleButton @text="Europe" @icon="globe" />
              <D.Checkmark>Americas</D.Checkmark>
            </HdsDropdown>
            <HdsButton
              @icon="search"
              @isIconOnly={{true}}
              @text="Search"
              @color="secondary"
            />
            <HdsDropdown @enableCollisionDetection={{true}} as |D|>
              <D.ToggleIcon @icon="help" @text="help menu" />
              <D.Title @text="Help & Support" />
              <D.Interactive @href="#">Documentation</D.Interactive>
              <D.Interactive @href="#">Tutorials</D.Interactive>
              <D.Interactive @href="#">Terraform Provider</D.Interactive>
              <D.Interactive @href="#">Changelog</D.Interactive>
              <D.Separator />
              <D.Interactive @href="#">Create support ticket</D.Interactive>
              <D.Interactive @href="#">Give feedback</D.Interactive>
            </HdsDropdown>
            <HdsDropdown @enableCollisionDetection={{true}} as |D|>
              <D.ToggleIcon @icon="user" @text="user menu" />
              <D.Title @text="Signed In" />
              <D.Description @text="email@domain.com" />
              <D.Interactive @href="#">Account Settings</D.Interactive>
            </HdsDropdown>
          </:utilityActions>
        </HdsAppHeader>
      </:theming>
      <:reference>
        <cds-header aria-label="HashiCorp">
          <cds-header-menu-button
            button-label-active="Close menu"
            button-label-inactive="Open menu"
          ></cds-header-menu-button>
          <cds-header-name href="#">HashiCorp</cds-header-name>
          <cds-header-nav menu-bar-label="HashiCorp">
            <cds-header-menu
              menu-label="Choose an organization"
              trigger-content="Choose an organization"
            >
              <cds-header-menu-item
                href="#"
              >organizationName</cds-header-menu-item>
            </cds-header-menu>
          </cds-header-nav>
          <div class="cds--header__global">
            <cds-header-global-action aria-label="Search" tooltip-text="Search">
              <svg
                focusable="false"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                slot="icon"
                width="20"
                height="20"
                viewBox="0 0 32 32"
                aria-hidden="true"
              ><path
                  d="M29,27.5859l-7.5521-7.5521a11.0177,11.0177,0,1,0-1.4141,1.4141L27.5859,29ZM4,13a9,9,0,1,1,9,9A9.01,9.01,0,0,1,4,13Z"
                ></path></svg>
            </cds-header-global-action>
            <cds-header-global-action
              aria-label="Notification"
              tooltip-text="Notification"
            >
              <svg
                focusable="false"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                slot="icon"
                width="20"
                height="20"
                viewBox="0 0 32 32"
                aria-hidden="true"
              ><path
                  d="M28.7071,19.293,26,16.5859V13a10.0136,10.0136,0,0,0-9-9.9492V1H15V3.0508A10.0136,10.0136,0,0,0,6,13v3.5859L3.2929,19.293A1,1,0,0,0,3,20v3a1,1,0,0,0,1,1h7v.7768a5.152,5.152,0,0,0,4.5,5.1987A5.0057,5.0057,0,0,0,21,25V24h7a1,1,0,0,0,1-1V20A1,1,0,0,0,28.7071,19.293ZM19,25a3,3,0,0,1-6,0V24h6Zm8-3H5V20.4141L7.707,17.707A1,1,0,0,0,8,17V13a8,8,0,0,1,16,0v4a1,1,0,0,0,.293.707L27,20.4141Z"
                ></path></svg>
            </cds-header-global-action>
            <cds-header-global-action
              aria-label="App Switcher"
              tooltip-text="App Switcher"
              tooltip-alignment="right"
            >
              <svg
                focusable="false"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                slot="icon"
                width="20"
                height="20"
                viewBox="0 0 32 32"
                aria-hidden="true"
              ><path d="M14 4H18V8H14z"></path><path
                  d="M4 4H8V8H4z"
                ></path><path d="M24 4H28V8H24z"></path><path
                  d="M14 14H18V18H14z"
                ></path><path d="M4 14H8V18H4z"></path><path
                  d="M24 14H28V18H24z"
                ></path><path d="M14 24H18V28H14z"></path><path
                  d="M4 24H8V28H4z"
                ></path><path d="M24 24H28V28H24z"></path></svg>
            </cds-header-global-action>
          </div>
        </cds-header>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>With text</ShwTextH3>

    <ShwCarbonizationComparisonGrid @layout="column">
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <HdsAppHeader @hasA11yRefocus={{false}}>
              <:logo>
                <HdsAppHeaderHomeLink
                  @icon="terraform"
                  @text="Terraform Admin Console"
                  @isIconOnly={{false}}
                  @href="#"
                />
              </:logo>
              <:utilityActions>
                <HdsDropdown @enableCollisionDetection={{true}} as |D|>
                  <D.ToggleIcon @icon="user" @text="user menu" />
                  <D.Title @text="Signed In" />
                  <D.Description @text="email@domain.com" />
                  <D.Interactive @href="#">Account Settings</D.Interactive>
                </HdsDropdown>
              </:utilityActions>
            </HdsAppHeader>
          </SF.Item>
          <SF.Item>
            <HdsAppHeader @hasA11yRefocus={{false}}>
              <:logo>
                <HdsAppHeaderHomeLink
                  @icon="terraform"
                  @text="Terraform Admin Console"
                  @isIconOnly={{false}}
                  @href="#"
                />
              </:logo>
              <:globalActions>
                <HdsDropdown @enableCollisionDetection={{true}} as |D|>
                  <D.ToggleButton @text="Choose an organization" @icon="org" />
                  <D.Checkmark>organizationName</D.Checkmark>
                </HdsDropdown>
              </:globalActions>
              <:utilityActions>
                <HdsDropdown @enableCollisionDetection={{true}} as |D|>
                  <D.ToggleIcon @icon="user" @text="user menu" />
                  <D.Title @text="Signed In" />
                  <D.Description @text="email@domain.com" />
                  <D.Interactive @href="#">Account Settings</D.Interactive>
                </HdsDropdown>
              </:utilityActions>
            </HdsAppHeader>
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <cds-header aria-label="Terrafrorm Admin Console">
              <cds-header-menu-button
                button-label-active="Close menu"
                button-label-inactive="Open menu"
              ></cds-header-menu-button>
              <cds-header-name href="#">Terraform Admin Console</cds-header-name>
              <div class="cds--header__global">
                <cds-header-global-action
                  aria-label="App Switcher"
                  tooltip-text="App Switcher"
                  tooltip-alignment="right"
                >
                  <svg
                    focusable="false"
                    preserveAspectRatio="xMidYMid meet"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    slot="icon"
                    width="20"
                    height="20"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  ><path d="M14 4H18V8H14z"></path><path
                      d="M4 4H8V8H4z"
                    ></path><path d="M24 4H28V8H24z"></path><path
                      d="M14 14H18V18H14z"
                    ></path><path d="M4 14H8V18H4z"></path><path
                      d="M24 14H28V18H24z"
                    ></path><path d="M14 24H18V28H14z"></path><path
                      d="M4 24H8V28H4z"
                    ></path><path d="M24 24H28V28H24z"></path></svg>
                </cds-header-global-action>
              </div>
            </cds-header>
          </SF.Item>
          <SF.Item>
            <cds-header aria-label="Terrafrorm Admin Console">
              <cds-header-menu-button
                button-label-active="Close menu"
                button-label-inactive="Open menu"
              ></cds-header-menu-button>
              <cds-header-name href="#">Terraform Admin Console</cds-header-name>
              <cds-header-nav menu-bar-label="HashiCorp">
                <cds-header-menu
                  menu-label="Choose an organization"
                  trigger-content="Choose an organization"
                >
                  <cds-header-menu-item
                    href="#"
                  >organizationName</cds-header-menu-item>
                </cds-header-menu>
              </cds-header-nav>
              <div class="cds--header__global">
                <cds-header-global-action
                  aria-label="App Switcher"
                  tooltip-text="App Switcher"
                  tooltip-alignment="right"
                >
                  <svg
                    focusable="false"
                    preserveAspectRatio="xMidYMid meet"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    slot="icon"
                    width="20"
                    height="20"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  ><path d="M14 4H18V8H14z"></path><path
                      d="M4 4H8V8H4z"
                    ></path><path d="M24 4H28V8H24z"></path><path
                      d="M14 14H18V18H14z"
                    ></path><path d="M4 14H8V18H4z"></path><path
                      d="M24 14H28V18H24z"
                    ></path><path d="M14 24H18V28H14z"></path><path
                      d="M4 24H8V28H4z"
                    ></path><path d="M24 24H28V28H24z"></path></svg>
                </cds-header-global-action>
              </div>
            </cds-header>
          </SF.Item>
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH2>Base elements</ShwTextH2>

    <ShwTextH3>AppHeaderHomeLink</ShwTextH3>

    <ShwTextBody>States</ShwTextBody>

    {{#each STATES as |state|}}
      <ShwCarbonizationComparisonGrid @label={{capitalize state}}>
        <:theming>
          <div class="hds-app-header">
            <ShwFlex @direction="column" {{style align-items="start"}} as |SF|>
              <SF.Item>
                <HdsAppHeaderHomeLink
                  @icon="hashicorp"
                  @text="HashiCorp"
                  @href="#"
                  mock-state-value={{unless (eq state "default") state}}
                />
              </SF.Item>
              <SF.Item>
                <HdsAppHeaderHomeLink
                  @icon="hashicorp"
                  @text="HashiCorp Cloud Platform"
                  @isIconOnly={{false}}
                  @href="#"
                  mock-state-value={{unless (eq state "default") state}}
                />
              </SF.Item>
            </ShwFlex>
          </div>
        </:theming>
        <:reference>
          {{#if (eq state "default")}}
            <ShwFlex @direction="column" as |SF|>
              <SF.Item>
                <cds-header-name href="#" prefix="">HashiCorp</cds-header-name>
              </SF.Item>
              <SF.Item>
                <cds-header-name href="#" prefix="">HashiCorp Cloud Platform</cds-header-name>
              </SF.Item>
            </ShwFlex>
          {{else}}
            <pre>TODO: add static image here</pre>
          {{/if}}
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    <ShwDivider @level={{2}} />

    <ShwTextH3>AppHeaderMenuButton</ShwTextH3>

    <ShwTextBody>States</ShwTextBody>

    {{#each STATES as |state|}}
      <ShwCarbonizationComparisonGrid @label={{capitalize state}}>
        <:theming>
          <div class="hds-app-header" id="demo-app-header-{{state}}">
            <ShwFlex @direction="column" {{style align-items="start"}} as |SF|>
              <SF.Item>
                <HdsAppHeaderMenuButton
                  @menuContentId="demo-app-header-{{state}}"
                  mock-state-value={{unless (eq state "default") state}}
                />
              </SF.Item>
              <SF.Item>
                <HdsAppHeaderMenuButton
                  @menuContentId="demo-app-header-{{state}}"
                  @isOpen={{true}}
                  mock-state-value={{unless (eq state "default") state}}
                />
              </SF.Item>
            </ShwFlex>
          </div>
        </:theming>
        <:reference as |R|>
          <R.NoEquivalent @isCompact={{true}} />
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    <ShwDivider @level={{2}} />

    <ShwTextH3>Buttons within AppHeader</ShwTextH3>

    <ShwTextBody>States</ShwTextBody>

    {{#each STATES as |state|}}
      <ShwCarbonizationComparisonGrid @label={{capitalize state}}>
        <:theming>
          <div class="hds-app-header">
            <HdsButton
              @icon="search"
              @isIconOnly={{true}}
              @text="Search"
              @color="secondary"
              mock-state-value={{unless (eq state "default") state}}
            />
          </div>
        </:theming>
        <:reference>
          {{#if (eq state "default")}}
            <cds-header-global-action aria-label="Search" tooltip-text="Search">
              <svg
                focusable="false"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                slot="icon"
                width="20"
                height="20"
                viewBox="0 0 32 32"
                aria-hidden="true"
              ><path
                  d="M29,27.5859l-7.5521-7.5521a11.0177,11.0177,0,1,0-1.4141,1.4141L27.5859,29ZM4,13a9,9,0,1,1,9,9A9.01,9.01,0,0,1,4,13Z"
                ></path></svg>
            </cds-header-global-action>
          {{else}}
            <pre>TODO: add static image here</pre>
          {{/if}}
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    <ShwDivider @level={{2}} />

    <ShwTextH3>Dropdowns within AppHeader</ShwTextH3>

    {{#each STATES as |state|}}
      <ShwCarbonizationComparisonGrid @label={{capitalize state}}>
        <:theming>
          <div class="hds-app-header">
            <ShwFlex @direction="column" as |SF|>
              <SF.Item>
                <HdsDropdown @enableCollisionDetection={{true}} as |D|>
                  <D.ToggleButton
                    @text="Text only"
                    mock-state-value={{unless (eq state "default") state}}
                  />
                  <D.Interactive @href="#">Item 1</D.Interactive>
                </HdsDropdown>
              </SF.Item>
              <SF.Item>
                <HdsDropdown @enableCollisionDetection={{true}} as |D|>
                  <D.ToggleButton
                    @text="With icon"
                    @icon="hexagon"
                    mock-state-value={{unless (eq state "default") state}}
                  />
                  <D.Interactive @href="#">Item 1</D.Interactive>
                </HdsDropdown>
              </SF.Item>
              <SF.Item>
                <HdsDropdown @enableCollisionDetection={{true}} as |D|>
                  <D.ToggleButton
                    @text="With count"
                    @count="12"
                    mock-state-value={{unless (eq state "default") state}}
                  />
                  <D.Interactive @href="#">Item 1</D.Interactive>
                </HdsDropdown>
              </SF.Item>
              <SF.Item>
                <HdsDropdown @enableCollisionDetection={{true}} as |D|>
                  <D.ToggleButton
                    @text="With badge"
                    @badge="New"
                    @badgeIcon="hexagon"
                    mock-state-value={{unless (eq state "default") state}}
                  />
                  <D.Interactive @href="#">Item 1</D.Interactive>
                </HdsDropdown>
              </SF.Item>
              <SF.Item>
                <HdsDropdown @enableCollisionDetection={{true}} as |D|>
                  <D.ToggleIcon
                    @icon="more-horizontal"
                    @text="Icon only"
                    @hasChevron={{false}}
                    mock-state-value={{unless (eq state "default") state}}
                  />
                  <D.Interactive @href="#">Item 1</D.Interactive>
                </HdsDropdown>
              </SF.Item>
              <SF.Item>
                <HdsDropdown @enableCollisionDetection={{true}} as |D|>
                  <D.ToggleIcon
                    @icon="user"
                    @text="Icon+chevron"
                    mock-state-value={{unless (eq state "default") state}}
                  />
                  <D.Interactive @href="#">Item 1</D.Interactive>
                </HdsDropdown>
              </SF.Item>
              <SF.Item>
                <HdsDropdown @enableCollisionDetection={{true}} as |D|>
                  <D.ToggleIcon
                    @text="Avatar+chevron"
                    @imageSrc="/assets/images/avatar.png"
                    mock-state-value={{unless (eq state "default") state}}
                  />
                  <D.Interactive @href="#">Item 1</D.Interactive>
                </HdsDropdown>
              </SF.Item>
            </ShwFlex>
          </div>
        </:theming>
        <:reference>
          {{#if (eq state "default")}}
            <cds-header-nav menu-bar-label="HashiCorp">
              <cds-header-menu
                menu-label="Text only"
                trigger-content="Text only"
              >
                <cds-header-menu-item href="#">Item 1</cds-header-menu-item>
              </cds-header-menu>
            </cds-header-nav>
          {{else}}
            <pre>TODO: add static image here</pre>
          {{/if}}
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

  </section>
</template>;

export default AppHeaderCarbonizationIndex;
