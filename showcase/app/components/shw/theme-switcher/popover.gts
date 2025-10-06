/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { eq, and } from 'ember-truth-helpers';
import { hash, fn } from '@ember/helper';
import type Owner from '@ember/owner';

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
  standard: { main: 'No theming', detail: 'HDS / Standard' },
  'prefers-color-scheme': {
    main: 'Prefers-color-scheme',
    detail: 'Carbon (g0/g100) – System',
  },
  'css-selectors': {
    main: 'CSS Selectors',
    detail: 'HDS || Carbon (g0/g100) – Light/Dark',
  },
  'combined-strategies': {
    main: 'Advanced options',
    detail: 'HDS || Carbon (custom) – System/Light/Dark',
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
  @tracked selectedStylesheetOption;
  @tracked selectedLightThemeOption;
  @tracked selectedDarkThemeOption;
  @tracked selectedCssSelectorOption;

  constructor(owner: Owner, args: ShwThemeSwitcherPopoverSignature['Args']) {
    super(owner, args);
    this.selectedStylesheetOption = this.args.currentStylesheet;
    this.selectedLightThemeOption = this.args.currentLightTheme;
    this.selectedDarkThemeOption = this.args.currentDarkTheme;
    this.selectedCssSelectorOption = this.args.currentCssSelector;
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
      const opts: OnApplyArgs = {
        currentStylesheet: this.selectedStylesheetOption,
      };
      if (this.selectedStylesheetOption === 'combined-strategies') {
        opts.currentLightTheme = this.selectedLightThemeOption;
        opts.currentDarkTheme = this.selectedDarkThemeOption;
        opts.currentCssSelector = this.selectedCssSelectorOption;
      }
      this.args.onApply(opts);
    }

    // programmatically close the popover
    const popoverElement = document.getElementById(this.args.popoverId);
    if (popoverElement && 'hidePopover' in popoverElement) {
      popoverElement.hidePopover();
    }
  };

  <template>
    <div
      id={{@popoverId}}
      class="shw-theme-switcher-popover"
      popover
      ...attributes
    >
      <p class="shw-theme-switcher-popover__title">Theming options</p>
      <p class="shw-theme-switcher-popover__description">Choose how theming
        should be applied to the page:</p>
      <div class="shw-theme-switcher-popover__control-list">
        {{#each-in stylesheetOptions as |key text|}}
          <div class="shw-theme-switcher-popover__control-item-grid">
            <input
              type="radio"
              class="shw-theme-switcher__control-radio"
              id="shw-theme-switcher-popover__control-radio-{{key}}"
              name="shw-theme-switcher-popover__control-radio"
              value={{key}}
              checked={{eq this.selectedStylesheetOption key}}
              {{on "change" this.onChangeStylesheetOption}}
            />
            <label
              class="shw-theme-switcher__control-label"
              for="shw-theme-switcher-popover__control-radio-{{key}}"
            >{{text.main}}
              <span class="shw-theme-switcher__control-label-detail">=
                {{text.detail}}</span></label>
            {{#if
              (and
                (eq key "combined-strategies")
                (eq this.selectedStylesheetOption "combined-strategies")
              )
            }}
              <div class="shw-theme-switcher-popover__advanced-options">
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
                    @onChange={{(fn
                      this.onChangeAdvancedOption "css-selector"
                    )}}
                  />
                </div>
              </div>
            {{/if}}
          </div>
        {{/each-in}}
      </div>

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
