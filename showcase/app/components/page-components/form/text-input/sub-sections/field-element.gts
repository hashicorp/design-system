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
        <HdsFormTextInputField @type={{type}} @value={{type}}>
          <:label>This is the label text</:label>
        </HdsFormTextInputField>
      </SG.Item>
    {{/each}}
    <SG.Item @label="Search (loading state)">
      <HdsFormTextInputField @type="search" @value="search" @isLoading={{true}}>
        <:label>This is the label text</:label>
      </HdsFormTextInputField>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Content</ShwTextH3>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item @label="Only label">
      <HdsFormTextInputField @value="Lorem ipsum dolor">
        <:label>This is the label text</:label>
      </HdsFormTextInputField>
    </SG.Item>
    <SG.Item @label="Label + Helper text">
      <HdsFormTextInputField @value="Lorem ipsum dolor">
        <:label>This is the label text</:label>
        <:helperText>This is the helper text</:helperText>
      </HdsFormTextInputField>
    </SG.Item>
    <SG.Item @label="Label + Helper text with link">
      <HdsFormTextInputField @value="Lorem ipsum dolor">
        <:label>This is the label text</:label>
        <:helperText>This is the helper text
          <HdsLinkInline @route="index">with a link</HdsLinkInline></:helperText>
      </HdsFormTextInputField>
    </SG.Item>
    <SG.Item @label="Label + Error">
      <HdsFormTextInputField @value="Lorem ipsum dolor" @isInvalid={{true}}>
        <:label>This is the label</:label>
        <:error>This is the error</:error>
      </HdsFormTextInputField>
    </SG.Item>
    <SG.Item @label="Label + Helper text + Error">
      <HdsFormTextInputField @value="Lorem ipsum dolor" @isInvalid={{true}}>
        <:label>This is the label</:label>
        <:helperText>This is the helper text</:helperText>
        <:error>This is the error</:error>
      </HdsFormTextInputField>
    </SG.Item>
    {{!-- TODO: new HdsFormTextInputField API only supports a single ":error"
      named block. Multiple errors via "<F.Error as |E|><E.Message />" are not
      currently supported. Restore this demo when multi-message error support is
      reintroduced.

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
    --}}
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
    {{!-- TODO: new HdsFormTextInputField API renders the character count
      internally via @enableCounter and @maxCount args. The custom
      ":characterCount" block (with currentLength / maxLength yielded values)
      is no longer supported. Restore this demo when custom character-count
      rendering is reintroduced.

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
    --}}
    <SG.Item @label="Label + Helper text + Character count">
      <CodeFragmentWithCharacterCount
        @maxLength={{20}}
        @value="Lorem ipsum dolor sit amet"
        @hasValidation={{true}}
      />
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  {{!-- TODO: new HdsFormTextInputField does not currently wire through
    @isRequired / @isOptional in its template. Restore when supported.

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
  --}}

  <ShwTextH3>States</ShwTextH3>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item @label="Readonly">
      <HdsFormTextInputField @value="Lorem ipsum dolor" readonly={{true}}>
        <:label>This is the label text</:label>
        <:helperText>This is the helper text</:helperText>
      </HdsFormTextInputField>
    </SG.Item>
    <SG.Item @label="Disabled">
      <HdsFormTextInputField @value="Lorem ipsum dolor" disabled={{true}}>
        <:label>This is the label text</:label>
        <:helperText>This is the helper text</:helperText>
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
              <HdsFormTextInputField @value="Default width">
                <:label>This is the label</:label>
                <:helperText>This is the helper text</:helperText>
              </HdsFormTextInputField>
            </SF.Item>
            <SF.Item @grow={{true}} {{style display=display}}>
              <HdsFormTextInputField
                @value="Custom width"
                @width="120px"
                @isInvalid={{true}}
              >
                <:label>This is the label text that should go on multiple lines</:label>
                <:helperText>This is the helper text that should go on multiple
                  lines</:helperText>
                <:error>This is the error text</:error>
                {{! TODO: multi-message <F.Error as |E|><E.Message /> not
                  supported in the new API. }}
              </HdsFormTextInputField>
            </SF.Item>
            <SF.Item @grow={{true}} {{style display=display}}>
              <HdsFormTextInputField
                @value="password"
                @width="120px"
                @type="password"
                @isInvalid={{true}}
              >
                <:label>Custom width on password input</:label>
                <:helperText>This is the helper text that should go on multiple
                  lines</:helperText>
                <:error>This is the error text</:error>
                {{! TODO: multi-message <F.Error as |E|><E.Message /> not
                  supported in the new API. }}
              </HdsFormTextInputField>
            </SF.Item>
          </ShwFlex>
        </SG.Item>
      {{/each}}
    {{/let}}
  </ShwGrid>
</template>;

export default SubSectionFieldElement;
