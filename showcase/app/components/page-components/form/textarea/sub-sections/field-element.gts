/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array } from '@ember/helper';
import style from 'ember-style-modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwDivider from 'showcase/components/shw/divider';

import {
  HdsFormTextareaField,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

import CodeFragmentWithCharacterCount from 'showcase/components/page-components/form/textarea/code-fragments/with-character-count';

const SubSectionFieldElement: TemplateOnlyComponent = <template>
  <ShwTextH2>"Field" control</ShwTextH2>

  <ShwTextH3>Content</ShwTextH3>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item @label="Only label">
      <HdsFormTextareaField
        @value="Ut enim ad minim veniam, quis nostrud exercitation ullamco"
        as |F|
      >
        <F.Label>This is the label text</F.Label>
      </HdsFormTextareaField>
    </SG.Item>
    <SG.Item @label="Label + Helper text">
      <HdsFormTextareaField
        @value="Ut enim ad minim veniam, quis nostrud exercitation ullamco"
        as |F|
      >
        <F.Label>This is the label text</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
      </HdsFormTextareaField>
    </SG.Item>
    <SG.Item @label="Label + Helper text with link">
      <HdsFormTextareaField
        @value="Ut enim ad minim veniam, quis nostrud exercitation ullamco"
        as |F|
      >
        <F.Label>This is the label text</F.Label>
        <F.HelperText>This is the helper text
          <HdsLinkInline @route="index">with a link</HdsLinkInline></F.HelperText>
      </HdsFormTextareaField>
    </SG.Item>
    <SG.Item @label="Label + Error">
      <HdsFormTextareaField
        @value="Ut enim ad minim veniam, quis nostrud exercitation ullamco"
        @isInvalid={{true}}
        as |F|
      >
        <F.Label>This is the label</F.Label>
        <F.Error>This is the error</F.Error>
      </HdsFormTextareaField>
    </SG.Item>
    <SG.Item @label="Label + Helper text + Error">
      <HdsFormTextareaField
        @value="Ut enim ad minim veniam, quis nostrud exercitation ullamco"
        @isInvalid={{true}}
        as |F|
      >
        <F.Label>This is the label</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
        <F.Error>This is the error</F.Error>
      </HdsFormTextareaField>
    </SG.Item>
    <SG.Item @label="Label + Helper text + Errors">
      <HdsFormTextareaField @isInvalid={{true}} as |F|>
        <F.Label>This is the label</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
        <F.Error as |E|>
          <E.Message>First error message</E.Message>
          <E.Message>Second error message</E.Message>
        </F.Error>
      </HdsFormTextareaField>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Character count</ShwTextH3>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item @label="Label + Character count">
      <CodeFragmentWithCharacterCount
        @maxLength={{100}}
        @value="Ut enim ad minim veniam, quis nostrud exercitation ullamco"
      />
    </SG.Item>
    <SG.Item @label="Label + Helper text + Character count (custom)">
      <CodeFragmentWithCharacterCount
        @maxLength={{100}}
        @hasHelperText={{true}}
        @value="Ut enim ad minim veniam, quis nostrud exercitation ullamco"
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
    <SG.Item @label="Label + Character count + Error">
      <CodeFragmentWithCharacterCount
        @maxLength={{50}}
        @value="Ut enim ad minim veniam, quis nostrud exercitation ullamco"
        @hasValidation={{true}}
      />
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Required and optional</ShwTextH3>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item @label="Label + Required">
      <HdsFormTextareaField
        @value="Ut enim ad minim veniam, quis nostrud exercitation ullamco"
        @isRequired={{true}}
        as |F|
      >
        <F.Label>This is the label text</F.Label>
      </HdsFormTextareaField>
    </SG.Item>
    <SG.Item @label="Label + Optional">
      <HdsFormTextareaField
        @value="Ut enim ad minim veniam, quis nostrud exercitation ullamco"
        @isOptional={{true}}
        as |F|
      >
        <F.Label>This is the label text</F.Label>
      </HdsFormTextareaField>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>States</ShwTextH3>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item @label="Readonly">
      <HdsFormTextareaField @value="Lorem ipsum dolor" readonly={{true}} as |F|>
        <F.Label>This is the label text</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
      </HdsFormTextareaField>
    </SG.Item>
    <SG.Item @label="Disabled">
      <HdsFormTextareaField @value="Lorem ipsum dolor" disabled={{true}} as |F|>
        <F.Label>This is the label text</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
      </HdsFormTextareaField>
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
              <HdsFormTextareaField
                @value="Default width"
                @isInvalid={{true}}
                as |F|
              >
                <F.Label>This is the label</F.Label>
                <F.HelperText>This is the helper text</F.HelperText>
                <F.Error>This is the error</F.Error>
              </HdsFormTextareaField>
            </SF.Item>
            <SF.Item @grow={{true}} {{style display=display}}>
              <HdsFormTextareaField
                @value="Custom width and height"
                @width="248px"
                @height="150px"
                @isInvalid={{true}}
                as |F|
              >
                <F.Label>This is the label</F.Label>
                <F.HelperText>This is the helper text</F.HelperText>
                <F.Error>This is the error</F.Error>
              </HdsFormTextareaField>
            </SF.Item>
          </ShwFlex>
        </SG.Item>
      {{/each}}
    {{/let}}
  </ShwGrid>
</template>;

export default SubSectionFieldElement;
