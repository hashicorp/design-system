/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { service } from '@ember/service';

import ShwLabel from '../../shw/label';

import ShwThemingService from 'showcase/services/shw-theming';
import HdsThemingService from '@hashicorp/design-system-components/services/hds-theming';

export default class ShwThemeSwitcherDenbuggingPanel extends Component {
  @service declare readonly hdsTheming: HdsThemingService;
  @service declare readonly shwTheming: ShwThemingService;

  <template>
    <div class="shw-theme-switcher__debugging-panel">
      <ShwLabel
        class="shw-theme-switcher__debugging-panel-key"
      >currentStylesheet:</ShwLabel>
      <ShwLabel
        class="shw-theme-switcher__debugging-panel-value"
      >{{this.shwTheming.currentStylesheet}}</ShwLabel>
      <ShwLabel
        class="shw-theme-switcher__debugging-panel-key"
      >currentTheme:</ShwLabel>
      <ShwLabel
        class="shw-theme-switcher__debugging-panel-value"
      >{{this.hdsTheming.currentTheme}}</ShwLabel>
      <ShwLabel
        class="shw-theme-switcher__debugging-panel-key"
      >currentMode:</ShwLabel>
      <ShwLabel
        class="shw-theme-switcher__debugging-panel-value"
      >{{this.hdsTheming.currentMode}}</ShwLabel>
      <ShwLabel
        class="shw-theme-switcher__debugging-panel-key"
      >currentLightTheme:</ShwLabel>
      <ShwLabel
        class="shw-theme-switcher__debugging-panel-value"
      >{{this.hdsTheming.currentLightTheme}}</ShwLabel>
      <ShwLabel
        class="shw-theme-switcher__debugging-panel-key"
      >currentDarkTheme:</ShwLabel>
      <ShwLabel
        class="shw-theme-switcher__debugging-panel-value"
      >{{this.hdsTheming.currentDarkTheme}}</ShwLabel>
    </div>
  </template>
}
