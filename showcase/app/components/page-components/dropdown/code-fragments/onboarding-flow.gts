/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';

import {
  HdsButton,
  HdsDropdown,
  HdsLayoutFlex,
  HdsRichTooltip,
  HdsTextBody,
} from '@hashicorp/design-system-components/components';
import type { HdsPopoverPrimitiveForceStates } from '@hashicorp/design-system-components/components/hds/popover-primitive/types';

export default class CodeFragmentOnboardingFlow extends Component {
  @tracked dropdownState: HdsPopoverPrimitiveForceStates = 'close';
  @tracked tooltipState: HdsPopoverPrimitiveForceStates = 'close';
  @tracked showOnboarding = true;

  private _isDone = false;

  startOnboarding = () => {
    this._isDone = false;
    this.showOnboarding = true;
    this.dropdownState = 'open';
    this.tooltipState = 'open';
  };

  reset = () => {
    this._isDone = false;
    this.showOnboarding = true;
    this.dropdownState = 'close';
    this.tooltipState = 'close';
  };

  onDropdownOpen = () => {
    this.dropdownState = 'open';
  };

  onDropdownClose = () => {
    this.dropdownState = 'close';
    this.tooltipState = 'close';
  };

  onTooltipOpen = () => {
    this.tooltipState = 'open';
  };

  onTooltipClose = () => {
    this.tooltipState = 'close';

    // remove onboarding tooltip here instead of onDone, so @returnFocusTo can run
    if (this._isDone) {
      this.showOnboarding = false;
    }
  };

  onDone = () => {
    this._isDone = true;
    this.tooltipState = 'close';
  };

  <template>
    <HdsLayoutFlex @gap="8">
      <HdsButton
        @text="Try it out"
        @color="secondary"
        {{on "click" this.startOnboarding}}
      />
      <HdsButton @text="Reset" @color="secondary" {{on "click" this.reset}} />
    </HdsLayoutFlex>
    <p>
      Dropdown state:
      {{this.dropdownState}}
      <br />
      Tooltip state:
      {{this.tooltipState}}
      <br />
      Onboarding shown:
      {{this.showOnboarding}}
    </p>
    <HdsDropdown
      @listPosition="bottom-left"
      @forceState={{this.dropdownState}}
      @onOpen={{this.onDropdownOpen}}
      @onClose={{this.onDropdownClose}}
      as |D|
    >
      <D.ToggleButton @color="secondary" @text="User menu" />
      <D.Interactive @href="#">Account settings</D.Interactive>
      <D.Interactive @href="#">Admin</D.Interactive>
      <D.Interactive @href="#">Sign out</D.Interactive>
      <D.Separator />
      {{#if this.showOnboarding}}
        <D.Generic>
          <HdsRichTooltip
            @enableClickEvents={{true}}
            @forceState={{this.tooltipState}}
            @returnFocusTo="default-button"
            @onOpen={{this.onTooltipOpen}}
            @onClose={{this.onTooltipClose}}
            as |RT|
          >
            <RT.Toggle
              id="onboarding-flow-tooltip-toggle"
              @text="Theme (New)"
              @size="medium"
            />
            <RT.Bubble @placement="left-start">
              <HdsLayoutFlex @direction="column" @gap="8">
                <HdsTextBody @color="strong" @weight="semibold">Choose your
                  theme</HdsTextBody>
                <HdsTextBody @color="primary">Lorem ipsum dolor sit amet,
                  consectetur adipisici tempor incidunt ut labore et dolore
                </HdsTextBody>
                <HdsButton
                  @text="Done"
                  @size="small"
                  {{on "click" this.onDone}}
                />
              </HdsLayoutFlex>
            </RT.Bubble>
          </HdsRichTooltip>
        </D.Generic>
      {{/if}}
      <D.Interactive id="default-button">Default</D.Interactive>
      <D.Interactive>Light</D.Interactive>
      <D.Interactive>Dark</D.Interactive>
    </HdsDropdown>
  </template>
}
