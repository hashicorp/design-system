/**
 * Copyright IBM Corp. 2021, 2025
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

  popoverId = 'onboarding-flow-with-bubble-popover';
  arrowId = 'onboarding-flow-with-bubble-arrow';

  startOnboarding = () => {
    this.dropdownState = 'open';
    this.tooltipState = 'open';
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
  };

  <template>
    <HdsButton
      @text="Try it out"
      @color="secondary"
      {{on "click" this.startOnboarding}}
    />
    <p>
      Dropdown state:
      {{this.dropdownState}}
      <br />
      Tooltip state:
      {{this.tooltipState}}
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
      <HdsPopoverPrimitive
        @enableClickEvents={{true}}
        @onOpen={{this.onTooltipOpen}}
        @onClose={{this.onTooltipClose}}
        as |PP|
      >
        <D.Interactive
          {{! @ts-expect-error - D.Interactive element type is a union, but PopoverPrimitive's toggle modifier expects button }}
          {{PP.setupPrimitiveToggle}}
          aria-describedby={{this.popoverId}}
          aria-expanded={{if PP.isOpen "true" "false"}}
        >
          Theme (New)
        </D.Interactive>
        <D.Generic>
          <HdsRichTooltipBubble
            @popoverId={{this.popoverId}}
            @arrowId={{this.arrowId}}
            @setupPrimitivePopover={{PP.setupPrimitivePopover}}
            @isOpen={{PP.isOpen}}
            @forceState={{this.tooltipState}}
            @showPopover={{PP.showPopover}}
            @hidePopover={{PP.hidePopover}}
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
                {{on "click" this.onTooltipClose}}
              />
            </HdsLayoutFlex>
          </HdsRichTooltipBubble>
        </D.Generic>
      </HdsPopoverPrimitive>
    </HdsDropdown>
  </template>
}
