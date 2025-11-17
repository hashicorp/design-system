/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import { service } from '@ember/service';
import { modifier } from 'ember-modifier';

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
} from '@hashicorp/design-system-components/services/hds-theming';

import type { OnApply } from './index';

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

  // we use `!` (definite assignment assertion) because the actual assignment is done via the modifier
  _element!: HTMLDivElement;
  @tracked _selectedLightTheme!: HdsModesLight;
  @tracked _selectedDarkTheme!: HdsModesDark;
  @tracked _hasFixedControls!: boolean;
  @tracked _hasDebuggingPanel!: boolean;

  _registerPopover = modifier((element: HTMLDivElement) => {
    this._element = element;
    this._element.addEventListener('toggle', this.syncStates, true);
    return () => {
      this._element?.removeEventListener('toggle', this.syncStates, true);
    };
  });

  syncStates = (): void => {
    // we use this to initialize the values when the popover opens (instead of a constructor)
    // and reset them on close (in case the user dismiss without clicking "apply")
    // the reason for this is that the popover element is never removed from the DOM
    // so if a user selects an options and closes the popover without applying,
    // when it opens it back it would see the previous state, which not in sync with what
    // is actually stored in the components/services/localstorage
    this._selectedLightTheme = this.hdsTheming.currentLightTheme;
    this._selectedDarkTheme = this.hdsTheming.currentDarkTheme;
    this._hasFixedControls = this.args.hasFixedControls;
    this._hasDebuggingPanel = this.args.hasDebuggingPanel;
  };

  onChangeAdvancedOption = (optionName: string, event: Event) => {
    const select = event.target as HTMLSelectElement;
    switch (optionName) {
      case 'light-theme':
        this._selectedLightTheme = select.value as HdsModesLight;
        break;
      case 'dark-theme':
        this._selectedDarkTheme = select.value as HdsModesDark;
        break;
    }
  };

  onTogglePreference = (preferenceName: string, event: Event) => {
    const input = event.target as HTMLInputElement;
    switch (preferenceName) {
      case 'fixed-controls':
        this._hasFixedControls = input.checked;
        break;
      case 'debugging-panel':
        this._hasDebuggingPanel = input.checked;
        break;
    }
  };

  onApplyThemingPreferences = () => {
    this.hdsTheming.setTheme({
      // we reuse the current theme (we're not changing it here)
      theme: this.hdsTheming.currentTheme,
      // we update the options
      options: {
        lightTheme: this._selectedLightTheme,
        darkTheme: this._selectedDarkTheme,
      },
    });

    if (typeof this.args.onApply === 'function') {
      this.args.onApply({
        hasFixedControls: this._hasFixedControls,
        hasDebuggingPanel: this._hasDebuggingPanel,
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
      {{this._registerPopover}}
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
          @selectedValue={{this._selectedLightTheme}}
          @onChange={{(fn this.onChangeAdvancedOption "light-theme")}}
        />
        <ShwThemeSwitcherControlSelect
          @label="Dark"
          @values={{MODES_DARK}}
          @selectedValue={{this._selectedDarkTheme}}
          @onChange={{(fn this.onChangeAdvancedOption "dark-theme")}}
        />
      </div>

      <hr class="shw-theme-switcher-popover__separator" />

      <p class="shw-theme-switcher-popover__description">You can fix the theming
        controls on the page, and show an extra debugging panel:</p>

      <div class="shw-theme-switcher-popover__options-list">
        <ShwThemeSwitcherControlToggle
          @label="Fixed controls"
          @checked={{this._hasFixedControls}}
          @onToggle={{(fn this.onTogglePreference "fixed-controls")}}
        />
        <ShwThemeSwitcherControlToggle
          @label="Debugging panel"
          @checked={{this._hasDebuggingPanel}}
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
