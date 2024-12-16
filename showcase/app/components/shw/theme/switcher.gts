/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { eq } from 'ember-truth-helpers';

import type ShwThemingService from 'showcase/services/theming';

interface ShwThemeSwitcherSignature {
  Args: {};
  Element: HTMLDivElement;
}

const options = {
  none: 'None (No theming)',
  auto: 'Auto (prefers-color-scheme)',
  light: 'Light (data-attribute)',
  dark: 'Dark (data-attribute)',
};

export default class ShwThemeSwitcher extends Component<ShwThemeSwitcherSignature> {
  @service declare readonly theming: ShwThemingService;

  _selectedTheme;

  constructor(owner: unknown, args: ShwThemeSwitcherSignature['Args']) {
    super(owner, args);
    this._selectedTheme = this.theming.getTheme() || 'none';
  }

  @action
  onChangePageTheme(event: Event) {
    const select = event.target as HTMLSelectElement;

    // we set the theme in the global service
    this.theming.setTheme(select.value);
  }

  <template>
    <div class="shw-theme-switcher" ...attributes>
      <label
        for="shw-theme-switcher-control"
        class="shw-theme-switcher__label"
      >Theme:</label>
      <select
        id="shw-theme-switcher-control"
        class="shw-theme-switcher__control"
        {{on "change" this.onChangePageTheme}}
      >
        {{#each-in options as |key label|}}
          <option
            value={{key}}
            selected={{eq this._selectedTheme key}}
          >{{label}}</option>
        {{/each-in}}
      </select>
    </div>
  </template>
}
