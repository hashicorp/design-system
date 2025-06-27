/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
// import { on } from '@ember/modifier';
import { eq } from 'ember-truth-helpers';

// HDS components
import { HdsFormKeyValueInputs } from '@hashicorp/design-system-components/components';

// types
import type { HdsFormKeyValueInputsSignature } from '@hashicorp/design-system-components/components/hds/form/key-value-inputs/index';
// import type { HdsFormSectionSignature } from '@hashicorp/design-system-components/components/hds/form/section/index';
// import style from 'ember-style-modifier/modifiers/style';

export interface MockAppMainGenericFormPartialsAddOsArchitectureSignature {
  // Args: {
  //   // isHeaderFullWidth?: HdsFormHeaderSignature['Args']['isFullWidth'];
  //   // isSectionFullWidth?: HdsFormSectionSignature['Args']['isFullWidth'];
  //   // extraHeaderClass?: string;
  //   // extraSectionClass?: string;
  // };
  Element: HdsFormKeyValueInputsSignature['Element'];
}

// const RADIOCARDS_PRODUCTS = [];

// const MOCK_SENTINEL_CODE = `policy "require-storage-encryption" {
//   input = { storage: input.storage }
//   deny when not input.storage.encryption.enabled
// }

// metadata {
//   category = "Storage"
//   description = "Denies creation of storage accounts without encryption enabled."
// }`;

const OS_ARCHITECTURES = [
  { key: 'linux-amd64', label: 'Linux amd64' },
  { key: 'linux-arm64', label: 'Linux arm64' },
  { key: 'rhe_x86_64', label: 'Red Hat Enterprise x86_64' },
  { key: 'ubuntu_amd64', label: 'Ubuntu Server amd64' },
];

export default class MockAppMainGenericFormPartialsAddOsArchitecture extends Component<MockAppMainGenericFormPartialsAddOsArchitectureSignature> {
  @tracked osArchitectureFieldData = [
    {
      id: 0,
      'os-architecture': { value: 'linux-arm64' },
      'os-architecture-image-url': { value: 'https://linux.org' },
      'os-architecture-sha256': {
        value:
          '61be55a8e2f6b4e172338bddf184d6dbee29c98853e0a0485ecee7f27b9af0b4',
      },
    },
    {
      id: 2,
      'os-architecture': { value: 'rhe_x86_64' },
      'os-architecture-image-url': { value: 'https://redhat.com' },
      'os-architecture-sha256': {
        value:
          '1237a55d86d9ddbd1454c91250ed8cd6960350d2e349d5c16bb34d6583dc86c6',
      },
    },
  ];

  // toggleFileUpload = () => {
  //   this.showFileUpload = !this.showFileUpload;
  // };

  // osArchitectureFieldData() {
  //   return [];
  // }

  canDeleteRow = () => {
    return true;
  }

  canAddRow = () => {
    return this.osArchitectureFieldData.length < 4;
  }

  onAddRowClick = () => {
    console.log('onAddRowClick invoked');
    this.osArchitectureFieldData = [
      ...this.osArchitectureFieldData,
      {
        id: this.osArchitectureFieldData.length + 1,
        'os-architecture': { value: '' },
        'os-architecture-image-url': { value: '' },
        'os-architecture-sha256': { value: '' },
      },
    ];
  }

  onDeleteRowClick = (item) => {
    console.log('onAddRowClick invoked');
    this.osArchitectureFieldData = this.osArchitectureFieldData.filter(
      (row) => row.id !== item.id,
    );
  }

  <template>
    {{log this.osArchitectureFieldData}}
    <HdsFormKeyValueInputs @data={{this.osArchitectureFieldData}} ...attributes>
      <:header as |H|>
        <H.Legend>Add OS architecture</H.Legend>
        <H.HelperText>Choose the operating system architecture you want to add.
          Typical options include x86, x64, ARM, and others. This selection
          determines the compatibility of your software or package with
          different hardware platforms. If you're unsure which architecture to
          choose, consult your system documentation or contact your
          administrator.</H.HelperText>
      </:header>

      <:row as |R|>
        <R.Field @isRequired={{true}} as |F|>
          <F.Label>OS Architecture</F.Label>
          <F.Select name="os-architecture">
            <option value=""></option>
            {{#each OS_ARCHITECTURES as |os_architecture|}}
              <option
                value={{os_architecture.key}}
                selected={{(eq os_architecture.key R.rowData.os-architecture.value)}}
              >{{os_architecture.label}}</option>
            {{/each}}
          </F.Select>
        </R.Field>
        <R.Field @isRequired={{true}} as |F|>
          <F.Label>Image URL</F.Label>
          <F.TextInput
            name="os-architecture-image-url"
            @type="url"
            @value={{R.rowData.os-architecture-image-url.value}}
          />
        </R.Field>
        <R.Field as |F|>
          <F.Label>SHA256 Checksum</F.Label>
          <F.HelperText>The SHA256 checksum of the downloaded image will be
            verified. The checksum can be found on the download page.</F.HelperText>
          <F.MaskedInput
            name="os-architecture-sha256"
            @value={{R.rowData.os-architecture-sha256.value}}
            @isMultiline={{true}}
            @isInvalid={{R.rowData.sha256.isInvalid}}
            @isContentMasked={{true}}
          />
        </R.Field>
        {{#if this.canDeleteRow}}
          <R.DeleteRowButton @onClick={{this.onDeleteRowClick}} />
        {{/if}}
      </:row>

      <:footer as |F|>
        {{#if this.canAddRow}}
          <F.AddRowButton
            @text="Add architecture"
            @onClick={{this.onAddRowClick}}
          />
        {{else}}
          <F.Alert as |A|>
            <A.Description>
              You can only add up to 3 OS architectures to this resource.
            </A.Description>
          </F.Alert>
        {{/if}}
      </:footer>
    </HdsFormKeyValueInputs>
  </template>
}
