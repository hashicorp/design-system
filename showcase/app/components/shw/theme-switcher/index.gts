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
import ShwThemingService from 'showcase/services/shw-theming';

import HdsThemingService from '@hashicorp/design-system-components/services/hds-theming';

import { HdsIcon } from '@hashicorp/design-system-components/components';

export type OnApplyOptions = {
  hasFixedControls: boolean;
  hasDebuggingPanel: boolean;
};

export type OnApply = (options: OnApplyOptions) => void;

const SHW_THEMING_LOCALSTORAGE_PREF_FIXED_CONTROLS_KEY =
  'shw-theming-pref-has-fixed-controls';
const SHW_THEMING_LOCALSTORAGE_PREF_DEBUGGING_PANEL_KEY =
  'shw-theming-pref-has-debugging-panel';

export default class ShwThemeSwitcher extends Component {
  @service declare readonly hdsTheming: HdsThemingService;
  @service declare readonly shwTheming: ShwThemingService;

  @tracked hasFixedControls: boolean;
  @tracked hasDebuggingPanel: boolean;

  popoverId = `shw-theming-options-popover-${guidFor(this)}`;

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  constructor(owner: Owner, args: {}) {
    super(owner, args);

    const storedHasFixedControls = localStorage.getItem(
      SHW_THEMING_LOCALSTORAGE_PREF_FIXED_CONTROLS_KEY,
    );
    this.hasFixedControls = storedHasFixedControls === 'true';

    const storedHasDebuggingPanel = localStorage.getItem(
      SHW_THEMING_LOCALSTORAGE_PREF_DEBUGGING_PANEL_KEY,
    );
    this.hasDebuggingPanel = storedHasDebuggingPanel === 'true';
  }

  onApply = ({ hasFixedControls, hasDebuggingPanel }: OnApplyOptions) => {
    this.hasFixedControls = hasFixedControls;
    this.hasDebuggingPanel = hasDebuggingPanel;

    localStorage.setItem(
      SHW_THEMING_LOCALSTORAGE_PREF_FIXED_CONTROLS_KEY,
      String(this.hasFixedControls),
    );
    localStorage.setItem(
      SHW_THEMING_LOCALSTORAGE_PREF_DEBUGGING_PANEL_KEY,
      String(this.hasDebuggingPanel),
    );
  };

  <template>
    <div
      class="shw-theme-switcher
        {{if this.hasFixedControls 'shw-theme-switcher--is-fixed'}}"
    >
      <ShwThemeSwitcherSelector />
      <button
        type="button"
        class="shw-theme-switcher__options-button"
        popovertarget={{this.popoverId}}
        aria-label="Options for theming"
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
