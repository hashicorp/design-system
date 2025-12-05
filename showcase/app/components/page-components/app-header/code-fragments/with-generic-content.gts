/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { notEq } from 'ember-truth-helpers';

import {
  HdsAppHeader,
  HdsAppHeaderHomeLink,
  HdsDropdown,
  HdsButton,
} from '@hashicorp/design-system-components/components';
import type { HdsAppHeaderHomeLinkSignature } from '@hashicorp/design-system-components/components/hds/app-header/home-link';
import type { HdsAppHeaderSignature } from '@hashicorp/design-system-components/components/hds/app-header/index';

interface CodeFragmentWithGenericContentSignature {
  Args: {
    breakpoint?: HdsAppHeaderSignature['Args']['breakpoint'];
    hasGeoPicker?: boolean;
    hasHelpMenu?: boolean;
    hasOrgPicker?: boolean;
    hasSearch?: boolean;
    hasUserMenu?: boolean;
    homeLinkLogo?: HdsAppHeaderHomeLinkSignature['Args']['icon'];
    homeLinkText?: HdsAppHeaderHomeLinkSignature['Args']['text'];
    isHomeLinkLogoIconOnly?: boolean;
    organizationName?: string;
  };
}

const CodeFragmentWithGenericContent: TemplateOnlyComponent<CodeFragmentWithGenericContentSignature> =
  <template>
    <HdsAppHeader
      @hasA11yRefocus={{false}}
      @breakpoint={{if (notEq @breakpoint undefined) @breakpoint undefined}}
    >
      <:logo>
        <HdsAppHeaderHomeLink
          @icon={{if @homeLinkLogo @homeLinkLogo "hashicorp"}}
          @text={{if @homeLinkText @homeLinkText "HashiCorp home menu"}}
          @isIconOnly={{if
            (notEq @isHomeLinkLogoIconOnly undefined)
            @isHomeLinkLogoIconOnly
            true
          }}
          @href="#"
        />
      </:logo>
      <:globalActions>
        {{#if (notEq @hasOrgPicker false)}}
          <HdsDropdown @enableCollisionDetection={{true}} as |dd|>
            <dd.ToggleButton
              @text={{if
                @organizationName
                @organizationName
                "Choose an organization"
              }}
              @icon="org"
            />
            <dd.Checkmark>
              organizationName
            </dd.Checkmark>
          </HdsDropdown>
        {{/if}}
      </:globalActions>

      <:utilityActions>
        {{#if @hasGeoPicker}}
          <HdsDropdown @enableCollisionDetection={{true}} as |dd|>
            <dd.ToggleButton @text="Europe" @icon="globe" />
            <dd.Checkmark>
              Americas
            </dd.Checkmark>
          </HdsDropdown>
        {{/if}}

        {{#if @hasSearch}}
          <HdsButton @icon="search" @isIconOnly={{true}} @text="Search" />
        {{/if}}

        {{#if @hasHelpMenu}}
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
        {{/if}}

        {{#if @hasUserMenu}}
          <HdsDropdown @enableCollisionDetection={{true}} as |dd|>
            <dd.ToggleIcon @icon="user" @text="user menu" />
            <dd.Title @text="Signed In" />
            <dd.Description @text="email@domain.com" />
            <dd.Interactive @href="#">Account Settings</dd.Interactive>
          </HdsDropdown>
        {{/if}}
      </:utilityActions>
    </HdsAppHeader>
  </template>;

export default CodeFragmentWithGenericContent;
