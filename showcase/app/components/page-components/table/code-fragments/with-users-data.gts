/**
 * Copyright IBM Corp. 2021, 2025
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
  Args: {
    dataSize?: 'small' | 'medium' | 'large';
    model?: User[] | UserWithMoreColumns[];
    columns: HdsTableSignature['Args']['columns'];
    isFixedLayout?: HdsTableSignature['Args']['isFixedLayout'];
    isSelectable?: HdsTableSignature['Args']['isSelectable'];
    onSelectionChange?: HdsTableSignature['Args']['onSelectionChange'];
  };
  Element: HTMLDivElement;
}

export default class CodeFragmentWithUsersData extends Component<CodeFragmentWithUsersDataSignature> {
  get dataSize(): 'small' | 'medium' | 'large' {
    return this.args.dataSize ?? 'medium';
  }

  get usersModel(): User[] {
    if (this.args.model != undefined) {
      return this.args.model as User[];
    } else {
      return USERS;
    }
  }

  get usersWithMoreColumnsModel(): UserWithMoreColumns[] {
    if (this.args.model != undefined) {
      return this.args.model as UserWithMoreColumns[];
    } else {
      return USERS_WITH_MORE_COLUMNS;
    }
  }

  <template>
    {{#if (eq this.dataSize "small")}}
      <HdsTable
        @model={{this.usersModel}}
        @columns={{@columns}}
        @isFixedLayout={{@isFixedLayout}}
        @isSelectable={{@isSelectable}}
        @onSelectionChange={{@onSelectionChange}}
      >
        <:body as |B|>
          <B.Tr
            @selectionKey="{{B.data.id}}"
            @isSelected={{if B.data.isSelected true false}}
            @selectionAriaLabelSuffix="row #{{B.data.id}}"
          >
            <B.Td>{{B.data.id}}</B.Td>
            <B.Td>
              <span
                class={{if
                  (get B.data "isAnimated")
                  "shw-component-table-animate-user"
                }}
              >{{B.data.name}}</span>
            </B.Td>
            <B.Td>{{B.data.email}}</B.Td>
            <B.Td>{{B.data.role}}</B.Td>
          </B.Tr>
        </:body>
      </HdsTable>
    {{else}}
      <HdsTable
        @model={{this.usersWithMoreColumnsModel}}
        @columns={{@columns}}
        @isFixedLayout={{@isFixedLayout}}
      >
        <:body as |B|>
          <B.Tr>
            {{#if (eq this.dataSize "large")}}
              <B.Td>{{B.data.first_name}}</B.Td>
              <B.Td>{{B.data.last_name}}</B.Td>
              <B.Td @align="right">{{B.data.age}}</B.Td>
              <B.Td>{{B.data.email}}</B.Td>
              <B.Td>{{B.data.phone}}</B.Td>
              <B.Td>{{B.data.bio}}</B.Td>
              <B.Td>{{B.data.education}}</B.Td>
              <B.Td>{{B.data.occupation}}</B.Td>
            {{else}}
              <B.Td>{{B.data.first_name}}</B.Td>
              <B.Td>{{B.data.last_name}}</B.Td>
              <B.Td @align="right">{{B.data.age}}</B.Td>
              <B.Td>{{B.data.email}}</B.Td>
              <B.Td>{{B.data.bio}}</B.Td>
            {{/if}}
          </B.Tr>
        </:body>
      </HdsTable>
    {{/if}}
  </template>
}
