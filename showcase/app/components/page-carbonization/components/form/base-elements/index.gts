/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { capitalize } from '@ember/string';
import { eq } from 'ember-truth-helpers';
import style from 'ember-style-modifier';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwDivider from 'showcase/components/shw/divider';
import ShwOutliner from 'showcase/components/shw/outliner';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import {
  HdsFormLabel,
  HdsFormHelperText,
  HdsLinkInline,
  HdsFormError,
  HdsFormLegend,
  HdsFormFieldset,
  HdsFormVisibilityToggle,
  HdsFormField,
} from '@hashicorp/design-system-components/components';

import CodeFragmentWithCharacterCount from 'showcase/components/page-components/form/base-elements/code-fragments/with-character-count';

import { LAYOUT_TYPES as FIELD_LAYOUT_TYPES } from '@hashicorp/design-system-components/components/hds/form/field/index';
import { LAYOUT_TYPES as FIELDSET_LAYOUT_TYPES } from '@hashicorp/design-system-components/components/hds/form/fieldset/index';

const FormBaseElementsCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Form / Base elements - Carbonization"}}

  <ShwTextH1>Form / Base elements (Primitives) - Carbonization</ShwTextH1>

  <section>
    <ShwTextH2>Field</ShwTextH2>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          {{#each FIELD_LAYOUT_TYPES as |layout|}}
            <SF.Item @label="{{capitalize layout}} layout">
              <HdsFormField @layout={{layout}} as |F|>
                <F.Label>This is the label</F.Label>
                <F.HelperText>This is the helper text</F.HelperText>
                <F.Control>
                  {{#if (eq layout "vertical")}}
                    <ShwPlaceholder
                      @text="control"
                      @width="100%"
                      @height="32"
                    />
                  {{/if}}
                  {{#if (eq layout "flag")}}
                    <ShwPlaceholder @text="✔" @width="16" @height="16" />
                  {{/if}}
                </F.Control>
                <F.Error>This is the error</F.Error>
              </HdsFormField>
            </SF.Item>
          {{/each}}
        </ShwFlex>
      </:theming>
      <:reference>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <cds-text-input
              label="This is the label"
              label-description="Helper text for a text input component."
              placeholder="Placeholder text"
              helper-text="This is the Helper text"
            ></cds-text-input>
          </SF.Item>
          <SF.Item>
            <cds-text-input
              label="This is the label"
              label-description="Helper text for a text input component."
              placeholder="Placeholder text"
              invalid
              invalid-text="This is the error"
            ></cds-text-input>
          </SF.Item>
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider />

    <ShwTextH2>Label</ShwTextH2>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <HdsFormLabel>Simple label</HdsFormLabel>
          </SF.Item>
          <SF.Item>
            <HdsFormLabel @isRequired={{true}}>Required label</HdsFormLabel>
          </SF.Item>
          <SF.Item>
            <HdsFormLabel @isOptional={{true}}>Optional label</HdsFormLabel>
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference>
        <cds-text-input label="Label for input"> </cds-text-input>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider />

    <ShwTextH2>Helper text</ShwTextH2>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <HdsFormHelperText>This is the helper text, usually used jointly
              with the label.</HdsFormHelperText>
          </SF.Item>
          <SF.Item>
            <HdsFormHelperText>This is helper text
              <HdsLinkInline @route="index">with a link</HdsLinkInline></HdsFormHelperText>
          </SF.Item>
          <SF.Item>
            <HdsFormHelperText>This is helper text
              <HdsLinkInline @route="index" @color="secondary">with a secondary
                link</HdsLinkInline></HdsFormHelperText>
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference>
        <cds-text-input
          helper-text="This is helper text for an input"
        ></cds-text-input>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider />

    <ShwTextH2>Character count</ShwTextH2>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <ShwGrid @columns={{1}} as |SG|>
          <SG.Item @label="Base, currentLength > 0">
            <CodeFragmentWithCharacterCount
              @ariaLabel="currentLength > 0"
              @value="cl"
            />
          </SG.Item>
          <SG.Item @label="currentLength < maxLength">
            <CodeFragmentWithCharacterCount
              @ariaLabel="currentLength < maxLength"
              @maxLength={{25}}
              @value="cluster"
            />
          </SG.Item>
          <SG.Item @label="currentLength > maxLength">
            <CodeFragmentWithCharacterCount
              @ariaLabel="currentLength > maxLength"
              @maxLength={{25}}
              @value="cluster-length-is-longer-than"
            />
          </SG.Item>
          <SG.Item @label="minLength + maxLength, currentLength = 0">
            <CodeFragmentWithCharacterCount
              @ariaLabel="currentLength = 0"
              @minLength={{3}}
              @maxLength={{25}}
            />
          </SG.Item>
          <SG.Item @label="minLength + maxLength, currentLength < minLength">
            <CodeFragmentWithCharacterCount
              @ariaLabel="currentLength < minLength"
              @minLength={{3}}
              @maxLength={{25}}
              @value="1"
            />
          </SG.Item>
        </ShwGrid>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider />

    <ShwTextH2>Error</ShwTextH2>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <HdsFormError>A simple error message</HdsFormError>
          </SF.Item>
          <SF.Item>
            <ShwOutliner {{style width="190px"}}>
              <HdsFormError>Long error message spanning multiple lines</HdsFormError>
            </ShwOutliner>
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <cds-text-input
              required=""
              type="password"
              label="Password"
              pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$"
              invalid=""
              invalid-text="A simple error message"
            ></cds-text-input>
          </SF.Item>
          <SF.Item>
            <cds-text-input
              required=""
              type="password"
              label="Password"
              pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$"
              invalid=""
              invalid-text="Long error message spanning multipe lines"
            ></cds-text-input>
          </SF.Item>
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider />

    <ShwTextH2>Legend (for Fieldset)</ShwTextH2>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <HdsFormLegend>This is a simple legend</HdsFormLegend>
          </SF.Item>
          <SF.Item>
            <HdsFormLegend>Legend
              <HdsLinkInline @route="index">with a link</HdsLinkInline></HdsFormLegend>
          </SF.Item>
          <SF.Item>
            <HdsFormLegend>Legend
              <HdsLinkInline @route="index" @color="secondary">with secondary
                link</HdsLinkInline></HdsFormLegend>
          </SF.Item>
          <SF.Item>
            <HdsFormLegend @isRequired={{true}}>With required indicator</HdsFormLegend>
          </SF.Item>
          <SF.Item>
            <HdsFormLegend @isOptional={{true}}>With optional indicator</HdsFormLegend>
          </SF.Item>
          <SF.Item>
            <ShwOutliner
              class="shw-component-form-base-elements-container-with-badge"
              {{style max-width="250px"}}
            >
              <HdsFormLegend>This is a very long legend spanning multiple lines</HdsFormLegend>
            </ShwOutliner>
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <cds-form-group
              legend-text="This is a simple legend"
            ></cds-form-group>
          </SF.Item>
          <SF.Item>
            <cds-form-group
              legend-text="This is a very long legend spanning multiple lines"
            ></cds-form-group>
          </SF.Item>
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider />

    <ShwTextH2>Fieldset</ShwTextH2>

    <ShwCarbonizationComparisonGrid @layout="column">
      <:theming>
        <ShwFlex @gap="2rem" as |SF|>
          {{#each FIELDSET_LAYOUT_TYPES as |layout|}}
            <SF.Item @label="{{capitalize layout}} layout">
              <HdsFormFieldset @layout={{layout}} as |F|>
                <F.Legend>This is the legend</F.Legend>
                <F.HelperText>This is the helper text</F.HelperText>
                <F.Control>
                  <ShwPlaceholder
                    @text="field"
                    @width="120"
                    @height="32"
                    class="hds-form-group__control-field"
                  />
                </F.Control>
                <F.Control>
                  <ShwPlaceholder
                    @text="field"
                    @width="120"
                    @height="32"
                    class="hds-form-group__control-field"
                  />
                </F.Control>
                <F.Error>This is the error</F.Error>
              </HdsFormFieldset>
            </SF.Item>
          {{/each}}
        </ShwFlex>
      </:theming>
      <:reference>
        <cds-form-group legend-text="This is the legend">
          <cds-stack gap="7">
            <cds-text-input label="field"> </cds-text-input>
            <cds-text-input label="field"> </cds-text-input>
          </cds-stack>
        </cds-form-group>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider />

    <ShwTextH2>Visibility toggle</ShwTextH2>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <ShwFlex as |SF|>
          <SF.Item @label="On">
            <ShwOutliner>
              <HdsFormVisibilityToggle
                @isVisible={{true}}
                aria-label="is-visible"
              />
            </ShwOutliner>
          </SF.Item>
          <SF.Item @label="Off">
            <ShwOutliner>
              <HdsFormVisibilityToggle
                @isVisible={{false}}
                aria-label="is-not-visible"
              />
            </ShwOutliner>
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>
  </section>
</template>;

export default FormBaseElementsCarbonizationIndex;
