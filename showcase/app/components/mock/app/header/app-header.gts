/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { service } from '@ember/service';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import { eq } from 'ember-truth-helpers';

// HDS components
import {
  HdsAppHeader,
  HdsAppHeaderHomeLink,
  HdsDropdown,
  HdsButton,
} from '@hashicorp/design-system-components/components';

import HdsThemingService from '@hashicorp/design-system-components/services/hds-theming';
import ShwThemingService from 'showcase/services/shw-theming';

// types
import type { HdsAppHeaderSignature } from '@hashicorp/design-system-components/components/hds/app-header/index';
import type Owner from '@ember/owner';

import type {
  HdsThemes,
  HdsThemingOptions,
} from '@hashicorp/design-system-components/services/hds-theming';
import type { IconName } from '@hashicorp/flight-icons/svg';

export interface MockAppHeaderAppHeaderSignature {
  Args: {
    showOrgPicker?: boolean;
    orgPickerLabel?: string;
    showRegionPicker?: boolean;
    showThemeSwitcher?: boolean;
    showSearch?: boolean;
  };
  Element: HdsAppHeaderSignature['Element'];
}

const THEMING_OPTIONS: Array<{
  theme: HdsThemes;
  icon: IconName;
  label: string;
}> = [
  { theme: 'default', icon: 'hashicorp', label: 'Default' },
  { theme: 'system', icon: 'monitor', label: 'System' },
  { theme: 'light', icon: 'sun', label: 'Light' },
  { theme: 'dark', icon: 'moon', label: 'Dark' },
];

export default class MockAppHeaderAppHeader extends Component<MockAppHeaderAppHeaderSignature> {
  showOrgPicker;
  orgPickerLabel;
  showRegionPicker;
  showThemeSwitcher;
  showSearch;

  @service declare readonly hdsTheming: HdsThemingService;
  @service declare readonly shwTheming: ShwThemingService;

  constructor(owner: Owner, args: MockAppHeaderAppHeaderSignature['Args']) {
    super(owner, args);
    this.showOrgPicker = this.args.showOrgPicker ?? true;
    this.orgPickerLabel = this.args.orgPickerLabel ?? 'organization-name';
    this.showRegionPicker = this.args.showRegionPicker ?? true;
    this.showThemeSwitcher = this.args.showThemeSwitcher ?? true;
    this.showSearch = this.args.showSearch ?? true;
  }

  get themingOptions(): Array<{
    theme: HdsThemes;
    icon: IconName;
    label: string;
  }> {
    return THEMING_OPTIONS;
  }

  onSelectThemingOption = (currentTheme: HdsThemes) => {
    const currentOptions: HdsThemingOptions = {
      lightTheme: 'cds-g0',
      darkTheme: 'cds-g100',
    };
    this.shwTheming.setAppTheme({
      theme: currentTheme,
      options: currentOptions,
      onSetTheme: (args) => {
        console.log(`onSetTheme invoked`, args, currentTheme, currentOptions);
      },
    });
  };

  <template>
    <HdsAppHeader>
      <:logo as |actions|>
        <HdsAppHeaderHomeLink
          @icon="hashicorp"
          @text="HashiCorp home menu"
          @isIconOnly={{true}}
          @href="#"
          @isHrefExternal={{false}}
          {{on "click" actions.close}}
        />
      </:logo>

      <:globalActions as |actions|>
        {{#if this.showOrgPicker}}
          <HdsDropdown @enableCollisionDetection={{true}} as |dd|>
            <dd.ToggleButton @text={{this.orgPickerLabel}} @icon="org" />
            <dd.Checkmark {{on "click" actions.close}}>
              my-organization
            </dd.Checkmark>
          </HdsDropdown>
        {{/if}}
      </:globalActions>

      <:utilityActions as |actions|>
        {{#if this.showRegionPicker}}
          <HdsDropdown @enableCollisionDetection={{true}} as |dd|>
            <dd.ToggleButton @text="Europe" @icon="globe" />
            <dd.Checkmark
              @selected={{true}}
              {{on "click" actions.close}}
            >Europe</dd.Checkmark>
            <dd.Checkmark {{on "click" actions.close}}>Americas</dd.Checkmark>
          </HdsDropdown>
        {{/if}}

        {{#if this.showSearch}}
          <HdsButton @icon="search" @isIconOnly={{true}} @text="Search" />
        {{/if}}
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
          <dd.Interactive @href="#">
            Account Settings
          </dd.Interactive>
          {{#if this.showThemeSwitcher}}
            <dd.Separator />
            <dd.Title @text="Theme" />
            {{#each this.themingOptions as |data|}}
              <dd.Checkmark
                @icon={{data.icon}}
                @selected={{(eq this.hdsTheming.currentTheme data.theme)}}
                {{on "click" (fn this.onSelectThemingOption data.theme)}}
              >{{data.label}}</dd.Checkmark>
            {{/each}}
          {{/if}}
        </HdsDropdown>
      </:utilityActions>
    </HdsAppHeader>
  </template>
}
