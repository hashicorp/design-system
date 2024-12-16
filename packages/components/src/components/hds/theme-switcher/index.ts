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
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  Args: {};
  Element: HdsFormSelectBaseSignature['Element'];
}

export default class HdsThemeSwitcher extends Component<HdsThemeSwitcherSignature> {
  @service declare readonly hdsTheming: HdsThemingService;

  _selectedTheme: HdsThemes;

  constructor(owner: unknown, args: HdsThemeSwitcherSignature['Args']) {
    super(owner, args);
    this._selectedTheme = this.hdsTheming.getTheme() || undefined;
  }

  @action
  _onChangePageTheme(event: Event): void {
    const select = event.target as HTMLSelectElement;

    // this._selectedTheme = select.value === 'none' ? undefined : select.value;
    if (select.value === 'none') {
      this._selectedTheme = undefined;
    } else if (
      select.value === 'auto' ||
      select.value === 'light' ||
      select.value === 'dark'
    ) {
      this._selectedTheme = select.value;
    }

    // we set the theme in the global service
    this.hdsTheming.setTheme(this._selectedTheme);
  }
}
