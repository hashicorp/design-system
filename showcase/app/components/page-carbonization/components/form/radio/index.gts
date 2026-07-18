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
  HdsFormRadioBase,
  HdsFormRadioGroup,
} from '@hashicorp/design-system-components/components';

const STATES = ['default', 'hover', 'focus'];

const FormRadioCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Radio - Carbonization"}}

  <ShwTextH1>Radio - Carbonization</ShwTextH1>

  <section>
    <ShwTextH2>“Base” control</ShwTextH2>

    <ShwTextH3>Interaction status</ShwTextH3>

    <ShwCarbonizationComparisonGrid @label="Unchecked / Checked">
      <:theming>
        <ShwFlex @gap="1rem" as |SF|>
          <SF.Item>
            <HdsFormRadioBase aria-label="Unchecked radio" />
          </SF.Item>
          <SF.Item>
            <HdsFormRadioBase checked="checked" aria-label="Checked radio" />
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference>
        <ShwFlex @gap="1rem" as |SF|>
          <SF.Item @label="Unchecked">
            <cds-radio-button></cds-radio-button>
          </SF.Item>
          <SF.Item @label="Checked">
            <cds-radio-button checked></cds-radio-button>
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
              <HdsFormRadioBase aria-label="Unchecked radio" />
            </SF.Item>
            <SF.Item>
              <HdsFormRadioBase checked="checked" aria-label="Checked radio" />
            </SF.Item>
          </ShwFlex>
        </:theming>
        <:reference>
          {{#if (eq state "default")}}
            <ShwFlex @gap="1rem" as |SF|>
              <SF.Item>
                <cds-radio-button></cds-radio-button>
              </SF.Item>
              <SF.Item>
                <cds-radio-button checked></cds-radio-button>
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
              <HdsFormRadioBase
                disabled="disabled"
                aria-label="Disabled radio"
              />
            </SF.Item>
            <SF.Item>
              <HdsFormRadioBase
                checked="checked"
                disabled="disabled"
                aria-label="Checked, disabled radio"
              />
            </SF.Item>
          </ShwFlex>
        </:theming>
        <:reference>
          {{#if (eq state "default")}}
            <ShwFlex @gap="1rem" as |SF|>
              <SF.Item>
                <cds-radio-button disabled></cds-radio-button>
              </SF.Item>
              <SF.Item>
                <cds-radio-button checked disabled></cds-radio-button>
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
        <:theming as |T|>
          <HdsFormRadioGroup
            @name="field-states-{{state}}-{{T.context}}"
            as |G|
          >
            <G.RadioField checked="checked" as |F|>
              <F.Label>This is the label</F.Label>
              <F.HelperText>This is the helper text</F.HelperText>
            </G.RadioField>
            <G.RadioField as |F|>
              <F.Label>This is the label</F.Label>
              <F.HelperText>This is the helper text</F.HelperText>
              <F.Error>This is the error</F.Error>
            </G.RadioField>
          </HdsFormRadioGroup>
        </:theming>
        <:reference>
          {{#if (eq state "default")}}
            <cds-radio-button-group>
              <cds-radio-button
                label-text="This is the label"
                helper-text="This is the helper text"
                checked
              ></cds-radio-button>
              <cds-radio-button
                label-text="This is the label"
                helper-text="This is the helper text"
                invalid
                invalid-text="This is the error"
              ></cds-radio-button>
            </cds-radio-button-group>
          {{else}}
            <pre>TODO: static image here</pre>
          {{/if}}
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}
    <ShwCarbonizationComparisonGrid @label="Disabled">
      <:theming as |T|>
        <HdsFormRadioGroup @name="field-disabled-{{T.context}}" as |G|>
          <G.RadioField disabled checked="checked" as |F|>
            <F.Label>This is the label</F.Label>
            <F.HelperText>This is the helper text</F.HelperText>
          </G.RadioField>
          <G.RadioField disabled as |F|>
            <F.Label>This is the label</F.Label>
            <F.HelperText>This is the helper text</F.HelperText>
            <F.Error>This is the error</F.Error>
          </G.RadioField>
        </HdsFormRadioGroup>
      </:theming>
      <:reference>
        <cds-radio-button-group>
          <cds-radio-button
            label-text="This is the label"
            helper-text="This is the helper text"
            checked
            disabled
          ></cds-radio-button>
          <cds-radio-button
            label-text="This is the label"
            helper-text="This is the helper text"
            invalid
            invalid-text="This is the error"
            disabled
          ></cds-radio-button>
        </cds-radio-button-group>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider />

    <ShwTextH2>“Group” control</ShwTextH2>

    <ShwTextH3>Vertical layout</ShwTextH3>

    <ShwCarbonizationComparisonGrid
      @label="With legend"
      @layout="column-stacked"
    >
      <:theming as |T|>
        <HdsFormRadioGroup @name="group-vertical-01-{{T.context}}" as |G|>
          <G.Legend>Legend of the group</G.Legend>
          <G.RadioField as |F|>
            <F.Label>Label of control #1</F.Label>
          </G.RadioField>
          <G.RadioField checked="checked" as |F|>
            <F.Label>Label of control #2</F.Label>
          </G.RadioField>
          <G.RadioField as |F|>
            <F.Label>Label of control #3</F.Label>
          </G.RadioField>
        </HdsFormRadioGroup>
      </:theming>
      <:reference>
        <cds-radio-button-group legend-text="Legend of the group">
          <cds-radio-button label-text="Label of control #1"></cds-radio-button>
          <cds-radio-button
            label-text="Label of control #2"
            checked
          ></cds-radio-button>
          <cds-radio-button label-text="Label of control #3"></cds-radio-button>
        </cds-radio-button-group>
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid
      @label="With legend + helper text"
      @layout="column-stacked"
    >
      <:theming as |T|>
        <HdsFormRadioGroup @name="group-vertical-02-{{T.context}}" as |G|>
          <G.Legend>Legend of the group</G.Legend>
          <G.HelperText>Helper text for the entire group</G.HelperText>
          <G.RadioField as |F|>
            <F.Label>Label of control #1</F.Label>
          </G.RadioField>
          <G.RadioField checked="checked" as |F|>
            <F.Label>Label of control #2</F.Label>
          </G.RadioField>
          <G.RadioField as |F|>
            <F.Label>Label of control #3</F.Label>
          </G.RadioField>
        </HdsFormRadioGroup>
      </:theming>
      <:reference>
        <cds-radio-button-group
          legend-text="Legend of the group"
          helper-text="Helper text for the entire group"
        >
          <cds-radio-button label-text="Label of control #1"></cds-radio-button>
          <cds-radio-button
            label-text="Label of control #2"
            checked
          ></cds-radio-button>
          <cds-radio-button label-text="Label of control #3"></cds-radio-button>
        </cds-radio-button-group>
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid
      @label="With error at group level"
      @layout="column-stacked"
    >
      <:theming as |T|>
        <HdsFormRadioGroup @name="group-vertical-03-{{T.context}}" as |G|>
          <G.Legend>Legend of the group</G.Legend>
          <G.RadioField as |F|>
            <F.Label>Label of control #1</F.Label>
          </G.RadioField>
          <G.RadioField checked="checked" as |F|>
            <F.Label>Label of control #2</F.Label>
          </G.RadioField>
          <G.RadioField as |F|>
            <F.Label>Label of control #3</F.Label>
          </G.RadioField>
          <G.Error>Error for the entire group</G.Error>
        </HdsFormRadioGroup>
      </:theming>
      <:reference>
        <cds-radio-button-group
          legend-text="Legend of the group"
          invalid
          invalid-text="Error for the entire group"
        >
          <cds-radio-button label-text="Label of control #1"></cds-radio-button>
          <cds-radio-button
            label-text="Label of control #2"
            checked
          ></cds-radio-button>
          <cds-radio-button label-text="Label of control #3"></cds-radio-button>
        </cds-radio-button-group>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Horizontal layout</ShwTextH3>

    <ShwCarbonizationComparisonGrid @label="With legend" @layout="column">
      <:theming as |T|>
        <HdsFormRadioGroup
          @layout="horizontal"
          @name="group-horizontal-01-{{T.context}}"
          as |G|
        >
          <G.Legend>Legend of the group</G.Legend>
          <G.RadioField as |F|>
            <F.Label>Label of control #1</F.Label>
          </G.RadioField>
          <G.RadioField checked="checked" as |F|>
            <F.Label>Label of control #2</F.Label>
          </G.RadioField>
          <G.RadioField as |F|>
            <F.Label>Label of control #3</F.Label>
          </G.RadioField>
        </HdsFormRadioGroup>
      </:theming>
      <:reference>
        <cds-radio-button-group
          legend-text="Legend of the group"
          orientation="horizontal"
        >
          <cds-radio-button label-text="Label of control #1"></cds-radio-button>
          <cds-radio-button
            label-text="Label of control #2"
            checked
          ></cds-radio-button>
          <cds-radio-button label-text="Label of control #3"></cds-radio-button>
        </cds-radio-button-group>
      </:reference>
    </ShwCarbonizationComparisonGrid>
  </section>
</template>;

export default FormRadioCarbonizationIndex;
