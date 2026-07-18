/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { capitalize } from '@ember/string';
import { eq } from 'ember-truth-helpers';
import { array } from '@ember/helper';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import {
  HdsFormToggleBase,
  HdsFormToggleGroup,
} from '@hashicorp/design-system-components/components';

const STATES = ['default', 'hover', 'focus'];

const FormToggleCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Toggle - Carbonization"}}

  <ShwTextH1>Toggle - Carbonization</ShwTextH1>

  <section>
    <ShwTextH2>“Base” control</ShwTextH2>

    <ShwTextH3>Interaction status</ShwTextH3>

    <ShwCarbonizationComparisonGrid @label="Unchecked / Checked">
      <:theming>
        <ShwFlex @gap="1rem" as |SF|>
          <SF.Item @label="Unchecked">
            <HdsFormToggleBase aria-label="Unchecked toggle" />
          </SF.Item>
          <SF.Item @label="Checked">
            <HdsFormToggleBase checked="checked" aria-label="Checked toggle" />
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference>
        <ShwFlex @gap="1rem" as |SF|>
          <SF.Item @label="Unchecked">
            <ShwFlex @gap=".5rem" @direction="column" as |SF|>
              <SF.Item>
                <cds-toggle
                  size="sm"
                  hideLabel="true"
                  labelText=""
                ></cds-toggle>
              </SF.Item>

              <SF.Item>
                <cds-toggle
                  size="md"
                  hideLabel="true"
                  labelText=""
                ></cds-toggle>
              </SF.Item>
            </ShwFlex>
          </SF.Item>
          <SF.Item @label="Checked">
            <ShwFlex @gap=".5rem" @direction="column" as |SF|>
              <SF.Item>
                <cds-toggle
                  size="sm"
                  hideLabel="true"
                  labelText=""
                  toggled
                ></cds-toggle>
              </SF.Item>

              <SF.Item>
                <cds-toggle
                  size="md"
                  hideLabel="true"
                  labelText=""
                  toggled
                ></cds-toggle>
              </SF.Item>
            </ShwFlex>
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
              <HdsFormToggleBase aria-label="Unchecked toggle" />
            </SF.Item>
            <SF.Item>
              <HdsFormToggleBase
                checked="checked"
                aria-label="Checked toggle"
              />
            </SF.Item>
          </ShwFlex>
        </:theming>
        <:reference>
          {{#if (eq state "default")}}
            <ShwFlex @gap="1rem" as |SF|>
              <SF.Item>
                <cds-toggle
                  size="sm"
                  hideLabel="true"
                  labelText=""
                ></cds-toggle>
              </SF.Item>
              <SF.Item>
                <cds-toggle
                  size="sm"
                  hideLabel="true"
                  labelText=""
                  toggled
                ></cds-toggle>
              </SF.Item>
            </ShwFlex>
          {{else}}
            <pre>TODO: static image here</pre>
          {{/if}}
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    {{#each (array "default" "hover") as |state|}}
      <ShwCarbonizationComparisonGrid
        @label="Disabled / {{capitalize state}}"
        mock-state-value={{state}}
        mock-state-selector="input"
      >
        <:theming>
          <ShwFlex @gap="1rem" as |SF|>
            <SF.Item>
              <HdsFormToggleBase
                disabled="disabled"
                aria-label="Disabled toggle"
              />
            </SF.Item>
            <SF.Item>
              <HdsFormToggleBase
                checked="checked"
                disabled="disabled"
                aria-label="Checked, disabled toggle"
              />
            </SF.Item>
          </ShwFlex>
        </:theming>
        <:reference>
          {{#if (eq state "default")}}
            <ShwFlex @gap="1rem" as |SF|>
              <SF.Item>
                <cds-toggle
                  size="sm"
                  hideLabel="true"
                  labelText=""
                  disabled
                ></cds-toggle>
              </SF.Item>
              <SF.Item>
                <cds-toggle
                  size="sm"
                  hideLabel="true"
                  labelText=""
                  toggled
                  disabled
                ></cds-toggle>
              </SF.Item>
            </ShwFlex>
          {{else}}
            <pre>TODO: static image here</pre>
          {{/if}}
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

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
          <HdsFormToggleGroup as |G|>
            <G.ToggleField checked="checked" as |F|>
              <F.Label>This is the label</F.Label>
              <F.HelperText>This is the helper text</F.HelperText>
            </G.ToggleField>
            <G.ToggleField as |F|>
              <F.Label>This is the label</F.Label>
              <F.HelperText>This is the helper text</F.HelperText>
              <F.Error>This is the error</F.Error>
            </G.ToggleField>
          </HdsFormToggleGroup>
        </:theming>
        <:reference>
          {{#if (eq state "default")}}
            <ShwFlex @direction="column" as |SF|>
              <SF.Item>
                <cds-toggle
                  size="sm"
                  label-text="This is the label"
                  helper-text="This is the helper text"
                  toggled
                ></cds-toggle>
              </SF.Item>
              <SF.Item>
                <cds-toggle
                  size="sm"
                  label-text="This is the label"
                  helper-text="This is the helper text"
                  invalid
                  invalid-text="This is the error"
                ></cds-toggle>
              </SF.Item>
            </ShwFlex>
          {{else}}
            <pre>TODO: static image here</pre>
          {{/if}}
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    {{#each (array "default" "hover") as |state|}}
      <ShwCarbonizationComparisonGrid
        @label="Disabled / {{capitalize state}}"
        mock-state-value={{state}}
        mock-state-selector="input"
      >
        <:theming>
          <HdsFormToggleGroup as |G|>
            <G.ToggleField checked="checked" disabled={{true}} as |F|>
              <F.Label>This is the label</F.Label>
              <F.HelperText>This is the helper text</F.HelperText>
            </G.ToggleField>
            <G.ToggleField disabled={{true}} as |F|>
              <F.Label>This is the label</F.Label>
              <F.HelperText>This is the helper text</F.HelperText>
              <F.Error>This is the error</F.Error>
            </G.ToggleField>
          </HdsFormToggleGroup>
        </:theming>
        <:reference>
          {{#if (eq state "default")}}
            <ShwFlex @direction="column" as |SF|>
              <SF.Item>
                <cds-toggle
                  size="sm"
                  label-text="This is the label"
                  helper-text="This is the helper text"
                  toggled
                  disabled
                ></cds-toggle>
              </SF.Item>
              <SF.Item>
                <cds-toggle
                  size="sm"
                  label-text="This is the label"
                  helper-text="This is the helper text"
                  invalid
                  invalid-text="This is the error"
                  disabled
                ></cds-toggle>
              </SF.Item>
            </ShwFlex>
          {{else}}
            <pre>TODO: static image here</pre>
          {{/if}}
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    <ShwDivider />

    <ShwTextH2>“Group” control</ShwTextH2>

    <ShwTextH3>Vertical layout</ShwTextH3>

    <ShwCarbonizationComparisonGrid
      @label="With legend"
      @layout="column-stacked"
    >
      <:theming>
        <HdsFormToggleGroup as |G|>
          <G.Legend>Legend of the group</G.Legend>
          <G.ToggleField as |F|>
            <F.Label>Label of control #1</F.Label>
          </G.ToggleField>
          <G.ToggleField checked="checked" as |F|>
            <F.Label>Label of control #2</F.Label>
          </G.ToggleField>
          <G.ToggleField as |F|>
            <F.Label>Label of control #3</F.Label>
          </G.ToggleField>
        </HdsFormToggleGroup>
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
        <HdsFormToggleGroup as |G|>
          <G.Legend>Legend of the group</G.Legend>
          <G.HelperText>Helper text for the entire group</G.HelperText>
          <G.ToggleField as |F|>
            <F.Label>Label of control #1</F.Label>
          </G.ToggleField>
          <G.ToggleField checked="checked" as |F|>
            <F.Label>Label of control #2</F.Label>
          </G.ToggleField>
          <G.ToggleField as |F|>
            <F.Label>Label of control #3</F.Label>
          </G.ToggleField>
        </HdsFormToggleGroup>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid
      @label="With error at group level"
      @layout="column-stacked"
    >
      <:theming>
        <HdsFormToggleGroup as |G|>
          <G.Legend>Legend of the group</G.Legend>
          <G.ToggleField as |F|>
            <F.Label>Label of control #1</F.Label>
          </G.ToggleField>
          <G.ToggleField checked="checked" as |F|>
            <F.Label>Label of control #2</F.Label>
          </G.ToggleField>
          <G.ToggleField as |F|>
            <F.Label>Label of control #3</F.Label>
          </G.ToggleField>
          <G.Error>Error for the entire group</G.Error>
        </HdsFormToggleGroup>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Horizontal layout</ShwTextH3>

    <ShwCarbonizationComparisonGrid @label="With legend" @layout="column">
      <:theming>
        <HdsFormToggleGroup @layout="horizontal" as |G|>
          <G.Legend>Legend of the group</G.Legend>
          <G.ToggleField as |F|>
            <F.Label>Label of control #1</F.Label>
          </G.ToggleField>
          <G.ToggleField checked="checked" as |F|>
            <F.Label>Label of control #2</F.Label>
          </G.ToggleField>
          <G.ToggleField as |F|>
            <F.Label>Label of control #3</F.Label>
          </G.ToggleField>
        </HdsFormToggleGroup>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>
  </section>
</template>;

export default FormToggleCarbonizationIndex;
