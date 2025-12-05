/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';
import { array } from '@ember/helper';
import style from 'ember-style-modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwDivider from 'showcase/components/shw/divider';

import {
  HdsFormTextInputField,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';
import { TYPES } from '@hashicorp/design-system-components/components/hds/form/text-input/base';

import CodeFragmentWithCharacterCount from 'showcase/components/page-components/form/text-input/code-fragments/with-character-count';

const SubSectionFieldElement: TemplateOnlyComponent = <template>
  <ShwTextH2>"Field" control</ShwTextH2>

  <ShwTextH3>Types (native)</ShwTextH3>

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

  <ShwDivider @level={{2}} />

  <ShwTextH3>Content</ShwTextH3>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item @label="Only label">
      <HdsFormTextInputField @value="Lorem ipsum dolor" as |F|>
        <F.Label>This is the label text</F.Label>
      </HdsFormTextInputField>
    </SG.Item>
    <SG.Item @label="Label + Helper text">
      <HdsFormTextInputField @value="Lorem ipsum dolor" as |F|>
        <F.Label>This is the label text</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
      </HdsFormTextInputField>
    </SG.Item>
    <SG.Item @label="Label + Helper text with link">
      <HdsFormTextInputField @value="Lorem ipsum dolor" as |F|>
        <F.Label>This is the label text</F.Label>
        <F.HelperText>This is the helper text
          <HdsLinkInline @route="index">with a link</HdsLinkInline></F.HelperText>
      </HdsFormTextInputField>
    </SG.Item>
    <SG.Item @label="Label + Error">
      <HdsFormTextInputField
        @value="Lorem ipsum dolor"
        @isInvalid={{true}}
        as |F|
      >
        <F.Label>This is the label</F.Label>
        <F.Error>This is the error</F.Error>
      </HdsFormTextInputField>
    </SG.Item>
    <SG.Item @label="Label + Helper text + Error">
      <HdsFormTextInputField
        @value="Lorem ipsum dolor"
        @isInvalid={{true}}
        as |F|
      >
        <F.Label>This is the label</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
        <F.Error>This is the error</F.Error>
      </HdsFormTextInputField>
    </SG.Item>
    <SG.Item @label="Label + Helper text + Errors">
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
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Character count</ShwTextH3>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item @label="Label + Character count">
      <CodeFragmentWithCharacterCount
        @maxLength={{40}}
        @value="Lorem ipsum dolor"
      />
    </SG.Item>
    <SG.Item @label="Label + Helper text + Character count (custom)">
      <CodeFragmentWithCharacterCount
        @maxLength={{40}}
        @value="Lorem ipsum dolor"
        @hasHelperText={{true}}
      >
        <:characterCount as |CC|>
          Entered
          {{CC.currentLength}}
          out of
          {{CC.maxLength}}
          characters
        </:characterCount>
      </CodeFragmentWithCharacterCount>
    </SG.Item>
    <SG.Item @label="Label + Helper text + Character count">
      <CodeFragmentWithCharacterCount
        @maxLength={{20}}
        @value="Lorem ipsum dolor sit amet"
        @hasValidation={{true}}
      />
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Required and optional</ShwTextH3>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item @label="Label + Required">
      <HdsFormTextInputField
        @value="Lorem ipsum dolor"
        @isRequired={{true}}
        as |F|
      >
        <F.Label>This is the label text</F.Label>
      </HdsFormTextInputField>
    </SG.Item>
    <SG.Item @label="Label + Optional">
      <br />
      <HdsFormTextInputField
        @value="Lorem ipsum dolor"
        @isOptional={{true}}
        as |F|
      >
        <F.Label>This is the label text</F.Label>
      </HdsFormTextInputField>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>States</ShwTextH3>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item @label="Readonly">
      <HdsFormTextInputField
        @value="Lorem ipsum dolor"
        readonly={{true}}
        as |F|
      >
        <F.Label>This is the label text</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
      </HdsFormTextInputField>
    </SG.Item>
    <SG.Item @label="Disabled">
      <HdsFormTextInputField
        @value="Lorem ipsum dolor"
        disabled={{true}}
        as |F|
      >
        <F.Label>This is the label text</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
      </HdsFormTextInputField>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Containers</ShwTextH3>

  <ShwGrid @columns={{3}} as |SG|>
    {{#let (array "block" "flex" "grid") as |displays|}}
      {{#each displays as |display|}}
        <SG.Item as |SGI|>
          <SGI.Label>Parent with
            <code>display: {{display}}</code></SGI.Label>
          <ShwFlex as |SF|>
            <SF.Item @grow={{true}} {{style display=display}}>
              <HdsFormTextInputField @value="Default width" as |F|>
                <F.Label>This is the label</F.Label>
                <F.HelperText>This is the helper text</F.HelperText>
              </HdsFormTextInputField>
            </SF.Item>
            <SF.Item @grow={{true}} {{style display=display}}>
              <HdsFormTextInputField
                @value="Custom width"
                @width="120px"
                @isInvalid={{true}}
                as |F|
              >
                <F.Label>This is the label text that should go on multiple lines</F.Label>
                <F.HelperText>This is the helper text that should go on multiple
                  lines</F.HelperText>
                <F.Error as |E|>
                  <E.Message>This is the first error text</E.Message>
                  <E.Message>This is the second error text that should go on
                    multiple lines</E.Message>
                </F.Error>
              </HdsFormTextInputField>
            </SF.Item>
            <SF.Item @grow={{true}} {{style display=display}}>
              <HdsFormTextInputField
                @value="password"
                @width="120px"
                @type="password"
                @isInvalid={{true}}
                as |F|
              >
                <F.Label>Custom width on password input</F.Label>
                <F.HelperText>This is the helper text that should go on multiple
                  lines</F.HelperText>
                <F.Error as |E|>
                  <E.Message>This is the first error text</E.Message>
                  <E.Message>This is the second error text that should go on
                    multiple lines</E.Message>
                </F.Error>
              </HdsFormTextInputField>
            </SF.Item>
          </ShwFlex>
        </SG.Item>
      {{/each}}
    {{/let}}
  </ShwGrid>
</template>;

export default SubSectionFieldElement;
