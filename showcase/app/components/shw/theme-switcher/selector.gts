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

import type { HdsThemes } from '@hashicorp/design-system-components/services/hds-theming';

import HdsThemingService from '@hashicorp/design-system-components/services/hds-theming';

export default class ShwThemeSwitcherSelector extends Component {
  @service declare readonly hdsTheming: HdsThemingService;
  @service declare readonly shwTheming: ShwThemingService;

  get gLight() {
    return this.hdsTheming.currentLightTheme.replace('cds-', '');
  }

  get gDark() {
    return this.hdsTheming.currentDarkTheme.replace('cds-', '');
  }

  get selectedOption() {
    return `${this.shwTheming.currentStylesheet ?? 'no-theming'}|${this.hdsTheming.currentTheme ?? ''}`;
  }

  get themingOptions(): Record<string, Record<string, string>> {
    return {
      'No theming': {
        'no-theming|': 'HDS / Standard',
      },
      'Theming via prefers-color-scheme': {
        'prefers-color-scheme|system': 'Carbon / System',
      },
      'Theming via CSS selectors': {
        'css-selectors|': 'HDS / Default',
        'css-selectors|light': `Carbon / Light (${this.gLight})`,
        'css-selectors|dark': `Carbon / Dark (${this.gDark})`,
      },
      'Theming via combined strategies': {
        'combined-strategies|': 'HDS / Default',
        'combined-strategies|system': 'Carbon / System',
        'combined-strategies|light': `Carbon / Light (${this.gLight})`,
        'combined-strategies|dark': `Carbon / Dark (${this.gDark})`,
      },
    };
  }

  onSelectPageTheme = (event: Event) => {
    const select = event.target as HTMLSelectElement;
    const selectValue = select.value;

    const [selectedStylesheet, selectedTheme] = selectValue.split('|') as [
      ShwStylesheets,
      HdsThemes,
    ];

    console.log(
      '🚦 onSelectPageTheme invoked',
      `selectedStylesheet=${selectedStylesheet}`,
      `selectedTheme=${selectedTheme}`,
    );

    // we set the `currentStylesheet` in the `shwTheming` service
    this.shwTheming.setStylesheet(selectedStylesheet);
    // we set the `currentTheme` in the `hdsTheming` service
    this.hdsTheming.setTheme(selectedTheme, ({ currentTheme, currentMode }) => {
      console.log(
        '➡️ LOCAL INVOCATION via setShwHdsThemes callback',
        currentTheme,
        currentMode,
      );
    });
  };

  <template>
    <ShwThemeSwitcherControlSelect
      @label="Theming:"
      @onChange={{this.onSelectPageTheme}}
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
