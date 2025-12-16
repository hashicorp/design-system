/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import type { FolkMusic } from 'showcase/mocks/folk-music-data';
import ShwPlaceholder from 'showcase/components/shw/placeholder';

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

const EMPTY_MODEL: FolkMusic[] = [];

const CodeFragmentWithEmptyState: TemplateOnlyComponent<CodeFragmentWithEmptyStateSignature> =
  <template>
    {{#if @customEmptyState}}
      <HdsAdvancedTable
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @model={{EMPTY_MODEL}}
        @columns={{DEFAULT_COLUMNS}}
        @maxHeight="400px"
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
        @model={{EMPTY_MODEL}}
        @columns={{DEFAULT_COLUMNS}}
        @maxHeight="400px"
      />
    {{/if}}
  </template>;

export default CodeFragmentWithEmptyState;
