import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { on } from '@ember/modifier';

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

const LocalComponent: TemplateOnlyComponent = <template>
  <div class="doc-theme-switcher-app-frame-mock-viewport">
    <HdsAppFrame as |Frame|>
      <Frame.Header>
        <HdsThemeContext @context="dark">
          {{! for demo purposes, we set @hasA11yRefocus to false but in your app it will
          probably need to be set to true (or omitted to rely on defaults) }}
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
                <dd.Interactive @route="components" {{on "click" dd.close}}>Give
                  feedback</dd.Interactive>
              </HdsDropdown>

              <HdsDropdown @enableCollisionDetection={{true}} as |dd|>
                <dd.ToggleIcon @icon="user" @text="user menu" />
                <dd.Title @text="Signed In" />
                <dd.Description @text="email@domain.com" />
                <dd.Interactive
                  @route="components"
                  {{on "click" dd.close}}
                >Account settings</dd.Interactive>
              </HdsDropdown>
            </:utilityActions>
          </HdsAppHeader>
        </HdsThemeContext>
      </Frame.Header>
      <Frame.Sidebar>
        <HdsAppSideNav>
          <HdsAppSideNavList as |SNL|>
            <SNL.Link @icon="dashboard" @text="Dashboard" @isActive={{true}} />
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
        <HdsThemeContext @context="dark">
          <div class="doc-theme-switcher-app-frame-footer">
            <HdsAppFooter as |AF|>
              <AF.LegalLinks />
            </HdsAppFooter>
          </div>
        </HdsThemeContext>
      </Frame.Footer>
    </HdsAppFrame>
  </div>
</template>;

export default LocalComponent;
