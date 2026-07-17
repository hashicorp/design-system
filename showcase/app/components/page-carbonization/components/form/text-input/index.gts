/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { array } from '@ember/helper';
import { capitalize } from '@ember/string';
import { eq, notEq, and, or } from 'ember-truth-helpers';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwBody from 'showcase/components/shw/text/body';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import CodeFragmentWithCharacterCount from 'showcase/components/page-components/form/text-input/code-fragments/with-character-count';

import {
  HdsFormTextInputBase,
  HdsFormTextInputField,
} from '@hashicorp/design-system-components/components';
import { TYPES } from '@hashicorp/design-system-components/components/hds/form/text-input/base';

const STATES = ['default', 'hover', 'focus'];

const FormTextInputCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "TextInput - Carbonization"}}

  <ShwTextH1>TextInput - Carbonization</ShwTextH1>

  <section>
    <ShwTextH2>“Base” control</ShwTextH2>

    <ShwTextH3>Interaction status</ShwTextH3>

    <ShwCarbonizationComparisonGrid @label="Default">
      <:theming>
        <HdsFormTextInputBase aria-label="default input example" />
      </:theming>
      <:reference>
        <cds-text-input type="text" size="md" value=""></cds-text-input>
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="With placeholder">
      <:theming>
        <HdsFormTextInputBase placeholder="Lorem ipsum dolor" />
      </:theming>
      <:reference>
        <cds-text-input
          type="text"
          size="md"
          placeholder="Lorem ipsum dolor"
          value=""
        ></cds-text-input>
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="With value">
      <:theming>
        <HdsFormTextInputBase
          @value="Lorem ipsum dolor"
          aria-label="text input example with value"
        />
      </:theming>
      <:reference>
        <cds-text-input
          type="text"
          size="md"
          value="Lorem ipsum dolor"
        ></cds-text-input>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Types (native)</ShwTextH3>

    {{#each TYPES as |type|}}
      <ShwCarbonizationComparisonGrid
        @label={{capitalize type}}
        @layout={{if
          (or
            (eq type "date")
            (eq type "datetime-local")
            (eq type "month")
            (eq type "week")
          )
          "side-by-side"
        }}
      >
        <:theming>
          <HdsFormTextInputBase
            @type={{type}}
            @value={{type}}
            aria-label="text input example for {{type}}"
          />
        </:theming>
        <:reference>
          {{#if (and (notEq type "search"))}}
            <cds-text-input
              type={{type}}
              size="md"
              value={{type}}
            ></cds-text-input>
          {{else if (eq type "search")}}
            <cds-search
              label-text="Search"
              value="search"
              size="md"
            ></cds-search>
          {{/if}}
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}
    <ShwCarbonizationComparisonGrid @label="Search (loading state)">
      <:theming>
        <HdsFormTextInputBase
          @type="search"
          @value="search"
          @isLoading={{true}}
          aria-label="example of textinput with search/loading state"
        />
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} @entity="variant" />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>States</ShwTextH3>

    <ShwBody>
      Note: Carbon doesn’t include hover states except for the search cancel
      button.
    </ShwBody>

    {{#let (array "base" "invalid" "readonly" "disabled") as |variants|}}
      {{#each variants as |variant|}}
        {{#each STATES as |state|}}
          {{#let
            (and (eq variant "disabled") (eq state "focus"))
            as |isInvalidState|
          }}
            {{#unless isInvalidState}}
              <ShwCarbonizationComparisonGrid
                @label="{{capitalize variant}} / {{capitalize state}}"
                mock-state-value={{state}}
                mock-state-selector="input"
              >
                <:theming>
                  <ShwFlex @direction="column" as |SF|>
                    <SF.Item>
                      <HdsFormTextInputBase
                        aria-label="text input example as {{state}}"
                        disabled={{if (eq variant "disabled") "disabled"}}
                        readonly={{if (eq variant "readonly") "readonly"}}
                        @isInvalid={{if (eq variant "invalid") true}}
                      />
                    </SF.Item>
                    <SF.Item>
                      <HdsFormTextInputBase
                        aria-label="text input example as {{state}}"
                        placeholder="Placeholder"
                        disabled={{if (eq variant "disabled") "disabled"}}
                        readonly={{if (eq variant "readonly") "readonly"}}
                        @isInvalid={{if (eq variant "invalid") true}}
                      />
                    </SF.Item>
                    <SF.Item>
                      <HdsFormTextInputBase
                        aria-label="text input example as {{state}}"
                        @value="Lorem ipsum dolor"
                        disabled={{if (eq variant "disabled") "disabled"}}
                        readonly={{if (eq variant "readonly") "readonly"}}
                        @isInvalid={{if (eq variant "invalid") true}}
                      />
                    </SF.Item>
                    <SF.Item>
                      <HdsFormTextInputBase
                        aria-label="text input example as {{state}}"
                        @type="password"
                        @value="Lorem ipsum dolor"
                        disabled={{if (eq variant "disabled") "disabled"}}
                        readonly={{if (eq variant "readonly") "readonly"}}
                        @isInvalid={{if (eq variant "invalid") true}}
                      />
                    </SF.Item>
                    <SF.Item>
                      <HdsFormTextInputBase
                        aria-label="text input example as {{state}}"
                        @type="search"
                        @value="Lorem ipsum dolor"
                        disabled={{if (eq variant "disabled") "disabled"}}
                        readonly={{if (eq variant "readonly") "readonly"}}
                        @isInvalid={{if (eq variant "invalid") true}}
                      />
                    </SF.Item>
                    <SF.Item>
                      <HdsFormTextInputBase
                        aria-label="text input example as {{state}}"
                        @type="date"
                        @value="Lorem ipsum dolor"
                        disabled={{if (eq variant "disabled") "disabled"}}
                        readonly={{if (eq variant "readonly") "readonly"}}
                        @isInvalid={{if (eq variant "invalid") true}}
                      />
                    </SF.Item>
                    <SF.Item>
                      <HdsFormTextInputBase
                        aria-label="text input example as {{state}}"
                        @type="time"
                        @value="Lorem ipsum dolor"
                        disabled={{if (eq variant "disabled") "disabled"}}
                        readonly={{if (eq variant "readonly") "readonly"}}
                        @isInvalid={{if (eq variant "invalid") true}}
                      />
                    </SF.Item>
                  </ShwFlex>
                </:theming>
                <:reference>
                  {{#if (eq state "default")}}
                    <ShwFlex @direction="column" as |SF|>
                      <SF.Item>
                        <cds-text-input
                          type="text"
                          size="md"
                          disabled={{if (eq variant "disabled") "disabled"}}
                          readonly={{if (eq variant "readonly") "readonly"}}
                          invalid={{if (eq variant "invalid") true}}
                          invalid-text="Error message goes here"
                        ></cds-text-input>
                      </SF.Item>
                      <SF.Item>
                        <cds-text-input
                          type="text"
                          size="md"
                          placeholder="Placeholder"
                          disabled={{if (eq variant "disabled") "disabled"}}
                          readonly={{if (eq variant "readonly") "readonly"}}
                          invalid={{if (eq variant "invalid") true}}
                          invalid-text="Error message goes here"
                        ></cds-text-input>
                      </SF.Item>
                      <SF.Item>
                        <cds-text-input
                          type="text"
                          size="md"
                          value="Lorem ipsum dolor"
                          disabled={{if (eq variant "disabled") "disabled"}}
                          readonly={{if (eq variant "readonly") "readonly"}}
                          invalid={{if (eq variant "invalid") true}}
                          invalid-text="Error message goes here"
                        ></cds-text-input>
                      </SF.Item>
                      <SF.Item>
                        <cds-text-input
                          type="password"
                          size="md"
                          value="Lorem ipsum dolor"
                          disabled={{if (eq variant "disabled") "disabled"}}
                          readonly={{if (eq variant "readonly") "readonly"}}
                          invalid={{if (eq variant "invalid") true}}
                          invalid-text="Error message goes here"
                        ></cds-text-input>
                      </SF.Item>
                      <SF.Item>
                        {{#if
                          (or
                            (eq variant "invalid")
                            (eq variant "loading")
                            (eq variant "readonly")
                          )
                        }}
                          <pre>TODO: static image here</pre>
                        {{else}}
                          <cds-search
                            label-text="Search"
                            placeholder="search"
                            size="md"
                            value="Search component"
                            disabled={{if (eq variant "disabled") "true"}}
                            readonly={{if (eq variant "readonly") "true"}}
                            invalid={{if (eq variant "invalid") true}}
                            invalid-text="Error message goes here"
                          ></cds-search>
                        {{/if}}
                      </SF.Item>
                      <SF.Item>
                        {{#if (eq variant "invalid")}}
                          <pre>TODO: static image here</pre>
                        {{else}}
                          <cds-text-input
                            type="date"
                            size="md"
                            disabled={{if (eq variant "disabled") "disabled"}}
                            readonly={{if (eq variant "readonly") "readonly"}}
                            invalid={{if (eq variant "invalid") true}}
                            invalid-text="Error message goes here"
                          ></cds-text-input>
                        {{/if}}
                      </SF.Item>
                      <SF.Item>
                        <cds-text-input
                          type="time"
                          size="md"
                          value="Lorem ipsum dolor"
                          disabled={{if (eq variant "disabled") "disabled"}}
                          readonly={{if (eq variant "readonly") "readonly"}}
                          invalid={{if (eq variant "invalid") true}}
                          invalid-text="Error message goes here"
                        ></cds-text-input>
                      </SF.Item>
                    </ShwFlex>
                  {{else}}
                    <pre>TODO: static image here</pre>
                  {{/if}}
                </:reference>
              </ShwCarbonizationComparisonGrid>
            {{/unless}}
          {{/let}}
        {{/each}}
      {{/each}}
    {{/let}}

    <ShwDivider />

    <ShwTextH2>“Field” control</ShwTextH2>

    <ShwTextH3>Types (native)</ShwTextH3>

    <ShwBody>
      Note: Carbon doesn’t have exact equivalents for all of these types such as
      “time”, "date-time", "month", "week", or "date".
    </ShwBody>

    <ShwCarbonizationComparisonGrid @layout="column">
      <:theming>
        <ShwGrid @columns={{4}} as |SG|>
          {{#each TYPES as |type|}}
            <SG.Item @label={{capitalize type}}>
              <HdsFormTextInputField @type={{type}} @value={{type}} as |F|>
                <F.Label>This is the label text</F.Label>
              </HdsFormTextInputField>
            </SG.Item>
          {{/each}}
          <SG.Item @label="Search (loading state)">
            <HdsFormTextInputField
              @type="search"
              @value="search"
              @isLoading={{true}}
              as |F|
            >
              <F.Label>This is the label text</F.Label>
            </HdsFormTextInputField>
          </SG.Item>
        </ShwGrid>
      </:theming>
      <:reference>
        <ShwGrid @columns={{4}} as |SG|>
          {{#each TYPES as |type|}}
            <SG.Item @label={{capitalize type}}>
              <cds-text-input
                type={{type}}
                label="This is the label text"
                size="md"
                value={{type}}
              ></cds-text-input>
            </SG.Item>
          {{/each}}
        </ShwGrid>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Content</ShwTextH3>

    <ShwCarbonizationComparisonGrid @label="Label + Helper text + Error">
      <:theming>
        <HdsFormTextInputField
          @value="Lorem ipsum dolor"
          @isInvalid={{true}}
          as |F|
        >
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.Error>This is the error text</F.Error>
        </HdsFormTextInputField>
      </:theming>
      <:reference>
        <cds-text-input
          type="text"
          size="md"
          label="This is the label text"
          helper-text="This is the helper text (not visible)"
          value="Lorem ipsum dolor"
          invalid="true"
          invalid-text="This is the error text"
        ></cds-text-input>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Character count</ShwTextH3>

    <ShwCarbonizationComparisonGrid
      @label="Label + Helper text + Character count"
    >
      <:theming>
        <CodeFragmentWithCharacterCount
          @maxLength={{20}}
          @value="Lorem ipsum dolor sit amet"
          @hasValidation={{true}}
        />
      </:theming>
      <:reference>
        <cds-text-input
          type="text"
          size="md"
          label="This is the label text"
          helper-text="This is the helper text"
          value="Lorem ipsum dolor"
          enable-counter="true"
          max-count="20"
          invalid="true"
          invalid-text="Maximum numbers of characters exceeded"
        ></cds-text-input>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>States</ShwTextH3>

    <ShwCarbonizationComparisonGrid @label="Readonly">
      <:theming>
        <HdsFormTextInputField
          @value="Lorem ipsum dolor"
          readonly={{true}}
          as |F|
        >
          <F.Label>This is the label text</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
        </HdsFormTextInputField>
      </:theming>
      <:reference>
        <cds-text-input
          type="text"
          size="md"
          label="This is the label text"
          helper-text="This is the helper text"
          value="Lorem ipsum dolor"
          readonly="true"
        ></cds-text-input>
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="Disabled">
      <:theming>
        <HdsFormTextInputField
          @value="Lorem ipsum dolor"
          disabled={{true}}
          as |F|
        >
          <F.Label>This is the label text</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
        </HdsFormTextInputField>
      </:theming>
      <:reference>
        <cds-text-input
          type="text"
          size="md"
          label="This is the label text"
          helper-text="This is the helper text"
          value="Lorem ipsum dolor"
          disabled="true"
        ></cds-text-input>
      </:reference>
    </ShwCarbonizationComparisonGrid>
  </section>
</template>;

export default FormTextInputCarbonizationIndex;
