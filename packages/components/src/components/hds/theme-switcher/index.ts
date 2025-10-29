/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

// ------------------------------------------------------------------------------------------
// IMPORTANT: this is a temporary implementation, while we wait for the design specifications
// ------------------------------------------------------------------------------------------

import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

import type { HdsDropdownSignature } from '../dropdown/index.ts';
import type { HdsDropdownToggleButtonSignature } from '../dropdown/toggle/button.ts';
import type { HdsIconSignature } from '../icon/index.ts';
import type HdsThemingService from '../../../services/hds-theming.ts';
import type {
  HdsThemes,
  OnSetThemeCallback,
} from '../../../services/hds-theming.ts';

interface ThemeOption {
  theme: HdsThemes | undefined;
  icon: HdsIconSignature['Args']['name'];
  label: string;
}

const OPTIONS: Record<HdsThemes, ThemeOption> = {
  system: { theme: 'system', icon: 'monitor', label: 'System' },
  light: { theme: 'light', icon: 'sun', label: 'Light' },
  dark: { theme: 'dark', icon: 'moon', label: 'Dark' },
};

interface HdsThemeSwitcherSignature {
  Args: {
    toggleSize?: HdsDropdownToggleButtonSignature['Args']['size'];
    toggleIsFullWidth?: HdsDropdownToggleButtonSignature['Args']['isFullWidth'];
    hasSystemOption?: boolean;
    onSetTheme?: OnSetThemeCallback;
  };
  Element: HdsDropdownSignature['Element'];
}

export default class HdsThemeSwitcher extends Component<HdsThemeSwitcherSignature> {
  @service declare readonly hdsTheming: HdsThemingService;

  get toggleSize() {
    return this.args.toggleSize ?? 'small';
  }

  get toggleIsFullWidth() {
    return this.args.toggleIsFullWidth ?? false;
  }

  get toggleContent() {
    if (
      (this.currentTheme === 'system' && this.hasSystemOption) ||
      this.currentTheme === 'light' ||
      this.currentTheme === 'dark'
    ) {
      return {
        label: OPTIONS[this.currentTheme].label,
        icon: OPTIONS[this.currentTheme].icon,
      };
    } else {
      return { label: 'Theme', icon: undefined };
    }
  }

  get hasSystemOption() {
    return this.args.hasSystemOption ?? true;
  }

  get _options() {
    const options: Partial<typeof OPTIONS> = { ...OPTIONS };

    if (!this.hasSystemOption) {
      delete options.system;
    }

    return options;
  }

  get currentTheme() {
    // we get the theme from the global service
    return this.hdsTheming.currentTheme;
  }

  @action
  onSelectTheme(theme: HdsThemes | undefined): void {
    // we set the theme in the global service (and provide an optional user-defined callback)
    this.hdsTheming.setTheme({ theme, onSetTheme: this.args.onSetTheme });
  }
}
