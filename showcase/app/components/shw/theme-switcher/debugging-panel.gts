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
      <ShwLabel>currentStylesheet</ShwLabel><ShwLabel
      >{{this.shwTheming.currentStylesheet}}</ShwLabel>
      <ShwLabel>currentTheme</ShwLabel><ShwLabel
      >{{this.hdsTheming.currentTheme}}</ShwLabel>
      <ShwLabel>currentMode</ShwLabel><ShwLabel
      >{{this.hdsTheming.currentMode}}</ShwLabel>
      <ShwLabel>currentLightTheme</ShwLabel><ShwLabel
      >{{this.hdsTheming.currentLightTheme}}</ShwLabel>
      <ShwLabel>currentDarkTheme</ShwLabel><ShwLabel
      >{{this.hdsTheming.currentDarkTheme}}</ShwLabel>
    </div>
  </template>
}
