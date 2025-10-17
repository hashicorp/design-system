/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { service } from '@ember/service';
import { guidFor } from '@ember/object/internals';

import ShwThemeSwitcherPopover from './popover';
import ShwThemeSwitcherSelector from './selector';
import ShwThemeSwitcherDebuggingPanel from './debugging-panel';
import ShwThemingService from 'showcase/services/shw-theming';

import HdsThemingService from '@hashicorp/design-system-components/services/hds-theming';

import { HdsIcon } from '@hashicorp/design-system-components/components';

export default class ShwThemeSwitcher extends Component {
  @service declare readonly hdsTheming: HdsThemingService;
  @service declare readonly shwTheming: ShwThemingService;

  popoverId = `shw-theming-options-popover-${guidFor(this)}`;

  <template>
    <div class="shw-theme-switcher">
      <ShwThemeSwitcherSelector />
      <button
        type="button"
        class="shw-theme-switcher__options-button"
        popovertarget={{this.popoverId}}
        aria-label="Options for theming"
      >
        <HdsIcon @name="settings" /></button>
      <ShwThemeSwitcherPopover @popoverId={{this.popoverId}} />
      <ShwThemeSwitcherDebuggingPanel />
    </div>
  </template>
}
