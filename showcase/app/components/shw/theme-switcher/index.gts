/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';
import type Owner from '@ember/owner';

import ShwThemeSwitcherPopover from './popover';
import ShwThemeSwitcherSelector from './selector';
import ShwThemeSwitcherDebuggingPanel from './debugging-panel';

import HdsThemingService from '@hashicorp/design-system-components/services/hds-theming';

import { HdsIcon } from '@hashicorp/design-system-components/components';

export type ControlsPreferences = {
  hasFixedControls: boolean;
  hasDebuggingPanel: boolean;
};

export type OnApply = (options: ControlsPreferences) => void;

const LOCALSTORAGE_FIXED_CONTROLS = 'shw-theming-has-fixed-controls';
const LOCALSTORAGE_DEBUGGING_PANEL = 'shw-theming-has-debugging-panel';

interface ShwThemeSwitcherSignature {
  Args: {
    isCarbonizationPage: boolean;
  };
}

export default class ShwThemeSwitcher extends Component<ShwThemeSwitcherSignature> {
  @service declare readonly hdsTheming: HdsThemingService;

  @tracked hasFixedControls: boolean;
  @tracked hasDebuggingPanel: boolean;

  popoverId = `shw-theming-options-popover-${guidFor(this)}`;

  constructor(owner: Owner, args: ShwThemeSwitcherSignature['Args']) {
    super(owner, args);

    const storedHasFixedControls = localStorage.getItem(
      LOCALSTORAGE_FIXED_CONTROLS,
    );
    this.hasFixedControls = storedHasFixedControls === 'true';

    const storedHasDebuggingPanel = localStorage.getItem(
      LOCALSTORAGE_DEBUGGING_PANEL,
    );
    this.hasDebuggingPanel = storedHasDebuggingPanel === 'true';
  }

  onApply = ({ hasFixedControls, hasDebuggingPanel }: ControlsPreferences) => {
    this.hasFixedControls = hasFixedControls;
    this.hasDebuggingPanel = hasDebuggingPanel;

    localStorage.setItem(
      LOCALSTORAGE_FIXED_CONTROLS,
      String(this.hasFixedControls),
    );
    localStorage.setItem(
      LOCALSTORAGE_DEBUGGING_PANEL,
      String(this.hasDebuggingPanel),
    );
  };

  <template>
    <div
      class="shw-theme-switcher
        {{if this.hasFixedControls 'shw-theme-switcher--is-fixed'}}"
    >
      <ShwThemeSwitcherSelector
        disabled={{if @isCarbonizationPage true undefined}}
      />
      <button
        type="button"
        class="shw-theme-switcher__options-button"
        popovertarget={{this.popoverId}}
        aria-label="Options for theming"
        disabled={{if @isCarbonizationPage true undefined}}
      >
        <HdsIcon @name="settings" /></button>
      <ShwThemeSwitcherPopover
        @popoverId={{this.popoverId}}
        @hasFixedControls={{this.hasFixedControls}}
        @hasDebuggingPanel={{this.hasDebuggingPanel}}
        @onApply={{this.onApply}}
      />
      {{#if this.hasDebuggingPanel}}
        <ShwThemeSwitcherDebuggingPanel />
      {{/if}}
    </div>
  </template>
}
