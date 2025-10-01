/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

import type { HdsDropdownSignature } from '../dropdown/index.ts';
import type { HdsDropdownToggleButtonSignature } from '../dropdown/toggle/button.ts';
import type { HdsIconSignature } from '../icon/index.ts';
import type HdsThemingService from '../../../services/hds-theming.ts';
import { type HdsThemes } from '../../../services/hds-theming.ts';

type ThemeOptionKey = 'system' | 'light' | 'dark'; // | 'none';

interface ThemeOption {
  theme: HdsThemes;
  icon: HdsIconSignature['Args']['name'];
  label: string;
}

export const OPTIONS: Record<ThemeOptionKey, ThemeOption> = {
  system: { theme: 'system', icon: 'monitor', label: 'System' },
  light: { theme: 'light', icon: 'sun', label: 'Light' },
  dark: { theme: 'dark', icon: 'moon', label: 'Dark' },
  // none: { theme: undefined, icon: 'minus', label: 'None' },
};

export interface HdsThemeSwitcherSignature {
  Args: {
    toggleSize?: HdsDropdownToggleButtonSignature['Args']['size'];
    toggleIsFullWidth?: boolean;
    hasSystemOption?: boolean;
    // hasNoThemeOption?: boolean;
  };
  Element: HdsDropdownSignature['Element'];
}

export default class HdsThemeSwitcher extends Component<HdsThemeSwitcherSignature> {
  @service declare readonly hdsTheming: HdsThemingService;

  get _options() {
    const options: Partial<typeof OPTIONS> = { ...OPTIONS };
    const hasSystemOption = this.args.hasSystemOption ?? true;
    // const hasNoThemeOption = this.args.hasNoThemeOption ?? false;

    if (!hasSystemOption) {
      delete options.system;
    }

    // if (!hasNoThemeOption) {
    //   delete options.none;
    // }

    return options;
  }

  get toggleSize() {
    return this.args.toggleSize ?? 'small';
  }

  get toggleContent() {
    switch (this.currentTheme) {
      case 'system':
      case 'light':
      case 'dark':
        return {
          label: OPTIONS[this.currentTheme].label,
          icon: OPTIONS[this.currentTheme].icon,
        };
      case undefined:
      default:
        return { label: 'Theme', icon: undefined };
    }
  }

  get currentTheme() {
    // we get the theme from the global service
    return this.hdsTheming.currentTheme;
  }

  @action
  setTheme(theme: HdsThemes): void {
    // we set the theme in the global service
    this.hdsTheming.setTheme(theme);
  }
}
