/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';

import { on } from '@ember/modifier';
import { array } from '@ember/helper';
import { concat } from '@ember/helper';
import style from 'ember-style-modifier';

import HdsAppFooter from '@hashicorp/design-system-components/components/hds/app-footer/index';
import HdsAppFooterItem from '@hashicorp/design-system-components/components/hds/app-footer/item';
import HdsAppFooterLink from '@hashicorp/design-system-components/components/hds/app-footer/link';
import HdsAppFooterStatusLink from '@hashicorp/design-system-components/components/hds/app-footer/status-link';
import HdsAppFooterLegalLinks from '@hashicorp/design-system-components/components/hds/app-footer/legal-links';
import HdsAppFooterCopyright from '@hashicorp/design-system-components/components/hds/app-footer/copyright';
import HdsDropdown from '@hashicorp/design-system-components/components/hds/dropdown/index';
import HdsTextBody from '@hashicorp/design-system-components/components/hds/text/body';

import { STATUSES as STATUS_LINK_STATUSES } from '@hashicorp/design-system-components/components/hds/app-footer/status-link';

export interface PageComponentsAppFooterSignature {
  Element: HTMLDivElement;
}

const LINK_STATES = ['default', 'hover', 'active', 'focus'];

export default class PageComponentsAppFooter extends Component<PageComponentsAppFooterSignature> {
  @tracked showHighlight = false;

  toggleHighlight = () => {
    this.showHighlight = !this.showHighlight;
  };

  <template>
    {{pageTitle "AppFooter Component"}}

    <ShwTextH1>AppFooter</ShwTextH1>

