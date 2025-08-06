/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array, hash } from '@ember/helper';

import { HdsAdvancedTable } from '@hashicorp/design-system-components/components';

import userData from 'showcase/mocks/user-data';

export interface AdvancedTableStickySignature {
  Args: {
    isSelectable?: boolean;
    hasStickyFirstColumn?: boolean;
    hasStickyHeader?: boolean;
  };
  Element: HTMLDivElement;
}

const AdvancedTableSticky: TemplateOnlyComponent<AdvancedTableStickySignature> =
  <template>
    <div
      class="{{if
          @hasStickyFirstColumn
          'shw-component-advanced-table-fixed-width-wrapper'
        }}"
    >
      <HdsAdvancedTable
        @isSelectable={{@isSelectable}}
        @maxHeight="400px"
        @isStriped={{true}}
        @hasStickyFirstColumn={{@hasStickyFirstColumn}}
        @hasStickyHeader={{@hasStickyHeader}}
        {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
        @model={{userData}}
        @columns={{array
          (hash key="id" label="ID")
          (hash key="name" label="Name")
          (hash key="email" label="Email")
          (hash key="role" label="Role")
        }}
      >
        <:body as |B|>
          <B.Tr
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            @selectionKey="{{B.data.id}}"
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            @isSelected={{B.data.isSelected}}
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            @selectionAriaLabelSuffix="row #{{B.data.id}}"
          >
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Th @scope="row">{{B.data.id}}</B.Th>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.name}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.email}}</B.Td>
            {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
            <B.Td>{{B.data.role}}</B.Td>
          </B.Tr>
        </:body>
      </HdsAdvancedTable>
    </div>
  </template>;

export default AdvancedTableSticky;
