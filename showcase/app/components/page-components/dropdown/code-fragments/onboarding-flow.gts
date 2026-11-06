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

export default class CodeFragmentOnboardingFlow extends Component {
  @tracked isDropdownOpen = false;
  @tracked isTooltipOpen = false;

  startOnboarding = () => {
    this.isDropdownOpen = true;
    this.isTooltipOpen = true;
  };

  onDropdownOpen = () => {
    this.isDropdownOpen = true;
  };

  onDropdownClose = () => {
    this.isDropdownOpen = false;
    this.isTooltipOpen = false;
  };

  onTooltipOpen = () => {
    this.isTooltipOpen = true;
  };

  onTooltipClose = () => {
    this.isTooltipOpen = false;
  };

  <template>
    <HdsButton
      @text="Try it out"
      @color="secondary"
      {{on "click" this.startOnboarding}}
    />
    <p>
      Dropdown isOpen:
      {{this.isDropdownOpen}}
      <br />
      Tooltip isOpen:
      {{this.isTooltipOpen}}
    </p>
    <HdsDropdown
      @listPosition="bottom-left"
      @isOpen={{this.isDropdownOpen}}
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
          @isOpen={{this.isTooltipOpen}}
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
