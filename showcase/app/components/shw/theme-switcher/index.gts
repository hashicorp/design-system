/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { service } from '@ember/service';
import { eq, or } from 'ember-truth-helpers';

import ShwTextH2 from '../text/h2';
import ShwTextBody from '../text/body';
import ShwDivider from '../divider';

import config from 'showcase/config/environment';
import { HdsIcon } from '@hashicorp/design-system-components/components';
import {
  HdsThemeValues,
  HdsModeValues,
} from '@hashicorp/design-system-components/services/hds-theming';
import { MODES } from '@hashicorp/design-system-components/services/hds-theming';
import type HdsThemingService from '@hashicorp/design-system-components/services/hds-theming';
import type {
  HdsModes,
  ThemeSelector,
  HdsThemingServiceOptions,
} from '@hashicorp/design-system-components/services/hds-theming';

interface ShwThemeSwitcherSignature {
  Element: HTMLDivElement;
}

const stylesheetOptions = {
  standard: 'Standard (HDS / No theming)',
  'prefers-color-scheme': 'Prefers-color-scheme (HDS || Carbon / System)',
  'css-selectors': 'CSS Selectors (HDS || Carbon - Light/Dark)',
  'combined-strategies':
    'Combined strategies (HDS || Carbon - System/Light/Dark)',
};

const themingOptions = {
  system: 'System (prefers-color-scheme)',
  light: 'Light (data-attribute)',
  dark: 'Dark (data-attribute)',
};

export default class ShwThemeSwitcher extends Component<ShwThemeSwitcherSignature> {
  @service declare readonly hdsTheming: HdsThemingService;

  @tracked currentStylesheet = 'standard';
  @tracked currentLightTheme: HdsModes = HdsModeValues.CdsG0;
  @tracked currentDarkTheme: HdsModes = HdsModeValues.CdsG100;
  @tracked currentThemeSelector: ThemeSelector = 'data';
  @tracked selectedStylesheetOption = this.currentStylesheet;
  @tracked selectedLightThemeOption: HdsModes = this.currentLightTheme;
  @tracked selectedDarkThemeOption: HdsModes = this.currentDarkTheme;
  @tracked selectedThemeSelector: ThemeSelector = this.currentThemeSelector;

  onChangeStylesheetOption = (event: Event) => {
    const select = event.target as HTMLSelectElement;
    this.selectedStylesheetOption = select.value;
  };

  onChangeLightOption = (event: Event) => {
    const select = event.target as HTMLSelectElement;
    this.selectedLightThemeOption = select.value as HdsModes;
  };

  onChangeDarkOption = (event: Event) => {
    const select = event.target as HTMLSelectElement;
    this.selectedDarkThemeOption = select.value as HdsModes;
  };

  onChangeThemeSelectorOption = (event: Event) => {
    const select = event.target as HTMLSelectElement;
    this.selectedThemeSelector = select.value as ThemeSelector;
  };

  applyThemingPreferences = () => {
    this.currentStylesheet = this.selectedStylesheetOption;
    this.currentLightTheme = this.selectedLightThemeOption;
    this.currentDarkTheme = this.selectedDarkThemeOption;
    this.currentThemeSelector = this.selectedThemeSelector;

    let newStylesheet;
    switch (this.selectedStylesheetOption) {
      case 'prefers-color-scheme':
        newStylesheet =
          'assets/styles/@hashicorp/design-system-components-theming-with-prefers-color-scheme.css';
        break;
      case 'css-selectors':
        newStylesheet =
          'assets/styles/@hashicorp/design-system-components-theming-with-css-selectors.css';
        break;
      case 'combined-strategies':
        newStylesheet =
          'assets/styles/@hashicorp/design-system-components-theming-with-combined-strategies.css';
        break;
      default:
        newStylesheet = 'assets/styles/@hashicorp/design-system-components.css';
        break;
    }

    // re-assign the stylesheet `href` attribute
    const hdsComponentsStylesheet = document.getElementById(
      'hds-components-stylesheet',
    );
    if (hdsComponentsStylesheet) {
      hdsComponentsStylesheet.setAttribute(
        'href',
        `${config.rootURL}${newStylesheet}`,
      );
    }

    // we set the theme in the global service
    const customOptions: HdsThemingServiceOptions = {
      themeMap: {
        [HdsThemeValues.Light]: this.currentLightTheme,
        [HdsThemeValues.Dark]: this.currentDarkTheme,
      },
      themeSelector: this.currentThemeSelector,
    };

    this.hdsThemingsetThemingServiceOptions(customOptions);

    // we set the theme in the global service
    this.hdsTheming.setTheme(select.value);

    // programmatically close the popover
    const popoverElement = document.getElementById(
      'shw-theming-options-popover',
    );
    if (popoverElement && 'hidePopover' in popoverElement) {
      popoverElement.hidePopover();
    }
  };

