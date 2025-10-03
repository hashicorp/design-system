/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { eq } from 'ember-truth-helpers';
import { hash, fn } from '@ember/helper';

import ShwThemeSwitcherControlSelect from './control/select';

import {
  MODES_LIGHT,
  MODES_DARK,
} from '@hashicorp/design-system-components/services/hds-theming';
import type {
  HdsModesLight,
  HdsModesDark,
  HdsCssSelectors,
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

export interface OnApplyArgs {
  currentStylesheet: string;
  currentLightTheme?: HdsModesLight;
  currentDarkTheme?: HdsModesDark;
  currentCssSelector?: HdsCssSelectors;
}

export interface ShwThemeSwitcherPopoverSignature {
  Args: {
    popoverId: string;
    currentStylesheet: string;
    currentLightTheme?: HdsModesLight;
    currentDarkTheme?: HdsModesDark;
    currentCssSelector?: HdsCssSelectors;
    onApply: (args: OnApplyArgs) => void;
  };
  Element: HTMLDivElement;
}

export default class ShwThemeSwitcherPopover extends Component<ShwThemeSwitcherPopoverSignature> {
  @tracked selectedStylesheetOption = this.args.currentStylesheet;
  @tracked selectedLightThemeOption: HdsModesLight =
    this.args.currentLightTheme;
  @tracked selectedDarkThemeOption: HdsModesDark = this.args.currentDarkTheme;
  @tracked selectedCssSelectorOption: HdsCssSelectors =
    this.args.currentCssSelector;

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
        this.selectedLightThemeOption = select.value as HdsModesLight;
        break;
      case 'dark-theme':
        this.selectedDarkThemeOption = select.value as HdsModesDark;
        break;
      case 'css-selector':
        this.selectedCssSelectorOption = select.value as HdsCssSelectors;
        break;
    }
  };

  onApplyThemingPreferences = () => {
    if (typeof this.args.onApply === 'function') {
      this.args.onApply({
        currentStylesheet: this.selectedStylesheetOption,
        currentLightTheme: this.selectedLightThemeOption,
        currentDarkTheme: this.selectedDarkThemeOption,
        currentCssSelector: this.selectedCssSelectorOption,
      });
    }

    // programmatically close the popover
    const popoverElement = document.getElementById(this.args.popoverId);
    if (popoverElement && 'hidePopover' in popoverElement) {
      popoverElement.hidePopover();
    }
  };

  <template>
    <div id={{@popoverId}} popover ...attributes>
      <p class="shw-theme-switcher-popover__title">Stylesheet</p>
      <p class="shw-theme-switcher-popover__description">Choose which stylesheed
        should be injected in the pages:</p>
      <div class="shw-theme-switcher-popover__control-list">
        {{#each-in stylesheetOptions as |key text|}}
          <div class="shw-theme-switcher-popover__control-item">
            <input
              type="radio"
              class="shw-theme-switcher-popover__control-radio"
              id="shw-theme-switcher-popover__control-radio-{{key}}"
              name="shw-theme-switcher-popover__control-radio"
              value={{key}}
              checked={{eq this.selectedStylesheetOption key}}
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
          <p class="shw-theme-switcher-popover__description">You can change what
            modes are used for the light/dark themes, and what CSS selector is
            used for to apply the mode to the page:</p>

          <div class="shw-theme-switcher-popover__control-list">
            <ShwThemeSwitcherControlSelect
              @label="Light"
              @values={{MODES_LIGHT}}
              @selectedValue={{this.selectedLightThemeOption}}
              @onChange={{(fn this.onChangeAdvancedOption "light-theme")}}
            />
            <ShwThemeSwitcherControlSelect
              @label="Dark"
              @values={{MODES_DARK}}
              @selectedValue={{this.selectedDarkThemeOption}}
              @onChange={{(fn this.onChangeAdvancedOption "dark-theme")}}
            />
            <ShwThemeSwitcherControlSelect
              @label="CSS selector"
              @values={{(hash data="data attribute" class="CSS class")}}
              @selectedValue={{this.selectedCssSelectorOption}}
              @onChange={{(fn this.onChangeAdvancedOption "css-selector")}}
            />
          </div>
        </div>
      {{/if}}

      <div class="shw-theme-switcher-popover__actions">
        <button
          type="button"
          class="shw-theme-switcher-popover__button shw-theme-switcher-popover__button--primary"
          {{on "click" this.onApplyThemingPreferences}}
        >
          Apply
        </button>
        <button
          type="button"
          class="shw-theme-switcher-popover__button shw-theme-switcher-popover__button--secondary"
          popovertarget={{@popoverId}}
          popovertargetaction="hide"
        >
          Cancel
        </button>
      </div>
    </div>
  </template>
}
