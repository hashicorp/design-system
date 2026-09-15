/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';

import { HdsDropdown } from '@hashicorp/design-system-components/components';

const SubSectionInheritance: TemplateOnlyComponent = <template>
  <ShwTextH2>Inheritance</ShwTextH2>

  <ShwTextBody>HDS classes</ShwTextBody>

  <ShwFlex @gap="2rem" as |SF|>
    <SF.Item @label="Applied to parent">
      <div class="shw-component-dropdown-inheritance-container">
        <div
          class="hds-typography-display-400 hds-foreground-warning-on-surface hds-surface-warning"
        >
          <HdsDropdown @isOpen={{true}} @listPosition="bottom-left" as |D|>
            <D.ToggleButton @color="secondary" @text="Menu" />
            <D.Title @text="Dropdown title" />
            <D.Description @text="Dropdown description" />
            <D.Interactive @href="#">Create</D.Interactive>
            <D.Interactive @href="#">Edit</D.Interactive>
          </HdsDropdown>
        </div>
      </div>
    </SF.Item>
    <SF.Item @label="Applied to the the Dropdown">
      <div class="shw-component-dropdown-inheritance-container">
        <HdsDropdown
          class="hds-typography-display-400 hds-foreground-warning-on-surface hds-surface-warning"
          @isOpen={{true}}
          @listPosition="bottom-left"
          as |D|
        >
          <D.ToggleButton @color="secondary" @text="Menu" />
          <D.Title @text="Dropdown title" />
          <D.Description @text="Dropdown description" />
          <D.Interactive @href="#">Create</D.Interactive>
          <D.Interactive @href="#">Edit</D.Interactive>
        </HdsDropdown>
      </div>
    </SF.Item>
    <SF.Item @label="Applied to children">
      <div class="shw-component-dropdown-inheritance-container">
        <HdsDropdown @isOpen={{true}} @listPosition="bottom-left" as |D|>
          <D.ToggleButton
            class="hds-typography-display-400 hds-foreground-warning-on-surface hds-surface-warning"
            @color="secondary"
            @text="Menu"
          />
          <D.Title
            class="hds-typography-display-400 hds-foreground-warning-on-surface hds-surface-warning"
            @text="Dropdown title"
          />
          <D.Description
            class="hds-typography-display-400 hds-foreground-warning-on-surface hds-surface-warning"
            @text="Dropdown description"
          />
          <D.Interactive
            class="hds-typography-display-400 hds-foreground-warning-on-surface hds-surface-warning"
            @href="#"
          >Create</D.Interactive>
          <D.Interactive
            class="hds-typography-display-400 hds-foreground-warning-on-surface hds-surface-warning"
            @href="#"
          >Edit</D.Interactive>
        </HdsDropdown>
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwTextBody>Using a custom class</ShwTextBody>

  <ShwFlex @gap="2rem" as |SF|>
    <SF.Item @label="Applied to parent">
      <div class="shw-component-dropdown-inheritance-container">
        <div class="shw-component-dropdown-font-style">
          <HdsDropdown @isOpen={{true}} @listPosition="bottom-left" as |D|>
            <D.ToggleButton @color="secondary" @text="Menu" />
            <D.Title @text="Dropdown title" />
            <D.Description @text="Dropdown description" />
            <D.Interactive @href="#">Create</D.Interactive>
            <D.Interactive @href="#">Edit</D.Interactive>
          </HdsDropdown>
        </div>
      </div>
    </SF.Item>
    <SF.Item @label="Applied to the Dropdown">
      <div class="shw-component-dropdown-inheritance-container">
        <HdsDropdown
          class="shw-component-dropdown-font-style"
          @isOpen={{true}}
          @listPosition="bottom-left"
          as |D|
        >
          <D.ToggleButton @color="secondary" @text="Menu" />
          <D.Title @text="Dropdown title" />
          <D.Description @text="Dropdown description" />
          <D.Interactive @href="#">Create</D.Interactive>
          <D.Interactive @href="#">Edit</D.Interactive>
        </HdsDropdown>
      </div>
    </SF.Item>
    <SF.Item @label="Applied to children">
      <div class="shw-component-dropdown-inheritance-container">
        <HdsDropdown @isOpen={{true}} @listPosition="bottom-left" as |D|>
          <D.ToggleButton
            class="shw-component-dropdown-font-style"
            @color="secondary"
            @text="Menu"
          />
          <D.Title
            class="shw-component-dropdown-font-style"
            @text="Dropdown title"
          />
          <D.Description
            class="shw-component-dropdown-font-style"
            @text="Dropdown description"
          />
          <D.Interactive
            class="shw-component-dropdown-font-style"
            @href="#"
          >Create</D.Interactive>
          <D.Interactive
            class="shw-component-dropdown-font-style"
            @href="#"
          >Edit</D.Interactive>
        </HdsDropdown>
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwTextBody>Used within a parent with explicit text alignment</ShwTextBody>

  <ShwFlex class="shw-component-tooltip-text-alignment" @gap="2rem" as |SF|>
    <SF.Item @label="text-align = left" {{style text-align="left"}}>
      <div class="shw-component-dropdown-inheritance-container">
        <HdsDropdown @isOpen={{true}} @listPosition="bottom-left" as |D|>
          <D.ToggleButton @color="secondary" @text="Menu" />
          <D.Title @text="Dropdown title" />
          <D.Description @text="Dropdown description" />
          <D.Interactive @href="#">Create</D.Interactive>
          <D.Interactive @href="#">Edit</D.Interactive>
        </HdsDropdown>
      </div>
    </SF.Item>
    <SF.Item @label="text-align = center" {{style text-align="center"}}>
      <div class="shw-component-dropdown-inheritance-container">
        <HdsDropdown @isOpen={{true}} @listPosition="bottom-left" as |D|>
          <D.ToggleButton @color="secondary" @text="Menu" />
          <D.Title @text="Dropdown title" />
          <D.Description @text="Dropdown description" />
          <D.Interactive @href="#">Create</D.Interactive>
          <D.Interactive @href="#">Edit</D.Interactive>
        </HdsDropdown>
      </div>
    </SF.Item>
    <SF.Item @label="text-align = right" {{style text-align="right"}}>
      <div class="shw-component-dropdown-inheritance-container">
        <HdsDropdown @isOpen={{true}} @listPosition="bottom-left" as |D|>
          <D.ToggleButton @color="secondary" @text="Menu" />
          <D.Title @text="Dropdown title" />
          <D.Description @text="Dropdown description" />
          <D.Interactive @href="#">Create</D.Interactive>
          <D.Interactive @href="#">Edit</D.Interactive>
        </HdsDropdown>
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionInheritance;
