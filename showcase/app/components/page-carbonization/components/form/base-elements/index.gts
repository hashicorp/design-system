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
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';
import ShwOutliner from 'showcase/components/shw/outliner';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import {
  HdsBadge,
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
    <ShwTextH2>Form primitives in context</ShwTextH2>

    <ShwCarbonizationComparisonGrid @label="with closest Carbon equivalents">
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <HdsFormField @layout="vertical" } as |F|>
              <F.Label @isOptional={{true}}>Label</F.Label>
              <F.HelperText>Helper text</F.HelperText>
              <F.Control>
                <ShwPlaceholder @text="control" @width="100%" @height="32" />
              </F.Control>
              <F.CharacterCount @value="" />
            </HdsFormField>
          </SF.Item>
          <SF.Item>
            <HdsFormField @layout="vertical" } as |F|>
              <F.Label @isRequired={{true}}>Label</F.Label>
              <F.HelperText>Helper text</F.HelperText>
              <F.Control>
                <ShwPlaceholder @text="control" @width="100%" @height="32" />
              </F.Control>
              <F.CharacterCount @value="" />
              <F.Error>This is the error</F.Error>
            </HdsFormField>
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <cds-text-input
              label="Label (optional)"
              label-description="Helper text for a text input component."
              placeholder="Placeholder text"
              helper-text="Helper text"
            ></cds-text-input>
          </SF.Item>
          <SF.Item>
            <cds-text-input
              label="Label (required)"
              label-description="Helper text for a text input component."
              placeholder="Placeholder text"
              helper-text="Helper text"
              invalid
              invalid-text="This is the error"
            ></cds-text-input>
          </SF.Item>
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider />

    <ShwTextH2>Individual components</ShwTextH2>

    <ShwTextH3>Label</ShwTextH3>

    <ShwCarbonizationComparisonGrid @layout="row">
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <HdsFormLabel>Label text</HdsFormLabel>
          </SF.Item>
          <SF.Item>
            <HdsFormLabel @isRequired={{true}}>Label text</HdsFormLabel>
          </SF.Item>
          <SF.Item>
            <HdsFormLabel @isOptional={{true}}>Label text</HdsFormLabel>
          </SF.Item>
          <SF.Item>
            <ShwOutliner {{style max-width="190px"}}>
              <HdsFormLabel>This is a very long label text that should go on
                multiple lines</HdsFormLabel>
            </ShwOutliner>
          </SF.Item>
          <SF.Item>
            <HdsFormLabel>
              <div
                class="shw-component-form-base-elements-container-with-badge"
              >
                Label text
                <HdsBadge @size="small" @text="Some badge" @color="highlight" />
              </div>
            </HdsFormLabel>
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference>
        {{! In Carbon the required/optional indication is added as plain text in the label: https://carbondesignsystem.com/components/text-input/usage/#required-versus-optional }}
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <cds-text-input label="Label text"></cds-text-input>
          </SF.Item>
          <SF.Item>
            <cds-text-input
              label="Label text (required)"
              required=""
            ></cds-text-input>
          </SF.Item>
          <SF.Item>
            <cds-text-input label="Label text (optional)">
            </cds-text-input>
          </SF.Item>
          <SF.Item>
            <ShwOutliner {{style max-width="190px"}}>
              <cds-text-input
                label="This is a very long label text that should go on multiple
          lines"
              >
              </cds-text-input>
            </ShwOutliner>
          </SF.Item>
          <SF.Item>
            <cds-text-input>
              <div
                class="shw-component-form-base-elements-container-with-badge"
                slot="label-text"
              >
                Label text
                <cds-tag size="sm" type="purple">Some badge</cds-tag>
              </div>
            </cds-text-input>
          </SF.Item>
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider />

    <ShwTextH3>Helper text</ShwTextH3>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <HdsFormHelperText>This is helper text for an input</HdsFormHelperText>
          </SF.Item>
          <SF.Item>
            <HdsFormHelperText>This is helper text
              <HdsLinkInline @route="index">with a link</HdsLinkInline></HdsFormHelperText>
          </SF.Item>
          <SF.Item>
            <ShwOutliner {{style max-width="190px"}}>
              <HdsFormHelperText>This is a very long helper text that should go
                on multiple lines</HdsFormHelperText>
            </ShwOutliner>
          </SF.Item>
          <SF.Item>
            <HdsFormHelperText>
              A helper text may contain some
              <code>&lt;code&gt;</code>
              for example, or a
              <strong>&lt;strong&gt;</strong>.
            </HdsFormHelperText>
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <cds-text-input
              helper-text="This is helper text for an input"
            ></cds-text-input>
          </SF.Item>
          <SF.Item>
            <cds-text-input
              helper-text="This is a very long helper text that should go
                on multiple lines"
            ></cds-text-input>
          </SF.Item>
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider />

    <ShwTextH3>Character count</ShwTextH3>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <CodeFragmentWithCharacterCount
          @ariaLabel="currentLength < maxLength"
          @maxLength={{25}}
          @value="cluster"
        />
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider />

    <ShwTextH3>Error</ShwTextH3>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <HdsFormError>A simple error message</HdsFormError>
          </SF.Item>
          <SF.Item>
            <ShwOutliner {{style max-width="190px"}}>
              <HdsFormError>This is a very long error message that should span
                on multiple lines</HdsFormError>
            </ShwOutliner>
          </SF.Item>
          <SF.Item>
            <HdsFormError as |Error|>
              <Error.Message>First error message</Error.Message>
              <Error.Message>Second error message</Error.Message>
            </HdsFormError>
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
              invalid-text="This is a very long error message that should span
                on multiple lines"
            ></cds-text-input>
          </SF.Item>
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider />

    <ShwTextH3>Legend</ShwTextH3>

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
            <HdsFormLegend @isRequired={{true}}>With required indicator</HdsFormLegend>
          </SF.Item>
          <SF.Item>
            <HdsFormLegend @isOptional={{true}}>With optional indicator</HdsFormLegend>
          </SF.Item>
          <SF.Item>
            <ShwOutliner
              class="shw-component-form-base-elements-container-with-badge"
              {{style max-width="190px"}}
            >
              <HdsFormLegend>This is a very long legend spanning multiple lines</HdsFormLegend>
            </ShwOutliner>
          </SF.Item>
          <SF.Item>
            <HdsFormLegend>
              <div
                class="shw-component-form-base-elements-container-with-badge"
              >This is the legend
                <HdsBadge @size="small" @text="Badge" @color="highlight" />
              </div>
            </HdsFormLegend>
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
            <ShwOutliner
              class="shw-component-form-base-elements-container-with-badge"
              {{style max-width="190px"}}
            >
              <cds-form-group
                legend-text="This is a very long legend spanning multiple lines"
              ></cds-form-group>
            </ShwOutliner>
          </SF.Item>
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider />

    <ShwTextH3>Field</ShwTextH3>

    {{#each FIELD_LAYOUT_TYPES as |layout|}}
      <ShwCarbonizationComparisonGrid @label="{{capitalize layout}} layout">
        <:theming>
          <ShwFlex @direction="column" as |SF|>
            <SF.Item>
              <HdsFormField @layout={{layout}} as |F|>
                <F.Label @isOptional={{true}}>Label</F.Label>
                <F.HelperText>Helper text</F.HelperText>
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
                {{#if (eq layout "vertical")}}
                  <F.CharacterCount @value="" />
                {{/if}}
                <F.Error>This is the error</F.Error>
              </HdsFormField>
            </SF.Item>
          </ShwFlex>
        </:theming>
        <:reference as |R|>
          {{#if (eq layout "vertical")}}
            <ShwFlex @direction="column" as |SF|>
              <SF.Item>
                <cds-text-input
                  label="Label"
                  label-description="Helper text for a text input component."
                  placeholder="Placeholder text"
                  helper-text="Helper text"
                ></cds-text-input>
              </SF.Item>
              <SF.Item>
                <cds-text-input
                  label="Label"
                  label-description="Helper text for a text input component."
                  placeholder="Placeholder text"
                  invalid
                  invalid-text="This is the error"
                ></cds-text-input>
              </SF.Item>
            </ShwFlex>
          {{else}}
            <R.NoEquivalent @isCompact={{true}} @entity="variant" />
          {{/if}}
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    <ShwDivider />

    <ShwTextH3>Fieldset</ShwTextH3>

    {{#each FIELDSET_LAYOUT_TYPES as |layout|}}
      <ShwCarbonizationComparisonGrid
        @label="{{capitalize layout}} layout"
        @layout={{if (eq layout "horizontal") "column" "row"}}
      >
        <:theming>
          <ShwFlex @gap="2rem" as |SF|>
            <SF.Item>
              <HdsFormFieldset @layout={{layout}} as |F|>
                <F.Legend>Legend</F.Legend>
                <F.HelperText>Helper text</F.HelperText>
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
          </ShwFlex>
        </:theming>
        <:reference as |R|>
          <R.NoEquivalent @isCompact={{true}} @entity="variant" />
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    <ShwDivider />

    <ShwTextH3>Visibility toggle</ShwTextH3>

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
