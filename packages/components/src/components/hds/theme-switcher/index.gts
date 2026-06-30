/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

// ------------------------------------------------------------------------------------------
// IMPORTANT: this is a temporary implementation, while we wait for the design specifications
// ------------------------------------------------------------------------------------------

import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { fn } from '@ember/helper';
import { on } from '@ember/modifier';

import HdsDropdown from '../dropdown/index.gts';

import type { HdsDropdownSignature } from '../dropdown/index.gts';
import type { HdsDropdownToggleButtonSignature } from '../dropdown/toggle/button.gts';
import type { HdsIconSignature } from '../icon/index.gts';
import type HdsThemingService from '../../../services/hds-theming.ts';
import type {
  HdsThemes,
  HdsOnSetThemeCallback,
} from '../../../services/hds-theming.ts';

interface ThemeOption {
  theme: HdsThemes | undefined;
  icon: HdsIconSignature['Args']['name'];
  label: string;
}

const OPTIONS: Record<HdsThemes, ThemeOption> = {
  default: { theme: 'default', icon: 'hashicorp', label: 'Default' },
  system: { theme: 'system', icon: 'monitor', label: 'System' },
  light: { theme: 'light', icon: 'sun', label: 'Light' },
  dark: { theme: 'dark', icon: 'moon', label: 'Dark' },
};

export interface HdsThemeSwitcherSignature {
  Args: {
    toggleSize?: HdsDropdownToggleButtonSignature['Args']['size'];
    toggleIsFullWidth?: HdsDropdownToggleButtonSignature['Args']['isFullWidth'];
    hasDefaultOption?: boolean;
    hasSystemOption?: boolean;
    onSetTheme?: HdsOnSetThemeCallback;
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
      (this.currentTheme === 'default' && this.hasDefaultOption) ||
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

  // note: we will use the `default` option in development, while migrating to the `cds` theming
  // during this process, consumers will enable/disable this option via code logic or feature flag
  get hasDefaultOption() {
    return this.args.hasDefaultOption ?? false;
  }

  get hasSystemOption() {
    return this.args.hasSystemOption ?? true;
  }

  get _options() {
    const options: Partial<typeof OPTIONS> = { ...OPTIONS };

    if (!this.hasDefaultOption) {
      delete options.default;
    }

    if (!this.hasSystemOption) {
      delete options.system;
    }

    return options;
  }

  get currentTheme() {
    // we get the theme from the global service
    return this.hdsTheming.currentTheme;
  }

  onSelectTheme = (theme: HdsThemes | undefined): void => {
    // we set the theme in the global service (and provide an optional user-defined callback)
    this.hdsTheming.setTheme({ theme, onSetTheme: this.args.onSetTheme });
  };

  <template>
    {{!
      ------------------------------------------------------------------------------------------
      IMPORTANT: this is a temporary implementation, while we wait for the design specifications
      ------------------------------------------------------------------------------------------
    }}
    <HdsDropdown
      @enableCollisionDetection={{true}}
      @matchToggleWidth={{@toggleIsFullWidth}}
      class="hds-theme-switcher-control"
      ...attributes
      as |D|
    >
      <D.ToggleButton
        @color="secondary-muted"
        @size={{this.toggleSize}}
        @isFullWidth={{this.toggleIsFullWidth}}
        @text={{this.toggleContent.label}}
        @icon={{this.toggleContent.icon}}
      />
      {{#each-in this._options as |_key data|}}
        <D.Interactive
          @icon={{data.icon}}
          {{on "click" (fn this.onSelectTheme data.theme)}}
        >{{data.label}}</D.Interactive>
      {{/each-in}}
    </HdsDropdown>
  </template>
}
