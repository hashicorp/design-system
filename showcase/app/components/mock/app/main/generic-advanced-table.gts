/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { deepTracked } from 'ember-deep-tracked';
import { get } from '@ember/helper';
import { on } from '@ember/modifier';
import style from 'ember-style-modifier/modifiers/style';

// HDS components
import {
  HdsAdvancedTable,
  HdsButton,
  HdsFilterBar,
  HdsLayoutFlex,
  HdsLinkInline,
  HdsBadge,
  HdsBadgeColorValues,
  HdsFormToggleField,
  HdsTextBody,
  HdsTextDisplay,
  type HdsAdvancedTableOnSelectionChangeSignature,
  type HdsFilterBarRangeFilter,
  type HdsFilterBarDateFilter,
  type HdsFilterBarSingleSelectFilter,
  type HdsFilterBarMultiSelectFilter,
  type HdsFilterBarSearchFilter,
  type HdsFilterBarFilter,
} from '@hashicorp/design-system-components/components';

import type { HdsAdvancedTableSignature } from '@hashicorp/design-system-components/components/hds/advanced-table/index';
import type { HdsFilterBarSignature } from '@hashicorp/design-system-components/components/hds/filter-bar/index';

export interface MockAppMainGenericAdvancedTableSignature {
  Element: HTMLDivElement;
}

const SAMPLE_MODEL = [
  {
    name: 'zoguve-guw-mannaz',
    'project-name': 'do uk guzvas',
    'current-run-id': 'run-0Yks9WCFeD9xRTWo',
    'run-status': 'errored',
    'run-status-color': HdsBadgeColorValues.Critical,
    'current-run-applied': 'Mar 06, 2025 09:10:14 am',
    'creation-time': '09:13:13',
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
    'creation-time': '22:22:45',
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
    'creation-time': '11:05:33',
    'vcs-repo': 'example/a))!hzfpKcBl0',
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
    'creation-time': '20:44:21',
    'vcs-repo': 'example/a))!hzfpKcBl0',
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
    'creation-time': '07:59:59',
    'vcs-repo': 'example/a))!hzfpKcBl0',
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
    'creation-time': '20:30:00',
    'vcs-repo': 'example/a))!hzfpKcBl0',
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
    'creation-time': '10:15:30',
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
    'creation-time': '09:45:00',
    'vcs-repo': 'example/&j[RmmtjpQX6',
    'module-count': 114,
    modules: 'wad-bedzeaje-rogmejca',
    'provider-count': 107,
    providers: 'susnup-da-zuw',
    'terraform-version': '0.14.0',
    'state-terraform-version': '0.16.0',
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
    'creation-time': '10:30:00',
    'vcs-repo': 'example/&j[RmmtjpQX6',
    'module-count': 106,
    modules: 'wad-bedzeaje-rogmejca',
    'provider-count': 185,
    providers: 'susnup-da-zuw',
    'terraform-version': '0.14.5',
    'state-terraform-version': '0.16.0',
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
    'creation-time': '11:00:00',
    'vcs-repo': 'example/&j[RmmtjpQX6',
    'module-count': 124,
    modules: 'wad-bedzeaje-rogmejca',
    'provider-count': 175,
    providers: 'susnup-da-zuw',
    'terraform-version': '0.14.5',
    'state-terraform-version': '0.16.0',
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
    'creation-time': '10:45:00',
    'vcs-repo': 'example/&j[RmmtjpQX6',
    'module-count': 70,
    modules: 'wad-bedzeaje-rogmejca',
    'provider-count': 168,
    providers: 'susnup-da-zuw',
    'terraform-version': '0.14.5',
    'state-terraform-version': '0.16.0',
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
    'creation-time': '10:45:00',
    'vcs-repo': 'example/d2s3B46I10',
    'module-count': 70,
    modules: 'wad-bedzeaje-rogmejca',
    'provider-count': 168,
    providers: 'susnup-da-zuw',
    'terraform-version': '0.14.5',
    'state-terraform-version': '0.16.0',
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
    'creation-time': '09:50:00',
    'vcs-repo': 'example/d2s3B46I10',
    'module-count': 106,
    modules: 'wad-bedzeaje-rogmejca',
    'provider-count': 61,
    providers: 'susnup-da-zuw',
    'terraform-version': '0.14.5',
    'state-terraform-version': '0.16.0',
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
    'creation-time': '10:10:00',
    'vcs-repo': 'example/d2s3B46I10',
    'module-count': 14,
    modules: 'wad-bedzeaje-rogmejca',
    'provider-count': 143,
    providers: 'susnup-da-zuw',
    'terraform-version': '0.14.5',
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
    'creation-time': '10:20:00',
    'vcs-repo': 'example/d2s3B46I10',
    'module-count': 14,
    modules: 'wad-bedzeaje-rogmejca',
    'provider-count': 143,
    providers: 'susnup-da-zuw',
    'terraform-version': '0.14.5',
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
    'creation-time': '09:30:00',
    'vcs-repo': 'example/JUha^7zr14',
    'module-count': 114,
    modules: 'wad-bedzeaje-rogmejca',
    'provider-count': 98,
    providers: 'susnup-da-zuw',
    'terraform-version': '0.14.5',
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
    'creation-time': '10:05:00',
    'vcs-repo': 'example/JUha^7zr14',
    'module-count': 99,
    modules: 'wad-bedzeaje-rogmejca',
    'provider-count': 170,
    providers: 'susnup-da-zuw',
    'terraform-version': '0.14.5',
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
    'creation-time': '09:55:00',
    'vcs-repo': 'example/d2s3B46I10',
    'module-count': 139,
    modules: 'wad-bedzeaje-rogmejca',
    'provider-count': 170,
    providers: 'susnup-da-zuw',
    'terraform-version': '0.14.5',
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
    'creation-time': '09:40:00',
    'vcs-repo': 'example/8G3C81*u*q*O$17',
    'module-count': 107,
    modules: 'wad-bedzeaje-rogmejca',
    'provider-count': 83,
    providers: 'susnup-da-zuw',
    'terraform-version': '0.14.5',
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
    'creation-time': '09:15:00',
    'vcs-repo': 'example/gt]5*c!N1*N%I!m)18',
    'module-count': 80,
    modules: 'wad-bedzeaje-rogmejca',
    'provider-count': 152,
    providers: 'susnup-da-zuw',
    'terraform-version': '0.14.5',
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
    'creation-time': '10:00:00',
    'vcs-repo': 'example/gt]5*c!N1*N%I!m)18',
    'module-count': 158,
    modules: 'wad-bedzeaje-rogmejca',
    'provider-count': 11,
    providers: 'susnup-da-zuw',
    'terraform-version': '0.14.5',
    'state-terraform-version': '0.15.0',
    created: 'Feb 14 2025',
    updated: 'Feb 14 2025',
  },
];

