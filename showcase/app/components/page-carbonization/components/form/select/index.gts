/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { capitalize } from '@ember/string';
import { eq } from 'ember-truth-helpers';
import { array } from '@ember/helper';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import {
  HdsFormSelectBase,
  HdsFormSelectField,
} from '@hashicorp/design-system-components/components';

const STATES = ['default', 'hover', 'focus'];

const FormSelectCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Select - Carbonization"}}

  <ShwTextH1>Select - Carbonization</ShwTextH1>

  <section>
    <ShwTextH2>“Base” control</ShwTextH2>

    <ShwTextH3>Interaction status</ShwTextH3>

    <ShwCarbonizationComparisonGrid @label="Default">
      <:theming>
        <HdsFormSelectBase aria-label="default select" as |C|>
          <C.Options>
            <option></option>
            <option>Lorem ipsum dolor</option>
            <option>Sine qua non est</option>
          </C.Options>
        </HdsFormSelectBase>
      </:theming>
      <:reference>
        <cds-select>
          <cds-select-item value="">Select an option</cds-select-item>
          <cds-select-item value="lorem">Lorem ipsum dolor</cds-select-item>
          <cds-select-item value="sine">Sine qua non est</cds-select-item>
        </cds-select>
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="Selected">
      <:theming>
        <HdsFormSelectBase aria-label="selected value" as |C|>
          <C.Options>
            <option></option>
            <option selected>Lorem ipsum dolor</option>
            <option>Sine qua non est</option>
          </C.Options>
        </HdsFormSelectBase>
      </:theming>
      <:reference>
        <cds-select value="lorem">
          <cds-select-item value="">Select an option</cds-select-item>
          <cds-select-item value="lorem">Lorem ipsum dolor</cds-select-item>
          <cds-select-item value="sine">Sine qua non est</cds-select-item>
        </cds-select>
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="Multiple" @layout="column-stacked">
      <:theming>
        <HdsFormSelectBase aria-label="multiple select" multiple as |C|>
          <C.Options>
            <option selected>Lorem ipsum dolor</option>
            <option>Sine qua non est</option>
            <option>Consectetur adipiscing</option>
          </C.Options>
        </HdsFormSelectBase>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} @entity="variant" />
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="Multiple / With groups">
      <:theming>
        <HdsFormSelectBase
          aria-label="multiple groups select"
          multiple
          size="8"
          as |C|
        >
          <C.Options>
            <optgroup label="Most common">
              <option value="Kubernetes">Kubernetes</option>
              <option value="AWS">AWS</option>
              <option value="Azure" disabled>Azure</option>
            </optgroup>
            <optgroup label="Others">
              <option value="Alibaba" selected>Alibaba</option>
              <option value="CloudWise" selected>CloudWise</option>
              <option value="SWA">SWA</option>
              <option value="Other">Other</option>
            </optgroup>
          </C.Options>
        </HdsFormSelectBase>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} @entity="variant" />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>States</ShwTextH3>

    {{#each STATES as |state|}}
      <ShwCarbonizationComparisonGrid
        @label={{capitalize state}}
        mock-state-value={{state}}
        mock-state-selector="select"
      >
        <:theming>
          <ShwFlex @gap="1rem" as |SF|>
            <SF.Item @label="Base">
              <ShwFlex @gap="1rem" as |SFN|>
                <SFN.Item>
                  <HdsFormSelectBase aria-label="base" as |C|>
                    <C.Options>
                      <option selected>Lorem ipsum dolor</option>
                      <option>Sine qua non est</option>
                    </C.Options>
                  </HdsFormSelectBase>
                </SFN.Item>
                <SFN.Item>
                  <HdsFormSelectBase aria-label="multiple" multiple as |C|>
                    <C.Options>
                      <option selected>Lorem ipsum dolor</option>
                      <option>Sine qua non est</option>
                    </C.Options>
                  </HdsFormSelectBase>
                </SFN.Item>
              </ShwFlex>
            </SF.Item>

            <SF.Item @label="Invalid">
              <ShwFlex @gap="1rem" as |SFN|>
                <SFN.Item>
                  <HdsFormSelectBase
                    @isInvalid={{true}}
                    aria-label="invalid"
                    as |C|
                  >
                    <C.Options>
                      <option selected>Lorem ipsum dolor</option>
                      <option>Sine qua non est</option>
                    </C.Options>
                  </HdsFormSelectBase>
                </SFN.Item>
                <SFN.Item>
                  <HdsFormSelectBase
                    @isInvalid={{true}}
                    aria-label="multiple invalid"
                    multiple
                    as |C|
                  >
                    <C.Options>
                      <option selected>Lorem ipsum dolor</option>
                      <option>Sine qua non est</option>
                    </C.Options>
                  </HdsFormSelectBase>
                </SFN.Item>
              </ShwFlex>
            </SF.Item>
          </ShwFlex>
        </:theming>
        <:reference as |R|>
          {{#if (eq state "default")}}
            <ShwFlex @gap="1rem" as |SF|>
              <SF.Item @label="Base">
                <cds-select value="lorem">
                  <cds-select-item value="lorem">Lorem ipsum dolor</cds-select-item>
                  <cds-select-item value="sine">Sine qua non est</cds-select-item>
                </cds-select>
                <R.NoEquivalent @isCompact={{true}} @entity="variant" />
              </SF.Item>
              <SF.Item @label="Invalid">
                <cds-select
                  invalid
                  invalid-text="This is the error"
                  value="lorem"
                >
                  <cds-select-item value="lorem">Lorem ipsum dolor</cds-select-item>
                  <cds-select-item value="sine">Sine qua non est</cds-select-item>
                </cds-select>
                <R.NoEquivalent @isCompact={{true}} @entity="variant" />
              </SF.Item>
            </ShwFlex>
          {{else}}
            <pre>TODO: static image here</pre>
          {{/if}}
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}
    {{#each (array "default" "hover") as |state|}}
      <ShwCarbonizationComparisonGrid
        @label="Disabled / {{capitalize state}}"
        mock-state-value={{state}}
        mock-state-selector="select"
      >
        <:theming>
          <ShwFlex @gap="1rem" as |SFN|>
            <SFN.Item>
              <HdsFormSelectBase disabled aria-label="disabled select" as |C|>
                <C.Options>
                  <option selected>Lorem ipsum dolor</option>
                  <option>Sine qua non est</option>
                </C.Options>
              </HdsFormSelectBase>
            </SFN.Item>
            <SFN.Item>
              <HdsFormSelectBase
                disabled
                aria-label="disabled select multiple"
                multiple
                as |C|
              >
                <C.Options>
                  <option selected>Lorem ipsum dolor</option>
                  <option>Sine qua non est</option>
                </C.Options>
              </HdsFormSelectBase>
            </SFN.Item>
          </ShwFlex>
        </:theming>
        <:reference>
          {{#if (eq state "default")}}
            <cds-select disabled value="lorem">
              <cds-select-item value="lorem">Lorem ipsum dolor</cds-select-item>
              <cds-select-item value="sine">Sine qua non est</cds-select-item>
            </cds-select>
          {{else}}
            <pre>TODO: static image here</pre>
          {{/if}}
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    <ShwDivider />

    <ShwTextH2>“Field” control</ShwTextH2>

    <ShwTextH3>Content</ShwTextH3>

    <ShwCarbonizationComparisonGrid @label="Label + Helper text">
      <:theming>
        <HdsFormSelectField as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.Options>
            <option selected>Lorem ipsum dolor</option>
            <option>Sine qua non est</option>
          </F.Options>
        </HdsFormSelectField>
      </:theming>
      <:reference>
        <cds-select
          label-text="This is the label"
          helper-text="This is the helper text"
          value="lorem"
        >
          <cds-select-item value="lorem">Lorem ipsum dolor</cds-select-item>
          <cds-select-item value="sine">Sine qua non est</cds-select-item>
        </cds-select>
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="Label + Helper text + Error">
      <:theming>
        <HdsFormSelectField @isInvalid={{true}} as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.Options>
            <option selected>Lorem ipsum dolor</option>
            <option>Sine qua non est</option>
          </F.Options>
          <F.Error>This is the error</F.Error>
        </HdsFormSelectField>
      </:theming>
      <:reference>
        <cds-select
          label-text="This is the label"
          helper-text="This is the helper text"
          invalid
          invalid-text="This is the error"
          value="lorem"
        >
          <cds-select-item value="lorem">Lorem ipsum dolor</cds-select-item>
          <cds-select-item value="sine">Sine qua non est</cds-select-item>
        </cds-select>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>States</ShwTextH3>

    {{#each STATES as |state|}}
      <ShwCarbonizationComparisonGrid
        @label={{capitalize state}}
        mock-state-value={{state}}
        mock-state-selector="select"
      >
        <:theming>
          <HdsFormSelectField as |F|>
            <F.Label>This is the label</F.Label>
            <F.HelperText>This is the helper text</F.HelperText>
            <F.Options>
              <option selected>Lorem ipsum dolor</option>
              <option>Sine qua non est</option>
            </F.Options>
          </HdsFormSelectField>
        </:theming>
        <:reference>
          {{#if (eq state "default")}}
            <cds-select
              label-text="This is the label"
              helper-text="This is the helper text"
              value="lorem"
            >
              <cds-select-item value="lorem">Lorem ipsum dolor</cds-select-item>
              <cds-select-item value="sine">Sine qua non est</cds-select-item>
            </cds-select>
          {{else}}
            <pre>TODO: static image here</pre>
          {{/if}}
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}
    <ShwCarbonizationComparisonGrid @label="Disabled">
      <:theming>
        <HdsFormSelectField disabled={{true}} as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.Options>
            <option>Lorem ipsum dolor</option>
            <option>Sine qua non est</option>
          </F.Options>
        </HdsFormSelectField>
      </:theming>
      <:reference>
        <cds-select
          label-text="This is the label"
          helper-text="This is the helper text"
          disabled
          value="lorem"
        >
          <cds-select-item value="lorem">Lorem ipsum dolor</cds-select-item>
          <cds-select-item value="sine">Sine qua non est</cds-select-item>
        </cds-select>
      </:reference>
    </ShwCarbonizationComparisonGrid>
  </section>
</template>;

export default FormSelectCarbonizationIndex;
