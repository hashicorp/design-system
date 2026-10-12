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

import {
  HdsDropdown,
  HdsBadge,
  HdsFormTextInputBase,
  HdsLinkStandalone,
} from '@hashicorp/design-system-components/components';

const TEXT_ALIGNMENTS = ['left', 'center', 'right'] as const;

interface InheritanceDropdownSignature {
  Args: {
    parentClass?: string;
    dropdownClass?: string;
  };
}

const InheritanceDropdown: TemplateOnlyComponent<InheritanceDropdownSignature> =
  <template>
    <div class="shw-component-dropdown-inheritance-container">
      <div class={{@parentClass}}>
        <HdsDropdown
          class={{@dropdownClass}}
          @isOpen={{true}}
          @listPosition="bottom-left"
          as |D|
        >
          <D.Header @hasDivider={{true}}>
            <HdsFormTextInputBase @type="search" placeholder="Narrow results" />
          </D.Header>
          <D.ToggleButton @color="secondary" @text="Menu" />
          <D.Title @text="This is the title" />
          <D.Description @text="This is the description and is longer" />
          <D.Interactive @href="#">Interactive</D.Interactive>
          <D.CopyItem @text="CopyItem" />
          <D.Checkmark @count="12" @selected={{true}}>Checkmark</D.Checkmark>
          <D.Checkbox @count="12" checked>Checkbox
            <HdsBadge @text="Badge" @size="small" /></D.Checkbox>
          <D.Radio @count="12" checked>Radio
            <HdsBadge @text="Badge" @size="small" /></D.Radio>
          <D.Footer @hasDivider={{true}}>
            <HdsLinkStandalone
              @icon="list"
              @text="Organizations"
              @color="secondary"
              @href="#"
            />
          </D.Footer>
        </HdsDropdown>
      </div>
    </div>
  </template>;

const SubSectionInheritance: TemplateOnlyComponent = <template>
  <ShwDivider />

  <ShwTextH2>Inheritance</ShwTextH2>

  <ShwTextBody>HDS classes</ShwTextBody>

  <ShwFlex @gap="2rem" as |SF|>
    <SF.Item @label="HDS classes applied to parent">
      <InheritanceDropdown
        @parentClass="hds-typography-display-400 hds-foreground-warning-on-surface hds-surface-warning"
      />
    </SF.Item>
    <SF.Item @label="HDS classes applied to the Dropdown">
      <InheritanceDropdown
        @dropdownClass="hds-typography-display-400 hds-foreground-warning-on-surface hds-surface-warning"
      />
    </SF.Item>
    <SF.Item @label="Custom class applied to parent">
      <InheritanceDropdown
        @parentClass="shw-component-dropdown-style-overrides"
      />
    </SF.Item>
    <SF.Item @label="Custom class applied to the Dropdown">
      <InheritanceDropdown
        @dropdownClass="shw-component-dropdown-style-overrides"
      />
    </SF.Item>
  </ShwFlex>

  <ShwTextBody>Used within a parent with explicit text alignment</ShwTextBody>

  <ShwFlex class="shw-component-tooltip-text-alignment" @gap="2rem" as |SF|>
    {{#each TEXT_ALIGNMENTS as |alignment|}}
      <SF.Item
        @label="text-align = {{alignment}}"
        {{style textAlign=alignment}}
      >
        <InheritanceDropdown />
      </SF.Item>
    {{/each}}
  </ShwFlex>
</template>;

export default SubSectionInheritance;
