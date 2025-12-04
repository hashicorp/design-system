/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import ShwPlaceholder from 'showcase/components/shw/placeholder';

import USERS from 'showcase/mocks/user-data';

import { HdsAdvancedTable } from '@hashicorp/design-system-components/components';

export const DEFAULT_COLUMNS = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
];

export interface CodeFragmentWithEmptyStateSignature {
  Args: {
    customEmptyState?: boolean;
  };
  Element: HTMLDivElement;
}

export default class CodeFragmentWithEmptyState extends Component<CodeFragmentWithEmptyStateSignature> {
  model = USERS.slice(0, 4);

  <template>
    {{#if @customEmptyState}}
      <HdsAdvancedTable
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @model={{this.model}}
        @columns={{DEFAULT_COLUMNS}}
        @maxHeight="400px"
        @isEmpty={{true}}
      >
        <:emptyState>
          <ShwPlaceholder
            @text="Custom empty state content"
            @width="300"
            @height="50"
          />
        </:emptyState>
      </HdsAdvancedTable>
    {{else}}
      <HdsAdvancedTable
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @model={{this.model}}
        @columns={{DEFAULT_COLUMNS}}
        @maxHeight="400px"
        @isEmpty={{true}}
      />
    {{/if}}
  </template>
}
