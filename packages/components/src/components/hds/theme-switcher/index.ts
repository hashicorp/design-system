/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

import type { HdsFormSelectBaseSignature } from '../form/select/base.ts';
import type HdsThemingService from '../../../services/hds-theming.ts';
import { type HdsThemes } from '../../../services/hds-theming.ts';

export interface HdsThemeSwitcherSignature {
  Element: HdsFormSelectBaseSignature['Element'];
}

export default class HdsThemeSwitcher extends Component<HdsThemeSwitcherSignature> {
  @service declare readonly hdsTheming: HdsThemingService;

  get currentTheme() {
    return this.hdsTheming.currentTheme;
  }

  @action
  onChangePageTheme(event: Event): void {
    const select = event.target as HTMLSelectElement;
    let selectedTheme: HdsThemes;

    // this._selectedTheme = select.value === 'none' ? undefined : select.value;
    if (select.value === 'none') {
      selectedTheme = undefined;
    } else if (
      select.value === 'auto' ||
      select.value === 'light' ||
      select.value === 'dark'
    ) {
      selectedTheme = select.value;
    }

    // we set the theme in the global service
    this.hdsTheming.setTheme(selectedTheme);
  }
}
