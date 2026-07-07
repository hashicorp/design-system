/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { array } from '@ember/helper';
import { capitalize } from '@ember/string';
import { eq, and } from 'ember-truth-helpers';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import CodeFragmentWithCharacterCount from 'showcase/components/page-components/form/textarea/code-fragments/with-character-count';

import {
  HdsFormTextareaBase,
  HdsFormTextareaField,
} from '@hashicorp/design-system-components/components';

const STATES = ['default', 'hover', 'focus'];

const FormTextareaCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Textarea - Carbonization"}}

  <ShwTextH1>Textarea - Carbonization</ShwTextH1>

  <section>
    <ShwTextH2>“Base” control</ShwTextH2>

    <ShwTextH3>Interaction status</ShwTextH3>

    <ShwCarbonizationComparisonGrid @label="Default">
      <:theming>
        <HdsFormTextareaBase aria-label="default textarea example" />
      </:theming>
      <:reference>
        <cds-textarea value=""></cds-textarea>
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid
      @label="With placeholder"
      @hideThemeLabels={{true}}
    >
      <:theming>
        <HdsFormTextareaBase
          aria-label="textarea example with placeholder"
          placeholder="Lorem ipsum dolor"
        />
      </:theming>
      <:reference>
        <cds-textarea placeholder="Lorem ipsum dolor"></cds-textarea>
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid
      @label="With value"
      @hideThemeLabels={{true}}
    >
      <:theming>
        <HdsFormTextareaBase
          aria-label="textarea example with value"
          @value="Ut enim ad minim veniam, quis nostrud exercitation ullamco"
        />
      </:theming>
      <:reference>
        <cds-textarea
          value="Ut enim ad minim veniam, quis nostrud exercitation ullamco"
        ></cds-textarea>
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
                mock-state-selector="textarea"
              >
                <:theming>
                  <ShwFlex @direction="column" as |SF|>
                    <SF.Item>
                      <HdsFormTextareaBase
                        aria-label="textarea example as {{state}}"
                        disabled={{if (eq variant "disabled") "disabled"}}
                        readonly={{if (eq variant "readonly") "readonly"}}
                        @isInvalid={{if (eq variant "invalid") true}}
                      />
                    </SF.Item>
                    <SF.Item>
                      <HdsFormTextareaBase
                        aria-label="textarea example with placeholder as {{state}}"
                        placeholder="Placeholder"
                        disabled={{if (eq variant "disabled") "disabled"}}
                        readonly={{if (eq variant "readonly") "readonly"}}
                        @isInvalid={{if (eq variant "invalid") true}}
                      />
                    </SF.Item>
                    <SF.Item>
                      <HdsFormTextareaBase
                        aria-label="textarea example with value as {{state}}"
                        @value="Ut enim ad minim veniam, quis nostrud exercitation ullamco"
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
                        <cds-textarea
                          disabled={{if (eq variant "disabled") "disabled"}}
                          readonly={{if (eq variant "readonly") "readonly"}}
                          invalid={{if (eq variant "invalid") true}}
                          invalid-text="Error message goes here"
                        ></cds-textarea>
                      </SF.Item>
                      <SF.Item>
                        <cds-textarea
                          placeholder="Placeholder"
                          disabled={{if (eq variant "disabled") "disabled"}}
                          readonly={{if (eq variant "readonly") "readonly"}}
                          invalid={{if (eq variant "invalid") true}}
                          invalid-text="Error message goes here"
                        ></cds-textarea>
                      </SF.Item>
                      <SF.Item>
                        <cds-textarea
                          value="Ut enim ad minim veniam, quis nostrud exercitation ullamco"
                          disabled={{if (eq variant "disabled") "disabled"}}
                          readonly={{if (eq variant "readonly") "readonly"}}
                          invalid={{if (eq variant "invalid") true}}
                          invalid-text="Error message goes here"
                        ></cds-textarea>
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

    <ShwTextH3>Content</ShwTextH3>

    <ShwCarbonizationComparisonGrid @label="Label + Helper text + Error">
      <:theming>
        <HdsFormTextareaField
          @value="Ut enim ad minim veniam, quis nostrud exercitation ullamco"
          @isInvalid={{true}}
          as |F|
        >
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.Error>This is the error</F.Error>
        </HdsFormTextareaField>
      </:theming>
      <:reference>
        <cds-textarea
          label="This is the label"
          helper-text="This is the helper text"
          value="Ut enim ad minim veniam, quis nostrud exercitation ullamco"
          invalid="true"
          invalid-text="This is the error"
        ></cds-textarea>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Character count</ShwTextH3>

    <ShwCarbonizationComparisonGrid @label="Label + Character count + Error">
      <:theming>
        <CodeFragmentWithCharacterCount
          @maxLength={{50}}
          @value="Ut enim ad minim veniam, quis nostrud exercitation ullamco"
          @hasValidation={{true}}
        />
      </:theming>
      <:reference>
        <cds-textarea
          label="This is the label text"
          value="Ut enim ad minim veniam, quis nostrud exercitation ullamco"
          enable-counter="true"
          max-count="50"
          invalid="true"
          invalid-text="Maximum number of characters exceeded"
        ></cds-textarea>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Required and optional</ShwTextH3>

    <ShwCarbonizationComparisonGrid @label="Required">
      <:theming>
        <HdsFormTextareaField
          @value="Ut enim ad minim veniam, quis nostrud exercitation ullamco"
          @isRequired={{true}}
          as |F|
        >
          <F.Label>This is the label text</F.Label>
        </HdsFormTextareaField>
      </:theming>
      <:reference>
        <cds-textarea
          label="This is the label text"
          value="Ut enim ad minim veniam, quis nostrud exercitation ullamco"
          required
        ></cds-textarea>
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="Optional" @hideThemeLabels={{true}}>
      <:theming>
        <HdsFormTextareaField
          @value="Ut enim ad minim veniam, quis nostrud exercitation ullamco"
          @isOptional={{true}}
          as |F|
        >
          <F.Label>This is the label text</F.Label>
        </HdsFormTextareaField>
      </:theming>
      <:reference>
        <cds-textarea
          label="This is the label text"
          value="Ut enim ad minim veniam, quis nostrud exercitation ullamco"
        ></cds-textarea>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>States</ShwTextH3>

    <ShwCarbonizationComparisonGrid @label="Readonly">
      <:theming>
        <HdsFormTextareaField
          @value="Ut enim ad minim veniam, quis nostrud exercitation ullamco"
          readonly={{true}}
          as |F|
        >
          <F.Label>This is the label text</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
        </HdsFormTextareaField>
      </:theming>
      <:reference>
        <cds-textarea
          label="This is the label text"
          helper-text="This is the helper text"
          value="Ut enim ad minim veniam, quis nostrud exercitation ullamco"
          readonly="true"
        ></cds-textarea>
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="Disabled" @hideThemeLabels={{true}}>
      <:theming>
        <HdsFormTextareaField
          @value="Ut enim ad minim veniam, quis nostrud exercitation ullamco"
          disabled={{true}}
          as |F|
        >
          <F.Label>This is the label text</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
        </HdsFormTextareaField>
      </:theming>
      <:reference>
        <cds-textarea
          label="This is the label text"
          helper-text="This is the helper text"
          value="Ut enim ad minim veniam, quis nostrud exercitation ullamco"
          disabled="true"
        ></cds-textarea>
      </:reference>
    </ShwCarbonizationComparisonGrid>
  </section>
</template>;

export default FormTextareaCarbonizationIndex;
