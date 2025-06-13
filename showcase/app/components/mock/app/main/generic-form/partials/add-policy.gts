/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

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

// HDS components
import {
  HdsFormHeader,
  HdsFormSection,
  HdsFormRadioCardGroup,
  HdsFormTextareaField,
  HdsFormTextInputField,
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

const MockAppMainGenericFormPartialsAddPolicy: TemplateOnlyComponent<MockAppMainGenericFormPartialsAddPolicySignature> =
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
    {{!-- end of the special full-width content --}}
    <HdsFormSection
      class={{@extraSectionClass}}
      @isFullWidth={{@isSectionFullWidth}}
    >
      <HdsFormTextInputField as |F|>
        <F.Label>Policy set name</F.Label>
        <F.HelperText>Valid characters include ASCII letters, numbers, as well
          as spaces, periods (.), dashes (-), and underscores (_).</F.HelperText>
      </HdsFormTextInputField>
      <HdsFormTextareaField @isOptional={{true}} as |F|>
        <F.Label>Description</F.Label>
        <F.HelperText>A brief description of the policy, up to 256 characters</F.HelperText>
        <F.CharacterCount @maxLength={{256}} />
      </HdsFormTextareaField>
    </HdsFormSection>
  </template>;

export default MockAppMainGenericFormPartialsAddPolicy;
