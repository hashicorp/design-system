/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

// HDS components
import {
  HdsForm,
  HdsFormTextInputField,
  HdsFormSelectField,
  HdsFormRadioGroup,
  HdsFormTextareaField,
} from '@hashicorp/design-system-components/components';

import MockAppMainGenericFormPartialsActions from './actions';

export interface MockAppMainGenericFormPartialsAccountSignupSignature {
  Args: {
    hideHeader?: boolean;
    hideActions?: boolean;
  };
}

const MockAppMainGenericFormPartialsAccountSignup: TemplateOnlyComponent<MockAppMainGenericFormPartialsAccountSignupSignature> =
  <template>
    <HdsForm as |FORM|>

      {{#unless @hideHeader}}
        <FORM.Header>
          <FORM.HeaderTitle @tag="h1">Account signup form</FORM.HeaderTitle>
          <FORM.HeaderDescription>Create your account to start using our
            cloud-based platform and unlock a suite of powerful features
            designed to help you grow your business.</FORM.HeaderDescription>
        </FORM.Header>
      {{/unless}}

      <FORM.Section>
        <FORM.SectionHeader>
          <FORM.SectionHeaderTitle>Your personal details</FORM.SectionHeaderTitle>
          <FORM.SectionHeaderDescription>
            Please fill out the fields below with your personal details.
          </FORM.SectionHeaderDescription>
        </FORM.SectionHeader>

        <FORM.SectionMultiFieldGroup>
          <HdsFormTextInputField as |F|>
            <F.Label>First name</F.Label>
            <F.HelperText>Your given name</F.HelperText>
          </HdsFormTextInputField>

          <HdsFormTextInputField as |F|>
            <F.Label>Last name</F.Label>
          </HdsFormTextInputField>
        </FORM.SectionMultiFieldGroup>

        <FORM.SectionMultiFieldGroup as |FG|>
          <HdsFormTextInputField as |F|>
            <F.Label>City</F.Label>
          </HdsFormTextInputField>

          <FG.Item @width="auto">
            <HdsFormSelectField as |F|>
              <F.Label>State</F.Label>
              <F.Options>
                <option value="state-1">Ohio</option>
                <option value="state-2">Massachusetts</option>
                <option value="state-3">Washington</option>
                <option value="state-4">Florida</option>
                <option value="state-4">North Carolina</option>
              </F.Options>
            </HdsFormSelectField>
          </FG.Item>

          <FG.Item @width="8em">
            <HdsFormTextInputField as |F|>
              <F.Label>Zip</F.Label>
            </HdsFormTextInputField>
          </FG.Item>
        </FORM.SectionMultiFieldGroup>

        <HdsFormRadioGroup @layout="horizontal" @name="demo-radio-group" as |G|>
          <G.Legend>Favorite pet</G.Legend>
          <G.RadioField as |F|>
            <F.Label>Cat</F.Label>
          </G.RadioField>
          <G.RadioField as |F|>
            <F.Label>Dog</F.Label>
          </G.RadioField>
          <G.RadioField as |F|>
            <F.Label>Hamster</F.Label>
          </G.RadioField>
          <G.RadioField as |F|>
            <F.Label>Parrot</F.Label>
          </G.RadioField>
          <G.RadioField as |F|>
            <F.Label>Turtle</F.Label>
          </G.RadioField>
        </HdsFormRadioGroup>

        <HdsFormTextInputField as |F|>
          <F.Label>Email</F.Label>
        </HdsFormTextInputField>

        <HdsFormTextareaField as |F|>
          <F.Label>Short bio</F.Label>
        </HdsFormTextareaField>

        {{#unless @hideActions}}
          <MockAppMainGenericFormPartialsActions />
        {{/unless}}

      </FORM.Section>

    </HdsForm>
  </template>;

export default MockAppMainGenericFormPartialsAccountSignup;
