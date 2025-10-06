/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { guidFor } from '@ember/object/internals';

import ShwThemeSwitcherPopover from './popover';
import ShwThemeSwitcherControlSelect from './control/select';
import type { OnApplyArgs } from './popover';

import config from 'showcase/config/environment';
import { HdsIcon } from '@hashicorp/design-system-components/components';
import {
  HdsThemeValues,
  HdsModesLightValues,
  HdsModesDarkValues,
  HdsCssSelectorsValues,
  DEFAULT_THEMING_OPTIONS,
} from '@hashicorp/design-system-components/services/hds-theming';
import type HdsThemingService from '@hashicorp/design-system-components/services/hds-theming';
import type {
  HdsThemes,
  HdsModesLight,
  HdsModesDark,
  HdsCssSelectors,
  // HdsThemingServiceOptions,
} from '@hashicorp/design-system-components/services/hds-theming';

export default class ShwThemeSwitcher extends Component {
  @service declare readonly hdsTheming: HdsThemingService;

  @tracked currentStylesheet = 'standard';
  @tracked currentLightTheme: HdsModesLight | undefined =
    HdsModesLightValues.CdsG0;
  @tracked currentDarkTheme: HdsModesDark | undefined =
    HdsModesDarkValues.CdsG100;
  @tracked currentCssSelector: HdsCssSelectors | undefined =
    HdsCssSelectorsValues.Data;
  @tracked currentTheme: HdsThemes;

  popoverId = `shw-theming-options-popover-${guidFor(this)}`;

  get themeSelectorOptions() {
    let themeSelectorOptions;
    switch (this.currentStylesheet) {
      case 'prefers-color-scheme':
        themeSelectorOptions = {
          system: 'Carbon / System',
        };
        break;
      case 'css-selectors':
        themeSelectorOptions = {
          [HdsThemeValues.Light as string]: 'Carbon / Light',
          [HdsThemeValues.Dark as string]: 'Carbon / Dark',
        };
        break;
      case 'combined-strategies':
        themeSelectorOptions = {
          standard: 'HDS / Standard (No theming)',
          [HdsThemeValues.System]: 'Carbon / System',
          [HdsThemeValues.Light]: 'Carbon / Light',
          [HdsThemeValues.Dark]: 'Carbon / Dark',
        };
        break;
      default:
        themeSelectorOptions = {
          none: 'HDS / Standard (No theming)',
        };
        break;
    }

    return themeSelectorOptions;
  }

  onApplyThemingPreferences = (args: OnApplyArgs) => {
    const {
      currentStylesheet,
      currentLightTheme,
      currentDarkTheme,
      currentCssSelector,
    } = args;

    console.log(
      'onApplyThemingPreferences invoked',
      `currentStylesheet=${currentStylesheet}`,
      `currentLightTheme=${currentLightTheme}`,
      `currentDarkTheme=${currentDarkTheme}`,
      `currentCssSelector=${currentCssSelector}`,
    );

    // update the theming preferences
    this.currentStylesheet = currentStylesheet;
    this.currentLightTheme = currentLightTheme;
    this.currentDarkTheme = currentDarkTheme;
    this.currentCssSelector = currentCssSelector;

    let newStylesheet;
    switch (this.currentStylesheet) {
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

    // we set the theming options in the global service (before setting the theme)
    if (this.currentStylesheet === 'combined-strategies') {
      // we use the "advanced options" settings
      this.hdsTheming.setThemingServiceOptions({
        themeMap: {
          [HdsThemeValues.Light]: this.currentLightTheme,
          [HdsThemeValues.Dark]: this.currentDarkTheme,
        },
        cssSelector: this.currentCssSelector,
      });
    } else {
      // we reset the service to the default options
      this.hdsTheming.setThemingServiceOptions(DEFAULT_THEMING_OPTIONS);
    }

    // update the current theme
    switch (this.currentStylesheet) {
      case 'prefers-color-scheme':
        this.currentTheme = HdsThemeValues.System;
        break;
      case 'css-selectors':
      case 'combined-strategies': // advanced
        // default to light if current theme is not already dark or light
        this.currentTheme =
          this.currentTheme === HdsThemeValues.Dark
            ? HdsThemeValues.Dark
            : HdsThemeValues.Light;
        break;
        break;
      default:
        this.currentTheme = undefined;
        break;
    }

    // we set the theme in the global service
    this.hdsTheming.setTheme(this.currentTheme);
  };

  onChangePageTheme = (event: Event) => {
    const select = event.target as HTMLSelectElement;
    const selectValue = select.value;

    const newPageTheme =
      selectValue === 'none'
        ? // `none` or `system`
          undefined
        : // `light` or `dark`
          (selectValue as HdsThemes);

    console.log(
      'onChangePageTheme invoked',
      `selectValue=${selectValue}`,
      `newPageTheme=${newPageTheme}`,
    );

    // we set the theme in the global service
    this.hdsTheming.setTheme(newPageTheme);
  };

  <template>
    <div class="shw-theme-switcher">
      <ShwThemeSwitcherControlSelect
        @label="Theming:"
        @values={{this.themeSelectorOptions}}
        @selectedValue={{this.currentTheme}}
        @onChange={{this.onChangePageTheme}}
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
        @currentStylesheet={{this.currentStylesheet}}
        @currentLightTheme={{this.currentLightTheme}}
        @currentDarkTheme={{this.currentDarkTheme}}
        @currentCssSelector={{this.currentCssSelector}}
        @onApply={{this.onApplyThemingPreferences}}
      />
    </div>
  </template>
}
