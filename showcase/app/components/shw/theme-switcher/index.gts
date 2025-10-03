/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { service } from '@ember/service';
import { eq, or } from 'ember-truth-helpers';
import { hash, fn } from '@ember/helper';

import ShwTextBody from '../text/body';
import ShwThemeSwitcherControlSelect from './control/select';

import config from 'showcase/config/environment';
import { HdsIcon } from '@hashicorp/design-system-components/components';
import {
  HdsThemeValues,
  HdsModeValues,
} from '@hashicorp/design-system-components/services/hds-theming';
import { MODES } from '@hashicorp/design-system-components/services/hds-theming';
import type HdsThemingService from '@hashicorp/design-system-components/services/hds-theming';
import type {
  // HdsThemes,
  HdsModes,
  ThemeSelector,
  HdsThemingServiceOptions,
} from '@hashicorp/design-system-components/services/hds-theming';

const stylesheetOptions = {
  standard: { main: 'Standard', detail: 'HDS / No theming' },
  'prefers-color-scheme': {
    main: 'Prefers-color-scheme',
    detail: 'HDS || Carbon / System',
  },
  'css-selectors': {
    main: 'CSS Selectors',
    detail: 'HDS || Carbon - Light/Dark',
  },
  'combined-strategies': {
    main: 'Combined strategies',
    detail: 'HDS || Carbon - System/Light/Dark',
  },
};

// const getCssSelectorFullText = (
//   cssSelector: ThemeSelector,
//   theme: HdsThemes,
// ) => {
//   switch (cssSelector) {
//     case 'data':
//       return `[data-hds-theme=${theme}]`;
//     case 'class':
//       return `.hds-theme-${theme}]`;
//   }
// };

export default class ShwThemeSwitcher extends Component {
  @service declare readonly hdsTheming: HdsThemingService;

  @tracked currentStylesheet = 'standard';
  @tracked currentLightTheme: HdsModes = HdsModeValues.CdsG0;
  @tracked currentDarkTheme: HdsModes = HdsModeValues.CdsG100;
  @tracked currentCssSelector: ThemeSelector = 'data';
  @tracked selectedStylesheetOption = this.currentStylesheet;
  @tracked selectedLightThemeOption: HdsModes = this.currentLightTheme;
  @tracked selectedDarkThemeOption: HdsModes = this.currentDarkTheme;
  @tracked selectedCssSelector: ThemeSelector = this.currentCssSelector;

  get showAdvancedOptions(): boolean {
    return (
      this.selectedStylesheetOption === 'css-selectors' ||
      this.selectedStylesheetOption === 'combined-strategies'
    );
  }

  onChangeStylesheetOption = (event: Event) => {
    const select = event.target as HTMLSelectElement;
    this.selectedStylesheetOption = select.value;
  };

  onChangeAdvancedOption = (optionName: string, event: Event) => {
    const select = event.target as HTMLSelectElement;
    switch (optionName) {
      case 'light-theme':
        this.selectedLightThemeOption = select.value as HdsModes;
        break;
      case 'dark-theme':
        this.selectedDarkThemeOption = select.value as HdsModes;
        break;
      case 'css-selector':
        this.selectedCssSelector = select.value as ThemeSelector;
        break;
    }
  };

  applyThemingPreferences = () => {
    this.currentStylesheet = this.selectedStylesheetOption;
    this.currentLightTheme = this.selectedLightThemeOption;
    this.currentDarkTheme = this.selectedDarkThemeOption;
    this.currentCssSelector = this.selectedCssSelector;

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
      themeSelector: this.currentCssSelector,
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
    <div class="shw-theme-switcher">
      <ShwTextBody @tag="span">Theming options:</ShwTextBody>
      {{#if
        (or
          (eq this.selectedStylesheetOption "css-selectors")
          (eq this.selectedStylesheetOption "combined-strategies")
        )
      }}
        <label
          for="shw-theme-switcher-control"
          class="shw-theme-switcher__control-label"
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
          >Light ({{this.currentCssSelector}})</option>
          <option
            value={{HdsThemeValues.Dark}}
            selected={{eq this.hdsTheming.currentTheme HdsThemeValues.Dark}}
          >Dark ({{this.currentCssSelector}})</option>
        </select>
      {{/if}}
      <button
        class="shw-theme-switcher__options-button"
        type="button"
        popovertarget="shw-theming-options-popover"
      >
        <HdsIcon
          @name="settings"
          class="shw-theme-switcher__settings"
        /></button>

      <div id="shw-theming-options-popover" popover>
        <p class="shw-theme-switcher-popover__title">Stylesheet</p>
        <p class="shw-theme-switcher-popover__description">Choose which
          stylesheed should be injected in the pages:</p>
        <div class="shw-theme-switcher-popover__control-list">
          {{#each-in stylesheetOptions as |key text|}}
            <div class="shw-theme-switcher-popover__control-item">
              <input
                type="radio"
                class="shw-theme-switcher-popover__control-radio"
                id="shw-theme-switcher-popover__control-radio-{{key}}"
                name="shw-theme-switcher-popover__control-radio"
                value={{key}}
                checked={{eq this.currentStylesheet key}}
                {{on "change" this.onChangeStylesheetOption}}
              />
              <label
                class="shw-theme-switcher__control-label"
                for="shw-theme-switcher-popover__control-radio-{{key}}"
              >{{text.main}} <span>– {{text.detail}}</span></label>
            </div>
          {{/each-in}}
        </div>

        {{#if this.showAdvancedOptions}}
          <div class="shw-theme-switcher-popover__advanced-options">
            <p class="shw-theme-switcher-popover__title">Advanced options</p>
            <p class="shw-theme-switcher-popover__description">You can change
              what modes are used for the light/dark themes, and what CSS
              selector is used for to apply the mode to the page:</p>

            <div class="shw-theme-switcher-popover__control-list">
              <ShwThemeSwitcherControlSelect
                @label="Light"
                @values={{MODES}}
                @selectedValue={{this.currentLightTheme}}
                @onChange={{(fn this.onChangeAdvancedOption "light-theme")}}
              />
              <ShwThemeSwitcherControlSelect
                @label="Dark"
                @values={{MODES}}
                @selectedValue={{this.currentDarkTheme}}
                @onChange={{(fn this.onChangeAdvancedOption "dark-theme")}}
              />
              <ShwThemeSwitcherControlSelect
                @label="CSS selector"
                @values={{(hash data="data attribute" class="CSS class")}}
                @selectedValue={{this.currentCssSelector}}
                @onChange={{(fn this.onChangeAdvancedOption "css-selector")}}
              />
            </div>
          </div>
        {{/if}}

        <div class="shw-theme-switcher-popover__actions">
          <button
            type="button"
            class="shw-theme-switcher-popover__button shw-theme-switcher-popover__button--primary"
            {{on "click" this.applyThemingPreferences}}
          >
            Apply
          </button>
          <button
            type="button"
            class="shw-theme-switcher-popover__button shw-theme-switcher-popover__button--secondary"
            popovertarget="shw-theming-options-popover"
            popovertargetaction="hide"
          >
            Cancel
          </button>
        </div>
      </div>

    </div>
  </template>
}
