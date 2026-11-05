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
  HdsRichTooltip,
  HdsTextBody,
} from '@hashicorp/design-system-components/components';

import type { HdsDropdownForceStates } from '@hashicorp/design-system-components/components/hds/dropdown/types';
import type { HdsRichTooltipForceStates } from '@hashicorp/design-system-components/components/hds/rich-tooltip/types';

export default class CodeFragmentOnboardingFlow extends Component {
  @tracked dropdownState: HdsDropdownForceStates = 'close';
  @tracked tooltipState: HdsRichTooltipForceStates = 'close';

  startOnboarding = () => {
    this.dropdownState = 'open';
    this.tooltipState = 'open';
  };

  onDropdownOpen = () => {
    this.dropdownState = 'open';
  };

  // the tooltip is destroyed with the dropdown content, so its state is reset here
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
      <D.Generic>
        <HdsRichTooltip
          @enableClickEvents={{true}}
          @forceState={{this.tooltipState}}
          @onOpen={{this.onTooltipOpen}}
          @onClose={{this.onTooltipClose}}
          as |RT|
        >
          <RT.Toggle @text="Theme (New)" @size="medium" />
          <RT.Bubble @placement="left-start">
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
          </RT.Bubble>
        </HdsRichTooltip>
      </D.Generic>
    </HdsDropdown>
  </template>
}