const SAMPLE_MODEL_VALUES = {
  name: Array.from(new Set(SAMPLE_MODEL.map((item) => item['name']))).map(
    (value) => ({ value, label: value }),
  ),
  'project-name': Array.from(
    new Set(SAMPLE_MODEL.map((item) => item['project-name'])),
  ).map((value) => ({ value, label: value })),
  'run-status': Array.from(
    new Set(SAMPLE_MODEL.map((item) => item['run-status'])),
  ).map((value) => ({ value, label: value })),
  'vcs-repo': Array.from(
    new Set(SAMPLE_MODEL.map((item) => item['vcs-repo'])),
  ).map((value) => ({ value, label: value })),
  'terraform-version': Array.from(
    new Set(SAMPLE_MODEL.map((item) => item['terraform-version'])),
  ).map((value) => ({ value, label: value })),
  'state-terraform-version': Array.from(
    new Set(SAMPLE_MODEL.map((item) => item['state-terraform-version'])),
  ).map((value) => ({ value, label: value })),
};

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
    label: 'Creation time',
    key: 'creation-time',
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

const updateModelWithSelectAllState = (
  modelData: HdsAdvancedTableSignature['Args']['model'],
  selectAllState: boolean,
) => {
  modelData.forEach((modelRow) => {
    modelRow['isSelected'] = selectAllState;
  });
};

