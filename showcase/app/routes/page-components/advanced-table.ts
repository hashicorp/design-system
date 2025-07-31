/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import { DENSITIES } from '@hashicorp/design-system-components/components/hds/advanced-table/index';

import type { ModelFrom } from 'showcase/utils/model-from-route';

import clusterData from 'showcase/mocks/cluster-data';
import folkMusic from 'showcase/mocks/folk-data';
import manyColumnsData from 'showcase/mocks/many-columns-data';
import policyCustomData from 'showcase/mocks/policy-custom-key-data';
import policyData from 'showcase/mocks/policy-data';
import selectableData from 'showcase/mocks/selectable-data';
import spanningCellData from 'showcase/mocks/spanning-cell-data';
import userData from 'showcase/mocks/user-data';

export type PageComponentsAdvancedTableModel =
  ModelFrom<PageComponentsAdvancedTableRoute>;

// basic function that clones an array of objects (not deep)
export const clone = <T>(arr: T[]): T[] => {
  return arr.map((item) => ({ ...item }));
};

const STATES = ['default', 'hover', 'active', 'focus'];

export default class PageComponentsAdvancedTableRoute extends Route {
  model() {
    return {
      music: folkMusic.map((record) => ({ id: record.id, ...record.attributes })),
      userDataShort: clone(userData.slice(0, 5)),
      clusters: clusterData,
      spanningManualData: spanningCellData,
      selectableData,
      selectableDataDemo1: clone(selectableData),
      selectableDataDemo2: clone(selectableData),
      userData: userData,
      userDataDemo3: clone(userData.slice(0, 16)),
      userDataDemo4: clone(
        userData.slice(0, 4).map((user) => ({ ...user, isAnimated: false })),
      ),
      manyColumns: manyColumnsData,
      nestedData: policyData,
      nestedDataCustom: policyCustomData,
      DENSITIES,
      STATES,
    };
  }
}
