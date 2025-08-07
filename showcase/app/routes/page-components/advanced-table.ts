/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import { DENSITIES } from '@hashicorp/design-system-components/components/hds/advanced-table/index';

import type { ModelFrom } from 'showcase/utils/ModelFromRoute';

import clusterData from 'showcase/mocks/cluster-data';
import folkMusicData from 'showcase/mocks/folk-music-data';
import userWithManyColumnsData from 'showcase/mocks/user-with-more-columns-data';
import policyData from 'showcase/mocks/policy-data';
import selectableItemsData from 'showcase/mocks/selectable-items-data';
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
      music: folkMusicData,
      userDataShort: clone(userData.slice(0, 5)),
      clusters: clusterData,
      spanningManualData: spanningCellData,
      selectableData: selectableItemsData,
      selectableDataDemo1: clone(selectableItemsData),
      selectableDataDemo2: clone(selectableItemsData),
      userData: userData,
      userDataDemo3: clone(userData.slice(0, 16)),
      userDataDemo4: clone(
        userData.slice(0, 4).map((user) => ({ ...user, isAnimated: false })),
      ),
      manyColumns: userWithManyColumnsData,
      nestedData: policyData,
      nestedDataCustom: policyData.map((policy) => {
        const { children, ...rest } = policy;
        return {
          ...rest,
          data: policy.children,
        }
      }),
      DENSITIES,
      STATES,
    };
  }
}
