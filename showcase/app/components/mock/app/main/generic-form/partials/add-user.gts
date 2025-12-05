/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';

// HDS components
import {
  HdsFormHeader,
  HdsFormHeaderTitle,
  HdsFormHeaderDescription,
  HdsFormSection,
  HdsFormSectionMultiFieldGroup,
  HdsFormTextInputField,
  HdsFormSelectField,
  HdsFormToggleField,
  HdsLayoutFlex,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

// types
import type { HdsFormHeaderSignature } from '@hashicorp/design-system-components/components/hds/form/header/index';
import type { HdsFormSectionSignature } from '@hashicorp/design-system-components/components/hds/form/section/index';

export interface MockAppMainGenericFormPartialsAddPolicySignature {
  Args: {
    isHeaderFullWidth?: HdsFormHeaderSignature['Args']['isFullWidth'];
    isSectionFullWidth?: HdsFormSectionSignature['Args']['isFullWidth'];
    extraHeaderClass?: string;
    extraSectionClass?: string;
  };
}

export default class MockAppMainGenericFormPartialsAddPolicy extends Component<MockAppMainGenericFormPartialsAddPolicySignature> {
  @tracked showExtraContent = false;

  toggleExtraContent = () => {
    this.showExtraContent = !this.showExtraContent;
  };

  <template>
    <HdsFormHeader
      @isFullWidth={{@isHeaderFullWidth}}
      class={{@extraHeaderClass}}
    >
      <HdsFormHeaderTitle @tag="h2">Add user</HdsFormHeaderTitle>
      <HdsFormHeaderDescription>
        Grant access to HCP resources for your team members, allowing them to
        collaborate and manage cloud infrastructure more effectively. When you
        add a user, they’ll automatically receive an invitation via email with
        instructions on how to join and access the designated resources.
      </HdsFormHeaderDescription>
      <HdsFormHeaderDescription>
        Read more about user permissions in our
        <HdsLinkInline
          @href="#"
          @icon="docs-link"
        >documentation</HdsLinkInline>.
      </HdsFormHeaderDescription>
    </HdsFormHeader>

    <HdsFormSection
      class={{@extraSectionClass}}
      @isFullWidth={{@isSectionFullWidth}}
    >
      <HdsFormTextInputField @isRequired={{true}} as |F|>
        <F.Label>Email address for user</F.Label>
      </HdsFormTextInputField>
      <HdsFormToggleField {{on "change" this.toggleExtraContent}} as |F|>
        <F.Label>Assign this user an organization role</F.Label>
        <F.HelperText>Users without organization roles cannot view or edit
          anything inside this organization until project-level or
          workspace-level roles are assigned to them after they accept their
          invitation.</F.HelperText>
      </HdsFormToggleField>
      {{#if this.showExtraContent}}
        <HdsLayoutFlex @align="end" @gap="16">
          <HdsFormSelectField as |F|>
            <F.Label>Select an organization role</F.Label>
            <F.Options>
              <option value="admin">Admin</option>
              <option value="browser">Browser</option>
              <option value="contributor">Contributor</option>
              <option selected="true" value="viewer">Viewer</option>
            </F.Options>
          </HdsFormSelectField>
        </HdsLayoutFlex>
      {{/if}}

      <HdsFormSectionMultiFieldGroup as |FG|>
        <FG.Item @width="20%">
          <HdsFormSelectField as |F|>
            <F.Label>Prefix</F.Label>
            <F.Options>
              <option value=""></option>
              <option value="+1">+1 (USA)</option>
              <option value="+44">+44 (UK)</option>
              <option value="+81">+81 (Japan)</option>
              <option value="+234">+234 (Nigeria)</option>
              <option value="+61">+61 (Australia)</option>
              <option value="+55">+55 (Brazil)</option>
            </F.Options>
          </HdsFormSelectField>
        </FG.Item>
        <FG.Item @width="80%">
          <HdsFormTextInputField @type="tel" as |F|>
            <F.Label>Phone Number:</F.Label>
          </HdsFormTextInputField>
        </FG.Item>
      </HdsFormSectionMultiFieldGroup>

    </HdsFormSection>
  </template>
}
