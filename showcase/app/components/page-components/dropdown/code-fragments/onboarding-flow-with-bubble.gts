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
  HdsPopoverPrimitive,
  HdsRichTooltipBubble,
  HdsTextBody,
} from '@hashicorp/design-system-components/components';

import type { HdsDropdownForceStates } from '@hashicorp/design-system-components/components/hds/dropdown/types';
import type { HdsRichTooltipForceStates } from '@hashicorp/design-system-components/components/hds/rich-tooltip/types';

export default class CodeFragmentOnboardingFlowWithBubble extends Component {
  @tracked dropdownState: HdsDropdownForceStates = 'close';
  @tracked tooltipState: HdsRichTooltipForceStates = 'close';
  @tracked showOnboarding = true;

  private _isDone = false;

  popoverId = 'onboarding-flow-with-bubble-popover';
  arrowId = 'onboarding-flow-with-bubble-arrow';

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

    // remove the tooltip only once it has closed, so focus is moved by @returnFocusTo first
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
      <HdsButton
        @text="Reset"
        @color="secondary"
        {{on "click" this.reset}}
      />
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
        <HdsPopoverPrimitive
          @enableClickEvents={{true}}
          @forceState={{this.tooltipState}}
          @returnFocusTo="onboarding-flow-default-button"
          @onOpen={{this.onTooltipOpen}}
          @onClose={{this.onTooltipClose}}
          as |PP|
        >
          <D.Interactive
            {{! @glint-expect-error - D.Interactive element type is a union, but PopoverPrimitive's toggle modifier expects button }}
            {{PP.setupPrimitiveToggle}}
            aria-describedby={{this.popoverId}}
            aria-expanded={{if PP.isOpen "true" "false"}}
            id="onboarding-flow-tooltip-toggle"
          >
            Theme (New)
          </D.Interactive>
          <D.Generic {{PP.setupPrimitiveContainer}}>
            <HdsRichTooltipBubble
              @popoverId={{this.popoverId}}
              @arrowId={{this.arrowId}}
              @setupPrimitivePopover={{PP.setupPrimitivePopover}}
              @isOpen={{PP.isOpen}}
              {{!-- @forceState={{this.tooltipState}} --}}
              {{!-- @showPopover={{PP.showPopover}} --}}
              {{!-- @hidePopover={{PP.hidePopover}} --}}
              @placement="left-start"
            >
              <HdsLayoutFlex @direction="column" @gap="8">
                <HdsTextBody @color="strong" @weight="semibold">Choose your theme</HdsTextBody>
                <HdsTextBody @color="primary">Lorem ipsum dolor sit amet,
                  consectetur adipisici tempor incidunt ut labore et dolore
                </HdsTextBody>
                <HdsButton
                  @text="Done"
                  @size="small"
                  {{on "click" this.onDone}}
                />
              </HdsLayoutFlex>
            </HdsRichTooltipBubble>
          </D.Generic>
        </HdsPopoverPrimitive>
      {{/if}}
      <D.Interactive id="onboarding-flow-default-button">Default</D.Interactive>
      <D.Interactive>Light</D.Interactive>
      <D.Interactive>Dark</D.Interactive>
    </HdsDropdown>
  </template>
}
