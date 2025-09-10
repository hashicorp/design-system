/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { eq } from 'ember-truth-helpers';
import { get } from '@ember/object';

import USERS from 'showcase/mocks/user-data';
import USERS_WITH_MORE_COLUMNS from 'showcase/mocks/user-with-more-columns-data';
import type { User } from 'showcase/mocks/user-data.ts';
import type { UserWithMoreColumns } from 'showcase/mocks/user-with-more-columns-data.ts';

import { HdsTable } from '@hashicorp/design-system-components/components';
import type { HdsTableSignature } from '@hashicorp/design-system-components/components/hds/table/index';

export interface CodeFragmentWithUsersDataSignature {
  Args: HdsTableSignature['Args'] & {
    dataSize?: 'small' | 'medium' | 'large';
    dataModel?: User[] | UserWithMoreColumns[];
  };
  Element: HTMLDivElement;
}

export default class CodeFragmentWithUsersData extends Component<CodeFragmentWithUsersDataSignature> {
  get dataModel(): User[] | UserWithMoreColumns[] {
    if (this.args.dataModel) {
      return this.args.dataModel;
    } else if (
      this.args.dataSize === 'large' ||
      this.args.dataSize === 'medium'
    ) {
      return USERS_WITH_MORE_COLUMNS;
    } else {
      return USERS;
    }
  }

  <template>
    <HdsTable
      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
      @model={{this.dataModel}}
      @columns={{@columns}}
      @isFixedLayout={{@isFixedLayout}}
      @isSelectable={{@isSelectable}}
      @onSelectionChange={{@onSelectionChange}}
    >
      <:body as |B|>
        <B.Tr
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          @selectionKey="{{B.data.id}}"
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          @isSelected={{if B.data.isSelected true false}}
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          @selectionAriaLabelSuffix="row #{{B.data.lorem}}"
        >
          {{#if (eq @dataSize "large")}}
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.first_name}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.last_name}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td @align="right">{{B.data.age}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.email}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.phone}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.bio}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.education}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.occupation}}</B.Td>
          {{else if (eq @dataSize "medium")}}
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.first_name}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.last_name}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td @align="right">{{B.data.age}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.email}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.bio}}</B.Td>
          {{else}}
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.id}}</B.Td>
            <B.Td>
              <span
                class={{if
                  (get B.data "isAnimated")
                  "shw-component-table-animate-user"
                }}
                {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
              >{{B.data.name}}</span>
            </B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.email}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.role}}</B.Td>
          {{/if}}
        </B.Tr>
      </:body>
    </HdsTable>
  </template>
}
