/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { deepTracked } from 'ember-deep-tracked';
// import { get } from '@ember/helper';

// HDS components
import {
  HdsAdvancedTable,
  // HdsLinkInline,
  // HdsButton,
  // HdsBadge,
  HdsBadgeColorValues,
  type HdsAdvancedTableOnSelectionChangeSignature,
} from '@hashicorp/design-system-components/components';

import type { HdsAdvancedTableSignature } from '@hashicorp/design-system-components/components/hds/advanced-table/index';

export interface MockAppMainGenericAdvancedTableSignature {
  // Args: {};
  Element: HTMLDivElement;
}

const SAMPLE_COLUMNS = [
  {
    isSortable: true,
    label: 'Name',
    key: 'name',
  },
  {
    label: 'Project name',
    key: 'project-name',
    isSortable: true,
  },
  {
    label: 'Current run ID',
    key: 'current-run-id',
    isSortable: true,
  },
  {
    label: 'Run status',
    key: 'run-status',
    isSortable: true,
  },
  {
    label: 'Current run applied',
    key: 'current-run-applied',
    isSortable: true,
  },
  {
    label: 'VCS repo',
    key: 'vcs-repo',
    isSortable: true,
  },
  {
    label: 'Module count',
    key: 'module-count',
    isSortable: true,
  },
  {
    label: 'Modules',
    key: 'modules',
    isSortable: true,
  },
  {
    label: 'Provider count',
    key: 'provider-count',
    isSortable: true,
  },
  {
    label: 'Providers',
    key: 'providers',
    isSortable: true,
  },
  {
    label: 'Terraform version',
    key: 'terraform-version',
    isSortable: true,
  },
  {
    label: 'State terraform version',
    key: 'state-terraform-version',
    isSortable: true,
  },
  {
    label: 'Created',
    key: 'created',
    isSortable: true,
  },
  {
    label: 'Updated',
    key: 'updated',
    isSortable: true,
  },
];

const SAMPLE_MODEL = [
  {
    name: 'zoguve-guw-mannaz',
    'project-name': 'do uk guzvas',
    'current-run-id': 'run-0Yks9WCFeD9xRTWo',
    'run-status': 'errored',
    'run-status-color': HdsBadgeColorValues.Critical,
    'current-run-applied': 'Mar 06, 2025 09:10:14 am',
    'vcs-repo': 'example/a))!hzfpKcBl0',
    'module-count': 46,
    modules: 'wad-bedzeaje-rogmejca',
    'provider-count': 118,
    providers: 'susnup-da-zuw',
    'terraform-version': '0.14.0',
    'state-terraform-version': '0.15.0',
    created: 'Mar 6 2025',
    updated: 'Mar 6 2025',
  },
  {
    name: 'ce-pojzu-dape',
    'project-name': 'ga vujlis de',
    'current-run-id': 'run-1Yks9WCFeD9xRTWo',
    'run-status': 'applied',
    'run-status-color': HdsBadgeColorValues.Success,
    'current-run-applied': 'Mar 06, 2025 09:09:14 am',
    'vcs-repo': 'example/tp7Xe!mDHlI[70ZO1',
    'module-count': 152,
    modules: 'wad-bedzeaje-rogmejca',
    'provider-count': 27,
    providers: 'susnup-da-zuw',
    'terraform-version': '0.14.0',
    'state-terraform-version': '0.15.0',
    created: 'Mar 5 2025',
    updated: 'Mar 5 2025',
  },
  {
    name: 'tehmi-wudvakhe-ve',
    'project-name': 'jize perori gu',
    'current-run-id': 'run-2Yks9WCFeD9xRTWo',
    'run-status': 'applied',
    'run-status-color': HdsBadgeColorValues.Success,
    'current-run-applied': 'Mar 06, 2025 09:08:14 am',
    'vcs-repo': 'example/sClKKTBbyCIzf@d8NxH2',
    'module-count': 31,
    modules: 'wad-bedzeaje-rogmejca',
    'provider-count': 42,
    providers: 'susnup-da-zuw',
    'terraform-version': '0.14.0',
    'state-terraform-version': '0.15.0',
    created: 'Mar 4 2025',
    updated: 'Mar 4 2025',
  },
];

const updateModelWithSelectAllState = (
  modelData: HdsAdvancedTableSignature['Args']['model'],
  selectAllState: boolean
) => {
  modelData.forEach((modelRow) => {
    modelRow['isSelected'] = selectAllState;
  });
};

const updateModelWithSelectableRowsStates = (
  modelData: HdsAdvancedTableSignature['Args']['model'],
  selectableRowsStates: HdsAdvancedTableOnSelectionChangeSignature['selectableRowsStates']
) => {
  const modelDataMap = new Map(
    modelData.map((modelRow) => [modelRow['id'], modelRow])
  );
  selectableRowsStates.forEach((row) => {
    // safe to assume that there is always a record for the "selectionKey" since it's coming from the model (the selectable "rows" are a subset of the model dataset)
    const rowFromModel = modelDataMap.get(row.selectionKey);
    if (rowFromModel) {
      rowFromModel['isSelected'] = row.isSelected;
    }
  });
};

export default class MockAppMainGenericAdvancedTable extends Component<MockAppMainGenericAdvancedTableSignature> {
  demoColumns = SAMPLE_COLUMNS;
  @deepTracked demoModel: HdsAdvancedTableSignature['Args']['model'] = [
    ...SAMPLE_MODEL,
  ];

  @action onSelectionChange({
    selectionKey,
    selectionCheckboxElement,
    selectableRowsStates,
  }: HdsAdvancedTableOnSelectionChangeSignature) {
    console.log(...arguments);

    if (selectionKey === 'all' && this.demoModel) {
      const state = selectionCheckboxElement
        ? selectionCheckboxElement.checked
        : false;

      updateModelWithSelectAllState(this.demoModel, state);
    } else {
      updateModelWithSelectableRowsStates(this.demoModel, selectableRowsStates);
    }
  }

  <template>
    <div class="mock-app-main-generic-text-content">
      <HdsAdvancedTable
        @columns={{this.demoColumns}}
        @model={{this.demoModel}}
        @hasStickyHeader={{true}}
        @isSelectable={{true}}
        @isStriped={{true}}
        @onSelectionChange={{this.onSelectionChange}}
      >
        <:body as |B|>
          <B.Tr
            @selectionKey="foo"
            {{!-- @selectionKey={{get B.data }} --}}
            {{!-- @selectionAriaLabelSuffix="row #{{B.data.id}}" --}}
          >
            <B.Th>
              {{!-- {{(get B.data "name")}} --}}
            </B.Th>
            <B.Td />
            <B.Td />
            <B.Td>
              {{! <HdsBadge /> }}
            </B.Td>
            <B.Td />
            <B.Td />
            <B.Td />
            <B.Td />
            <B.Td />
            <B.Td />
            <B.Td />
            <B.Td />
            <B.Td />
            <B.Td />
          </B.Tr>
        </:body>
      </HdsAdvancedTable>
    </div>
  </template>
}
