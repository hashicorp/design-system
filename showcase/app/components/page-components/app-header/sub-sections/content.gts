/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwFlex from 'showcase/components/shw/flex';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwDivider from 'showcase/components/shw/divider';

import ModalWithTrigger from '../../../page-components/modal/code-fragments/with-trigger';
import SuperSelectWithButtons from 'showcase/components/page-components/form/super-select/code-fragments/with-minimal-content-and-buttons';
import FlyoutWithTrigger from 'showcase/components/page-components/flyout/code-fragments/with-trigger';
import CodeFragmentWithGenericContent from 'showcase/components/page-components/app-header/code-fragments/with-generic-content';

import { on } from '@ember/modifier';

import {
  HdsAppHeader,
  HdsAppHeaderHomeLink,
  HdsBadge,
  HdsButton,
  HdsButtonSet,
  HdsDropdown,
} from '@hashicorp/design-system-components/components';

const SubSectionContent: TemplateOnlyComponent = <template>
  <ShwTextH2>Content</ShwTextH2>

  <ShwTextH3>With generic content</ShwTextH3>

  <ShwFlex @direction="column" {{style gap="2rem"}} as |SF|>
    <SF.Item>
      <HdsAppHeader @hasA11yRefocus={{false}}>
        <:logo>
          <ShwPlaceholder @height="2em" @width="auto" @text="Logo" />
        </:logo>
        <:globalActions>
          <ShwPlaceholder @height="2em" @width="auto" @text="OrgPicker" />
          <ShwPlaceholder @height="2em" @width="auto" @text="Misc content" />
        </:globalActions>

        <:utilityActions>
          <ShwPlaceholder @height="2em" @width="auto" @text="GeoPicker" />
          <ShwPlaceholder @height="2em" @width="auto" @text="Search" />
          <ShwPlaceholder @height="2em" @width="auto" @text="HelpMenu" />
          <ShwPlaceholder @height="2em" @width="auto" @text="UserMenu" />
        </:utilityActions>
      </HdsAppHeader>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>With typical child component content</ShwTextH3>

  <ShwFlex @direction="column" {{style gap="3rem"}} as |SF|>
    <SF.Item @label="With minimum recommended phase 1 content">
      <CodeFragmentWithGenericContent
        @hasHelpMenu={{true}}
        @hasUserMenu={{true}}
      />
    </SF.Item>

    <SF.Item @label="With max recommended phase 1 content & Terraform logo">
      <CodeFragmentWithGenericContent
        @homeLinkText="Terraform home menu"
        @homeLinkLogo="terraform"
        @hasSearch={{true}}
        @hasHelpMenu={{true}}
        @hasUserMenu={{true}}
      />
    </SF.Item>

    <SF.Item @label="With max proposed future content">
      <CodeFragmentWithGenericContent
        @hasGeoPicker={{true}}
        @hasSearch={{true}}
        @hasHelpMenu={{true}}
        @hasUserMenu={{true}}
      />
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>With long content</ShwTextH3>

  <ShwFlex @direction="column" {{style gap="3rem"}} as |SF|>
    <SF.Item @label="40 characters long organization name with dashes">
      <CodeFragmentWithGenericContent
        @organizationName="Long-Organization-Name-Long-Organization"
        @hasSearch={{true}}
        @hasHelpMenu={{true}}
        @hasUserMenu={{true}}
      />
    </SF.Item>

    <SF.Item @label="40 characters long organization name with no dashes">
      <CodeFragmentWithGenericContent
        @organizationName="WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"
        @hasSearch={{true}}
        @hasHelpMenu={{true}}
        @hasUserMenu={{true}}
      />
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>With text</ShwTextH3>

  <ShwFlex @direction="column" {{style gap="3rem"}} as |SF|>

    <SF.Item>
      <CodeFragmentWithGenericContent
        @isHomeLinkLogoIconOnly={{false}}
        @homeLinkLogo="terraform"
        @homeLinkText="Terraform Admin Console"
        @hasUserMenu={{true}}
        @hasOrgPicker={{false}}
      />
    </SF.Item>

    <SF.Item>
      <CodeFragmentWithGenericContent
        @homeLinkText="Admin UI"
        @isHomeLinkLogoIconOnly={{false}}
        @hasHelpMenu={{true}}
        @hasUserMenu={{true}}
      />
    </SF.Item>

    <SF.Item>
      <CodeFragmentWithGenericContent
        @homeLinkText="Boundary Desktop"
        @homeLinkLogo="boundary-color"
        @isHomeLinkLogoIconOnly={{false}}
        @hasSearch={{true}}
        @hasOrgPicker={{false}}
      />
    </SF.Item>

    <SF.Item>
      <HdsAppHeader @hasA11yRefocus={{false}}>
        <:logo>
          <HdsAppHeaderHomeLink
            @icon="hashicorp"
            @text="HashiCorp Cloud Platform"
            @isIconOnly={{false}}
            @href="#"
          />
        </:logo>
        <:globalActions>
          <HdsBadge
            @text="Assuming Role: Admin"
            @color="highlight"
            @icon="eye"
            @type="filled"
          />
        </:globalActions>
      </HdsAppHeader>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>With nested button content</ShwTextH3>

  <HdsAppHeader @hasA11yRefocus={{false}}>
    <:logo>
      {{! empty span for layout purposes}}
      <span />
    </:logo>
    <:globalActions>
      <SuperSelectWithButtons @placeholder="SuperSelect" />

      <HdsDropdown as |D|>
        <D.ToggleButton @text="Dropdown" />
        <D.Footer>
          <HdsButtonSet>
            <HdsButton @text="Primary" @isFullWidth={{true}} @size="small" />
            <HdsButton @text="Secondary" @color="secondary" @size="small" />
          </HdsButtonSet>
        </D.Footer>
      </HdsDropdown>

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
              <HdsButton type="submit" @text="Primary" {{on "click" F.close}} />
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
    </:globalActions>
  </HdsAppHeader>

  <ShwDivider />
</template>;

export default SubSectionContent;
