/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { eq } from 'ember-truth-helpers';
import { service } from '@ember/service';

import ShwThemeSwitcherControlSelect from './control/select';
import ShwThemingService from 'showcase/services/shw-theming';
import type { ShwStylesheets } from 'showcase/services/shw-theming';
import type { ShwThemeSwitcherControlSelectSignature } from './control/select';

import type { HdsThemes } from '@hashicorp/design-system-components/services/hds-theming';

import HdsThemingService from '@hashicorp/design-system-components/services/hds-theming';

interface ShwThemeSwitcherSelectorSignature {
  Args: {
    showAdvancedOptions?: boolean;
    isCarbonizationPage?: boolean;
  };
  Element: ShwThemeSwitcherControlSelectSignature['Element'];
}

export default class ShwThemeSwitcherSelector extends Component<ShwThemeSwitcherSelectorSignature> {
  @service declare readonly hdsTheming: HdsThemingService;
  @service declare readonly shwTheming: ShwThemingService;

  get gLight() {
    return this.hdsTheming.currentLightTheme.replace('cds-', '');
  }

  get gDark() {
    return this.hdsTheming.currentDarkTheme.replace('cds-', '');
  }

  get selectedOption() {
    return `${this.shwTheming.currentStylesheet ?? 'standard'}|${this.hdsTheming.currentTheme ?? ''}`;
  }

  get themingOptions(): Record<string, Record<string, string>> {
    if (this.args.isCarbonizationPage === true) {
      return { 'Carbonized page': { '---': '---------' } };
    }

    const defaultOptions = {
      'No theming': {
        'standard|': 'HDS / Standard',
      },
      'Theming via CSS selectors / Migration': {
        'css-selectors--migration|default': 'HDS / Default',
        'css-selectors--migration|system': 'Carbon / System',
        'css-selectors--migration|light': 'Carbon / Light',
        'css-selectors--migration|dark': 'Carbon / Dark',
      },
      'Theming via CSS selectors / Final': {
        'css-selectors|system': 'Carbon / System',
        'css-selectors|light': 'Carbon / Light',
        'css-selectors|dark': 'Carbon / Dark',
      },
    };
    const advancedOptions = {
      'Theming via CSS selectors / Advanced': {
        'css-selectors--advanced|default': 'HDS / Default',
        'css-selectors--advanced|system': 'Carbon / System',
        'css-selectors--advanced|light': `Carbon / Light (${this.gLight})`,
        'css-selectors--advanced|dark': `Carbon / Dark (${this.gDark})`,
      },
    };

    return this.args.showAdvancedOptions
      ? { ...defaultOptions, ...advancedOptions }
      : defaultOptions;
  }

  onSelectPageTheme = (event: Event) => {
    const select = event.target as HTMLSelectElement;
    const selectValue = select.value;

    const [selectedStylesheet, selectedTheme] = selectValue.split('|') as [
      ShwStylesheets,
      HdsThemes | '',
    ];

    // we set the `currentStylesheet` in the `shwTheming` service
    this.shwTheming.setStylesheet(selectedStylesheet);
<<<<<<< HEAD

    // we set the `currentTheme` in the `hdsTheming` service
    this.hdsTheming.setTheme({
      theme: selectedTheme === '' ? undefined : selectedTheme,
      // example of how a consumer could use the `onSetTheme` callback by passing it to the `setTheme` function as extra option
      // onSetTheme: ({ currentTheme, currentMode }) => {
      //   console.log(
      //     '➡️ LOCAL INVOCATION via setShwHdsThemes callback',
=======
    // we set the `currentTheme` in the `shwTheming` service
    this.shwTheming.setAppTheme({
      theme: selectedTheme === '' ? undefined : selectedTheme,
      // example of how a consumer could use the `onSetTheme` callback by passing it to the `setAppTheme` function as extra option,
      // which then will be forwarded to the `setTheme` callback of the `hdsTheming` service as `onSetTheme` optional argument
      //
      // onSetTheme: ({ currentTheme, currentMode }) => {
      //   console.log(
      //     '➡️ LOCAL INVOCATION via `onSetTheme` callback',
>>>>>>> project-solar/phase-1-main-feature-branch
      //     currentTheme,
      //     currentMode,
      //   );
      // },
    });
  };

  <template>
    <ShwThemeSwitcherControlSelect
      @label="Theming:"
      @onChange={{this.onSelectPageTheme}}
      disabled={{if @isCarbonizationPage true undefined}}
    >
      {{#each-in this.themingOptions as |groupLabel options|}}
        <optgroup label={{groupLabel}}>
          {{#each-in options as |value label|}}
            <option
              value={{value}}
              selected={{(eq this.selectedOption value)}}
            >{{label}}</option>
          {{/each-in}}
        </optgroup>
      {{/each-in}}
    </ShwThemeSwitcherControlSelect>
  </template>
}