const updateModelWithSelectableRowsStates = (
  modelData: HdsAdvancedTableSignature['Args']['model'],
  selectableRowsStates: HdsAdvancedTableOnSelectionChangeSignature['selectableRowsStates'],
) => {
  const modelDataMap = new Map(
    modelData.map((modelRow) => [modelRow['id'], modelRow]),
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
  @deepTracked filters: HdsFilterBarSignature['Args']['filters'] = {};
  @tracked isSeparatedFilterBar = false;
  @tracked isLiveFilter = false;

  @action onSelectionChange({
    selectionKey,
    selectionCheckboxElement,
    selectableRowsStates,
  }: HdsAdvancedTableOnSelectionChangeSignature) {
    // eslint-disable-next-line prefer-rest-params
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

  onFilter = (filters: HdsFilterBarSignature['Args']['filters']) => {
    console.log('onFilter called with filters: ', filters);
    this.filters = filters;
  };

  get demoModelFilteredData() {
    const filterItem = (item: Record<string, unknown>): boolean => {
      if (Object.keys(this.filters).length === 0) return true;
      let match = true;
      Object.keys(this.filters).forEach((key) => {
        const filter = this.filters[key] as HdsFilterBarFilter;
        if (filter) {
          switch (filter.type) {
            case 'date':
            case 'datetime':
            case 'time':
              if (!this.isDateFilterMatch(item[key], filter)) {
                match = false;
              }
              break;
            case 'range':
              if (!this.isRangeFilterMatch(item[key], filter)) {
                match = false;
              }
              break;
            case 'single-select':
              if (!this.isSingleSelectFilterMatch(item[key], filter)) {
                match = false;
              }
              break;
            case 'search':
              if (!this.isSearchFilterMatch(item, filter)) {
                match = false;
              }
              break;
            default:
              if (!this.isMultiSelectFilterMatch(item[key], filter)) {
                match = false;
              }
          }
        }
      });
      return match;
    };

    const filteredData = this.demoModel.filter(filterItem);
    return filteredData;
  }

  get noFilterData() {
    return this.demoModelFilteredData.length === 0;
  }

  isRangeFilterMatch(
    itemValue: unknown,
    filter: HdsFilterBarRangeFilter,
  ): boolean {
    const filterData = filter.data;
    const selector = filterData.selector;
    const number = Number(itemValue);

    const value = filterData.value;
    const valueNumber = Number(value);

    if (isNaN(number)) {
      return false;
    } else if (!isNaN(valueNumber)) {
      switch (selector) {
        case 'less-than':
          return number < valueNumber;
        case 'less-than-or-equal-to':
          return number <= valueNumber;
        case 'equal-to':
          return number === valueNumber;
        case 'greater-than-or-equal-to':
          return number >= valueNumber;
        case 'greater-than':
          return number > valueNumber;
        default:
          return false;
      }
    } else if (selector === 'between' && typeof value === 'object') {
      if (!value.start || !value.end) {
        return false;
      }
      return number >= value.start && number <= value.end;
    }

    return false;
  }

  isDateFilterMatch(
    itemValue: unknown,
    filter: HdsFilterBarDateFilter,
  ): boolean {
    const filterData = filter.data;
    const selector = filterData.selector;
    const value = filterData.value;

    const date = this.dateFromFilter(String(itemValue), filter.type);

    if (selector === 'between' && typeof value === 'object') {
      if (!value.start || !value.end) {
        return false;
      }
      const startDate = this.dateFromFilter(value.start, filter.type);
      const endDate = this.dateFromFilter(value.end, filter.type);
      if (this.dateIsValid(startDate) && this.dateIsValid(endDate)) {
        return (
          date.getTime() >= startDate.getTime() &&
          date.getTime() <= endDate.getTime()
        );
      } else {
        return false;
      }
    } else if (typeof value === 'string') {
      const valueDate = this.dateFromFilter(value, filter.type);
      if (this.dateIsValid(valueDate)) {
        switch (selector) {
          case 'before':
            return date.getTime() < valueDate.getTime();
          case 'exactly':
            return date.getTime() === valueDate.getTime();
          case 'after':
            return date.getTime() > valueDate.getTime();
          default:
            return false;
        }
      }
    }

    return false;
  }

  isSingleSelectFilterMatch(
    itemValue: unknown,
    filter: HdsFilterBarSingleSelectFilter,
  ): boolean {
    return itemValue === filter.data.value;
  }

  isMultiSelectFilterMatch(
    itemValue: unknown,
    filter: HdsFilterBarMultiSelectFilter,
  ): boolean {
    const filterValues = filter.data.map((d) => d.value);
    return filterValues.includes(itemValue);
  }

  isSearchFilterMatch(
    item: Record<string, unknown>,
    filter: HdsFilterBarSearchFilter,
  ): boolean {
    let match = false;
    Object.keys(item).forEach((key) => {
      const itemValue = item[key];
      const filterValue = filter.data.value;
      if (
        typeof itemValue === 'string' &&
        typeof filterValue === 'string' &&
        itemValue.toLowerCase().includes(filterValue.toLowerCase())
      ) {
        match = true;
      }
    });
    return match;
  }

  dateFromFilter = (dateString: string, filterType: string): Date => {
    if (filterType === 'time') {
      return new Date(`1970-01-01T${dateString}`);
    }
    return new Date(dateString);
  };

  dateIsValid = (date?: Date | string): date is Date =>
    date instanceof Date && !isNaN(+date);

  clearFilters = () => {
    this.filters = {};
  };

  onSeparatedFilterBar = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.isSeparatedFilterBar = target.checked;
  };

  onLiveFilterToggle = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.isLiveFilter = target.checked;
  };

  <template>
    <div class="filters__toggle" {{style marginBottom="24px"}}>
      <HdsFormToggleField
        name="demo-separated-filter-bar"
        {{on "click" this.onSeparatedFilterBar}}
        checked={{this.isSeparatedFilterBar}}
        as |F|
      >
        <F.Label>Separated filter bar component</F.Label>
      </HdsFormToggleField>
    </div>

    <div class="filters__toggle" {{style marginBottom="24px"}}>
      <HdsFormToggleField
        name="demo-live-filtering"
        {{on "click" this.onLiveFilterToggle}}
        checked={{this.isLiveFilter}}
        as |F|
      >
        <F.Label>Live filtering</F.Label>
      </HdsFormToggleField>
    </div>

    {{#if this.isSeparatedFilterBar}}
      <HdsFilterBar
        @hasSearch={{true}}
        @isLiveFilter={{this.isLiveFilter}}
        @filters={{this.filters}}
        @onFilter={{this.onFilter}}
        {{style marginBottom="24px"}}
        as |F|
      >
        <F.ActionsDropdown as |D|>
          <D.ToggleButton @text="Actions" @color="secondary" @size="small" />
          <D.Checkbox>access</D.Checkbox>
          <D.Checkbox>homework</D.Checkbox>
          <D.Checkbox>discovery</D.Checkbox>
          <D.Checkbox>memories</D.Checkbox>
        </F.ActionsDropdown>
        <F.FiltersDropdown as |D|>
          <D.FilterGroup
            @key="name"
            @text="Name"
            @type="multi-select"
            @searchEnabled={{true}}
            as |F|
          >
            {{#each (get SAMPLE_MODEL_VALUES "name") as |option|}}
              <F.Checkbox @value={{option.value}}>{{option.label}}</F.Checkbox>
            {{/each}}
          </D.FilterGroup>
          <D.FilterGroup
            @key="project-name"
            @text="Project name"
            @type="multi-select"
            @searchEnabled={{true}}
            as |F|
          >
            {{#each (get SAMPLE_MODEL_VALUES "project-name") as |option|}}
              <F.Checkbox @value={{option.value}}>{{option.label}}</F.Checkbox>
            {{/each}}
          </D.FilterGroup>
          <D.FilterGroup
            @key="run-status"
            @text="Run status"
            @type="multi-select"
            as |F|
          >
            {{#each (get SAMPLE_MODEL_VALUES "run-status") as |option|}}
              <F.Checkbox @value={{option.value}}>{{option.label}}</F.Checkbox>
            {{/each}}
          </D.FilterGroup>
          <D.FilterGroup
            @key="terraform-version"
            @text="Terraform version"
            @type="single-select"
            as |F|
          >
            {{#each (get SAMPLE_MODEL_VALUES "terraform-version") as |option|}}
              <F.Radio @value={{option.value}}>{{option.label}}</F.Radio>
            {{/each}}
          </D.FilterGroup>
          <D.FilterGroup
            @key="current-run-applied"
            @text="Current run applied"
            @type="datetime"
          />
          <D.FilterGroup
            @key="creation-time"
            @text="Creation time"
            @type="time"
          />
          <D.FilterGroup
            @key="module-count"
            @text="Module count"
            @type="range"
          />
          <D.FilterGroup @key="created" @text="Created" @type="date" />
        </F.FiltersDropdown>
      </HdsFilterBar>
    {{/if}}

    <HdsAdvancedTable
      @columns={{this.demoColumns}}
      @model={{this.demoModelFilteredData}}
      @maxHeight="600px"
      @isSelectable={{true}}
      @isStriped={{true}}
      @onSelectionChange={{this.onSelectionChange}}
      @hasStickyFirstColumn={{true}}
      @isEmpty={{this.noFilterData}}
    >
      <:actions as |A|>
        {{#unless this.isSeparatedFilterBar}}
          <A.FilterBar
            @hasSearch={{true}}
            @isLiveFilter={{this.isLiveFilter}}
            @filters={{this.filters}}
            @onFilter={{this.onFilter}}
            as |F|
          >
            <F.ActionsDropdown as |D|>
              <D.ToggleButton
                @text="Actions"
                @color="secondary"
                @size="small"
              />
              <D.Checkbox>access</D.Checkbox>
              <D.Checkbox>homework</D.Checkbox>
              <D.Checkbox>discovery</D.Checkbox>
              <D.Checkbox>memories</D.Checkbox>
            </F.ActionsDropdown>
            <F.FiltersDropdown as |D|>
              <D.FilterGroup
                @key="name"
                @text="Name"
                @type="multi-select"
                @searchEnabled={{true}}
                as |F|
              >
                {{#each (get SAMPLE_MODEL_VALUES "name") as |option|}}
                  <F.Checkbox
                    @value={{option.value}}
                  >{{option.label}}</F.Checkbox>
                {{/each}}
              </D.FilterGroup>
              <D.FilterGroup
                @key="project-name"
                @text="Project name"
                @type="multi-select"
                @searchEnabled={{true}}
                as |F|
              >
                {{#each (get SAMPLE_MODEL_VALUES "project-name") as |option|}}
                  <F.Checkbox
                    @value={{option.value}}
                  >{{option.label}}</F.Checkbox>
                {{/each}}
              </D.FilterGroup>
              <D.FilterGroup
                @key="run-status"
                @text="Run status"
                @type="multi-select"
                as |F|
              >
                {{#each (get SAMPLE_MODEL_VALUES "run-status") as |option|}}
                  <F.Checkbox
                    @value={{option.value}}
                  >{{option.label}}</F.Checkbox>
                {{/each}}
              </D.FilterGroup>
              <D.FilterGroup
                @key="terraform-version"
                @text="Terraform version"
                @type="single-select"
                as |F|
              >
                {{#each
                  (get SAMPLE_MODEL_VALUES "terraform-version")
                  as |option|
                }}
                  <F.Radio @value={{option.value}}>{{option.label}}</F.Radio>
                {{/each}}
              </D.FilterGroup>
              <D.FilterGroup
                @key="current-run-applied"
                @text="Current run applied"
                @type="datetime"
              />
              <D.FilterGroup
                @key="creation-time"
                @text="Creation time"
                @type="time"
              />
              <D.FilterGroup
                @key="module-count"
                @text="Module count"
                @type="range"
              />
              <D.FilterGroup @key="created" @text="Created" @type="date" />
            </F.FiltersDropdown>
          </A.FilterBar>
        {{/unless}}
      </:actions>
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
            {{get B.data "creation-time"}}
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
      <:emptyState>
        {{#if this.noFilterData}}
          <HdsLayoutFlex @direction="column" @gap="12">
            <HdsTextDisplay @tag="h3" @size="300">No data to display</HdsTextDisplay>
            <HdsTextBody>
              No results were found with the selected filters. Please clear or
              update the filters.
            </HdsTextBody>
            <div>
              <HdsButton
                @text="Clear filters"
                {{on "click" this.clearFilters}}
              />
            </div>
          </HdsLayoutFlex>
        {{/if}}
      </:emptyState>
    </HdsAdvancedTable>
  </template>
}
