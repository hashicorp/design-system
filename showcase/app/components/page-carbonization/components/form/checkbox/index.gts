/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { capitalize } from '@ember/string';
import { eq } from 'ember-truth-helpers';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import {
  HdsFormCheckboxBase,
  HdsFormCheckboxField,
  HdsFormCheckboxGroup,
} from '@hashicorp/design-system-components/components';

const STATES = ['default', 'hover', 'focus'];

const FormCheckboxCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Checkbox - Carbonization"}}

  <ShwTextH1>Checkbox - Carbonization</ShwTextH1>

  <section>
    <ShwTextH2>“Base” control</ShwTextH2>

    <ShwTextH3>Interaction status</ShwTextH3>

    <ShwCarbonizationComparisonGrid
      @label="Unchecked / Checked / Indeterminate"
      @layout="column-stacked"
    >
      <:theming>
        <ShwFlex @gap="1rem" as |SF|>
          <SF.Item @label="Unchecked">
            <HdsFormCheckboxBase aria-label="Unchecked checkbox" />
          </SF.Item>
          <SF.Item @label="Checked">
            <HdsFormCheckboxBase
              checked="checked"
              aria-label="Checked checkbox"
            />
          </SF.Item>
          <SF.Item @label="Indeterminate">
            <HdsFormCheckboxBase
              indeterminate={{true}}
              aria-label="Indeterminate checkbox"
            />
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference>
        <ShwFlex @gap="1rem" as |SF|>
          <SF.Item @label="Unchecked">
            <cds-checkbox></cds-checkbox>
          </SF.Item>
          <SF.Item @label="Checked">
            <cds-checkbox checked></cds-checkbox>
          </SF.Item>
          <SF.Item @label="Indeterminate">
            <cds-checkbox indeterminate></cds-checkbox>
          </SF.Item>
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>States</ShwTextH3>

    {{#each STATES as |state|}}
      <ShwCarbonizationComparisonGrid
        @label={{capitalize state}}
        mock-state-value={{state}}
        mock-state-selector="input"
      >
        <:theming>
          <ShwFlex @gap="1rem" as |SF|>
            <SF.Item>
              <HdsFormCheckboxBase aria-label="Unchecked checkbox" />
            </SF.Item>
            <SF.Item>
              <HdsFormCheckboxBase
                checked="checked"
                aria-label="Checked checkbox"
              />
            </SF.Item>
            <SF.Item>
              <HdsFormCheckboxBase
                indeterminate={{true}}
                aria-label="Indeterminate checkbox"
              />
            </SF.Item>
          </ShwFlex>
        </:theming>
        <:reference>
          {{#if (eq state "default")}}
            <ShwFlex @gap="1rem" as |SF|>
              <SF.Item>
                <cds-checkbox></cds-checkbox>
              </SF.Item>
              <SF.Item>
                <cds-checkbox checked></cds-checkbox>
              </SF.Item>
              <SF.Item>
                <cds-checkbox indeterminate></cds-checkbox>
              </SF.Item>
            </ShwFlex>
          {{else}}
            <pre>TODO: static image here</pre>
          {{/if}}
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}
    <ShwCarbonizationComparisonGrid @label="Disabled">
      <:theming>
        <ShwFlex @gap="1rem" as |SF|>
          <SF.Item>
            <HdsFormCheckboxBase
              disabled="disabled"
              aria-label="Disabled checkbox"
            />
          </SF.Item>
          <SF.Item>
            <HdsFormCheckboxBase
              checked="checked"
              disabled="disabled"
              aria-label="Checked, disabled checkbox"
            />
          </SF.Item>
          <SF.Item>
            <HdsFormCheckboxBase
              indeterminate={{true}}
              disabled="disabled"
              aria-label="Indeterminate, disabled checkbox"
            />
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference>
        <ShwFlex @gap="1rem" as |SF|>
          <SF.Item>
            <cds-checkbox disabled></cds-checkbox>
          </SF.Item>
          <SF.Item>
            <cds-checkbox checked disabled></cds-checkbox>
          </SF.Item>
          <SF.Item>
            <cds-checkbox indeterminate disabled></cds-checkbox>
          </SF.Item>
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider />

    <ShwTextH2>“Field” control</ShwTextH2>

    <ShwTextH3>States</ShwTextH3>

    {{#each STATES as |state|}}
      <ShwCarbonizationComparisonGrid
        @label={{capitalize state}}
        mock-state-value={{state}}
        mock-state-selector="input"
      >
        <:theming>
          <HdsFormCheckboxGroup @name="group-vertical-01" as |G|>
            <G.CheckboxField checked="checked" as |F|>
              <F.Label>This is the label</F.Label>
              <F.HelperText>This is the helper text</F.HelperText>
            </G.CheckboxField>
            <G.CheckboxField as |F|>
              <F.Label>This is the label</F.Label>
              <F.HelperText>This is the helper text</F.HelperText>
              <F.Error>This is the error</F.Error>
            </G.CheckboxField>
          </HdsFormCheckboxGroup>
        </:theming>
        <:reference>
          <cds-checkbox-group>
            <cds-checkbox helper-text="This is the helper text" checked>This is
              the label</cds-checkbox>
            <cds-checkbox
              helper-text="This is the helper text"
              invalid-text="This is the error"
              invalid
            >This is the label</cds-checkbox>
          </cds-checkbox-group>
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}
    <ShwCarbonizationComparisonGrid @label="Disabled">
      <:theming>
        <HdsFormCheckboxGroup @name="group-vertical-01" as |G|>
          <G.CheckboxField disabled as |F|>
            <F.Label>This is the label</F.Label>
            <F.HelperText>This is the helper text</F.HelperText>
          </G.CheckboxField>
          <G.CheckboxField disabled as |F|>
            <F.Label>This is the label</F.Label>
            <F.HelperText>This is the helper text</F.HelperText>
            <F.Error>This is the error</F.Error>
          </G.CheckboxField>
        </HdsFormCheckboxGroup>
      </:theming>
      <:reference>
        <cds-checkbox-group>
          <cds-checkbox helper-text="This is the helper text" disabled>This is
            the label</cds-checkbox>
          <cds-checkbox
            helper-text="This is the helper text"
            invalid-text="This is the error"
            invalid
            disabled
          >This is the label</cds-checkbox>
        </cds-checkbox-group>
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="Disabled / Checked">
      <:theming>
        <HdsFormCheckboxGroup @name="group-vertical-01" as |G|>
          <G.CheckboxField disabled checked as |F|>
            <F.Label>This is the label</F.Label>
            <F.HelperText>This is the helper text</F.HelperText>
          </G.CheckboxField>
          <G.CheckboxField disabled checked as |F|>
            <F.Label>This is the label</F.Label>
            <F.HelperText>This is the helper text</F.HelperText>
            <F.Error>This is the error</F.Error>
          </G.CheckboxField>
        </HdsFormCheckboxGroup>
      </:theming>
      <:reference>
        <cds-checkbox-group>
          <cds-checkbox
            helper-text="This is the helper text"
            disabled
            checked
          >This is the label</cds-checkbox>
          <cds-checkbox
            helper-text="This is the helper text"
            invalid-text="This is the error"
            invalid
            disabled
            checked
          >This is the label</cds-checkbox>
        </cds-checkbox-group>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider />

    <ShwTextH2>“Group” control</ShwTextH2>

    <ShwTextH3>Vertical layout</ShwTextH3>

    <ShwCarbonizationComparisonGrid @label="With legend">
      <:theming>
        <HdsFormCheckboxGroup @name="group-vertical-01" as |G|>
          <G.Legend>Legend of the group</G.Legend>
          <G.CheckboxField as |F|>
            <F.Label>Label of control #1</F.Label>
          </G.CheckboxField>
          <G.CheckboxField checked="checked" as |F|>
            <F.Label>Label of control #2</F.Label>
          </G.CheckboxField>
          <G.CheckboxField indeterminate={{true}} as |F|>
            <F.Label>Label of control #3</F.Label>
          </G.CheckboxField>
        </HdsFormCheckboxGroup>
      </:theming>
      <:reference>
        <cds-checkbox-group legend-text="Legend of the group">
          <cds-checkbox>Label of control #1</cds-checkbox>
          <cds-checkbox checked>Label of control #2</cds-checkbox>
          <cds-checkbox indeterminate>Label of control #3</cds-checkbox>
        </cds-checkbox-group>
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="With legend + helper text">
      <:theming>
        <HdsFormCheckboxGroup @name="group-vertical-02" as |G|>
          <G.Legend>Legend of the group</G.Legend>
          <G.HelperText>Helper text for the entire group</G.HelperText>
          <G.CheckboxField as |F|>
            <F.Label>Label of control #1</F.Label>
          </G.CheckboxField>
          <G.CheckboxField checked="checked" as |F|>
            <F.Label>Label of control #2</F.Label>
          </G.CheckboxField>
          <G.CheckboxField indeterminate={{true}} as |F|>
            <F.Label>Label of control #3</F.Label>
          </G.CheckboxField>
        </HdsFormCheckboxGroup>
      </:theming>
      <:reference>
        <cds-checkbox-group
          legend-text="Legend of the group"
          helper-text="Helper text for the entire group"
        >
          <cds-checkbox>Label of control #1</cds-checkbox>
          <cds-checkbox checked>Label of control #2</cds-checkbox>
          <cds-checkbox indeterminate>Label of control #3</cds-checkbox>
        </cds-checkbox-group>
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="With error at group level">
      <:theming>
        <HdsFormCheckboxGroup @name="group-vertical-03" as |G|>
          <G.Legend>Legend of the group</G.Legend>
          <G.CheckboxField as |F|>
            <F.Label>Label of control #1</F.Label>
          </G.CheckboxField>
          <G.CheckboxField checked="checked" as |F|>
            <F.Label>Label of control #2</F.Label>
          </G.CheckboxField>
          <G.CheckboxField indeterminate={{true}} as |F|>
            <F.Label>Label of control #3</F.Label>
          </G.CheckboxField>
          <G.Error>Error for the entire group</G.Error>
        </HdsFormCheckboxGroup>
      </:theming>
      <:reference>
        <cds-checkbox-group
          legend-text="Legend of the group"
          helper-text="Helper text for the entire group"
          invalid-text="Error for the entire group"
          invalid
        >
          <cds-checkbox>Label of control #1</cds-checkbox>
          <cds-checkbox checked>Label of control #2</cds-checkbox>
          <cds-checkbox indeterminate>Label of control #3</cds-checkbox>
        </cds-checkbox-group>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Horizontal layout</ShwTextH3>

    <ShwCarbonizationComparisonGrid @label="With legend" @layout="column">
      <:theming>
        <HdsFormCheckboxGroup
          @layout="horizontal"
          @name="group-horizontal-01"
          as |G|
        >
          <G.Legend>Legend of the group</G.Legend>
          <G.CheckboxField as |F|>
            <F.Label>Label of control #1</F.Label>
          </G.CheckboxField>
          <G.CheckboxField checked="checked" as |F|>
            <F.Label>Label of control #2</F.Label>
          </G.CheckboxField>
          <G.CheckboxField indeterminate={{true}} as |F|>
            <F.Label>Label of control #3</F.Label>
          </G.CheckboxField>
        </HdsFormCheckboxGroup>
      </:theming>
      <:reference>
        <cds-checkbox-group
          legend-text="Legend of the group"
          orientation="horizontal"
        >
          <cds-checkbox>Label of control #1</cds-checkbox>
          <cds-checkbox checked>Label of control #2</cds-checkbox>
          <cds-checkbox indeterminate>Label of control #3</cds-checkbox>
        </cds-checkbox-group>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Required and optional</ShwTextH3>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <ShwFlex as |SF|>
          <SF.Item @label="With legend + Required">
            <HdsFormCheckboxGroup
              @isRequired={{true}}
              @name="control-required"
              as |G|
            >
              <G.Legend>Legend of the group</G.Legend>
              <G.CheckboxField as |F|>
                <F.Label>Label of control #1</F.Label>
              </G.CheckboxField>
              <G.CheckboxField checked="checked" as |F|>
                <F.Label>Label of control #2</F.Label>
              </G.CheckboxField>
              <G.CheckboxField indeterminate={{true}} as |F|>
                <F.Label>Label of control #3</F.Label>
              </G.CheckboxField>
            </HdsFormCheckboxGroup>
          </SF.Item>
          <SF.Item @label="With legend + Optional">
            <HdsFormCheckboxGroup
              @isOptional={{true}}
              @name="control-optional"
              as |G|
            >
              <G.Legend>Legend of the group</G.Legend>
              <G.CheckboxField as |F|>
                <F.Label>Label of control #1</F.Label>
              </G.CheckboxField>
              <G.CheckboxField checked="checked" as |F|>
                <F.Label>Label of control #2</F.Label>
              </G.CheckboxField>
              <G.CheckboxField indeterminate={{true}} as |F|>
                <F.Label>Label of control #3</F.Label>
              </G.CheckboxField>
            </HdsFormCheckboxGroup>
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference>
        <ShwFlex as |SF|>
          <SF.Item @label="With legend + Required">
            <cds-checkbox-group legend-text="Legend of the group (required)">
              <cds-checkbox>Label of control #1</cds-checkbox>
              <cds-checkbox checked>Label of control #2</cds-checkbox>
              <cds-checkbox indeterminate>Label of control #3</cds-checkbox>
            </cds-checkbox-group>
          </SF.Item>
          <SF.Item @label="With legend + Optional">
            <cds-checkbox-group legend-text="Legend of the group (optional)">
              <cds-checkbox>Label of control #1</cds-checkbox>
              <cds-checkbox checked>Label of control #2</cds-checkbox>
              <cds-checkbox indeterminate>Label of control #3</cds-checkbox>
            </cds-checkbox-group>
          </SF.Item>
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>
  </section>
</template>;

export default FormCheckboxCarbonizationIndex;
