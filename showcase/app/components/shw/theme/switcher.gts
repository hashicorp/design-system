/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { service } from '@ember/service';

import type ShwThemingService from 'showcase/services/theming';

interface ShwThemeSwitcherSignature {
  // Args: {};
  Element: HTMLDivElement;
}

export default class ShwThemeSwitcher extends Component<ShwThemeSwitcherSignature> {
  @service declare readonly theming: ShwThemingService;

  @action
  onChangePageTheme(event: Event) {
    const select = event.target as HTMLSelectElement;
    console.log(`Theme: ${select.value}`);
    console.log(`theming.getTheme: ${this.theming.getTheme()}`);

    let theme;
    let type;
    switch (select.value) {
      case 'light-data-attribute':
        theme = 'light';
        type = 'data-attribute';
        break;
      case 'light-css-class':
        theme = 'light';
        type = 'css-class';
        break;
      case 'dark-data-attribute':
        theme = 'dark';
        type = 'data-attribute';
        break;
      case 'dark-css-class':
        theme = 'dark';
        type = 'css-class';
        break;
      default:
        theme = 'auto';
        break;
    }

    // we set the theme in the global service
    this.theming.setTheme(theme, type, 'body');
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
        <option value="auto">Auto (prefers-color-scheme)</option>
        <option value="light-css-class">Light (CSS class)</option>
        <option value="light-data-attribute">Light (data-attribute)</option>
        <option value="dark-css-class">Dark (CSS class)</option>
        <option value="dark-data-attribute">Dark (data-attribute)</option>
      </select>
    </div>
  </template>
}
