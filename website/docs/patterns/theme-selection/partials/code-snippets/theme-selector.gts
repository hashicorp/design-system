import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { eq } from 'ember-truth-helpers';
import { service } from '@ember/service';
import { fn } from '@ember/helper';

import {
  HdsThemeContext,
  HdsAppFrame,
  HdsAppHeader,
  HdsAppHeaderHomeLink,
  HdsDropdown,
  HdsAppSideNav,
  HdsAppSideNavList,
  HdsApplicationState,
  HdsAppFooter,
} from '@hashicorp/design-system-components/components';

import type { HdsIconSignature } from '@hashicorp/design-system-components/components/hds/icon/index';
import type HdsThemingService from '@hashicorp/design-system-components/services/hds-theming';

type ThemeOption = 'system' | 'light' | 'dark';

const STORAGE_KEY = 'selected-theme-demo';

const THEMING_OPTIONS: Record<
  ThemeOption,
  { icon: HdsIconSignature['Args']['name']; label: string }
> = {
  system: { icon: 'monitor', label: 'System' },
  light: { icon: 'sun', label: 'Light' },
  dark: { icon: 'moon', label: 'Dark' },
};

export default class LocalComponent extends Component {
  @service declare readonly hdsTheming: HdsThemingService;

  get hasLocalStorage(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined'
    );
  }

  get hasDOM(): boolean {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
  }

  storeTheme(theme: ThemeOption): void {
    if (!this.hasLocalStorage) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, theme);
  }

  selectTheme = (newTheme: ThemeOption, close: () => void) => {
    if (!this.hasDOM) {
      return;
    }

    this.hdsTheming.setTheme({
      theme: newTheme,
      onSetTheme: () => {
        this.storeTheme(newTheme);
      },
    });

    close();
  };

  <template>
    <div class="doc-theme-selection-app-frame-mock-viewport">
      <HdsAppFrame as |Frame|>
        <Frame.Header>
          <HdsThemeContext
            @context={{if
              this.hdsTheming.isCarbonThemeEnabled
              "dark"
              "default"
            }}
          >
            {{! for demo purposes, we set @hasA11yRefocus to false but in your app it will probably need to be set to true (or omitted to rely on defaults) }}
            <HdsAppHeader @hasA11yRefocus={{false}}>
              <:logo>
                <HdsAppHeaderHomeLink
                  @icon="hashicorp"
                  @text="HashiCorp home menu"
                  @href="/"
                />
              </:logo>

              <:globalActions>
                <HdsDropdown @enableCollisionDetection={{true}} as |dd|>
                  <dd.ToggleButton @text="Choose an organization" @icon="org" />
                  <dd.Checkmark>
                    organizationName
                  </dd.Checkmark>
                </HdsDropdown>
              </:globalActions>

              <:utilityActions>
                <HdsDropdown @enableCollisionDetection={{true}} as |dd|>
                  <dd.ToggleIcon @icon="help" @text="help menu" />
                  <dd.Title @text="Help & Support" />
                  <dd.Interactive
                    @route="components"
                    {{on "click" dd.close}}
                  >Documentation</dd.Interactive>
                  <dd.Interactive
                    @route="components"
                    {{on "click" dd.close}}
                  >Tutorials</dd.Interactive>
                  <dd.Interactive
                    @route="components"
                    {{on "click" dd.close}}
                  >Terraform Provider</dd.Interactive>
                  <dd.Interactive
                    @route="components"
                    {{on "click" dd.close}}
                  >Changelog</dd.Interactive>
                  <dd.Separator />
                  <dd.Interactive
                    @route="components"
                    {{on "click" dd.close}}
                  >Create support ticket</dd.Interactive>
                  <dd.Interactive
                    @route="components"
                    {{on "click" dd.close}}
                  >Give feedback</dd.Interactive>
                </HdsDropdown>
                <HdsDropdown @enableCollisionDetection={{true}} as |dd|>
                  <dd.ToggleIcon @icon="user" @text="user menu" />
                  <dd.Title @text="Signed In" />
                  <dd.Description @text="email@domain.com" />
                  <dd.Interactive
                    @route="components"
                    {{on "click" dd.close}}
                  >Account settings</dd.Interactive>

                  {{! ############################### }}
                  {{! NOTE: this is the relevant part }}
                  {{! ############################### }}

                  <dd.Separator />
                  <dd.Title @text="Theme" />
                  {{#each-in THEMING_OPTIONS as |key option|}}
                    <dd.Checkmark
                      @icon={{option.icon}}
                      @selected={{eq this.hdsTheming.currentTheme key}}
                      {{on "click" (fn this.selectTheme key dd.close)}}
                    >{{option.label}}</dd.Checkmark>
                  {{/each-in}}

                  {{! ############################### }}

                </HdsDropdown>
              </:utilityActions>
            </HdsAppHeader>
          </HdsThemeContext>
        </Frame.Header>
        <Frame.Sidebar>
          <HdsAppSideNav>
            <HdsAppSideNavList as |SNL|>
              <SNL.Link
                @icon="dashboard"
                @text="Dashboard"
                @isActive={{true}}
              />
              <SNL.Title>Services</SNL.Title>
              <SNL.Link @text="Vault" @icon="vault" @href="#" />
              <SNL.Link @text="Terraform" @icon="terraform" @href="#" />
              <SNL.Link
                @text="Vagrant"
                @icon="vagrant"
                @badge="Alpha"
                @href="#"
              />
              <SNL.Title>Default Org</SNL.Title>
              <SNL.Link
                @text="Billing"
                @icon="credit-card"
                @href="#"
                @hasSubItems={{true}}
              />
              <SNL.Link
                @text="Settings"
                @icon="settings"
                @href="#"
                @hasSubItems={{true}}
              />
              <SNL.Link
                @href="#"
                @isHrefExternal={{true}}
                @icon="guide"
                @text="Documentation"
              />
            </HdsAppSideNavList>
          </HdsAppSideNav>
        </Frame.Sidebar>
        <Frame.Main>
          <div class="doc-theme-switcher-app-frame-main">
            <HdsApplicationState @align="center" as |A|>
              <A.Header @title="No template available" @titleTag="h2" />
              <A.Body
                @text="Make a template to easily provision infrastructure for your application."
              />
              <A.Footer as |F|>
                <F.Button @icon="plus" @text="Create" @size="small" />
                <F.Button
                  @icon="upload"
                  @text="Upload"
                  @color="secondary"
                  @size="small"
                />
                <F.LinkStandalone
                  @icon="docs-link"
                  @text="Learn more"
                  @href="/components/application-state"
                  @iconPosition="trailing"
                />
              </A.Footer>
            </HdsApplicationState>
          </div>
        </Frame.Main>
        <Frame.Footer>
          <div class="doc-theme-switcher-app-frame-footer">
            <HdsAppFooter as |AF|>
              <AF.LegalLinks />
            </HdsAppFooter>
          </div>
        </Frame.Footer>
      </HdsAppFrame>
    </div>
  </template>
}
