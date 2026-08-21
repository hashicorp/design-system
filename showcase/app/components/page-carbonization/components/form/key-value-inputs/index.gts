/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import { HdsFormKeyValueInputs } from '@hashicorp/design-system-components/components';

const ONE_ROW_DATA = [
  {
    id: 1,
    key: { text: 'key-1' },
    value: { text: 'value-1' },
  },
];

const EMPTY_DATA = [] as unknown[];

const ONE_ROW_NO_VALUES_DATA = [
  {
    id: 1,
    key: { text: '' },
    value: { text: '' },
  },
];

const TWO_ROWS_MIXED_VALUES_DATA = [
  {
    id: 2,
    key: { text: 'key-2' },
    value: { text: 'value-2' },
  },
  {
    id: 1,
    key: { text: '' },
    value: { text: '' },
  },
];

const FormKeyValueInputsCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "KeyValueInputs - Carbonization"}}

  <ShwTextH1>KeyValueInputs - Carbonization</ShwTextH1>

  <section>
    <ShwTextH2>Content</ShwTextH2>

    <ShwTextH3>With 2 columns</ShwTextH3>

    <ShwCarbonizationComparisonGrid
      @label="One row without delete button"
      @layout="column-stacked"
    >
      <:theming>
        <HdsFormKeyValueInputs @data={{ONE_ROW_NO_VALUES_DATA}}>
          <:header as |H|>
            <H.Legend>This is the legend</H.Legend>
            <H.HelperText>This is the helper text, usually used with the legend.</H.HelperText>
          </:header>
          <:row as |R|>
            <R.Field as |F|>
              <F.Label>Key</F.Label>
              <F.TextInput @value={{R.rowData.key.text}} />
            </R.Field>
            <R.Field as |F|>
              <F.Label>Value</F.Label>
              <F.TextInput @value={{R.rowData.value.text}} />
            </R.Field>
          </:row>
          <:footer as |F|>
            <F.AddRowButton />
          </:footer>
        </HdsFormKeyValueInputs>
      </:theming>
      <:reference>
        <cds-stack gap="7">
          <cds-form-group legend-text="This is the legend">
            <cds-stack gap="7">
              <cds-text-input label="Key"></cds-text-input>
              <cds-text-input label="Value"></cds-text-input>
            </cds-stack>
          </cds-form-group>
          <cds-button kind="tertiary">Add row</cds-button>
        </cds-stack>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid
      @label="Two rows with delete buttons & mixed values"
      @layout="column-stacked"
    >
      <:theming>
        <HdsFormKeyValueInputs @data={{TWO_ROWS_MIXED_VALUES_DATA}}>
          <:header as |H|>
            <H.Legend>This is the legend</H.Legend>
            <H.HelperText>This is the helper text, usually used with the legend.</H.HelperText>
          </:header>
          <:row as |R|>
            <R.Field as |F|>
              <F.Label>Key</F.Label>
              <F.TextInput @value={{R.rowData.key.text}} />
            </R.Field>
            <R.Field as |F|>
              <F.Label>Value</F.Label>
              <F.TextInput @value={{R.rowData.value.text}} />
            </R.Field>
            <R.DeleteRowButton />
          </:row>
          <:footer as |F|>
            <F.AddRowButton />
          </:footer>
        </HdsFormKeyValueInputs>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>With only 1 column</ShwTextH3>

    <ShwCarbonizationComparisonGrid
      @label="One row without delete button"
      @layout="column-stacked"
    >
      <:theming>
        <HdsFormKeyValueInputs @data={{ONE_ROW_NO_VALUES_DATA}}>
          <:header as |H|>
            <H.Legend>This is the legend</H.Legend>
            <H.HelperText>This is the helper text, usually used with the legend.</H.HelperText>
          </:header>
          <:row as |R|>
            <R.Field as |F|>
              <F.Label>Key</F.Label>
              <F.TextInput @value={{R.rowData.key.text}} />
            </R.Field>
          </:row>
          <:footer as |F|>
            <F.AddRowButton />
          </:footer>
        </HdsFormKeyValueInputs>
      </:theming>
      <:reference>
        <cds-stack gap="7">
          <cds-form-group legend-text="This is the legend">
            <cds-text-input label="Key"></cds-text-input>
          </cds-form-group>
          <cds-button kind="tertiary">Add row</cds-button>
        </cds-stack>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid
      @label="Two rows with delete buttons & mixed values"
      @layout="column-stacked"
    >
      <:theming>
        <HdsFormKeyValueInputs @data={{TWO_ROWS_MIXED_VALUES_DATA}}>
          <:header as |H|>
            <H.Legend>This is the legend</H.Legend>
            <H.HelperText>This is the helper text, usually used with the legend.</H.HelperText>
          </:header>
          <:row as |R|>
            <R.Field as |F|>
              <F.Label>Key</F.Label>
              <F.TextInput @value={{R.rowData.key.text}} />
            </R.Field>
            <R.DeleteRowButton />
          </:row>
          <:footer as |F|>
            <F.AddRowButton />
          </:footer>
        </HdsFormKeyValueInputs>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider />

    <ShwTextH2>Base elements</ShwTextH2>

    <ShwTextH3>Header</ShwTextH3>

    <ShwCarbonizationComparisonGrid
      @label="With legend"
      @layout="column-stacked"
    >
      <:theming>
        <HdsFormKeyValueInputs @data={{EMPTY_DATA}}>
          <:header as |H|>
            <H.Legend>This is the legend</H.Legend>
          </:header>
          <:row as |R|>
            <R.Field as |F|>
              <F.Label>Key</F.Label>
              <F.TextInput />
            </R.Field>
            <R.Field as |F|>
              <F.Label>Value</F.Label>
              <F.TextInput />
            </R.Field>
            <R.DeleteRowButton />
          </:row>
          <:footer as |F|>
            <F.AddRowButton />
          </:footer>
        </HdsFormKeyValueInputs>
      </:theming>
      <:reference>
        <cds-form-group legend-text="This is the legend"></cds-form-group>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid
      @label="With helper text only"
      @layout="column-stacked"
    >
      <:theming>
        <HdsFormKeyValueInputs @data={{EMPTY_DATA}}>
          <:header as |H|>
            <H.HelperText>This is the helper text, usually used with the legend.</H.HelperText>
          </:header>
          <:row as |R|>
            <R.Field as |F|>
              <F.Label>Key</F.Label>
              <F.TextInput />
            </R.Field>
            <R.Field as |F|>
              <F.Label>Value</F.Label>
              <F.TextInput />
            </R.Field>
            <R.DeleteRowButton />
          </:row>
          <:footer as |F|>
            <F.AddRowButton />
          </:footer>
        </HdsFormKeyValueInputs>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid
      @label="With legend + helper text"
      @layout="column-stacked"
    >
      <:theming>
        <HdsFormKeyValueInputs @data={{EMPTY_DATA}}>
          <:header as |H|>
            <H.Legend>This is the legend</H.Legend>
            <H.HelperText>This is the helper text, usually used with the legend.</H.HelperText>
          </:header>
          <:row as |R|>
            <R.Field as |F|>
              <F.Label>Key</F.Label>
              <F.TextInput />
            </R.Field>
            <R.Field as |F|>
              <F.Label>Value</F.Label>
              <F.TextInput />
            </R.Field>
            <R.DeleteRowButton />
          </:row>
          <:footer as |F|>
            <F.AddRowButton />
          </:footer>
        </HdsFormKeyValueInputs>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid
      @label="With 'required' indicator"
      @layout="column-stacked"
    >
      <:theming>
        <HdsFormKeyValueInputs @isRequired={{true}} @data={{EMPTY_DATA}}>
          <:header as |H|>
            <H.Legend>This is the legend</H.Legend>
            <H.HelperText>This is the helper text, usually used with the legend.</H.HelperText>
          </:header>
          <:row as |R|>
            <R.Field as |F|>
              <F.Label>Key</F.Label>
              <F.TextInput />
            </R.Field>
            <R.Field as |F|>
              <F.Label>Value</F.Label>
              <F.TextInput />
            </R.Field>
            <R.DeleteRowButton />
          </:row>
          <:footer as |F|>
            <F.AddRowButton />
          </:footer>
        </HdsFormKeyValueInputs>
      </:theming>
      <:reference>
        <cds-form-group
          legend-text="This is the legend (required)"
        ></cds-form-group>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid
      @label="With 'optional' indicator"
      @layout="column-stacked"
    >
      <:theming>
        <HdsFormKeyValueInputs @isOptional={{true}} @data={{EMPTY_DATA}}>
          <:header as |H|>
            <H.Legend>This is the legend</H.Legend>
            <H.HelperText>This is the helper text, usually used with the legend.</H.HelperText>
          </:header>
          <:row as |R|>
            <R.Field as |F|>
              <F.Label>Key</F.Label>
              <F.TextInput />
            </R.Field>
            <R.Field as |F|>
              <F.Label>Value</F.Label>
              <F.TextInput />
            </R.Field>
            <R.DeleteRowButton />
          </:row>
          <:footer as |F|>
            <F.AddRowButton />
          </:footer>
        </HdsFormKeyValueInputs>
      </:theming>
      <:reference>
        <cds-form-group
          legend-text="This is the legend (optional)"
        ></cds-form-group>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Row</ShwTextH3>

    <ShwCarbonizationComparisonGrid @label="Required" @layout="column-stacked">
      <:theming>
        <HdsFormKeyValueInputs @data={{ONE_ROW_DATA}}>
          <:row as |R|>
            <R.Field @isRequired={{true}} as |F|>
              <F.Label>Key</F.Label>
              <F.TextInput @value={{R.rowData.key.text}} />
            </R.Field>
            <R.Field @isRequired={{true}} as |F|>
              <F.Label>Value</F.Label>
              <F.TextInput @value={{R.rowData.value.text}} />
            </R.Field>
            <R.DeleteRowButton />
          </:row>
        </HdsFormKeyValueInputs>
      </:theming>
      <:reference>
        <cds-stack gap="7">
          <cds-text-input label="Key (required)" value="key-1"></cds-text-input>
          <cds-text-input
            label="Value (required)"
            value="value-1"
          ></cds-text-input>
        </cds-stack>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid @label="Optional" @layout="column-stacked">
      <:theming>
        <HdsFormKeyValueInputs @data={{ONE_ROW_DATA}}>
          <:row as |R|>
            <R.Field @isOptional={{true}} as |F|>
              <F.Label>Key</F.Label>
              <F.TextInput @value={{R.rowData.key.text}} />
            </R.Field>
            <R.Field @isOptional={{true}} as |F|>
              <F.Label>Value</F.Label>
              <F.TextInput @value={{R.rowData.value.text}} />
            </R.Field>
            <R.DeleteRowButton />
          </:row>
        </HdsFormKeyValueInputs>
      </:theming>
      <:reference>
        <cds-stack gap="7">
          <cds-text-input label="Key (optional)" value="key-1"></cds-text-input>
          <cds-text-input
            label="Value (optional)"
            value="value-1"
          ></cds-text-input>
        </cds-stack>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid
      @label="With error"
      @layout="column-stacked"
    >
      <:theming>
        <HdsFormKeyValueInputs @data={{ONE_ROW_DATA}}>
          <:row as |R|>
            <R.Field as |F|>
              <F.Label>Key</F.Label>
              <F.TextInput @value={{R.rowData.key.text}} />
              <F.Error>This is the error</F.Error>
            </R.Field>
            <R.Field as |F|>
              <F.Label>Value</F.Label>
              <F.TextInput @value={{R.rowData.value.text}} />
            </R.Field>
            <R.DeleteRowButton />
          </:row>
        </HdsFormKeyValueInputs>
      </:theming>
      <:reference>
        <cds-stack gap="7">
          <cds-text-input
            label="Key"
            value="key-1"
            invalid
            invalid-text="This is the error"
          ></cds-text-input>
          <cds-text-input label="Value" value="value-1"></cds-text-input>
        </cds-stack>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Footer</ShwTextH3>

    <ShwCarbonizationComparisonGrid
      @label="With add button"
      @layout="column-stacked"
    >
      <:theming>
        <HdsFormKeyValueInputs @data={{ONE_ROW_DATA}}>
          <:row as |R|>
            <R.Field as |F|>
              <F.Label>Key</F.Label>
              <F.TextInput @value={{R.rowData.key.text}} />
            </R.Field>
            <R.Field as |F|>
              <F.Label>Value</F.Label>
              <F.TextInput @value={{R.rowData.value.text}} />
            </R.Field>
            <R.DeleteRowButton />
          </:row>
          <:footer as |F|>
            <F.AddRowButton />
          </:footer>
        </HdsFormKeyValueInputs>
      </:theming>
      <:reference>
        <cds-stack gap="7">
          <cds-text-input label="Key" value="key-1"></cds-text-input>
          <cds-text-input label="Value" value="value-1"></cds-text-input>
          <cds-button kind="tertiary">Add row</cds-button>
        </cds-stack>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid
      @label="With alert"
      @layout="column-stacked"
    >
      <:theming>
        <HdsFormKeyValueInputs @data={{ONE_ROW_DATA}}>
          <:row as |R|>
            <R.Field as |F|>
              <F.Label>Key</F.Label>
              <F.TextInput @value={{R.rowData.key.text}} />
            </R.Field>
            <R.Field as |F|>
              <F.Label>Value</F.Label>
              <F.TextInput @value={{R.rowData.value.text}} />
            </R.Field>
            <R.DeleteRowButton />
          </:row>
          <:footer as |F|>
            <F.Alert as |A|>
              <A.Description>This is the alert description.</A.Description>
            </F.Alert>
          </:footer>
        </HdsFormKeyValueInputs>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid
      @label="With error message"
      @layout="column-stacked"
    >
      <:theming>
        <HdsFormKeyValueInputs @data={{ONE_ROW_DATA}}>
          <:row as |R|>
            <R.Field as |F|>
              <F.Label>Key</F.Label>
              <F.TextInput @value={{R.rowData.key.text}} />
            </R.Field>
            <R.Field as |F|>
              <F.Label>Value</F.Label>
              <F.TextInput @value={{R.rowData.value.text}} />
            </R.Field>
            <R.DeleteRowButton />
          </:row>
          <:footer as |F|>
            <F.Error>This is the error message.</F.Error>
          </:footer>
        </HdsFormKeyValueInputs>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>
  </section>
</template>;

export default FormKeyValueInputsCarbonizationIndex;
