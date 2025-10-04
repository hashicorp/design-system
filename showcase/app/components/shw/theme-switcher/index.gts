/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { service } from '@ember/service';
import { eq } from 'ember-truth-helpers';
import { guidFor } from '@ember/object/internals';

import ShwTextBody from '../text/body';
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
} from '@hashicorp/design-system-components/services/hds-theming';
import type HdsThemingService from '@hashicorp/design-system-components/services/hds-theming';
import type {
  HdsThemes,
  HdsModesLight,
  HdsModesDark,
  HdsCssSelectors,
  HdsThemingServiceOptions,
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

  get showThemeSelector(): boolean {
    return (
      this.currentStylesheet === 'css-selectors' ||
      this.currentStylesheet === 'combined-strategies'
    );
  }

  get themeSelectorOptions() {
    const themeSelectorOptions: Record<HdsThemeValues, string> = {};
    let xxx;
    switch (this.currentCssSelector) {
      case 'data':
        xxx = `[data-hds-theme=${this.currentTheme}]`;
        break;
      case 'class':
        xxx = `.hds-theme-${this.currentTheme}]`;
        break;
    }

    if (this.currentStylesheet === 'combined-strategies') {
      themeSelectorOptions[HdsThemeValues.System] =
        'System (prefers-color-scheme)';
    }
    themeSelectorOptions[HdsThemeValues.Light] = `Light ${xxx}`;
    themeSelectorOptions[HdsThemeValues.Dark] = `Dark ${xxx}`;

    return themeSelectorOptions;
  }

  onApplyThemingPreferences = (args: OnApplyArgs) => {
    const {
      currentStylesheet,
      currentLightTheme,
      currentDarkTheme,
      currentCssSelector,
    } = args;

    // update the
    this.currentStylesheet = currentStylesheet;
    this.currentLightTheme = currentLightTheme;
    this.currentDarkTheme = currentDarkTheme;
    this.currentCssSelector = currentCssSelector;

    let newStylesheet;
    switch (currentStylesheet) {
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
        [HdsThemeValues.Light]: currentLightTheme,
        [HdsThemeValues.Dark]: currentDarkTheme,
      },
      cssSelector: currentCssSelector,
    };

    this.hdsTheming.setThemingServiceOptions(customOptions);

    // we set the theme in the global service
    this.hdsTheming.setTheme(this.currentTheme);
  };

  onChangePageTheme = (event: Event) => {
    const select = event.target as HTMLSelectElement;
    const selectValue = select.value as HdsThemes;

    // we set the theme in the global service
    this.hdsTheming.setTheme(selectValue);
  };

  <template>
    <div class="shw-theme-switcher">
      <ShwTextBody @tag="span">Theming options:</ShwTextBody>
      <pre>{{this.showThemeSelector}}</pre>
      <pre>{{this.currentStylesheet}}</pre>
      {{#if this.showThemeSelector}}
        <ShwThemeSwitcherControlSelect
          @label="Theme:"
          @values={{this.themeSelectorOptions}}
          @selectedValue={{this.currentTheme}}
          @onChange={{this.onChangePageTheme}}
        />
      {{/if}}

      <button
        type="button"
        class="shw-theme-switcher__options-button"
        popovertarget={{this.popoverId}}
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
