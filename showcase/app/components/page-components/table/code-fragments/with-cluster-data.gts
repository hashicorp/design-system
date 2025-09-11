/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { get } from '@ember/helper';
import { eq } from 'ember-truth-helpers';

import CLUSTERS from 'showcase/mocks/cluster-data';

import {
  HdsBadge,
  HdsDropdown,
  HdsTable,
} from '@hashicorp/design-system-components/components';
import type { HdsTableSignature } from '@hashicorp/design-system-components/components/hds/table/index';

export interface CodeFragmentWithClusterDataSignature {
  Args: HdsTableSignature['Args'] & {
    extraData?: boolean;
  };
  Element: HTMLDivElement;
}

const CUSTOM_SORTING_CRITERIA = [
  'failing',
  'active',
  'establishing',
  'pending',
];

const CLUSTERS_WITH_EXTRA_DATA = CLUSTERS.map((record) => {
  return {
    ...record,
    'status-sort-order': CUSTOM_SORTING_CRITERIA.indexOf(record['status']),
  };
});

const CodeFragmentWithClusterData: TemplateOnlyComponent<CodeFragmentWithClusterDataSignature> =
  <template>
    <HdsTable
      {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
      @model={{if @extraData CLUSTERS_WITH_EXTRA_DATA CLUSTERS}}
      @columns={{@columns}}
      @sortBy={{@sortBy}}
      @sortOrder={{@sortOrder}}
      @onSort={{@onSort}}
    >
      <:body as |B|>
        <B.Tr>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.peer-name}}</B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.cluster-partition}}</B.Td>
          <B.Td>
            {{#if (eq (get B.data "status") "failing")}}
              <HdsBadge
                @text="Failing"
                @color="critical"
                @icon="x"
                @type="outlined"
              />
            {{else if (eq (get B.data "status") "active")}}
              <HdsBadge
                @text="Active"
                @color="success"
                @icon="check"
                @type="outlined"
              />
            {{else if (eq (get B.data "status") "pending")}}
              <HdsBadge
                @text="Pending"
                @color="neutral"
                @icon="loading"
                @type="outlined"
              />
            {{else if (eq (get B.data "status") "establishing")}}
              <HdsBadge
                @text="Establishing"
                @color="highlight"
                @icon="loading"
                @type="outlined"
              />
            {{/if}}
          </B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.services.imported}}</B.Td>
          {{! @glint-expect-error - will be fixed by https://hashicorp.atlassian.net/browse/HDS-5090}}
          <B.Td>{{B.data.services.exported}}</B.Td>
          <B.Td @align="right">
            <HdsDropdown @isInline={{true}} as |dd|>
              <dd.ToggleIcon
                @icon="more-horizontal"
                @text="Overflow Options"
                @hasChevron={{false}}
                @size="small"
              />
              <dd.Interactive
                @route="page-components.table"
              >Create</dd.Interactive>
              <dd.Interactive
                @route="page-components.table"
              >Read</dd.Interactive>
              <dd.Interactive
                @route="page-components.table"
              >Update</dd.Interactive>
              <dd.Separator />
              <dd.Interactive
                @route="page-components.table"
                @color="critical"
                @icon="trash"
              >Delete</dd.Interactive>
            </HdsDropdown>
          </B.Td>
        </B.Tr>
      </:body>
    </HdsTable>
  </template>;

export default CodeFragmentWithClusterData;