    <section data-test-percy>
      <div
        class="{{if
            this.showHighlight
            'shw-component-app-footer-layout-highlight'
          }}"
      >
        <ShwTextH2>Content</ShwTextH2>

        <button type="button" {{on "click" this.toggleHighlight}}>
          {{if this.showHighlight "Hide" "Show"}}
          layout highlight
        </button>

        <ShwFlex @direction="column" {{style marginTop="32px"}} as |SF|>
          <SF.Item @label="With only generic content">
            <HdsAppFooter as |AF|>
              <AF.ExtraBefore>
                <ShwPlaceholder
                  @height="2em"
                  {{style width="fit-content"}}
                  @text="Extra Content Before"
                />
              </AF.ExtraBefore>
              <AF.Item>
                <ShwPlaceholder @height="2em" @text="Item" />
              </AF.Item>
              <AF.Item>
                <ShwPlaceholder @height="2em" @text="Item" />
              </AF.Item>
              <AF.Item>
                <ShwPlaceholder @height="2em" @text="Item" />
              </AF.Item>
              <AF.ExtraAfter>
                <ShwPlaceholder
                  @height="2em"
                  {{style width="fit-content"}}
                  @text="Extra Content After"
                />
              </AF.ExtraAfter>
            </HdsAppFooter>
          </SF.Item>

          <SF.Item @label="With only the default content">
            <HdsAppFooter />
          </SF.Item>

          <SF.Item @label="With minimal recommended content">
            <HdsAppFooter as |AF|>
              <AF.LegalLinks />
            </HdsAppFooter>
          </SF.Item>

          <SF.Item
            @label="With StatusLink & custom Link content (with leading icon)"
          >
            <HdsAppFooter as |AF|>
              <AF.StatusLink @status="operational" />
              <AF.Link
                @href="https://cloud.hashicorp.com/docs/changelog"
                @icon="logs"
                @iconPosition="leading"
              >Changelog</AF.Link>
              <AF.LegalLinks />
            </HdsAppFooter>
          </SF.Item>

          <SF.Item @label="With custom “meta” items (non-link) content">
            <HdsAppFooter as |AF|>
              <AF.StatusLink @status="operational" />
              <AF.LegalLinks />
              <AF.Item>
                <HdsTextBody @tag="span" @size="100">v.2.0</HdsTextBody>
              </AF.Item>
              <AF.Item>
                <HdsTextBody @tag="span" @size="100">Product Name</HdsTextBody>
              </AF.Item>
              <AF.Item>
                <HdsTextBody @tag="span" @size="100">API: 1.0</HdsTextBody>
              </AF.Item>
            </HdsAppFooter>
          </SF.Item>

          <SF.Item @label="With theme selector as Extra Content Before">
            <HdsAppFooter as |AF|>
              <AF.ExtraBefore>
                <HdsDropdown as |D|>
                  <D.ToggleButton
                    @text="Theme"
                    @color="secondary"
                    @size="small"
                  />
                  <D.Interactive
                    @icon="monitor"
                    {{on "click" D.close}}
                  >System</D.Interactive>
                  <D.Interactive
                    @icon="moon"
                    {{on "click" D.close}}
                  >Dark</D.Interactive>
                  <D.Interactive
                    @icon="sun"
                    {{on "click" D.close}}
                  >Light</D.Interactive>
                </HdsDropdown>
              </AF.ExtraBefore>
              <AF.StatusLink @status="operational" />
              <AF.Link
                @href="https://cloud.hashicorp.com/docs/changelog"
              >Changelog</AF.Link>
              <AF.LegalLinks />
            </HdsAppFooter>
          </SF.Item>
        </ShwFlex>

        <ShwDivider />

        <ShwTextH2>Theme</ShwTextH2>

        <button type="button" {{on "click" this.toggleHighlight}}>
          {{if this.showHighlight "Hide" "Show"}}
          layout highlight
        </button>

        <ShwFlex @direction="column" {{style marginTop="32px"}} as |SF|>
          <SF.Item @label="theme=light">
            <HdsAppFooter as |AF|>
              <AF.StatusLink @status="operational" />
              <AF.LegalLinks />
              <AF.Item>
                <HdsTextBody @tag="span" @size="100">v.2.0</HdsTextBody>
              </AF.Item>
              <AF.Item>
                <HdsTextBody @tag="span" @size="100">Product Name</HdsTextBody>
              </AF.Item>
            </HdsAppFooter>
          </SF.Item>

          <SF.Item @label="theme=dark">
            <HdsAppFooter @theme="dark" as |AF|>
              <AF.StatusLink @status="operational" />
              <AF.LegalLinks />
              <AF.Item>
                <HdsTextBody @tag="span" @size="100">v.2.0</HdsTextBody>
              </AF.Item>
              <AF.Item>
                <HdsTextBody @tag="span" @size="100">Product Name</HdsTextBody>
              </AF.Item>
            </HdsAppFooter>
          </SF.Item>
        </ShwFlex>

        <ShwDivider />

        <ShwTextH2>Layout</ShwTextH2>

        <button type="button" {{on "click" this.toggleHighlight}}>
          {{if this.showHighlight "Hide" "Show"}}
          layout highlight
        </button>

        <ShwFlex @direction="column" {{style marginTop="32px"}} as |SF|>
          {{#let
            (array "desktop" "tablet" "mobile-large" "mobile-small")
            as |layouts|
          }}
            {{#each layouts as |layout|}}
              <SF.Item @label={{layout}}>
                <div
                  class={{concat "shw-component-app-footer-" layout "-view"}}
                >
                  <HdsAppFooter as |AF|>
                    <AF.ExtraBefore>
                      <ShwPlaceholder
                        class="shw-app-footer-extra"
                        @height="2em"
                        {{style width="fit-content"}}
                        @text="Before"
                      />
                    </AF.ExtraBefore>
                    <AF.StatusLink @status="operational" />
                    <AF.LegalLinks />
                    <AF.Item>
                      <HdsTextBody @tag="span" @size="100">v.2.0</HdsTextBody>
                    </AF.Item>
                    <AF.Item>
                      <HdsTextBody @tag="span" @size="100">Name</HdsTextBody>
                    </AF.Item>
                    <AF.Item>
                      <HdsTextBody @tag="span" @size="100">API: 1.0</HdsTextBody>
                    </AF.Item>
                    <AF.ExtraAfter>
                      <ShwPlaceholder
                        class="shw-app-footer-extra"
                        @height="2em"
                        {{style width="fit-content"}}
                        @text="After"
                      />
                    </AF.ExtraAfter>
                  </HdsAppFooter>
                </div>
              </SF.Item>
            {{/each}}
          {{/let}}
        </ShwFlex>

        <ShwDivider />

        <ShwTextH2>Base components & child components</ShwTextH2>

        <button type="button" {{on "click" this.toggleHighlight}}>
          {{if this.showHighlight "Hide" "Show"}}
          layout highlight
        </button>

        <ShwTextH3>AppFooterItem</ShwTextH3>

        <ul class="hds-app-footer__list">
          <HdsAppFooterItem><HdsTextBody
              @tag="span"
              @size="100"
              @color="primary"
            >Item</HdsTextBody></HdsAppFooterItem>
        </ul>

        <ShwDivider @level={{2}} />

        <ShwTextH3>AppFooterLink</ShwTextH3>

        <ShwTextH4>States</ShwTextH4>

        {{#let (array "light" "dark") as |themes|}}
          {{#each themes as |theme|}}
            <ShwTextBody><strong>{{theme}} theme</strong></ShwTextBody>

            <ShwFlex
              @gap="2rem"
              {{style justifyContent="space-between"}}
              as |SF|
            >
              {{#each LINK_STATES as |state|}}
                <SF.Item @label={{state}}>
                  <ul
                    class={{concat
                      "hds-app-footer__list hds-app-footer--theme-"
                      theme
                    }}
                  >
                    <HdsAppFooterLink
                      @href="#"
                      mock-state-value={{state}}
                    >Link</HdsAppFooterLink>
                  </ul>
                </SF.Item>
              {{/each}}
            </ShwFlex>
          {{/each}}
        {{/let}}

        <ShwDivider @level={{2}} />

        <ShwTextH3>AppFooterStatusLink</ShwTextH3>

        <ShwTextH4>Status variants</ShwTextH4>

        {{#let (array "light" "dark") as |themes|}}
          {{#each themes as |theme|}}
            <ShwTextBody><strong>{{theme}} theme</strong></ShwTextBody>

            <ShwFlex
              @gap="2rem"
              {{style justifyContent="space-between"}}
              as |SF|
            >
              {{#each-in STATUS_LINK_STATUSES as |status|}}
                <SF.Item @label={{status}}>
                  <ul
                    class={{concat
                      "hds-app-footer__list hds-app-footer--theme-"
                      theme
                    }}
                  >
                    <HdsAppFooterStatusLink @status={{status}} />
                  </ul>
                </SF.Item>
              {{/each-in}}
            </ShwFlex>
          {{/each}}
        {{/let}}

        <ShwTextH4>With custom values</ShwTextH4>

        <ShwTextBody><strong>Custom values combined with a standard status</strong></ShwTextBody>

        <ShwFlex @gap="2rem" as |SF|>
          <SF.Item @label="with custom text">
            <ul class="hds-app-footer__list hds-app-footer--theme-light">
              <HdsAppFooterStatusLink @status="operational" @text="Operativo" />
            </ul>
          </SF.Item>

          <SF.Item @label="with custom icon color">
            <ul class="hds-app-footer__list hds-app-footer--theme-light">
              <HdsAppFooterStatusLink
                @status="operational"
                @statusIconColor="purple"
              />
            </ul>
          </SF.Item>

          <SF.Item @label="with custom icon">
            <ul class="hds-app-footer__list hds-app-footer--theme-light">
              <HdsAppFooterStatusLink
                @status="operational"
                @statusIcon="cloud-check"
              />
            </ul>
          </SF.Item>
        </ShwFlex>

        <ShwTextBody><strong>Custom values with no status</strong></ShwTextBody>
        <ShwFlex @gap="2rem" as |SF|>
          <SF.Item @label="with custom icon and text">
            <ul class="hds-app-footer__list hds-app-footer--theme-light">
              <HdsAppFooterStatusLink
                @statusIcon="hexagon-fill"
                @text="Lorem ipsum"
              />
            </ul>
          </SF.Item>

          <SF.Item @label="with custom icon, icon color, text, & href">
            <ul class="hds-app-footer__list hds-app-footer--theme-light">
              <HdsAppFooterStatusLink
                @statusIcon="waypoint"
                @statusIconColor="var(--token-color-waypoint-brand)"
                @href="https://www.hashicorp.com/products/waypoint"
                @text="Waypoint"
              />
            </ul>
          </SF.Item>
        </ShwFlex>

        <ShwDivider @level={{2}} />

        <ShwTextH3>AppFooterLegalLinks</ShwTextH3>

        <ShwFlex @direction="column" @gap="2rem" as |SF|>
          <SF.Item @label="with default url for “Terms” link">
            <ul class="hds-app-footer__list hds-app-footer--theme-light">
              <HdsAppFooterLegalLinks />
            </ul>
          </SF.Item>
        </ShwFlex>

        <ShwDivider @level={{2}} />

        <ShwTextH3>AppFooterCopyright</ShwTextH3>

        <ShwFlex @gap="2rem" as |SF|>
          <SF.Item @label="with default (current) year">
            <HdsAppFooterCopyright />
          </SF.Item>

          <SF.Item @label="with custom year">
            <HdsAppFooterCopyright @year="1984" />
          </SF.Item>
        </ShwFlex>
      </div>
    </section>
  </template>
}