  onChangePageTheme = (event: Event) => {
    const select = event.target as HTMLSelectElement;

    // we set the theme in the global service
    this.hdsTheming.setTheme(select.value);
  };

  <template>
    <div class="shw-theme-switcher" ...attributes>
      <button type="button" popovertarget="shw-theming-options-popover">Open
        Popover
        <HdsIcon
          @name="settings"
          class="shw-theme-switcher__settings"
        /></button>

      <div id="shw-theming-options-popover" popover>
        <ShwTextH2>My Popover</ShwTextH2>
        <ShwTextBody>This is a popover created with the Popover API.</ShwTextBody>

        <fieldset class="shw-theme-switcher__options">
          <legend>Stylesheet Options</legend>
          {{#each-in stylesheetOptions as |key text|}}
            <label
              class="shw-theme-switcher__option"
              for="popover-stylesheet-option-{{key}}"
            >
              <input
                type="radio"
                name="stylesheet-option"
                id="popover-stylesheet-option-{{key}}"
                value={{key}}
                checked={{eq this.currentStylesheet key}}
                {{on "change" this.onChangeStylesheetOption}}
              />
              {{text}}</label>
          {{/each-in}}
        </fieldset>

        {{#if
          (or
            (eq this.selectedStylesheetOption "css-selectors")
            (eq this.selectedStylesheetOption "combined-strategies")
          )
        }}
          <ShwDivider @level={{2}} />

          <label
            for="shw-theme-switcher-control-light"
            class="???"
          >Light:</label>
          <select
            id="shw-theme-switcher-control"
            class="???"
            {{on "change" this.onChangeLightOption}}
          >
            {{#each MODES as |mode|}}
              <option
                value={{mode}}
                selected={{eq this.currentLightTheme mode}}
              >{{mode}}</option>
            {{/each}}
          </select>

          <label for="shw-theme-switcher-control-dark" class="???">Dark:</label>
          <select
            id="shw-theme-switcher-control"
            class="???"
            {{on "change" this.onChangeDarkOption}}
          >
            {{#each MODES as |mode|}}
              <option
                value={{mode}}
                selected={{eq this.currentDarkTheme mode}}
              >{{mode}}</option>
            {{/each}}
          </select>

          <label
            for="shw-theme-switcher-control-theme-selector"
            class="???"
          >Dark:</label>
          <select
            id="shw-theme-switcher-control"
            class="???"
            {{on "change" this.onChangeThemeSelectorOption}}
          >
            <option
              value="data"
              selected={{eq this.currentThemeSelector "data"}}
            >[data-hds-theme] attribute"</option>
            <option
              value="class"
              selected={{eq this.currentThemeSelector "class"}}
            >.hds-theme class"</option>
          </select>

        {{/if}}

        <button type="button" {{on "click" this.applyThemingPreferences}}>
          Apply
        </button>
        <button
          type="button"
          popovertarget="shw-theming-options-popover"
          popovertargetaction="hide"
        >
          Close
        </button>
      </div>

      {{#if
        (or
          (eq this.selectedStylesheetOption "css-selectors")
          (eq this.selectedStylesheetOption "combined-strategies")
        )
      }}
        <label
          for="shw-theme-switcher-control"
          class="shw-theme-switcher__label"
        >Theme:</label>
        <select
          id="shw-theme-switcher-control"
          class="shw-theme-switcher__control"
          {{on "change" this.onChangeStylesheetOption}}
        >
          {{#if (eq this.selectedStylesheetOption "combined-strategies")}}
            <option
              value={{HdsThemeValues.System}}
              selected={{eq this.hdsTheming.currentTheme HdsThemeValues.System}}
            >System (prefers-color-scheme)</option>
          {{/if}}
          <option
            value={{HdsThemeValues.Light}}
            selected={{eq this.hdsTheming.currentTheme HdsThemeValues.Light}}
          >Light ({{this.currentThemeSelector}})</option>
          <option
            value={{HdsThemeValues.Dark}}
            selected={{eq this.hdsTheming.currentTheme HdsThemeValues.Dark}}
          >Dark ({{this.currentThemeSelector}})</option>
        </select>
      {{/if}}

    </div>
  </template>
}
