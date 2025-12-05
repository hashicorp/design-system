/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { eq } from 'ember-truth-helpers';
import type Owner from '@ember/owner';

import { HdsFormKeyValueInputs } from '@hashicorp/design-system-components/components';
import type { HdsFormKeyValueInputsSignature } from '@hashicorp/design-system-components/components/hds/form/key-value-inputs/index';

export interface KvpItem {
  id: number;
  key: {
    text: string;
  };
  value: {
    text: string;
  };
}

const DEFAULT_DATA = [
  {
    id: 1,
    key: {
      text: 'enterprise',
    },
    value: {
      text: '',
    },
  },
  {
    id: 2,
    key: {
      text: 'prod',
    },
    value: {
      text: 'This is a production tag',
    },
  },
  {
    id: 3,
    key: {
      text: 'beta',
    },
    value: {
      text: 'Feature includes beta',
    },
  },
];

export interface CodeFragmentWithGenericContentSignature {
  Args: {
    data?: KvpItem[];
    isOptional?: HdsFormKeyValueInputsSignature['Args']['isOptional'];
    numCols?: number;
  };
  Blocks: {
    rowGeneric: [];
  };
  Element: HdsFormKeyValueInputsSignature['Element'];
}

export default class CodeFragmentWithGenericContent extends Component<CodeFragmentWithGenericContentSignature> {
  data: KvpItem[];
  numCols: number;

  constructor(
    owner: Owner,
    args: CodeFragmentWithGenericContentSignature['Args'],
  ) {
    super(owner, args);
    this.data = args.data ?? DEFAULT_DATA;
    this.numCols = args.numCols ?? 2;
  }

  <template>
    <HdsFormKeyValueInputs @isOptional={{@isOptional}} @data={{this.data}}>
      <:header as |H|>
        <H.Legend>Tags applied to this workspace</H.Legend>
        <H.HelperText>Use tags to correlate, organize or filter your resources
          using key-only or key/value pairs. You can add up to 3 tags per
          resource.</H.HelperText>
      </:header>

      <:row as |R|>
        <R.Field as |F|>
          <F.Label>Key</F.Label>
          <F.HelperText>The key you enter should be a good key.</F.HelperText>
          <F.TextInput @value={{R.rowData.key.text}} />
        </R.Field>

        {{#if (eq this.numCols 2)}}
          <R.Field as |F|>
            <F.Label>Value</F.Label>
            <F.TextInput @value={{R.rowData.value.text}} />
          </R.Field>
        {{/if}}

        <R.Generic>
          {{yield to="rowGeneric"}}
        </R.Generic>

        {{#unless (eq this.data.length 0)}}
          <R.DeleteRowButton />
        {{/unless}}
      </:row>

      <:footer as |F|>
        <F.AddRowButton />
      </:footer>
    </HdsFormKeyValueInputs>
  </template>
}
