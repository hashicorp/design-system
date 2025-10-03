/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import style from 'ember-style-modifier';

import ShwPlaceholder from 'showcase/components/shw/placeholder';

import { HdsFormKeyValueInputs } from '@hashicorp/design-system-components/components';

const DEFAULT_DATA = [
  {
    key: 'prod',
    value: 'This is a production tag',
    error: 'This is an error message',
  },
  {
    key: 'enterprise',
    value: '',
  },
  {
    key: 'beta',
    value: 'Feature includes beta',
    error: 'This is an error message',
  },
];

const FramelessDemoResponsiveness: TemplateOnlyComponent = <template>
  {{pageTitle "KeyValueInputs responsiveness demo - Frameless"}}

  <div {{style padding="24px"}}>
    <HdsFormKeyValueInputs @isOptional={{true}} @data={{DEFAULT_DATA}}>
      <:header as |H|>
        <H.Legend>Tags applied to this workspace</H.Legend>
        <H.HelperText>
          Use tags to correlate, organize or filter your resources using
          key-only or key/value pairs. You can add up to 3 tags per resource.
        </H.HelperText>
        <H.Generic>
          <ShwPlaceholder @height="36px" @text="generic" />
        </H.Generic>
      </:header>

      <:row as |R|>
        <R.Field @isInvalid={{(if R.rowData.error true)}} as |F|>
          <F.Label>Key</F.Label>
          <F.HelperText>The key you enter should be a good key.</F.HelperText>
          <F.TextInput @value={{R.rowData.key}} />
          {{#if R.rowData.error}}
            <F.Error>{{R.rowData.error}}</F.Error>
          {{/if}}
        </R.Field>
        <R.Field @isInvalid={{(if R.rowData.error true)}} as |F|>
          <F.Label>Value</F.Label>
          <F.Textarea @value={{R.rowData.value}} />
          {{#if R.rowData.error}}
            <F.Error>{{R.rowData.error}}</F.Error>
          {{/if}}
        </R.Field>
        <R.Generic>
          <ShwPlaceholder @height="36px" @width="200px" @text="generic" />
        </R.Generic>
        <R.DeleteRowButton />
      </:row>

      <:footer as |F|>
        <F.Alert as |A|>
          <A.Description>
            Sample alert content.
          </A.Description>
        </F.Alert>
      </:footer>
    </HdsFormKeyValueInputs>
  </div>
</template>;

export default FramelessDemoResponsiveness;
