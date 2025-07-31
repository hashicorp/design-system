// Copyright (c) HashiCorp, Inc.
// SPDX-License-Identifier: MPL-2.0

import Component from '@glimmer/component';
import { array, fn } from '@ember/helper';
import { pageTitle } from 'ember-page-title';
import style from 'ember-style-modifier';
import { tracked } from '@glimmer/tracking';
import { deepTracked } from 'ember-deep-tracked';
import { on } from '@ember/modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';

import {
  HdsFormMaskedInputBase,
  HdsFormMaskedInputField,
  HdsFormCheckboxField,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

import MaskedInputStates from 'showcase/components/page-components/form/masked-input/masked-input-states';

export interface PageComponentMaskedInputSignature {
  Element: HTMLElement;
}

export default class PageComponentMaskedInput extends Component<PageComponentMaskedInputSignature> {
  @deepTracked fieldValues = {
    defaultText: 'Lorem ipsum dolor',
    customText: 'Lorem ipsum dolor',
    withErrorMessage: 'Lorem ipsum dolor sit amet',
    multilineDefaultText: 'Lorem ipsum dolor',
    multilineCustomText: 'Lorem ipsum dolor',
    multilineWithErrorMessage: 'Lorem ipsum dolor sit amet',
  };

  @tracked isContentMasked = true;

  multilineText1 = 'Lorem\nipsum\ndolor';
  multilineText2 = `Lorem
ipsum
dolor`;
  maxLength = 20;

  get textInputFieldIsInvalid() {
    return this.fieldValues.withErrorMessage.length > this.maxLength;
  }

  get textareaFieldIsInvalid() {
    return this.fieldValues.multilineWithErrorMessage.length > this.maxLength;
  }

  updateValue = (propName: keyof typeof this.fieldValues, event: Event) => {
    const { value } = event.target as HTMLInputElement;
    this.fieldValues[propName] = value;
  };

  updateIsMasked = () => {
    this.isContentMasked = !this.isContentMasked;
  };

  <template>
    {{pageTitle "MaskedInput Component"}}

    <ShwTextH1>MaskedInput</ShwTextH1>

    <section data-test-percy>

      <ShwTextH2>"Base" control</ShwTextH2>

      <ShwTextH3>Interaction status</ShwTextH3>

      <ShwTextH4>Single line</ShwTextH4>

      <ShwFlex as |SF|>
        <SF.Item @label="Default">
          <HdsFormMaskedInputBase aria-label="Default" />
        </SF.Item>

        <SF.Item @label="With placeholder">
          <HdsFormMaskedInputBase
            placeholder="Lorem ipsum dolor"
            aria-label="Placeholder"
          />
        </SF.Item>
        <SF.Item @label="With value (masked)">
          <HdsFormMaskedInputBase
            @value="Lorem ipsum dolor"
            aria-label="Value (masked)"
          />
        </SF.Item>

        <SF.Item @label="With value (in clear)">
          <HdsFormMaskedInputBase
            @isContentMasked={{false}}
            @value="Lorem ipsum dolor"
            aria-label="Value (in clear)"
          />
        </SF.Item>

        <SF.Item @label="With multiline value (inline \n)">
          <HdsFormMaskedInputBase
            @isContentMasked={{false}}
            @value={{this.multilineText1}}
            aria-label="Multiline value (inline)"
          />
        </SF.Item>
        <SF.Item @label="With multiline value (template literal)">
          <HdsFormMaskedInputBase
            @isContentMasked={{false}}
            @value={{this.multilineText2}}
            aria-label="Multiline value (template)"
          />
        </SF.Item>

      </ShwFlex>

      <ShwTextH4>Multiline</ShwTextH4>

      <ShwFlex as |SF|>
        <SF.Item @label="Default">
          <HdsFormMaskedInputBase
            @isMultiline={{true}}
            aria-label="Multiline default"
          />
        </SF.Item>
        <SF.Item @label="With placeholder">
          <HdsFormMaskedInputBase
            @isMultiline={{true}}
            placeholder="Lorem ipsum dolor"
            aria-label="Multiline placeholder"
          />
        </SF.Item>
        <SF.Item @label="With value (masked)">
          <HdsFormMaskedInputBase
            @isMultiline={{true}}
            @value="Lorem ipsum dolor"
            aria-label="Multiline value (masked)"
          />
        </SF.Item>
        <SF.Item @label="With value (in clear)">
          <HdsFormMaskedInputBase
            @isMultiline={{true}}
            @isContentMasked={{false}}
            @value="Lorem ipsum dolor"
            aria-label="Multiline value (in clear)"
          />
        </SF.Item>
        <SF.Item @label="With multiline value (inline \n)">
          <HdsFormMaskedInputBase
            @isMultiline={{true}}
            @isContentMasked={{false}}
            @value={{this.multilineText1}}
            aria-label="Mutltiline value (inline)"
          />
        </SF.Item>
        <SF.Item @label="With multiline value (template literal)">
          <HdsFormMaskedInputBase
            @isMultiline={{true}}
            @isContentMasked={{false}}
            @value={{this.multilineText2}}
            aria-label="Multiline value (template)"
          />
        </SF.Item>
        <SF.Item @label="With long wrapping text (masked)">
          <HdsFormMaskedInputBase
            @isMultiline={{true}}
            @value="Lorem ipsum odor amet, consectetuer adipiscing elit. Feugiat sed felis dictum taciti arcu senectus! Nulla mauris sollicitudin venenatis et leo; tortor facilisi penatibus. Tempor efficitur suspendisse sollicitudin netus sollicitudin sagittis euismod accumsan habitasse. Fusce nibh malesuada neque elementum venenatis risus platea montes. Risus vivamus maecenas hendrerit eu in ante potenti odio. Ex tellus cubilia fringilla condimentum velit; euismod dui. Ultricies lobortis senectus dis ut purus."
            aria-label="Multiline long wrapping text (masked)"
          />
        </SF.Item>
        <SF.Item @label="With long wrapping text (in clear)">
          <HdsFormMaskedInputBase
            @isMultiline={{true}}
            @isContentMasked={{false}}
            @value="Lorem ipsum odor amet, consectetuer adipiscing elit. Feugiat sed felis dictum taciti arcu senectus! Nulla mauris sollicitudin venenatis et leo; tortor facilisi penatibus. Tempor efficitur suspendisse sollicitudin netus sollicitudin sagittis euismod accumsan habitasse. Fusce nibh malesuada neque elementum venenatis risus platea montes. Risus vivamus maecenas hendrerit eu in ante potenti odio. Ex tellus cubilia fringilla condimentum velit; euismod dui. Ultricies lobortis senectus dis ut purus."
            aria-label="Multiline long wrapping text (in clear)"
          />
        </SF.Item>
      </ShwFlex>

      <ShwDivider @level={{2}} />

      <ShwTextH3>States</ShwTextH3>

      <ShwTextH4>Single line</ShwTextH4>

      <MaskedInputStates />

      <ShwTextH4>Multiline</ShwTextH4>

      <MaskedInputStates @isMultiline={{true}} />

      <ShwDivider @level={{2}} />

      <ShwTextH3>Copy button</ShwTextH3>

      <ShwTextH4>Single line</ShwTextH4>

      <MaskedInputStates @hasCopyButton={{true}} />

      <ShwTextH4>Multiline</ShwTextH4>

      <MaskedInputStates @hasCopyButton={{true}} @isMultiline={{true}} />

      <ShwDivider @level={{2}} />

      <ShwTextH3>Externally controlled</ShwTextH3>

      <ShwFlex as |SF|>
        <SF.Item>
          <div class="shw-component-form-masked-input-controls">
            <HdsFormCheckboxField
              name="toggle-visibility"
              checked={{this.isContentMasked}}
              {{on "change" this.updateIsMasked}}
              as |F|
            >
              <F.Label>Content masking:
                {{if this.isContentMasked "Enabled" "Disabled"}}</F.Label>
            </HdsFormCheckboxField>
          </div>
          <HdsFormMaskedInputBase
            @isContentMasked={{this.isContentMasked}}
            @value="Lorem ipsum dolor"
            aria-label="Externally controlled"
          />
        </SF.Item>
      </ShwFlex>

      <ShwDivider />

      <ShwTextH2>"Field" control</ShwTextH2>

      <ShwTextH3>Content</ShwTextH3>

      <ShwTextH4>Single line</ShwTextH4>

      <ShwGrid @columns={{3}} as |SG|>
        <SG.Item @label="Only label">
          <HdsFormMaskedInputField @value="Lorem ipsum dolor" as |F|>
            <F.Label>This is the label text</F.Label>
          </HdsFormMaskedInputField>
        </SG.Item>
        <SG.Item @label="Label + Helper text">
          <HdsFormMaskedInputField @value="Lorem ipsum dolor" as |F|>
            <F.Label>This is the label text</F.Label>
            <F.HelperText>This is the helper text</F.HelperText>
          </HdsFormMaskedInputField>
        </SG.Item>
        <SG.Item @label="Label + Helper text with link">
          <HdsFormMaskedInputField @value="Lorem ipsum dolor" as |F|>
            <F.Label>This is the label text</F.Label>
            <F.HelperText>This is the helper text
              <HdsLinkInline @route="index">with a link</HdsLinkInline></F.HelperText>
          </HdsFormMaskedInputField>
        </SG.Item>
        <SG.Item @label="Label + Helper text + Copy Button + Error">
          <HdsFormMaskedInputField
            @value="Lorem ipsum dolor"
            @isInvalid={{true}}
            @hasCopyButton={{true}}
            as |F|
          >
            <F.Label>This is the label</F.Label>
            <F.HelperText>This is the helper text</F.HelperText>
            <F.Error>This is the error</F.Error>
          </HdsFormMaskedInputField>
        </SG.Item>
        <SG.Item @label="Label + Error">
          <HdsFormMaskedInputField
            @value="Lorem ipsum dolor"
            @isInvalid={{true}}
            as |F|
          >
            <F.Label>This is the label</F.Label>
            <F.Error>This is the error</F.Error>
          </HdsFormMaskedInputField>
        </SG.Item>
        <SG.Item @label="Label + Helper text + Error">
          <HdsFormMaskedInputField
            @value="Lorem ipsum dolor"
            @isInvalid={{true}}
            as |F|
          >
            <F.Label>This is the label</F.Label>
            <F.HelperText>This is the helper text</F.HelperText>
            <F.Error>This is the error</F.Error>
          </HdsFormMaskedInputField>
        </SG.Item>
        <SG.Item @label="Label + Helper text + Errors">
          <HdsFormMaskedInputField
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
          </HdsFormMaskedInputField>
        </SG.Item>
      </ShwGrid>

      <ShwTextH4>Multiline</ShwTextH4>

      <ShwGrid @columns={{3}} as |SG|>
        <SG.Item @label="Only label">
          <HdsFormMaskedInputField
            @isMultiline={{true}}
            @value="Lorem ipsum dolor"
            as |F|
          >
            <F.Label>This is the label text</F.Label>
          </HdsFormMaskedInputField>
        </SG.Item>
        <SG.Item @label="Label + Helper text">
          <HdsFormMaskedInputField
            @isMultiline={{true}}
            @value="Lorem ipsum dolor"
            as |F|
          >
            <F.Label>This is the label text</F.Label>
            <F.HelperText>This is the helper text</F.HelperText>
          </HdsFormMaskedInputField>
        </SG.Item>
        <SG.Item @label="Label + Helper text link">
          <HdsFormMaskedInputField
            @isMultiline={{true}}
            @value="Lorem ipsum dolor"
            as |F|
          >
            <F.Label>This is the label text</F.Label>
            <F.HelperText>This is the helper text with a
              <HdsLinkInline @href="#">link</HdsLinkInline></F.HelperText>
          </HdsFormMaskedInputField>
        </SG.Item>
        <SG.Item @label="Label + Helper text + Copy Button + Error">
          <HdsFormMaskedInputField
            @isMultiline={{true}}
            @value="Lorem ipsum dolor"
            @isInvalid={{true}}
            @hasCopyButton={{true}}
            as |F|
          >
            <F.Label>This is the label</F.Label>
            <F.HelperText>This is the helper text</F.HelperText>
            <F.Error>This is the error</F.Error>
          </HdsFormMaskedInputField>
        </SG.Item>
        <SG.Item @label="Label + Error">
          <HdsFormMaskedInputField
            @isMultiline={{true}}
            @value="Lorem ipsum dolor"
            @isInvalid={{true}}
            as |F|
          >
            <F.Label>This is the label</F.Label>
            <F.Error>This is the error</F.Error>
          </HdsFormMaskedInputField>
        </SG.Item>
        <SG.Item @label="Label + Helper text + Error">
          <HdsFormMaskedInputField
            @isMultiline={{true}}
            @value="Lorem ipsum dolor"
            @isInvalid={{true}}
            as |F|
          >
            <F.Label>This is the label</F.Label>
            <F.HelperText>This is the helper text</F.HelperText>
            <F.Error>This is the error</F.Error>
          </HdsFormMaskedInputField>
        </SG.Item>
        <SG.Item @label="Label + Helper text + Errors">
          <HdsFormMaskedInputField
            @isMultiline={{true}}
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
          </HdsFormMaskedInputField>
        </SG.Item>
      </ShwGrid>

      <ShwDivider @level={{2}} />

      <ShwTextH3>Character count</ShwTextH3>

      <ShwTextH4>Single line</ShwTextH4>

      <ShwGrid @columns={{3}} as |SG|>
        <SG.Item @label="Label + Character count">
          <HdsFormMaskedInputField
            @value={{this.fieldValues.defaultText}}
            {{on "input" (fn this.updateValue "defaultText")}}
            as |F|
          >
            <F.Label>This is the label text</F.Label>
            <F.CharacterCount @maxLength={{100}} />
          </HdsFormMaskedInputField>
        </SG.Item>
        <SG.Item @label="Label + Helper text + Character count (custom)">
          <HdsFormMaskedInputField
            @value={{this.fieldValues.customText}}
            {{on "input" (fn this.updateValue "customText")}}
            as |F|
          >
            <F.Label>This is the label text</F.Label>
            <F.HelperText>This is the helper text</F.HelperText>
            <F.CharacterCount @maxLength={{100}} as |CC|>
              Entered
              {{CC.currentLength}}
              out of
              {{CC.maxLength}}
              characters
            </F.CharacterCount>
          </HdsFormMaskedInputField>
        </SG.Item>
        <SG.Item @label="Label + Copy Button + Character count + Error">
          <HdsFormMaskedInputField
            @value={{this.fieldValues.withErrorMessage}}
            @isInvalid={{this.textInputFieldIsInvalid}}
            @hasCopyButton={{true}}
            {{on "input" (fn this.updateValue "withErrorMessage")}}
            as |F|
          >
            <F.Label>This is the label text</F.Label>
            <F.CharacterCount @maxLength={{this.maxLength}} />
            {{#if this.textInputFieldIsInvalid}}
              <F.Error>Maximum numbers of characters exceeded</F.Error>
            {{/if}}
          </HdsFormMaskedInputField>
        </SG.Item>
      </ShwGrid>

      <ShwTextH4>Multiline</ShwTextH4>

      <ShwGrid @columns={{3}} as |SG|>
        <SG.Item @label="Label + Character count">
          <HdsFormMaskedInputField
            @isMultiline={{true}}
            @value={{this.fieldValues.multilineDefaultText}}
            {{on "input" (fn this.updateValue "multilineDefaultText")}}
            as |F|
          >
            <F.Label>This is the label text</F.Label>
            <F.CharacterCount @maxLength={{100}} />
          </HdsFormMaskedInputField>
        </SG.Item>
        <SG.Item @label="Label + Helper text + Character count (custom)">
          <HdsFormMaskedInputField
            @isMultiline={{true}}
            @value={{this.fieldValues.multilineCustomText}}
            {{on "input" (fn this.updateValue "multilineCustomText")}}
            as |F|
          >
            <F.Label>This is the label text</F.Label>
            <F.HelperText>This is the helper text</F.HelperText>
            <F.CharacterCount @maxLength={{100}} as |CC|>
              Entered
              {{CC.currentLength}}
              out of
              {{CC.maxLength}}
              characters
            </F.CharacterCount>
          </HdsFormMaskedInputField>
        </SG.Item>
        <SG.Item @label="Label + Copy Button + Character count + Error">
          <HdsFormMaskedInputField
            @isMultiline={{true}}
            @value={{this.fieldValues.multilineWithErrorMessage}}
            @isInvalid={{this.textareaFieldIsInvalid}}
            @hasCopyButton={{true}}
            {{on "input" (fn this.updateValue "multilineWithErrorMessage")}}
            as |F|
          >
            <F.Label>This is the label text</F.Label>
            <F.CharacterCount @maxLength={{this.maxLength}} />
            {{#if this.textareaFieldIsInvalid}}
              <F.Error>Maximum numbers of characters exceeded</F.Error>
            {{/if}}
          </HdsFormMaskedInputField>
        </SG.Item>
      </ShwGrid>

      <ShwDivider @level={{2}} />

      <ShwTextH3>Required and optional</ShwTextH3>

      <ShwTextH4>Single line</ShwTextH4>

      <ShwGrid @columns={{3}} as |SG|>
        <SG.Item @label="Label + Required">
          <HdsFormMaskedInputField
            @value="Lorem ipsum dolor"
            @isRequired={{true}}
            as |F|
          >
            <F.Label>This is the label text</F.Label>
          </HdsFormMaskedInputField>
        </SG.Item>
        <SG.Item @label="Label + Optional">
          <HdsFormMaskedInputField
            @value="Lorem ipsum dolor"
            @isOptional={{true}}
            as |F|
          >
            <F.Label>This is the label text</F.Label>
          </HdsFormMaskedInputField>
        </SG.Item>
      </ShwGrid>

      <ShwTextH4>Multiline</ShwTextH4>

      <ShwGrid @columns={{3}} as |SG|>
        <SG.Item @label="Label + Required">
          <HdsFormMaskedInputField
            @isMultiline={{true}}
            @value="Lorem ipsum dolor"
            @isRequired={{true}}
            as |F|
          >
            <F.Label>This is the label text</F.Label>
          </HdsFormMaskedInputField>
        </SG.Item>
        <SG.Item @label="Label + Optional">
          <HdsFormMaskedInputField
            @isMultiline={{true}}
            @value="Lorem ipsum dolor"
            @isOptional={{true}}
            as |F|
          >
            <F.Label>This is the label text</F.Label>
          </HdsFormMaskedInputField>
        </SG.Item>
      </ShwGrid>

      <ShwDivider @level={{2}} />

      <ShwTextH3>States</ShwTextH3>

      <ShwTextH4>Single line</ShwTextH4>

      <ShwGrid @columns={{3}} as |SG|>
        <SG.Item @label="Readonly Optional">
          <HdsFormMaskedInputField
            @value="Lorem ipsum dolor"
            readonly={{true}}
            as |F|
          >
            <F.Label>This is the label text</F.Label>
          </HdsFormMaskedInputField>
        </SG.Item>
        <SG.Item @label="Disabled">
          <HdsFormMaskedInputField
            @value="Lorem ipsum dolor"
            disabled={{true}}
            as |F|
          >
            <F.Label>This is the label text</F.Label>
          </HdsFormMaskedInputField>
        </SG.Item>
      </ShwGrid>

      <ShwTextH4>Multiline</ShwTextH4>

      <ShwGrid @columns={{3}} as |SG|>
        <SG.Item @label="Readonly">
          <HdsFormMaskedInputField
            @isMultiline={{true}}
            @value="Lorem ipsum dolor"
            readonly={{true}}
            as |F|
          >
            <F.Label>This is the label text</F.Label>
          </HdsFormMaskedInputField>
        </SG.Item>
        <SG.Item @label="Disabled">
          <HdsFormMaskedInputField
            @isMultiline={{true}}
            @value="Lorem ipsum dolor"
            disabled={{true}}
            as |F|
          >
            <F.Label>This is the label text</F.Label>
          </HdsFormMaskedInputField>
        </SG.Item>
      </ShwGrid>

      <ShwDivider @level={{2}} />

      <ShwTextH3>Containers</ShwTextH3>

      <ShwTextH4>Single line</ShwTextH4>

      <ShwGrid @columns={{3}} as |SG|>
        {{#let (array "block" "flex" "grid") as |displays|}}
          {{#each displays as |display|}}
            <SG.Item as |SGI|>
              <SGI.Label>Parent with
                <code>display: {{display}}</code></SGI.Label>
              <ShwFlex as |SF|>
                <SF.Item @grow={{true}} {{style display=display}}>
                  <HdsFormMaskedInputField @value="Default width" as |F|>
                    <F.Label>This is the label</F.Label>
                    <F.HelperText>This is the helper text</F.HelperText>
                  </HdsFormMaskedInputField>
                </SF.Item>
                <SF.Item @grow={{true}} {{style display=display}}>
                  <HdsFormMaskedInputField
                    @value="Custom width"
                    @width="120px"
                    @isInvalid={{true}}
                    as |F|
                  >
                    <F.Label>This is the label text that should go on multiple
                      lines</F.Label>
                    <F.HelperText>This is the helper text that should go on
                      multiple lines</F.HelperText>
                    <F.Error as |E|>
                      <E.Message>This is the first error text</E.Message>
                      <E.Message>This is the second error text that should go on
                        multiple lines</E.Message>
                    </F.Error>
                  </HdsFormMaskedInputField>
                </SF.Item>
              </ShwFlex>
            </SG.Item>
          {{/each}}
        {{/let}}
      </ShwGrid>

      <ShwTextH4>Multiline</ShwTextH4>

      <ShwGrid @columns={{3}} as |SG|>
        {{#let (array "block" "flex" "grid") as |displays|}}
          {{#each displays as |display|}}
            <SG.Item as |SGI|>
              <SGI.Label>Parent with
                <code>display: {{display}}</code></SGI.Label>
              <ShwFlex as |SF|>
                <SF.Item @grow={{true}} {{style display=display}}>
                  <HdsFormMaskedInputField
                    @isMultiline={{true}}
                    @value="Default width"
                    as |F|
                  >
                    <F.Label>This is the label</F.Label>
                    <F.HelperText>This is the helper text</F.HelperText>
                  </HdsFormMaskedInputField>
                </SF.Item>
                <SF.Item @grow={{true}} {{style display=display}}>
                  <HdsFormMaskedInputField
                    @isMultiline={{true}}
                    @value="Custom width"
                    @width="120px"
                    @height="150px"
                    @isInvalid={{true}}
                    as |F|
                  >
                    <F.Label>This is the label text that should go on multiple
                      lines</F.Label>
                    <F.HelperText>This is the helper text that should go on
                      multiple lines</F.HelperText>
                    <F.Error as |E|>
                      <E.Message>This is the first error text</E.Message>
                      <E.Message>This is the second error text that should go on
                        multiple lines</E.Message>
                    </F.Error>
                  </HdsFormMaskedInputField>
                </SF.Item>
              </ShwFlex>
            </SG.Item>
          {{/each}}
        {{/let}}
      </ShwGrid>
    </section>
  </template>
}
