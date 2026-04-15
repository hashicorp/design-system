/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { capitalize } from '@ember/string';
import { concat } from '@ember/helper';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import {
  HdsDropdown,
  HdsDropdownListItemInteractive,
  HdsDropdownListItemSeparator,
  HdsDropdownListItemCheckbox,
  HdsDropdownListItemCheckmark,
  HdsLinkStandalone,
} from '@hashicorp/design-system-components/components';

const STATES = ['default', 'hover', 'active', 'focus'];

import { COLORS as ITEM_INTERACTIVE_COLORS } from '@hashicorp/design-system-components/components/hds/dropdown/list-item/interactive';

const DropdownCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Dropdown - Carbonization"}}

  <ShwTextH1>Dropdown - Carbonization</ShwTextH1>

  <section>
    <ShwTextH2>Content</ShwTextH2>

    <ShwTextH3>Basic Dropdown</ShwTextH3>

    <ShwTextH4>No exact Carbon equivalent</ShwTextH4>

    <ShwCarbonizationComparisonGrid @label="with title, description, & footer">
      <:theming>
        <HdsDropdown as |D|>
          <D.ToggleButton @text="Choose option" />
          <D.Title @text="Title" />
          <D.Description @text="Description text" />
          <D.Separator />
          <D.Interactive @href="#">Lorem, ipsum dolor sit amet consectetur.</D.Interactive>
          <D.Separator />
          <D.Interactive @href="#">Option 1</D.Interactive>
          <D.Separator />
          <D.Interactive @href="#">Option 2</D.Interactive>
          <D.Separator />
          <D.Interactive @href="#">Option 3</D.Interactive>
          <D.Footer @hasDivider={{true}}>
            <HdsLinkStandalone
              @icon="plus"
              @text="Add organization"
              @href="#"
            />
          </D.Footer>
        </HdsDropdown>
      </:theming>
      <:reference>
        <cds-dropdown label="Choose option">
          <cds-dropdown-item value="option-0">Lorem, ipsum dolor sit amet
            consectetur.</cds-dropdown-item>
          <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
          <cds-dropdown-item value="option-2">Option 2</cds-dropdown-item>
          <cds-dropdown-item value="option-3">Option 3</cds-dropdown-item>
        </cds-dropdown>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwTextH4>Closest Carbon equivalent</ShwTextH4>

    <ShwCarbonizationComparisonGrid
      @label="minimal features & matchToggleWidth=true"
    >
      <:theming>
        <HdsDropdown @matchToggleWidth={{true}} as |D|>
          <D.ToggleButton @text="Choose option" />
          <D.Interactive @href="#">Lorem, ipsum dolor sit amet consectetur.</D.Interactive>
          <D.Separator />
          <D.Interactive @href="#">Option 1</D.Interactive>
          <D.Separator />
          <D.Interactive @href="#">Option 2</D.Interactive>
          <D.Separator />
          <D.Interactive @href="#">Option 3</D.Interactive>
        </HdsDropdown>
      </:theming>
      <:reference>
        <cds-dropdown label="Choose option">
          <cds-dropdown-item value="option-0">Lorem, ipsum dolor sit amet
            consectetur.</cds-dropdown-item>
          <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
          <cds-dropdown-item value="option-2">Option 2</cds-dropdown-item>
          <cds-dropdown-item value="option-3">Option 3</cds-dropdown-item>
        </cds-dropdown>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Dropdown with checkboxes</ShwTextH3>

    <ShwTextBody>
      Note: Carbon does not appear to have a “multiselect” variant of the
      Dropdown web component, only of the Dropdown React component which would
      be the closest equivalent to the HdsDropdown with checkboxes.
    </ShwTextBody>

    <ShwCarbonizationComparisonGrid @label="minimal equivalent features">
      <:theming>
        <HdsDropdown @matchToggleWidth={{true}} as |D|>
          <D.ToggleButton @text="Choose option" />
          <D.Checkbox>Option 1</D.Checkbox>
          <D.Separator />
          <D.Checkbox>Option 2</D.Checkbox>
          <D.Separator />
          <D.Checkbox>Option 3</D.Checkbox>
        </HdsDropdown>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider />

    <ShwTextH2>Base element states</ShwTextH2>

    <ShwTextH3>List Item Interactive</ShwTextH3>

    <ShwCarbonizationComparisonGrid
      @label="with title, description, footer, & matchToggleWidth=true"
    >
      <:theming>
        {{#each ITEM_INTERACTIVE_COLORS as |color|}}
          <ShwFlex @direction="column" as |SF|>
            <SF.Item @label={{concat (capitalize color) " color"}}>
              <ShwFlex as |SF|>
                <SF.Item>
                  <div class="hds-dropdown__content">
                    <ul class="hds-dropdown__list">
                      {{#each STATES as |state|}}
                        <HdsDropdownListItemInteractive
                          @color={{color}}
                          mock-state-value={{state}}
                        >
                          {{state}}
                        </HdsDropdownListItemInteractive>
                      {{/each}}
                      <HdsDropdownListItemSeparator />
                      <HdsDropdownListItemInteractive
                        @color={{color}}
                        @isLoading={{true}}
                      >
                        Loading
                      </HdsDropdownListItemInteractive>
                    </ul>
                  </div>
                </SF.Item>
              </ShwFlex>
            </SF.Item>
          </ShwFlex>
        {{/each}}
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>List Item Checkmark</ShwTextH3>

    <ShwCarbonizationComparisonGrid
      @label="with title, description, footer, & matchToggleWidth=true"
    >
      <:theming>
        <ShwFlex as |SF|>
          <SF.Item @label="Default">
            <div class="hds-dropdown__content">
              <ul
                class="hds-dropdown__list"
                role="listbox"
                aria-label="Default"
              >
                {{#each STATES as |state|}}
                  <HdsDropdownListItemCheckmark mock-state-value={{state}}>
                    {{state}}
                  </HdsDropdownListItemCheckmark>
                {{/each}}
                <HdsDropdownListItemCheckmark
                  mock-state-value="disabled"
                  disabled
                >
                  disabled
                </HdsDropdownListItemCheckmark>
              </ul>
            </div>
          </SF.Item>
          <SF.Item @label="Selected">
            <div class="hds-dropdown__content">
              <ul
                class="hds-dropdown__list"
                role="listbox"
                aria-label="Selected"
              >
                {{#each STATES as |state|}}
                  <HdsDropdownListItemCheckmark
                    mock-state-value={{state}}
                    @selected={{true}}
                  >
                    {{state}}
                  </HdsDropdownListItemCheckmark>
                {{/each}}
                <HdsDropdownListItemCheckmark
                  mock-state-value="disabled"
                  @selected={{true}}
                  disabled
                >
                  disabled
                </HdsDropdownListItemCheckmark>
              </ul>
            </div>
          </SF.Item>
        </ShwFlex>

        <ShwFlex as |SF|>
          <SF.Item @label="Interactive">
            <HdsDropdown @listPosition="bottom-left" as |D|>
              <D.ToggleButton @text="Checkmark" @color="secondary" />
              <D.Checkmark @count="11">virtualbox</D.Checkmark>
              <D.Checkmark @count="1" @selected={{true}}>vmware</D.Checkmark>
              <D.Checkmark @count="10">docker</D.Checkmark>
              <D.Checkmark @count="0">hyperv</D.Checkmark>
            </HdsDropdown>
          </SF.Item>
        </ShwFlex>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>List Item Checkbox</ShwTextH3>

    <ShwCarbonizationComparisonGrid
      @label="with title, description, footer, & matchToggleWidth=true"
    >
      <:theming>
        <ShwFlex as |SF|>
          <SF.Item @label="Default">
            <div class="hds-dropdown__content">
              <ul class="hds-dropdown__list">
                {{#each STATES as |state|}}
                  <HdsDropdownListItemCheckbox mock-state-value={{state}}>
                    {{state}}
                  </HdsDropdownListItemCheckbox>
                {{/each}}
                <HdsDropdownListItemCheckbox
                  mock-state-value="disabled"
                  disabled
                >
                  disabled
                </HdsDropdownListItemCheckbox>
              </ul>
            </div>
          </SF.Item>
          <SF.Item @label="Checked">
            <div class="hds-dropdown__content">
              <ul class="hds-dropdown__list">
                {{#each STATES as |state|}}
                  <HdsDropdownListItemCheckbox
                    mock-state-value={{state}}
                    checked
                  >
                    {{state}}
                  </HdsDropdownListItemCheckbox>
                {{/each}}
                <HdsDropdownListItemCheckbox
                  mock-state-value="disabled"
                  disabled
                  checked
                >
                  disabled
                </HdsDropdownListItemCheckbox>
              </ul>
            </div>
          </SF.Item>
        </ShwFlex>
      </:theming>
    </ShwCarbonizationComparisonGrid>
  </section>
</template>;

export default DropdownCarbonizationIndex;
