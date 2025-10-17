/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { hash, fn } from '@ember/helper';
import { service } from '@ember/service';
import type Owner from '@ember/owner';

import ShwThemeSwitcherControlSelect from './control/select';
import ShwThemeSwitcherControlToggle from './control/toggle';

import HdsThemingService from '@hashicorp/design-system-components/services/hds-theming';
import {
  MODES_LIGHT,
  MODES_DARK,
} from '@hashicorp/design-system-components/services/hds-theming';
import type {
  HdsModesLight,
  HdsModesDark,
  HdsCssSelectors,
} from '@hashicorp/design-system-components/services/hds-theming';

import type { OnApply, OnApplyOptions } from './index';

interface ShwThemeSwitcherPopoverSignature {
  Args: {
    popoverId: string;
    hasFixedControls: boolean;
    hasDebuggingPanel: boolean;
    onApply: OnApply;
  };
  Element: HTMLDivElement;
}

export default class ShwThemeSwitcherPopover extends Component<ShwThemeSwitcherPopoverSignature> {
  @service declare readonly hdsTheming: HdsThemingService;

  @tracked selectedLightTheme;
  @tracked selectedDarkTheme;
  @tracked selectedCssSelector;
  @tracked hasFixedControls: boolean;
  @tracked hasDebuggingPanel: boolean;

  constructor(owner: Owner, args: ShwThemeSwitcherPopoverSignature['Args']) {
    super(owner, args);
    this.selectedLightTheme = this.hdsTheming.currentLightTheme;
    this.selectedDarkTheme = this.hdsTheming.currentDarkTheme;
    this.selectedCssSelector = this.hdsTheming.currentCssSelector;
    this.hasFixedControls = this.args.hasFixedControls;
    this.hasDebuggingPanel = this.args.hasDebuggingPanel;
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

  onTogglePreference = (preferenceName: string, event: Event) => {
    const input = event.target as HTMLInputElement;
    switch (preferenceName) {
      case 'fixed-controls':
        this.hasFixedControls = input.checked;
        break;
      case 'debugging-panel':
        this.hasDebuggingPanel = input.checked;
        break;
    }
  };

  onApplyThemingPreferences = () => {
    this.hdsTheming.setThemingServiceOptions({
      lightTheme: this.selectedLightTheme,
      darkTheme: this.selectedDarkTheme,
      cssSelector: this.selectedCssSelector,
    });

    if (typeof this.args.onApply === 'function') {
      const options = {
        hasFixedControls: this.hasFixedControls,
        hasDebuggingPanel: this.hasDebuggingPanel,
      } as OnApplyOptions;
      this.args.onApply(options);
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

      <div class="shw-theme-switcher-popover__options-list">
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

      <hr class="shw-theme-switcher-popover__separator" />

      <p class="shw-theme-switcher-popover__description">You can fix the theming
        controls on the page, and show an extra debugging panel:</p>

      <div class="shw-theme-switcher-popover__options-list">
        <ShwThemeSwitcherControlToggle
          @label="Fixed controls"
          @checked={{@hasFixedControls}}
          @onToggle={{(fn this.onTogglePreference "fixed-controls")}}
        />
        <ShwThemeSwitcherControlToggle
          @label="Debugging panel"
          @checked={{@hasDebuggingPanel}}
          @onToggle={{(fn this.onTogglePreference "debugging-panel")}}
        />
      </div>

      <hr class="shw-theme-switcher-popover__separator" />

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
