/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { eq } from 'ember-truth-helpers';
import type Owner from '@ember/owner';

import ShwThemeSwitcherControlSelect from './control/select';

import type {
  HdsModesLight,
  HdsModesDark,
  HdsThemes,
} from '@hashicorp/design-system-components/services/hds-theming';

export interface ShwThemeSwitcherSelectorSignature {
  Args: {
    currentStylesheet: string;
    currentTheme: HdsThemes;
    currentLightTheme: HdsModesLight;
    currentDarkTheme: HdsModesDark;
    onSelectPageTheme?: (args: OnSelectPageThemeArgs) => void;
  };
  Element: HTMLDivElement;
}

export interface OnSelectPageThemeArgs {
  currentStylesheet: string;
  currentTheme: HdsThemes;
}

export default class ShwThemeSwitcherSelector extends Component<ShwThemeSwitcherSelectorSignature> {
  @tracked selectedStylesheet;
  @tracked selectedTheme;

  constructor(owner: Owner, args: ShwThemeSwitcherSelectorSignature['Args']) {
    super(owner, args);
    this.selectedStylesheet = this.args.currentStylesheet;
    this.selectedTheme = this.args.currentTheme;
  }

  get gLight() {
    return this.args.currentLightTheme.replace('cds-', '');
  }

  get gDark() {
    return this.args.currentDarkTheme.replace('cds-', '');
  }

  get selectedOption() {
    return `${this.selectedStylesheet}|${this.selectedTheme}`;
  }

  get themingOptions(): Record<string, Record<string, string>> {
    return {
      'No theming': {
        'standard|no-theming': 'HDS / Standard',
      },
      'Theming via prefers-color-scheme': {
        'prefers-color-scheme|system': 'Carbon / System',
      },
      'Theming via CSS selectors': {
        'css-selectors|standard': 'HDS / Default',
        'css-selectors|light': `Carbon / Light (${this.gLight})`,
        'css-selectors|dark': `Carbon / Dark (${this.gDark})`,
      },
      'Theming via combined strategies': {
        'combined-strategies|standard': 'HDS / Default',
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
      string,
      HdsThemes,
    ];

    this.selectedStylesheet = selectedStylesheet;
    this.selectedTheme = selectedTheme;

    if (typeof this.args.onSelectPageTheme === 'function') {
      this.args.onSelectPageTheme({
        currentStylesheet: this.selectedStylesheet,
        currentTheme: this.selectedTheme,
      });
    }
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
