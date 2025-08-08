/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';
import { DENSITIES } from '@hashicorp/design-system-components/components/hds/table/index';

import type { ModelFrom } from 'showcase/utils/ModelFromRoute';

import clusters from 'showcase/mocks/cluster-data';
import folkMusic from 'showcase/mocks/folk-music-data';
import selectableItems from 'showcase/mocks/selectable-item-data';
import users from 'showcase/mocks/user-data';
import userWithMoreColumns from 'showcase/mocks/user-with-more-columns-data';

export type PageComponentsTableModel = ModelFrom<PageComponentsTableRoute>;

// basic function that clones an array of objects (not deep)
export const clone = <T>(arr: T[]): T[] => {
  return arr.map((item) => ({ ...item }));
};

const STATES = ['default', 'hover', 'active', 'focus'];

export default class PageComponentsTableRoute extends Route {
  model() {
    return {
      music: folkMusic,
      selectableData: selectableItems,
      selectableDataDemo1: clone(selectableItems),
      selectableDataDemo2: clone(selectableItems),
      userDataDemo3: clone(users.slice(0, 16)),
      userDataDemo4: clone(
        users.slice(0, 4).map((user) => ({ ...user, isAnimated: false })),
      ),
      selectableDataDemo5: clone(selectableItems),
      selectableDataDemo6: clone(selectableItems),
      clusters,
      userMoreColumnsData: userWithMoreColumns,
      DENSITIES,
      STATES,
    };
  }
}
