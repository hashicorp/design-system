/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { eq, or } from 'ember-truth-helpers';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import { HdsFormKeyValueInputs } from '@hashicorp/design-system-components/components';

const EMPTY_DATA = [] as unknown[];

const COMBINATIONS = [
  {
    key: 'add',
    label: 'With add button',
  },
  {
    key: 'alert',
    label: 'With alert',
  },
  {
    key: 'alert+add',
    label: 'With alert and add button',
  },
  {
    key: 'add+error',
    label: 'With add button and error',
  },
  {
    key: 'alert+error',
    label: 'With alert and error',
  },
  {
    key: 'alert+add+error',
    label: 'With alert and add button and error',
  },
];

const SubSectionFooter: TemplateOnlyComponent = <template>
  <ShwTextH3>Footer</ShwTextH3>

  <ShwFlex @direction="column" @gap="3rem" as |SF|>
    {{#each COMBINATIONS as |combination|}}
      <SF.Item @label={{combination.label}}>
        <HdsFormKeyValueInputs @data={{EMPTY_DATA}}>
          <:row as |R|>
            <R.Field as |F|>
              <F.Label>Key</F.Label>
              <F.TextInput />
            </R.Field>
            <R.Field as |F|>
              <F.Label>Value</F.Label>
              <F.TextInput />
            </R.Field>
            <R.DeleteRowButton />
          </:row>
          <:footer as |F|>
            {{#if
              (or
                (eq combination.key "add")
                (eq combination.key "alert+add")
                (eq combination.key "add+error")
                (eq combination.key "alert+add+error")
              )
            }}
              <F.AddRowButton />
            {{/if}}
            {{#if
              (or
                (eq combination.key "alert")
                (eq combination.key "alert+add")
                (eq combination.key "alert+error")
                (eq combination.key "alert+add+error")
              )
            }}
              <F.Alert as |A|>
                <A.Description>This is the alert description.</A.Description>
              </F.Alert>
            {{/if}}
            {{#if
              (or
                (eq combination.key "error")
                (eq combination.key "add+error")
                (eq combination.key "alert+error")
                (eq combination.key "alert+add+error")
              )
            }}
              <F.Error>This is the error message.</F.Error>
            {{/if}}
          </:footer>
        </HdsFormKeyValueInputs>
      </SF.Item>
    {{/each}}
  </ShwFlex>

  <ShwDivider />
</template>;

export default SubSectionFooter;
