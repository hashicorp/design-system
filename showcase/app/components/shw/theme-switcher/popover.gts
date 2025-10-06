/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
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

export interface OnApplyArgs {
  currentLightTheme: HdsModesLight;
  currentDarkTheme: HdsModesDark;
  currentCssSelector: HdsCssSelectors;
}

export interface ShwThemeSwitcherPopoverSignature {
  Args: {
    popoverId: string;
    currentLightTheme: HdsModesLight;
    currentDarkTheme: HdsModesDark;
    currentCssSelector: HdsCssSelectors;
    onApply: (args: OnApplyArgs) => void;
  };
  Element: HTMLDivElement;
}

export default class ShwThemeSwitcherPopover extends Component<ShwThemeSwitcherPopoverSignature> {
  @tracked selectedLightTheme;
  @tracked selectedDarkTheme;
  @tracked selectedCssSelector;

  constructor(owner: Owner, args: ShwThemeSwitcherPopoverSignature['Args']) {
    super(owner, args);
    this.selectedLightTheme = this.args.currentLightTheme;
    this.selectedDarkTheme = this.args.currentDarkTheme;
    this.selectedCssSelector = this.args.currentCssSelector;
  }

  onChangeAdvancedOption = (optionName: string, event: Event) => {
    const select = event.target as HTMLSelectElement;
    switch (optionName) {
      case 'light-theme':
        this.selectedLightTheme = select.value as HdsModesLight;
        break;
      case 'dark-theme':
        this.selectedDarkTheme = select.value as HdsModesDark;
        break;
      case 'css-selector':
        this.selectedCssSelector = select.value as HdsCssSelectors;
        break;
    }
  };

  onApplyThemingPreferences = () => {
    if (typeof this.args.onApply === 'function') {
      this.args.onApply({
        currentLightTheme: this.selectedLightTheme,
        currentDarkTheme: this.selectedDarkTheme,
        currentCssSelector: this.selectedCssSelector,
      });
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
      <p class="shw-theme-switcher-popover__title">Advanced options</p>
      <p class="shw-theme-switcher-popover__description">You can change what
        modes are used for the light/dark themes, and what CSS selector is used
        to apply the mode to the page:</p>
      <div class="shw-theme-switcher-popover__advanced-options">
        <ShwThemeSwitcherControlSelect
          @label="Light"
          @values={{MODES_LIGHT}}
          @selectedValue={{this.selectedLightTheme}}
          @onChange={{(fn this.onChangeAdvancedOption "light-theme")}}
        />
        <ShwThemeSwitcherControlSelect
          @label="Dark"
          @values={{MODES_DARK}}
          @selectedValue={{this.selectedDarkTheme}}
          @onChange={{(fn this.onChangeAdvancedOption "dark-theme")}}
        />
        <ShwThemeSwitcherControlSelect
          @label="CSS selector"
          @values={{(hash data="data attribute" class="CSS class")}}
          @selectedValue={{this.selectedCssSelector}}
          @onChange={{(fn this.onChangeAdvancedOption "css-selector")}}
        />
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
