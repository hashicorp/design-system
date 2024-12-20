/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { eq } from 'ember-truth-helpers';
// import { tracked } from '@glimmer/tracking';

import type HdsThemingService from '@hashicorp/design-system-components/services/hds-theming.ts';

interface ShwThemeSwitcherSignature {
  Element: HTMLDivElement;
}

const options = {
  none: 'None (No theming)',
  system: 'System (prefers-color-scheme)',
  light: 'Light (data-attribute)',
  dark: 'Dark (data-attribute)',
};

export default class ShwThemeSwitcher extends Component<ShwThemeSwitcherSignature> {
  @service declare readonly hdsTheming: HdsThemingService;

  @action
  onChangePageTheme(event: Event) {
    const select = event.target as HTMLSelectElement;

    // we set the theme in the global service
    this.hdsTheming.setTheme(select.value);
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
            selected={{eq this.hdsTheming.currentTheme key}}
          >{{label}}</option>
        {{/each-in}}
      </select>
    </div>
  </template>
}
