/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { eq } from 'ember-truth-helpers';

import ShwDivider from 'showcase/components/shw/divider';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwPlaceholder from 'showcase/components/shw/placeholder';

import {
  HdsButton,
  HdsFormKeyValueInputs,
  HdsFormToggleField,
} from '@hashicorp/design-system-components/components';

import CodeFragmentWithGenericContent from 'showcase/components/page-components/form/key-value-inputs/code-fragments/with-generic-content';
import type { KvpItem } from 'showcase/components/page-components/form/key-value-inputs/code-fragments/with-generic-content';

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

const EMPTY_DATA = [] as KvpItem[];

const PROD_DATA = [
  {
    id: 1,
    key: {
      text: 'prod',
    },
    value: {
      text: 'production',
    },
  },
];

const PROD_DEV_DATA = [
  {
    id: 1,
    key: {
      text: 'prod',
    },
    value: {
      text: 'This is a production tag',
    },
  },
  {
    id: 2,
    key: {
      text: 'dev',
    },
    value: {
      text: 'This is a development tag',
    },
  },
];

const DATA_ARRAYS = [EMPTY_DATA, PROD_DATA, PROD_DEV_DATA];

const SubSectionContent: TemplateOnlyComponent = <template>
  <ShwTextH2>Content</ShwTextH2>

  <ShwTextH3><code>@data</code> argument</ShwTextH3>

  {{#each DATA_ARRAYS as |dataArray|}}
    <ShwTextH4>
      {{#if (eq dataArray.length 0)}}
        Empty array
      {{/if}}
      {{#if (eq dataArray.length 1)}}
        With 1 item in
        <code>@data</code>
        argument
      {{/if}}
      {{#if (eq dataArray.length 2)}}
        With 2 items in
        <code>@data</code>
        argument
      {{/if}}
    </ShwTextH4>

    <CodeFragmentWithGenericContent @data={{dataArray}}>
      <:rowGeneric>
        <ShwPlaceholder @height="36px" @width="200px" @text="generic" />
      </:rowGeneric>
    </CodeFragmentWithGenericContent>
  {{/each}}

  <ShwDivider @level={{2}} />

  <ShwTextH3>Columns</ShwTextH3>

  <ShwTextH4>2 columns</ShwTextH4>

  <CodeFragmentWithGenericContent @isOptional={{true}} />

  <ShwTextH4>1 column</ShwTextH4>

  <CodeFragmentWithGenericContent @isOptional={{true}} @numCols={{1}} />

  <ShwDivider @level={{2}} />

  <ShwTextH3>Generic slots</ShwTextH3>

  <ShwTextH4>With placeholders</ShwTextH4>

  <HdsFormKeyValueInputs @isOptional={{true}} @data={{DEFAULT_DATA}}>
    <:header as |H|>
      <H.Legend>Tags applied to this workspace</H.Legend>
      <H.HelperText>
        Use tags to correlate, organize or filter your resources using key-only
        or key/value pairs. You can add up to 3 tags per resource.
      </H.HelperText>
      <H.Generic>
        <ShwPlaceholder @height="36px" @text="generic" />
      </H.Generic>
    </:header>

    <:row as |R|>
      <R.Field @isRequired={{true}} as |F|>
        <F.Label>Key</F.Label>
        <F.HelperText>The key you enter should be a good key.</F.HelperText>
        <F.TextInput @value={{R.rowData.key.text}} />
      </R.Field>

      <R.Generic>
        <ShwPlaceholder @height="36px" @width="200px" @text="generic" />
      </R.Generic>

      <R.Field @isOptional={{true}} as |F|>
        <F.Label>Value</F.Label>
        <F.Textarea @value={{R.rowData.value.text}} />
      </R.Field>
      <R.DeleteRowButton />
      <R.Generic>
        <ShwPlaceholder @height="36px" @width="300px" @text="generic" />
      </R.Generic>
    </:row>

    <:footer as |F|>
      <F.AddRowButton @text="Add tag" />
    </:footer>
  </HdsFormKeyValueInputs>

  <ShwTextH4>With components</ShwTextH4>

  <HdsFormKeyValueInputs @isOptional={{true}} @data={{DEFAULT_DATA}}>
    <:header as |H|>
      <H.Legend>Tags applied to this workspace</H.Legend>
      <H.HelperText>
        Use tags to correlate, organize or filter your resources using key-only
        or key/value pairs. You can add up to 3 tags per resource.
      </H.HelperText>
      <H.Generic>
        <HdsButton @text="About tags" @color="tertiary" @icon="help" />
      </H.Generic>
    </:header>

    <:row as |R|>
      <R.Field @isRequired={{true}} as |F|>
        <F.Label>Key</F.Label>
        <F.HelperText>The key you enter should be a good key.</F.HelperText>
        <F.TextInput @value={{R.rowData.key.text}} />
      </R.Field>

      <R.Generic>
        <HdsFormToggleField as |F|>
          <F.Label>Enable in production</F.Label>
          <F.HelperText>Toggle this to enable the feature in production.</F.HelperText>
        </HdsFormToggleField>
      </R.Generic>
      <R.DeleteRowButton />
    </:row>

    <:footer as |F|>
      <F.Alert as |A|>
        <A.Description>
          You can only add up to 3 tags to this resource.
        </A.Description>
      </F.Alert>
    </:footer>
  </HdsFormKeyValueInputs>

  <ShwDivider />
</template>;

export default SubSectionContent;
