/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import {
  HdsButton,
  HdsButtonSet,
  HdsForm,
  HdsFormTextInputField,
} from '@hashicorp/design-system-components/components';

const FormLayoutCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Form / Layout - Carbonization"}}

  <ShwTextH1>Form / Layout - Carbonization</ShwTextH1>

  <section>

    <ShwTextH2>Full form example</ShwTextH2>

    <ShwCarbonizationComparisonGrid
      @label="Form with header, sections, and footer"
      @layout="side-by-side"
    >
      <:theming>
        <HdsForm as |FORM|>
          <FORM.Header>
            <FORM.HeaderTitle>Form header title</FORM.HeaderTitle>
            <FORM.HeaderDescription>
              Form header description—lorem ipsum dolor sit amet consectetur
              adipisicing elit.
            </FORM.HeaderDescription>
          </FORM.Header>

          <FORM.Section>
            <FORM.SectionHeader>
              <FORM.SectionHeaderTitle>Section header title</FORM.SectionHeaderTitle>
              <FORM.SectionHeaderDescription>
                Section header description—lorem ipsum dolor sit amet
                consectetur adipisicing elit.
              </FORM.SectionHeaderDescription>
            </FORM.SectionHeader>

            <HdsFormTextInputField as |F|>
              <F.Label>Text field</F.Label>
            </HdsFormTextInputField>

            <FORM.SectionMultiFieldGroup>
              <HdsFormTextInputField as |F|>
                <F.Label>FieldGroup, field 1</F.Label>
              </HdsFormTextInputField>
              <HdsFormTextInputField as |F|>
                <F.Label>FieldGroup, field 2</F.Label>
              </HdsFormTextInputField>
            </FORM.SectionMultiFieldGroup>
          </FORM.Section>

          <FORM.Separator />

          <FORM.Section>
            <HdsFormTextInputField as |F|>
              <F.Label>Text field</F.Label>
            </HdsFormTextInputField>
          </FORM.Section>

          <FORM.Footer>
            <HdsButtonSet>
              <HdsButton @text="Submit" type="submit" />
              <HdsButton @text="Cancel" @color="secondary" />
            </HdsButtonSet>
          </FORM.Footer>
        </HdsForm>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH2>Header</ShwTextH2>

    <ShwCarbonizationComparisonGrid @label="With title and description">
      <:theming>
        <HdsForm as |FORM|>
          <FORM.Header>
            <FORM.HeaderTitle>Form header title</FORM.HeaderTitle>
            <FORM.HeaderDescription>
              Form header description—lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quasi eum neque totam vel facere itaque.
            </FORM.HeaderDescription>
          </FORM.Header>
        </HdsForm>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH2>Section</ShwTextH2>

    <ShwCarbonizationComparisonGrid
      @label="With section header title and description"
    >
      <:theming>
        <HdsForm as |FORM|>
          <FORM.Section>
            <FORM.SectionHeader>
              <FORM.SectionHeaderTitle>Section header title</FORM.SectionHeaderTitle>
              <FORM.SectionHeaderDescription>
                Section header description—lorem ipsum dolor sit amet
                consectetur adipisicing elit.
              </FORM.SectionHeaderDescription>
            </FORM.SectionHeader>
            <HdsFormTextInputField as |F|>
              <F.Label>Field 1</F.Label>
            </HdsFormTextInputField>
            <HdsFormTextInputField as |F|>
              <F.Label>Field 2</F.Label>
            </HdsFormTextInputField>
          </FORM.Section>
        </HdsForm>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH2>MultiFieldGroup</ShwTextH2>

    <ShwCarbonizationComparisonGrid
      @label="Two fields / equal widths"
      @layout="column"
    >
      <:theming>
        <HdsForm as |FORM|>
          <FORM.Section>
            <FORM.SectionMultiFieldGroup>
              <HdsFormTextInputField as |F|>
                <F.Label>Control 1</F.Label>
                <F.HelperText>Lorem ipsum dolor sit amet consectetur.</F.HelperText>
              </HdsFormTextInputField>
              <HdsFormTextInputField as |F|>
                <F.Label>Control 2</F.Label>
              </HdsFormTextInputField>
            </FORM.SectionMultiFieldGroup>
          </FORM.Section>
        </HdsForm>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH2>Separator</ShwTextH2>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <HdsForm as |FORM|>
          <FORM.Section>
            <HdsFormTextInputField as |F|>
              <F.Label>Field 1</F.Label>
            </HdsFormTextInputField>
          </FORM.Section>
          <FORM.Separator />
          <FORM.Section>
            <HdsFormTextInputField as |F|>
              <F.Label>Field 2</F.Label>
            </HdsFormTextInputField>
          </FORM.Section>
        </HdsForm>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH2>Footer</ShwTextH2>

    <ShwCarbonizationComparisonGrid @label="With button set">
      <:theming>
        <HdsForm as |FORM|>
          <FORM.Footer>
            <HdsButtonSet>
              <HdsButton @text="Submit" type="submit" />
              <HdsButton @text="Cancel" @color="secondary" />
            </HdsButtonSet>
          </FORM.Footer>
        </HdsForm>
      </:theming>
    </ShwCarbonizationComparisonGrid>
  </section>
</template>;

export default FormLayoutCarbonizationIndex;
