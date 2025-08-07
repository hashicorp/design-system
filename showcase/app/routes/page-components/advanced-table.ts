/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import { DENSITIES } from '@hashicorp/design-system-components/components/hds/advanced-table/index';

import type { ModelFrom } from 'showcase/utils/ModelFromRoute';

import clusters from 'showcase/mocks/cluster-data';
import folkMusic from 'showcase/mocks/folk-music-data';
import policies from 'showcase/mocks/policy-data';
import selectableItems from 'showcase/mocks/selectable-item-data';
import spanningCells from 'showcase/mocks/spanning-cell-data';
import users from 'showcase/mocks/user-data';
import userWithMoreColumns from 'showcase/mocks/user-with-more-columns-data';

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
      music: folkMusic,
      userDataShort: clone(users.slice(0, 5)),
      clusters,
      spanningManualData: spanningCells,
      selectableData: selectableItems,
      selectableDataDemo1: clone(selectableItems),
      selectableDataDemo2: clone(selectableItems),
      userData: users,
      userDataDemo3: clone(users.slice(0, 16)),
      userDataDemo4: clone(
        users.slice(0, 4).map((user) => ({ ...user, isAnimated: false })),
      ),
      manyColumns: userWithMoreColumns,
      nestedData: policies,
      nestedDataCustom: policies.map((policy) => {
        const { children, ...rest } = policy;
        return {
          ...rest,
          isOpen: false,
          data: children,
        };
      }),
      DENSITIES,
      STATES,
    };
  }
}
