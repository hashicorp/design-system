/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { array } from '@ember/helper';
import { capitalize } from '@ember/string';
import { eq, notEq, and } from 'ember-truth-helpers';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import CodeFragmentWithCharacterCount from 'showcase/components/page-components/form/text-input/code-fragments/with-character-count';

import {
  HdsFormTextInputBase,
  HdsFormTextInputField,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';
import { TYPES } from '@hashicorp/design-system-components/components/hds/form/text-input/base';

const STATES = ['default', 'hover', 'focus'];

const FormTextInputCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "TextInput - Carbonization"}}

  <ShwTextH1>TextInput - Carbonization</ShwTextH1>

  <section>

    <ShwTextH2>"Base" control</ShwTextH2>

    <ShwTextH3>Interaction status</ShwTextH3>

    <ShwCarbonizationComparisonGrid @label="Default">
      <:theming>
        <HdsFormTextInputBase aria-label="default input example" />
      </:theming>
      <:reference>
        <cds-text-input type="text" size="md" value=""></cds-text-input>
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid
      @label="With placeholder"
      @hideThemeLabels={{true}}
      @hideCarbonLabels={{true}}
    >
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
    <ShwCarbonizationComparisonGrid
      @label="With value"
      @hideThemeLabels={{true}}
      @hideCarbonLabels={{true}}
    >
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
        @hideThemeLabels={{(if (notEq type "text") true)}}
        @hideCarbonLabels={{(if (notEq type "text") true)}}
      >
        <:theming>
          <HdsFormTextInputBase
            @type={{type}}
            @value={{type}}
            aria-label="text input example for {{type}}"
          />
        </:theming>
        <:reference>
          <cds-text-input
            type={{type}}
            size="md"
            value={{type}}
          ></cds-text-input>
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}
    <ShwCarbonizationComparisonGrid
      @label="Search (loading state)"
      @hideThemeLabels={{true}}
      @hideCarbonLabels={{true}}
    >
      <:theming>
        <HdsFormTextInputBase
          @type="search"
          @value="search"
          @isLoading={{true}}
          aria-label="example of textinput with search/loading state"
        />
      </:theming>
      <:reference>
        <cds-text-input type="search" size="md" value="search"></cds-text-input>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>States</ShwTextH3>

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
                      <cds-text-input
                        type="search"
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
                        type="date"
                        size="md"
                        inline="true"
                        value="Lorem ipsum dolor"
                        disabled={{if (eq variant "disabled") "disabled"}}
                        readonly={{if (eq variant "readonly") "readonly"}}
                        invalid={{if (eq variant "invalid") true}}
                        invalid-text="Error message goes here"
                      ></cds-text-input>
                    </SF.Item>
                    <SF.Item>
                      <cds-text-input
                        type="time"
                        size="md"
                        inline="true"
                        value="Lorem ipsum dolor"
                        disabled={{if (eq variant "disabled") "disabled"}}
                        readonly={{if (eq variant "readonly") "readonly"}}
                        invalid={{if (eq variant "invalid") true}}
                        invalid-text="Error message goes here"
                      ></cds-text-input>
                    </SF.Item>
                  </ShwFlex>
                </:reference>
              </ShwCarbonizationComparisonGrid>
            {{/unless}}
          {{/let}}
        {{/each}}
      {{/each}}
    {{/let}}

    <ShwDivider />

    <ShwTextH2>"Field" control</ShwTextH2>

    <ShwTextH3>Content</ShwTextH3>

    <ShwCarbonizationComparisonGrid @label="Only label">
      <:theming>
        <HdsFormTextInputField @value="Lorem ipsum dolor" as |F|>
          <F.Label>This is the label text</F.Label>
        </HdsFormTextInputField>
      </:theming>
      <:reference>
        <cds-text-input
          type="text"
          size="md"
          label="This is the label text"
          value="Lorem ipsum dolor"
        ></cds-text-input>
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid
      @label="Label + Helper text"
      @hideThemeLabels={{true}}
      @hideCarbonLabels={{true}}
    >
      <:theming>
        <HdsFormTextInputField @value="Lorem ipsum dolor" as |F|>
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
        ></cds-text-input>
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid
      @label="Label + Helper text with link"
      @hideThemeLabels={{true}}
      @hideCarbonLabels={{true}}
    >
      <:theming>
        <HdsFormTextInputField @value="Lorem ipsum dolor" as |F|>
          <F.Label>This is the label text</F.Label>
          <F.HelperText>This is the helper text
            <HdsLinkInline @route="index">with a link</HdsLinkInline></F.HelperText>
        </HdsFormTextInputField>
      </:theming>
      <:reference>
        <cds-text-input type="text" size="md" label="This is the label text">
          <span slot="helper-text">This is the helper text
            <HdsLinkInline @route="index">with a link</HdsLinkInline></span>
        </cds-text-input>
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid
      @label="Label + Error"
      @hideThemeLabels={{true}}
      @hideCarbonLabels={{true}}
    >
      <:theming>
        <HdsFormTextInputField
          @value="Lorem ipsum dolor"
          @isInvalid={{true}}
          as |F|
        >
          <F.Label>This is the label text</F.Label>
          <F.Error>This is the error text</F.Error>
        </HdsFormTextInputField>
      </:theming>
      <:reference>
        <cds-text-input
          type="text"
          size="md"
          label="This is the label text"
          value="Lorem ipsum dolor"
          invalid="true"
          invalid-text="This is the error text"
        ></cds-text-input>
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid
      @label="Label + Helper text + Error"
      @hideThemeLabels={{true}}
      @hideCarbonLabels={{true}}
    >
      <:theming>
        <HdsFormTextInputField
          @value="Lorem ipsum dolor"
          @isInvalid={{true}}
          as |F|
        >
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.Error as |E|>
            <E.Message>First error message</E.Message>
            <E.Message>Second error message</E.Message>
          </F.Error>
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

    <ShwCarbonizationComparisonGrid @label="Label + Character count">
      <:theming>
        <CodeFragmentWithCharacterCount
          @maxLength={{40}}
          @value="Lorem ipsum dolor"
        />
      </:theming>
      <:reference>
        <cds-text-input
          type="text"
          size="md"
          label="This is the label text"
          value="Lorem ipsum dolor"
          enable-counter="true"
          max-count="40"
        ></cds-text-input>
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid
      @label="Label + Helper text + Character count"
      @hideThemeLabels={{true}}
      @hideCarbonLabels={{true}}
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

    <ShwTextH3>Required and optional</ShwTextH3>

    <ShwCarbonizationComparisonGrid @label="Label + Required">
      <:theming>
        <HdsFormTextInputField
          @value="Lorem ipsum dolor"
          @isRequired={{true}}
          as |F|
        >
          <F.Label>Label text</F.Label>
        </HdsFormTextInputField>
      </:theming>
      <:reference>
        <cds-text-input
          type="text"
          size="md"
          label="Label text"
          value="Lorem ipsum dolor"
          required="true"
        ></cds-text-input>
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid
      @label="Label + Optional"
      @hideThemeLabels={{true}}
      @hideCarbonLabels={{true}}
    >
      <:theming>
        <HdsFormTextInputField
          @value="Lorem ipsum dolor"
          @isOptional={{true}}
          as |F|
        >
          <F.Label>Label text</F.Label>
        </HdsFormTextInputField>
      </:theming>
      <:reference>
        There's no equivalent in Carbon
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
    <ShwCarbonizationComparisonGrid
      @label="Disabled"
      @hideThemeLabels={{true}}
      @hideCarbonLabels={{true}}
    >
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
