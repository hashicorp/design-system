/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { capitalize } from '@ember/string';
import { hash } from '@ember/helper';
import { eq } from 'ember-truth-helpers';
import style from 'ember-style-modifier';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import setCdsMultiSelectValue from 'showcase/modifiers/set-cds-multi-select-value';

import CodeFragmentWithSingleBaseElement from 'showcase/components/page-components/form/super-select/code-fragments/with-single-base-element';
import CodeFragmentWithSingleFieldElement from 'showcase/components/page-components/form/super-select/code-fragments/with-single-field-element';
import CodeFragmentWithMultipleBaseElement from 'showcase/components/page-components/form/super-select/code-fragments/with-multiple-base-element';
import CodeFragmentWithMultipleFieldElement from 'showcase/components/page-components/form/super-select/code-fragments/with-multiple-field-element';

import { HdsFormSuperSelectOptionGroup } from '@hashicorp/design-system-components/components';

const STATES = ['default', 'hover', 'focus'];

const FormSuperSelectCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "SuperSelect - Carbonization"}}

  <ShwTextH1>SuperSelect - Carbonization</ShwTextH1>

  <section>
    <ShwTextH2>“Single” select</ShwTextH2>

    <ShwTextH3>“Base” control</ShwTextH3>

    <ShwTextH3>Interaction status</ShwTextH3>

    <ShwCarbonizationComparisonGrid @label="Default">
      <:theming>
        <CodeFragmentWithSingleBaseElement />
      </:theming>
      <:reference>
        <cds-multi-select>
          <cds-multi-select-item value="option-1">Option 1</cds-multi-select-item>
          <cds-multi-select-item value="option-2">Option 2</cds-multi-select-item>
          <cds-multi-select-item value="option-3">Option 3</cds-multi-select-item>
        </cds-multi-select>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid @label="With placeholder">
      <:theming>
        <CodeFragmentWithSingleBaseElement @placeholder="Placeholder text" />
      </:theming>
      <:reference>
        <cds-multi-select label="Placeholder text">
          <cds-multi-select-item value="option-1">Option 1</cds-multi-select-item>
          <cds-multi-select-item value="option-2">Option 2</cds-multi-select-item>
          <cds-multi-select-item value="option-3">Option 3</cds-multi-select-item>
        </cds-multi-select>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid @label="Selected">
      <:theming>
        <CodeFragmentWithSingleBaseElement @isSelected={{true}} />
      </:theming>
      <:reference>
        <cds-multi-select {{setCdsMultiSelectValue "option-1"}}>
          <cds-multi-select-item value="option-1" selected>Option 1</cds-multi-select-item>
          <cds-multi-select-item value="option-2">Option 2</cds-multi-select-item>
          <cds-multi-select-item value="option-3">Option 3</cds-multi-select-item>
        </cds-multi-select>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>States</ShwTextH3>

    {{#each STATES as |state|}}
      <ShwCarbonizationComparisonGrid @label={{capitalize state}}>
        <:theming>
          <ShwFlex @direction="column" as |SF|>
            <SF.Item @label="Base">
              <CodeFragmentWithSingleBaseElement
                @isSelected={{true}}
                class="mock-{{state}}"
              />
            </SF.Item>
            <SF.Item @label="Invalid">
              <CodeFragmentWithSingleBaseElement
                @isSelected={{true}}
                @isInvalid={{true}}
                class="mock-{{state}}"
              />
            </SF.Item>
          </ShwFlex>
        </:theming>
        <:reference>
          {{#if (eq state "default")}}
            <ShwFlex @direction="column" as |SF|>
              <SF.Item @label="Base">
                <cds-multi-select {{setCdsMultiSelectValue "option-1"}}>
                  <cds-multi-select-item value="option-1" selected>Option 1</cds-multi-select-item>
                  <cds-multi-select-item value="option-2">Option 2</cds-multi-select-item>
                </cds-multi-select>
              </SF.Item>
              <SF.Item @label="Invalid">
                <cds-multi-select
                  invalid
                  invalid-text="This is the error"
                  {{setCdsMultiSelectValue "option-1"}}
                >
                  <cds-multi-select-item value="option-1" selected>Option 1</cds-multi-select-item>
                  <cds-multi-select-item value="option-2">Option 2</cds-multi-select-item>
                </cds-multi-select>
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
        <CodeFragmentWithSingleBaseElement
          @isSelected={{true}}
          @disabled={{true}}
        />
      </:theming>
      <:reference>
        <cds-multi-select disabled {{setCdsMultiSelectValue "option-1"}}>
          <cds-multi-select-item value="option-1" selected>Option 1</cds-multi-select-item>
          <cds-multi-select-item value="option-2">Option 2</cds-multi-select-item>
        </cds-multi-select>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>“Field” control</ShwTextH3>

    <ShwTextH3>Content</ShwTextH3>

    <ShwCarbonizationComparisonGrid @label="Label + Helper text">
      <:theming>
        <CodeFragmentWithSingleFieldElement @isSelected={{true}} as |CF|>
          <CF.Label>This is the label</CF.Label>
          <CF.HelperText>This is the helper text</CF.HelperText>
        </CodeFragmentWithSingleFieldElement>
      </:theming>
      <:reference>
        <cds-multi-select
          title-text="This is the label"
          helper-text="This is the helper text"
          {{setCdsMultiSelectValue "option-1"}}
        >
          <cds-multi-select-item value="option-1" selected>Option 1</cds-multi-select-item>
          <cds-multi-select-item value="option-2">Option 2</cds-multi-select-item>
        </cds-multi-select>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid @label="Label + Helper text + Error">
      <:theming>
        <CodeFragmentWithSingleFieldElement
          @isSelected={{true}}
          @isInvalid={{true}}
          as |CF|
        >
          <CF.Label>This is the label</CF.Label>
          <CF.HelperText>This is the helper text</CF.HelperText>
          <CF.Error>This is the error</CF.Error>
        </CodeFragmentWithSingleFieldElement>
      </:theming>
      <:reference>
        <cds-multi-select
          title-text="This is the label"
          helper-text="This is the helper text"
          invalid
          invalid-text="This is the error"
          {{setCdsMultiSelectValue "option-1"}}
        >
          <cds-multi-select-item value="option-1" selected>Option 1</cds-multi-select-item>
          <cds-multi-select-item value="option-2">Option 2</cds-multi-select-item>
        </cds-multi-select>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>States</ShwTextH3>

    {{#each STATES as |state|}}
      <ShwCarbonizationComparisonGrid
        @label={{capitalize state}}
        mock-state-value={{state}}
        mock-state-selector=".ember-basic-dropdown-trigger, .ember-power-select-trigger"
      >
        <:theming>
          <CodeFragmentWithSingleFieldElement @isSelected={{true}} as |CF|>
            <CF.Label>This is the label</CF.Label>
            <CF.HelperText>This is the helper text</CF.HelperText>
          </CodeFragmentWithSingleFieldElement>
        </:theming>
        <:reference>
          {{#if (eq state "default")}}
            <cds-multi-select
              title-text="This is the label"
              helper-text="This is the helper text"
              {{setCdsMultiSelectValue "option-1"}}
            >
              <cds-multi-select-item value="option-1" selected>Option 1</cds-multi-select-item>
              <cds-multi-select-item value="option-2">Option 2</cds-multi-select-item>
            </cds-multi-select>
          {{else}}
            <pre>TODO: static image here</pre>
          {{/if}}
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    <ShwCarbonizationComparisonGrid @label="Disabled">
      <:theming>
        <CodeFragmentWithSingleFieldElement
          @isSelected={{true}}
          @disabled={{true}}
          as |CF|
        >
          <CF.Label>This is the label</CF.Label>
          <CF.HelperText>This is the helper text</CF.HelperText>
        </CodeFragmentWithSingleFieldElement>
      </:theming>
      <:reference>
        <cds-multi-select
          title-text="This is the label"
          helper-text="This is the helper text"
          disabled
          {{setCdsMultiSelectValue "option-1"}}
        >
          <cds-multi-select-item value="option-1" selected>Option 1</cds-multi-select-item>
          <cds-multi-select-item value="option-2">Option 2</cds-multi-select-item>
        </cds-multi-select>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider />

    <ShwTextH2>“Multiple” select</ShwTextH2>

    <ShwTextH3>“Base” control</ShwTextH3>

    <ShwTextH3>Interaction status</ShwTextH3>

    <ShwCarbonizationComparisonGrid @label="Default">
      <:theming>
        <CodeFragmentWithMultipleBaseElement />
      </:theming>
      <:reference>
        <cds-multi-select>
          <cds-multi-select-item value="option-1">Option 1</cds-multi-select-item>
          <cds-multi-select-item value="option-2">Option 2</cds-multi-select-item>
          <cds-multi-select-item value="option-3">Option 3</cds-multi-select-item>
        </cds-multi-select>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid
      @label="With placeholder"
      @layout="column-stacked"
    >
      <:theming>
        <CodeFragmentWithMultipleBaseElement
          @placeholder="Placeholder text for multiple selection"
        />
      </:theming>
      <:reference>
        <cds-multi-select label="Placeholder text for multiple selection">
          <cds-multi-select-item value="option-1">Option 1</cds-multi-select-item>
          <cds-multi-select-item value="option-2">Option 2</cds-multi-select-item>
          <cds-multi-select-item value="option-3">Option 3</cds-multi-select-item>
        </cds-multi-select>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid @label="Selected" @layout="column-stacked">
      <:theming>
        <CodeFragmentWithMultipleBaseElement @isSelected={{true}} />
      </:theming>
      <:reference>
        <cds-multi-select
          value="option-1,option-2"
          {{setCdsMultiSelectValue "option-1,option-2"}}
        >
          <cds-multi-select-item value="option-1" selected>Option 1</cds-multi-select-item>
          <cds-multi-select-item value="option-2" selected>Option 2</cds-multi-select-item>
          <cds-multi-select-item value="option-3">Option 3</cds-multi-select-item>
        </cds-multi-select>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>States</ShwTextH3>

    {{#each STATES as |state|}}
      <ShwCarbonizationComparisonGrid
        @label={{capitalize state}}
        @layout="column-stacked"
      >
        <:theming>
          <ShwFlex @direction="column" as |SF|>
            <SF.Item @label="Base">
              <CodeFragmentWithMultipleBaseElement
                @isSelected={{true}}
                class="mock-{{state}}"
              />
            </SF.Item>
            <SF.Item @label="Invalid">
              <CodeFragmentWithMultipleBaseElement
                @isSelected={{true}}
                @isInvalid={{true}}
                class="mock-{{state}}"
              />
            </SF.Item>
          </ShwFlex>
        </:theming>
        <:reference>
          {{#if (eq state "default")}}
            <ShwFlex @direction="column" as |SF|>
              <SF.Item @label="Base">
                <cds-multi-select {{setCdsMultiSelectValue "option-1"}}>
                  <cds-multi-select-item value="option-1" selected>Option 1</cds-multi-select-item>
                  <cds-multi-select-item value="option-2">Option 2</cds-multi-select-item>
                </cds-multi-select>
              </SF.Item>
              <SF.Item @label="Invalid">
                <cds-multi-select
                  invalid
                  invalid-text="This is the error"
                  {{setCdsMultiSelectValue "option-1"}}
                >
                  <cds-multi-select-item value="option-1" selected>Option 1</cds-multi-select-item>
                  <cds-multi-select-item value="option-2">Option 2</cds-multi-select-item>
                </cds-multi-select>
              </SF.Item>
            </ShwFlex>
          {{else}}
            <pre>TODO: static image here</pre>
          {{/if}}
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    <ShwCarbonizationComparisonGrid @label="Disabled" @layout="column-stacked">
      <:theming>
        <CodeFragmentWithMultipleBaseElement
          @isSelected={{true}}
          @disabled={{true}}
        />
      </:theming>
      <:reference>
        <cds-multi-select disabled {{setCdsMultiSelectValue "option-1"}}>
          <cds-multi-select-item value="option-1" selected>Option 1</cds-multi-select-item>
          <cds-multi-select-item value="option-2">Option 2</cds-multi-select-item>
        </cds-multi-select>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>“Field” control</ShwTextH3>

    <ShwCarbonizationComparisonGrid
      @label="Label + Helper text"
      @layout="column-stacked"
    >
      <:theming>
        <CodeFragmentWithMultipleFieldElement @isSelected={{true}} as |CF|>
          <CF.Label>This is the label</CF.Label>
          <CF.HelperText>This is the helper text</CF.HelperText>
        </CodeFragmentWithMultipleFieldElement>
      </:theming>
      <:reference>
        <cds-multi-select
          title-text="This is the label"
          helper-text="This is the helper text"
          {{setCdsMultiSelectValue "option-1"}}
        >
          <cds-multi-select-item value="option-1" selected>Option 1</cds-multi-select-item>
          <cds-multi-select-item value="option-2">Option 2</cds-multi-select-item>
        </cds-multi-select>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid
      @label="Label + Helper text + Error"
      @layout="column-stacked"
    >
      <:theming>
        <CodeFragmentWithMultipleFieldElement
          @isSelected={{true}}
          @isInvalid={{true}}
          as |CF|
        >
          <CF.Label>This is the label</CF.Label>
          <CF.HelperText>This is the helper text</CF.HelperText>
          <CF.Error>This is the error</CF.Error>
        </CodeFragmentWithMultipleFieldElement>
      </:theming>
      <:reference>
        <cds-multi-select
          title-text="This is the label"
          helper-text="This is the helper text"
          invalid
          invalid-text="This is the error"
          {{setCdsMultiSelectValue "option-1"}}
        >
          <cds-multi-select-item value="option-1" selected>Option 1</cds-multi-select-item>
          <cds-multi-select-item value="option-2">Option 2</cds-multi-select-item>
        </cds-multi-select>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>States</ShwTextH3>

    {{#each STATES as |state|}}
      <ShwCarbonizationComparisonGrid
        @label={{capitalize state}}
        mock-state-value={{state}}
        mock-state-selector=".ember-basic-dropdown-trigger, .ember-power-select-trigger"
        @layout="column-stacked"
      >
        <:theming>
          <CodeFragmentWithMultipleFieldElement @isSelected={{true}} as |CF|>
            <CF.Label>This is the label</CF.Label>
            <CF.HelperText>This is the helper text</CF.HelperText>
          </CodeFragmentWithMultipleFieldElement>
        </:theming>
        <:reference>
          {{#if (eq state "default")}}
            <cds-multi-select
              title-text="This is the label"
              helper-text="This is the helper text"
              {{setCdsMultiSelectValue "option-1"}}
            >
              <cds-multi-select-item value="option-1" selected>Option 1</cds-multi-select-item>
              <cds-multi-select-item value="option-2">Option 2</cds-multi-select-item>
            </cds-multi-select>
          {{else}}
            <pre>TODO: static image here</pre>
          {{/if}}
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    <ShwCarbonizationComparisonGrid @label="Disabled" @layout="column-stacked">
      <:theming>
        <CodeFragmentWithMultipleFieldElement
          @isSelected={{true}}
          @disabled={{true}}
          as |CF|
        >
          <CF.Label>This is the label</CF.Label>
          <CF.HelperText>This is the helper text</CF.HelperText>
        </CodeFragmentWithMultipleFieldElement>
      </:theming>
      <:reference>
        <cds-multi-select
          title-text="This is the label"
          helper-text="This is the helper text"
          disabled
          {{setCdsMultiSelectValue "option-1"}}
        >
          <cds-multi-select-item value="option-1" selected>Option 1</cds-multi-select-item>
          <cds-multi-select-item value="option-2">Option 2</cds-multi-select-item>
        </cds-multi-select>
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwDivider />

    <ShwTextH2>Base elements</ShwTextH2>

    <ShwTextH3>List</ShwTextH3>

    <ShwCarbonizationComparisonGrid
      @label="Single selection"
      @layout="column-stacked"
    >
      <:theming>
        <div class="hds-form-super-select hds-form-super-select-single">
          <div class="ember-basic-dropdown">
            <div
              class="ember-basic-dropdown-content"
              {{style position="static"}}
            >
              <ul
                class="ember-power-select-options"
                role="listbox"
                aria-label="Label"
              >
                <li class="ember-power-select-option" role="option">
                  Option 1
                </li>
                <li
                  class="ember-power-select-option"
                  role="option"
                  aria-selected="true"
                >
                  Option 2 (checked)
                </li>
                <li class="ember-power-select-option" role="option">
                  Option 3
                </li>
              </ul>
            </div>
          </div>
        </div>
      </:theming>
      <:reference>
        <pre>TODO: static image here</pre>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid
      @label="Multiple selection with search"
      @layout="column-stacked"
    >
      <:theming>
        <div class="hds-form-super-select hds-form-super-select-multiple">
          <div class="ember-basic-dropdown">
            <div class="ember-power-select-search">
              <input
                class="ember-power-select-search-input"
                type="search"
                placeholder="Search"
                aria-label="Search input"
              />
            </div>
            <div
              class="ember-basic-dropdown-content"
              {{style position="static"}}
            >
              <ul
                class="ember-power-select-options"
                role="listbox"
                aria-label="Label"
              >
                <li class="ember-power-select-option" role="option">
                  Option 1
                </li>
                <li
                  class="ember-power-select-option"
                  role="option"
                  aria-selected="true"
                >
                  Option 2 (checked)
                </li>
                <li
                  class="ember-power-select-option"
                  role="option"
                  aria-selected="true"
                >
                  Option 3 (checked)
                </li>
                <li class="ember-power-select-option" role="option">
                  Option 4
                </li>
              </ul>
            </div>
          </div>
        </div>
      </:theming>
      <:reference>
        <pre>TODO: static image here</pre>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Option groups</ShwTextH3>

    <ShwCarbonizationComparisonGrid
      @label="With groups"
      @layout="column-stacked"
    >
      <:theming>
        <div class="hds-form-super-select hds-form-super-select-single">
          <div class="ember-basic-dropdown">
            <div
              class="ember-basic-dropdown-content"
              {{style position="static"}}
            >
              <ul
                class="ember-power-select-options"
                role="listbox"
                aria-label="Label"
              >
                <HdsFormSuperSelectOptionGroup
                  @group={{hash groupName="Group 1"}}
                >
                  {{! template-lint-disable require-context-role }}
                  <li class="ember-power-select-option" role="option">
                    Option 1
                  </li>
                  <li
                    class="ember-power-select-option"
                    role="option"
                    aria-selected="true"
                  >
                    Option 2 (checked)
                  </li>
                </HdsFormSuperSelectOptionGroup>
                <HdsFormSuperSelectOptionGroup
                  @group={{hash groupName="Group 2"}}
                >
                  {{! template-lint-disable require-context-role }}
                  <li class="ember-power-select-option" role="option">
                    Option 3
                  </li>
                  <li class="ember-power-select-option" role="option">
                    Option 4
                  </li>
                </HdsFormSuperSelectOptionGroup>
              </ul>
            </div>
          </div>
        </div>
      </:theming>
      <:reference>
        <pre>TODO: static image here</pre>
      </:reference>
    </ShwCarbonizationComparisonGrid>
  </section>
</template>;

export default FormSuperSelectCarbonizationIndex;
