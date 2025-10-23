/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { on } from '@ember/modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import {
  HdsAlert,
  HdsButton,
  HdsButtonSet,
  HdsForm,
  HdsFormCheckboxGroup,
  HdsFormFileInputField,
  HdsFormRadioCardGroup,
  HdsFormRadioGroup,
  HdsFormSelectField,
  HdsFormTextareaField,
  HdsFormTextInputField,
  HdsFormToggleField,
  HdsFormToggleGroup,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

const RADIOCARDS_GENERIC = [
  {
    value: '1',
    label: 'Radio card label 1',
    badge: 'Badge',
    checked: true,
    description: 'Radio card description 1',
  },
  {
    value: '2',
    label: 'Radio card label 2',
    badge: 'Badge',
    description: 'Radio card description 2',
  },
  {
    value: '3',
    label: 'Radio card label 3',
    badge: 'Badge',
    description: 'Radio card description 3',
  },
];

interface SubSectionContentSignature {
  Args: {
    toggleHighlight: () => void;
    showHighlight: boolean;
  };
}

const SubSectionContent: TemplateOnlyComponent<SubSectionContentSignature> =
  <template>
    <ShwTextH2>Content</ShwTextH2>

    <button
      type="button"
      class="shw-component-form-layout-button-highlight"
      {{on "click" @toggleHighlight}}
    >
      {{if @showHighlight "Hide layout highlight" "Show layout highlight"}}
    </button>

    <div
      class="{{if
          @showHighlight
          'shw-component-form-layout-highlight-elements'
        }}"
    >
      <HdsForm as |FORM|>
        <FORM.Header>
          <FORM.HeaderTitle>Form header title</FORM.HeaderTitle>
          <FORM.HeaderDescription>
            Form Header description—lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quasi eum neque totam vel facere itaque
            necessitatibus quisquam omnis deserunt! Dicta, explicabo quia quis
            odio nesciunt quibusdam dolor obcaecati consequatur tenetur.
          </FORM.HeaderDescription>
        </FORM.Header>

        <FORM.Section>
          <HdsAlert @type="inline" @color="critical" as |A|>
            <A.Title @tag="h2">Form submission error</A.Title>
            <A.Description>Correct the formatting of the following fields to
              update your user profile:</A.Description>
            <A.Description>
              <HdsLinkInline @href="#" @color="secondary">Expiration date</HdsLinkInline>
            </A.Description>
          </HdsAlert>
        </FORM.Section>

        <FORM.Section>
          <FORM.SectionHeader>
            <FORM.SectionHeaderTitle>Section header title</FORM.SectionHeaderTitle>
            <FORM.SectionHeaderDescription>
              Section Header description—lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quasi eum neque totam vel facere itaque
              necessitatibus quisquam omnis deserunt! Dicta, explicabo quia quis
              odio nesciunt quibusdam dolor obcaecati consequatur tenetur.
            </FORM.SectionHeaderDescription>
          </FORM.SectionHeader>

          <HdsFormTextInputField name="field-1-name" as |F|>
            <F.Label>Field 1</F.Label>
          </HdsFormTextInputField>

          <HdsFormRadioGroup @layout="horizontal" @name="field-2-name" as |G|>
            <G.Legend>Field 2</G.Legend>
            <G.RadioField as |F|>
              <F.Label>Option 1</F.Label>
            </G.RadioField>
            <G.RadioField as |F|>
              <F.Label>Option 2</F.Label>
            </G.RadioField>
            <G.RadioField as |F|>
              <F.Label>Option 3</F.Label>
            </G.RadioField>
          </HdsFormRadioGroup>

          <HdsFormSelectField name="field-3-name" as |F|>
            <F.Label>Field 3</F.Label>
            <F.Options>
              <option value="Kubernetes">Kubernetes</option>
              <option value="Other" selected>Selected</option>
            </F.Options>
          </HdsFormSelectField>

          <HdsFormTextareaField name="field-4-name" as |F|>
            <F.Label>Field 4</F.Label>
          </HdsFormTextareaField>
        </FORM.Section>

        <FORM.Section @isFullWidth={{true}}>
          <FORM.SectionHeader>
            <FORM.SectionHeaderTitle>Section header title</FORM.SectionHeaderTitle>
            <FORM.SectionHeaderDescription>
              Section Header description—lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quasi eum neque totam vel facere itaque
              necessitatibus quisquam omnis deserunt! Dicta, explicabo quia quis
              odio nesciunt quibusdam dolor obcaecati consequatur tenetur.
            </FORM.SectionHeaderDescription>
          </FORM.SectionHeader>

          <HdsFormRadioCardGroup
            @name="radio-card-align-center"
            @alignment="center"
            as |G|
          >
            <G.Legend>Group legend</G.Legend>
            {{#each RADIOCARDS_GENERIC as |item|}}
              <G.RadioCard
                @checked={{item.checked}}
                @value={{item.value}}
                as |R|
              >
                <R.Icon @name="hexagon" />
                <R.Label>{{item.label}}</R.Label>
                <R.Badge @text={{item.badge}} />
                <R.Description>{{item.description}}</R.Description>
              </G.RadioCard>
            {{/each}}
          </HdsFormRadioCardGroup>
        </FORM.Section>

        <FORM.Section>
          <HdsFormCheckboxGroup @name="field-5-name" as |G|>
            <G.Legend>Field 5</G.Legend>
            <G.CheckboxField as |F|>
              <F.Label>Option 1</F.Label>
            </G.CheckboxField>
            <G.CheckboxField as |F|>
              <F.Label>Option 2</F.Label>
            </G.CheckboxField>
            <G.CheckboxField as |F|>
              <F.Label>Option 3</F.Label>
            </G.CheckboxField>
          </HdsFormCheckboxGroup>

          <HdsFormFileInputField name="field-6-name" as |F|>
            <F.Label>Field 6</F.Label>
          </HdsFormFileInputField>

          <HdsFormToggleGroup as |G|>
            <G.Legend>Field 7 Legend</G.Legend>
            <G.ToggleField name="field-7-name" @id="field-7-name" as |F|>
              <F.Label>Field 7</F.Label>
              <F.HelperText>Helper text lorem ipsum dolor sit amet consectetur
                adipisicing elit praesentium.</F.HelperText>
            </G.ToggleField>
          </HdsFormToggleGroup>
        </FORM.Section>

        <FORM.Separator />

        <FORM.Section>
          <FORM.SectionMultiFieldGroup>
            <HdsFormTextInputField as |F|>
              <F.Label>Field group 1, field 1</F.Label>
              <F.HelperText>Lorem ipsum dolor sit amet consectetur.</F.HelperText>
            </HdsFormTextInputField>

            <HdsFormTextInputField as |F|>
              <F.Label>Field group 1, field 2</F.Label>
            </HdsFormTextInputField>
          </FORM.SectionMultiFieldGroup>

          <FORM.SectionMultiFieldGroup>
            <HdsFormTextInputField as |F|>
              <F.Label>Field group 2, field 1</F.Label>
            </HdsFormTextInputField>
            <HdsFormToggleField name="demo-cost-estimate" as |F|>
              <F.Label>Field group 2, field 2</F.Label>
            </HdsFormToggleField>
          </FORM.SectionMultiFieldGroup>
        </FORM.Section>

        <FORM.Footer>
          <HdsButtonSet>
            <HdsButton @text="Submit" type="submit" />
            <HdsButton @text="Cancel" @color="secondary" />
          </HdsButtonSet>
        </FORM.Footer>
      </HdsForm>
    </div>

    <ShwDivider />
  </template>;

export default SubSectionContent;
