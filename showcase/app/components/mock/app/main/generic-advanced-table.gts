/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { deepTracked } from 'ember-deep-tracked';
import { get } from '@ember/helper';

// HDS components
import {
  HdsAdvancedTable,
  HdsLinkInline,
  HdsBadge,
  HdsBadgeColorValues,
  type HdsAdvancedTableOnSelectionChangeSignature,
} from '@hashicorp/design-system-components/components';

import type { HdsAdvancedTableSignature } from '@hashicorp/design-system-components/components/hds/advanced-table/index';

export interface MockAppMainGenericAdvancedTableSignature {
  Element: HTMLDivElement;
}

const SAMPLE_COLUMNS = [
  {
    isSortable: true,
    label: 'Name',
    key: 'name',
    width: 'max-content',
  },
  {
    label: 'Project name',
    key: 'project-name',
    isSortable: true,
    width: 'max-content',
  },
  {
    label: 'Current run ID',
    key: 'current-run-id',
    isSortable: true,
    width: 'max-content',
  },
  {
    label: 'Run status',
    key: 'run-status',
    isSortable: true,
    width: 'max-content',
  },
  {
    label: 'Current run applied',
    key: 'current-run-applied',
    isSortable: true,
    width: 'max-content',
  },
  {
    label: 'VCS repo',
    key: 'vcs-repo',
    isSortable: true,
    width: 'max-content',
  },
  {
    label: 'Module count',
    key: 'module-count',
    isSortable: true,
    width: 'max-content',
  },
  {
    label: 'Modules',
    key: 'modules',
    isSortable: true,
    width: 'max-content',
  },
  {
    label: 'Provider count',
    key: 'provider-count',
    isSortable: true,
    width: 'max-content',
  },
  {
    label: 'Providers',
    key: 'providers',
    isSortable: true,
    width: 'max-content',
  },
  {
    label: 'Terraform version',
    key: 'terraform-version',
    isSortable: true,
    width: 'max-content',
  },
  {
    label: 'State terraform version',
    key: 'state-terraform-version',
    isSortable: true,
    width: 'max-content',
  },
  {
    label: 'Created',
    key: 'created',
    isSortable: true,
    width: 'max-content',
  },
  {
    label: 'Updated',
    key: 'updated',
    isSortable: true,
    width: 'max-content',
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
  {
    name: 'awudulnak-jebtafcel-ruadeim',
    'project-name': 'jokbopu vipsu umbi',
    'current-run-id': 'run-3Yks9WCFeD9xRTWo',
    'run-status': 'planned',
    'run-status-color': HdsBadgeColorValues.Warning,
    'current-run-applied': 'Mar 06, 2025 09:07:14 am',
    'vcs-repo': 'example/y0^(Nm*63',
    'module-count': 58,
    modules: 'wad-bedzeaje-rogmejca',
    'provider-count': 140,
    providers: 'susnup-da-zuw',
    'terraform-version': '0.14.0',
    'state-terraform-version': '0.15.0',
    created: 'Mar 3 2025',
    updated: 'Mar 3 2025',
  },
  {
    name: 'ma-guz-vomfa',
    'project-name': 'avjusfoj lihijor kailoluh',
    'current-run-id': 'run-4Yks9WCFeD9xRTWo',
    'run-status': 'applied',
    'run-status-color': HdsBadgeColorValues.Success,
    'current-run-applied': 'Mar 06, 2025 09:06:14 am',
    'vcs-repo': 'example/ljPWe[4',
    'module-count': 32,
    modules: 'wad-bedzeaje-rogmejca',
    'provider-count': 50,
    providers: 'susnup-da-zuw',
    'terraform-version': '0.14.0',
    'state-terraform-version': '0.15.0',
    created: 'Mar 2 2025',
    updated: 'Mar 2 2025',
  },
  {
    name: 'empe-zewik-gazofe',
    'project-name': 'su ja keosus',
    'current-run-id': 'run-5Yks9WCFeD9xRTWo',
    'run-status': 'errored',
    'run-status-color': HdsBadgeColorValues.Critical,
    'current-run-applied': 'Mar 06, 2025 09:05:14 am',
    'vcs-repo': 'example/E*fcS4mn@BoDgZu0O5',
    'module-count': 94,
    modules: 'wad-bedzeaje-rogmejca',
    'provider-count': 113,
    providers: 'susnup-da-zuw',
    'terraform-version': '0.14.0',
    'state-terraform-version': '0.15.0',
    created: 'Mar 1 2025',
    updated: 'Mar 1 2025',
  },
  {
    name: 'indow-suuhi-co',
    'project-name': 'kic nuva wif',
    'current-run-id': 'run-5Yks9WCFeD9xRTWo',
    'run-status': 'applied',
    'run-status-color': HdsBadgeColorValues.Success,
    'current-run-applied': 'Mar 06, 2025 09:04:14 am',
    'vcs-repo': 'example/&j[RmmtjpQX6',
    'module-count': 117,
    modules: 'wad-bedzeaje-rogmejca',
    'provider-count': 80,
    providers: 'susnup-da-zuw',
    'terraform-version': '0.14.0',
    'state-terraform-version': '0.15.0',
    created: 'Feb 28 2025',
    updated: 'Feb 28 2025',
  },
  {
    name: 'kitobi-okaopuaja-civna',
    'project-name': 'tamigeki iwe isnetpi',
    'current-run-id': 'run-7Yks9WCFeD9xRTWo',
    'run-status': 'errored',
    'run-status-color': HdsBadgeColorValues.Critical,
    'current-run-applied': 'Mar 06, 2025 09:03:14 am',
    'vcs-repo': 'example/(DCFjSEKcBuU44J8AB87',
    'module-count': 114,
    modules: 'wad-bedzeaje-rogmejca',
    'provider-count': 107,
    providers: 'susnup-da-zuw',
    'terraform-version': '0.14.0',
    'state-terraform-version': '0.15.0',
    created: 'Feb 27 2025',
    updated: 'Feb 27 2025',
  },
  {
    name: 'cos-rekcepfih-dedwez',
    'project-name': 'jigemtu kutnim pohwi',
    'current-run-id': 'run-8Yks9WCFeD9xRTWo',
    'run-status': 'planned',
    'run-status-color': HdsBadgeColorValues.Warning,
    'current-run-applied': 'Mar 06, 2025 09:02:14 am',
    'vcs-repo': 'example/9YURY8',
    'module-count': 106,
    modules: 'wad-bedzeaje-rogmejca',
    'provider-count': 185,
    providers: 'susnup-da-zuw',
    'terraform-version': '0.14.0',
    'state-terraform-version': '0.15.0',
    created: 'Feb 26 2025',
    updated: 'Feb 26 2025',
  },
  {
    name: 'pe-fo-oj',
    'project-name': 'wirbidjic ow akasa',
    'current-run-id': 'run-9Yks9WCFeD9xRTWo',
    'run-status': 'errored',
    'run-status-color': HdsBadgeColorValues.Critical,
    'current-run-applied': 'Mar 06, 2025 09:01:14 am',
    'vcs-repo': 'example/9YURY8',
    'module-count': 124,
    modules: 'wad-bedzeaje-rogmejca',
    'provider-count': 175,
    providers: 'susnup-da-zuw',
    'terraform-version': '0.14.0',
    'state-terraform-version': '0.15.0',
    created: 'Feb 25 2025',
    updated: 'Feb 25 2025',
  },
  {
    name: 'ti-gecruw-bob',
    'project-name': 'acamo almov ke',
    'current-run-id': 'run-10Yks9WCFeD9xRTWo',
    'run-status': 'applied',
    'run-status-color': HdsBadgeColorValues.Success,
    'current-run-applied': 'Mar 06, 2025 09:00:14 am',
    'vcs-repo': 'example/d2s3B46I10',
    'module-count': 70,
    modules: 'wad-bedzeaje-rogmejca',
    'provider-count': 168,
    providers: 'susnup-da-zuw',
    'terraform-version': '0.14.0',
    'state-terraform-version': '0.15.0',
    created: 'Feb 24 2025',
    updated: 'Feb 24 2025',
  },
  {
    name: 'ti-gecruw-bob',
    'project-name': 'acamo almov ke',
    'current-run-id': 'run-10Yks9WCFeD9xRTWo',
    'run-status': 'applied',
    'run-status-color': HdsBadgeColorValues.Success,
    'current-run-applied': 'Mar 06, 2025 09:00:14 am',
    'vcs-repo': 'example/d2s3B46I10',
    'module-count': 70,
    modules: 'wad-bedzeaje-rogmejca',
    'provider-count': 168,
    providers: 'susnup-da-zuw',
    'terraform-version': '0.14.0',
    'state-terraform-version': '0.15.0',
    created: 'Feb 23 2025',
    updated: 'Feb 23 2025',
  },
  {
    name: 'besakve-mezlevwa-aw',
    'project-name': 'do ukate galtem',
    'current-run-id': 'run-11Yks9WCFeD9xRTWo',
    'run-status': 'errored',
    'run-status-color': HdsBadgeColorValues.Critical,
    'current-run-applied': 'Mar 06, 2025 08:59:14 am',
    'vcs-repo': 'example/v@C6&hBTou11',
    'module-count': 106,
    modules: 'wad-bedzeaje-rogmejca',
    'provider-count': 61,
    providers: 'susnup-da-zuw',
    'terraform-version': '0.14.0',
    'state-terraform-version': '0.15.0',
    created: 'Feb 22 2025',
    updated: 'Feb 22 2025',
  },
  {
    name: 'no-jitwat-awsulnu',
    'project-name': 'tipa ubidu oh',
    'current-run-id': 'run-12Yks9WCFeD9xRTWo',
    'run-status': 'applied',
    'run-status-color': HdsBadgeColorValues.Success,
    'current-run-applied': 'Mar 06, 2025 08:58:14 am',
    'vcs-repo': 'example/@t23^12',
    'module-count': 14,
    modules: 'wad-bedzeaje-rogmejca',
    'provider-count': 143,
    providers: 'susnup-da-zuw',
    'terraform-version': '0.14.0',
    'state-terraform-version': '0.15.0',
    created: 'Feb 21 2025',
    updated: 'Feb 21 2025',
  },
  {
    name: 'sefnut-suju-vakunaj',
    'project-name': 'wumenho ful decre',
    'current-run-id': 'run-13Yks9WCFeD9xRTWo',
    'run-status': 'planned',
    'run-status-color': HdsBadgeColorValues.Warning,
    'current-run-applied': 'Mar 06, 2025 08:58:14 am',
    'vcs-repo': 'example/@t23^12',
    'module-count': 14,
    modules: 'wad-bedzeaje-rogmejca',
    'provider-count': 143,
    providers: 'susnup-da-zuw',
    'terraform-version': '0.14.0',
    'state-terraform-version': '0.15.0',
    created: 'Feb 20 2025',
    updated: 'Feb 20 2025',
  },
  {
    name: 'oveso-sagcein-renjuli',
    'project-name': 'sesac duheceul ufeesafem',
    'current-run-id': 'run-14Yks9WCFeD9xRTWo',
    'run-status': 'errored',
    'run-status-color': HdsBadgeColorValues.Critical,
    'current-run-applied': 'Mar 06, 2025 08:57:14 am',
    'vcs-repo': 'example/JUha^7zr14',
    'module-count': 114,
    modules: 'wad-bedzeaje-rogmejca',
    'provider-count': 98,
    providers: 'susnup-da-zuw',
    'terraform-version': '0.14.0',
    'state-terraform-version': '0.15.0',
    created: 'Feb 19 2025',
    updated: 'Feb 19 2025',
  },
  {
    name: 'usitod-ve-citibmam',
    'project-name': 'la ha kadosso',
    'current-run-id': 'run-15Yks9WCFeD9xRTWo',
    'run-status': 'applied',
    'run-status-color': HdsBadgeColorValues.Success,
    'current-run-applied': 'Mar 06, 2025 08:56:14 am',
    'vcs-repo': 'example/JUha^7zr14',
    'module-count': 99,
    modules: 'wad-bedzeaje-rogmejca',
    'provider-count': 170,
    providers: 'susnup-da-zuw',
    'terraform-version': '0.14.0',
    'state-terraform-version': '0.15.0',
    created: 'Feb 18 2025',
    updated: 'Feb 18 2025',
  },
  {
    name: 'ko-dozuba-gukum',
    'project-name': 'betrodjar gogwopel lonnege',
    'current-run-id': 'run-16Yks9WCFeD9xRTWo',
    'run-status': 'planned',
    'run-status-color': HdsBadgeColorValues.Warning,
    'current-run-applied': 'Mar 06, 2025 08:57:14 am',
    'vcs-repo': 'example/t*vN3@*BxJnG116',
    'module-count': 139,
    modules: 'wad-bedzeaje-rogmejca',
    'provider-count': 170,
    providers: 'susnup-da-zuw',
    'terraform-version': '0.14.0',
    'state-terraform-version': '0.15.0',
    created: 'Feb 17 2025',
    updated: 'Feb 17 2025',
  },
  {
    name: 'fo-liszod-wokiso',
    'project-name': 'robagbof lim fowog',
    'current-run-id': 'run-17Yks9WCFeD9xRTWo',
    'run-status': 'planned',
    'run-status-color': HdsBadgeColorValues.Warning,
    'current-run-applied': 'Mar 06, 2025 08:57:14 am',
    'vcs-repo': 'example/8G3C81*u*q*O$17',
    'module-count': 107,
    modules: 'wad-bedzeaje-rogmejca',
    'provider-count': 83,
    providers: 'susnup-da-zuw',
    'terraform-version': '0.14.0',
    'state-terraform-version': '0.15.0',
    created: 'Feb 16 2025',
    updated: 'Feb 16 2025',
  },
  {
    name: 'taju-ewefir-novawnej',
    'project-name': 'le juzasri ni',
    'current-run-id': 'run-18Yks9WCFeD9xRTWo',
    'run-status': 'errored',
    'run-status-color': HdsBadgeColorValues.Critical,
    'current-run-applied': 'Mar 06, 2025 08:56:14 am',
    'vcs-repo': 'example/gt]5*c!N1*N%I!m)18',
    'module-count': 80,
    modules: 'wad-bedzeaje-rogmejca',
    'provider-count': 152,
    providers: 'susnup-da-zuw',
    'terraform-version': '0.14.0',
    'state-terraform-version': '0.15.0',
    created: 'Feb 15 2025',
    updated: 'Feb 15 2025',
  },
  {
    name: 'fu-ip-ta',
    'project-name': 'ca reba be',
    'current-run-id': 'run-19Yks9WCFeD9xRTWo',
    'run-status': 'applied',
    'run-status-color': HdsBadgeColorValues.Success,
    'current-run-applied': 'Mar 06, 2025 08:57:14 am',
    'vcs-repo': 'example/gt]5*c!N1*N%I!m)18',
    'module-count': 158,
    modules: 'wad-bedzeaje-rogmejca',
    'provider-count': 11,
    providers: 'susnup-da-zuw',
    'terraform-version': '0.14.0',
    'state-terraform-version': '0.15.0',
    created: 'Feb 14 2025',
    updated: 'Feb 14 2025',
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
    <HdsAdvancedTable
      @columns={{this.demoColumns}}
      @model={{this.demoModel}}
      @maxHeight="600px"
      @isSelectable={{true}}
      @isStriped={{true}}
      @onSelectionChange={{this.onSelectionChange}}
      @hasStickyFirstColumn={{true}}
    >
      <:body as |B|>
        {{! @glint-expect-error }}
        <B.Tr @selectionKey={{get B.data "name"}}>
          <B.Th>
            <HdsLinkInline @href="www.google.com">
              {{! @glint-expect-error }}
              {{get B.data "name"}}
            </HdsLinkInline>
          </B.Th>
          <B.Td>
            <HdsLinkInline @href="www.google.com">
              {{! @glint-expect-error }}
              {{get B.data "project-name"}}
            </HdsLinkInline>
          </B.Td>
          <B.Td>
            <HdsLinkInline @href="www.google.com">
              {{! @glint-expect-error }}
              {{get B.data "current-run-id"}}
            </HdsLinkInline>
          </B.Td>
          <B.Td>
            <HdsBadge
              @type="outlined"
              {{! @glint-expect-error }}
              @text={{get B.data "run-status"}}
              {{! @glint-expect-error }}
              @color={{get B.data "run-status-color"}}
            />
          </B.Td>
          <B.Td>
            {{! @glint-expect-error }}
            {{get B.data "current-run-applied"}}
          </B.Td>
          <B.Td>
            {{! @glint-expect-error }}
            {{get B.data "vcs-repo"}}
          </B.Td>
          <B.Td>
            <HdsLinkInline @href="www.google.com">
              {{! @glint-expect-error }}
              {{get B.data "module-count"}}
            </HdsLinkInline>
          </B.Td>
          <B.Td>
            {{! @glint-expect-error }}
            {{get B.data "modules"}}
          </B.Td>
          <B.Td>
            <HdsLinkInline @href="www.google.com">
              {{! @glint-expect-error }}
              {{get B.data "provider-count"}}
            </HdsLinkInline>
          </B.Td>
          <B.Td>
            {{! @glint-expect-error }}
            {{get B.data "providers"}}
          </B.Td>
          <B.Td>
            {{! @glint-expect-error }}
            {{get B.data "terraform-version"}}
          </B.Td>
          <B.Td>
            <HdsLinkInline @href="www.google.com">
              {{! @glint-expect-error }}
              {{get B.data "state-terraform-version"}}
            </HdsLinkInline>
          </B.Td>
          <B.Td>
            {{! @glint-expect-error }}
            {{get B.data "created"}}
          </B.Td>
          <B.Td>
            {{! @glint-expect-error }}
            {{get B.data "updated"}}
          </B.Td>
        </B.Tr>
      </:body>
    </HdsAdvancedTable>
  </template>
}
