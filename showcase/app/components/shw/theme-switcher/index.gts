/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { guidFor } from '@ember/object/internals';

import ShwThemeSwitcherPopover from './popover';
import ShwThemeSwitcherSelector from './selector';
import type { OnApplyArgs } from './popover';
import type { OnSelectThemeArgs } from './selector';

import config from 'showcase/config/environment';
import { HdsIcon } from '@hashicorp/design-system-components/components';
import {
  HdsThemeValues,
  HdsModesLightValues,
  HdsModesDarkValues,
  HdsCssSelectorsValues,
  // DEFAULT_THEMING_OPTIONS,
} from '@hashicorp/design-system-components/services/hds-theming';
import type HdsThemingService from '@hashicorp/design-system-components/services/hds-theming';
import type {
  HdsThemes,
  HdsModesLight,
  HdsModesDark,
  HdsCssSelectors,
  // HdsThemingServiceOptions,
} from '@hashicorp/design-system-components/services/hds-theming';

const updatePageStylesheet = (currentStylesheet: string) => {
  let newStylesheet;
  switch (currentStylesheet) {
    case 'prefers-color-scheme':
      // themed CSS where theming is applied via `@media(prefers-color-scheme)`
      newStylesheet =
        'assets/styles/@hashicorp/design-system-components-theming-with-prefers-color-scheme.css';
      break;
    case 'css-selectors':
      // themed CSS where theming is applied via CSS selectors
      newStylesheet =
        'assets/styles/@hashicorp/design-system-components-theming-with-css-selectors.css';
      break;
    case 'combined-strategies':
      // this is used for local testing purposes
      newStylesheet =
        'assets/styles/@hashicorp/design-system-components-theming-with-combined-strategies.css';
      break;
    default:
      // this is the standard CSS for HDS components, without any theming
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
};

export default class ShwThemeSwitcher extends Component {
  @service declare readonly hdsTheming: HdsThemingService;

  @tracked currentStylesheet = 'standard';
  @tracked currentTheme: HdsThemes = undefined;
  @tracked currentLightTheme: HdsModesLight = HdsModesLightValues.CdsG0;
  @tracked currentDarkTheme: HdsModesDark = HdsModesDarkValues.CdsG100;
  @tracked currentCssSelector: HdsCssSelectors = HdsCssSelectorsValues.Data;

  popoverId = `shw-theming-options-popover-${guidFor(this)}`;

  onSelectPageTheme = (args: OnSelectThemeArgs) => {
    const { currentStylesheet, currentTheme } = args;

    console.log(
      'onSelectPageTheme invoked',
      `currentStylesheet=${currentStylesheet}`,
      `currentTheme=${currentTheme}`,
    );

    // update the theming preferences
    this.currentStylesheet = currentStylesheet;
    this.currentTheme = currentTheme;

    // update the page's stylesheet
    updatePageStylesheet(this.currentStylesheet);

    // we set the theme in the global service
    this.hdsTheming.setTheme(this.currentTheme);
  };

  onApplyAdvancedThemingPreferences = (args: OnApplyArgs) => {
    const { currentLightTheme, currentDarkTheme, currentCssSelector } = args;

    console.log(
      'onApplyAdvancedThemingPreferences invoked',
      `currentLightTheme=${currentLightTheme}`,
      `currentDarkTheme=${currentDarkTheme}`,
      `currentCssSelector=${currentCssSelector}`,
    );

    // update the theming preferences
    this.currentLightTheme = currentLightTheme;
    this.currentDarkTheme = currentDarkTheme;
    this.currentCssSelector = currentCssSelector;

    // update the theming options in the global service
    this.hdsTheming.setThemingServiceOptions({
      themeMap: {
        [HdsThemeValues.Light]: this.currentLightTheme,
        [HdsThemeValues.Dark]: this.currentDarkTheme,
      },
      cssSelector: this.currentCssSelector,
    });
  };

  <template>
    <div class="shw-theme-switcher">
      <ShwThemeSwitcherSelector
        @currentStylesheet={{this.currentStylesheet}}
        @currentTheme={{this.currentTheme}}
        @currentLightTheme={{this.currentLightTheme}}
        @currentDarkTheme={{this.currentDarkTheme}}
        @onSelectTheme={{this.onSelectPageTheme}}
      />
      <button
        type="button"
        class="shw-theme-switcher__options-button"
        popovertarget={{this.popoverId}}
        aria-label="Options for theming"
      >
        <HdsIcon @name="settings" /></button>
      <ShwThemeSwitcherPopover
        @popoverId={{this.popoverId}}
        @currentLightTheme={{this.currentLightTheme}}
        @currentDarkTheme={{this.currentDarkTheme}}
        @currentCssSelector={{this.currentCssSelector}}
        @onApply={{this.onApplyAdvancedThemingPreferences}}
      />
    </div>
  </template>
}
