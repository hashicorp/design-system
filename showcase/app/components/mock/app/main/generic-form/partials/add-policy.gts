/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { array, hash } from '@ember/helper';

// HDS components
import {
  HdsFormHeader,
  HdsFormSection,
  HdsFormSectionHeader,
  HdsFormSeparator,
  HdsFormField,
  HdsFormFileInputBase,
  HdsFormKeyValueInputs,
  HdsFormRadioCardGroup,
  HdsFormRadioGroup,
  HdsFormTextareaField,
  HdsFormTextInputField,
  HdsFormToggleField,
  HdsCodeEditor,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

// types
import type { HdsFormHeaderSignature } from '@hashicorp/design-system-components/components/hds/form/header/index';
import type { HdsFormSectionSignature } from '@hashicorp/design-system-components/components/hds/form/section/index';
import style from 'ember-style-modifier';

export interface MockAppMainGenericFormPartialsAddPolicySignature {
  Args: {
    isHeaderFullWidth?: HdsFormHeaderSignature['Args']['isFullWidth'];
    isSectionFullWidth?: HdsFormSectionSignature['Args']['isFullWidth'];
    extraHeaderClass?: string;
    extraSectionClass?: string;
  };
}

const RADIOCARDS_PRODUCTS = [
  {
    value: '1',
    icon: 'terraform',
    label: 'Terraform policy',
    badge: 'New',
    checked: true,
    description:
      'Write policies in HCL that directly reference Terraform resources to enforce your compliance and security requirements.',
  },
  {
    value: '2',
    icon: 'hashicorp',
    label: 'Sentinel',
    description:
      'Write policies imperatively for attribute-based access control to enforce compliance and security requirements.',
  },
  {
    value: '3',
    icon: 'opa',
    label: 'Open Policy Agent (OPA)',
    description:
      'Open-source, general-purpose policy engine that allows you to enforce fine-grained access control and decision-making across cloud-native environments.',
  },
];

const MOCK_SENTINEL_CODE = `policy "require-storage-encryption" {
  input = { storage: input.storage }
  deny when not input.storage.encryption.enabled
}

metadata {
  category = "Storage"
  description = "Denies creation of storage accounts without encryption enabled."
}`;

export default class MockAppMainGenericFormPartialsAddPolicy extends Component<MockAppMainGenericFormPartialsAddPolicySignature> {
  @tracked showFileUpload = false;

  toggleFileUpload = () => {
    this.showFileUpload = !this.showFileUpload;
  };

  <template>
    <HdsFormHeader
      class={{@extraHeaderClass}}
      @isFullWidth={{@isHeaderFullWidth}}
      as |FH|
    >
      <FH.Title @tag="h2">Add policy</FH.Title>
      <FH.Description>
        Please specify which policy you would like to assign to your cluster.
        Read more about policies in our
        <HdsLinkInline @href="#">documentation</HdsLinkInline>.
      </FH.Description>
    </HdsFormHeader>
    <HdsFormSection
      class={{@extraSectionClass}}
      @isFullWidth={{@isSectionFullWidth}}
    >
      <HdsFormTextInputField as |F|>
        <F.Label>Secret ID</F.Label>
        <F.HelperText>Create a token within your self-managed cluster and attach
          only the "builtin/global-read-only" policy to it. Once complete, save
          the token, copy its secret ID from the token list, and insert it
          below.</F.HelperText>
      </HdsFormTextInputField>
    </HdsFormSection>
    {{! this is special field that needs always to be set at full width}}
    <HdsFormRadioCardGroup @alignment="center" as |G|>
      <G.Legend>Policy framework</G.Legend>
      {{#each RADIOCARDS_PRODUCTS as |item|}}
        <G.RadioCard @checked={{item.checked}} @value={{item.value}} as |R|>
          {{! @glint-expect-error }}
          <R.Icon @name={{item.icon}} />
          <R.Label>{{item.label}}</R.Label>
          {{#if item.badge}}
            <R.Badge @text={{item.badge}} @color="highlight" />
          {{/if}}
          <R.Description>{{item.description}}</R.Description>
        </G.RadioCard>
      {{/each}}
    </HdsFormRadioCardGroup>
    {{! end of the special full-width content }}
    <HdsFormSection
      class={{@extraSectionClass}}
      @isFullWidth={{@isSectionFullWidth}}
    >
      <HdsFormTextInputField
        @width="300px"
        placeholder="This field has a custom width of 300px"
        as |F|
      >
        <F.Label>Policy set name</F.Label>
        <F.HelperText>Valid characters include ASCII letters, numbers, as well
          as spaces, periods (.), dashes (-), and underscores (_).</F.HelperText>
      </HdsFormTextInputField>
    </HdsFormSection>

    <HdsFormSeparator />

    <HdsFormSection>
      <HdsFormSectionHeader as |FSH|>
        <FSH.Title @tag="h3">Policy OPA</FSH.Title>
        <FSH.Description>Policy OPA is a governance rule that enforces specific
          access controls and compliance requirements within the organization's
          infrastructure.</FSH.Description>
      </HdsFormSectionHeader>
      <HdsFormTextInputField placeholder="e.g data.terraform.deny" as |F|>
        <F.Label>Query</F.Label>
        <F.HelperText>
          The rule expression that the policy will evaluate.
          <HdsLinkInline
            @href="https://www.terraform.io/cloud-docs/policy-enforcement/opa"
            @icon="external-link"
          >
            Learn more about defining OPA policies
          </HdsLinkInline>.
        </F.HelperText>
      </HdsFormTextInputField>
    </HdsFormSection>

    {{! fake custom component, inspired by a vault one }}
    <div
      class="shw-component-form-layout-frameless-demo-complex-custom-component"
    >
      <div
        class="shw-component-form-layout-frameless-demo-complex-custom-component__toggle"
      >
        <HdsFormToggleField
          checked="checked"
          {{on "change" this.toggleFileUpload}}
          as |F|
        >
          <F.Label>Enter as text</F.Label>
        </HdsFormToggleField>
      </div>
      <HdsFormField @layout="vertical" as |F|>
        <F.Label>Policy OPA code (Sentinel)</F.Label>
        <F.HelperText>Lorem ipsum dolor sit amet, consectetur adipiscing elit</F.HelperText>
        <F.Control>
          {{#if this.showFileUpload}}
            <HdsFormFileInputBase aria-label="Fake file upload" />
          {{else}}
            <HdsCodeEditor
              @language="sentinel"
              @value={{MOCK_SENTINEL_CODE}}
              @hasFullScreenButton={{true}}
              @hasCopyButton={{true}}
              @ariaLabel="Policy OPA code"
              {{style width="100%"}}
            />
          {{/if}}
        </F.Control>
      </HdsFormField>
    </div>

    <HdsFormSeparator />

    <HdsFormHeader as |FH|>
      <FH.Title @tag="h2">Policy metadata</FH.Title>
      <FH.Description>Policy metadata is supplementary information associated
        with a policy.</FH.Description>
    </HdsFormHeader>

    <HdsFormSection>
      <HdsFormRadioGroup as |G|>
        <G.RadioField checked={{true}} as |F|>
          <F.Label>Private</F.Label>
          <F.HelperText>Most secure, the policy is private and not accessible to
            the general organization.</F.HelperText>
        </G.RadioField>
        <G.RadioField as |F|>
          <F.Label>Public</F.Label>
          <F.HelperText>Less secure, the policy is accessible to anyone within
            your organization.</F.HelperText>
        </G.RadioField>
      </HdsFormRadioGroup>
    </HdsFormSection>

    <HdsFormSection>
      <HdsFormSectionHeader as |FSH|>
        <FSH.Title @tag="h3">Some more metadata</FSH.Title>
      </HdsFormSectionHeader>

      <HdsFormKeyValueInputs
        @data={{(array
          (hash name="prod" description="Production environment")
          (hash name="dev" description="")
        )}}
      >
        <:header as |H|>
          <H.Legend>Tags applied to this policy</H.Legend>
          <H.HelperText>
            Use tags to correlate, organize or filter your policies using
            key-only or key/value pairs. You can add up to 3 tags per policy.
          </H.HelperText>
        </:header>

        <:row as |R|>
          <R.Field @isRequired={{true}} as |F|>
            <F.Label>Tag name</F.Label>
            <F.HelperText>Lorem ipsum dolor sit amet.</F.HelperText>
            <F.TextInput name="key" @value={{R.rowData.name}} />
          </R.Field>
          <R.Field @isOptional={{true}} as |F|>
            <F.Label>Tag description</F.Label>
            <F.TextInput name="value" @value={{R.rowData.description}} />
          </R.Field>
          <R.DeleteRowButton />
        </:row>

        <:footer as |F|>
          <F.AddRowButton @text="Add tag" />
        </:footer>
      </HdsFormKeyValueInputs>

      <HdsFormToggleField as |F|>
        <F.Label>Allow admin users</F.Label>
        <F.HelperText>When enabled, allows admin users to view the policy. This
          setting grants administrators elevated access within the system,
          ensuring they have full visibility into policy details and associated
          metadata.
        </F.HelperText>
      </HdsFormToggleField>
      <HdsFormTextareaField @isOptional={{true}} as |F|>
        <F.Label>Description</F.Label>
        <F.HelperText>A brief description of the policy, up to 256 characters</F.HelperText>
        <F.CharacterCount @maxLength={{256}} />
      </HdsFormTextareaField>
    </HdsFormSection>
  </template>
}
