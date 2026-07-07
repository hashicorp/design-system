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
import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import {
  HdsFormMaskedInputBase,
  HdsFormMaskedInputField,
} from '@hashicorp/design-system-components/components';

const STATES = ['default', 'hover', 'focus'];

const FormMaskedInputCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "MaskedInput - Carbonization"}}

  <ShwTextH1>MaskedInput - Carbonization</ShwTextH1>

  <section>
    <ShwTextH2>"Base" control</ShwTextH2>

    <ShwTextH3>Interaction status</ShwTextH3>

    <ShwCarbonizationComparisonGrid @label="Default">
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <HdsFormMaskedInputBase aria-label="default masked input" />
          </SF.Item>
          <SF.Item>
            <HdsFormMaskedInputBase
              @isMultiline={{true}}
              aria-label="multiline default masked input"
            />
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference as |R|>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <cds-password-input size="md" value=""></cds-password-input>
          </SF.Item>
          <SF.Item>
            <R.NoEquivalent @isCompact={{true}} />
          </SF.Item>
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid
      @label="With value (masked)"
      @hideThemeLabels={{true}}
    >
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <HdsFormMaskedInputBase
              @value="Lorem ipsum dolor"
              aria-label="masked input with value (masked)"
            />
          </SF.Item>
          <SF.Item>
            <HdsFormMaskedInputBase
              @isMultiline={{true}}
              @value="Lorem ipsum dolor"
              aria-label="multiline masked input with value (masked)"
            />
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference as |R|>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <cds-password-input
              size="md"
              value="Lorem ipsum dolor"
            ></cds-password-input>
          </SF.Item>
          <SF.Item>
            <R.NoEquivalent @isCompact={{true}} />
          </SF.Item>
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid
      @label="With value (in clear)"
      @hideThemeLabels={{true}}
    >
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <HdsFormMaskedInputBase
              @value="Lorem ipsum dolor"
              @isContentMasked={{false}}
              aria-label="masked input with value (in clear)"
            />
          </SF.Item>
          <SF.Item>
            <HdsFormMaskedInputBase
              @isMultiline={{true}}
              @value="Lorem ipsum dolor"
              @isContentMasked={{false}}
              aria-label="multiline masked input with value (in clear)"
            />
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference as |R|>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <cds-password-input
              size="md"
              value="Lorem ipsum dolor"
              type="text"
            ></cds-password-input>
          </SF.Item>
          <SF.Item>
            <R.NoEquivalent @isCompact={{true}} />
          </SF.Item>
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid
      @label="With value + copy button (masked)"
      @hideThemeLabels={{true}}
    >
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <HdsFormMaskedInputBase
              @value="Lorem ipsum dolor"
              @hasCopyButton={{true}}
              aria-label="masked input with value and copy button (masked)"
            />
          </SF.Item>
          <SF.Item>
            <HdsFormMaskedInputBase
              @isMultiline={{true}}
              @value="Lorem ipsum dolor"
              @hasCopyButton={{true}}
              aria-label="multiline masked input with value and copy button (masked)"
            />
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference as |R|>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <cds-password-input
              size="md"
              value="Lorem ipsum dolor"
            ></cds-password-input>
          </SF.Item>
          <SF.Item>
            <R.NoEquivalent @isCompact={{true}} />
          </SF.Item>
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid
      @label="With value + copy button (in clear)"
      @hideThemeLabels={{true}}
    >
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <HdsFormMaskedInputBase
              @value="Lorem ipsum dolor"
              @isContentMasked={{false}}
              @hasCopyButton={{true}}
              aria-label="masked input with value and copy button (in clear)"
            />
          </SF.Item>
          <SF.Item>
            <HdsFormMaskedInputBase
              @isMultiline={{true}}
              @value="Lorem ipsum dolor"
              @isContentMasked={{false}}
              @hasCopyButton={{true}}
              aria-label="multiline masked input with value and copy button (in clear)"
            />
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference as |R|>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <cds-password-input
              size="md"
              value="Lorem ipsum dolor"
              type="text"
            ></cds-password-input>
          </SF.Item>
          <SF.Item>
            <R.NoEquivalent @isCompact={{true}} />
          </SF.Item>
        </ShwFlex>
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
                mock-state-selector="input, textarea"
              >
                <:theming>
                  <ShwFlex @direction="column" as |SF|>
                    <SF.Item>
                      <HdsFormMaskedInputBase
                        @value="Lorem ipsum dolor"
                        disabled={{if (eq variant "disabled") "disabled"}}
                        readonly={{if (eq variant "readonly") "readonly"}}
                        @isInvalid={{if (eq variant "invalid") true}}
                        aria-label="{{variant}} - {{state}}"
                      />
                    </SF.Item>
                    <SF.Item>
                      <HdsFormMaskedInputBase
                        @isMultiline={{true}}
                        @value="Lorem ipsum dolor"
                        disabled={{if (eq variant "disabled") "disabled"}}
                        readonly={{if (eq variant "readonly") "readonly"}}
                        @isInvalid={{if (eq variant "invalid") true}}
                        aria-label="multiline {{variant}} - {{state}}"
                      />
                    </SF.Item>
                  </ShwFlex>
                </:theming>
                <:reference as |R|>
                  {{#if (eq state "default")}}
                    <ShwFlex @direction="column" as |SF|>
                      <SF.Item>
                        <cds-password-input
                          size="md"
                          value="Lorem ipsum dolor"
                          disabled={{if (eq variant "disabled") "disabled"}}
                          readonly={{if (eq variant "readonly") "readonly"}}
                          invalid={{if (eq variant "invalid") true}}
                          invalid-text="Error message goes here"
                        ></cds-password-input>
                      </SF.Item>
                      <SF.Item>
                        <R.NoEquivalent @isCompact={{true}} />
                      </SF.Item>
                    </ShwFlex>
                  {{else}}
                    <ShwFlex @direction="column" as |SF|>
                      <SF.Item>
                        <pre>TODO: static image here</pre>
                      </SF.Item>
                      <SF.Item>
                        <R.NoEquivalent @isCompact={{true}} />
                      </SF.Item>
                    </ShwFlex>
                  {{/if}}
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

    <ShwCarbonizationComparisonGrid @label="Label + Helper text + Error">
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <HdsFormMaskedInputField
              @value="Lorem ipsum dolor"
              @isInvalid={{true}}
              as |F|
            >
              <F.Label>This is the label</F.Label>
              <F.HelperText>This is the helper text</F.HelperText>
              <F.Error>This is the error</F.Error>
            </HdsFormMaskedInputField>
          </SF.Item>
          <SF.Item>
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
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference as |R|>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <cds-password-input
              size="md"
              label-text="This is the label"
              helper-text="This is the helper text"
              value="Lorem ipsum dolor"
              invalid="true"
              invalid-text="This is the error"
            ></cds-password-input>
          </SF.Item>
          <SF.Item>
            <R.NoEquivalent @isCompact={{true}} />
          </SF.Item>
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid
      @label="Label + Helper text + Copy button + Error"
      @hideThemeLabels={{true}}
    >
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
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
          </SF.Item>
          <SF.Item>
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
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference as |R|>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <cds-password-input
              size="md"
              label-text="This is the label"
              helper-text="This is the helper text"
              value="Lorem ipsum dolor"
              invalid="true"
              invalid-text="This is the error"
            ></cds-password-input>
          </SF.Item>
          <SF.Item>
            <R.NoEquivalent @isCompact={{true}} />
          </SF.Item>
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Required and optional</ShwTextH3>

    <ShwCarbonizationComparisonGrid @label="Required">
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <HdsFormMaskedInputField
              @value="Lorem ipsum dolor"
              @isRequired={{true}}
              as |F|
            >
              <F.Label>This is the label text</F.Label>
            </HdsFormMaskedInputField>
          </SF.Item>
          <SF.Item>
            <HdsFormMaskedInputField
              @isMultiline={{true}}
              @value="Lorem ipsum dolor"
              @isRequired={{true}}
              as |F|
            >
              <F.Label>This is the label text</F.Label>
            </HdsFormMaskedInputField>
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference as |R|>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <cds-password-input
              size="md"
              label-text="This is the label text"
              value="Lorem ipsum dolor"
              required
            ></cds-password-input>
          </SF.Item>
          <SF.Item>
            <R.NoEquivalent @isCompact={{true}} />
          </SF.Item>
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="Optional" @hideThemeLabels={{true}}>
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <HdsFormMaskedInputField
              @value="Lorem ipsum dolor"
              @isOptional={{true}}
              as |F|
            >
              <F.Label>This is the label text</F.Label>
            </HdsFormMaskedInputField>
          </SF.Item>
          <SF.Item>
            <HdsFormMaskedInputField
              @isMultiline={{true}}
              @value="Lorem ipsum dolor"
              @isOptional={{true}}
              as |F|
            >
              <F.Label>This is the label text</F.Label>
            </HdsFormMaskedInputField>
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference as |R|>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <cds-password-input
              size="md"
              label-text="This is the label text"
              value="Lorem ipsum dolor"
            ></cds-password-input>
          </SF.Item>
          <SF.Item>
            <R.NoEquivalent @isCompact={{true}} />
          </SF.Item>
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>States</ShwTextH3>

    <ShwCarbonizationComparisonGrid @label="Readonly">
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <HdsFormMaskedInputField
              @value="Lorem ipsum dolor"
              readonly={{true}}
              as |F|
            >
              <F.Label>This is the label text</F.Label>
              <F.HelperText>This is the helper text</F.HelperText>
            </HdsFormMaskedInputField>
          </SF.Item>
          <SF.Item>
            <HdsFormMaskedInputField
              @isMultiline={{true}}
              @value="Lorem ipsum dolor"
              readonly={{true}}
              as |F|
            >
              <F.Label>This is the label text</F.Label>
              <F.HelperText>This is the helper text</F.HelperText>
            </HdsFormMaskedInputField>
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference as |R|>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <cds-password-input
              size="md"
              label-text="This is the label text"
              helper-text="This is the helper text"
              value="Lorem ipsum dolor"
              readonly="true"
            ></cds-password-input>
          </SF.Item>
          <SF.Item>
            <R.NoEquivalent @isCompact={{true}} />
          </SF.Item>
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="Disabled" @hideThemeLabels={{true}}>
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <HdsFormMaskedInputField
              @value="Lorem ipsum dolor"
              disabled={{true}}
              as |F|
            >
              <F.Label>This is the label text</F.Label>
              <F.HelperText>This is the helper text</F.HelperText>
            </HdsFormMaskedInputField>
          </SF.Item>
          <SF.Item>
            <HdsFormMaskedInputField
              @isMultiline={{true}}
              @value="Lorem ipsum dolor"
              disabled={{true}}
              as |F|
            >
              <F.Label>This is the label text</F.Label>
              <F.HelperText>This is the helper text</F.HelperText>
            </HdsFormMaskedInputField>
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference as |R|>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <cds-password-input
              size="md"
              label-text="This is the label text"
              helper-text="This is the helper text"
              value="Lorem ipsum dolor"
              disabled="true"
            ></cds-password-input>
          </SF.Item>
          <SF.Item>
            <R.NoEquivalent @isCompact={{true}} />
          </SF.Item>
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>
  </section>
</template>;

export default FormMaskedInputCarbonizationIndex;
