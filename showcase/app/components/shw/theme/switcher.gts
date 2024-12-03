/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { action } from '@ember/object';

interface ShwThemeSwitcherSignature {
  // Args: {};
  Element: HTMLDivElement;
}

export default class ShwThemeSwitcher extends Component<ShwThemeSwitcherSignature> {
  @action
  onChangePageTheme(event: Event) {
    const select = event.target as HTMLSelectElement;
    console.log(`Theme: ${select.value}`);
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
        <option value="light-data-attribute">Light (data-attribute)</option>
        <option value="light-css-class">Light (CSS class)</option>
        <option value="dark-data-attribute">Dark (data-attribute)</option>
        <option value="dark-css-class">Dark (CSS class)</option>
      </select>
    </div>
  </template>
}
