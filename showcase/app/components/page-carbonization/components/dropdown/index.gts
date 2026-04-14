/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwTextBody from 'showcase/components/shw/text/body';
// import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import {
  HdsDropdown,
  HdsButton,
  HdsButtonSet,
} from '@hashicorp/design-system-components/components';

const DropdownCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Dropdown - Carbonization"}}

  <ShwTextH1>Dropdown - Carbonization</ShwTextH1>

  <section>
    <ShwTextH2>Content</ShwTextH2>

    <ShwTextH3>Basic Dropdown</ShwTextH3>

    <ShwTextH4>No exact Carbon equivalent</ShwTextH4>

    <ShwCarbonizationComparisonGrid
      @label="with title, description, and footer"
    >
      <:theming>
        <HdsDropdown @matchToggleWidth={{true}} as |D|>
          <D.ToggleButton @text="Choose option" />
          <D.Title @text="Title" />
          <D.Description @text="Description text goes here." />
          <D.Separator />
          <D.Interactive @href="#">Lorem, ipsum dolor sit amet consectetur
            adipisicing elit.</D.Interactive>
          <D.Separator />
          <D.Interactive @href="#">Option 1</D.Interactive>
          <D.Separator />
          <D.Interactive @href="#">Option 2</D.Interactive>
          <D.Separator />
          <D.Interactive @href="#">Option 3</D.Interactive>
          <D.Separator />
          <D.Interactive @href="#">Option 4</D.Interactive>
          <D.Separator />
          <D.Interactive @href="#">Option 5</D.Interactive>
          <D.Footer @hasDivider={{true}}>
            <HdsButtonSet>
              <HdsButton @text="Apply" @isFullWidth={{true}} @size="small" />
              <HdsButton @text="Cancel" @color="secondary" @size="small" />
            </HdsButtonSet>
          </D.Footer>
        </HdsDropdown>
      </:theming>
      <:reference>
        <cds-dropdown label="Choose option">
          <cds-dropdown-item value="option-0">Lorem, ipsum dolor sit amet
            consectetur adipisicing elit.</cds-dropdown-item>
          <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
          <cds-dropdown-item value="option-2">Option 2</cds-dropdown-item>
          <cds-dropdown-item disabled="" value="option-3">Option 3</cds-dropdown-item>
          <cds-dropdown-item value="option-4">Option 4</cds-dropdown-item>
          <cds-dropdown-item value="option-5">Option 5</cds-dropdown-item>
        </cds-dropdown>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwTextH4>Closest Carbon equivalent</ShwTextH4>

    <ShwCarbonizationComparisonGrid @label="minimal features">
      <:theming>
        <HdsDropdown @matchToggleWidth={{true}} as |D|>
          <D.ToggleButton @text="Choose option" />
          <D.Interactive @href="#">Lorem, ipsum dolor sit amet consectetur
            adipisicing elit.</D.Interactive>
          <D.Separator />
          <D.Interactive @href="#">Option 1</D.Interactive>
          <D.Separator />
          <D.Interactive @href="#">Option 2</D.Interactive>
          <D.Separator />
          <D.Interactive @href="#">Option 3</D.Interactive>
          <D.Separator />
          <D.Interactive @href="#">Option 4</D.Interactive>
          <D.Separator />
          <D.Interactive @href="#">Option 5</D.Interactive>
        </HdsDropdown>
      </:theming>
      <:reference>
        <cds-dropdown label="Choose option">
          <cds-dropdown-item value="option-0">Lorem, ipsum dolor sit amet
            consectetur adipisicing elit.</cds-dropdown-item>
          <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
          <cds-dropdown-item value="option-2">Option 2</cds-dropdown-item>
          <cds-dropdown-item disabled="" value="option-3">Option 3</cds-dropdown-item>
          <cds-dropdown-item value="option-4">Option 4</cds-dropdown-item>
          <cds-dropdown-item value="option-5">Option 5</cds-dropdown-item>
        </cds-dropdown>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Dropdown with checkboxes vs. Carbon Multiselect Dropdown</ShwTextH3>

    <ShwTextBody>
      Note: Carbon does not appear to have a multiselect variant of the Dropdown
      web component, only of the Dropdown React component.
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
          <D.Separator />
          <D.Checkbox>Option 4</D.Checkbox>
          <D.Separator />
          <D.Checkbox>Option 5</D.Checkbox>
        </HdsDropdown>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>
  </section>
</template>;

export default DropdownCarbonizationIndex;
