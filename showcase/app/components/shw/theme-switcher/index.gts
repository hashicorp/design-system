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

// const getCssSelectorFullText = (
//   cssSelector: HdsCssSelectors,
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
  @tracked currentLightTheme: HdsModesLight = HdsModesLightValues.CdsG0;
  @tracked currentDarkTheme: HdsModesDark = HdsModesDarkValues.CdsG100;
  @tracked currentCssSelector: HdsCssSelectors = HdsCssSelectorsValues.Data;
  @tracked currentTheme: HdsThemes;

  popoverId = `shw-theming-options-popover-${guidFor(this)}`;

  get showThemeSelector(): boolean {
    return (
      this.currentStylesheet === 'css-selectors' ||
      this.currentStylesheet === 'combined-strategies'
    );
  }

  onApplyThemingPreferences = (args: OnApplyArgs) => {
    const {
      currentStylesheet,
      currentLightTheme,
      currentDarkTheme,
      currentCssSelector,
    } = args;

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
      {{#if this.showThemeSelector}}
        <label
          for="shw-theme-switcher-control"
          class="shw-theme-switcher__control-label"
        >Theme:</label>
        <select
          id="shw-theme-switcher-control"
          class="shw-theme-switcher__control"
          {{on "change" this.onChangePageTheme}}
        >
          {{#if (eq this.currentStylesheet "combined-strategies")}}
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
